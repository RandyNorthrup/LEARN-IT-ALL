import { NextResponse } from 'next/server';
import { isPublishedCourse } from '@/lib/data/publishedCourses';
import { dbHelpers } from '@/lib/db';
import { ClearProgressRequestSchema } from '@/lib/progressClear';

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Request body must be valid JSON' }, { status: 400 });
  }

  const parsed = ClearProgressRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid progress reset request' }, { status: 400 });
  }

  try {
    if (parsed.data.type === 'all') {
      dbHelpers.clearAllProgress();
    } else if (parsed.data.type === 'course') {
      if (!isPublishedCourse(parsed.data.courseId)) {
        return NextResponse.json({ error: 'Course not found' }, { status: 404 });
      }
      dbHelpers.clearCourseProgress(parsed.data.courseId);
    } else {
      dbHelpers.clearLearningActivityProgress(parsed.data.activityId);
    }

    return NextResponse.json({ success: true, cleared: parsed.data.type });
  } catch (error) {
    console.error('Failed to clear progress:', error);
    return NextResponse.json({ error: 'Failed to clear progress' }, { status: 500 });
  }
}
