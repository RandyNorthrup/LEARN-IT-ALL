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

export const ConceptEvidenceStageSchema = z.enum([
  'introduce',
  'model',
  'guided',
  'faded',
  'debug',
  'retrieve',
  'assess',
  'transfer',
]);

const ConceptResearchSchema = z.object({
  id: IdentifierSchema,
  title: z.string().min(5),
  objective: z.string().min(25),
  order: z.number().int().positive(),
  moduleId: IdentifierSchema,
  prerequisiteIds: z.array(IdentifierSchema),
  sourceAnchors: z
    .array(
      z.object({
        sourceId: IdentifierSchema,
        locator: z.string().min(3),
        claim: z.string().min(20),
      })
    )
    .min(1),
  misconceptions: z.array(z.string().min(15)).min(1),
  evidenceRequirements: z.array(z.string().min(20)).min(2),
  stages: z.array(ConceptEvidenceStageSchema),
  retainedInModuleIds: z.array(IdentifierSchema).min(1),
  currentState: z.literal('researched-not-authored'),
});

export const ConceptResearchGraphSchema = z
  .object({
    schemaVersion: z.literal(1),
    courseId: IdentifierSchema,
    scopeId: IdentifierSchema,
    status: z.enum(['researching', 'in-review', 'approved']),
    reviewedAt: z.iso.date(),
    sourceIds: z.array(IdentifierSchema).min(3),
    moduleIds: z.array(IdentifierSchema).min(1),
    requiredStages: z.array(ConceptEvidenceStageSchema),
    concepts: z.array(ConceptResearchSchema).min(3),
    architectureFindings: z.array(z.string().min(30)).min(1),
    gaps: z.array(z.string().min(20)),
  })
  .superRefine((graph, context) => {
    const expectedStages = new Set(ConceptEvidenceStageSchema.options);
    const sourceIds = new Set(graph.sourceIds);
    const moduleIds = new Set(graph.moduleIds);
    const moduleOrder = new Map(graph.moduleIds.map((moduleId, index) => [moduleId, index]));
    const conceptById = new Map(graph.concepts.map((concept) => [concept.id, concept]));
    const conceptIds = graph.concepts.map((concept) => concept.id);
    const normalize = (value: string) =>
      value
        .toLowerCase()
        .replace(/[^a-z0-9]+/gu, ' ')
        .trim();
    if (conceptById.size !== conceptIds.length) {
      context.addIssue({ code: 'custom', message: 'Duplicate concept research IDs' });
    }
    if (new Set(graph.sourceIds).size !== graph.sourceIds.length) {
      context.addIssue({ code: 'custom', message: 'Duplicate concept graph source IDs' });
    }
    if (new Set(graph.moduleIds).size !== graph.moduleIds.length) {
      context.addIssue({ code: 'custom', message: 'Duplicate concept graph module IDs' });
    }
    const normalizedObjectives = graph.concepts.map((concept) => normalize(concept.objective));
    if (new Set(normalizedObjectives).size !== normalizedObjectives.length) {
      context.addIssue({ code: 'custom', message: 'Duplicate concept research objectives' });
    }
    const normalizedMisconceptions = graph.concepts.flatMap((concept) =>
      concept.misconceptions.map(normalize)
    );
    if (new Set(normalizedMisconceptions).size !== normalizedMisconceptions.length) {
      context.addIssue({ code: 'custom', message: 'Duplicate concept research misconceptions' });
    }
    if (graph.status === 'approved' && graph.gaps.length > 0) {
      context.addIssue({
        code: 'custom',
        message: 'Approved concept graph cannot retain open gaps',
      });
    }
    if (
      graph.requiredStages.length !== expectedStages.size ||
      graph.requiredStages.some((stage) => !expectedStages.has(stage))
    ) {
      context.addIssue({
        code: 'custom',
        message: 'Concept graph must require every evidence stage',
      });
    }

    for (const [conceptIndex, concept] of graph.concepts.entries()) {
      if (concept.order !== conceptIndex + 1) {
        context.addIssue({
          code: 'custom',
          message: `Concept ${concept.id} order does not match its sequence position`,
          path: ['concepts', conceptIndex, 'order'],
        });
      }
      if (!moduleIds.has(concept.moduleId)) {
        context.addIssue({
          code: 'custom',
          message: `Concept ${concept.id} references unknown module ${concept.moduleId}`,
          path: ['concepts', conceptIndex, 'moduleId'],
        });
      }
      const stages = new Set(concept.stages);
      if (
        stages.size !== expectedStages.size ||
        [...expectedStages].some((stage) => !stages.has(stage))
      ) {
        context.addIssue({
          code: 'custom',
          message: `Concept ${concept.id} lacks full evidence progression`,
          path: ['concepts', conceptIndex, 'stages'],
        });
      }
      if (stages.size !== concept.stages.length) {
        context.addIssue({
          code: 'custom',
          message: `Concept ${concept.id} repeats evidence stages`,
          path: ['concepts', conceptIndex, 'stages'],
        });
      }
      for (const source of concept.sourceAnchors) {
        if (!sourceIds.has(source.sourceId)) {
          context.addIssue({
            code: 'custom',
            message: `Concept ${concept.id} references unknown source ${source.sourceId}`,
            path: ['concepts', conceptIndex, 'sourceAnchors'],
          });
        }
      }
      for (const moduleId of concept.retainedInModuleIds) {
        if (!moduleIds.has(moduleId)) {
          context.addIssue({
            code: 'custom',
            message: `Concept ${concept.id} retains into unknown module ${moduleId}`,
            path: ['concepts', conceptIndex, 'retainedInModuleIds'],
          });
        } else if ((moduleOrder.get(moduleId) ?? -1) < (moduleOrder.get(concept.moduleId) ?? -1)) {
          context.addIssue({
            code: 'custom',
            message: `Concept ${concept.id} retains into earlier module ${moduleId}`,
            path: ['concepts', conceptIndex, 'retainedInModuleIds'],
          });
        }
      }
      for (const prerequisiteId of concept.prerequisiteIds) {
        const prerequisite = conceptById.get(prerequisiteId);
        if (!prerequisite) {
          context.addIssue({
            code: 'custom',
            message: `Concept ${concept.id} references unknown prerequisite ${prerequisiteId}`,
            path: ['concepts', conceptIndex, 'prerequisiteIds'],
          });
        } else if (prerequisite.order >= concept.order) {
          context.addIssue({
            code: 'custom',
            message: `Concept ${concept.id} depends on non-earlier prerequisite ${prerequisiteId}`,
            path: ['concepts', conceptIndex, 'prerequisiteIds'],
          });
        }
      }
    }
  });

