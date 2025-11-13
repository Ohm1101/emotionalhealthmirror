import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { exercises } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // Validate id is a valid positive integer
    if (!id || isNaN(parseInt(id)) || parseInt(id) <= 0) {
      return NextResponse.json(
        { 
          error: 'Valid positive integer ID is required',
          code: 'INVALID_ID'
        },
        { status: 400 }
      );
    }

    const exerciseId = parseInt(id);

    // Query exercises table where id matches
    const exercise = await db.select()
      .from(exercises)
      .where(eq(exercises.id, exerciseId))
      .limit(1);

    // If not found, return 404
    if (exercise.length === 0) {
      return NextResponse.json(
        { 
          error: 'Exercise not found',
          code: 'EXERCISE_NOT_FOUND'
        },
        { status: 404 }
      );
    }

    // Return exercise object
    return NextResponse.json(exercise[0], { status: 200 });

  } catch (error) {
    console.error('GET exercise error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + error 
      },
      { status: 500 }
    );
  }
}