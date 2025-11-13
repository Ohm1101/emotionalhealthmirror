import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { db } from '@/db';
import { moodEntries } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
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
    const searchParams = request.nextUrl.searchParams;
    
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');

    if (isNaN(limit) || isNaN(offset) || limit < 1 || offset < 0) {
      return NextResponse.json({ 
        error: 'Invalid pagination parameters',
        code: 'INVALID_PAGINATION' 
      }, { status: 400 });
    }

    const results = await db.select()
      .from(moodEntries)
      .where(eq(moodEntries.userId, userId))
      .orderBy(desc(moodEntries.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error,
      code: 'INTERNAL_ERROR' 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
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
    const body = await request.json();

    if ('userId' in body || 'user_id' in body) {
      return NextResponse.json({ 
        error: 'User ID cannot be provided in request body',
        code: 'USER_ID_NOT_ALLOWED' 
      }, { status: 400 });
    }

    const { emotionName, emotionEmoji, emotionColor, notes, isAnonymous } = body;

    if (!emotionName || typeof emotionName !== 'string' || emotionName.trim() === '') {
      return NextResponse.json({ 
        error: 'emotionName is required and must be a non-empty string',
        code: 'MISSING_EMOTION_NAME' 
      }, { status: 400 });
    }

    if (!emotionEmoji || typeof emotionEmoji !== 'string' || emotionEmoji.trim() === '') {
      return NextResponse.json({ 
        error: 'emotionEmoji is required and must be a non-empty string',
        code: 'MISSING_EMOTION_EMOJI' 
      }, { status: 400 });
    }

    if (!emotionColor || typeof emotionColor !== 'string' || emotionColor.trim() === '') {
      return NextResponse.json({ 
        error: 'emotionColor is required and must be a non-empty string',
        code: 'MISSING_EMOTION_COLOR' 
      }, { status: 400 });
    }

    const insertData = {
      userId,
      emotionName: emotionName.trim(),
      emotionEmoji: emotionEmoji.trim(),
      emotionColor: emotionColor.trim(),
      notes: notes && typeof notes === 'string' ? notes.trim() : null,
      isAnonymous: typeof isAnonymous === 'boolean' ? isAnonymous : false,
      createdAt: new Date()
    };

    const newMoodEntry = await db.insert(moodEntries)
      .values(insertData)
      .returning();

    return NextResponse.json(newMoodEntry[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error,
      code: 'INTERNAL_ERROR' 
    }, { status: 500 });
  }
}