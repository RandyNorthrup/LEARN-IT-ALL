import { z } from 'zod';
import { ActivityKindSchema, CurriculumCompetencySchema } from './schema';

const IdSchema = z
  .string()
  .min(3)
  .max(120)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

export const CoverageStageSchema = z.enum(['I', 'G', 'F', 'R', 'A', 'T']);

export const BlueprintStatusSchema = z.enum([
  'audit-required',
  'researching',
  'researched',
  'authoring',
  'in-review',
  'approved',
]);

const SkillCoverageSchema = z.object({
  competencyId: IdSchema,
  stages: z.array(CoverageStageSchema).min(1),
});

const PlannedActivitySchema = z.object({
  id: IdSchema,
  title: z.string().min(5),
  kind: ActivityKindSchema,
  authenticContext: z.string().min(20),
  coverage: z.array(SkillCoverageSchema).min(1),
  learningDesign: z.object({
    buildsOnCompetencyIds: z.array(IdSchema),
    newCompetencyIds: z.array(IdSchema),
    retainedPractice: z.string().min(20),
    learnerArtifact: z.string().min(20),
    supportLevel: z.enum(['modeled', 'guided', 'faded', 'independent']),
  }),
  estimatedMinutes: z.number().int().positive(),
});

const PlannedModuleSchema = z.object({
  id: IdSchema,
  title: z.string().min(5),
  order: z.number().int().positive(),
  prerequisiteModuleIds: z.array(IdSchema),
  sourceObjectiveIds: z.array(z.string().min(3)).default([]),
  objectives: z.array(z.string().min(10)).min(1),
  activities: z.array(PlannedActivitySchema).min(1),
});

const PlannedProjectSchema = z.object({
  id: IdSchema,
  title: z.string().min(5),
  stakeholder: z.string().min(10),
  userNeed: z.string().min(20),
  constraints: z.array(z.string().min(10)).min(3),
  competencyIds: z.array(IdSchema).min(2),
  rubricDimensions: z.array(z.string().min(10)).min(3),
});

export const CourseBlueprintSchema = z.object({
  schemaVersion: z.literal(1),
  id: IdSchema,
  title: z.string().min(5),
  version: z.string().min(1),
  status: BlueprintStatusSchema,
  researchedAt: z.iso.datetime(),
  audience: z.object({
    description: z.string().min(30),
    entryKnowledge: z.array(z.string().min(10)).min(1),
    deviceConstraints: z.array(z.string().min(5)).min(1),
    accessibilityAssumptions: z.array(z.string().min(10)).min(1),
  }),
  pathways: z.object({
    prerequisiteCourseIds: z.array(IdSchema),
    placementEvidence: z.array(z.string().min(20)).min(1),
    completionEvidence: z.array(z.string().min(20)).min(2),
  }),
  scope: z.object({
    includes: z.array(z.string().min(5)).min(3),
    excludes: z.array(z.string().min(5)).min(1),
    nextCourses: z.array(IdSchema),
  }),
  sources: z
    .array(
      z.object({
        id: IdSchema.optional(),
        title: z.string().min(5),
        authority: z.enum([
          'standard',
          'official-docs',
          'certification-objectives',
          'curriculum-framework',
          'peer-reviewed-research',
        ]),
        url: z.url(),
        version: z.string().min(1),
        reviewedAt: z.iso.date(),
        scope: z.string().min(10),
        limitations: z.array(z.string().min(15)).min(1).optional(),
        decisionIds: z.array(IdSchema).min(1).optional(),
        nextReview: z
          .object({
            onOrBefore: z.iso.date().optional(),
            triggers: z.array(z.string().min(10)).min(1),
          })
          .optional(),
      })
    )
    .min(3),
  sharedRequirements: z.array(z.string().min(20)).default([]),
  competencies: z.array(CurriculumCompetencySchema).min(3),
  modules: z.array(PlannedModuleSchema).min(1),
  projects: z.array(PlannedProjectSchema).min(3),
  assessmentBlueprint: z.object({
    masteryThresholdPercent: z.number().int().min(70).max(100),
    formativeCorrectionPolicy: z.string().min(30),
    finalExamCompetencyIds: z.array(IdSchema).min(3),
    minimumQuestionBankSize: z.number().int().min(30),
    performanceAssessmentIds: z.array(IdSchema).min(1),
  }),
  spiralPolicy: z.object({
    immediateGuidedUse: z.boolean(),
    sameModuleFadedUse: z.boolean(),
    nextRelevantLessonUse: z.boolean(),
    independentLabUse: z.boolean(),
    delayedRetrievalUse: z.boolean(),
    cumulativeProjectUse: z.boolean(),
  }),
});

