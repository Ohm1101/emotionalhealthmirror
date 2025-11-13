import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { db } from '@/db';
import { communityPosts, communityInteractions } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authentication check
    const session = await auth.api.getSession({ 
      headers: await headers() 
    });

    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const { id: postId } = await params;

    // Validate postId is a valid integer
    if (!postId || isNaN(parseInt(postId))) {
      return NextResponse.json(
        { error: 'Valid post ID is required', code: 'INVALID_POST_ID' },
        { status: 400 }
      );
    }

    const parsedPostId = parseInt(postId);

    if (parsedPostId <= 0) {
      return NextResponse.json(
        { error: 'Valid post ID is required', code: 'INVALID_POST_ID' },
        { status: 400 }
      );
    }

    // Check if post exists
    const post = await db
      .select()
      .from(communityPosts)
      .where(eq(communityPosts.id, parsedPostId))
      .limit(1);

    if (post.length === 0) {
      return NextResponse.json(
        { error: 'Post not found', code: 'POST_NOT_FOUND' },
        { status: 404 }
      );
    }

    // Check if user already reported this post
    const existingReport = await db
      .select()
      .from(communityInteractions)
      .where(
        and(
          eq(communityInteractions.userId, userId),
          eq(communityInteractions.postId, parsedPostId),
          eq(communityInteractions.interactionType, 'report')
        )
      )
      .limit(1);

    if (existingReport.length > 0) {
      return NextResponse.json(
        { error: 'Already reported this post', code: 'ALREADY_REPORTED' },
        { status: 400 }
      );
    }

    // Insert report interaction
    const newReport = await db
      .insert(communityInteractions)
      .values({
        userId,
        postId: parsedPostId,
        interactionType: 'report',
        createdAt: new Date()
      })
      .returning();

    // Update post to set isModerated flag
    await db
      .update(communityPosts)
      .set({
        isModerated: true
      })
      .where(eq(communityPosts.id, parsedPostId));

    return NextResponse.json(
      {
        success: true,
        message: 'Post reported successfully and flagged for review',
        report: newReport[0]
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('POST report error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error },
      { status: 500 }
    );
  }
}