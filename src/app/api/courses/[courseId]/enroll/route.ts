import { legacyCurriculumApiResponse } from '@/lib/legacyCurriculumApi';

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  const { courseId } = await params;
  return legacyCurriculumApiResponse(courseId);
}
