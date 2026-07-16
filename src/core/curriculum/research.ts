import { z } from 'zod';
import type { CourseBlueprint } from './blueprint';
import { CoverageStageSchema } from './blueprint';
import { IdentifierSchema } from './schema';

export const ResearchTrackSchema = z.enum([
  'learning-science',
  'institutional-quality',
  'subject-scope',
  'responsive-web-design',
  'competitive-experience',
  'editor-runtime',
  'assessment-progress',
  'usability-information-architecture',
  'safety-security-privacy-ethics',
  'stack-compatibility',
  'observed-learners',
]);

export const ResearchAuthoritySchema = z.enum([
  'consensus-report',
  'government-practice-guide',
  'systematic-review',
  'peer-reviewed-research',
  'standard',
  'official-docs',
  'official-product',
  'certification-objectives',
  'curriculum-framework',
  'direct-observation',
]);

export const ResearchQuestionSchema = z.object({
  id: IdentifierSchema,
  track: ResearchTrackSchema,
  question: z.string().min(30),
  acceptanceEvidence: z.array(z.string().min(20)).min(1),
  status: z.enum(['open', 'evidence-found', 'decision-recorded', 'pilot-required', 'validated']),
});

export const ResearchClaimSchema = z.object({
  statement: z.string().min(30),
  limitations: z.array(z.string().min(20)).min(1),
  decisionIds: z.array(IdentifierSchema).min(1),
});

export const ResearchSourceSchema = z.object({
  id: IdentifierSchema,
  title: z.string().min(5),
  authority: ResearchAuthoritySchema,
  url: z.url(),
  versionOrPublished: z.string().min(2),
  reviewedAt: z.iso.date(),
  questionIds: z.array(IdentifierSchema).min(1),
  claims: z.array(ResearchClaimSchema).min(1),
  nextReview: z.object({
    onOrBefore: z.iso.date().optional(),
    triggers: z.array(z.string().min(10)).min(1),
  }),
});

export const ResearchDecisionSchema = z.object({
  id: IdentifierSchema,
  title: z.string().min(8),
  status: z.enum(['accepted', 'trial', 'rejected', 'superseded']),
  rationale: z.string().min(40),
  sourceIds: z.array(IdentifierSchema).min(1),
  affects: z
    .array(
      z.object({
        kind: z.enum(['goal', 'plan', 'schema', 'course', 'activity', 'platform', 'test', 'gate']),
        reference: z.string().min(3),
      })
    )
    .min(1),
  validation: z.array(z.string().min(20)).min(1),
});

