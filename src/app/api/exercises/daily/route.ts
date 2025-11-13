import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { exercises } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';

const CATEGORIES = ['breathing', 'stress', 'tension', 'anxiety', 'depression', 'nervousness'];

export async function GET(request: NextRequest) {
  try {
    const dailyExercises: any[] = [];

    // For each category, get one random exercise
    for (const category of CATEGORIES) {
      try {
        // Query all exercises for this category
        const categoryExercises = await db.select()
          .from(exercises)
          .where(eq(exercises.category, category));

        // If exercises exist for this category, pick one randomly
        if (categoryExercises.length > 0) {
          const randomIndex = Math.floor(Math.random() * categoryExercises.length);
          dailyExercises.push(categoryExercises[randomIndex]);
        }
      } catch (categoryError) {
        console.error(`Error fetching exercises for category ${category}:`, categoryError);
        // Continue to next category if one fails
        continue;
      }
    }

    // Return the array of daily exercises (might be less than 6 if some categories have no exercises)
    return NextResponse.json(dailyExercises, { status: 200 });

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error,
      code: 'INTERNAL_ERROR'
    }, { status: 500 });
  }
}