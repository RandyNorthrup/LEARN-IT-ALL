import { NextResponse } from 'next/server';
import { getLessonData } from '@/lib/lessonLoader';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ courseId: string; lessonId: string }> }
) {
  try {
    const { courseId, lessonId } = await params;
    const lessonData = getLessonData(courseId, lessonId);

    if (!lessonData) {
      return NextResponse.json(
        { error: 'Lesson not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(lessonData);
  } catch (error) {
    console.error('Failed to fetch lesson:', error);
    return NextResponse.json(
      { error: 'Failed to fetch lesson' },
      { status: 500 }
    );
  }
}
