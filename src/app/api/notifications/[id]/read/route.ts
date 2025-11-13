import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { db } from '@/db';
import { notifications } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authentication
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

    // Extract and validate ID
    const { id } = await params;
    const notificationId = parseInt(id);

    if (!id || isNaN(notificationId) || notificationId <= 0) {
      return NextResponse.json(
        { error: 'Valid notification ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    // Check if notification exists and belongs to user
    const existingNotification = await db
      .select()
      .from(notifications)
      .where(
        and(
          eq(notifications.id, notificationId),
          eq(notifications.userId, userId)
        )
      )
      .limit(1);

    if (existingNotification.length === 0) {
      return NextResponse.json(
        { 
          error: 'Notification not found or does not belong to user',
          code: 'NOT_FOUND'
        },
        { status: 404 }
      );
    }

    // Update notification to mark as read
    const updated = await db
      .update(notifications)
      .set({
        isRead: true
      })
      .where(
        and(
          eq(notifications.id, notificationId),
          eq(notifications.userId, userId)
        )
      )
      .returning();

    if (updated.length === 0) {
      return NextResponse.json(
        { 
          error: 'Failed to update notification',
          code: 'UPDATE_FAILED'
        },
        { status: 500 }
      );
    }

    return NextResponse.json(updated[0], { status: 200 });

  } catch (error) {
    console.error('PUT /api/notifications/[id]/read error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + error,
        code: 'INTERNAL_ERROR'
      },
      { status: 500 }
    );
  }
}