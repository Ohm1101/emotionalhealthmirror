import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { db } from '@/db';
import { exerciseCompletions, exercises } from '@/db/schema';
import { eq, desc, and } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    
    if (!session?.user?.id) {
      return NextResponse.json({ 
        error: 'Authentication required',
        code: 'UNAUTHORIZED' 
      }, { status: 401 });
    }

    const userId = session.user.id;
    const searchParams = request.nextUrl.searchParams;
    
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');

    const completions = await db
      .select()
      .from(exerciseCompletions)
      .where(eq(exerciseCompletions.userId, userId))
      .orderBy(desc(exerciseCompletions.completedAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(completions, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    
    if (!session?.user?.id) {
      return NextResponse.json({ 
        error: 'Authentication required',
        code: 'UNAUTHORIZED' 
      }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await request.json();

    if ('userId' in body || 'user_id' in body) {
      return NextResponse.json({ 
        error: "User ID cannot be provided in request body",
        code: "USER_ID_NOT_ALLOWED" 
      }, { status: 400 });
    }

    const { 
      exerciseId, 
      completionTimeSeconds, 
      feltBetter, 
      difficultyRating, 
      feedbackNotes,
      joyIncrease 
    } = body;

    if (!exerciseId) {
      return NextResponse.json({ 
        error: "exerciseId is required",
        code: "MISSING_EXERCISE_ID" 
      }, { status: 400 });
    }

    if (typeof exerciseId !== 'number' || !Number.isInteger(exerciseId)) {
      return NextResponse.json({ 
        error: "exerciseId must be an integer",
        code: "INVALID_EXERCISE_ID" 
      }, { status: 400 });
    }

    if (!completionTimeSeconds) {
      return NextResponse.json({ 
        error: "completionTimeSeconds is required",
        code: "MISSING_COMPLETION_TIME" 
      }, { status: 400 });
    }

    if (typeof completionTimeSeconds !== 'number' || !Number.isInteger(completionTimeSeconds) || completionTimeSeconds <= 0) {
      return NextResponse.json({ 
        error: "completionTimeSeconds must be a positive integer",
        code: "INVALID_COMPLETION_TIME" 
      }, { status: 400 });
    }

    if (typeof feltBetter !== 'boolean') {
      return NextResponse.json({ 
        error: "feltBetter is required and must be a boolean",
        code: "INVALID_FELT_BETTER" 
      }, { status: 400 });
    }

    if (!difficultyRating) {
      return NextResponse.json({ 
        error: "difficultyRating is required",
        code: "MISSING_DIFFICULTY_RATING" 
      }, { status: 400 });
    }

    if (typeof difficultyRating !== 'number' || !Number.isInteger(difficultyRating) || difficultyRating < 1 || difficultyRating > 5) {
      return NextResponse.json({ 
        error: "difficultyRating must be an integer between 1 and 5",
        code: "INVALID_DIFFICULTY_RATING" 
      }, { status: 400 });
    }

    if (joyIncrease === undefined || joyIncrease === null) {
      return NextResponse.json({ 
        error: "joyIncrease is required",
        code: "MISSING_JOY_INCREASE" 
      }, { status: 400 });
    }

    if (typeof joyIncrease !== 'number' || !Number.isInteger(joyIncrease) || joyIncrease < 0) {
      return NextResponse.json({ 
        error: "joyIncrease must be a positive integer",
        code: "INVALID_JOY_INCREASE" 
      }, { status: 400 });
    }

    const exerciseExists = await db
      .select()
      .from(exercises)
      .where(eq(exercises.id, exerciseId))
      .limit(1);

    if (exerciseExists.length === 0) {
      return NextResponse.json({ 
        error: "Exercise not found",
        code: "EXERCISE_NOT_FOUND" 
      }, { status: 400 });
    }

    const newCompletion = await db
      .insert(exerciseCompletions)
      .values({
        userId,
        exerciseId,
        completionTimeSeconds,
        feltBetter,
        difficultyRating,
        feedbackNotes: feedbackNotes || null,
        joyIncrease,
        completedAt: new Date()
      })
      .returning();

    return NextResponse.json(newCompletion[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}