import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { moodEntries } from '@/db/schema';
import { eq, gte, sql } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    // Authentication
    const session = await auth.api.getSession({ 
      headers: await headers() 
    });
    
    if (!session || !session.user) {
      return NextResponse.json({ 
        error: 'Authentication required',
        code: 'UNAUTHORIZED' 
      }, { status: 401 });
    }

    const userId = session.user.id;

    // Fetch ALL mood entries for the user
    const allEntries = await db.select()
      .from(moodEntries)
      .where(eq(moodEntries.userId, userId))
      .orderBy(moodEntries.createdAt);

    const totalMoods = allEntries.length;

    // Calculate mood distribution with colors and emojis
    const moodCounts = new Map<string, { count: number, emoji: string, color: string }>();
    
    allEntries.forEach(entry => {
      const mood = entry.emotionName;
      if (!moodCounts.has(mood)) {
        moodCounts.set(mood, {
          count: 0,
          emoji: entry.emotionEmoji || "😊",
          color: entry.emotionColor || "#6366f1"
        });
      }
      const data = moodCounts.get(mood)!;
      data.count++;
    });

    // Convert to array for moodDistribution
    const moodDistribution = Array.from(moodCounts.entries())
      .map(([mood, data]) => ({
        mood,
        count: data.count,
        emoji: data.emoji,
        color: data.color
      }))
      .sort((a, b) => b.count - a.count);

    // Find dominant mood (most common)
    const dominantMood = moodDistribution.length > 0 
      ? {
          mood: moodDistribution[0].mood,
          emoji: moodDistribution[0].emoji,
          count: moodDistribution[0].count
        }
      : null;

    // Calculate weekly average
    if (allEntries.length > 0) {
      const firstEntry = new Date(allEntries[0].createdAt);
      const lastEntry = new Date(allEntries[allEntries.length - 1].createdAt);
      const daysDiff = Math.max(1, Math.ceil((lastEntry.getTime() - firstEntry.getTime()) / (1000 * 60 * 60 * 24)));
      const weeks = Math.max(1, Math.ceil(daysDiff / 7));
      var weeklyAverage = Math.round(totalMoods / weeks);
    } else {
      var weeklyAverage = 0;
    }

    // Calculate streak (consecutive days with check-ins)
    let streak = 0;
    if (allEntries.length > 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      // Group entries by date
      const entriesByDate = new Map<string, number>();
      allEntries.forEach(entry => {
        const entryDate = new Date(entry.createdAt);
        entryDate.setHours(0, 0, 0, 0);
        const dateKey = entryDate.toISOString().split('T')[0];
        entriesByDate.set(dateKey, (entriesByDate.get(dateKey) || 0) + 1);
      });

      // Check for streak starting from today
      let currentDate = new Date(today);
      while (true) {
        const dateKey = currentDate.toISOString().split('T')[0];
        if (entriesByDate.has(dateKey)) {
          streak++;
          currentDate.setDate(currentDate.getDate() - 1);
        } else {
          break;
        }
      }
    }

    // Calculate weekly trend (last 7 days)
    const weeklyTrend: Array<{ date: string, count: number }> = [];
    const last7Days = new Map<string, number>();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      const dateKey = date.toISOString().split('T')[0];
      last7Days.set(dateKey, 0);
    }

    allEntries.forEach(entry => {
      const entryDate = new Date(entry.createdAt);
      entryDate.setHours(0, 0, 0, 0);
      const dateKey = entryDate.toISOString().split('T')[0];
      if (last7Days.has(dateKey)) {
        last7Days.set(dateKey, (last7Days.get(dateKey) || 0) + 1);
      }
    });

    last7Days.forEach((count, dateKey) => {
      const date = new Date(dateKey);
      const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      weeklyTrend.push({ date: formattedDate, count });
    });

    // Return analytics in the format expected by the frontend
    return NextResponse.json({
      totalMoods,
      dominantMood,
      weeklyAverage,
      streak,
      weeklyTrend,
      moodDistribution
    }, { status: 200 });

  } catch (error) {
    console.error('GET /api/moods/analytics error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error,
      code: 'INTERNAL_ERROR' 
    }, { status: 500 });
  }
}