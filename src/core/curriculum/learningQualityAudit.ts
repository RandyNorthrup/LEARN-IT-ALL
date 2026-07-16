import type { CurriculumActivity, CurriculumCheck, CurriculumStep } from './schema';

export type LearningQualitySeverity = 'blocker' | 'warning';

export interface LearningQualityIssue {
  code:
    | 'delayed-artifact-practice'
    | 'generic-template-language'
    | 'repeated-step-instruction'
    | 'low-instruction-diversity'
    | 'missing-code-models'
    | 'token-only-grading'
    | 'shape-only-grading'
    | 'non-cumulative-final-check';
  severity: LearningQualitySeverity;
  courseId: string;
  activityId: string;
  stepIds: string[];
  message: string;
}

const genericPatterns = [
  {
    label: 'commit-to-claim checkpoint',
    pattern: /\bcommit to the claim\b/iu,
  },
  {
    label: 'generic existing-artifact edit',
    pattern: /\bedit the existing .{0,100} artifact\b/iu,
  },
  {
    label: 'generic retained-requirement reminder',
    pattern: /\bpreserve every earlier passing requirement\b/iu,
  },
  {
    label: 'generic run-checks instruction',
    pattern: /\brun the checks, inspect the (?:preview|output)\b/iu,
  },
  {
    label: 'generic strongest-evidence choice',
    pattern: /\bchoose the strongest (?:claim|evidence|answer|response)\b/iu,
  },
  {
    label: 'generic checkpoint wording',
    pattern: /\bcheckpoint (?:choice|order|claim|evidence|decision)\b/iu,
  },
] as const;

const lexicalCheckTypes = new Set<CurriculumCheck['type']>(['source-includes', 'source-matches']);

function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/gu, ' ')
    .trim();
}

function contentText(step: CurriculumStep): string {
  return step.content
    .map((block) => {
      if (block.type === 'code') return `${block.caption}\n${block.code}`;
      if (block.type === 'evidence') return `${block.label}\n${block.value}`;
      return `${'title' in block ? block.title : ''}\n${block.text}`;
    })
    .join('\n');
}

function learnerFacingText(step: CurriculumStep): string {
  return `${step.title}\n${step.instruction}\n${step.why}\n${contentText(step)}`;
}

function hasCodeModel(step: CurriculumStep): boolean {
  return step.content.some((block) => block.type === 'code');
}

function codeSteps(activity: CurriculumActivity): Array<{ index: number; step: CurriculumStep }> {
  return activity.steps.flatMap((step, index) =>
    step.interaction === 'code' || step.targetFile ? [{ index, step }] : []
  );
}

function checksForStep(activity: CurriculumActivity, step: CurriculumStep): CurriculumCheck[] {
  const ids = new Set(step.checkIds);
  return activity.checks.filter((check) => ids.has(check.id));
}

