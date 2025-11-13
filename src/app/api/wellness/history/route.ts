import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { db } from '@/db';
import { wellnessScores } from '@/db/schema';
import { eq, desc, gte, and } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Get session and authenticate user
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const searchParams = request.nextUrl.searchParams;

    // Parse query parameters
    const limitParam = searchParams.get('limit');
    const offsetParam = searchParams.get('offset');
    const period = searchParams.get('period') || 'all';

    // Validate period parameter
    const validPeriods = ['weekly', 'monthly', 'all'];
    if (!validPeriods.includes(period)) {
      return NextResponse.json(
        { 
          error: 'Invalid period parameter. Must be one of: weekly, monthly, all',
          code: 'INVALID_PERIOD'
        },
        { status: 400 }
      );
    }

    // Parse and validate pagination parameters
    const limit = Math.min(parseInt(limitParam || '30'), 100);
    const offset = parseInt(offsetParam || '0');

    if (isNaN(limit) || limit < 1) {
      return NextResponse.json(
        { error: 'Invalid limit parameter', code: 'INVALID_LIMIT' },
        { status: 400 }
      );
    }

    if (isNaN(offset) || offset < 0) {
      return NextResponse.json(
        { error: 'Invalid offset parameter', code: 'INVALID_OFFSET' },
        { status: 400 }
      );
    }

    // Build query with user filter
    let query = db.select().from(wellnessScores);

    // Calculate date filters based on period
    const now = new Date();
    let dateFilter = null;

    if (period === 'weekly') {
      // Last 7 days
      const weekAgo = new Date(now);
      weekAgo.setDate(weekAgo.getDate() - 7);
      dateFilter = gte(wellnessScores.recordedAt, weekAgo);
    } else if (period === 'monthly') {
      // Last 30 days
      const monthAgo = new Date(now);
      monthAgo.setDate(monthAgo.getDate() - 30);
      dateFilter = gte(wellnessScores.recordedAt, monthAgo);
    }

    // Apply filters
    if (dateFilter) {
      query = query.where(
        and(
          eq(wellnessScores.userId, userId),
          dateFilter
        )
      );
    } else {
      query = query.where(eq(wellnessScores.userId, userId));
    }

    // Apply ordering and pagination
    const results = await query
      .orderBy(desc(wellnessScores.recordedAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(results, { status: 200 });

  } catch (error) {
    console.error('GET /api/wellness/history error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : String(error)),
        code: 'INTERNAL_SERVER_ERROR'
      },
      { status: 500 }
    );
  }
}