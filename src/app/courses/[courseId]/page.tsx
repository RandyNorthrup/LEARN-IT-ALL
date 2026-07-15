import { notFound, redirect } from 'next/navigation';
import CourseDetailClient, { type CourseData } from '@/app/courses/[courseId]/CourseDetailClient';
import { getCourseData } from '@/lib/courseLoader';
import { buildCourseProgress, type LessonProgressRecord } from '@/lib/courseProgress';
import { isV2Course } from '@/lib/data/courses';
import { dbHelpers } from '@/lib/db';

export const dynamic = 'force-dynamic';

interface CourseDetailPageProps {
  params: Promise<{ courseId: string }>;
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { courseId } = await params;
  if (isV2Course(courseId)) redirect(`/learn/${courseId}`);
  const course = getCourseData(courseId) as CourseData | null;

  if (!course) notFound();

  const lessonProgress = dbHelpers.getCourseLessonProgress(courseId) as LessonProgressRecord[];
  const progress = buildCourseProgress(lessonProgress);

  return <CourseDetailClient course={course} progress={progress} />;
}
