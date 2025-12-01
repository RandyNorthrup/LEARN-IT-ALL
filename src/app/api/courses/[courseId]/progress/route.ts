import { NextResponse } from 'next/server';
import { dbHelpers } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const { courseId } = await params;

    const allProgress = dbHelpers.getCourseLessonProgress(courseId) as Array<{
      status: string;
      lessonId: string;
    }>;
    const completedLessons = allProgress
      .filter((p) => p.status === 'COMPLETED')
      .map((p) => p.lessonId);

    return NextResponse.json({
      completedLessons,
      completedExercises: [],
      passedQuizzes: [],
    });
  } catch (error) {
    console.error('Failed to fetch course progress:', error);
    return NextResponse.json(
      { error: 'Failed to fetch course progress' },
      { status: 500 }
    );
  }
}
