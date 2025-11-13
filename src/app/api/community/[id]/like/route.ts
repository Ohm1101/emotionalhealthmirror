import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { db } from '@/db';
import { communityPosts, communityInteractions } from '@/db/schema';
import { eq, and, sql } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authentication check
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

    // Extract and validate postId from params
    const { id: postIdParam } = await params;
    const postId = parseInt(postIdParam);

    if (!postId || isNaN(postId) || postId <= 0) {
      return NextResponse.json(
        { error: 'Valid post ID is required', code: 'INVALID_POST_ID' },
        { status: 400 }
      );
    }

    // Check if post exists
    const post = await db
      .select()
      .from(communityPosts)
      .where(eq(communityPosts.id, postId))
      .limit(1);

    if (post.length === 0) {
      return NextResponse.json(
        { error: 'Post not found', code: 'POST_NOT_FOUND' },
        { status: 404 }
      );
    }

    // Check if user already liked this post
    const existingLike = await db
      .select()
      .from(communityInteractions)
      .where(
        and(
          eq(communityInteractions.userId, userId),
          eq(communityInteractions.postId, postId),
          eq(communityInteractions.interactionType, 'like')
        )
      )
      .limit(1);

    if (existingLike.length > 0) {
      // User already liked - unlike (delete interaction)
      await db
        .delete(communityInteractions)
        .where(
          and(
            eq(communityInteractions.userId, userId),
            eq(communityInteractions.postId, postId),
            eq(communityInteractions.interactionType, 'like')
          )
        );

      // Decrement likesCount
      const updatedPost = await db
        .update(communityPosts)
        .set({
          likesCount: sql`${communityPosts.likesCount} - 1`,
        })
        .where(eq(communityPosts.id, postId))
        .returning();

      return NextResponse.json(
        {
          liked: false,
          likesCount: updatedPost[0].likesCount,
        },
        { status: 200 }
      );
    } else {
      // User hasn't liked - create like interaction
      await db.insert(communityInteractions).values({
        userId,
        postId,
        interactionType: 'like',
        createdAt: new Date(),
      });

      // Increment likesCount
      const updatedPost = await db
        .update(communityPosts)
        .set({
          likesCount: sql`${communityPosts.likesCount} + 1`,
        })
        .where(eq(communityPosts.id, postId))
        .returning();

      return NextResponse.json(
        {
          liked: true,
          likesCount: updatedPost[0].likesCount,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('POST /api/community/[id]/like error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error },
      { status: 500 }
    );
  }
}