export const SourceObjectiveCoverageMatrixSchema = z
  .object({
    schemaVersion: z.literal(1),
    courseId: IdentifierSchema,
    snapshot: z.object({
      sourceId: IdentifierSchema,
      upstreamCommit: z.string().min(20),
      capturedAt: z.iso.datetime(),
      sourceModules: z.number().int().positive(),
      sourceBlocks: z.number().int().positive(),
      sourceChallenges: z.number().int().positive(),
    }),
    objectives: z
      .array(
        z.object({
          objectiveId: IdentifierSchema,
          sourceId: IdentifierSchema,
          sourceModuleId: IdentifierSchema,
          sourceBlockSlug: IdentifierSchema,
          sourceActivityType: z.enum(['workshop', 'lab', 'lecture', 'review', 'quiz', 'exam']),
          sourceChallengeIds: z.array(z.string().min(8)).min(1),
          sourceChallengeCount: z.number().int().positive(),
          coverageIntent: z.string().min(30),
          competencyIds: z.array(IdentifierSchema).min(1),
          moduleIds: z.array(IdentifierSchema).min(1),
          stages: z.array(CoverageStageSchema).min(1),
          learnerWorkState: z.enum([
            'mapped-only',
            'research-reviewed',
            'authored',
            'schema-valid',
            'flow-verified',
            'pilot-validated',
          ]),
          originalityBoundary: z.string().min(30),
          validationNeeded: z.array(z.string().min(20)).min(1),
        })
      )
      .min(1),
    gaps: z.array(z.string().min(20)),
  })
  .superRefine((matrix, context) => {
    const objectiveIds = matrix.objectives.map((objective) => objective.objectiveId);
    if (new Set(objectiveIds).size !== objectiveIds.length) {
      context.addIssue({ code: 'custom', message: 'Duplicate external objective IDs' });
    }

    const sourceBlockSlugs = matrix.objectives.map((objective) => objective.sourceBlockSlug);
    if (new Set(sourceBlockSlugs).size !== sourceBlockSlugs.length) {
      context.addIssue({ code: 'custom', message: 'Duplicate external source blocks' });
    }

    const challengeIds = matrix.objectives.flatMap((objective, objectiveIndex) => {
      if (objective.sourceChallengeIds.length !== objective.sourceChallengeCount) {
        context.addIssue({
          code: 'custom',
          message: `Objective ${objective.objectiveId} challenge count does not match its identities`,
          path: ['objectives', objectiveIndex, 'sourceChallengeIds'],
        });
      }
      if (objective.sourceId !== matrix.snapshot.sourceId) {
        context.addIssue({
          code: 'custom',
          message: `Objective ${objective.objectiveId} cites a different source snapshot`,
          path: ['objectives', objectiveIndex, 'sourceId'],
        });
      }
      return objective.sourceChallengeIds;
    });

    if (matrix.objectives.length !== matrix.snapshot.sourceBlocks) {
      context.addIssue({
        code: 'custom',
        message: 'External objective count does not match source block total',
        path: ['objectives'],
      });
    }
    if (challengeIds.length !== matrix.snapshot.sourceChallenges) {
      context.addIssue({
        code: 'custom',
        message: 'External challenge count does not match source snapshot total',
        path: ['objectives'],
      });
    }
    if (new Set(challengeIds).size !== challengeIds.length) {
      context.addIssue({ code: 'custom', message: 'Duplicate external challenge IDs' });
    }
    const moduleIds = new Set(matrix.objectives.flatMap((objective) => objective.moduleIds));
    if (moduleIds.size !== matrix.snapshot.sourceModules) {
      context.addIssue({
        code: 'custom',
        message: 'Mapped module count does not match source snapshot total',
        path: ['objectives'],
      });
    }
  });

function addReferenceIssues(
  value: {
    questions: z.infer<typeof ResearchQuestionSchema>[];
    sources: z.infer<typeof ResearchSourceSchema>[];
    decisions: z.infer<typeof ResearchDecisionSchema>[];
  },
  context: z.RefinementCtx
) {
  const questionIds = new Set(value.questions.map((question) => question.id));
  const sourceIds = new Set(value.sources.map((source) => source.id));
  const decisionIds = new Set(value.decisions.map((decision) => decision.id));
  const duplicateCount = (values: string[]) => values.length - new Set(values).size;

  if (duplicateCount(value.questions.map((question) => question.id)) > 0) {
    context.addIssue({ code: 'custom', message: 'Duplicate research question IDs' });
  }
  if (duplicateCount(value.sources.map((source) => source.id)) > 0) {
    context.addIssue({ code: 'custom', message: 'Duplicate research source IDs' });
  }
  if (duplicateCount(value.decisions.map((decision) => decision.id)) > 0) {
    context.addIssue({ code: 'custom', message: 'Duplicate research decision IDs' });
  }

  for (const [sourceIndex, source] of value.sources.entries()) {
    for (const questionId of source.questionIds) {
      if (!questionIds.has(questionId)) {
        context.addIssue({
          code: 'custom',
          message: `Source ${source.id} references unknown question ${questionId}`,
          path: ['sources', sourceIndex, 'questionIds'],
        });
      }
    }
    for (const claim of source.claims) {
      for (const decisionId of claim.decisionIds) {
        if (!decisionIds.has(decisionId)) {
          context.addIssue({
            code: 'custom',
            message: `Source ${source.id} references unknown decision ${decisionId}`,
            path: ['sources', sourceIndex, 'claims'],
          });
        }
      }
    }
  }

  for (const [decisionIndex, decision] of value.decisions.entries()) {
    for (const sourceId of decision.sourceIds) {
      if (!sourceIds.has(sourceId)) {
        context.addIssue({
          code: 'custom',
          message: `Decision ${decision.id} references unknown source ${sourceId}`,
          path: ['decisions', decisionIndex, 'sourceIds'],
        });
      }
    }
  }
}

