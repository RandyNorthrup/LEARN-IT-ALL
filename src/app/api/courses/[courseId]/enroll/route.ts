import { NextResponse } from 'next/server';
import { dbHelpers } from '@/lib/db';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const { courseId } = await params;

    // Check if already enrolled
    const existingEnrollment = dbHelpers.getEnrollment(courseId);

    if (existingEnrollment) {
      return NextResponse.json(existingEnrollment);
    }

    // Create new enrollment
    dbHelpers.createEnrollment(courseId);
    const enrollment = dbHelpers.getEnrollment(courseId);

    return NextResponse.json(enrollment);
  } catch (error) {
    console.error('Failed to enroll in course:', error);
    return NextResponse.json(
      { error: 'Failed to enroll in course' },
      { status: 500 }
    );
  }
}
