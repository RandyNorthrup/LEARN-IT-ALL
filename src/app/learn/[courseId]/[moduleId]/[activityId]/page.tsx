import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LearningStudio } from '@/components/learning/LearningStudio';
import { LockedActivity } from '@/components/learning/LockedActivity';
import { StepIntro } from '@/components/learning/StepIntro';
import { toLearnerActivity } from '@/core/curriculum/publicActivity';
import {
  loadCurriculumActivity,
  loadCurriculumCourse,
  loadCurriculumModule,
} from '@/core/curriculum/repository';
import {
  cumulativeLearningFiles,
  EMPTY_LEARNING_FILES,
  learningInputDrafts,
} from '@/core/learning/draft';
import { buildActivityProgress, type StepProgressRecord } from '@/core/learning/progress';
import { dbHelpers } from '@/lib/db';
import { storedActivityAccess } from '@/lib/learningActivityAccess';

interface LearningPageProps {
  params: Promise<{ courseId: string; moduleId: string; activityId: string }>;
}

function loadPageData(courseId: string, moduleId: string, activityId: string) {
  try {
    const course = loadCurriculumCourse(courseId);
    const module = loadCurriculumModule(courseId, moduleId);
    const activity = loadCurriculumActivity(courseId, activityId);
    if (activity.moduleId !== module.id || module.courseId !== course.id) return null;
    return { course, module, activity };
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: LearningPageProps): Promise<Metadata> {
  const { courseId, moduleId, activityId } = await params;
  const data = loadPageData(courseId, moduleId, activityId);
  return data
    ? { title: `${data.activity.title} · ${data.course.title}` }
    : { title: 'Learning activity not found' };
}

export default async function LearningPage({ params }: LearningPageProps) {
  const { courseId, moduleId, activityId } = await params;
  const data = loadPageData(courseId, moduleId, activityId);
  if (!data) notFound();
  const access = storedActivityAccess(courseId, data.activity);
  if (!access.canOpen) {
    return (
      <LockedActivity
        courseId={courseId}
        activityTitle={data.activity.title}
        prerequisites={access.unmetPrerequisites}
      />
    );
  }

  const records = dbHelpers.getLearningStepProgress(activityId) as StepProgressRecord[];
  const progress = buildActivityProgress(
    data.activity.steps.map((step) => step.id),
    records
  );
  const starterFiles = data.activity.starterFiles ?? EMPTY_LEARNING_FILES;
  const prerequisiteRecordGroups = data.activity.artifactId
    ? access.prerequisites
        .filter((prerequisite) => prerequisite.artifactId === data.activity.artifactId)
        .map(
          (prerequisite) =>
            dbHelpers.getLearningStepProgress(prerequisite.id) as StepProgressRecord[]
        )
    : [];
  const learnerActivity = toLearnerActivity(data.activity);
  const initialStep = learnerActivity.steps.find((step) => step.id === progress.currentStepId);
  if (!initialStep) notFound();

  return (
    <LearningStudio
      activity={learnerActivity}
      courseTitle={data.course.title}
      moduleTitle={data.module.title}
      initialProgress={{
        completedStepIds: progress.completedStepIds,
        currentStepId: progress.currentStepId,
        percent: progress.percent,
      }}
      initialFiles={cumulativeLearningFiles(records, prerequisiteRecordGroups, starterFiles)}
      initialDrafts={learningInputDrafts(records)}
      initialStepIntro={<StepIntro step={initialStep} />}
    />
  );
}
