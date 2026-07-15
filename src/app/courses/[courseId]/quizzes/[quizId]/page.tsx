import { notFound, permanentRedirect } from 'next/navigation';
import { getLegacyCurriculumRedirect } from '@/core/curriculum/legacyMigration';

interface LegacyQuizPageProps {
  params: Promise<{ courseId: string; quizId: string }>;
}

export default async function LegacyQuizPage({ params }: LegacyQuizPageProps) {
  const { courseId, quizId } = await params;
  const target = getLegacyCurriculumRedirect(courseId, 'quiz', quizId);
  if (!target) notFound();
  permanentRedirect(target.href);
}