export const PlatformResearchRegisterSchema = z
  .object({
    schemaVersion: z.literal(1),
    id: IdentifierSchema,
    status: z.enum(['researching', 'in-review', 'validated']),
    reviewedAt: z.iso.date(),
    questions: z.array(ResearchQuestionSchema).min(11),
    sources: z.array(ResearchSourceSchema).min(5),
    decisions: z.array(ResearchDecisionSchema).min(3),
  })
  .superRefine(addReferenceIssues);

const DossierReviewSchema = z.object({
  subjectMatter: z.enum(['pending', 'in-progress', 'complete']),
  instructionalDesign: z.enum(['pending', 'in-progress', 'complete']),
  assessment: z.enum(['pending', 'in-progress', 'complete']),
  accessibility: z.enum(['pending', 'in-progress', 'complete']),
  safety: z.enum(['pending', 'in-progress', 'complete']),
  observedLearner: z.enum(['pending', 'in-progress', 'complete']),
});

export const CourseResearchDossierSchema = z
  .object({
    schemaVersion: z.literal(1),
    courseId: IdentifierSchema,
    status: z.enum(['audit-required', 'researching', 'researched', 'in-review', 'approved']),
    reviewedAt: z.iso.date(),
    questions: z.array(ResearchQuestionSchema).min(3),
    intendedLearners: z.array(z.string().min(20)).min(1),
    entryCompetencies: z.array(z.string().min(15)).min(1),
    terminalTasks: z.array(z.string().min(20)).min(2),
    scopeIncludes: z.array(z.string().min(10)).min(3),
    scopeExcludes: z.array(z.string().min(10)).min(1),
    authenticTasks: z.array(z.string().min(20)).min(3),
    knownMisconceptions: z.array(z.string().min(15)).min(3),
    safetyBoundaries: z.array(z.string().min(15)).min(1),
    sources: z.array(ResearchSourceSchema).min(3),
    decisions: z.array(ResearchDecisionSchema).min(1),
    coverage: z.array(
      z.object({
        objectiveId: IdentifierSchema,
        objective: z.string().min(15),
        sourceIds: z.array(IdentifierSchema).min(1),
        competencyIds: z.array(IdentifierSchema).min(1),
        moduleIds: z.array(IdentifierSchema).min(1),
        stages: z.array(CoverageStageSchema).min(1),
      })
    ),
    openQuestions: z.array(z.string().min(15)),
    reviews: DossierReviewSchema,
    maintenance: z.object({
      nextReviewOnOrBefore: z.iso.date().optional(),
      triggers: z.array(z.string().min(10)).min(1),
    }),
  })
  .superRefine((dossier, context) => {
    addReferenceIssues(dossier, context);
    const sourceIds = new Set(dossier.sources.map((source) => source.id));
    for (const [coverageIndex, coverage] of dossier.coverage.entries()) {
      for (const sourceId of coverage.sourceIds) {
        if (!sourceIds.has(sourceId)) {
          context.addIssue({
            code: 'custom',
            message: `Coverage ${coverage.objectiveId} references unknown source ${sourceId}`,
            path: ['coverage', coverageIndex, 'sourceIds'],
          });
        }
      }
    }
    const claimsResearchComplete = ['researched', 'in-review', 'approved'].includes(dossier.status);
    if (claimsResearchComplete && dossier.coverage.length === 0) {
      context.addIssue({
        code: 'custom',
        message: `${dossier.status} dossier requires objective coverage`,
        path: ['coverage'],
      });
    }
    if (claimsResearchComplete && dossier.openQuestions.length > 0) {
      context.addIssue({
        code: 'custom',
        message: `${dossier.status} dossier cannot retain unresolved research questions`,
        path: ['openQuestions'],
      });
    }
    if (
      dossier.status === 'approved' &&
      Object.values(dossier.reviews).some((review) => review !== 'complete')
    ) {
      context.addIssue({
        code: 'custom',
        message: 'Approved dossier requires all reviews complete',
        path: ['reviews'],
      });
    }
  });

