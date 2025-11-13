import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { resources } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Validate ID is a valid positive integer
    const resourceId = parseInt(id);
    if (isNaN(resourceId) || resourceId <= 0) {
      return NextResponse.json(
        { 
          error: 'Invalid ID format. ID must be a valid positive integer.',
          code: 'INVALID_ID'
        },
        { status: 400 }
      );
    }

    // Query resource by ID
    const resource = await db.select()
      .from(resources)
      .where(eq(resources.id, resourceId))
      .limit(1);

    // Check if resource exists
    if (resource.length === 0) {
      return NextResponse.json(
        { 
          error: 'Resource not found',
          code: 'RESOURCE_NOT_FOUND'
        },
        { status: 404 }
      );
    }

    // Return the resource with all fields including full content
    return NextResponse.json(resource[0], { status: 200 });

  } catch (error) {
    console.error('GET /api/resources/[id] error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + error,
        code: 'INTERNAL_ERROR'
      },
      { status: 500 }
    );
  }
}