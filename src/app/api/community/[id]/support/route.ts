import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { communityPosts, communityInteractions } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authentication
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

    // Extract and validate postId
    const { id: postIdParam } = await params;
    const postId = parseInt(postIdParam);

    if (!postId || isNaN(postId) || postId <= 0) {
      return NextResponse.json(
        { error: 'Valid post ID is required', code: 'INVALID_POST_ID' },
        { status: 400 }
      );
    }

    // Validate post exists
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

    // Check if user already supported this post
    const existingSupport = await db
      .select()
      .from(communityInteractions)
      .where(
        and(
          eq(communityInteractions.userId, userId),
          eq(communityInteractions.postId, postId),
          eq(communityInteractions.interactionType, 'support')
        )
      )
      .limit(1);

    if (existingSupport.length > 0) {
      return NextResponse.json(
        { error: 'Already supported this post', code: 'ALREADY_SUPPORTED' },
        { status: 400 }
      );
    }

    // Insert support interaction
    const newInteraction = await db
      .insert(communityInteractions)
      .values({
        userId,
        postId,
        interactionType: 'support',
        createdAt: new Date()
      })
      .returning();

    return NextResponse.json(
      {
        message: 'Post supported successfully',
        interaction: newInteraction[0]
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('POST support error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error },
      { status: 500 }
    );
  }
}