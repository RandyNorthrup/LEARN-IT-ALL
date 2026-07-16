import { z } from 'zod';

export const IdentifierSchema = z
  .string()
  .min(3)
  .max(120)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase kebab-case IDs');

export const ActivityKindSchema = z.enum([
  'theory',
  'workshop',
  'lab',
  'debug',
  'review',
  'project',
  'quiz',
  'exam',
]);

export const InteractionKindSchema = z.enum([
  'read',
  'code',
  'predict',
  'inspect',
  'arrange',
  'debug',
  'answer',
  'calculate',
  'reflect',
]);

export const CurriculumFileSchema = z.enum([
  'html',
  'css',
  'javascript',
  'python',
  'go',
  'sql',
  'shell',
  'prompt',
  'config',
]);

const CheckBaseSchema = z.object({
  id: IdentifierSchema,
  description: z.string().min(8),
  failureMessage: z.string().min(8),
  hidden: z.boolean().default(false),
  competencyIds: z.array(IdentifierSchema).min(1),
});

export const CurriculumCheckSchema = z.discriminatedUnion('type', [
  CheckBaseSchema.extend({
    type: z.literal('dom-selector-count'),
    selector: z.string().min(1),
    minimum: z.number().int().nonnegative().default(1),
    maximum: z.number().int().nonnegative().optional(),
  }),
  CheckBaseSchema.extend({
    type: z.literal('dom-text'),
    selector: z.string().min(1),
    comparison: z.enum(['exact', 'includes']),
    expected: z.string().min(1),
  }),
  CheckBaseSchema.extend({
    type: z.literal('dom-relationship'),
    subjectSelector: z.string().min(1),
    relation: z.enum(['direct-child', 'descendant', 'immediately-after', 'after']),
    targetSelector: z.string().min(1),
    minimum: z.number().int().positive().default(1),
  }),
  CheckBaseSchema.extend({
    type: z.literal('dom-attribute'),
    selector: z.string().min(1),
    attribute: z.string().min(1),
    comparison: z.enum(['present', 'absent', 'exact', 'token']),
    expected: z.string().optional(),
  }),
  CheckBaseSchema.extend({
    type: z.literal('html-parse-errors'),
    mode: z.enum(['document', 'fragment']),
    maximumErrors: z.number().int().nonnegative().default(0),
    ignoredErrorCodes: z.array(z.string().min(3)).default([]),
  }),
  CheckBaseSchema.extend({
    type: z.literal('css-declaration'),
    selector: z.string().min(1),
    property: z.string().min(1),
    expected: z.string().min(1),
  }),
  CheckBaseSchema.extend({
    type: z.literal('source-includes'),
    file: CurriculumFileSchema,
    expected: z.string().min(1),
  }),
  CheckBaseSchema.extend({
    type: z.literal('source-matches'),
    file: CurriculumFileSchema,
    pattern: z.string().min(1),
    flags: z
      .string()
      .regex(/^[gimsuy]*$/)
      .default('i'),
  }),
  CheckBaseSchema.extend({
    type: z.literal('prompt-contract'),
    requiredCriteria: z
      .array(z.enum(['goal', 'context', 'boundaries', 'output', 'done', 'uncertainty']))
      .min(1),
    afterMarker: z.string().min(3).optional(),
  }),
  CheckBaseSchema.extend({
    type: z.literal('config-contract'),
    workspace: z.enum(['quality', 'skill', 'mcp', 'docker', 'kubernetes', 'cicd']),
    requiredCriteria: z.array(z.string().min(2)).min(1),
  }),
  CheckBaseSchema.extend({
    type: z.literal('choice-equals'),
    expectedOptionId: IdentifierSchema,
  }),
  CheckBaseSchema.extend({
    type: z.literal('order-equals'),
    expectedOptionIds: z.array(IdentifierSchema).min(2),
  }),
  CheckBaseSchema.extend({
    type: z.literal('written-evidence'),
    minimumCharacters: z.number().int().min(10).max(5000),
    maximumCharacters: z.number().int().min(10).max(5000),
    reviewRequired: z.literal(true),
  }),
  CheckBaseSchema.extend({
    type: z.literal('number-equals'),
    expected: z.number().finite(),
    tolerance: z.number().finite().nonnegative(),
    acceptedUnits: z.array(z.string().min(1)).default([]),
  }),
]);

const StepContentBlockSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('paragraph'),
    text: z.string().min(10),
  }),
  z.object({
    type: z.literal('callout'),
    tone: z.enum(['note', 'warning', 'success', 'question']),
    title: z.string().min(3),
    text: z.string().min(10),
  }),
  z.object({
    type: z.literal('code'),
    language: z.string().min(1),
    code: z.string().min(1),
    caption: z.string().min(5),
  }),
  z.object({
    type: z.literal('evidence'),
    label: z.string().min(2),
    value: z.string().min(2),
  }),
]);

const StepStimulusSchema = z.object({
  kind: z.enum(['browser', 'dom-tree', 'file-tree', 'terminal', 'code-diff', 'network-map']),
  title: z.string().min(3),
  caption: z.string().min(10),
  lines: z
    .array(
      z.object({
        id: IdentifierSchema,
        label: z.string().min(1),
        text: z.string().min(1),
        tone: z.enum(['neutral', 'good', 'problem', 'focus']).default('neutral'),
      })
    )
    .min(1),
});

export const CurriculumStepSchema = z
  .object({
    id: IdentifierSchema,
    title: z.string().min(3).max(100),
    interaction: InteractionKindSchema,
    instruction: z.string().min(12),
    why: z.string().min(12),
    buildsOnStepIds: z.array(IdentifierSchema).default([]),
    content: z.array(StepContentBlockSchema).default([]),
    stimulus: StepStimulusSchema.optional(),
    checkIds: z.array(IdentifierSchema).min(1),
    competencyIds: z.array(IdentifierSchema).min(1),
    hints: z.array(z.string().min(8)).length(3),
    targetFile: CurriculumFileSchema.optional(),
    options: z
      .array(
        z.object({
          id: IdentifierSchema,
          text: z.string().min(1),
        })
      )
      .min(2)
      .optional(),
  })
  .strict();

