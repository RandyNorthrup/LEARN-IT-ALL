import { NextResponse } from 'next/server';
import { ALL_COURSES } from '@/lib/data/courses';

export async function GET() {
  try {
    return NextResponse.json(ALL_COURSES);
  } catch (error) {
    console.error('Failed to fetch courses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}
