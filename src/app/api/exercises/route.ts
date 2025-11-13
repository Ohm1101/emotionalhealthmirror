import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { exercises } from '@/db/schema';
import { eq, and, desc, asc } from 'drizzle-orm';

const VALID_CATEGORIES = ['breathing', 'stress', 'tension', 'anxiety', 'depression', 'nervousness'];
const VALID_DIFFICULTIES = ['easy', 'medium', 'hard'];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Parse query parameters
    const category = searchParams.get('category');
    const difficulty = searchParams.get('difficulty');
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');

    // Validate category if provided
    if (category && !VALID_CATEGORIES.includes(category)) {
      return NextResponse.json(
        { 
          error: `Invalid category. Must be one of: ${VALID_CATEGORIES.join(', ')}`,
          code: 'INVALID_CATEGORY'
        },
        { status: 400 }
      );
    }

    // Validate difficulty if provided
    if (difficulty && !VALID_DIFFICULTIES.includes(difficulty)) {
      return NextResponse.json(
        { 
          error: `Invalid difficulty. Must be one of: ${VALID_DIFFICULTIES.join(', ')}`,
          code: 'INVALID_DIFFICULTY'
        },
        { status: 400 }
      );
    }

    // Build query with filters
    let query = db.select().from(exercises);

    // Apply filters
    const conditions = [];
    if (category) {
      conditions.push(eq(exercises.category, category));
    }
    if (difficulty) {
      conditions.push(eq(exercises.difficulty, difficulty));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    // Apply ordering: category first, then difficulty
    query = query
      .orderBy(asc(exercises.category), asc(exercises.difficulty))
      .limit(limit)
      .offset(offset);

    const results = await query;

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('GET exercises error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error },
      { status: 500 }
    );
  }
}