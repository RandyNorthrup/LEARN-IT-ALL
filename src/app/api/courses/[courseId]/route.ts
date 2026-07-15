import { NextResponse } from 'next/server';
import { getCourseById } from '@/lib/data/courses';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const { courseId } = await params;
    const courseData = getCourseById(courseId);

    if (!courseData) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    return NextResponse.json(courseData);
  } catch (error) {
    console.error('Failed to fetch course:', error);
    return NextResponse.json({ error: 'Failed to fetch course' }, { status: 500 });
  }
}
