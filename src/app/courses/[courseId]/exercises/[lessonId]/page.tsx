import { notFound, permanentRedirect } from 'next/navigation';
import { getLegacyCurriculumRedirect } from '@/core/curriculum/legacyMigration';

interface LegacyExercisePageProps {
  params: Promise<{ courseId: string; lessonId: string }>;
}

export default async function LegacyExercisePage({ params }: LegacyExercisePageProps) {
  const { courseId, lessonId } = await params;
  const target = getLegacyCurriculumRedirect(courseId, 'exercise', lessonId);
  if (!target) notFound();
  permanentRedirect(target.href);
}