export const CurriculumActivitySchema = z
  .object({
    schemaVersion: z.literal(2),
    id: IdentifierSchema,
    courseId: IdentifierSchema,
    moduleId: IdentifierSchema,
    kind: ActivityKindSchema,
    title: z.string().min(5).max(140),
    summary: z.string().min(20).max(500),
    objectives: z.array(z.string().min(10)).min(1).max(8),
    competencyCoverage: z.object({
      introduces: z.array(IdentifierSchema),
      reinforces: z.array(IdentifierSchema),
      assesses: z.array(IdentifierSchema),
    }),
    prerequisites: z.array(IdentifierSchema).default([]),
    difficulty: z.enum(['foundation', 'practice', 'challenge', 'mastery']),
    estimatedMinutes: z.number().int().positive().max(600),
    artifactId: IdentifierSchema.optional(),
    starterFiles: z
      .object({
        html: z.string().default(''),
        css: z.string().default(''),
        javascript: z.string().default(''),
        python: z.string().default(''),
        go: z.string().default(''),
        sql: z.string().default(''),
        shell: z.string().default(''),
        prompt: z.string().default(''),
        config: z.string().default(''),
      })
      .optional(),
    steps: z.array(CurriculumStepSchema).min(1),
    checks: z.array(CurriculumCheckSchema).min(1),
    mastery: z.object({
      passingPercent: z.number().int().min(60).max(100),
      maxHintsForMastery: z.number().int().min(0).max(20),
      spacedReviewDays: z.array(z.number().int().positive()).min(1),
    }),
  })
  .superRefine((activity, context) => {
    const stepIds = new Set();
    const earlierStepIds = new Set<string>();
    for (const [index, step] of activity.steps.entries()) {
      if (stepIds.has(step.id)) {
        context.addIssue({
          code: 'custom',
          message: `Duplicate step ID: ${step.id}`,
          path: ['steps', index, 'id'],
        });
      }
      stepIds.add(step.id);
      if (index === 0 && step.buildsOnStepIds.length > 0) {
        context.addIssue({
          code: 'custom',
          message: 'The first step cannot build on a later step',
          path: ['steps', index, 'buildsOnStepIds'],
        });
      }
      if (index > 0 && step.buildsOnStepIds.length === 0) {
        context.addIssue({
          code: 'custom',
          message: `Step ${step.id} must build on at least one earlier step`,
          path: ['steps', index, 'buildsOnStepIds'],
        });
      }
      for (const prerequisiteStepId of step.buildsOnStepIds) {
        if (!earlierStepIds.has(prerequisiteStepId)) {
          context.addIssue({
            code: 'custom',
            message: `Step ${step.id} builds on missing or later step ${prerequisiteStepId}`,
            path: ['steps', index, 'buildsOnStepIds'],
          });
        }
      }
      earlierStepIds.add(step.id);
    }

    const checkIds = new Set(activity.checks.map((check) => check.id));
    const activityCompetencyIds = new Set([
      ...activity.competencyCoverage.introduces,
      ...activity.competencyCoverage.reinforces,
      ...activity.competencyCoverage.assesses,
    ]);
    if (activityCompetencyIds.size === 0) {
      context.addIssue({
        code: 'custom',
        message: 'Activity must map to at least one competency',
        path: ['competencyCoverage'],
      });
    }
    for (const [stepIndex, step] of activity.steps.entries()) {
      for (const [checkIndex, checkId] of step.checkIds.entries()) {
        if (!checkIds.has(checkId)) {
          context.addIssue({
            code: 'custom',
            message: `Unknown check ID: ${checkId}`,
            path: ['steps', stepIndex, 'checkIds', checkIndex],
          });
        }
      }
      for (const competencyId of step.competencyIds) {
        if (!activityCompetencyIds.has(competencyId)) {
          context.addIssue({
            code: 'custom',
            message: `Step references competency outside activity coverage: ${competencyId}`,
            path: ['steps', stepIndex, 'competencyIds'],
          });
        }
      }
    }

    for (const [checkIndex, check] of activity.checks.entries()) {
      if (
        check.type === 'dom-selector-count' &&
        check.maximum !== undefined &&
        check.maximum < check.minimum
      ) {
        context.addIssue({
          code: 'custom',
          message: `DOM selector check ${check.id} has a maximum below its minimum`,
          path: ['checks', checkIndex, 'maximum'],
        });
      }
      if (check.type === 'written-evidence' && check.maximumCharacters < check.minimumCharacters) {
        context.addIssue({
          code: 'custom',
          message: `Written evidence check ${check.id} has a maximum below its minimum`,
          path: ['checks', checkIndex, 'maximumCharacters'],
        });
      }
      if (
        check.type === 'dom-attribute' &&
        ['exact', 'token'].includes(check.comparison) &&
        check.expected === undefined
      ) {
        context.addIssue({
          code: 'custom',
          message: `DOM attribute check ${check.id} requires an expected value`,
          path: ['checks', checkIndex, 'expected'],
        });
      }
      if (
        check.type === 'written-evidence' &&
        check.competencyIds.some((competencyId) =>
          activity.competencyCoverage.assesses.includes(competencyId)
        )
      ) {
        context.addIssue({
          code: 'custom',
          message: `Written evidence check ${check.id} requires review and cannot establish automated mastery`,
          path: ['checks', checkIndex],
        });
      }
      for (const competencyId of check.competencyIds) {
        if (!activityCompetencyIds.has(competencyId)) {
          context.addIssue({
            code: 'custom',
            message: `Check references competency outside activity coverage: ${competencyId}`,
            path: ['checks', checkIndex, 'competencyIds'],
          });
        }
      }
    }

    const requiresFiles = activity.steps.some(
      (step) => step.interaction === 'code' || Boolean(step.targetFile)
    );
    if (requiresFiles && !activity.starterFiles) {
      context.addIssue({
        code: 'custom',
        message: 'Code activities require starterFiles',
        path: ['starterFiles'],
      });
    }
  });

