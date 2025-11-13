import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { db } from '@/db';
import { recommendations } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Get session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // Extract and validate id
    const { id } = await params;
    const recommendationId = parseInt(id);

    if (!id || isNaN(recommendationId) || recommendationId <= 0) {
      return NextResponse.json(
        { error: 'Valid recommendation ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    // Query recommendation with userId security check
    const existingRecommendation = await db
      .select()
      .from(recommendations)
      .where(
        and(
          eq(recommendations.id, recommendationId),
          eq(recommendations.userId, userId)
        )
      )
      .limit(1);

    if (existingRecommendation.length === 0) {
      return NextResponse.json(
        {
          error: 'Recommendation not found or access denied',
          code: 'NOT_FOUND',
        },
        { status: 404 }
      );
    }

    // Update recommendation to mark as completed
    const updated = await db
      .update(recommendations)
      .set({
        isCompleted: true,
      })
      .where(
        and(
          eq(recommendations.id, recommendationId),
          eq(recommendations.userId, userId)
        )
      )
      .returning();

    if (updated.length === 0) {
      return NextResponse.json(
        {
          error: 'Failed to update recommendation',
          code: 'UPDATE_FAILED',
        },
        { status: 500 }
      );
    }

    return NextResponse.json(updated[0], { status: 200 });
  } catch (error) {
    console.error('PUT /api/recommendations/[id] error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error },
      { status: 500 }
    );
  }
}