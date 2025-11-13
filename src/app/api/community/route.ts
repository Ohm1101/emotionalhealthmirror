import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { db } from '@/db';
import { communityPosts } from '@/db/schema';
import { eq, desc, and } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');
    const emotionTag = searchParams.get('emotionTag');

    let query = db.select().from(communityPosts);

    if (emotionTag) {
      query = query.where(
        and(
          eq(communityPosts.emotionTag, emotionTag),
          eq(communityPosts.isModerated, false)
        )
      );
    } else {
      query = query.where(eq(communityPosts.isModerated, false));
    }

    const results = await query
      .orderBy(desc(communityPosts.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(results);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
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
    const body = await request.json();
    const { authorName, content, emotionTag, isAnonymous } = body;

    if (!authorName || typeof authorName !== 'string' || authorName.trim().length === 0) {
      return NextResponse.json(
        { error: 'authorName is required and must be a non-empty string', code: 'MISSING_AUTHOR_NAME' },
        { status: 400 }
      );
    }

    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return NextResponse.json(
        { error: 'content is required and must be a non-empty string', code: 'MISSING_CONTENT' },
        { status: 400 }
      );
    }

    if (content.trim().length < 10) {
      return NextResponse.json(
        { error: 'content must be at least 10 characters long', code: 'CONTENT_TOO_SHORT' },
        { status: 400 }
      );
    }

    if (content.trim().length > 1000) {
      return NextResponse.json(
        { error: 'content must not exceed 1000 characters', code: 'CONTENT_TOO_LONG' },
        { status: 400 }
      );
    }

    if (!emotionTag || typeof emotionTag !== 'string' || emotionTag.trim().length === 0) {
      return NextResponse.json(
        { error: 'emotionTag is required and must be a non-empty string', code: 'MISSING_EMOTION_TAG' },
        { status: 400 }
      );
    }

    const newPost = await db.insert(communityPosts)
      .values({
        userId,
        authorName: authorName.trim(),
        content: content.trim(),
        emotionTag: emotionTag.trim(),
        isAnonymous: isAnonymous ?? false,
        likesCount: 0,
        isModerated: false,
        createdAt: new Date(),
      })
      .returning();

    return NextResponse.json(newPost[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error },
      { status: 500 }
    );
  }
}