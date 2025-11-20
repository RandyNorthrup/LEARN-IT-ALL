import { NextResponse } from 'next/server';
import { dbHelpers } from '@/lib/db';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ courseId: string; lessonId: string }> }
) {
  try {
    const { courseId, lessonId } = await params;

    // Mark lesson as complete
    dbHelpers.markLessonComplete(lessonId, courseId);

    // Load course data to get total lesson count
    const coursePath = join(process.cwd(), 'content', 'courses', courseId, 'course.json');
    const courseData = JSON.parse(await readFile(coursePath, 'utf-8')) as {
      chapters: Array<{ lessons?: unknown[] }>;
    };
    const totalLessons = courseData.chapters.reduce(
      (sum: number, chapter: { lessons?: unknown[] }) => sum + (chapter.lessons?.length || 0),
      0
    );

    // Get completed lesson count
    const allProgress = dbHelpers.getCourseLessonProgress(courseId) as Array<{
      status: string;
      lessonId: string;
    }>;
    const completedLessons = allProgress.filter((p) => p.status === 'COMPLETED').length;

    const completionPercentage =
      totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

    // Update enrollment
    dbHelpers.updateEnrollmentProgress(courseId, completionPercentage);

    return NextResponse.json({ success: true, completionPercentage });
  } catch (error) {
    console.error('Failed to complete lesson:', error);
    return NextResponse.json(
      { error: 'Failed to complete lesson' },
      { status: 500 }
    );
  }
}
