import { NextResponse } from 'next/server';
import { LEARNING_TRACKS } from '@/lib/data/tracks';

export async function GET() {
  try {
    return NextResponse.json(LEARNING_TRACKS);
  } catch (error) {
    console.error('Failed to fetch learning tracks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch learning tracks' },
      { status: 500 }
    );
  }
}
