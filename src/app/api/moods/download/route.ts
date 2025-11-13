import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { db } from '@/db';
import { moodEntries } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Get session
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // Query all mood entries for the user
    const userMoodEntries = await db
      .select()
      .from(moodEntries)
      .where(eq(moodEntries.userId, userId))
      .orderBy(desc(moodEntries.createdAt));

    // Generate CSV content
    const csvHeaders = 'Date,Emotion,Emoji,Color,Notes,Anonymous\n';
    
    const csvRows = userMoodEntries.map(entry => {
      // Format date as readable string
      const date = new Date(entry.createdAt).toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });

      // Escape and quote values that contain commas, quotes, or newlines
      const escapeCSV = (value: string | null | undefined) => {
        if (value === null || value === undefined) return '';
        const stringValue = String(value);
        if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
          return `"${stringValue.replace(/"/g, '""')}"`;
        }
        return stringValue;
      };

      return [
        escapeCSV(date),
        escapeCSV(entry.emotionName),
        escapeCSV(entry.emotionEmoji),
        escapeCSV(entry.emotionColor),
        escapeCSV(entry.notes),
        entry.isAnonymous ? 'Yes' : 'No'
      ].join(',');
    }).join('\n');

    const csvContent = csvHeaders + csvRows;

    // Return CSV response with appropriate headers
    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="mood-history.csv"'
      }
    });

  } catch (error) {
    console.error('GET /api/moods/download error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error },
      { status: 500 }
    );
  }
}