import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { db } from '@/db';
import { wellnessScores } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ 
      headers: await headers() 
    });

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    const results = await db
      .select()
      .from(wellnessScores)
      .where(eq(wellnessScores.userId, userId))
      .orderBy(desc(wellnessScores.recordedAt))
      .limit(1);

    if (results.length === 0) {
      return NextResponse.json(
        { error: 'No wellness score found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    return NextResponse.json(results[0], { status: 200 });
  } catch (error) {
    console.error('GET wellness error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ 
      headers: await headers() 
    });

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const body = await request.json();

    if ('userId' in body || 'user_id' in body) {
      return NextResponse.json(
        {
          error: 'User ID cannot be provided in request body',
          code: 'USER_ID_NOT_ALLOWED',
        },
        { status: 400 }
      );
    }

    const { score, moodContribution, exerciseContribution, notes } = body;

    if (score === undefined || score === null) {
      return NextResponse.json(
        { error: 'Score is required', code: 'MISSING_SCORE' },
        { status: 400 }
      );
    }

    if (moodContribution === undefined || moodContribution === null) {
      return NextResponse.json(
        { error: 'Mood contribution is required', code: 'MISSING_MOOD_CONTRIBUTION' },
        { status: 400 }
      );
    }

    if (exerciseContribution === undefined || exerciseContribution === null) {
      return NextResponse.json(
        { error: 'Exercise contribution is required', code: 'MISSING_EXERCISE_CONTRIBUTION' },
        { status: 400 }
      );
    }

    if (!Number.isInteger(score) || score < 0) {
      return NextResponse.json(
        { error: 'Score must be a non-negative integer', code: 'INVALID_SCORE' },
        { status: 400 }
      );
    }

    if (!Number.isInteger(moodContribution) || moodContribution < 0) {
      return NextResponse.json(
        { error: 'Mood contribution must be a non-negative integer', code: 'INVALID_MOOD_CONTRIBUTION' },
        { status: 400 }
      );
    }

    if (!Number.isInteger(exerciseContribution) || exerciseContribution < 0) {
      return NextResponse.json(
        { error: 'Exercise contribution must be a non-negative integer', code: 'INVALID_EXERCISE_CONTRIBUTION' },
        { status: 400 }
      );
    }

    const newWellnessScore = await db
      .insert(wellnessScores)
      .values({
        userId,
        score,
        moodContribution,
        exerciseContribution,
        notes: notes || null,
        recordedAt: new Date(),
      })
      .returning();

    return NextResponse.json(newWellnessScore[0], { status: 201 });
  } catch (error) {
    console.error('POST wellness error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error },
      { status: 500 }
    );
  }
}