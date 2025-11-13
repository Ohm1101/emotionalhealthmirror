import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { recommendations, exercises } from '@/db/schema';
import { eq, desc, and } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

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
    const { searchParams } = new URL(request.url);

    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 50);
    const offset = parseInt(searchParams.get('offset') || '0');
    const completedParam = searchParams.get('completed');

    let query = db
      .select()
      .from(recommendations)
      .where(eq(recommendations.userId, userId));

    if (completedParam !== null) {
      const isCompleted = completedParam === 'true';
      query = query.where(
        and(
          eq(recommendations.userId, userId),
          eq(recommendations.isCompleted, isCompleted)
        )
      );
    }

    const results = await query
      .orderBy(desc(recommendations.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
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
          code: 'USER_ID_NOT_ALLOWED'
        },
        { status: 400 }
      );
    }

    const { emotionName, recommendedExerciseId, reason } = body;

    if (!emotionName || typeof emotionName !== 'string' || emotionName.trim() === '') {
      return NextResponse.json(
        {
          error: 'emotionName is required and must be a non-empty string',
          code: 'MISSING_EMOTION_NAME'
        },
        { status: 400 }
      );
    }

    if (!recommendedExerciseId || typeof recommendedExerciseId !== 'number') {
      return NextResponse.json(
        {
          error: 'recommendedExerciseId is required and must be an integer',
          code: 'MISSING_EXERCISE_ID'
        },
        { status: 400 }
      );
    }

    if (!reason || typeof reason !== 'string' || reason.trim() === '') {
      return NextResponse.json(
        {
          error: 'reason is required and must be a non-empty string',
          code: 'MISSING_REASON'
        },
        { status: 400 }
      );
    }

    const exerciseExists = await db
      .select()
      .from(exercises)
      .where(eq(exercises.id, recommendedExerciseId))
      .limit(1);

    if (exerciseExists.length === 0) {
      return NextResponse.json(
        {
          error: 'Exercise with the provided ID does not exist',
          code: 'INVALID_EXERCISE_ID'
        },
        { status: 400 }
      );
    }

    const newRecommendation = await db
      .insert(recommendations)
      .values({
        userId: userId,
        emotionName: emotionName.trim(),
        recommendedExerciseId: recommendedExerciseId,
        reason: reason.trim(),
        isCompleted: false,
        createdAt: new Date()
      })
      .returning();

    return NextResponse.json(newRecommendation[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error },
      { status: 500 }
    );
  }
}