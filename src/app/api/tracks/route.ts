import { NextResponse } from 'next/server';
import { PUBLISHED_LEARNING_TRACKS } from '@/lib/data/publishedTracks';

export async function GET() {
  try {
    return NextResponse.json(PUBLISHED_LEARNING_TRACKS);
  } catch (error) {
    console.error('Failed to fetch learning tracks:', error);
    return NextResponse.json({ error: 'Failed to fetch learning tracks' }, { status: 500 });
  }
}
