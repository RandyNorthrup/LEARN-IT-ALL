import { NextResponse } from 'next/server';
import { dbHelpers } from '@/lib/db';
import { UpdateSettingsRequestSchema } from '@/lib/settingsContract';

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
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Request body must be valid JSON' }, { status: 400 });
  }

  const parsed = UpdateSettingsRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Display name must be between 3 and 80 characters' },
      { status: 400 }
    );
  }

  try {
    dbHelpers.updateSettings(parsed.data.displayName);
    return NextResponse.json({ displayName: parsed.data.displayName });
  } catch (error) {
    console.error('Failed to save username:', error);
    return NextResponse.json({ error: 'Failed to save username' }, { status: 500 });
  }
}
