import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { quotes } from '@/db/schema';

export async function GET(request: NextRequest) {
  try {
    // Query all quotes from database
    const allQuotes = await db.select().from(quotes);

    // Check if any quotes exist
    if (!allQuotes || allQuotes.length === 0) {
      return NextResponse.json(
        { error: 'No quotes available', code: 'NO_QUOTES_FOUND' },
        { status: 404 }
      );
    }

    // Select random quote using Math.random()
    const randomIndex = Math.floor(Math.random() * allQuotes.length);
    const randomQuote = allQuotes[randomIndex];

    // Return the randomly selected quote
    return NextResponse.json(randomQuote, { status: 200 });
  } catch (error) {
    console.error('GET /api/quotes/random error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error },
      { status: 500 }
    );
  }
}