import { legacyCurriculumApiResponse } from '@/lib/legacyCurriculumApi';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ courseId: string; quizId: string }> }
) {
  const { courseId, quizId } = await params;
  return legacyCurriculumApiResponse(courseId, 'quiz', quizId);
}
