import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { quotes } from '@/db/schema';

export async function GET(request: NextRequest) {
  try {
    // Get all quotes from database
    const allQuotes = await db.select().from(quotes);

    // Check if any quotes exist
    if (allQuotes.length === 0) {
      return NextResponse.json(
        { error: 'No quotes available', code: 'NO_QUOTES_FOUND' },
        { status: 404 }
      );
    }

    // Get current date in YYYY-MM-DD format
    const today = new Date();
    const dateString = today.toISOString().split('T')[0];

    // Convert date to a deterministic number (seed)
    // Using a simple hash: sum of character codes
    let dateSeed = 0;
    for (let i = 0; i < dateString.length; i++) {
      dateSeed += dateString.charCodeAt(i);
    }

    // Add year, month, and day components for better distribution
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    dateSeed += year * 10000 + month * 100 + day;

    // Use modulo to get consistent index for the day
    const quoteIndex = dateSeed % allQuotes.length;

    // Get the daily quote
    const dailyQuote = allQuotes[quoteIndex];

    return NextResponse.json(dailyQuote, { status: 200 });
  } catch (error) {
    console.error('GET daily quote error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error },
      { status: 500 }
    );
  }
}