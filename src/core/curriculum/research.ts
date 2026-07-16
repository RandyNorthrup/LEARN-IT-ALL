import { z } from 'zod';
import { IdentifierSchema } from './schema';

const ResearchCoverageStageSchema = z.enum(['I', 'G', 'F', 'R', 'A', 'T']);

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
  'government-primary',
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

const ExternalSourceActivityTypeSchema = z.enum([
  'workshop',
  'lab',
  'lecture',
  'review',
  'quiz',
  'exam',
]);

const ExternalChallengeSourceEvidenceSchema = z.object({
  relativePath: z.string().min(20),
  sha256: z.string().regex(/^[a-f0-9]{64}$/),
  bytes: z.number().int().positive(),
  topLevelSections: z.array(IdentifierSchema).min(1),
  hintCheckCount: z.number().int().nonnegative(),
  quizQuestionCount: z.number().int().nonnegative(),
  codeLanguages: z.array(z.string().min(1)),
});

export const ExternalCurriculumEvidenceSnapshotSchema = z
  .object({
    schemaVersion: z.literal(2),
    source: z.string().min(10),
    sourceUrl: z.url(),
    upstreamCommit: z.string().regex(/^[a-f0-9]{40}$/),
    capturedAt: z.iso.datetime(),
    totals: z.object({
      chapters: z.number().int().positive(),
      modules: z.number().int().positive(),
      blocks: z.number().int().positive(),
      challenges: z.number().int().positive(),
      byType: z.record(
        ExternalSourceActivityTypeSchema,
        z.object({
          blocks: z.number().int().nonnegative(),
          challenges: z.number().int().nonnegative(),
        })
      ),
    }),
    chapters: z.array(
      z.object({
        id: IdentifierSchema,
        type: z.string().min(3),
        modules: z.array(
          z.object({
            id: IdentifierSchema,
            type: z.string().min(3),
            blocks: z.array(
              z.object({
                objectiveId: IdentifierSchema,
                slug: IdentifierSchema,
                type: ExternalSourceActivityTypeSchema,
                challengeCount: z.number().int().positive(),
                challengeOrder: z.array(
                  z.object({
                    id: z.string().min(8),
                    title: z.string().min(3),
                    sourceEvidence: ExternalChallengeSourceEvidenceSchema,
                  })
                ),
              })
            ),
          })
        ),
      })
    ),
  })
  .superRefine((snapshot, context) => {
    const modules = snapshot.chapters.flatMap((chapter) => chapter.modules);
    const blocks = modules.flatMap((module) => module.blocks);
    const challenges = blocks.flatMap((block) => block.challengeOrder);
    const duplicateIssue = (values: string[], message: string, path: PropertyKey[]) => {
      if (new Set(values).size !== values.length) {
        context.addIssue({ code: 'custom', message, path });
      }
    };

    if (snapshot.chapters.length !== snapshot.totals.chapters) {
      context.addIssue({
        code: 'custom',
        message: 'External chapter total differs from records',
      });
    }
    if (modules.length !== snapshot.totals.modules) {
      context.addIssue({
        code: 'custom',
        message: 'External module total differs from records',
      });
    }
    if (blocks.length !== snapshot.totals.blocks) {
      context.addIssue({
        code: 'custom',
        message: 'External block total differs from records',
      });
    }
    if (challenges.length !== snapshot.totals.challenges) {
      context.addIssue({
        code: 'custom',
        message: 'External challenge total differs from records',
      });
    }
    duplicateIssue(
      snapshot.chapters.map((chapter) => chapter.id),
      'Duplicate external chapter IDs',
      ['chapters']
    );
    duplicateIssue(
      modules.map((module) => module.id),
      'Duplicate external module IDs',
      ['chapters']
    );
    duplicateIssue(
      blocks.map((block) => block.objectiveId),
      'Duplicate external objective IDs',
      ['chapters']
    );
    duplicateIssue(
      blocks.map((block) => block.slug),
      'Duplicate external block slugs',
      ['chapters']
    );
    duplicateIssue(
      challenges.map((challenge) => challenge.id),
      'Duplicate external challenge IDs',
      ['chapters']
    );

    for (const activityType of ExternalSourceActivityTypeSchema.options) {
      const typedBlocks = blocks.filter((block) => block.type === activityType);
      const expected = snapshot.totals.byType[activityType];
      if (
        expected.blocks !== typedBlocks.length ||
        expected.challenges !==
          typedBlocks.reduce((total, block) => total + block.challengeCount, 0)
      ) {
        context.addIssue({
          code: 'custom',
          message: `External ${activityType} totals differ from records`,
          path: ['totals', 'byType', activityType],
        });
      }
    }

    for (const block of blocks) {
      if (block.challengeOrder.length !== block.challengeCount) {
        context.addIssue({
          code: 'custom',
          message: `External block ${block.slug} challenge total differs from identities`,
        });
      }
      for (const challenge of block.challengeOrder) {
        const expectedSuffix = `/blocks/${block.slug}/${challenge.id}.md`;
        if (!challenge.sourceEvidence.relativePath.endsWith(expectedSuffix)) {
          context.addIssue({
            code: 'custom',
            message: `External challenge ${challenge.id} evidence path differs from block identity`,
          });
        }
        if (
          !challenge.sourceEvidence.topLevelSections.some((sectionName) =>
            ['description', 'interactive'].includes(sectionName)
          )
        ) {
          context.addIssue({
            code: 'custom',
            message: `External challenge ${challenge.id} lacks a captured content section`,
          });
        }
      }
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
    const conceptById = new Map(graph.concepts.map((concept) => [concept.id, concept]));
    const conceptIds = graph.concepts.map((concept) => concept.id);
    const normalize = (value: string) =>
      value
        .toLowerCase()
        .replace(/[^a-z0-9]+/gu, ' ')
        .trim();
    if (conceptById.size !== conceptIds.length) {
      context.addIssue({
        code: 'custom',
        message: 'Duplicate concept research IDs',
      });
    }
    if (new Set(graph.sourceIds).size !== graph.sourceIds.length) {
      context.addIssue({
        code: 'custom',
        message: 'Duplicate concept graph source IDs',
      });
    }
    if (new Set(graph.moduleIds).size !== graph.moduleIds.length) {
      context.addIssue({
        code: 'custom',
        message: 'Duplicate concept graph module IDs',
      });
    }
    const normalizedObjectives = graph.concepts.map((concept) => normalize(concept.objective));
    if (new Set(normalizedObjectives).size !== normalizedObjectives.length) {
      context.addIssue({
        code: 'custom',
        message: 'Duplicate concept research objectives',
      });
    }
    const normalizedMisconceptions = graph.concepts.flatMap((concept) =>
      concept.misconceptions.map(normalize)
    );
    if (new Set(normalizedMisconceptions).size !== normalizedMisconceptions.length) {
      context.addIssue({
        code: 'custom',
        message: 'Duplicate concept research misconceptions',
      });
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
          sourceActivityType: ExternalSourceActivityTypeSchema,
          sourceChallengeCount: z.number().int().positive(),
          sourceEvidence: z.object({
            challengeIds: z.array(z.string().min(8)).min(1),
            sourceFileSha256s: z.array(z.string().regex(/^[a-f0-9]{64}$/)).min(1),
            sourceBytes: z.number().int().positive(),
            hintCheckCount: z.number().int().nonnegative(),
            quizQuestionCount: z.number().int().nonnegative(),
          }),
          conceptIds: z.array(IdentifierSchema),
          mappingRationale: z.string().min(40),
          mappingBasis: z.enum([
            'block-specific-source',
            'unmapped-source',
            'assessment-container',
          ]),
          inspectionState: z.enum([
            'evidence-captured',
            'agent-inspected',
            'expert-reviewed',
            'approved',
          ]),
          reviewFindings: z.array(
            z.object({
              severity: z.enum(['blocker', 'warning']),
              code: z.enum([
                'source-inspection-required',
                'source-scope-inspection-required',
                'assessment-items-unavailable',
                'independent-subject-review-required',
              ]),
              summary: z.string().min(30),
            })
          ),
          evidenceNeeded: z.array(z.string().min(20)).min(2),
          state: z.enum(['candidate-review', 'expert-reviewed', 'approved']),
        })
      )
      .min(1),
    unresolvedConceptIds: z.array(IdentifierSchema),
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
    const unresolvedConceptIdSet = new Set(matrix.unresolvedConceptIds);
    const sourceChallengeIds = matrix.alignments.flatMap(
      (alignment) => alignment.sourceEvidence.challengeIds
    );

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
    rejectDuplicates(matrix.unresolvedConceptIds, 'Concept appears multiple times as unresolved', [
      'unresolvedConceptIds',
    ]);
    rejectDuplicates(sourceChallengeIds, 'Challenge appears in multiple alignment evidence sets', [
      'alignments',
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
      if (
        alignment.sourceEvidence.challengeIds.length !== alignment.sourceChallengeCount ||
        alignment.sourceEvidence.sourceFileSha256s.length !== alignment.sourceChallengeCount
      ) {
        context.addIssue({
          code: 'custom',
          message: `Source objective ${alignment.objectiveId} evidence count differs from challenge total`,
          path: ['alignments', alignmentIndex, 'sourceEvidence'],
        });
      }
      if (alignment.mappingBasis === 'block-specific-source' && alignment.conceptIds.length === 0) {
        context.addIssue({
          code: 'custom',
          message: `Source objective ${alignment.objectiveId} claims a block-specific map without concepts`,
          path: ['alignments', alignmentIndex, 'conceptIds'],
        });
      }
      if (alignment.mappingBasis === 'unmapped-source') {
        if (alignment.conceptIds.length > 0) {
          context.addIssue({
            code: 'custom',
            message: `Unmapped source objective ${alignment.objectiveId} assigns guessed concepts`,
            path: ['alignments', alignmentIndex, 'conceptIds'],
          });
        }
        if (
          alignment.reviewFindings.every(
            (finding) =>
              finding.code !== 'source-inspection-required' || finding.severity !== 'blocker'
          )
        ) {
          context.addIssue({
            code: 'custom',
            message: `Unmapped source objective ${alignment.objectiveId} hides required inspection`,
            path: ['alignments', alignmentIndex, 'reviewFindings'],
          });
        }
      }
      if (
        alignment.mappingBasis === 'assessment-container' &&
        (alignment.conceptIds.length > 0 ||
          alignment.reviewFindings.every(
            (finding) => finding.code !== 'assessment-items-unavailable'
          ))
      ) {
        context.addIssue({
          code: 'custom',
          message: `Source objective ${alignment.objectiveId} guesses or hides unavailable assessment items`,
          path: ['alignments', alignmentIndex],
        });
      }
      if (
        ['expert-reviewed', 'approved'].includes(alignment.state) &&
        (alignment.mappingBasis !== 'block-specific-source' ||
          alignment.reviewFindings.some((finding) => finding.severity === 'blocker') ||
          !['expert-reviewed', 'approved'].includes(alignment.inspectionState))
      ) {
        context.addIssue({
          code: 'custom',
          message: `Source objective ${alignment.objectiveId} claims review with unresolved source evidence`,
          path: ['alignments', alignmentIndex],
        });
      }
    }

    for (const conceptId of matrix.unresolvedConceptIds) {
      if (!knownConceptIds.has(conceptId)) {
        context.addIssue({
          code: 'custom',
          message: `Unresolved concept ${conceptId} is absent from the research inventories`,
          path: ['unresolvedConceptIds'],
        });
      }
      if (benchmarkConceptIds.has(conceptId) || extensionConceptIdSet.has(conceptId)) {
        context.addIssue({
          code: 'custom',
          message: `Concept ${conceptId} is unresolved and also claims mapped coverage`,
          path: ['unresolvedConceptIds'],
        });
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
      if (
        !benchmarkConceptIds.has(conceptId) &&
        !extensionConceptIdSet.has(conceptId) &&
        !unresolvedConceptIdSet.has(conceptId)
      ) {
        context.addIssue({
          code: 'custom',
          message: `Concept ${conceptId} lacks benchmark, extension, or unresolved alignment`,
        });
      }
    }

    if (matrix.status === 'approved') {
      if (matrix.gaps.length > 0) {
        context.addIssue({
          code: 'custom',
          message: 'Approved alignment cannot retain open gaps',
        });
      }
      if (
        matrix.unresolvedConceptIds.length > 0 ||
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

export const ResearchCourseArchitectureSchema = z
  .object({
    schemaVersion: z.literal(1),
    courseId: IdentifierSchema,
    status: z.enum(['researching', 'in-review', 'approved']),
    reviewedAt: z.iso.date(),
    entryContract: z.object({
      intendedLearner: z.string().min(30),
      openingModuleId: IdentifierSchema,
      firstMeaningfulEditByLearnerAction: z.number().int().min(1).max(2),
      delayedToolingBarrierProhibited: z.literal(true),
      entryEvidence: z.array(z.string().min(20)).min(2),
    }),
    sourceObjectiveIds: z.array(IdentifierSchema).min(1),
    unmappedSourceObjectiveIds: z.array(IdentifierSchema),
    conceptIds: z.array(IdentifierSchema).min(1),
    moduleIds: z.array(IdentifierSchema).min(1),
    modules: z
      .array(
        z.object({
          id: IdentifierSchema,
          title: z.string().min(8),
          order: z.number().int().positive(),
          prerequisiteModuleIds: z.array(IdentifierSchema),
          conceptIds: z.array(IdentifierSchema).min(1),
          sourceObjectiveIds: z.array(IdentifierSchema),
          retrievalConceptIds: z.array(IdentifierSchema),
          cumulativeArtifact: z.string().min(30),
          newComplexityBoundary: z.string().min(30),
          currentState: z.enum(['planned-not-authored', 'authored', 'reviewed']),
        })
      )
      .min(1),
    projects: z
      .array(
        z.object({
          id: IdentifierSchema,
          title: z.string().min(8),
          scenarioDomain: IdentifierSchema,
          stakeholderNeed: z.string().min(40),
          artifact: z.string().min(20),
          placementAfterModuleId: IdentifierSchema,
          conceptIds: z.array(IdentifierSchema).min(5),
          sourceObjectiveIds: z.array(IdentifierSchema),
          unmappedSourceObjectiveIds: z.array(IdentifierSchema),
          requirements: z.array(z.string().min(20)).min(5),
          evidence: z.array(z.string().min(20)).min(3),
          starterPolicy: z.string().min(30),
          currentState: z.enum(['planned-not-authored', 'authored', 'reviewed']),
        })
      )
      .length(5),
    architectureFindings: z.array(z.string().min(30)).min(1),
    gaps: z.array(z.string().min(20)),
  })
  .superRefine((architecture, context) => {
    const moduleById = new Map(architecture.modules.map((module) => [module.id, module]));
    const moduleOrder = new Map(
      architecture.modules.map((module, index) => [module.id, index + 1])
    );
    const conceptModule = new Map(
      architecture.modules.flatMap((module) =>
        module.conceptIds.map((conceptId) => [conceptId, module.id] as const)
      )
    );
    const moduleConceptIds = architecture.modules.flatMap((module) => module.conceptIds);
    const moduleSourceObjectiveIds = new Set(
      architecture.modules.flatMap((module) => module.sourceObjectiveIds)
    );
    const projectIds = architecture.projects.map((project) => project.id);
    const projectDomains = architecture.projects.map((project) => project.scenarioDomain);
    const projectSourceObjectiveIds = architecture.projects.flatMap((project) => [
      ...project.sourceObjectiveIds,
      ...project.unmappedSourceObjectiveIds,
    ]);

    const duplicateIssue = (values: string[], message: string, path: PropertyKey[]) => {
      if (new Set(values).size !== values.length) {
        context.addIssue({ code: 'custom', message, path });
      }
    };

    duplicateIssue(architecture.moduleIds, 'Duplicate architecture module IDs', ['moduleIds']);
    duplicateIssue(
      architecture.modules.map((module) => module.id),
      'Duplicate architecture module records',
      ['modules']
    );
    duplicateIssue(architecture.conceptIds, 'Duplicate architecture concept inventory IDs', [
      'conceptIds',
    ]);
    duplicateIssue(moduleConceptIds, 'Concept is assigned to multiple architecture modules', [
      'modules',
    ]);
    duplicateIssue(architecture.sourceObjectiveIds, 'Duplicate architecture source objective IDs', [
      'sourceObjectiveIds',
    ]);
    duplicateIssue(
      architecture.unmappedSourceObjectiveIds,
      'Duplicate unmapped architecture source objective IDs',
      ['unmappedSourceObjectiveIds']
    );
    duplicateIssue(projectIds, 'Duplicate architecture project IDs', ['projects']);
    duplicateIssue(projectDomains, 'Architecture projects repeat a scenario domain', ['projects']);
    duplicateIssue(projectSourceObjectiveIds, 'Certification project source objective is reused', [
      'projects',
    ]);

    if (
      architecture.moduleIds.join('\n') !==
      architecture.modules.map((module) => module.id).join('\n')
    ) {
      context.addIssue({
        code: 'custom',
        message: 'Architecture module inventory does not match module record order',
        path: ['moduleIds'],
      });
    }
    if (architecture.entryContract.openingModuleId !== architecture.moduleIds[0]) {
      context.addIssue({
        code: 'custom',
        message: 'Entry contract opening module must be first',
        path: ['entryContract', 'openingModuleId'],
      });
    }
    if (
      new Set(architecture.conceptIds).size !== conceptModule.size ||
      architecture.conceptIds.some((conceptId) => !conceptModule.has(conceptId))
    ) {
      context.addIssue({
        code: 'custom',
        message: 'Architecture modules must assign every concept exactly once',
        path: ['modules'],
      });
    }
    if (
      architecture.sourceObjectiveIds.some(
        (objectiveId) => !moduleSourceObjectiveIds.has(objectiveId)
      )
    ) {
      context.addIssue({
        code: 'custom',
        message: 'Architecture modules do not cover every source objective',
        path: ['modules'],
      });
    }
    if (
      architecture.unmappedSourceObjectiveIds.some((objectiveId) =>
        architecture.sourceObjectiveIds.includes(objectiveId)
      )
    ) {
      context.addIssue({
        code: 'custom',
        message: 'Architecture source objectives cannot be both mapped and unmapped',
        path: ['unmappedSourceObjectiveIds'],
      });
    }

    for (const [moduleIndex, module] of architecture.modules.entries()) {
      if (module.order !== moduleIndex + 1) {
        context.addIssue({
          code: 'custom',
          message: `Architecture module ${module.id} order differs from sequence position`,
          path: ['modules', moduleIndex, 'order'],
        });
      }
      duplicateIssue(
        module.prerequisiteModuleIds,
        `Architecture module ${module.id} repeats prerequisites`,
        ['modules', moduleIndex, 'prerequisiteModuleIds']
      );
      duplicateIssue(module.conceptIds, `Architecture module ${module.id} repeats concepts`, [
        'modules',
        moduleIndex,
        'conceptIds',
      ]);
      duplicateIssue(
        module.sourceObjectiveIds,
        `Architecture module ${module.id} repeats source objectives`,
        ['modules', moduleIndex, 'sourceObjectiveIds']
      );
      duplicateIssue(
        module.retrievalConceptIds,
        `Architecture module ${module.id} repeats retrieval concepts`,
        ['modules', moduleIndex, 'retrievalConceptIds']
      );
      for (const prerequisiteId of module.prerequisiteModuleIds) {
        if (!moduleById.has(prerequisiteId)) {
          context.addIssue({
            code: 'custom',
            message: `Architecture module ${module.id} references unknown prerequisite ${prerequisiteId}`,
            path: ['modules', moduleIndex, 'prerequisiteModuleIds'],
          });
        } else if ((moduleOrder.get(prerequisiteId) ?? 0) >= module.order) {
          context.addIssue({
            code: 'custom',
            message: `Architecture module ${module.id} depends on non-earlier module ${prerequisiteId}`,
            path: ['modules', moduleIndex, 'prerequisiteModuleIds'],
          });
        }
      }
      for (const retrievalConceptId of module.retrievalConceptIds) {
        const owner = conceptModule.get(retrievalConceptId);
        if (!owner) {
          context.addIssue({
            code: 'custom',
            message: `Architecture module ${module.id} retrieves unknown concept ${retrievalConceptId}`,
            path: ['modules', moduleIndex, 'retrievalConceptIds'],
          });
        } else if ((moduleOrder.get(owner) ?? 0) >= module.order) {
          context.addIssue({
            code: 'custom',
            message: `Architecture module ${module.id} retrieves non-earlier concept ${retrievalConceptId}`,
            path: ['modules', moduleIndex, 'retrievalConceptIds'],
          });
        }
      }
      for (const sourceObjectiveId of module.sourceObjectiveIds) {
        if (!architecture.sourceObjectiveIds.includes(sourceObjectiveId)) {
          context.addIssue({
            code: 'custom',
            message: `Architecture module ${module.id} references unknown source objective ${sourceObjectiveId}`,
            path: ['modules', moduleIndex, 'sourceObjectiveIds'],
          });
        }
      }
    }

    for (const [projectIndex, project] of architecture.projects.entries()) {
      const placementOrder = moduleOrder.get(project.placementAfterModuleId);
      if (project.sourceObjectiveIds.length + project.unmappedSourceObjectiveIds.length === 0) {
        context.addIssue({
          code: 'custom',
          message: `Architecture project ${project.id} lacks source objective provenance`,
          path: ['projects', projectIndex],
        });
      }
      if (!placementOrder) {
        context.addIssue({
          code: 'custom',
          message: `Architecture project ${project.id} has unknown placement module`,
          path: ['projects', projectIndex, 'placementAfterModuleId'],
        });
        continue;
      }
      duplicateIssue(project.conceptIds, `Architecture project ${project.id} repeats concepts`, [
        'projects',
        projectIndex,
        'conceptIds',
      ]);
      for (const conceptId of project.conceptIds) {
        const owner = conceptModule.get(conceptId);
        if (!owner) {
          context.addIssue({
            code: 'custom',
            message: `Architecture project ${project.id} references unknown concept ${conceptId}`,
            path: ['projects', projectIndex, 'conceptIds'],
          });
        } else if ((moduleOrder.get(owner) ?? 0) > placementOrder) {
          context.addIssue({
            code: 'custom',
            message: `Architecture project ${project.id} uses concept ${conceptId} before instruction`,
            path: ['projects', projectIndex, 'conceptIds'],
          });
        }
      }
      for (const objectiveId of project.sourceObjectiveIds) {
        if (!architecture.sourceObjectiveIds.includes(objectiveId)) {
          context.addIssue({
            code: 'custom',
            message: `Architecture project ${project.id} references unknown source objective ${objectiveId}`,
            path: ['projects', projectIndex, 'sourceObjectiveIds'],
          });
        }
      }
      for (const objectiveId of project.unmappedSourceObjectiveIds) {
        if (!architecture.unmappedSourceObjectiveIds.includes(objectiveId)) {
          context.addIssue({
            code: 'custom',
            message: `Architecture project ${project.id} references unknown unmapped source objective ${objectiveId}`,
            path: ['projects', projectIndex, 'unmappedSourceObjectiveIds'],
          });
        }
      }
    }

    if (architecture.status === 'approved') {
      if (architecture.gaps.length > 0 || architecture.unmappedSourceObjectiveIds.length > 0) {
        context.addIssue({
          code: 'custom',
          message: 'Approved architecture cannot retain gaps or unmapped source objectives',
        });
      }
      if (
        architecture.modules.some((module) => module.currentState !== 'reviewed') ||
        architecture.projects.some((project) => project.currentState !== 'reviewed')
      ) {
        context.addIssue({
          code: 'custom',
          message: 'Approved architecture requires every module and project reviewed',
        });
      }
    }
  });

const PlannedInteractionModeSchema = z.enum([
  'read',
  'predict',
  'inspect',
  'explain',
  'code',
  'test',
  'complete',
  'debug',
  'build',
  'defend',
  'retrieve',
  'correct',
  'answer',
]);

const PlannedActivitySchema = z.object({
  id: IdentifierSchema,
  title: z.string().min(8),
  scenarioDomain: IdentifierSchema,
  interactionModes: z.array(PlannedInteractionModeSchema).min(2),
  evidenceStages: z.array(ConceptEvidenceStageSchema).min(1),
  minimumInteractions: z.number().int().positive(),
});

const ActivityMatrixTotalsSchema = z.object({
  theoryInteractions: z.number().int().positive(),
  workshopSteps: z.number().int().positive(),
  independentLabs: z.number().int().positive(),
  reviews: z.number().int().positive(),
  quizBanks: z.number().int().positive(),
  preAssessmentInteractions: z.number().int().positive(),
});

export const ResearchActivityMatrixSchema = z
  .object({
    schemaVersion: z.literal(1),
    courseId: IdentifierSchema,
    status: z.enum(['researching', 'in-review', 'approved']),
    reviewedAt: z.iso.date(),
    depthCommitment: z.object({
      minimums: ActivityMatrixTotalsSchema,
      plannedMinimums: ActivityMatrixTotalsSchema,
      interpretation: z.string().min(50),
    }),
    modules: z
      .array(
        z.object({
          moduleId: IdentifierSchema,
          state: z.literal('planned-not-authored'),
          newConceptIds: z.array(IdentifierSchema).min(1),
          retrievalConceptIds: z.array(IdentifierSchema),
          activities: z.object({
            model: PlannedActivitySchema,
            workshop: PlannedActivitySchema,
            faded: PlannedActivitySchema,
            debug: PlannedActivitySchema,
            lab: PlannedActivitySchema,
            review: PlannedActivitySchema,
            assessment: PlannedActivitySchema.extend({
              kind: z.enum(['quiz-bank', 'performance-check-bank']),
            }),
          }),
          distinctnessRationale: z.string().min(100),
          correctionContract: z.array(z.string().min(40)).min(2),
        })
      )
      .min(1),
    assessmentBoundary: z.object({
      externalExamEvidence: z.string().min(40),
      requiredOriginalEvidence: z.array(z.string().min(30)).min(4),
    }),
    architectureFindings: z.array(z.string().min(30)).min(1),
    gaps: z.array(z.string().min(30)).min(1),
  })
  .superRefine((matrix, context) => {
    const activityRoles = [
      'model',
      'workshop',
      'faded',
      'debug',
      'lab',
      'review',
      'assessment',
    ] as const;
    const expectedStages = {
      model: ['introduce', 'model'],
      workshop: ['guided'],
      faded: ['faded'],
      debug: ['debug'],
      lab: ['transfer'],
      review: ['retrieve'],
      assessment: ['assess'],
    } as const;
    const moduleIds = matrix.modules.map((module) => module.moduleId);
    const newConceptIds = matrix.modules.flatMap((module) => module.newConceptIds);
    const activityIds = matrix.modules.flatMap((module) =>
      activityRoles.map((role) => module.activities[role].id)
    );
    const scenarioDomains = matrix.modules.flatMap((module) =>
      activityRoles.map((role) => module.activities[role].scenarioDomain)
    );
    const rejectDuplicates = (values: string[], message: string, path: PropertyKey[]) => {
      if (new Set(values).size !== values.length) {
        context.addIssue({ code: 'custom', message, path });
      }
    };

    rejectDuplicates(moduleIds, 'Activity matrix repeats module IDs', ['modules']);
    rejectDuplicates(newConceptIds, 'Activity matrix assigns a concept more than once', [
      'modules',
    ]);
    rejectDuplicates(activityIds, 'Activity matrix repeats activity IDs', ['modules']);
    rejectDuplicates(scenarioDomains, 'Activity matrix repeats scenario domains', ['modules']);

    for (const [moduleIndex, module] of matrix.modules.entries()) {
      rejectDuplicates(
        module.newConceptIds,
        `Activity matrix module ${module.moduleId} repeats new concepts`,
        ['modules', moduleIndex, 'newConceptIds']
      );
      rejectDuplicates(
        module.retrievalConceptIds,
        `Activity matrix module ${module.moduleId} repeats retrieval concepts`,
        ['modules', moduleIndex, 'retrievalConceptIds']
      );
      if (
        module.retrievalConceptIds.some((conceptId) => module.newConceptIds.includes(conceptId))
      ) {
        context.addIssue({
          code: 'custom',
          message: `Activity matrix module ${module.moduleId} retrieves a newly introduced concept`,
          path: ['modules', moduleIndex, 'retrievalConceptIds'],
        });
      }
      for (const role of activityRoles) {
        if (module.activities[role].evidenceStages.join(',') !== expectedStages[role].join(',')) {
          context.addIssue({
            code: 'custom',
            message: `Activity matrix module ${module.moduleId} misassigns ${role} evidence stages`,
            path: ['modules', moduleIndex, 'activities', role, 'evidenceStages'],
          });
        }
      }
    }

    const computed = {
      theoryInteractions: matrix.modules.reduce(
        (total, module) => total + module.activities.model.minimumInteractions,
        0
      ),
      workshopSteps: matrix.modules.reduce(
        (total, module) => total + module.activities.workshop.minimumInteractions,
        0
      ),
      independentLabs: matrix.modules.length,
      reviews: matrix.modules.length,
      quizBanks: matrix.modules.filter(
        (module) => module.activities.assessment.kind === 'quiz-bank'
      ).length,
      preAssessmentInteractions: matrix.modules.reduce(
        (total, module) =>
          total +
          (['model', 'workshop', 'faded', 'debug', 'lab', 'review'] as const).reduce(
            (moduleTotal, role) => moduleTotal + module.activities[role].minimumInteractions,
            0
          ),
        0
      ),
    };
    for (const key of Object.keys(computed) as Array<keyof typeof computed>) {
      if (matrix.depthCommitment.plannedMinimums[key] !== computed[key]) {
        context.addIssue({
          code: 'custom',
          message: `Activity matrix planned ${key} does not match its activity records`,
          path: ['depthCommitment', 'plannedMinimums', key],
        });
      }
      if (computed[key] < matrix.depthCommitment.minimums[key]) {
        context.addIssue({
          code: 'custom',
          message: `Activity matrix does not meet minimum ${key}`,
          path: ['depthCommitment', 'plannedMinimums', key],
        });
      }
    }
    if (matrix.status === 'approved' && matrix.gaps.length > 0) {
      context.addIssue({
        code: 'custom',
        message: 'Approved activity matrix cannot retain open gaps',
        path: ['gaps'],
      });
    }
  });

const StepDesignRoleSchema = z.enum([
  'model',
  'workshop',
  'faded',
  'debug',
  'lab',
  'review',
  'assessment',
]);

const StepDesignEvidenceKindSchema = z.enum([
  'state-distinction',
  'responsibility-classification',
  'source-preview-prediction',
  'artifact-persistence',
  'element-anatomy',
  'source-dom-mapping',
  'void-syntax',
  'attribute-contract',
  'comment-safety',
  'resource-evidence',
  'input-path-parity',
  'tool-role-selection',
  'file-operation-consequence',
  'path-reference-behavior',
  'file-identity',
  'project-tree-invariant',
  'file-inspection-evidence',
  'network-layer-diagnosis',
  'account-safety-decision',
  'browser-coverage-evidence',
  'navigation-boundary',
  'research-evidence-trace',
  'document-mode',
  'document-envelope',
  'language-scope',
  'encoding-roundtrip',
  'metadata-consumer',
  'viewport-behavior',
  'url-resolution',
  'loading-pipeline',
  'authority-claim-verification',
  'hyperlink-activation',
  'link-purpose-audit',
  'fragment-navigation',
  'replaced-content-boundary',
  'image-purpose-alternative',
  'image-loading-layout',
  'figure-caption-relationship',
  'media-rights-record',
  'svg-accessibility',
  'native-media-control',
  'timed-media-equivalence',
  'embed-boundary',
  'text-semantic-choice',
  'quotation-provenance',
  'abbreviation-expansion',
  'contact-context',
  'machine-time',
  'notation-semantics',
  'code-whitespace',
  'editorial-meaning',
  'ruby-relationship',
  'landmark-exposure',
  'sectioning-relationship',
  'disclosure-state',
  'native-control-behavior',
  'form-entry-list',
  'form-label-description',
  'input-purpose-behavior',
  'choice-group-behavior',
  'form-control-behavior',
  'control-state-transition',
  'constraint-validity',
  'error-recovery',
  'rendered-text-prediction',
  'dom-tree',
  'dom-relationship',
  'content-model-decision',
  'semantic-choice',
  'dom-behavior',
  'parser-diagnostic',
  'changed-case',
  'causal-explanation',
  'design-defense',
]);

const StepDesignLayoutSchema = z.enum([
  'worked-example',
  'source-preview',
  'source-tree-preview',
  'classification-board',
  'relationship-map',
  'debug-console',
  'independent-studio',
  'retrieval-board',
  'assessment-studio',
  'resource-monitor',
  'input-path-lab',
  'tool-role-map',
  'file-workspace',
  'project-tree',
  'search-inspector',
  'network-trace',
  'sign-in-safety',
  'browser-matrix',
  'navigation-trace',
  'research-notebook',
  'document-inspector',
  'metadata-inspector',
  'viewport-lab',
  'url-resolver',
  'load-pipeline',
  'authority-notebook',
  'hyperlink-inspector',
  'destination-map',
  'link-list-audit',
  'fragment-navigator',
  'replaced-content-inspector',
  'image-purpose-board',
  'image-load-timeline',
  'figure-relationship-map',
  'rights-ledger',
  'svg-inspector',
  'media-player-inspector',
  'track-timeline',
  'transcript-audit',
  'embed-permission-inspector',
  'semantic-text-inspector',
  'quote-source-map',
  'time-parser',
  'notation-inspector',
  'whitespace-viewer',
  'annotation-inspector',
  'ruby-inspector',
  'landmark-inspector',
  'section-relationship-map',
  'disclosure-state-inspector',
  'control-parity-matrix',
  'form-data-inspector',
  'accessible-name-inspector',
  'input-purpose-matrix',
  'choice-group-inspector',
  'form-control-inspector',
  'control-state-inspector',
  'validity-inspector',
  'error-recovery-trace',
]);

const StepDesignSupportSchema = z.enum([
  'worked-guidance',
  'guided-hints',
  'faded-hints',
  'on-request-hints',
  'no-assessment-hints',
]);

const ActivityStepDesignSchema = z.object({
  id: IdentifierSchema,
  order: z.number().int().positive(),
  clusterId: IdentifierSchema,
  mode: PlannedInteractionModeSchema,
  title: z.string().min(8),
  learnerAction: z.string().min(30),
  conceptIds: z.array(IdentifierSchema).min(1),
  reinforcesConceptIds: z.array(IdentifierSchema),
  artifactChange: z.string().min(20),
  evidence: z.object({
    kind: StepDesignEvidenceKindSchema,
    observable: z.string().min(30),
    changedCase: z.string().min(25).optional(),
  }),
  feedbackTarget: z.string().min(25),
  correctionRoute: z.string().min(25),
  layout: StepDesignLayoutSchema,
  support: StepDesignSupportSchema,
});

export const ResearchModuleStepDesignSchema = z
  .object({
    schemaVersion: z.literal(1),
    courseId: IdentifierSchema,
    moduleId: IdentifierSchema,
    status: z.enum(['researching', 'in-review', 'approved']),
    reviewedAt: z.iso.date(),
    state: z.literal('planned-not-authored'),
    sourceArtifacts: z.array(z.string().min(20)).min(3),
    newConceptIds: z.array(IdentifierSchema).min(1),
    retrievalConceptIds: z.array(IdentifierSchema),
    conceptClusters: z
      .array(
        z.object({
          id: IdentifierSchema,
          title: z.string().min(8),
          conceptIds: z.array(IdentifierSchema).min(1),
          prerequisiteClusterIds: z.array(IdentifierSchema),
          exitEvidence: z.array(z.string().min(30)).min(2),
        })
      )
      .min(2),
    activityDeliveryOrder: z.tuple([
      z.literal('model'),
      z.literal('workshop'),
      z.literal('faded'),
      z.literal('debug'),
      z.literal('lab'),
      z.literal('review'),
      z.literal('assessment'),
    ]),
    activityDesigns: z
      .array(
        z.object({
          activityId: IdentifierSchema,
          role: StepDesignRoleSchema,
          scenarioDomain: IdentifierSchema,
          plannedInteractions: z.number().int().positive(),
          cumulativeArtifact: z.string().min(40),
          startingState: z.string().min(30),
          completionState: z.string().min(40),
          feedbackContract: z.string().min(50),
          hintContract: z.string().min(40),
          correctionContract: z.string().min(50),
          interactions: z.array(ActivityStepDesignSchema).min(1),
        })
      )
      .length(7),
    authorshipBoundary: z.object({
      learnerFacingCopyAuthored: z.literal(false),
      starterCodeAuthored: z.literal(false),
      canonicalAnswersAuthored: z.literal(false),
      interpretation: z.string().min(60),
    }),
    gaps: z.array(z.string().min(30)),
  })
  .superRefine((design, context) => {
    const expectedRoles = [
      'model',
      'workshop',
      'faded',
      'debug',
      'lab',
      'review',
      'assessment',
    ] as const;
    const rejectDuplicates = (values: string[], message: string, path: PropertyKey[]) => {
      if (new Set(values).size !== values.length) {
        context.addIssue({ code: 'custom', message, path });
      }
    };

    rejectDuplicates(design.newConceptIds, 'Step design repeats new module concepts', [
      'newConceptIds',
    ]);
    rejectDuplicates(design.retrievalConceptIds, 'Step design repeats retrieval concepts', [
      'retrievalConceptIds',
    ]);
    const allConceptIds = [...design.newConceptIds, ...design.retrievalConceptIds];
    rejectDuplicates(allConceptIds, 'Step design overlaps new and retrieval concepts', [
      'newConceptIds',
    ]);
    rejectDuplicates(
      design.conceptClusters.map((cluster) => cluster.id),
      'Step design repeats concept cluster IDs',
      ['conceptClusters']
    );
    rejectDuplicates(
      design.conceptClusters.flatMap((cluster) => cluster.conceptIds),
      'Step design assigns a concept to multiple clusters',
      ['conceptClusters']
    );
    rejectDuplicates(
      design.activityDesigns.map((activity) => activity.activityId),
      'Step design repeats activity IDs',
      ['activityDesigns']
    );
    rejectDuplicates(
      design.activityDesigns.flatMap((activity) =>
        activity.interactions.map((interaction) => interaction.id)
      ),
      'Step design repeats interaction IDs',
      ['activityDesigns']
    );

    const clusteredConceptIds = design.conceptClusters.flatMap((cluster) => cluster.conceptIds);
    if (
      clusteredConceptIds.length !== allConceptIds.length ||
      !allConceptIds.every((conceptId) => clusteredConceptIds.includes(conceptId))
    ) {
      context.addIssue({
        code: 'custom',
        message: 'Step design clusters must cover new and retrieval concepts exactly once',
        path: ['conceptClusters'],
      });
    }
    const actualRoles = design.activityDesigns.map((activity) => activity.role);
    rejectDuplicates(actualRoles, 'Step design repeats activity roles', ['activityDesigns']);
    if (!expectedRoles.every((role) => actualRoles.includes(role))) {
      context.addIssue({
        code: 'custom',
        message: 'Step design activity roles must be complete',
        path: ['activityDesigns'],
      });
    }

    const clusterIds = design.conceptClusters.map((cluster) => cluster.id);
    for (const [clusterIndex, cluster] of design.conceptClusters.entries()) {
      for (const prerequisiteId of cluster.prerequisiteClusterIds) {
        const prerequisiteIndex = clusterIds.indexOf(prerequisiteId);
        if (prerequisiteIndex < 0 || prerequisiteIndex >= clusterIndex) {
          context.addIssue({
            code: 'custom',
            message: `Step design cluster ${cluster.id} has an unknown or non-prior prerequisite`,
            path: ['conceptClusters', clusterIndex, 'prerequisiteClusterIds'],
          });
        }
      }
    }

    const evidenceConceptsByRole = new Map<string, Set<string>>();
    for (const [activityIndex, activity] of design.activityDesigns.entries()) {
      if (activity.interactions.length !== activity.plannedInteractions) {
        context.addIssue({
          code: 'custom',
          message: `Step design ${activity.activityId} interaction count is not decomposed exactly`,
          path: ['activityDesigns', activityIndex, 'interactions'],
        });
      }
      evidenceConceptsByRole.set(activity.role, new Set());
      rejectDuplicates(
        activity.interactions.map((interaction) => interaction.learnerAction),
        `Step design ${activity.activityId} repeats learner actions`,
        ['activityDesigns', activityIndex, 'interactions']
      );
      for (const [interactionIndex, interaction] of activity.interactions.entries()) {
        if (interaction.order !== interactionIndex + 1) {
          context.addIssue({
            code: 'custom',
            message: `Step design ${activity.activityId} interaction order is not contiguous`,
            path: ['activityDesigns', activityIndex, 'interactions', interactionIndex, 'order'],
          });
        }
        if (!clusterIds.includes(interaction.clusterId)) {
          context.addIssue({
            code: 'custom',
            message: `Step design interaction ${interaction.id} references an unknown cluster`,
            path: ['activityDesigns', activityIndex, 'interactions', interactionIndex, 'clusterId'],
          });
        }
        const interactionConcepts = [
          ...interaction.conceptIds,
          ...interaction.reinforcesConceptIds,
        ];
        rejectDuplicates(
          interactionConcepts,
          `Step design interaction ${interaction.id} repeats concepts`,
          ['activityDesigns', activityIndex, 'interactions', interactionIndex, 'conceptIds']
        );
        for (const conceptId of interactionConcepts) {
          if (!allConceptIds.includes(conceptId)) {
            context.addIssue({
              code: 'custom',
              message: `Step design interaction ${interaction.id} references an unknown concept`,
              path: [
                'activityDesigns',
                activityIndex,
                'interactions',
                interactionIndex,
                'conceptIds',
              ],
            });
          }
        }
        for (const conceptId of interaction.conceptIds) {
          evidenceConceptsByRole.get(activity.role)?.add(conceptId);
        }
        if (
          [
            'dom-behavior',
            'void-syntax',
            'attribute-contract',
            'resource-evidence',
            'input-path-parity',
            'tool-role-selection',
            'file-operation-consequence',
            'path-reference-behavior',
            'file-identity',
            'project-tree-invariant',
            'file-inspection-evidence',
            'network-layer-diagnosis',
            'account-safety-decision',
            'browser-coverage-evidence',
            'navigation-boundary',
            'research-evidence-trace',
            'document-mode',
            'document-envelope',
            'language-scope',
            'encoding-roundtrip',
            'metadata-consumer',
            'viewport-behavior',
            'url-resolution',
            'loading-pipeline',
            'authority-claim-verification',
            'hyperlink-activation',
            'link-purpose-audit',
            'fragment-navigation',
            'replaced-content-boundary',
            'image-purpose-alternative',
            'image-loading-layout',
            'figure-caption-relationship',
            'media-rights-record',
            'svg-accessibility',
            'native-media-control',
            'timed-media-equivalence',
            'embed-boundary',
            'text-semantic-choice',
            'quotation-provenance',
            'abbreviation-expansion',
            'contact-context',
            'machine-time',
            'notation-semantics',
            'code-whitespace',
            'editorial-meaning',
            'ruby-relationship',
            'landmark-exposure',
            'sectioning-relationship',
            'disclosure-state',
            'native-control-behavior',
            'form-entry-list',
            'form-label-description',
            'input-purpose-behavior',
            'choice-group-behavior',
            'form-control-behavior',
            'control-state-transition',
            'constraint-validity',
            'error-recovery',
            'parser-diagnostic',
            'changed-case',
            'artifact-persistence',
          ].includes(interaction.evidence.kind) &&
          !interaction.evidence.changedCase
        ) {
          context.addIssue({
            code: 'custom',
            message: `Step design interaction ${interaction.id} lacks changed-case evidence`,
            path: ['activityDesigns', activityIndex, 'interactions', interactionIndex, 'evidence'],
          });
        }
        if (activity.role === 'assessment' && interaction.support !== 'no-assessment-hints') {
          context.addIssue({
            code: 'custom',
            message: `Assessment interaction ${interaction.id} exposes instructional hints`,
            path: ['activityDesigns', activityIndex, 'interactions', interactionIndex, 'support'],
          });
        }
      }
    }

    for (const role of expectedRoles) {
      const missingConcepts = allConceptIds.filter(
        (conceptId) => !evidenceConceptsByRole.get(role)?.has(conceptId)
      );
      if (missingConcepts.length > 0) {
        const activityIndex = design.activityDesigns.findIndex(
          (activity) => activity.role === role
        );
        context.addIssue({
          code: 'custom',
          message: `Step design ${role} role omits module concepts: ${missingConcepts.join(', ')}`,
          path: ['activityDesigns', activityIndex, 'interactions'],
        });
      }
    }

    if (design.status === 'approved' && design.gaps.length > 0) {
      context.addIssue({
        code: 'custom',
        message: 'Approved step design cannot retain gaps',
        path: ['gaps'],
      });
    }
  });

const AssessmentEvidenceModeSchema = z.enum([
  'predict',
  'code-read',
  'build',
  'debug',
  'changed-case',
  'accessibility-evidence',
  'design-decision',
  'defense',
]);

const AssessmentCognitiveDemandSchema = z.enum([
  'explain',
  'apply',
  'analyze-debug',
  'evaluate',
  'create-defend',
]);

export const ResearchAssessmentBlueprintSchema = z
  .object({
    schemaVersion: z.literal(1),
    courseId: IdentifierSchema,
    status: z.enum(['researching', 'in-review', 'approved']),
    reviewedAt: z.iso.date(),
    credentialDecision: z.literal('blocked'),
    externalExamBoundary: z.string().min(100),
    requiredProjectIds: z.array(IdentifierSchema).length(5),
    exam: z.object({
      id: IdentifierSchema,
      title: z.string().min(10),
      prerequisiteModuleIds: z.array(IdentifierSchema).min(1),
      prerequisiteProjectIds: z.array(IdentifierSchema).length(5),
      maximumMinutes: z.number().int().positive().max(360),
      delivery: z.literal('server-canonical-isolated-browser'),
      correctionPolicy: z.string().min(100),
    }),
    strands: z
      .array(
        z.object({
          id: IdentifierSchema,
          title: z.string().min(10),
          moduleIds: z.array(IdentifierSchema).min(1),
          conceptIds: z.array(IdentifierSchema).min(1),
          weightPercent: z.number().int().positive(),
          itemsPerForm: z.number().int().positive(),
          evidenceModes: z.array(AssessmentEvidenceModeSchema).min(3),
          cognitiveDemands: z.array(AssessmentCognitiveDemandSchema).min(2),
          validityClaim: z.string().min(80),
        })
      )
      .min(3),
    formDesign: z.object({
      minimumSecureForms: z.number().int().min(2),
      operationalItemsPerForm: z.number().int().min(20),
      itemFamilyCounts: z.record(IdentifierSchema, z.number().int().nonnegative()),
      cognitiveDemandPercent: z.record(
        AssessmentCognitiveDemandSchema,
        z.number().int().nonnegative()
      ),
      randomizationBoundaries: z.array(z.string().min(40)).min(3),
      exposureControls: z.array(z.string().min(40)).min(3),
    }),
    scoring: z.object({
      cutScoreStatus: z.literal('not-set'),
      provisionalPassingPercentProhibited: z.literal(true),
      credentialRule: z.string().min(100),
      standardSettingPlan: z.array(z.string().min(50)).min(4),
      itemAnalysisPlan: z.array(z.string().min(50)).min(4),
    }),
    accessibilityAndSecurity: z.array(z.string().min(50)).min(6),
    requiredReviewEvidence: z.array(z.string().min(50)).min(6),
    gaps: z.array(z.string().min(40)).min(1),
  })
  .superRefine((blueprint, context) => {
    const strandIds = blueprint.strands.map((strand) => strand.id);
    const moduleIds = blueprint.strands.flatMap((strand) => strand.moduleIds);
    const conceptIds = blueprint.strands.flatMap((strand) => strand.conceptIds);
    const rejectDuplicates = (values: string[], message: string, path: PropertyKey[]) => {
      if (new Set(values).size !== values.length) {
        context.addIssue({ code: 'custom', message, path });
      }
    };
    rejectDuplicates(blueprint.requiredProjectIds, 'Assessment blueprint repeats projects', [
      'requiredProjectIds',
    ]);
    rejectDuplicates(strandIds, 'Assessment blueprint repeats strand IDs', ['strands']);
    rejectDuplicates(moduleIds, 'Assessment blueprint assigns a module to multiple strands', [
      'strands',
    ]);
    rejectDuplicates(conceptIds, 'Assessment blueprint assigns a concept to multiple strands', [
      'strands',
    ]);
    for (const [strandIndex, strand] of blueprint.strands.entries()) {
      rejectDuplicates(strand.moduleIds, `Assessment strand ${strand.id} repeats modules`, [
        'strands',
        strandIndex,
        'moduleIds',
      ]);
      rejectDuplicates(strand.conceptIds, `Assessment strand ${strand.id} repeats concepts`, [
        'strands',
        strandIndex,
        'conceptIds',
      ]);
      rejectDuplicates(
        strand.evidenceModes,
        `Assessment strand ${strand.id} repeats evidence modes`,
        ['strands', strandIndex, 'evidenceModes']
      );
      rejectDuplicates(
        strand.cognitiveDemands,
        `Assessment strand ${strand.id} repeats cognitive demands`,
        ['strands', strandIndex, 'cognitiveDemands']
      );
    }
    if (blueprint.strands.reduce((total, strand) => total + strand.weightPercent, 0) !== 100) {
      context.addIssue({
        code: 'custom',
        message: 'Assessment strand weights must total 100 percent',
        path: ['strands'],
      });
    }
    if (
      blueprint.strands.reduce((total, strand) => total + strand.itemsPerForm, 0) !==
      blueprint.formDesign.operationalItemsPerForm
    ) {
      context.addIssue({
        code: 'custom',
        message: 'Assessment strand item counts must match operational form length',
        path: ['strands'],
      });
    }
    if (
      Object.values(blueprint.formDesign.itemFamilyCounts).reduce(
        (total, count) => total + count,
        0
      ) !== blueprint.formDesign.operationalItemsPerForm
    ) {
      context.addIssue({
        code: 'custom',
        message: 'Assessment item-family counts must match operational form length',
        path: ['formDesign', 'itemFamilyCounts'],
      });
    }
    if (
      Object.values(blueprint.formDesign.cognitiveDemandPercent).reduce(
        (total, percent) => total + percent,
        0
      ) !== 100
    ) {
      context.addIssue({
        code: 'custom',
        message: 'Assessment cognitive-demand percentages must total 100',
        path: ['formDesign', 'cognitiveDemandPercent'],
      });
    }
  });

const PlannedEvidenceReferenceSchema = z.object({
  activityId: IdentifierSchema,
  moduleId: IdentifierSchema.optional(),
});

export const ResearchCompetencyEvidenceMatrixSchema = z
  .object({
    schemaVersion: z.literal(1),
    courseId: IdentifierSchema,
    status: z.enum(['researching', 'in-review', 'approved']),
    reviewedAt: z.iso.date(),
    records: z
      .array(
        z.object({
          conceptId: IdentifierSchema,
          ownerModuleId: IdentifierSchema,
          state: z.literal('planned-not-authored'),
          stageEvidence: z.object({
            introduceAndModel: PlannedEvidenceReferenceSchema,
            guided: PlannedEvidenceReferenceSchema,
            faded: PlannedEvidenceReferenceSchema,
            debug: PlannedEvidenceReferenceSchema,
            transfer: PlannedEvidenceReferenceSchema,
            familiarAssessment: PlannedEvidenceReferenceSchema,
          }),
          nextRelevantUse: z.object({
            activityId: IdentifierSchema,
            moduleId: IdentifierSchema.optional(),
            basis: z.enum([
              'named-module-retrieval',
              'downstream-prerequisite',
              'planned-interleaving',
              'certification-exam',
            ]),
          }),
          delayedRetrieval: z.object({
            activityId: IdentifierSchema,
            moduleId: IdentifierSchema.optional(),
            basis: z.enum([
              'named-downstream-use',
              'scheduled-interleaved-review',
              'certification-exam',
            ]),
            interveningModuleCount: z.number().int().nonnegative(),
            adaptiveDueDays: z.array(z.number().int().positive()).min(3),
          }),
          correction: z.object({
            sourceAssessmentActivityId: IdentifierSchema,
            remediationActivityIds: z.array(IdentifierSchema).min(2),
            parallelReassessmentActivityId: IdentifierSchema,
            canonicalAnswersRemainServerSide: z.literal(true),
          }),
          certificationStrandId: IdentifierSchema,
        })
      )
      .min(3),
    schedulingPolicy: z.array(z.string().min(50)).min(4),
    architectureFindings: z.array(z.string().min(40)).min(1),
    gaps: z.array(z.string().min(40)).min(1),
  })
  .superRefine((matrix, context) => {
    const conceptIds = matrix.records.map((record) => record.conceptId);
    if (new Set(conceptIds).size !== conceptIds.length) {
      context.addIssue({
        code: 'custom',
        message: 'Competency evidence matrix repeats concept IDs',
        path: ['records'],
      });
    }
    for (const [recordIndex, record] of matrix.records.entries()) {
      const references = Object.values(record.stageEvidence);
      if (references.some((reference) => reference.moduleId !== record.ownerModuleId)) {
        context.addIssue({
          code: 'custom',
          message: `Competency ${record.conceptId} assigns immediate evidence outside its owner module`,
          path: ['records', recordIndex, 'stageEvidence'],
        });
      }
      if (
        new Set(record.delayedRetrieval.adaptiveDueDays).size !==
        record.delayedRetrieval.adaptiveDueDays.length
      ) {
        context.addIssue({
          code: 'custom',
          message: `Competency ${record.conceptId} repeats adaptive review intervals`,
          path: ['records', recordIndex, 'delayedRetrieval', 'adaptiveDueDays'],
        });
      }
      if (
        [...record.delayedRetrieval.adaptiveDueDays]
          .sort((left, right) => left - right)
          .join(',') !== record.delayedRetrieval.adaptiveDueDays.join(',')
      ) {
        context.addIssue({
          code: 'custom',
          message: `Competency ${record.conceptId} review intervals must increase`,
          path: ['records', recordIndex, 'delayedRetrieval', 'adaptiveDueDays'],
        });
      }
    }
    if (matrix.status === 'approved' && matrix.gaps.length > 0) {
      context.addIssue({
        code: 'custom',
        message: 'Approved competency evidence matrix cannot retain open gaps',
        path: ['gaps'],
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
  const decisionById = new Map(value.decisions.map((decision) => [decision.id, decision]));
  const duplicateCount = (values: string[]) => values.length - new Set(values).size;

  if (duplicateCount(value.questions.map((question) => question.id)) > 0) {
    context.addIssue({
      code: 'custom',
      message: 'Duplicate research question IDs',
    });
  }
  if (duplicateCount(value.sources.map((source) => source.id)) > 0) {
    context.addIssue({
      code: 'custom',
      message: 'Duplicate research source IDs',
    });
  }
  if (duplicateCount(value.decisions.map((decision) => decision.id)) > 0) {
    context.addIssue({
      code: 'custom',
      message: 'Duplicate research decision IDs',
    });
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
        } else if (!decisionById.get(decisionId)?.sourceIds.includes(source.id)) {
          context.addIssue({
            code: 'custom',
            message: `Decision ${decisionId} does not cite supporting source ${source.id}`,
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

export const CourseResearchInventorySchema = z
  .object({
    schemaVersion: z.literal(1),
    reviewedAt: z.iso.date(),
    courses: z
      .array(
        z.object({
          courseId: IdentifierSchema,
          state: z.enum(['pending', 'researching', 'in-review', 'approved']),
          dossierPath: z.string().min(1).optional(),
        })
      )
      .min(1),
  })
  .superRefine((inventory, context) => {
    const ids = inventory.courses.map((course) => course.courseId);
    if (new Set(ids).size !== ids.length) {
      context.addIssue({
        code: 'custom',
        message: 'Duplicate course research inventory IDs',
      });
    }
    for (const [index, course] of inventory.courses.entries()) {
      if (course.state !== 'pending' && !course.dossierPath) {
        context.addIssue({
          code: 'custom',
          message: `${course.courseId} requires a dossier path in ${course.state} state`,
          path: ['courses', index, 'dossierPath'],
        });
      }
    }
  });

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
    status: z.enum(['planned', 'researching', 'researched', 'in-review', 'approved']),
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
        stages: z.array(ResearchCoverageStageSchema).min(1),
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
export type CourseResearchInventory = z.infer<typeof CourseResearchInventorySchema>;
export type PlatformResearchRegister = z.infer<typeof PlatformResearchRegisterSchema>;
export type ExternalCurriculumEvidenceSnapshot = z.infer<
  typeof ExternalCurriculumEvidenceSnapshotSchema
>;
export type ConceptResearchGraph = z.infer<typeof ConceptResearchGraphSchema>;
export type ExternalObjectiveConceptAlignment = z.infer<
  typeof ExternalObjectiveConceptAlignmentSchema
>;
export type ResearchCourseArchitecture = z.infer<typeof ResearchCourseArchitectureSchema>;
export type ResearchActivityMatrix = z.infer<typeof ResearchActivityMatrixSchema>;
export type ResearchModuleStepDesign = z.infer<typeof ResearchModuleStepDesignSchema>;
export type ResearchAssessmentBlueprint = z.infer<typeof ResearchAssessmentBlueprintSchema>;
export type ResearchCompetencyEvidenceMatrix = z.infer<
  typeof ResearchCompetencyEvidenceMatrixSchema
>;
