import { NextResponse } from 'next/server';
import { loadCurriculumActivity } from '@/core/curriculum/repository';
import type { CurriculumActivity } from '@/core/curriculum/schema';
import { validateCurriculumChecks } from '@/core/curriculum/validator';
import {
  buildActivityProgress,
  canOpenStep,
  type StepProgressRecord,
} from '@/core/learning/progress';
import { LearningSubmissionSchema } from '@/core/learning/submissionSchema';
import { isPublishedCourse } from '@/lib/data/publishedCourses';
import { dbHelpers } from '@/lib/db';
import { readJsonRequestBody } from '@/lib/http/readJsonRequestBody';
import { storedActivityAccess } from '@/lib/learningActivityAccess';

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

  const parsed = LearningSubmissionSchema.safeParse(await readJsonRequestBody(request));
  if (!parsed.success) {
    return NextResponse.json({ error: 'Submission is not valid.' }, { status: 400 });
  }

  if (!storedActivityAccess(courseId, activity).canOpen) {
    return NextResponse.json(
      { error: 'Complete the prerequisite activity before attempting this one.' },
      { status: 409 }
    );
  }

  const step = activity.steps.find((entry) => entry.id === parsed.data.stepId);
  if (!step) return NextResponse.json({ error: 'Step not found.' }, { status: 404 });

  const records = dbHelpers.getLearningStepProgress(activity.id) as StepProgressRecord[];
  const orderedStepIds = activity.steps.map((entry) => entry.id);
  const progress = buildActivityProgress(orderedStepIds, records);
  if (!canOpenStep(orderedStepIds, progress.completedStepIds, step.id)) {
    return NextResponse.json(
      { error: 'Complete the current step before opening this one.' },
      { status: 409 }
    );
  }

  const checkIdSet = new Set(step.checkIds);
  const checks = activity.checks.filter((check) => checkIdSet.has(check.id));
  const results = validateCurriculumChecks(parsed.data, checks);
  const passed = results.length > 0 && results.every((result) => result.passed);
  const record = records.find((entry) => entry.stepId === step.id);
  const xp = Math.max(1, step.xp - (record?.hintsUsed ?? 0) * 2);
  const persisted = dbHelpers.recordLearningAttempt(
    courseId,
    activity.moduleId,
    activity.id,
    step.id,
    passed,
    xp,
    activity.mastery.spacedReviewDays,
    parsed.data
  );
  const visibleCheckIds = new Set(checks.filter((check) => !check.hidden).map((check) => check.id));
  const publicResults = results.filter((result) => visibleCheckIds.has(result.id));
  const hiddenFailures = results.filter(
    (result) => !visibleCheckIds.has(result.id) && !result.passed
  ).length;
  const currentIndex = orderedStepIds.indexOf(step.id);

  return NextResponse.json({
    passed,
    newlyCompleted: persisted.newlyCompleted,
    earnedXp: passed ? persisted.earnedXp : 0,
    results: publicResults,
    hiddenFailureMessage:
      hiddenFailures > 0
        ? `${hiddenFailures} additional requirement${hiddenFailures === 1 ? '' : 's'} still need attention.`
        : null,
    nextStepId: passed ? (orderedStepIds[currentIndex + 1] ?? null) : step.id,
  });
}
