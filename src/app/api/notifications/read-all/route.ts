import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { notifications } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function PUT(request: NextRequest) {
  try {
    // Get session
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // Update all notifications for the user to mark them as read
    const updated = await db
      .update(notifications)
      .set({
        isRead: true
      })
      .where(eq(notifications.userId, userId))
      .returning();

    const count = updated.length;

    return NextResponse.json(
      {
        message: 'All notifications marked as read',
        count
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('PUT /api/notifications/read-all error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error },
      { status: 500 }
    );
  }
}