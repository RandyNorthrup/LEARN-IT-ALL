import { notFound, permanentRedirect } from 'next/navigation';
import { getLegacyCurriculumRedirect } from '@/core/curriculum/legacyMigration';

interface LegacyLessonPageProps {
  params: Promise<{ courseId: string; lessonId: string }>;
}

export default async function LegacyLessonPage({ params }: LegacyLessonPageProps) {
  const { courseId, lessonId } = await params;
  const target = getLegacyCurriculumRedirect(courseId, 'lesson', lessonId);
  if (!target) notFound();
  permanentRedirect(target.href);
}
