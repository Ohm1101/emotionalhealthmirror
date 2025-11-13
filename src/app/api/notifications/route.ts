import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { notifications } from '@/db/schema';
import { eq, desc, and } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    // Authentication check
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const searchParams = request.nextUrl.searchParams;

    // Pagination parameters
    const limit = Math.min(
      parseInt(searchParams.get('limit') || '20'),
      100
    );
    const offset = parseInt(searchParams.get('offset') || '0');

    // Filter parameters
    const unreadOnly = searchParams.get('unreadOnly') === 'true';

    // Build query conditions
    const conditions = [eq(notifications.userId, userId)];

    if (unreadOnly) {
      conditions.push(eq(notifications.isRead, false));
    }

    // Execute query
    const results = await db
      .select()
      .from(notifications)
      .where(and(...conditions))
      .orderBy(desc(notifications.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('GET notifications error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error },
      { status: 500 }
    );
  }
}