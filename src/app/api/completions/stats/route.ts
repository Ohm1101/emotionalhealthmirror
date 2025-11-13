import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { exerciseCompletions } from '@/db/schema';
import { eq, gte, sql } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    // Get session and authenticate user
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // Calculate date thresholds
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Get all completions for the user
    const allCompletions = await db.select()
      .from(exerciseCompletions)
      .where(eq(exerciseCompletions.userId, userId));

    // Calculate total completions
    const totalCompletions = allCompletions.length;

    // Calculate total joy points
    const totalJoyPoints = allCompletions.reduce((sum, completion) => {
      return sum + (completion.joyIncrease || 0);
    }, 0);

    // Calculate average difficulty
    const averageDifficulty = totalCompletions > 0
      ? allCompletions.reduce((sum, completion) => {
          return sum + (completion.difficultyRating || 0);
        }, 0) / totalCompletions
      : 0;

    // Calculate felt better percentage
    const feltBetterCount = allCompletions.filter(completion => completion.feltBetter === true).length;
    const feltBetterPercentage = totalCompletions > 0
      ? Math.round((feltBetterCount / totalCompletions) * 100 * 100) / 100
      : 0;

    // Calculate total time spent (convert seconds to minutes)
    const totalTimeSpentSeconds = allCompletions.reduce((sum, completion) => {
      return sum + (completion.completionTimeSeconds || 0);
    }, 0);
    const totalTimeSpent = Math.round((totalTimeSpentSeconds / 60) * 100) / 100;

    // Calculate completions this week
    const completionsThisWeek = allCompletions.filter(completion => {
      const completedAt = new Date(completion.completedAt);
      return completedAt >= sevenDaysAgo;
    }).length;

    // Calculate completions this month
    const completionsThisMonth = allCompletions.filter(completion => {
      const completedAt = new Date(completion.completedAt);
      return completedAt >= thirtyDaysAgo;
    }).length;

    // Round average difficulty to 2 decimal places
    const roundedAverageDifficulty = Math.round(averageDifficulty * 100) / 100;

    // Construct stats object
    const stats = {
      totalCompletions,
      totalJoyPoints,
      averageDifficulty: roundedAverageDifficulty,
      feltBetterPercentage,
      totalTimeSpent,
      completionsThisWeek,
      completionsThisMonth
    };

    return NextResponse.json(stats, { status: 200 });

  } catch (error) {
    console.error('GET /api/completions/stats error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error },
      { status: 500 }
    );
  }
}