export type CourseResearchDossier = z.infer<typeof CourseResearchDossierSchema>;
export type PlatformResearchRegister = z.infer<typeof PlatformResearchRegisterSchema>;
export type SourceObjectiveCoverageMatrix = z.infer<typeof SourceObjectiveCoverageMatrixSchema>;

export interface ResearchAuditFinding {
  severity: 'blocker' | 'warning';
  code:
    | 'false-review-state'
    | 'missing-dossier'
    | 'missing-source-identity'
    | 'missing-source-limitations'
    | 'missing-source-decisions'
    | 'missing-source-review-trigger'
    | 'missing-objective-source-map'
    | 'dossier-course-mismatch'
    | 'dossier-not-researched';
  message: string;
}

export interface CourseResearchAudit {
  courseId: string;
  blueprintStatus: CourseBlueprint['status'];
  sourceCount: number;
  moduleCount: number;
  modulesWithSourceObjectives: number;
  dossierStatus: CourseResearchDossier['status'] | 'missing';
  findings: ResearchAuditFinding[];
}

export function auditCourseResearch(
  blueprint: CourseBlueprint,
  dossier?: CourseResearchDossier
): CourseResearchAudit {
  const findings: ResearchAuditFinding[] = [];
  const sources = blueprint.sources;
  const modulesWithSourceObjectives = blueprint.modules.filter(
    (module) => module.sourceObjectiveIds.length > 0
  ).length;
  const claimStates = new Set(['researched', 'authoring', 'in-review', 'approved']);

  if (claimStates.has(blueprint.status)) {
    findings.push({
      severity: 'blocker',
      code: 'false-review-state',
      message: `Blueprint claims ${blueprint.status} before reopened research and learner review close.`,
    });
  }
  if (sources.some((source) => !source.id)) {
    findings.push({
      severity: 'blocker',
      code: 'missing-source-identity',
      message: 'Source records need stable IDs before objectives and decisions can cite them.',
    });
  }
  if (sources.some((source) => !source.limitations?.length)) {
    findings.push({
      severity: 'blocker',
      code: 'missing-source-limitations',
      message: 'Source records do not yet state evidence limits or uncertainty.',
    });
  }
  if (sources.some((source) => !source.decisionIds?.length)) {
    findings.push({
      severity: 'blocker',
      code: 'missing-source-decisions',
      message: 'Source records do not yet trace accepted evidence into design decisions.',
    });
  }
  if (sources.some((source) => !source.nextReview)) {
    findings.push({
      severity: 'blocker',
      code: 'missing-source-review-trigger',
      message: 'Source records do not yet define expiry dates or upstream-change triggers.',
    });
  }
  if (modulesWithSourceObjectives !== blueprint.modules.length) {
    findings.push({
      severity: 'blocker',
      code: 'missing-objective-source-map',
      message: `${blueprint.modules.length - modulesWithSourceObjectives} of ${blueprint.modules.length} modules lack source objective IDs.`,
    });
  }
  if (!dossier) {
    findings.push({
      severity: 'blocker',
      code: 'missing-dossier',
      message: 'Course has no research dossier.',
    });
  } else {
    if (dossier.courseId !== blueprint.id) {
      findings.push({
        severity: 'blocker',
        code: 'dossier-course-mismatch',
        message: `Dossier belongs to ${dossier.courseId}, not ${blueprint.id}.`,
      });
    }
    if (!['researched', 'in-review', 'approved'].includes(dossier.status)) {
      findings.push({
        severity: 'warning',
        code: 'dossier-not-researched',
        message: `Dossier remains ${dossier.status}.`,
      });
    }
  }

  return {
    courseId: blueprint.id,
    blueprintStatus: blueprint.status,
    sourceCount: sources.length,
    moduleCount: blueprint.modules.length,
    modulesWithSourceObjectives,
    dossierStatus: dossier?.status ?? 'missing',
    findings,
  };
}
