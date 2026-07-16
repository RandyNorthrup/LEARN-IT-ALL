import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { CourseBlueprintSchema } from './blueprint';
import {
  auditCourseResearch,
  ConceptResearchGraphSchema,
  CourseResearchDossierSchema,
  ExternalCurriculumEvidenceSnapshotSchema,
  ExternalObjectiveConceptAlignmentSchema,
  PlatformResearchRegisterSchema,
  ResearchCourseArchitectureSchema,
  SourceObjectiveCoverageMatrixSchema,
} from './research';

const repositoryRoot = process.cwd();

function readJson(filePath: string) {
  return JSON.parse(readFileSync(filePath, 'utf8')) as unknown;
}

function researchSource(index: number) {
  return {
    id: `source-${index}`,
    title: `Research source ${index}`,
    authority: 'official-docs' as const,
    url: `https://example.com/research/${index}`,
    versionOrPublished: '2026.1',
    reviewedAt: '2026-07-15',
    questionIds: ['question-one'],
    claims: [
      {
        statement: `Source ${index} supports one bounded decision with inspectable evidence.`,
        limitations: [
          'This fixture claim does not establish learner outcomes without direct testing.',
        ],
        decisionIds: ['decision-one'],
      },
    ],
    nextReview: {
      triggers: ['The official documentation or relevant behavior changes.'],
    },
  };
}

function courseDossier(status: 'researching' | 'approved' = 'researching') {
  const questions = ['question-one', 'question-two', 'question-three'].map((id, index) => ({
    id,
    track: index === 0 ? ('subject-scope' as const) : ('learning-science' as const),
    question: `Which bounded evidence should control research question number ${index + 1}?`,
    acceptanceEvidence: [
      'Reviewed evidence traces into a named course decision and validation gate.',
    ],
    status: 'evidence-found' as const,
  }));
  const sources = [1, 2, 3].map(researchSource);
  const decisions = [
    {
      id: 'decision-one',
      title: 'Record bounded course decision',
      status: 'accepted' as const,
      rationale:
        'Reviewed evidence changes course scope and creates a gate that can disprove this decision.',
      sourceIds: sources.map((source) => source.id),
      affects: [{ kind: 'course' as const, reference: 'example-course' }],
      validation: ['A changed learner task and reviewer evidence must pass before approval.'],
    },
  ];
  return {
    schemaVersion: 1,
    courseId: 'example-course',
    status,
    reviewedAt: '2026-07-15',
    questions,
    intendedLearners: [
      'Adult beginners entering with no prior subject-specific course experience.',
    ],
    entryCompetencies: [
      'Use a supported tablet or desktop browser and follow accessible instructions.',
    ],
    terminalTasks: [
      'Complete an unfamiliar authentic task and explain the evidence behind each decision.',
      'Diagnose a changed failure and verify a cause-level repair without copied steps.',
    ],
    scopeIncludes: ['Bounded concepts', 'Guided practice and correction', 'Independent transfer'],
    scopeExcludes: ['Unsafe real-world actions outside an authorized learning environment'],
    authenticTasks: [
      'Build a stakeholder artifact under explicit acceptance constraints.',
      'Diagnose a realistic failure from incomplete and conflicting evidence.',
      'Defend an unfamiliar changed-case solution and its remaining limits.',
    ],
    knownMisconceptions: [
      'Completion of one guided example proves independent mastery.',
      'A matching keyword proves the requested behavior works correctly.',
      'A generated topic list establishes complete and ordered instruction.',
    ],
    safetyBoundaries: ['Learner artifacts never execute on the application host.'],
    sources,
    decisions,
    coverage: [],
    openQuestions: ['Observed learner evidence remains required before research closes.'],
    reviews: {
      subjectMatter: 'in-progress' as const,
      instructionalDesign: 'pending' as const,
      assessment: 'pending' as const,
      accessibility: 'pending' as const,
      safety: 'pending' as const,
      observedLearner: 'pending' as const,
    },
    maintenance: {
      triggers: ['A source, requirement, runtime, or learner finding changes.'],
    },
  };
}

