import { notFound, permanentRedirect } from 'next/navigation';
import { isV2Course } from '@/lib/data/courses';

interface CourseDetailPageProps {
  params: Promise<{ courseId: string }>;
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { courseId } = await params;
  if (isV2Course(courseId)) permanentRedirect(`/learn/${courseId}`);
  notFound();
}