export const CurriculumModuleSchema = z.object({
  schemaVersion: z.literal(2),
  id: IdentifierSchema,
  courseId: IdentifierSchema,
  title: z.string().min(5).max(140),
  description: z.string().min(20).max(500),
  order: z.number().int().positive(),
  sourceObjectiveIds: z.array(z.string().min(3)).default([]),
  objectives: z.array(z.string().min(10)).min(1),
  competencyIds: z.array(IdentifierSchema).min(1),
  prerequisites: z.array(IdentifierSchema).default([]),
  activityIds: z.array(IdentifierSchema).min(1),
});

export const CurriculumCompetencySchema = z.object({
  id: IdentifierSchema,
  statement: z.string().min(15).max(300),
  knowledgeType: z.enum(['conceptual', 'procedural', 'strategic', 'metacognitive', 'professional']),
  level: z.enum(['recognize', 'explain', 'apply', 'analyze', 'evaluate', 'create']),
  prerequisiteIds: z.array(IdentifierSchema),
  misconceptions: z.array(z.string().min(10)).min(1),
  masteryEvidence: z.array(z.string().min(10)).min(1),
});

export const CurriculumCourseSchema = z
  .object({
    schemaVersion: z.literal(2),
    id: IdentifierSchema,
    title: z.string().min(5).max(140),
    description: z.string().min(30).max(800),
    outcomes: z.array(z.string().min(10)).min(3),
    sharedRequirements: z.array(z.string().min(20)).default([]),
    prerequisites: z.array(IdentifierSchema).default([]),
    competencies: z.array(CurriculumCompetencySchema).min(3),
    moduleIds: z.array(IdentifierSchema).min(1),
    estimatedHours: z.number().positive(),
    credential: z.object({
      title: z.string().min(5),
      requiredProjectIds: z.array(IdentifierSchema),
      finalExamId: IdentifierSchema,
      passingPercent: z.number().int().min(60).max(100),
    }),
    status: z.enum(['draft', 'preview', 'published']),
  })
  .superRefine((course, context) => {
    const competencyIds = new Set(course.competencies.map((competency) => competency.id));
    if (competencyIds.size !== course.competencies.length) {
      context.addIssue({
        code: 'custom',
        message: 'Duplicate competency IDs',
        path: ['competencies'],
      });
    }
    const prerequisiteMap = new Map(
      course.competencies.map((competency) => [competency.id, competency.prerequisiteIds])
    );
    for (const [index, competency] of course.competencies.entries()) {
      for (const prerequisiteId of competency.prerequisiteIds) {
        if (!competencyIds.has(prerequisiteId)) {
          context.addIssue({
            code: 'custom',
            message: `Unknown competency prerequisite: ${prerequisiteId}`,
            path: ['competencies', index, 'prerequisiteIds'],
          });
        }
      }
    }
    const visiting = new Set<string>();
    const visited = new Set<string>();
    const visit = (competencyId: string) => {
      if (visiting.has(competencyId)) {
        context.addIssue({
          code: 'custom',
          message: `Competency prerequisite cycle includes ${competencyId}`,
          path: ['competencies'],
        });
        return;
      }
      if (visited.has(competencyId)) return;
      visiting.add(competencyId);
      prerequisiteMap.get(competencyId)?.forEach(visit);
      visiting.delete(competencyId);
      visited.add(competencyId);
    };
    competencyIds.forEach(visit);
  });

export type CurriculumActivity = z.infer<typeof CurriculumActivitySchema>;
export type CurriculumCheck = z.infer<typeof CurriculumCheckSchema>;
export type CurriculumCourse = z.infer<typeof CurriculumCourseSchema>;
export type CurriculumModule = z.infer<typeof CurriculumModuleSchema>;
export type CurriculumStep = z.infer<typeof CurriculumStepSchema>;