export function auditLearningActivity(activity: CurriculumActivity): LearningQualityIssue[] {
  const issues: LearningQualityIssue[] = [];
  const builds = codeSteps(activity);
  const isBuildActivity = ['workshop', 'lab', 'debug', 'project'].includes(activity.kind);

  if (isBuildActivity && builds.length > 0) {
    const latestAcceptedFirstIndex = activity.kind === 'workshop' ? 1 : 2;
    if (builds[0].index > latestAcceptedFirstIndex) {
      issues.push({
        code: 'delayed-artifact-practice',
        severity: 'blocker',
        courseId: activity.courseId,
        activityId: activity.id,
        stepIds: [builds[0].step.id],
        message: `The first artifact interaction is step ${builds[0].index + 1}; ${activity.kind} practice must begin by step ${latestAcceptedFirstIndex + 1}.`,
      });
    }
  }

  for (const { label, pattern } of genericPatterns) {
    const affected = activity.steps
      .filter((step) => pattern.test(learnerFacingText(step)))
      .map((step) => step.id);
    if (affected.length === 0) continue;
    issues.push({
      code: 'generic-template-language',
      severity: 'blocker',
      courseId: activity.courseId,
      activityId: activity.id,
      stepIds: affected,
      message: `${affected.length} step(s) use ${label} instead of activity-specific teaching.`,
    });
  }

  const instructionGroups = new Map<string, string[]>();
  for (const step of activity.steps) {
    const instruction = normalize(step.instruction);
    const ids = instructionGroups.get(instruction) ?? [];
    ids.push(step.id);
    instructionGroups.set(instruction, ids);
  }
  for (const stepIds of instructionGroups.values()) {
    if (stepIds.length < 3) continue;
    issues.push({
      code: 'repeated-step-instruction',
      severity: 'blocker',
      courseId: activity.courseId,
      activityId: activity.id,
      stepIds,
      message: `${stepIds.length} steps repeat the same normalized instruction.`,
    });
  }

  if (activity.steps.length >= 8) {
    const distinctInstructions = new Set(activity.steps.map((step) => normalize(step.instruction)));
    const diversity = distinctInstructions.size / activity.steps.length;
    if (diversity < 0.65) {
      issues.push({
        code: 'low-instruction-diversity',
        severity: 'blocker',
        courseId: activity.courseId,
        activityId: activity.id,
        stepIds: activity.steps.map((step) => step.id),
        message: `Only ${distinctInstructions.size} distinct instructions serve ${activity.steps.length} steps (${Math.round(diversity * 100)}%).`,
      });
    }
  }

  if (activity.kind === 'workshop' && builds.length >= 4) {
    const modelledSteps = builds.filter(({ step }) => hasCodeModel(step));
    if (modelledSteps.length / builds.length < 0.25) {
      issues.push({
        code: 'missing-code-models',
        severity: 'blocker',
        courseId: activity.courseId,
        activityId: activity.id,
        stepIds: builds.filter(({ step }) => !hasCodeModel(step)).map(({ step }) => step.id),
        message: `Only ${modelledSteps.length} of ${builds.length} workshop artifact steps include a concrete code model.`,
      });
    }
  }

  const tokenOnlySteps: string[] = [];
  const shapeOnlySteps: string[] = [];
  for (const { step } of builds) {
    const checks = checksForStep(activity, step);
    if (checks.length === 0) continue;
    if (checks.every((check) => check.type === 'source-includes')) {
      tokenOnlySteps.push(step.id);
    } else if (checks.every((check) => lexicalCheckTypes.has(check.type))) {
      shapeOnlySteps.push(step.id);
    }
  }
  if (tokenOnlySteps.length > 0) {
    issues.push({
      code: 'token-only-grading',
      severity: 'blocker',
      courseId: activity.courseId,
      activityId: activity.id,
      stepIds: tokenOnlySteps,
      message: `${tokenOnlySteps.length} artifact step(s) can pass using source token presence alone.`,
    });
  }
  if (shapeOnlySteps.length > 0) {
    issues.push({
      code: 'shape-only-grading',
      severity: 'warning',
      courseId: activity.courseId,
      activityId: activity.id,
      stepIds: shapeOnlySteps,
      message: `${shapeOnlySteps.length} artifact step(s) check source shape without runnable or semantic evidence.`,
    });
  }

  if (builds.length > 1) {
    const retainedCheckIds = new Set(builds.flatMap(({ step }) => step.checkIds));
    const finalCheckIds = new Set(builds.at(-1)?.step.checkIds ?? []);
    const missing = [...retainedCheckIds].filter((checkId) => !finalCheckIds.has(checkId));
    if (missing.length > 0) {
      issues.push({
        code: 'non-cumulative-final-check',
        severity: 'blocker',
        courseId: activity.courseId,
        activityId: activity.id,
        stepIds: [builds.at(-1)?.step.id ?? activity.steps.at(-1)?.id ?? activity.id],
        message: `The final artifact validation omits ${missing.length} earlier check(s).`,
      });
    }
  }

  return issues;
}

export interface LearningQualitySummary {
  activityCount: number;
  blockerCount: number;
  warningCount: number;
  affectedActivityCount: number;
  issueCounts: Record<string, number>;
}

export function summarizeLearningQuality(
  activities: CurriculumActivity[],
  issues: LearningQualityIssue[] = activities.flatMap(auditLearningActivity)
): LearningQualitySummary {
  const issueCounts: Record<string, number> = {};
  for (const issue of issues) issueCounts[issue.code] = (issueCounts[issue.code] ?? 0) + 1;
  return {
    activityCount: activities.length,
    blockerCount: issues.filter((issue) => issue.severity === 'blocker').length,
    warningCount: issues.filter((issue) => issue.severity === 'warning').length,
    affectedActivityCount: new Set(issues.map((issue) => issue.activityId)).size,
    issueCounts,
  };
}
