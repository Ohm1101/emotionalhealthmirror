import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { db } from '@/db';
import { userProfiles } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ 
      headers: await headers() 
    });

    if (!session || !session.user) {
      return NextResponse.json({ 
        error: 'Authentication required',
        code: 'UNAUTHORIZED'
      }, { status: 401 });
    }

    const userId = session.user.id;

    const profile = await db.select()
      .from(userProfiles)
      .where(eq(userProfiles.userId, userId))
      .limit(1);

    if (profile.length === 0) {
      return NextResponse.json({ 
        error: 'Profile not found',
        code: 'PROFILE_NOT_FOUND'
      }, { status: 404 });
    }

    return NextResponse.json(profile[0], { status: 200 });

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ 
      headers: await headers() 
    });

    if (!session || !session.user) {
      return NextResponse.json({ 
        error: 'Authentication required',
        code: 'UNAUTHORIZED'
      }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await request.json();

    // Security check: reject if userId provided in body
    if ('userId' in body || 'user_id' in body) {
      return NextResponse.json({ 
        error: "User ID cannot be provided in request body",
        code: "USER_ID_NOT_ALLOWED" 
      }, { status: 400 });
    }

    const { age, gender } = body;

    // Validation
    if (age !== undefined && age !== null) {
      const ageNum = parseInt(age);
      if (isNaN(ageNum) || ageNum <= 0) {
        return NextResponse.json({ 
          error: 'Age must be a positive integer',
          code: 'INVALID_AGE'
        }, { status: 400 });
      }
    }

    if (gender !== undefined && gender !== null) {
      const trimmedGender = String(gender).trim();
      if (trimmedGender.length === 0) {
        return NextResponse.json({ 
          error: 'Gender cannot be empty if provided',
          code: 'INVALID_GENDER'
        }, { status: 400 });
      }
    }

    // Check if profile exists
    const existingProfile = await db.select()
      .from(userProfiles)
      .where(eq(userProfiles.userId, userId))
      .limit(1);

    const now = new Date();
    let result;

    if (existingProfile.length > 0) {
      // Update existing profile
      const updateData: { age?: number | null; gender?: string | null; updatedAt: Date } = {
        updatedAt: now
      };

      if (age !== undefined) {
        updateData.age = age !== null ? parseInt(age) : null;
      }

      if (gender !== undefined) {
        updateData.gender = gender !== null ? String(gender).trim() : null;
      }

      result = await db.update(userProfiles)
        .set(updateData)
        .where(eq(userProfiles.userId, userId))
        .returning();

    } else {
      // Create new profile
      result = await db.insert(userProfiles)
        .values({
          userId,
          age: age !== undefined && age !== null ? parseInt(age) : null,
          gender: gender !== undefined && gender !== null ? String(gender).trim() : null,
          createdAt: now,
          updatedAt: now
        })
        .returning();
    }

    if (result.length === 0) {
      return NextResponse.json({ 
        error: 'Failed to update or create profile',
        code: 'UPDATE_FAILED'
      }, { status: 500 });
    }

    return NextResponse.json(result[0], { status: 200 });

  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error 
    }, { status: 500 });
  }
}