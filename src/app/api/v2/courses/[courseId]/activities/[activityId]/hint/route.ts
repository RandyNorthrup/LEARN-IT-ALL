import { NextResponse } from 'next/server';
import { z } from 'zod';
import { loadCurriculumActivity } from '@/core/curriculum/repository';
import type { CurriculumActivity } from '@/core/curriculum/schema';
import {
  buildActivityProgress,
  canOpenStep,
  type StepProgressRecord,
} from '@/core/learning/progress';
import { isPublishedCourse } from '@/lib/data/publishedCourses';
import { dbHelpers } from '@/lib/db';
import { readJsonRequestBody } from '@/lib/http/readJsonRequestBody';
import { storedActivityAccess } from '@/lib/learningActivityAccess';

const HintRequestSchema = z.object({ stepId: z.string().min(3) });

export async function POST(
  request: Request,
  { params }: { params: Promise<{ courseId: string; activityId: string }> }
) {
  const { courseId, activityId } = await params;
  if (!isPublishedCourse(courseId)) {
    return NextResponse.json({ error: 'Activity not found.' }, { status: 404 });
  }
  let activity: CurriculumActivity;
  try {
    activity = loadCurriculumActivity(courseId, activityId);
  } catch {
    return NextResponse.json({ error: 'Activity not found.' }, { status: 404 });
  }

  const parsed = HintRequestSchema.safeParse(await readJsonRequestBody(request));
  if (!parsed.success) return NextResponse.json({ error: 'Step is required.' }, { status: 400 });
  if (!storedActivityAccess(courseId, activity).canOpen) {
    return NextResponse.json(
      { error: 'Complete the prerequisite activity before requesting hints here.' },
      { status: 409 }
    );
  }
  const step = activity.steps.find((entry) => entry.id === parsed.data.stepId);
  if (!step) return NextResponse.json({ error: 'Step not found.' }, { status: 404 });

  const records = dbHelpers.getLearningStepProgress(activity.id) as StepProgressRecord[];
  const orderedStepIds = activity.steps.map((entry) => entry.id);
  const progress = buildActivityProgress(orderedStepIds, records);
  if (!canOpenStep(orderedStepIds, progress.completedStepIds, step.id)) {
    return NextResponse.json({ error: 'This step is still locked.' }, { status: 409 });
  }

  const updated = dbHelpers.revealLearningHint(courseId, activity.moduleId, activity.id, step.id);
  const hintIndex = Math.min(updated.hintsUsed, step.hints.length) - 1;
  return NextResponse.json({
    hint: step.hints[hintIndex],
    hintsUsed: updated.hintsUsed,
    remaining: Math.max(0, step.hints.length - updated.hintsUsed),
  });
}