export type CourseBlueprint = z.infer<typeof CourseBlueprintSchema>;

export function auditCourseBlueprint(blueprint: CourseBlueprint): string[] {
  const errors: string[] = [];
  const competencyIds = new Set(blueprint.competencies.map((competency) => competency.id));
  const moduleById = new Map(blueprint.modules.map((module) => [module.id, module]));
  const activityIds = new Set<string>();
  const coverage = new Map<string, Set<z.infer<typeof CoverageStageSchema>>>();
  const introducedAt = new Map<string, string>();
  const introductionSequence = new Map<string, number>();
  let activitySequence = 0;

  if (competencyIds.size !== blueprint.competencies.length) errors.push('Duplicate competency IDs');
  if (moduleById.size !== blueprint.modules.length) errors.push('Duplicate module IDs');

  const normalizedDuplicates = (values: string[]) => {
    const seen = new Set<string>();
    const duplicates = new Set<string>();
    for (const value of values) {
      const normalized = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, ' ')
        .trim();
      if (seen.has(normalized)) duplicates.add(value);
      seen.add(normalized);
    }
    return [...duplicates];
  };
  if (normalizedDuplicates(blueprint.competencies.map((entry) => entry.statement)).length) {
    errors.push('Duplicate competency statements');
  }
  if (normalizedDuplicates(blueprint.modules.map((entry) => entry.title)).length) {
    errors.push('Duplicate module titles');
  }
  if (normalizedDuplicates(blueprint.projects.map((entry) => entry.title)).length) {
    errors.push('Duplicate project titles');
  }

  const introducedBefore = new Set<string>();
  const orderedModules = [...blueprint.modules].sort((a, b) => a.order - b.order);
  orderedModules.forEach((module, moduleIndex) => {
    if (module.order !== moduleIndex + 1) {
      errors.push(`Module ${module.id} has order ${module.order}; expected ${moduleIndex + 1}`);
    }
    for (const prerequisiteId of module.prerequisiteModuleIds) {
      const prerequisite = moduleById.get(prerequisiteId);
      if (!prerequisite)
        errors.push(`Module ${module.id} has missing prerequisite ${prerequisiteId}`);
      else if (prerequisite.order >= module.order) {
        errors.push(`Module ${module.id} depends on later module ${prerequisiteId}`);
      }
    }

    module.activities.forEach((activity, activityIndex) => {
      activitySequence += 1;
      if (activityIds.has(activity.id)) errors.push(`Duplicate activity ID: ${activity.id}`);
      activityIds.add(activity.id);
      const activitySkills = new Set(activity.coverage.map((entry) => entry.competencyId));
      for (const entry of activity.coverage) {
        if (!competencyIds.has(entry.competencyId)) {
          errors.push(
            `Activity ${activity.id} references missing competency ${entry.competencyId}`
          );
          continue;
        }
        const stages = coverage.get(entry.competencyId) ?? new Set();
        entry.stages.forEach((stage) => {
          stages.add(stage);
        });
        coverage.set(entry.competencyId, stages);
      }

      const isFirstActivity = moduleIndex === 0 && activityIndex === 0;
      const buildsOn = new Set(activity.learningDesign.buildsOnCompetencyIds);
      const newCompetencies = new Set(activity.learningDesign.newCompetencyIds);
      if (!isFirstActivity && buildsOn.size === 0) {
        errors.push(`Activity ${activity.id} declares no prior competency to build on`);
      }
      for (const competencyId of buildsOn) {
        if (!competencyIds.has(competencyId)) {
          errors.push(`Activity ${activity.id} builds on missing competency ${competencyId}`);
        } else if (!introducedBefore.has(competencyId)) {
          errors.push(`Activity ${activity.id} builds on ${competencyId} before it is introduced`);
        }
        if (!activitySkills.has(competencyId)) {
          errors.push(
            `Activity ${activity.id} does not practice declared prerequisite ${competencyId}`
          );
        }
      }
      for (const competencyId of newCompetencies) {
        const entry = activity.coverage.find((item) => item.competencyId === competencyId);
        if (!entry?.stages.includes('I')) {
          errors.push(
            `Activity ${activity.id} does not introduce declared new competency ${competencyId}`
          );
        }
        if (introducedBefore.has(competencyId)) {
          errors.push(
            `Activity ${activity.id} re-declares introduced competency ${competencyId} as new`
          );
        }
      }
      for (const entry of activity.coverage) {
        if (entry.stages.includes('I') && !newCompetencies.has(entry.competencyId)) {
          errors.push(
            `Activity ${activity.id} omits introduced competency ${entry.competencyId} from newCompetencyIds`
          );
        }
      }
      if (!isFirstActivity && ![...activitySkills].some((skill) => introducedBefore.has(skill))) {
        errors.push(
          `Activity ${activity.id} does not reinforce any previously introduced competency`
        );
      }
      activity.coverage.forEach((entry) => {
        if (entry.stages.includes('I')) {
          introducedBefore.add(entry.competencyId);
          introducedAt.set(entry.competencyId, activity.id);
          introductionSequence.set(entry.competencyId, activitySequence);
        }
      });
    });
  });

  for (const competency of blueprint.competencies) {
    for (const prerequisiteId of competency.prerequisiteIds) {
      if (!competencyIds.has(prerequisiteId)) {
        errors.push(`Competency ${competency.id} has missing prerequisite ${prerequisiteId}`);
      }
      if (!introducedAt.has(prerequisiteId)) {
        errors.push(
          `Competency ${competency.id} prerequisite ${prerequisiteId} is never introduced`
        );
      } else if (
        (introductionSequence.get(prerequisiteId) ?? Number.POSITIVE_INFINITY) >=
        (introductionSequence.get(competency.id) ?? Number.POSITIVE_INFINITY)
      ) {
        errors.push(
          `Competency ${competency.id} is introduced before prerequisite ${prerequisiteId}`
        );
      }
    }
  }

  const requiredStages = ['I', 'G', 'F', 'R', 'A', 'T'] as const;
  for (const competency of blueprint.competencies) {
    const stages = coverage.get(competency.id) ?? new Set();
    for (const stage of requiredStages) {
      if (!stages.has(stage))
        errors.push(`Competency ${competency.id} is missing ${stage} coverage`);
    }
  }

  for (const project of blueprint.projects) {
    for (const competencyId of project.competencyIds) {
      if (!competencyIds.has(competencyId)) {
        errors.push(`Project ${project.id} references missing competency ${competencyId}`);
      }
    }
  }
  for (const competencyId of blueprint.assessmentBlueprint.finalExamCompetencyIds) {
    if (!competencyIds.has(competencyId)) {
      errors.push(`Final exam references missing competency ${competencyId}`);
    }
  }
  for (const assessmentId of blueprint.assessmentBlueprint.performanceAssessmentIds) {
    if (!blueprint.projects.some((project) => project.id === assessmentId)) {
      errors.push(`Missing performance assessment project ${assessmentId}`);
    }
  }

  const examLocations = blueprint.modules.flatMap((module) =>
    module.activities
      .filter((activity) => activity.kind === 'exam')
      .map((activity) => ({ activityId: activity.id, moduleId: module.id }))
  );
  if (examLocations.length !== 1) {
    errors.push(`Expected exactly one cumulative exam; found ${examLocations.length}`);
  } else if (examLocations[0].moduleId !== orderedModules.at(-1)?.id) {
    errors.push(`Cumulative exam ${examLocations[0].activityId} is not in the final module`);
  }

  const spiralEnabled = Object.values(blueprint.spiralPolicy).every(Boolean);
  if (!spiralEnabled) errors.push('All cumulative spiral policy stages must be enabled');

  return [...new Set(errors)];
}
