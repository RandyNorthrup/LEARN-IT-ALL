import { legacyCurriculumApiResponse } from '@/lib/legacyCurriculumApi';

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ courseId: string; lessonId: string }> }
) {
  const { courseId, lessonId } = await params;
  return legacyCurriculumApiResponse(courseId, 'lesson', lessonId);
}
