import { NextResponse } from 'next/server';
import { loadCurriculumActivity } from '@/core/curriculum/repository';
import type { CurriculumActivity } from '@/core/curriculum/schema';
import { LearningDraftSchema } from '@/core/learning/submissionSchema';
import { dbHelpers } from '@/lib/db';
import { storedActivityAccess } from '@/lib/learningActivityAccess';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ courseId: string; activityId: string }> }
) {
  const { courseId, activityId } = await params;
  let activity: CurriculumActivity;
  try {
    activity = loadCurriculumActivity(courseId, activityId);
  } catch {
    return NextResponse.json({ error: 'Activity not found.' }, { status: 404 });
  }

  const parsed = LearningDraftSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: 'Draft is not valid.' }, { status: 400 });
  if (!storedActivityAccess(courseId, activity).canOpen) {
    return NextResponse.json(
      { error: 'Complete the prerequisite activity before saving work here.' },
      { status: 409 }
    );
  }
  if (!activity.steps.some((step) => step.id === parsed.data.stepId)) {
    return NextResponse.json({ error: 'Step not found.' }, { status: 404 });
  }

  dbHelpers.saveLearningDraft(
    courseId,
    activity.moduleId,
    activity.id,
    parsed.data.stepId,
    parsed.data
  );
  return NextResponse.json({ saved: true });
}