describe('research contracts', () => {
  it('accepts the real platform research register with traceable sources and decisions', () => {
    const register = PlatformResearchRegisterSchema.parse(
      readJson(path.join(repositoryRoot, 'docs/research/platform-research-register.json'))
    );

    expect(register.questions).toHaveLength(11);
    expect(new Set(register.questions.map((question) => question.track))).toHaveLength(11);
    expect(register.sources.every((source) => source.claims[0].limitations.length > 0)).toBe(true);
    expect(register.sources.length).toBeGreaterThanOrEqual(20);
    expect(register.decisions.length).toBeGreaterThanOrEqual(15);
    expect(
      register.questions
        .filter((question) =>
          [
            'competitive-learning-flows',
            'execution-privacy-ethics',
            'stack-compatibility-evidence',
          ].includes(question.id)
        )
        .every((question) => question.status === 'decision-recorded')
    ).toBe(true);
  });

  it('keeps the required platform research artifacts reviewable in the repository', () => {
    const requiredArtifacts = [
      'COMPETITIVE_TASK_AUDIT_2026-07-15.md',
      'EDITOR_RUNTIME_THREAT_MODEL_2026-07-15.md',
      'LEARNER_RESEARCH_AND_PILOT_PROTOCOL.md',
      'PROGRESS_NAVIGATION_EVIDENCE_CONTRACT.md',
      'STACK_COMPATIBILITY_MATRIX_2026-07-15.md',
    ];

    for (const artifact of requiredArtifacts) {
      const content = readFileSync(path.join(repositoryRoot, 'docs/research', artifact), 'utf8');
      expect(content.length, `${artifact} must contain substantive research`).toBeGreaterThan(
        2_000
      );
      expect(content, `${artifact} must record limitations or unresolved evidence`).toMatch(
        /limit|unresolved|open item|residual risk|current blocker/i
      );
    }
  });

  it('records the inspected Responsive Web Design beginner sequence and its blockers', () => {
    const content = readFileSync(
      path.join(repositoryRoot, 'docs/research/courses/responsive-web-design-beginner-sequence.md'),
      'utf8'
    );

    expect(content).toContain('covered all 61 units');
    expect(content).toContain('The first meaningful edit must occur within two learner actions');
    expect(content).toContain('thirteen-activity barrier before HTML');
    expect(content).toContain('## Blockers before sequence approval');
  });

  it('captures every exact pinned v9 challenge source as reproducible research evidence', () => {
    const snapshot = ExternalCurriculumEvidenceSnapshotSchema.parse(
      readJson(path.join(repositoryRoot, 'references/freecodecamp-rwd-v9.json'))
    );
    const blocks = snapshot.chapters.flatMap((chapter) =>
      chapter.modules.flatMap((module) => module.blocks)
    );
    const challenges = blocks.flatMap((block) => block.challengeOrder);

    expect(snapshot).toMatchObject({
      schemaVersion: 2,
      upstreamCommit: 'c115efdd41f868d8850156f6a7a211219c35a847',
      totals: { chapters: 4, modules: 29, blocks: 158, challenges: 1553 },
    });
    expect(challenges).toHaveLength(1553);
    expect(new Set(challenges.map((challenge) => challenge.id))).toHaveLength(1553);
    expect(
      challenges.every(
        (challenge) =>
          challenge.sourceEvidence.relativePath.includes('/blocks/') &&
          challenge.sourceEvidence.sha256.length === 64 &&
          challenge.sourceEvidence.bytes > 0 &&
          challenge.sourceEvidence.topLevelSections.some((sectionName) =>
            ['description', 'interactive'].includes(sectionName)
          )
      )
    ).toBe(true);
    expect(
      challenges.reduce((total, challenge) => total + challenge.sourceEvidence.quizQuestionCount, 0)
    ).toBe(1_365);
  });

  it('rejects corrupted pinned-v9 source evidence', () => {
    const snapshot = readJson(path.join(repositoryRoot, 'references/freecodecamp-rwd-v9.json')) as {
      chapters: Array<{
        modules: Array<{
          blocks: Array<{
            challengeOrder: Array<{
              sourceEvidence: { relativePath: string; sha256: string };
            }>;
          }>;
        }>;
      }>;
    };
    const brokenHash = structuredClone(snapshot);
    brokenHash.chapters[0].modules[0].blocks[0].challengeOrder[0].sourceEvidence.sha256 =
      'not-a-source-hash';
    expect(ExternalCurriculumEvidenceSnapshotSchema.safeParse(brokenHash).success).toBe(false);

    const brokenPath = structuredClone(snapshot);
    brokenPath.chapters[0].modules[0].blocks[0].challengeOrder[0].sourceEvidence.relativePath =
      'curriculum/challenges/english/blocks/wrong/file.md';
    const result = ExternalCurriculumEvidenceSnapshotSchema.safeParse(brokenPath);
    expect(result.success).toBe(false);
    expect(
      result.error?.issues.some((issue) => issue.message.includes('path differs from block'))
    ).toBe(true);
  });

  it('maps every pinned Responsive Web Design source block and challenge identity honestly', () => {
    const matrix = SourceObjectiveCoverageMatrixSchema.parse(
      readJson(
        path.join(repositoryRoot, 'docs/research/courses/responsive-web-design-coverage.json')
      )
    );

    expect(matrix.snapshot).toMatchObject({
      sourceModules: 29,
      sourceBlocks: 158,
      sourceChallenges: 1553,
    });
    expect(matrix.objectives).toHaveLength(158);
    expect(
      matrix.objectives.every((objective) => objective.learnerWorkState === 'mapped-only')
    ).toBe(true);
    expect(matrix.gaps.length).toBeGreaterThanOrEqual(4);
  });

  it('keeps the Responsive Web Design HTML concept graph prerequisite-ordered and source-backed', () => {
    const graph = ConceptResearchGraphSchema.parse(
      readJson(
        path.join(repositoryRoot, 'docs/research/courses/responsive-web-design-html-concepts.json')
      )
    );
    const dossier = CourseResearchDossierSchema.parse(
      readJson(path.join(repositoryRoot, 'docs/research/courses/responsive-web-design.json'))
    );
    const dossierSourceIds = new Set(dossier.sources.map((source) => source.id));
    const conceptIds = graph.concepts.map((concept) => concept.id);

    expect(graph.status).toBe('researching');
    expect(graph.concepts).toHaveLength(79);
    expect(conceptIds).toEqual(
      expect.arrayContaining([
        'html-replaced-content-boundaries',
        'html-media-rights-licensing',
        'html-abbreviations-expansions',
        'html-contact-address-links',
        'html-time-machine-values',
        'html-subscript-superscript',
        'html-code-preformatted-text',
        'html-editorial-annotations',
        'html-ruby-annotations',
        'html-form-control-states',
        'html-table-cell-spans',
      ])
    );
    expect(conceptIds).not.toContain('html-machine-readable-text');
    expect(
      graph.concepts.find((concept) => concept.id === 'html-media-rights-licensing')?.sourceAnchors
    ).toHaveLength(3);
    expect(
      dossier.decisions.find((decision) => decision.id === 'rwd-media-rights-evidence')
    ).toMatchObject({
      status: 'accepted',
      sourceIds: [
        'rwd-mdn-html-images',
        'rwd-us-copyright-fair-use',
        'rwd-creative-commons-licenses',
      ],
    });
    expect(
      graph.concepts.every((concept) => concept.currentState === 'researched-not-authored')
    ).toBe(true);
    expect(graph.sourceIds.every((sourceId) => dossierSourceIds.has(sourceId))).toBe(true);
    expect(graph.gaps.length).toBeGreaterThan(0);
  });

  it('keeps the Responsive Web Design CSS and responsive graph ordered and source-backed', () => {
    const graph = ConceptResearchGraphSchema.parse(
      readJson(
        path.join(repositoryRoot, 'docs/research/courses/responsive-web-design-css-concepts.json')
      )
    );
    const dossier = CourseResearchDossierSchema.parse(
      readJson(path.join(repositoryRoot, 'docs/research/courses/responsive-web-design.json'))
    );
    const dossierSourceIds = new Set(dossier.sources.map((source) => source.id));
    const conceptCounts = Object.fromEntries(
      graph.moduleIds.map((moduleId) => [
        moduleId,
        graph.concepts.filter((concept) => concept.moduleId === moduleId).length,
      ])
    );

    expect(graph.status).toBe('researching');
    expect(graph.concepts).toHaveLength(86);
    expect(graph.moduleIds).toHaveLength(8);
    expect(conceptCounts).toMatchObject({
      'css-language-and-cascade': 16,
      'css-boxes-and-sizing': 12,
      'css-type-color-and-design': 14,
      'css-flexible-layout': 8,
      'css-grid-and-positioning': 10,
      'responsive-systems': 13,
      'css-interaction-accessibility-and-motion': 12,
      'css-independent-project': 1,
    });
    expect(
      graph.concepts.every((concept) => concept.currentState === 'researched-not-authored')
    ).toBe(true);
    expect(graph.sourceIds.every((sourceId) => dossierSourceIds.has(sourceId))).toBe(true);
    expect(graph.gaps.length).toBeGreaterThan(0);
  });

  it('aligns every pinned v9 block to known concepts without hiding modern extensions', () => {
    const matrix = ExternalObjectiveConceptAlignmentSchema.parse(
      readJson(
        path.join(
          repositoryRoot,
          'docs/research/courses/responsive-web-design-concept-alignment.json'
        )
      )
    );
    const coverage = SourceObjectiveCoverageMatrixSchema.parse(
      readJson(
        path.join(repositoryRoot, 'docs/research/courses/responsive-web-design-coverage.json')
      )
    );
    const reference = ExternalCurriculumEvidenceSnapshotSchema.parse(
      readJson(path.join(repositoryRoot, 'references/freecodecamp-rwd-v9.json'))
    );
    const graphs = [
      ConceptResearchGraphSchema.parse(
        readJson(
          path.join(
            repositoryRoot,
            'docs/research/courses/responsive-web-design-html-concepts.json'
          )
        )
      ),
      ConceptResearchGraphSchema.parse(
        readJson(
          path.join(repositoryRoot, 'docs/research/courses/responsive-web-design-css-concepts.json')
        )
      ),
    ];
    const sourceByObjective = new Map(
      coverage.objectives.map((objective) => [objective.objectiveId, objective])
    );
    const referenceByObjective = new Map(
      reference.chapters.flatMap((chapter) =>
        chapter.modules.flatMap((module) =>
          module.blocks.map((block) => [block.objectiveId, block] as const)
        )
      )
    );
    const inspectedOpeningBlocks = [
      'workshop-curriculum-outline',
      'lab-debug-camperbots-profile-page',
      'lecture-understanding-html-attributes',
      'lab-debug-pet-adoption-page',
      'lecture-understanding-the-html-boilerplate',
      'workshop-cat-photo-app',
      'lab-recipe-page',
    ];

    expect(matrix.status).toBe('researching');
    expect(matrix.alignments).toHaveLength(158);
    expect(matrix.alignments.every((alignment) => alignment.state === 'candidate-review')).toBe(
      true
    );
    expect(matrix.courseExtensions.flatMap((extension) => extension.conceptIds)).toHaveLength(7);
    expect(matrix.conceptInventories.map((inventory) => inventory.conceptCount)).toEqual([79, 86]);
    expect(
      matrix.alignments.filter((alignment) => alignment.inspectionState === 'agent-inspected')
    ).toHaveLength(41);
    expect(
      matrix.alignments
        .filter((alignment) => inspectedOpeningBlocks.includes(alignment.sourceBlockSlug))
        .every(
          (alignment) =>
            alignment.inspectionState === 'agent-inspected' &&
            alignment.mappingBasis === 'block-specific-source'
        )
    ).toBe(true);
    expect(
      matrix.alignments
        .filter((alignment) => inspectedOpeningBlocks.includes(alignment.sourceBlockSlug))
        .reduce((total, alignment) => total + alignment.sourceChallengeCount, 0)
    ).toBe(61);
    const basicHtmlAlignments = matrix.alignments.filter(
      (alignment) => alignment.sourceModuleId === 'basic-html'
    );
    expect(basicHtmlAlignments).toHaveLength(23);
    expect(
      basicHtmlAlignments.reduce((total, alignment) => total + alignment.sourceChallengeCount, 0)
    ).toBe(137);
    expect(
      basicHtmlAlignments.every(
        (alignment) =>
          alignment.mappingBasis === 'block-specific-source' &&
          alignment.inspectionState === 'agent-inspected'
      )
    ).toBe(true);
    const semanticHtmlAlignments = matrix.alignments.filter(
      (alignment) => alignment.sourceModuleId === 'semantic-html'
    );
    expect(semanticHtmlAlignments).toHaveLength(10);
    expect(
      semanticHtmlAlignments.reduce((total, alignment) => total + alignment.sourceChallengeCount, 0)
    ).toBe(55);
    expect(
      semanticHtmlAlignments.every(
        (alignment) =>
          alignment.mappingBasis === 'block-specific-source' &&
          alignment.inspectionState === 'agent-inspected'
      )
    ).toBe(true);
    const expectedSemanticConcepts: Record<string, string[]> = {
      'lecture-importance-of-semantic-html': [
        'html-purpose-structure',
        'html-heading-hierarchy',
        'html-landmarks',
        'html-sectioning-articles',
        'html-native-accessibility-tree',
      ],
      'lecture-understanding-nuanced-semantic-elements': [
        'html-content-models',
        'html-document-language',
        'html-lists',
        'html-emphasis-importance',
      ],
      'workshop-major-browsers-list': [
        'html-nesting-tree',
        'html-content-models',
        'html-heading-hierarchy',
        'html-lists',
      ],
      'lecture-working-with-text-and-time-semantic-elements': [
        'html-quotations-citations',
        'html-abbreviations-expansions',
        'html-contact-address-links',
        'html-time-machine-values',
      ],
      'workshop-quincys-job-tips': [
        'html-nesting-tree',
        'html-content-models',
        'html-comments-character-references',
        'html-heading-hierarchy',
        'html-paragraphs-breaks',
        'html-quotations-citations',
        'html-landmarks',
        'html-sectioning-articles',
      ],
      'lecture-working-with-specialized-semantic-elements': [
        'html-subscript-superscript',
        'html-code-preformatted-text',
        'html-editorial-annotations',
        'html-ruby-annotations',
      ],
      'workshop-blog-page': [
        'html-nesting-tree',
        'html-content-models',
        'html-attribute-syntax',
        'html-link-purpose-fragments',
        'html-images-purpose-alt',
        'html-figures-captions',
        'html-heading-hierarchy',
        'html-paragraphs-breaks',
        'html-lists',
        'html-landmarks',
        'html-sectioning-articles',
        'html-contact-address-links',
      ],
      'lab-event-hub': [
        'html-nesting-tree',
        'html-content-models',
        'html-attribute-syntax',
        'html-link-purpose-fragments',
        'html-images-purpose-alt',
        'html-heading-hierarchy',
        'html-paragraphs-breaks',
        'html-lists',
        'html-landmarks',
        'html-sectioning-articles',
      ],
      'review-semantic-html': [
        'html-purpose-structure',
        'html-heading-hierarchy',
        'html-link-purpose-fragments',
        'html-figures-captions',
        'html-lists',
        'html-emphasis-importance',
        'html-quotations-citations',
        'html-abbreviations-expansions',
        'html-contact-address-links',
        'html-time-machine-values',
        'html-subscript-superscript',
        'html-code-preformatted-text',
        'html-editorial-annotations',
        'html-ruby-annotations',
        'html-landmarks',
        'html-sectioning-articles',
      ],
      'quiz-semantic-html': [
        'html-purpose-structure',
        'html-heading-hierarchy',
        'html-figures-captions',
        'html-lists',
        'html-emphasis-importance',
        'html-quotations-citations',
        'html-abbreviations-expansions',
        'html-contact-address-links',
        'html-time-machine-values',
        'html-subscript-superscript',
        'html-code-preformatted-text',
        'html-editorial-annotations',
        'html-ruby-annotations',
        'html-landmarks',
      ],
    };
    expect(
      Object.fromEntries(
        semanticHtmlAlignments.map((alignment) => [alignment.sourceBlockSlug, alignment.conceptIds])
      )
    ).toEqual(expectedSemanticConcepts);
    expect(
      semanticHtmlAlignments.find((alignment) => alignment.sourceBlockSlug === 'quiz-semantic-html')
        ?.sourceEvidence.quizQuestionCount
    ).toBe(60);
    const formsTablesAlignments = matrix.alignments.filter(
      (alignment) => alignment.sourceModuleId === 'html-forms-and-tables'
    );
    expect(formsTablesAlignments).toHaveLength(8);
    expect(
      formsTablesAlignments.reduce((total, alignment) => total + alignment.sourceChallengeCount, 0)
    ).toBe(53);
    expect(
      formsTablesAlignments.reduce(
        (total, alignment) => total + alignment.sourceEvidence.quizQuestionCount,
        0
      )
    ).toBe(61);
    expect(
      formsTablesAlignments.every(
        (alignment) =>
          alignment.mappingBasis === 'block-specific-source' &&
          alignment.inspectionState === 'agent-inspected'
      )
    ).toBe(true);
    expect(
      Object.fromEntries(
        formsTablesAlignments.map((alignment) => [alignment.sourceBlockSlug, alignment.conceptIds])
      )
    ).toEqual({
      'lecture-working-with-forms': [
        'html-form-submission-data',
        'html-form-labels-instructions',
        'html-input-types-autocomplete',
        'html-textarea-select-buttons',
        'html-form-control-states',
        'html-native-validation',
      ],
      'workshop-hotel-feedback-form': [
        'html-heading-hierarchy',
        'html-paragraphs-breaks',
        'html-landmarks',
        'html-form-submission-data',
        'html-form-labels-instructions',
        'html-input-types-autocomplete',
        'html-choice-groups',
        'html-textarea-select-buttons',
        'html-form-control-states',
        'html-native-validation',
      ],
      'lecture-working-with-tables': ['html-tables-purpose', 'html-table-structure'],
      'workshop-final-exams-table': [
        'html-tables-purpose',
        'html-table-structure',
        'html-table-cell-spans',
        'html-table-header-associations',
      ],
      'lab-book-catalog-table': [
        'html-tables-purpose',
        'html-table-structure',
        'html-table-cell-spans',
      ],
      'lecture-working-with-html-tools': [
        'html-tag-element-distinction',
        'html-nesting-tree',
        'html-parser-recovery',
        'html-links-destinations',
        'html-validation-inspection',
        'html-browser-request-parse-render',
      ],
      'review-html-tables-and-forms': [
        'html-form-submission-data',
        'html-form-labels-instructions',
        'html-input-types-autocomplete',
        'html-choice-groups',
        'html-textarea-select-buttons',
        'html-form-control-states',
        'html-native-validation',
        'html-table-structure',
        'html-table-cell-spans',
        'html-validation-inspection',
      ],
      'quiz-html-tables-and-forms': [
        'html-form-submission-data',
        'html-form-labels-instructions',
        'html-input-types-autocomplete',
        'html-choice-groups',
        'html-textarea-select-buttons',
        'html-form-control-states',
        'html-native-validation',
        'html-table-structure',
        'html-table-cell-spans',
        'html-validation-inspection',
      ],
    });
    expect(
      matrix.alignments.filter((alignment) => alignment.mappingBasis === 'module-fallback')
    ).toHaveLength(87);

    for (const alignment of matrix.alignments) {
      const source = sourceByObjective.get(alignment.objectiveId);
      const sourceEvidence = referenceByObjective.get(alignment.objectiveId);
      expect(source, alignment.objectiveId).toBeDefined();
      expect(sourceEvidence, alignment.objectiveId).toBeDefined();
      expect(alignment).toMatchObject({
        sourceModuleId: source?.sourceModuleId,
        sourceBlockSlug: source?.sourceBlockSlug,
        sourceActivityType: source?.sourceActivityType,
        sourceChallengeCount: source?.sourceChallengeCount,
      });
      expect(alignment.sourceEvidence.challengeIds).toEqual(
        sourceEvidence?.challengeOrder.map((challenge) => challenge.id)
      );
      expect(alignment.sourceEvidence.sourceFileSha256s).toEqual(
        sourceEvidence?.challengeOrder.map((challenge) => challenge.sourceEvidence.sha256)
      );
      expect(alignment.sourceEvidence.sourceBytes).toBe(
        sourceEvidence?.challengeOrder.reduce(
          (total, challenge) => total + challenge.sourceEvidence.bytes,
          0
        )
      );
      expect(alignment.sourceEvidence.hintCheckCount).toBe(
        sourceEvidence?.challengeOrder.reduce(
          (total, challenge) => total + challenge.sourceEvidence.hintCheckCount,
          0
        )
      );
      expect(alignment.sourceEvidence.quizQuestionCount).toBe(
        sourceEvidence?.challengeOrder.reduce(
          (total, challenge) => total + challenge.sourceEvidence.quizQuestionCount,
          0
        )
      );
    }

    expect(
      matrix.alignments.find(
        (alignment) => alignment.sourceBlockSlug === 'lab-debug-camperbots-profile-page'
      )?.conceptIds.length
    ).toBeLessThanOrEqual(6);
    expect(
      matrix.alignments.find(
        (alignment) => alignment.sourceBlockSlug === 'lab-debug-pet-adoption-page'
      )?.conceptIds.length
    ).toBeLessThanOrEqual(6);

    expect(matrix.conceptInventories.flatMap((inventory) => inventory.conceptIds)).toEqual(
      graphs.flatMap((graph) => graph.concepts.map((concept) => concept.id))
    );
    expect(matrix.gaps.length).toBeGreaterThan(0);
  });

  it('blocks expert-review claims on unresolved source-module fallbacks', () => {
    const matrix = readJson(
      path.join(
        repositoryRoot,
        'docs/research/courses/responsive-web-design-concept-alignment.json'
      )
    ) as {
      alignments: Array<{
        mappingBasis: string;
        inspectionState: string;
        state: string;
      }>;
    };
    const broken = structuredClone(matrix);
    const fallback = broken.alignments.find(
      (alignment) => alignment.mappingBasis === 'module-fallback'
    );
    expect(fallback).toBeDefined();
    if (!fallback) throw new Error('Expected at least one unresolved module fallback.');
    fallback.inspectionState = 'expert-reviewed';
    fallback.state = 'expert-reviewed';

    const result = ExternalObjectiveConceptAlignmentSchema.safeParse(broken);
    expect(result.success).toBe(false);
    expect(
      result.error?.issues.some((issue) =>
        issue.message.includes('claims review with unresolved source evidence')
      )
    ).toBe(true);
  });

  it('rejects treating one concept as benchmark evidence and a modern extension', () => {
    const matrix = readJson(
      path.join(
        repositoryRoot,
        'docs/research/courses/responsive-web-design-concept-alignment.json'
      )
    ) as {
      alignments: Array<{ conceptIds: string[] }>;
      courseExtensions: Array<{ conceptIds: string[] }>;
    };
    const broken = structuredClone(matrix);
    broken.courseExtensions[0].conceptIds.push(broken.alignments[0].conceptIds[0]);

    const result = ExternalObjectiveConceptAlignmentSchema.safeParse(broken);
    expect(result.success).toBe(false);
    expect(
      result.error?.issues.some((issue) => issue.message.includes('both benchmark coverage'))
    ).toBe(true);
  });

  it('turns the RWD research into a cumulative beginner-first course architecture', () => {
    const architecture = ResearchCourseArchitectureSchema.parse(
      readJson(
        path.join(
          repositoryRoot,
          'docs/research/courses/responsive-web-design-course-architecture.json'
        )
      )
    );
    const alignment = ExternalObjectiveConceptAlignmentSchema.parse(
      readJson(
        path.join(
          repositoryRoot,
          'docs/research/courses/responsive-web-design-concept-alignment.json'
        )
      )
    );
    const graphs = [
      ConceptResearchGraphSchema.parse(
        readJson(
          path.join(
            repositoryRoot,
            'docs/research/courses/responsive-web-design-html-concepts.json'
          )
        )
      ),
      ConceptResearchGraphSchema.parse(
        readJson(
          path.join(repositoryRoot, 'docs/research/courses/responsive-web-design-css-concepts.json')
        )
      ),
    ];
    const concepts = graphs.flatMap((graph) => graph.concepts);
    const moduleOrder = new Map(
      architecture.modules.map((module, index) => [module.id, index + 1])
    );
    const conceptOwner = new Map(
      architecture.modules.flatMap((module) =>
        module.conceptIds.map((conceptId) => [conceptId, module.id] as const)
      )
    );

    expect(architecture.status).toBe('researching');
    expect(architecture.modules).toHaveLength(17);
    expect(architecture.conceptIds).toHaveLength(165);
    expect(architecture.sourceObjectiveIds).toHaveLength(158);
    expect(architecture.projects).toHaveLength(5);
    expect(architecture.entryContract).toMatchObject({
      openingModuleId: 'html-first-page',
      firstMeaningfulEditByLearnerAction: 2,
      delayedToolingBarrierProhibited: true,
    });
    expect(architecture.moduleIds).not.toContain('computer-basics');
    expect(architecture.moduleIds.slice(0, 3)).toEqual([
      'html-first-page',
      'web-tooling-just-in-time',
      'html-documents-and-paths',
    ]);
    expect(architecture.conceptIds).toEqual(concepts.map((concept) => concept.id));
    expect(architecture.sourceObjectiveIds).toEqual(
      alignment.alignments.map((record) => record.objectiveId)
    );
    expect(
      architecture.modules.every((module) => module.currentState === 'planned-not-authored')
    ).toBe(true);
    expect(
      architecture.projects.every((project) => project.currentState === 'planned-not-authored')
    ).toBe(true);
    expect(new Set(architecture.projects.map((project) => project.scenarioDomain))).toHaveLength(5);
    expect(
      new Set(architecture.projects.flatMap((project) => project.sourceObjectiveIds))
    ).toHaveLength(5);

    for (const concept of concepts) {
      const owner = conceptOwner.get(concept.id);
      expect(owner, concept.id).toBeDefined();
      const ownerModule = architecture.modules.find((module) => module.id === owner);
      for (const prerequisiteId of concept.prerequisiteIds) {
        const prerequisiteOwner = conceptOwner.get(prerequisiteId);
        expect(prerequisiteOwner, prerequisiteId).toBeDefined();
        if (prerequisiteOwner !== owner) {
          expect(
            ownerModule?.prerequisiteModuleIds,
            `${concept.id} must inherit ${prerequisiteOwner}`
          ).toContain(prerequisiteOwner);
          expect(moduleOrder.get(prerequisiteOwner ?? '')).toBeLessThan(
            moduleOrder.get(owner ?? '') ?? 0
          );
        }
      }
    }
  });

  it('rejects a research architecture that assigns project work before instruction', () => {
    const architecture = readJson(
      path.join(
        repositoryRoot,
        'docs/research/courses/responsive-web-design-course-architecture.json'
      )
    ) as { projects: Array<{ conceptIds: string[] }> };
    const broken = structuredClone(architecture);
    broken.projects[0].conceptIds.push('css-independent-transfer-defense');

    const result = ResearchCourseArchitectureSchema.safeParse(broken);
    expect(result.success).toBe(false);
    expect(result.error?.issues.some((issue) => issue.message.includes('before instruction'))).toBe(
      true
    );
  });

  it('keeps generated RWD research outputs reproducible', () => {
    for (const script of [
      'scripts/generate-rwd-html-concept-research.mjs',
      'scripts/generate-rwd-css-concept-research.mjs',
      'scripts/generate-rwd-concept-alignment.mjs',
      'scripts/generate-rwd-research-architecture.mjs',
    ]) {
      expect(() =>
        execFileSync(process.execPath, [script, '--check'], {
          cwd: repositoryRoot,
          stdio: 'pipe',
        })
      ).not.toThrow();
    }
  });

  it('rejects a concept graph whose prerequisite appears later in the sequence', () => {
    const graph = readJson(
      path.join(repositoryRoot, 'docs/research/courses/responsive-web-design-html-concepts.json')
    ) as { concepts: Array<{ prerequisiteIds: string[] }> };
    const broken = structuredClone(graph);
    broken.concepts[0].prerequisiteIds = ['html-independent-transfer-defense'];

    const result = ConceptResearchGraphSchema.safeParse(broken);
    expect(result.success).toBe(false);
    expect(
      result.error?.issues.some((issue) => issue.message.includes('non-earlier prerequisite'))
    ).toBe(true);
  });

  it('rejects research claims that cite missing decisions', () => {
    const register = readJson(
      path.join(repositoryRoot, 'docs/research/platform-research-register.json')
    ) as Record<string, unknown>;
    const broken = structuredClone(register) as {
      sources: Array<{ claims: Array<{ decisionIds: string[] }> }>;
    };
    broken.sources[0].claims[0].decisionIds = ['missing-decision'];

    const result = PlatformResearchRegisterSchema.safeParse(broken);
    expect(result.success).toBe(false);
    expect(result.error?.issues.some((issue) => issue.message.includes('unknown decision'))).toBe(
      true
    );
  });

  it('allows honest in-progress dossiers but blocks unsupported approval', () => {
    expect(CourseResearchDossierSchema.safeParse(courseDossier()).success).toBe(true);

    const result = CourseResearchDossierSchema.safeParse(courseDossier('approved'));
    expect(result.success).toBe(false);
    expect(result.error?.issues.map((issue) => issue.message)).toEqual(
      expect.arrayContaining([
        'approved dossier requires objective coverage',
        'approved dossier cannot retain unresolved research questions',
        'Approved dossier requires all reviews complete',
      ])
    );
  });

  it('keeps every catalog blueprint in reopened audit state', () => {
    const blueprintFiles = readdirSync(path.join(repositoryRoot, 'blueprints')).filter((file) =>
      file.endsWith('.json')
    );
    expect(blueprintFiles).toHaveLength(54);

    for (const file of blueprintFiles) {
      const blueprint = CourseBlueprintSchema.parse(
        readJson(path.join(repositoryRoot, 'blueprints', file))
      );
      expect(blueprint.status, `${blueprint.id} must not claim research approval`).toBe(
        'audit-required'
      );
    }
  });

  it('keeps Responsive Web Design source traceability complete without claiming approval', () => {
    const blueprint = CourseBlueprintSchema.parse(
      readJson(path.join(repositoryRoot, 'blueprints/responsive-web-design.json'))
    );
    const audit = auditCourseResearch(blueprint);
    const codes = audit.findings.map((finding) => finding.code);

    expect(audit.blueprintStatus).toBe('audit-required');
    expect(codes).not.toContain('false-review-state');
    expect(codes).toEqual(['missing-dossier']);
  });
});
