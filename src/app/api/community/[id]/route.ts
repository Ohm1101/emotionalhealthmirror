import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { db } from '@/db';
import { communityPosts } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function PUT(
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
        { error: 'Authentication required', code: 'UNAUTHENTICATED' },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const { id } = await params;

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const postId = parseInt(id);

    if (postId <= 0) {
      return NextResponse.json(
        { error: 'ID must be a positive integer', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { content, emotionTag } = body;

    // Validate at least one field is provided
    if (content === undefined && emotionTag === undefined) {
      return NextResponse.json(
        { error: 'At least one field (content or emotionTag) must be provided', code: 'NO_UPDATE_FIELDS' },
        { status: 400 }
      );
    }

    // Validate content if provided
    if (content !== undefined) {
      if (typeof content !== 'string') {
        return NextResponse.json(
          { error: 'Content must be a string', code: 'INVALID_CONTENT_TYPE' },
          { status: 400 }
        );
      }

      const trimmedContent = content.trim();
      
      if (trimmedContent.length < 10) {
        return NextResponse.json(
          { error: 'Content must be at least 10 characters long', code: 'CONTENT_TOO_SHORT' },
          { status: 400 }
        );
      }

      if (trimmedContent.length > 1000) {
        return NextResponse.json(
          { error: 'Content must not exceed 1000 characters', code: 'CONTENT_TOO_LONG' },
          { status: 400 }
        );
      }
    }

    // Validate emotionTag if provided
    if (emotionTag !== undefined && typeof emotionTag !== 'string') {
      return NextResponse.json(
        { error: 'Emotion tag must be a string', code: 'INVALID_EMOTION_TAG' },
        { status: 400 }
      );
    }

    // Check if post exists and belongs to user
    const existingPost = await db.select()
      .from(communityPosts)
      .where(
        and(
          eq(communityPosts.id, postId),
          eq(communityPosts.userId, userId)
        )
      )
      .limit(1);

    if (existingPost.length === 0) {
      return NextResponse.json(
        { error: 'Post not found or you do not have permission to update it', code: 'POST_NOT_FOUND' },
        { status: 404 }
      );
    }

    // Prepare update data
    const updateData: Record<string, unknown> = {};
    
    if (content !== undefined) {
      updateData.content = content.trim();
    }
    
    if (emotionTag !== undefined) {
      updateData.emotionTag = emotionTag.trim();
    }

    // Update the post
    const updated = await db.update(communityPosts)
      .set(updateData)
      .where(
        and(
          eq(communityPosts.id, postId),
          eq(communityPosts.userId, userId)
        )
      )
      .returning();

    if (updated.length === 0) {
      return NextResponse.json(
        { error: 'Failed to update post', code: 'UPDATE_FAILED' },
        { status: 500 }
      );
    }

    return NextResponse.json(updated[0], { status: 200 });

  } catch (error) {
    console.error('PUT /api/community/[id] error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error },
      { status: 500 }
    );
  }
}

export async function DELETE(
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
        { error: 'Authentication required', code: 'UNAUTHENTICATED' },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const { id } = await params;

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const postId = parseInt(id);

    if (postId <= 0) {
      return NextResponse.json(
        { error: 'ID must be a positive integer', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    // Check if post exists and belongs to user
    const existingPost = await db.select()
      .from(communityPosts)
      .where(
        and(
          eq(communityPosts.id, postId),
          eq(communityPosts.userId, userId)
        )
      )
      .limit(1);

    if (existingPost.length === 0) {
      return NextResponse.json(
        { error: 'Post not found or you do not have permission to delete it', code: 'POST_NOT_FOUND' },
        { status: 404 }
      );
    }

    // Delete the post
    const deleted = await db.delete(communityPosts)
      .where(
        and(
          eq(communityPosts.id, postId),
          eq(communityPosts.userId, userId)
        )
      )
      .returning();

    if (deleted.length === 0) {
      return NextResponse.json(
        { error: 'Failed to delete post', code: 'DELETE_FAILED' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Post deleted successfully',
        deletedPost: deleted[0]
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('DELETE /api/community/[id] error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error },
      { status: 500 }
    );
  }
}