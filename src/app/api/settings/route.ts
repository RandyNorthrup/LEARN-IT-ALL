import { NextResponse } from 'next/server';
import { dbHelpers } from '@/lib/db';

export async function GET() {
  try {
    const settings = dbHelpers.getSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Failed to get settings:', error);
    return NextResponse.json({ displayName: 'Learner' });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { displayName } = body;

    if (!displayName || displayName.trim().length < 3) {
      return NextResponse.json(
        { error: 'Username must be at least 3 characters' },
        { status: 400 }
      );
    }

    dbHelpers.updateSettings(displayName.trim());
    return NextResponse.json({ displayName: displayName.trim() });
  } catch (error) {
    console.error('Failed to save username:', error);
    return NextResponse.json(
      { error: 'Failed to save username' },
      { status: 500 }
    );
  }
}