export const ExternalObjectiveConceptAlignmentSchema = z
  .object({
    schemaVersion: z.literal(1),
    courseId: IdentifierSchema,
    status: z.enum(['researching', 'in-review', 'approved']),
    reviewedAt: z.iso.date(),
    sourceSnapshot: z.object({
      sourceId: IdentifierSchema,
      upstreamCommit: z.string().min(20),
      sourceObjectives: z.number().int().positive(),
      sourceChallenges: z.number().int().positive(),
    }),
    conceptInventories: z
      .array(
        z.object({
          scopeId: IdentifierSchema,
          conceptCount: z.number().int().positive(),
          conceptIds: z.array(IdentifierSchema).min(1),
        })
      )
      .min(1),
    alignments: z
      .array(
        z.object({
          objectiveId: IdentifierSchema,
          sourceModuleId: IdentifierSchema,
          sourceBlockSlug: IdentifierSchema,
          sourceActivityType: z.enum(['workshop', 'lab', 'lecture', 'review', 'quiz', 'exam']),
          sourceChallengeCount: z.number().int().positive(),
          conceptIds: z.array(IdentifierSchema).min(1),
          mappingRationale: z.string().min(40),
          evidenceNeeded: z.array(z.string().min(20)).min(2),
          state: z.enum(['candidate-review', 'expert-reviewed', 'approved']),
        })
      )
      .min(1),
    courseExtensions: z.array(
      z.object({
        extensionId: IdentifierSchema,
        title: z.string().min(8),
        rationale: z.string().min(40),
        conceptIds: z.array(IdentifierSchema).min(1),
        sourceIds: z.array(IdentifierSchema).min(1),
        validationNeeded: z.array(z.string().min(20)).min(2),
        state: z.enum(['candidate-review', 'expert-reviewed', 'approved']),
      })
    ),
    architectureFindings: z.array(z.string().min(30)).min(1),
    gaps: z.array(z.string().min(20)),
  })
  .superRefine((matrix, context) => {
    const objectiveIds = matrix.alignments.map((alignment) => alignment.objectiveId);
    const blockSlugs = matrix.alignments.map((alignment) => alignment.sourceBlockSlug);
    const extensionIds = matrix.courseExtensions.map((extension) => extension.extensionId);
    const inventoryScopeIds = matrix.conceptInventories.map((inventory) => inventory.scopeId);
    const inventoryConceptIds = matrix.conceptInventories.flatMap(
      (inventory) => inventory.conceptIds
    );
    const knownConceptIds = new Set(inventoryConceptIds);
    const benchmarkConceptIds = new Set(
      matrix.alignments.flatMap((alignment) => alignment.conceptIds)
    );
    const extensionConceptIds = matrix.courseExtensions.flatMap(
      (extension) => extension.conceptIds
    );
    const extensionConceptIdSet = new Set(extensionConceptIds);

    const rejectDuplicates = (values: string[], message: string, path?: PropertyKey[]) => {
      if (new Set(values).size !== values.length) {
        context.addIssue({ code: 'custom', message, path });
      }
    };

    rejectDuplicates(objectiveIds, 'Duplicate aligned source objective IDs', ['alignments']);
    rejectDuplicates(blockSlugs, 'Duplicate aligned source block slugs', ['alignments']);
    rejectDuplicates(extensionIds, 'Duplicate course extension IDs', ['courseExtensions']);
    rejectDuplicates(inventoryScopeIds, 'Duplicate concept inventory scope IDs', [
      'conceptInventories',
    ]);
    rejectDuplicates(inventoryConceptIds, 'Concept appears in multiple inventories', [
      'conceptInventories',
    ]);
    rejectDuplicates(extensionConceptIds, 'Concept appears in multiple course extensions', [
      'courseExtensions',
    ]);

    if (matrix.alignments.length !== matrix.sourceSnapshot.sourceObjectives) {
      context.addIssue({
        code: 'custom',
        message: 'Alignment count does not match source objective total',
        path: ['alignments'],
      });
    }
    if (
      matrix.alignments.reduce((total, alignment) => total + alignment.sourceChallengeCount, 0) !==
      matrix.sourceSnapshot.sourceChallenges
    ) {
      context.addIssue({
        code: 'custom',
        message: 'Aligned challenge count does not match source snapshot total',
        path: ['alignments'],
      });
    }

    for (const [inventoryIndex, inventory] of matrix.conceptInventories.entries()) {
      if (inventory.conceptIds.length !== inventory.conceptCount) {
        context.addIssue({
          code: 'custom',
          message: `Concept inventory ${inventory.scopeId} count does not match its identities`,
          path: ['conceptInventories', inventoryIndex, 'conceptIds'],
        });
      }
    }

    for (const [alignmentIndex, alignment] of matrix.alignments.entries()) {
      rejectDuplicates(
        alignment.conceptIds,
        `Source objective ${alignment.objectiveId} repeats concept IDs`,
        ['alignments', alignmentIndex, 'conceptIds']
      );
      for (const conceptId of alignment.conceptIds) {
        if (!knownConceptIds.has(conceptId)) {
          context.addIssue({
            code: 'custom',
            message: `Source objective ${alignment.objectiveId} references unknown concept ${conceptId}`,
            path: ['alignments', alignmentIndex, 'conceptIds'],
          });
        }
      }
    }

    for (const [extensionIndex, extension] of matrix.courseExtensions.entries()) {
      rejectDuplicates(
        extension.conceptIds,
        `Course extension ${extension.extensionId} repeats concept IDs`,
        ['courseExtensions', extensionIndex, 'conceptIds']
      );
      for (const conceptId of extension.conceptIds) {
        if (!knownConceptIds.has(conceptId)) {
          context.addIssue({
            code: 'custom',
            message: `Course extension ${extension.extensionId} references unknown concept ${conceptId}`,
            path: ['courseExtensions', extensionIndex, 'conceptIds'],
          });
        }
        if (benchmarkConceptIds.has(conceptId)) {
          context.addIssue({
            code: 'custom',
            message: `Concept ${conceptId} is claimed as both benchmark coverage and course extension`,
            path: ['courseExtensions', extensionIndex, 'conceptIds'],
          });
        }
      }
    }

    for (const conceptId of knownConceptIds) {
      if (!benchmarkConceptIds.has(conceptId) && !extensionConceptIdSet.has(conceptId)) {
        context.addIssue({
          code: 'custom',
          message: `Concept ${conceptId} lacks benchmark or extension alignment`,
        });
      }
    }

    if (matrix.status === 'approved') {
      if (matrix.gaps.length > 0) {
        context.addIssue({ code: 'custom', message: 'Approved alignment cannot retain open gaps' });
      }
      if (
        matrix.alignments.some((alignment) => alignment.state !== 'approved') ||
        matrix.courseExtensions.some((extension) => extension.state !== 'approved')
      ) {
        context.addIssue({
          code: 'custom',
          message: 'Approved alignment requires every objective and extension approved',
        });
      }
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
export type ConceptResearchGraph = z.infer<typeof ConceptResearchGraphSchema>;
export type ExternalObjectiveConceptAlignment = z.infer<
  typeof ExternalObjectiveConceptAlignmentSchema
>;

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
