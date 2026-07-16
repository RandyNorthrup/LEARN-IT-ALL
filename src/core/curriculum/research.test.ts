import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  ConceptResearchGraphSchema,
  CourseResearchDossierSchema,
  CourseResearchInventorySchema,
  ExternalCurriculumEvidenceSnapshotSchema,
  ExternalObjectiveConceptAlignmentSchema,
  PlatformResearchRegisterSchema,
  ResearchAuthoritySchema,
  ResearchCourseArchitectureSchema,
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
  it('distinguishes primary government evidence from government practice guidance', () => {
    expect(ResearchAuthoritySchema.parse('government-primary')).toBe('government-primary');
    expect(ResearchAuthoritySchema.parse('government-practice-guide')).toBe(
      'government-practice-guide'
    );
  });

  it('keeps the full rebuild scope in an honest research inventory', () => {
    const inventory = CourseResearchInventorySchema.parse(
      readJson(path.join(repositoryRoot, 'docs/research/course-inventory.json'))
    );

    expect(inventory.courses).toHaveLength(54);
    expect(inventory.courses.filter((course) => course.state === 'researching')).toEqual([
      {
        courseId: 'responsive-web-design',
        state: 'researching',
        dossierPath: 'docs/research/courses/responsive-web-design.json',
      },
    ]);
    expect(inventory.courses.filter((course) => course.state === 'pending')).toHaveLength(53);
    expect(inventory.courses.some((course) => course.state === 'approved')).toBe(false);
  });

  it('accepts the real platform research register with traceable sources and decisions', () => {
    const register = PlatformResearchRegisterSchema.parse(
      readJson(path.join(repositoryRoot, 'docs/research/platform-research-register.json'))
    );

    expect(register.questions).toHaveLength(11);
    expect(new Set(register.questions.map((question) => question.track))).toHaveLength(11);
    expect(register.sources.every((source) => source.claims[0].limitations.length > 0)).toBe(true);
    expect(register.sources.length).toBeGreaterThanOrEqual(20);
    expect(register.decisions.length).toBeGreaterThanOrEqual(15);
    expect(register.sources.find((source) => source.id === 'codemirror-six-docs')).toMatchObject({
      authority: 'official-docs',
      reviewedAt: '2026-07-15',
    });
    expect(
      register.decisions.find((decision) => decision.id === 'accessible-tablet-desktop-studio')
    ).toMatchObject({
      status: 'accepted',
      sourceIds: ['cast-udl-three', 'w3c-wcag-two-two', 'codemirror-six-docs'],
    });
    expect(JSON.stringify(register)).not.toMatch(/Monaco|native fallback/u);
    expect(
      register.sources.find((source) => source.id === 'typescript-seven-api-transition')
    ).toMatchObject({
      authority: 'official-docs',
      reviewedAt: '2026-07-15',
    });
    expect(
      register.decisions.find((decision) => decision.id === 'latest-compatible-tested-stack')
    ).toMatchObject({
      sourceIds: ['npm-stack-observation-2026-07-15', 'typescript-seven-api-transition'],
    });
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
    expect(graph.concepts).toHaveLength(83);
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
        'html-accessibility-user-barriers-tools',
        'html-accessible-name-description',
        'html-accessibility-tree-inclusion',
        'html-accessibility-evaluation-evidence',
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
      dossier.decisions.find((decision) => decision.id === 'rwd-accessibility-cumulative')
        ?.sourceIds
    ).toEqual(
      expect.arrayContaining([
        'rwd-wai-people-use-web',
        'rwd-wai-evaluation-tools',
        'rwd-wai-aria-one-two',
      ])
    );
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
    expect(graph.concepts).toHaveLength(101);
    expect(graph.moduleIds).toHaveLength(8);
    expect(conceptCounts).toMatchObject({
      'css-language-and-cascade': 16,
      'css-boxes-and-sizing': 13,
      'css-type-color-and-design': 23,
      'css-flexible-layout': 8,
      'css-grid-and-positioning': 11,
      'responsive-systems': 14,
      'css-interaction-accessibility-and-motion': 15,
      'css-independent-project': 1,
    });
    expect(
      graph.concepts.every((concept) => concept.currentState === 'researched-not-authored')
    ).toBe(true);
    expect(graph.sourceIds).toEqual(
      expect.arrayContaining([
        'rwd-css-syntax-three',
        'rwd-selectors-four',
        'rwd-css-cascade-five',
        'rwd-css-cascade-six',
        'rwd-css-display-three',
        'rwd-css-backgrounds-three',
        'rwd-css-values-four',
        'rwd-css-color-four',
        'rwd-css-color-five',
        'rwd-css-images-four',
        'rwd-mdn-progressive-enhancement',
        'rwd-css-color-adjust-one',
        'rwd-w3c-coga-usable',
        'rwd-govuk-pagination',
        'rwd-wai-multistep-forms',
        'rwd-sketch-developer-handoff',
      ])
    );
    expect(
      dossier.decisions.find((decision) => decision.id === 'rwd-css-spec-graph')
    ).toMatchObject({
      status: 'accepted',
      sourceIds: [
        'rwd-css-snapshot',
        'rwd-css-syntax-three',
        'rwd-selectors-four',
        'rwd-css-cascade-five',
        'rwd-css-cascade-six',
        'rwd-css-display-three',
        'rwd-css-backgrounds-three',
        'rwd-css-values-four',
      ],
    });
    expect(
      Object.fromEntries(
        [
          'css-rule-declaration-anatomy',
          'css-type-class-id-selectors',
          'css-inheritance-initial-unset-revert',
          'css-cascade-origins-importance-order',
          'css-specificity-functional-selectors',
          'css-outer-inner-display',
          'css-backgrounds-borders-shadows',
          'css-absolute-font-relative-viewport-units',
          'css-percentages-containing-blocks',
          'css-calculated-value-math',
        ].map((conceptId) => [
          conceptId,
          graph.concepts.find((concept) => concept.id === conceptId)?.sourceAnchors[0].sourceId,
        ])
      )
    ).toEqual({
      'css-rule-declaration-anatomy': 'rwd-css-syntax-three',
      'css-type-class-id-selectors': 'rwd-selectors-four',
      'css-inheritance-initial-unset-revert': 'rwd-css-cascade-five',
      'css-cascade-origins-importance-order': 'rwd-css-cascade-five',
      'css-specificity-functional-selectors': 'rwd-selectors-four',
      'css-outer-inner-display': 'rwd-css-display-three',
      'css-backgrounds-borders-shadows': 'rwd-css-backgrounds-three',
      'css-absolute-font-relative-viewport-units': 'rwd-css-values-four',
      'css-percentages-containing-blocks': 'rwd-css-values-four',
      'css-calculated-value-math': 'rwd-css-values-four',
    });
    expect(
      graph.concepts.find((concept) => concept.id === 'css-type-class-id-selectors')?.title
    ).toBe('Universal, type, class, and ID selectors');
    expect(graph.sourceIds.every((sourceId) => dossierSourceIds.has(sourceId))).toBe(true);
    expect(graph.gaps.length).toBeGreaterThan(0);
  });

  it('records the complete pinned Basic CSS inspection and its replacement constraints', () => {
    const content = readFileSync(
      path.join(
        repositoryRoot,
        'docs/research/courses/responsive-web-design-basic-css-inspection.md'
      ),
      'utf8'
    );

    expect(content).toContain('**122**');
    expect(content).toContain('**158**');
    expect(content).toContain('Specificity is not a decimal or four-position score');
    expect(content).toContain('fitting two inline-block columns through source-whitespace');
    expect(content).toContain('Source text or declaration presence is never sufficient evidence');
    expect(content).toContain('The remaining 21 source blocks');
    expect(content.length).toBeGreaterThan(10_000);
  });

  it('records and bounds the complete Design for Developers inspection', () => {
    const content = readFileSync(
      path.join(
        repositoryRoot,
        'docs/research/courses/responsive-web-design-design-for-developers-inspection.md'
      ),
      'utf8'
    );
    const graph = ConceptResearchGraphSchema.parse(
      readJson(
        path.join(repositoryRoot, 'docs/research/courses/responsive-web-design-css-concepts.json')
      )
    );
    const dossier = CourseResearchDossierSchema.parse(
      readJson(path.join(repositoryRoot, 'docs/research/courses/responsive-web-design.json'))
    );
    const designConceptIds = [
      'design-brief-handoff-artifacts',
      'design-progressive-enhancement',
      'design-hierarchical-wayfinding',
      'design-card-content-actions',
      'design-progressive-disclosure-registration',
      'design-long-collection-navigation',
      'design-modal-dialog-focus',
      'design-multistep-progress-recovery',
      'design-cart-review-correction',
    ];

    expect(content).toContain('**23**');
    expect(content).toContain('**103**');
    expect(content).toContain('“higher PPI is better”');
    expect(content).toContain('outside click is not a modal contract');
    expect(content).toContain('automatic infinite scroll');
    expect(content).toContain('Adobe XD is maintenance mode');
    expect(content).toContain('The complete 180-concept');
    expect(content.length).toBeGreaterThan(15_000);
    expect(
      designConceptIds.every((conceptId) =>
        graph.concepts.some((concept) => concept.id === conceptId)
      )
    ).toBe(true);
    expect(
      dossier.decisions.find((decision) => decision.id === 'rwd-resilient-design-patterns')
    ).toMatchObject({ status: 'accepted' });
    expect(
      dossier.decisions.find((decision) => decision.id === 'rwd-current-design-tool-capabilities')
    ).toMatchObject({
      status: 'accepted',
      sourceIds: [
        'rwd-sketch-developer-handoff',
        'rwd-penpot-dev-tools',
        'rwd-adobe-xd-status',
        'rwd-fcc-design-inspection',
      ],
    });
  });

  it('keeps all five Design for Developers source blocks exact and agent-inspected', () => {
    const matrix = ExternalObjectiveConceptAlignmentSchema.parse(
      readJson(
        path.join(
          repositoryRoot,
          'docs/research/courses/responsive-web-design-concept-alignment.json'
        )
      )
    );
    const designAlignments = matrix.alignments.filter(
      (alignment) => alignment.sourceModuleId === 'design-for-developers'
    );
    const sharedReviewConceptIds = [
      'design-user-needs-task-flows',
      'css-readable-measure-alignment',
      'css-contrast-noncolor-meaning',
      'css-visual-hierarchy-spacing',
      'responsive-fluid-media',
      'design-prototypes-evaluation-iteration',
      'css-design-tokens-theming',
      'design-brief-handoff-artifacts',
      'design-progressive-enhancement',
      'design-hierarchical-wayfinding',
      'design-card-content-actions',
      'design-progressive-disclosure-registration',
      'design-long-collection-navigation',
      'design-modal-dialog-focus',
      'design-multistep-progress-recovery',
      'design-cart-review-correction',
    ];

    expect(designAlignments).toHaveLength(5);
    expect(
      designAlignments.reduce((total, alignment) => total + alignment.sourceChallengeCount, 0)
    ).toBe(23);
    expect(
      designAlignments.reduce(
        (total, alignment) => total + alignment.sourceEvidence.quizQuestionCount,
        0
      )
    ).toBe(103);
    expect(
      designAlignments.every(
        (alignment) =>
          alignment.mappingBasis === 'block-specific-source' &&
          alignment.inspectionState === 'agent-inspected'
      )
    ).toBe(true);
    expect(
      Object.fromEntries(
        designAlignments.map((alignment) => [alignment.sourceBlockSlug, alignment.conceptIds])
      )
    ).toEqual({
      'lecture-user-interface-design-fundamentals': [
        'css-readable-measure-alignment',
        'css-contrast-noncolor-meaning',
        'css-visual-hierarchy-spacing',
        'responsive-fluid-media',
        'design-progressive-enhancement',
      ],
      'lecture-user-centered-design': [
        'design-user-needs-task-flows',
        'design-prototypes-evaluation-iteration',
        'css-design-tokens-theming',
        'design-hierarchical-wayfinding',
        'design-card-content-actions',
        'design-progressive-disclosure-registration',
        'design-long-collection-navigation',
        'design-modal-dialog-focus',
        'design-multistep-progress-recovery',
        'design-cart-review-correction',
      ],
      'lecture-common-design-tools': [
        'design-user-needs-task-flows',
        'design-prototypes-evaluation-iteration',
        'design-brief-handoff-artifacts',
      ],
      'review-design-fundamentals': sharedReviewConceptIds,
      'quiz-design-fundamentals': sharedReviewConceptIds,
    });
  });

  it('records and bounds the complete Absolute and Relative Units inspection', () => {
    const content = readFileSync(
      path.join(
        repositoryRoot,
        'docs/research/courses/responsive-web-design-absolute-relative-units-inspection.md'
      ),
      'utf8'
    );
    const graph = ConceptResearchGraphSchema.parse(
      readJson(
        path.join(repositoryRoot, 'docs/research/courses/responsive-web-design-css-concepts.json')
      )
    );
    const dossier = CourseResearchDossierSchema.parse(
      readJson(path.join(repositoryRoot, 'docs/research/courses/responsive-web-design.json'))
    );

    expect(content).toContain('four blocks, eight challenges, 35 question prompts');
    expect(content).toContain('default `v*` viewport units use the large viewport');
    expect(content).toContain('`calc(100% - 0)` was not accepted');
    expect(content).toContain('Merely writing a requested unit');
    expect(content).toContain('The complete 180-concept');
    expect(content).toContain('The remaining 21 source blocks');
    expect(content.length).toBeGreaterThan(15_000);
    expect(graph.concepts.map((concept) => concept.id)).toContain('css-calculated-value-math');
    expect(
      dossier.decisions.find((decision) => decision.id === 'rwd-length-reference-frame-evidence')
    ).toMatchObject({
      status: 'accepted',
      sourceIds: ['rwd-css-values-four', 'rwd-wcag-two-two', 'rwd-fcc-units-inspection'],
    });
  });

  it('keeps all four Absolute and Relative Units source blocks exact and agent-inspected', () => {
    const matrix = ExternalObjectiveConceptAlignmentSchema.parse(
      readJson(
        path.join(
          repositoryRoot,
          'docs/research/courses/responsive-web-design-concept-alignment.json'
        )
      )
    );
    const unitAlignments = matrix.alignments.filter(
      (alignment) => alignment.sourceModuleId === 'absolute-and-relative-units'
    );

    expect(unitAlignments).toHaveLength(4);
    expect(
      unitAlignments.reduce((total, alignment) => total + alignment.sourceChallengeCount, 0)
    ).toBe(8);
    expect(
      unitAlignments.reduce(
        (total, alignment) => total + alignment.sourceEvidence.quizQuestionCount,
        0
      )
    ).toBe(35);
    expect(
      unitAlignments.reduce(
        (total, alignment) => total + alignment.sourceEvidence.hintCheckCount,
        0
      )
    ).toBe(17);
    expect(
      unitAlignments.every(
        (alignment) =>
          alignment.mappingBasis === 'block-specific-source' &&
          alignment.inspectionState === 'agent-inspected'
      )
    ).toBe(true);
    expect(
      Object.fromEntries(
        unitAlignments.map((alignment) => [alignment.sourceBlockSlug, alignment.conceptIds])
      )
    ).toEqual({
      'lecture-working-with-relative-and-absolute-units': [
        'css-absolute-font-relative-viewport-units',
        'css-percentages-containing-blocks',
        'css-calculated-value-math',
      ],
      'lab-event-flyer-page': [
        'html-heading-hierarchy',
        'html-landmarks',
        'html-sectioning-articles',
        'css-box-model-areas',
        'css-absolute-font-relative-viewport-units',
        'css-percentages-containing-blocks',
        'css-calculated-value-math',
      ],
      'review-css-relative-and-absolute-units': [
        'css-absolute-font-relative-viewport-units',
        'css-percentages-containing-blocks',
        'css-calculated-value-math',
      ],
      'quiz-css-relative-and-absolute-units': [
        'css-intrinsic-extrinsic-sizing',
        'css-absolute-font-relative-viewport-units',
        'css-percentages-containing-blocks',
        'css-calculated-value-math',
      ],
    });
  });

  it('records and bounds the complete Pseudo-classes and Pseudo-elements inspection', () => {
    const content = readFileSync(
      path.join(
        repositoryRoot,
        'docs/research/courses/responsive-web-design-pseudo-classes-elements-inspection.md'
      ),
      'utf8'
    );
    const dossier = CourseResearchDossierSchema.parse(
      readJson(path.join(repositoryRoot, 'docs/research/courses/responsive-web-design.json'))
    );

    expect(content).toContain('six blocks, 74 challenges, 61 question prompts');
    expect(content).toContain('`:local-link` appears only in historical change notes');
    expect(content).toContain('`:has()` is relational, not merely a “parent selector”');
    expect(content).toContain('Keyword or selector presence alone cannot pass');
    expect(content).toContain('The remaining 21 blocks');
    expect(content.length).toBeGreaterThan(20_000);
    expect(
      dossier.sources.find((source) => source.id === 'rwd-fcc-pseudo-inspection')
    ).toMatchObject({
      authority: 'direct-observation',
      reviewedAt: '2026-07-15',
      questionIds: ['rwd-current-scope-depth', 'rwd-workspace-assessment'],
    });
  });

  it('keeps all six Pseudo-classes and Pseudo-elements blocks exact and agent-inspected', () => {
    const matrix = ExternalObjectiveConceptAlignmentSchema.parse(
      readJson(
        path.join(
          repositoryRoot,
          'docs/research/courses/responsive-web-design-concept-alignment.json'
        )
      )
    );
    const pseudoAlignments = matrix.alignments.filter(
      (alignment) => alignment.sourceModuleId === 'pseudo-classes-and-elements'
    );

    expect(pseudoAlignments).toHaveLength(6);
    expect(
      pseudoAlignments.reduce((total, alignment) => total + alignment.sourceChallengeCount, 0)
    ).toBe(74);
    expect(
      pseudoAlignments.reduce(
        (total, alignment) => total + alignment.sourceEvidence.quizQuestionCount,
        0
      )
    ).toBe(61);
    expect(
      pseudoAlignments.reduce(
        (total, alignment) => total + alignment.sourceEvidence.hintCheckCount,
        0
      )
    ).toBe(270);
    expect(
      pseudoAlignments.every(
        (alignment) =>
          alignment.mappingBasis === 'block-specific-source' &&
          alignment.inspectionState === 'agent-inspected'
      )
    ).toBe(true);
    expect(
      Object.fromEntries(
        pseudoAlignments.map((alignment) => [alignment.sourceBlockSlug, alignment.conceptIds])
      )
    ).toEqual({
      'lecture-working-with-pseudo-classes-and-pseudo-elements-in-css': [
        'css-selector-lists-combinators',
        'css-attribute-selectors',
        'css-pseudo-classes',
        'css-pseudo-elements',
        'css-specificity-functional-selectors',
        'css-link-state-sequence',
        'css-form-control-states',
        'css-focus-visible-indicators',
      ],
      'workshop-greeting-card': [
        'html-heading-hierarchy',
        'html-paragraphs-breaks',
        'html-links-destinations',
        'html-sectioning-articles',
        'css-application-and-loading',
        'css-type-class-id-selectors',
        'css-selector-lists-combinators',
        'css-pseudo-classes',
        'css-pseudo-elements',
        'css-outer-inner-display',
        'css-box-model-areas',
        'css-intrinsic-extrinsic-sizing',
        'css-backgrounds-borders-shadows',
        'css-font-stacks-generic-fallbacks',
        'css-type-scale-line-height',
        'css-link-state-sequence',
        'css-transform-reference-boxes',
        'css-flex-container-items-axes',
        'css-flex-alignment-distribution',
        'css-focus-visible-indicators',
        'css-transitions-state-change',
      ],
      'workshop-parent-teacher-conference-form': [
        'html-heading-hierarchy',
        'html-landmarks',
        'html-paragraphs-breaks',
        'html-form-submission-data',
        'html-form-labels-instructions',
        'html-input-types-autocomplete',
        'html-choice-groups',
        'html-textarea-select-buttons',
        'html-form-control-states',
        'html-native-validation',
        'css-application-and-loading',
        'css-type-class-id-selectors',
        'css-selector-lists-combinators',
        'css-pseudo-classes',
        'css-pseudo-elements',
        'css-specificity-functional-selectors',
        'css-outer-inner-display',
        'css-box-model-areas',
        'css-intrinsic-extrinsic-sizing',
        'css-percentages-containing-blocks',
        'css-backgrounds-borders-shadows',
        'css-type-scale-line-height',
        'css-color-spaces-alpha',
        'css-form-control-states',
        'css-transform-reference-boxes',
        'css-transitions-state-change',
      ],
      'lab-job-application-form': [
        'html-form-submission-data',
        'html-form-labels-instructions',
        'html-input-types-autocomplete',
        'html-choice-groups',
        'html-textarea-select-buttons',
        'html-form-control-states',
        'html-native-validation',
        'html-form-errors-recovery',
        'css-application-and-loading',
        'css-selector-lists-combinators',
        'css-attribute-selectors',
        'css-pseudo-classes',
        'css-box-model-areas',
        'css-backgrounds-borders-shadows',
        'css-contrast-noncolor-meaning',
        'css-form-control-states',
        'css-focus-visible-indicators',
      ],
      'review-css-pseudo-classes': [
        'css-selector-lists-combinators',
        'css-pseudo-classes',
        'css-pseudo-elements',
        'css-specificity-functional-selectors',
        'css-link-state-sequence',
        'css-form-control-states',
        'css-focus-visible-indicators',
      ],
      'quiz-css-pseudo-classes': [
        'css-selector-lists-combinators',
        'css-pseudo-classes',
        'css-pseudo-elements',
        'css-specificity-functional-selectors',
        'css-link-state-sequence',
        'css-form-control-states',
        'css-focus-visible-indicators',
      ],
    });
  });

  it('records and bounds the complete CSS Colors inspection', () => {
    const content = readFileSync(
      path.join(
        repositoryRoot,
        'docs/research/courses/responsive-web-design-css-colors-inspection.md'
      ),
      'utf8'
    );
    const dossier = CourseResearchDossierSchema.parse(
      readJson(path.join(repositoryRoot, 'docs/research/courses/responsive-web-design.json'))
    );
    const graph = ConceptResearchGraphSchema.parse(
      readJson(
        path.join(repositoryRoot, 'docs/research/courses/responsive-web-design-css-concepts.json')
      )
    );

    expect(content).toContain('five blocks, 98 challenges, 58 question prompts');
    expect(content).toContain('creates a CSS generated image value and no DOM element');
    expect(content).toContain('Class order in an HTML `class` attribute does not decide');
    expect(content).toContain('remaining 21 source blocks');
    expect(content).toContain('Keyword presence, a notation-matching regular expression');
    expect(content.length).toBeGreaterThan(20_000);
    expect(graph.concepts.map((concept) => concept.id)).toContain('css-derived-color-functions');
    expect(
      dossier.sources.find((source) => source.id === 'rwd-fcc-colors-inspection')
    ).toMatchObject({
      authority: 'direct-observation',
      reviewedAt: '2026-07-15',
      questionIds: ['rwd-current-scope-depth', 'rwd-workspace-assessment'],
    });
    expect(
      dossier.decisions.find((decision) => decision.id === 'rwd-current-color-evidence')
    ).toMatchObject({
      status: 'accepted',
      sourceIds: [
        'rwd-css-color-four',
        'rwd-css-color-five',
        'rwd-css-images-four',
        'rwd-css-color-adjust-one',
        'rwd-wcag-two-two',
        'rwd-fcc-colors-inspection',
      ],
    });
  });

  it('keeps all five CSS Colors blocks exact and agent-inspected', () => {
    const matrix = ExternalObjectiveConceptAlignmentSchema.parse(
      readJson(
        path.join(
          repositoryRoot,
          'docs/research/courses/responsive-web-design-concept-alignment.json'
        )
      )
    );
    const colorAlignments = matrix.alignments.filter(
      (alignment) => alignment.sourceModuleId === 'css-colors'
    );

    expect(colorAlignments).toHaveLength(5);
    expect(
      colorAlignments.reduce((total, alignment) => total + alignment.sourceChallengeCount, 0)
    ).toBe(98);
    expect(
      colorAlignments.reduce(
        (total, alignment) => total + alignment.sourceEvidence.quizQuestionCount,
        0
      )
    ).toBe(58);
    expect(
      colorAlignments.reduce(
        (total, alignment) => total + alignment.sourceEvidence.hintCheckCount,
        0
      )
    ).toBe(173);
    expect(
      colorAlignments.every(
        (alignment) =>
          alignment.mappingBasis === 'block-specific-source' &&
          alignment.inspectionState === 'agent-inspected'
      )
    ).toBe(true);
    expect(
      Object.fromEntries(
        colorAlignments.map((alignment) => [alignment.sourceBlockSlug, alignment.conceptIds])
      )
    ).toEqual({
      'lecture-working-with-colors-in-css': [
        'css-color-spaces-alpha',
        'css-contrast-noncolor-meaning',
        'css-gradients-background-images',
        'css-backgrounds-borders-shadows',
      ],
      'workshop-colored-markers': [
        'html-heading-hierarchy',
        'css-application-and-loading',
        'css-rule-declaration-anatomy',
        'css-type-class-id-selectors',
        'css-outer-inner-display',
        'css-box-model-areas',
        'css-intrinsic-extrinsic-sizing',
        'css-backgrounds-borders-shadows',
        'css-color-spaces-alpha',
        'css-gradients-background-images',
      ],
      'lab-colored-boxes': [
        'css-application-and-loading',
        'css-type-class-id-selectors',
        'css-intrinsic-extrinsic-sizing',
        'css-color-spaces-alpha',
      ],
      'review-css-colors': [
        'css-color-spaces-alpha',
        'css-gradients-background-images',
        'css-backgrounds-borders-shadows',
      ],
      'quiz-css-colors': ['css-color-spaces-alpha', 'css-gradients-background-images'],
    });
  });

  it('records the complete Styling Forms inspection and native-controls-first decision', () => {
    const content = readFileSync(
      path.join(
        repositoryRoot,
        'docs/research/courses/responsive-web-design-styling-forms-inspection.md'
      ),
      'utf8'
    );
    const dossier = CourseResearchDossierSchema.parse(
      readJson(path.join(repositoryRoot, 'docs/research/courses/responsive-web-design.json'))
    );
    const graph = ConceptResearchGraphSchema.parse(
      readJson(
        path.join(repositoryRoot, 'docs/research/courses/responsive-web-design-css-concepts.json')
      )
    );

    expect(content).toContain('seven blocks, 84 challenges, 19 question prompts');
    expect(content).toContain("The benchmark's claim that `required` does not work");
    expect(content).toContain('This is direct instructional duplication');
    expect(content).toContain('remaining 21 source blocks');
    expect(content).toContain('`appearance: none` suppresses the native appearance');
    expect(content.length).toBeGreaterThan(20_000);
    expect(graph.sourceIds).toContain('rwd-css-ui-four');
    expect(
      graph.concepts.find((concept) => concept.id === 'css-form-control-states')
    ).toMatchObject({
      sourceAnchors: [{ sourceId: 'rwd-css-ui-four' }],
    });
    expect(
      dossier.sources.find((source) => source.id === 'rwd-fcc-styling-forms-inspection')
    ).toMatchObject({
      authority: 'direct-observation',
      reviewedAt: '2026-07-15',
      questionIds: ['rwd-current-scope-depth', 'rwd-workspace-assessment'],
    });
    expect(dossier.sources.find((source) => source.id === 'rwd-css-forms-one')).toMatchObject({
      authority: 'standard',
      reviewedAt: '2026-07-15',
    });
    expect(
      dossier.decisions.find((decision) => decision.id === 'rwd-native-form-controls-first')
    ).toMatchObject({
      status: 'accepted',
      sourceIds: [
        'rwd-whatwg-html',
        'rwd-css-ui-four',
        'rwd-css-forms-one',
        'rwd-wcag-two-two',
        'rwd-fcc-styling-forms-inspection',
      ],
    });
  });

  it('keeps all seven Styling Forms blocks exact and agent-inspected', () => {
    const matrix = ExternalObjectiveConceptAlignmentSchema.parse(
      readJson(
        path.join(
          repositoryRoot,
          'docs/research/courses/responsive-web-design-concept-alignment.json'
        )
      )
    );
    const formAlignments = matrix.alignments.filter(
      (alignment) => alignment.sourceModuleId === 'styling-forms'
    );

    expect(formAlignments).toHaveLength(7);
    expect(
      formAlignments.reduce((total, alignment) => total + alignment.sourceChallengeCount, 0)
    ).toBe(84);
    expect(
      formAlignments.reduce(
        (total, alignment) => total + alignment.sourceEvidence.quizQuestionCount,
        0
      )
    ).toBe(19);
    expect(
      formAlignments.reduce(
        (total, alignment) => total + alignment.sourceEvidence.hintCheckCount,
        0
      )
    ).toBe(337);
    expect(
      formAlignments.every(
        (alignment) =>
          alignment.mappingBasis === 'block-specific-source' &&
          alignment.inspectionState === 'agent-inspected'
      )
    ).toBe(true);
    expect(
      Object.fromEntries(
        formAlignments.map((alignment) => [alignment.sourceBlockSlug, alignment.conceptIds])
      )
    ).toEqual({
      'lecture-best-practices-for-styling-forms': [
        'css-form-control-states',
        'css-box-sizing-models',
        'css-type-scale-line-height',
        'css-pseudo-classes',
        'css-focus-visible-indicators',
        'css-target-size-spacing',
      ],
      'workshop-registration-form': [
        'html-heading-hierarchy',
        'html-paragraphs-breaks',
        'html-form-submission-data',
        'html-form-labels-instructions',
        'html-input-types-autocomplete',
        'html-choice-groups',
        'html-textarea-select-buttons',
        'html-form-control-states',
        'html-native-validation',
        'css-application-and-loading',
        'css-type-class-id-selectors',
        'css-selector-lists-combinators',
        'css-attribute-selectors',
        'css-pseudo-classes',
        'css-outer-inner-display',
        'css-box-model-areas',
        'css-box-sizing-models',
        'css-intrinsic-extrinsic-sizing',
        'css-absolute-font-relative-viewport-units',
        'css-percentages-containing-blocks',
        'css-backgrounds-borders-shadows',
        'css-font-stacks-generic-fallbacks',
        'css-type-scale-line-height',
        'css-color-spaces-alpha',
        'css-form-control-states',
      ],
      'lab-contact-form': [
        'html-heading-hierarchy',
        'html-form-labels-instructions',
        'html-input-types-autocomplete',
        'html-textarea-select-buttons',
        'html-native-validation',
        'css-application-and-loading',
        'css-type-class-id-selectors',
        'css-pseudo-classes',
        'css-box-model-areas',
        'css-intrinsic-extrinsic-sizing',
        'css-backgrounds-borders-shadows',
        'css-font-stacks-generic-fallbacks',
        'css-type-scale-line-height',
        'css-color-spaces-alpha',
        'css-form-control-states',
      ],
      'workshop-game-settings-panel': [
        'html-heading-hierarchy',
        'html-form-labels-instructions',
        'html-input-types-autocomplete',
        'html-choice-groups',
        'html-form-control-states',
        'css-application-and-loading',
        'css-type-class-id-selectors',
        'css-attribute-selectors',
        'css-pseudo-classes',
        'css-pseudo-elements',
        'css-box-model-areas',
        'css-intrinsic-extrinsic-sizing',
        'css-backgrounds-borders-shadows',
        'css-color-spaces-alpha',
        'css-form-control-states',
        'css-transitions-state-change',
      ],
      'lab-feature-selection': [
        'html-form-labels-instructions',
        'html-input-types-autocomplete',
        'html-choice-groups',
        'html-form-control-states',
        'css-application-and-loading',
        'css-type-class-id-selectors',
        'css-attribute-selectors',
        'css-pseudo-classes',
        'css-pseudo-elements',
        'css-box-model-areas',
        'css-intrinsic-extrinsic-sizing',
        'css-backgrounds-borders-shadows',
        'css-color-spaces-alpha',
        'css-form-control-states',
      ],
      'review-styling-forms': [
        'css-form-control-states',
        'css-box-sizing-models',
        'css-type-scale-line-height',
        'css-pseudo-classes',
        'css-pseudo-elements',
        'css-focus-visible-indicators',
        'css-target-size-spacing',
      ],
      'quiz-styling-forms': [
        'css-form-control-states',
        'css-type-scale-line-height',
        'css-pseudo-classes',
        'css-pseudo-elements',
        'css-focus-visible-indicators',
      ],
    });
  });

  it('records the complete CSS Layouts and Effects inspection and data-safety decision', () => {
    const content = readFileSync(
      path.join(
        repositoryRoot,
        'docs/research/courses/responsive-web-design-layout-effects-inspection.md'
      ),
      'utf8'
    );
    const dossier = CourseResearchDossierSchema.parse(
      readJson(path.join(repositoryRoot, 'docs/research/courses/responsive-web-design.json'))
    );
    const graph = ConceptResearchGraphSchema.parse(
      readJson(
        path.join(repositoryRoot, 'docs/research/courses/responsive-web-design-css-concepts.json')
      )
    );

    expect(content).toContain('five blocks, 54 challenges, 61 question prompts');
    expect(content).toContain('A blurred secret is exposed data, not redaction');
    expect(content).toContain('false for mixed or all-negative margins');
    expect(content).toContain('`hidden` and `clip` are absent as distinct behavior models');
    expect(content).toContain('remaining 21 source blocks');
    expect(content.length).toBeGreaterThan(20_000);
    expect(graph.sourceIds).toEqual(
      expect.arrayContaining([
        'rwd-css-box-four',
        'rwd-css-sizing-three',
        'rwd-css-two-two',
        'rwd-css-overflow-three',
        'rwd-css-transforms-one',
        'rwd-filter-effects-one',
      ])
    );
    expect(
      graph.concepts.find((concept) => concept.id === 'css-filter-effects-fallbacks')
    ).toMatchObject({
      sourceAnchors: [{ sourceId: 'rwd-filter-effects-one' }],
    });
    expect(
      dossier.sources.find((source) => source.id === 'rwd-fcc-layout-effects-inspection')
    ).toMatchObject({
      authority: 'direct-observation',
      reviewedAt: '2026-07-15',
      questionIds: ['rwd-current-scope-depth', 'rwd-workspace-assessment'],
    });
    expect(
      dossier.decisions.find((decision) => decision.id === 'rwd-box-rendering-effects-evidence')
    ).toMatchObject({
      status: 'accepted',
      sourceIds: [
        'rwd-css-box-four',
        'rwd-css-sizing-three',
        'rwd-css-two-two',
        'rwd-css-overflow-three',
        'rwd-css-transforms-one',
        'rwd-filter-effects-one',
        'rwd-css-backgrounds-three',
        'rwd-wcag-two-two',
        'rwd-fcc-layout-effects-inspection',
      ],
    });
  });

  it('keeps all five CSS Layouts and Effects blocks exact and agent-inspected', () => {
    const matrix = ExternalObjectiveConceptAlignmentSchema.parse(
      readJson(
        path.join(
          repositoryRoot,
          'docs/research/courses/responsive-web-design-concept-alignment.json'
        )
      )
    );
    const effectAlignments = matrix.alignments.filter(
      (alignment) => alignment.sourceModuleId === 'css-box-model'
    );

    expect(effectAlignments).toHaveLength(5);
    expect(
      effectAlignments.reduce((total, alignment) => total + alignment.sourceChallengeCount, 0)
    ).toBe(54);
    expect(
      effectAlignments.reduce(
        (total, alignment) => total + alignment.sourceEvidence.quizQuestionCount,
        0
      )
    ).toBe(61);
    expect(
      effectAlignments.reduce(
        (total, alignment) => total + alignment.sourceEvidence.hintCheckCount,
        0
      )
    ).toBe(125);
    expect(
      effectAlignments.every(
        (alignment) =>
          alignment.mappingBasis === 'block-specific-source' &&
          alignment.inspectionState === 'agent-inspected'
      )
    ).toBe(true);
    expect(
      Object.fromEntries(
        effectAlignments.map((alignment) => [alignment.sourceBlockSlug, alignment.conceptIds])
      )
    ).toEqual({
      'lecture-working-with-css-transforms-overflow-and-filters': [
        'css-cascade-layers-scope',
        'css-box-model-areas',
        'css-box-sizing-models',
        'css-margin-collapse-formatting-contexts',
        'css-overflow-containment-scroll',
        'css-backgrounds-borders-shadows',
        'css-transform-reference-boxes',
        'css-filter-effects-fallbacks',
      ],
      'workshop-rothko-painting': [
        'css-application-and-loading',
        'css-type-class-id-selectors',
        'css-selector-lists-combinators',
        'css-outer-inner-display',
        'css-box-model-areas',
        'css-margin-collapse-formatting-contexts',
        'css-intrinsic-extrinsic-sizing',
        'css-percentages-containing-blocks',
        'css-overflow-containment-scroll',
        'css-backgrounds-borders-shadows',
        'css-color-spaces-alpha',
        'css-filter-effects-fallbacks',
        'css-transform-reference-boxes',
      ],
      'lab-confidential-email-page': [
        'html-landmarks',
        'html-paragraphs-breaks',
        'css-application-and-loading',
        'css-type-class-id-selectors',
        'css-outer-inner-display',
        'css-box-model-areas',
        'css-box-sizing-models',
        'css-intrinsic-extrinsic-sizing',
        'css-backgrounds-borders-shadows',
        'css-transform-reference-boxes',
        'css-filter-effects-fallbacks',
      ],
      'review-css-layout-and-effects': [
        'css-cascade-layers-scope',
        'css-box-model-areas',
        'css-box-sizing-models',
        'css-margin-collapse-formatting-contexts',
        'css-overflow-containment-scroll',
        'css-transform-reference-boxes',
        'css-filter-effects-fallbacks',
      ],
      'quiz-css-layout-and-effects': [
        'css-cascade-layers-scope',
        'css-box-model-areas',
        'css-box-sizing-models',
        'css-margin-collapse-formatting-contexts',
        'css-overflow-containment-scroll',
        'css-transform-reference-boxes',
        'css-filter-effects-fallbacks',
      ],
    });
  });

  it('records the complete Flexbox inspection and constraint-evidence decision', () => {
    const content = readFileSync(
      path.join(
        repositoryRoot,
        'docs/research/courses/responsive-web-design-flexbox-inspection.md'
      ),
      'utf8'
    );
    const dossier = CourseResearchDossierSchema.parse(
      readJson(path.join(repositoryRoot, 'docs/research/courses/responsive-web-design.json'))
    );
    const graph = ConceptResearchGraphSchema.parse(
      readJson(
        path.join(repositoryRoot, 'docs/research/courses/responsive-web-design-css-concepts.json')
      )
    );

    expect(content).toContain('seven pinned source blocks');
    expect(content).toContain('high action count with low decision density');
    expect(content).toContain('The pricing lab is the sharpest defect');
    expect(content).toContain('46 total source blocks still require challenge-level inspection');
    expect(content.length).toBeGreaterThan(25_000);
    expect(graph.sourceIds).toEqual(
      expect.arrayContaining(['rwd-css-flexbox-one', 'rwd-css-align-three'])
    );
    expect(
      graph.concepts.find((concept) => concept.id === 'css-flex-basis-grow-shrink')
    ).toMatchObject({
      sourceAnchors: [{ sourceId: 'rwd-css-flexbox-one' }],
    });
    expect(
      graph.concepts.find((concept) => concept.id === 'css-flex-alignment-distribution')
    ).toMatchObject({
      sourceAnchors: [{ sourceId: 'rwd-css-align-three' }],
    });
    expect(
      dossier.sources.find((source) => source.id === 'rwd-fcc-flexbox-inspection')
    ).toMatchObject({
      authority: 'direct-observation',
      reviewedAt: '2026-07-15',
      questionIds: ['rwd-current-scope-depth', 'rwd-workspace-assessment'],
    });
    expect(
      dossier.decisions.find((decision) => decision.id === 'rwd-flex-layout-evidence')
    ).toMatchObject({
      status: 'accepted',
      sourceIds: [
        'rwd-css-flexbox-one',
        'rwd-css-align-three',
        'rwd-css-sizing-three',
        'rwd-wcag-two-two',
        'rwd-fcc-flexbox-inspection',
      ],
    });
  });

  it('keeps all seven Flexbox and playing-cards blocks exact and agent-inspected', () => {
    const matrix = ExternalObjectiveConceptAlignmentSchema.parse(
      readJson(
        path.join(
          repositoryRoot,
          'docs/research/courses/responsive-web-design-concept-alignment.json'
        )
      )
    );
    const flexAlignments = matrix.alignments.filter(
      (alignment) =>
        alignment.sourceModuleId === 'css-flexbox' ||
        alignment.sourceModuleId === 'lab-page-of-playing-cards'
    );

    expect(flexAlignments).toHaveLength(7);
    expect(
      flexAlignments.reduce((total, alignment) => total + alignment.sourceChallengeCount, 0)
    ).toBe(71);
    expect(
      flexAlignments.reduce(
        (total, alignment) => total + alignment.sourceEvidence.quizQuestionCount,
        0
      )
    ).toBe(46);
    expect(
      flexAlignments.reduce(
        (total, alignment) => total + alignment.sourceEvidence.hintCheckCount,
        0
      )
    ).toBe(194);
    expect(
      flexAlignments.every(
        (alignment) =>
          alignment.mappingBasis === 'block-specific-source' &&
          alignment.inspectionState === 'agent-inspected'
      )
    ).toBe(true);
    expect(
      Object.fromEntries(
        flexAlignments.map((alignment) => [alignment.sourceBlockSlug, alignment.conceptIds])
      )
    ).toEqual({
      'lecture-working-with-css-flexbox': [
        'css-normal-flow',
        'css-flex-container-items-axes',
        'css-flex-direction-wrap-lines',
        'css-flex-alignment-distribution',
        'css-flex-order-accessibility',
      ],
      'workshop-flexbox-photo-gallery': [
        'html-images-purpose-alt',
        'html-replaced-content-boundaries',
        'css-application-and-loading',
        'css-type-class-id-selectors',
        'css-pseudo-elements',
        'css-box-model-areas',
        'css-box-sizing-models',
        'css-intrinsic-extrinsic-sizing',
        'css-percentages-containing-blocks',
        'css-backgrounds-borders-shadows',
        'css-flex-container-items-axes',
        'css-flex-direction-wrap-lines',
        'css-flex-alignment-distribution',
        'css-flex-gap-spacing',
      ],
      'workshop-colorful-boxes': [
        'css-application-and-loading',
        'css-type-class-id-selectors',
        'css-box-model-areas',
        'css-intrinsic-extrinsic-sizing',
        'css-type-scale-line-height',
        'css-color-spaces-alpha',
        'css-flex-container-items-axes',
        'css-flex-direction-wrap-lines',
        'css-flex-basis-grow-shrink',
        'css-flex-alignment-distribution',
        'css-flex-order-accessibility',
      ],
      'lab-pricing-plans-layout': [
        'html-heading-hierarchy',
        'css-application-and-loading',
        'css-type-class-id-selectors',
        'css-box-model-areas',
        'css-flex-container-items-axes',
        'css-flex-direction-wrap-lines',
        'css-flex-basis-grow-shrink',
        'css-flex-alignment-distribution',
        'css-flex-order-accessibility',
        'css-flex-component-transfer',
      ],
      'review-css-flexbox': [
        'css-flex-container-items-axes',
        'css-flex-direction-wrap-lines',
        'css-flex-alignment-distribution',
        'css-flex-gap-spacing',
      ],
      'quiz-css-flexbox': [
        'css-flex-container-items-axes',
        'css-flex-direction-wrap-lines',
        'css-flex-alignment-distribution',
        'css-flex-component-transfer',
      ],
      'lab-page-of-playing-cards': [
        'html-landmarks',
        'css-type-class-id-selectors',
        'css-box-model-areas',
        'css-flex-container-items-axes',
        'css-flex-direction-wrap-lines',
        'css-flex-alignment-distribution',
        'css-flex-gap-spacing',
        'css-flex-component-transfer',
      ],
    });
  });

  it('records the complete Typography inspection and rendered-behavior decision', () => {
    const content = readFileSync(
      path.join(
        repositoryRoot,
        'docs/research/courses/responsive-web-design-typography-inspection.md'
      ),
      'utf8'
    );
    const dossier = CourseResearchDossierSchema.parse(
      readJson(path.join(repositoryRoot, 'docs/research/courses/responsive-web-design.json'))
    );
    const graph = ConceptResearchGraphSchema.parse(
      readJson(
        path.join(repositoryRoot, 'docs/research/courses/responsive-web-design-css-concepts.json')
      )
    );

    expect(content).toContain('five source blocks');
    expect(content).toContain('Practice volume hides low decision density');
    expect(content).toContain('0.6rem');
    expect(content).toContain('41 total source blocks still require challenge-level inspection');
    expect(content.length).toBeGreaterThan(30_000);
    expect(graph.sourceIds).toEqual(
      expect.arrayContaining([
        'rwd-css-fonts-four',
        'rwd-css-font-loading-three',
        'rwd-css-text-four',
        'rwd-css-text-decoration-four',
        'rwd-css-inline-three',
        'rwd-woff-two',
      ])
    );
    expect(
      graph.concepts.find((concept) => concept.id === 'css-font-stacks-generic-fallbacks')
    ).toMatchObject({
      sourceAnchors: [{ sourceId: 'rwd-css-fonts-four' }],
    });
    expect(
      graph.concepts.find((concept) => concept.id === 'css-type-scale-line-height')
    ).toMatchObject({
      sourceAnchors: [{ sourceId: 'rwd-css-inline-three' }],
    });
    expect(
      dossier.sources.find((source) => source.id === 'rwd-fcc-typography-inspection')
    ).toMatchObject({
      authority: 'direct-observation',
      reviewedAt: '2026-07-16',
      questionIds: ['rwd-current-scope-depth', 'rwd-workspace-assessment'],
    });
    expect(
      dossier.decisions.find((decision) => decision.id === 'rwd-typography-behavior-evidence')
    ).toMatchObject({
      status: 'accepted',
      sourceIds: [
        'rwd-css-fonts-four',
        'rwd-css-font-loading-three',
        'rwd-css-text-four',
        'rwd-css-text-decoration-four',
        'rwd-css-inline-three',
        'rwd-woff-two',
        'rwd-wcag-two-two',
        'rwd-wai-tutorials',
        'rwd-fda-nutrition-label',
        'rwd-fcc-typography-inspection',
      ],
    });
  });

  it('keeps all five Typography blocks exact and agent-inspected', () => {
    const matrix = ExternalObjectiveConceptAlignmentSchema.parse(
      readJson(
        path.join(
          repositoryRoot,
          'docs/research/courses/responsive-web-design-concept-alignment.json'
        )
      )
    );
    const typographyAlignments = matrix.alignments.filter(
      (alignment) => alignment.sourceModuleId === 'css-typography'
    );

    expect(typographyAlignments).toHaveLength(5);
    expect(
      typographyAlignments.reduce((total, alignment) => total + alignment.sourceChallengeCount, 0)
    ).toBe(78);
    expect(
      typographyAlignments.reduce(
        (total, alignment) => total + alignment.sourceEvidence.quizQuestionCount,
        0
      )
    ).toBe(61);
    expect(
      typographyAlignments.reduce(
        (total, alignment) => total + alignment.sourceEvidence.hintCheckCount,
        0
      )
    ).toBe(257);
    expect(
      typographyAlignments.every(
        (alignment) =>
          alignment.mappingBasis === 'block-specific-source' &&
          alignment.inspectionState === 'agent-inspected'
      )
    ).toBe(true);
    expect(
      Object.fromEntries(
        typographyAlignments.map((alignment) => [alignment.sourceBlockSlug, alignment.conceptIds])
      )
    ).toEqual({
      'lecture-working-with-css-fonts': [
        'css-application-and-loading',
        'css-font-stacks-generic-fallbacks',
        'css-web-font-sources-loading',
        'css-font-metrics-fallback-stability',
        'css-type-scale-line-height',
        'css-readable-measure-alignment',
        'css-text-wrap-spacing-decoration',
        'css-text-decoration-shadows-emphasis',
        'css-contrast-noncolor-meaning',
        'css-visual-hierarchy-spacing',
      ],
      'workshop-nutritional-label': [
        'html-heading-hierarchy',
        'html-paragraphs-breaks',
        'html-emphasis-importance',
        'html-landmarks',
        'css-application-and-loading',
        'css-type-class-id-selectors',
        'css-selector-lists-combinators',
        'css-pseudo-classes',
        'css-outer-inner-display',
        'css-box-model-areas',
        'css-box-sizing-models',
        'css-intrinsic-extrinsic-sizing',
        'css-absolute-font-relative-viewport-units',
        'css-backgrounds-borders-shadows',
        'css-color-spaces-alpha',
        'css-font-stacks-generic-fallbacks',
        'css-web-font-sources-loading',
        'css-type-scale-line-height',
        'css-readable-measure-alignment',
        'css-text-wrap-spacing-decoration',
        'css-visual-hierarchy-spacing',
        'css-flex-container-items-axes',
        'css-flex-alignment-distribution',
      ],
      'lab-newspaper-article': [
        'html-document-root-head-body',
        'html-document-language',
        'html-character-encoding',
        'html-title-metadata',
        'html-viewport-metadata',
        'html-heading-hierarchy',
        'html-paragraphs-breaks',
        'html-landmarks',
        'html-sectioning-articles',
        'css-application-and-loading',
        'css-type-class-id-selectors',
        'css-pseudo-elements',
        'css-font-stacks-generic-fallbacks',
        'css-type-scale-line-height',
        'css-readable-measure-alignment',
        'css-text-wrap-spacing-decoration',
        'css-visual-hierarchy-spacing',
      ],
      'review-css-typography': [
        'css-font-stacks-generic-fallbacks',
        'css-web-font-sources-loading',
        'css-font-metrics-fallback-stability',
        'css-type-scale-line-height',
        'css-readable-measure-alignment',
        'css-text-wrap-spacing-decoration',
        'css-text-decoration-shadows-emphasis',
        'css-visual-hierarchy-spacing',
      ],
      'quiz-css-typography': [
        'css-font-stacks-generic-fallbacks',
        'css-web-font-sources-loading',
        'css-font-metrics-fallback-stability',
        'css-type-scale-line-height',
        'css-text-wrap-spacing-decoration',
        'css-text-decoration-shadows-emphasis',
        'css-visual-hierarchy-spacing',
      ],
    });
  });

  it('records the complete CSS Accessibility inspection and behavior-evidence decision', () => {
    const content = readFileSync(
      path.join(
        repositoryRoot,
        'docs/research/courses/responsive-web-design-css-accessibility-inspection.md'
      ),
      'utf8'
    );
    const dossier = CourseResearchDossierSchema.parse(
      readJson(path.join(repositoryRoot, 'docs/research/courses/responsive-web-design.json'))
    );
    const htmlGraph = ConceptResearchGraphSchema.parse(
      readJson(
        path.join(repositoryRoot, 'docs/research/courses/responsive-web-design-html-concepts.json')
      )
    );
    const cssGraph = ConceptResearchGraphSchema.parse(
      readJson(
        path.join(repositoryRoot, 'docs/research/courses/responsive-web-design-css-concepts.json')
      )
    );

    expect(content).toContain('five pinned CSS Accessibility blocks');
    expect(content).toContain('Check volume does not establish accessibility evidence');
    expect(content).toContain('The visually-hidden pattern is stale and overpromised');
    expect(content).toContain('36 total source blocks still requiring challenge-level inspection');
    expect(content.length).toBeGreaterThan(20_000);
    expect(cssGraph.sourceIds).toContain('rwd-media-queries-five');
    expect(htmlGraph.sourceIds).toContain('rwd-wai-act-aria-hidden-focus');
    expect(
      htmlGraph.concepts.find((concept) => concept.id === 'html-accessibility-tree-inclusion')
        ?.sourceAnchors
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ sourceId: 'rwd-wai-act-aria-hidden-focus' }),
      ])
    );
    expect(
      cssGraph.concepts.find((concept) => concept.id === 'css-reduced-motion-preference')
    ).toMatchObject({
      sourceAnchors: [{ sourceId: 'rwd-media-queries-five' }],
    });
    expect(
      dossier.sources.find((source) => source.id === 'rwd-fcc-css-accessibility-inspection')
    ).toMatchObject({
      authority: 'direct-observation',
      reviewedAt: '2026-07-16',
      questionIds: ['rwd-current-scope-depth', 'rwd-workspace-assessment'],
    });
    expect(
      dossier.decisions.find(
        (decision) => decision.id === 'rwd-css-accessibility-behavior-evidence'
      )
    ).toMatchObject({
      status: 'accepted',
      sourceIds: [
        'rwd-wcag-two-two',
        'rwd-whatwg-html',
        'rwd-wai-aria-one-two',
        'rwd-wai-act-aria-hidden-focus',
        'rwd-wai-evaluation-tools',
        'rwd-media-queries-five',
        'rwd-css-display-three',
        'rwd-css-overflow-three',
        'rwd-css-color-adjust-one',
        'rwd-fcc-css-accessibility-inspection',
      ],
    });
  });

  it('keeps all five CSS Accessibility blocks exact and agent-inspected', () => {
    const matrix = ExternalObjectiveConceptAlignmentSchema.parse(
      readJson(
        path.join(
          repositoryRoot,
          'docs/research/courses/responsive-web-design-concept-alignment.json'
        )
      )
    );
    const accessibilityAlignments = matrix.alignments.filter(
      (alignment) => alignment.sourceModuleId === 'css-and-accessibility'
    );

    expect(accessibilityAlignments).toHaveLength(5);
    expect(
      accessibilityAlignments.reduce(
        (total, alignment) => total + alignment.sourceChallengeCount,
        0
      )
    ).toBe(72);
    expect(
      accessibilityAlignments.reduce(
        (total, alignment) => total + alignment.sourceEvidence.quizQuestionCount,
        0
      )
    ).toBe(16);
    expect(
      accessibilityAlignments.reduce(
        (total, alignment) => total + alignment.sourceEvidence.hintCheckCount,
        0
      )
    ).toBe(362);
    expect(
      accessibilityAlignments.every(
        (alignment) =>
          alignment.mappingBasis === 'block-specific-source' &&
          alignment.inspectionState === 'agent-inspected'
      )
    ).toBe(true);
    expect(
      Object.fromEntries(
        accessibilityAlignments.map((alignment) => [
          alignment.sourceBlockSlug,
          alignment.conceptIds,
        ])
      )
    ).toEqual({
      'lecture-best-practices-for-accessibility-and-css': [
        'html-accessibility-tree-inclusion',
        'html-accessibility-evaluation-evidence',
        'css-outer-inner-display',
        'css-overflow-containment-scroll',
        'css-contrast-noncolor-meaning',
      ],
      'workshop-accessibility-quiz': [
        'html-document-root-head-body',
        'html-document-language',
        'html-character-encoding',
        'html-title-metadata',
        'html-discovery-metadata',
        'html-viewport-metadata',
        'html-images-purpose-alt',
        'html-heading-hierarchy',
        'html-lists',
        'html-contact-address-links',
        'html-landmarks',
        'html-form-submission-data',
        'html-form-labels-instructions',
        'html-input-types-autocomplete',
        'html-choice-groups',
        'html-textarea-select-buttons',
        'html-accessible-name-description',
        'html-accessibility-tree-inclusion',
        'html-aria-boundary',
        'css-application-and-loading',
        'css-type-class-id-selectors',
        'css-selector-lists-combinators',
        'css-pseudo-elements',
        'css-link-state-sequence',
        'css-box-model-areas',
        'css-intrinsic-extrinsic-sizing',
        'css-absolute-font-relative-viewport-units',
        'css-min-max-clamp-functions',
        'css-backgrounds-borders-shadows',
        'css-color-spaces-alpha',
        'css-contrast-noncolor-meaning',
        'css-type-scale-line-height',
        'css-form-control-states',
        'css-flex-container-items-axes',
        'css-flex-direction-wrap-lines',
        'css-flex-alignment-distribution',
        'responsive-fluid-default',
        'responsive-viewport-zoom',
        'responsive-media-query-model',
        'css-input-capability-adaptation',
        'css-reduced-motion-preference',
      ],
      'lab-tribute-page': [
        'html-links-destinations',
        'html-replaced-content-boundaries',
        'html-figures-captions',
        'html-heading-hierarchy',
        'html-landmarks',
        'css-type-class-id-selectors',
        'css-outer-inner-display',
        'css-box-model-areas',
        'css-intrinsic-extrinsic-sizing',
        'responsive-fluid-media',
      ],
      'review-css-accessibility': [
        'html-form-labels-instructions',
        'html-accessibility-tree-inclusion',
        'html-aria-boundary',
        'html-accessibility-evaluation-evidence',
        'css-outer-inner-display',
        'css-overflow-containment-scroll',
        'css-min-max-clamp-functions',
        'css-contrast-noncolor-meaning',
        'css-reduced-motion-preference',
      ],
      'quiz-css-accessibility': [
        'html-form-labels-instructions',
        'html-accessibility-tree-inclusion',
        'html-accessibility-evaluation-evidence',
        'css-outer-inner-display',
        'css-min-max-clamp-functions',
        'css-contrast-noncolor-meaning',
        'css-reduced-motion-preference',
      ],
    });
  });

  it('records the complete CSS Positioning inspection and behavior-evidence decision', () => {
    const content = readFileSync(
      path.join(
        repositoryRoot,
        'docs/research/courses/responsive-web-design-css-positioning-inspection.md'
      ),
      'utf8'
    );
    const dossier = CourseResearchDossierSchema.parse(
      readJson(path.join(repositoryRoot, 'docs/research/courses/responsive-web-design.json'))
    );
    const graph = ConceptResearchGraphSchema.parse(
      readJson(
        path.join(repositoryRoot, 'docs/research/courses/responsive-web-design-css-concepts.json')
      )
    );

    expect(content).toContain('five pinned CSS Positioning blocks');
    expect(content).toContain('Sticky is not “relative until fixed”');
    expect(content).toContain('zero steps call `getComputedStyle`');
    expect(content).toContain('31 total source blocks still requiring challenge-level inspection');
    expect(content.length).toBeGreaterThan(25_000);
    expect(graph.sourceIds).toEqual(
      expect.arrayContaining(['rwd-css-position-three', 'rwd-css-anchor-position-one'])
    );
    expect(
      graph.concepts.find((concept) => concept.id === 'css-positioning-containing-blocks')
    ).toMatchObject({
      sourceAnchors: [{ sourceId: 'rwd-css-position-three' }],
    });
    expect(
      graph.concepts.find((concept) => concept.id === 'css-anchor-positioning-fallbacks')
    ).toMatchObject({
      currentState: 'researched-not-authored',
      sourceAnchors: [{ sourceId: 'rwd-css-anchor-position-one' }],
    });
    expect(
      dossier.sources.find((source) => source.id === 'rwd-fcc-css-positioning-inspection')
    ).toMatchObject({
      authority: 'direct-observation',
      reviewedAt: '2026-07-16',
      questionIds: ['rwd-current-scope-depth', 'rwd-workspace-assessment'],
    });
    expect(
      dossier.decisions.find((decision) => decision.id === 'rwd-positioning-behavior-evidence')
    ).toMatchObject({
      status: 'accepted',
      sourceIds: [
        'rwd-css-position-three',
        'rwd-css-anchor-position-one',
        'rwd-css-two-two',
        'rwd-css-display-three',
        'rwd-css-overflow-three',
        'rwd-css-transforms-one',
        'rwd-wcag-two-two',
        'rwd-fcc-css-positioning-inspection',
      ],
    });
  });

  it('keeps all five CSS Positioning blocks exact and agent-inspected', () => {
    const matrix = ExternalObjectiveConceptAlignmentSchema.parse(
      readJson(
        path.join(
          repositoryRoot,
          'docs/research/courses/responsive-web-design-concept-alignment.json'
        )
      )
    );
    const positioningAlignments = matrix.alignments.filter(
      (alignment) => alignment.sourceModuleId === 'css-positioning'
    );

    expect(positioningAlignments).toHaveLength(5);
    expect(
      positioningAlignments.reduce((total, alignment) => total + alignment.sourceChallengeCount, 0)
    ).toBe(88);
    expect(
      positioningAlignments.reduce(
        (total, alignment) => total + alignment.sourceEvidence.quizQuestionCount,
        0
      )
    ).toBe(55);
    expect(
      positioningAlignments.reduce(
        (total, alignment) => total + alignment.sourceEvidence.hintCheckCount,
        0
      )
    ).toBe(315);
    expect(
      positioningAlignments.every(
        (alignment) =>
          alignment.mappingBasis === 'block-specific-source' &&
          alignment.inspectionState === 'agent-inspected'
      )
    ).toBe(true);
    expect(
      Object.fromEntries(
        positioningAlignments.map((alignment) => [alignment.sourceBlockSlug, alignment.conceptIds])
      )
    ).toEqual({
      'lecture-understanding-how-to-work-with-floats-and-positioning-in-css': [
        'css-normal-flow',
        'css-margin-collapse-formatting-contexts',
        'css-outer-inner-display',
        'css-positioning-containing-blocks',
        'css-stacking-contexts-z-index',
        'css-floats-content-wrapping',
      ],
      'workshop-cat-painting': [
        'html-landmarks',
        'css-application-and-loading',
        'css-type-class-id-selectors',
        'css-selector-lists-combinators',
        'css-box-model-areas',
        'css-box-sizing-models',
        'css-absolute-font-relative-viewport-units',
        'css-backgrounds-borders-shadows',
        'css-gradients-background-images',
        'css-color-spaces-alpha',
        'css-normal-flow',
        'css-positioning-containing-blocks',
        'css-stacking-contexts-z-index',
        'css-transform-reference-boxes',
      ],
      'lab-house-painting': [
        'css-application-and-loading',
        'css-type-class-id-selectors',
        'css-selector-lists-combinators',
        'css-box-model-areas',
        'css-intrinsic-extrinsic-sizing',
        'css-absolute-font-relative-viewport-units',
        'css-backgrounds-borders-shadows',
        'css-gradients-background-images',
        'css-normal-flow',
        'css-positioning-containing-blocks',
        'css-stacking-contexts-z-index',
      ],
      'review-css-positioning': [
        'css-pseudo-elements',
        'css-outer-inner-display',
        'css-normal-flow',
        'css-positioning-containing-blocks',
        'css-stacking-contexts-z-index',
        'css-floats-content-wrapping',
      ],
      'quiz-css-positioning': [
        'css-pseudo-elements',
        'css-normal-flow',
        'css-positioning-containing-blocks',
        'css-stacking-contexts-z-index',
        'css-floats-content-wrapping',
      ],
    });
  });

  it('records the complete Attribute Selectors inspection and semantic matched-set decision', () => {
    const content = readFileSync(
      path.join(
        repositoryRoot,
        'docs/research/courses/responsive-web-design-attribute-selectors-inspection.md'
      ),
      'utf8'
    );
    const dossier = CourseResearchDossierSchema.parse(
      readJson(path.join(repositoryRoot, 'docs/research/courses/responsive-web-design.json'))
    );
    const graph = ConceptResearchGraphSchema.parse(
      readJson(
        path.join(repositoryRoot, 'docs/research/courses/responsive-web-design-css-concepts.json')
      )
    );

    expect(content).toContain('four pinned Attribute Selectors blocks');
    expect(content).toContain('Complete 66-step workshop audit');
    expect(content).toContain('zero steps call `getComputedStyle`');
    expect(content).toContain('27 total source blocks still requiring challenge-level inspection');
    expect(content.length).toBeGreaterThan(30_000);
    expect(
      graph.concepts.find((concept) => concept.id === 'css-attribute-selectors')
    ).toMatchObject({
      sourceAnchors: [{ sourceId: 'rwd-selectors-four' }],
    });
    expect(
      dossier.sources.find((source) => source.id === 'rwd-fcc-attribute-selectors-inspection')
    ).toMatchObject({
      authority: 'direct-observation',
      reviewedAt: '2026-07-16',
      questionIds: ['rwd-current-scope-depth', 'rwd-workspace-assessment'],
    });
    expect(
      dossier.decisions.find(
        (decision) => decision.id === 'rwd-attribute-selector-semantic-state-evidence'
      )
    ).toMatchObject({
      status: 'accepted',
      sourceIds: [
        'rwd-selectors-four',
        'rwd-whatwg-html',
        'rwd-css-cascade-five',
        'rwd-wai-tutorials',
        'rwd-wcag-two-two',
        'rwd-fcc-attribute-selectors-inspection',
        'rwd-fcc-book-inventory-lab-inspection',
      ],
    });
  });

  it('keeps all four Attribute Selectors blocks exact and agent-inspected', () => {
    const matrix = ExternalObjectiveConceptAlignmentSchema.parse(
      readJson(
        path.join(
          repositoryRoot,
          'docs/research/courses/responsive-web-design-concept-alignment.json'
        )
      )
    );
    const attributeAlignments = matrix.alignments.filter(
      (alignment) => alignment.sourceModuleId === 'attribute-selectors'
    );

    expect(attributeAlignments).toHaveLength(4);
    expect(
      attributeAlignments.reduce((total, alignment) => total + alignment.sourceChallengeCount, 0)
    ).toBe(71);
    expect(
      attributeAlignments.reduce(
        (total, alignment) => total + alignment.sourceEvidence.quizQuestionCount,
        0
      )
    ).toBe(19);
    expect(
      attributeAlignments.reduce(
        (total, alignment) => total + alignment.sourceEvidence.hintCheckCount,
        0
      )
    ).toBe(274);
    expect(
      attributeAlignments.every(
        (alignment) =>
          alignment.mappingBasis === 'block-specific-source' &&
          alignment.inspectionState === 'agent-inspected'
      )
    ).toBe(true);
    expect(
      Object.fromEntries(
        attributeAlignments.map((alignment) => [alignment.sourceBlockSlug, alignment.conceptIds])
      )
    ).toEqual({
      'lecture-working-with-attribute-selectors': [
        'html-document-language',
        'html-lists',
        'html-links-destinations',
        'css-attribute-selectors',
      ],
      'workshop-balance-sheet': [
        'html-heading-hierarchy',
        'html-tables-purpose',
        'html-table-structure',
        'html-table-header-associations',
        'html-accessibility-tree-inclusion',
        'css-application-and-loading',
        'css-type-class-id-selectors',
        'css-selector-lists-combinators',
        'css-attribute-selectors',
        'css-pseudo-classes',
        'css-cascade-origins-importance-order',
        'css-outer-inner-display',
        'css-box-model-areas',
        'css-intrinsic-extrinsic-sizing',
        'css-absolute-font-relative-viewport-units',
        'css-percentages-containing-blocks',
        'css-calculated-value-math',
        'css-backgrounds-borders-shadows',
        'css-gradients-background-images',
        'css-font-stacks-generic-fallbacks',
        'css-type-scale-line-height',
        'css-readable-measure-alignment',
        'css-flex-container-items-axes',
        'css-flex-alignment-distribution',
        'css-flex-order-accessibility',
        'css-normal-flow',
        'css-positioning-containing-blocks',
        'css-stacking-contexts-z-index',
      ],
      'review-css-attribute-selectors': ['css-attribute-selectors'],
      'quiz-css-attribute-selectors': ['css-attribute-selectors'],
    });
  });

  it('records the complete Book Inventory lab inspection without inventing transfer evidence', () => {
    const content = readFileSync(
      path.join(
        repositoryRoot,
        'docs/research/courses/responsive-web-design-book-inventory-lab-inspection.md'
      ),
      'utf8'
    );
    const dossier = CourseResearchDossierSchema.parse(
      readJson(path.join(repositoryRoot, 'docs/research/courses/responsive-web-design.json'))
    );

    expect(content).toContain('one 28,308-byte challenge with 17 user stories and 53');
    expect(content).toContain('class-order-dependent selectors');
    expect(content).toContain('No check calls `getComputedStyle`');
    expect(content).toContain('26 total source blocks still requiring challenge-level inspection');
    expect(content.length).toBeGreaterThan(25_000);
    expect(
      dossier.sources.find((source) => source.id === 'rwd-fcc-book-inventory-lab-inspection')
    ).toMatchObject({
      authority: 'direct-observation',
      reviewedAt: '2026-07-16',
      questionIds: ['rwd-current-scope-depth', 'rwd-workspace-assessment'],
    });
  });

  it('keeps the Book Inventory lab exact, bounded, and agent-inspected', () => {
    const matrix = ExternalObjectiveConceptAlignmentSchema.parse(
      readJson(
        path.join(
          repositoryRoot,
          'docs/research/courses/responsive-web-design-concept-alignment.json'
        )
      )
    );
    const alignment = matrix.alignments.find(
      (candidate) => candidate.sourceBlockSlug === 'lab-book-inventory-app'
    );

    expect(alignment).toMatchObject({
      sourceModuleId: 'lab-book-inventory-app',
      sourceActivityType: 'lab',
      sourceChallengeCount: 1,
      mappingBasis: 'block-specific-source',
      inspectionState: 'agent-inspected',
      conceptIds: [
        'html-heading-hierarchy',
        'html-tables-purpose',
        'html-table-structure',
        'html-table-header-associations',
        'css-application-and-loading',
        'css-type-class-id-selectors',
        'css-selector-lists-combinators',
        'css-attribute-selectors',
        'css-pseudo-classes',
        'css-outer-inner-display',
        'css-box-model-areas',
        'css-box-sizing-models',
        'css-intrinsic-extrinsic-sizing',
        'css-absolute-font-relative-viewport-units',
        'css-backgrounds-borders-shadows',
        'css-gradients-background-images',
        'css-font-stacks-generic-fallbacks',
        'css-contrast-noncolor-meaning',
      ],
    });
    expect(alignment?.sourceEvidence.hintCheckCount).toBe(53);
    expect(alignment?.conceptIds).not.toEqual(
      expect.arrayContaining(['css-changed-case-regression', 'css-independent-transfer-defense'])
    );
  });

  it('records the complete Responsive Design inspection and content-driven system decision', () => {
    const content = readFileSync(
      path.join(
        repositoryRoot,
        'docs/research/courses/responsive-web-design-responsive-systems-inspection.md'
      ),
      'utf8'
    );
    const dossier = CourseResearchDossierSchema.parse(
      readJson(path.join(repositoryRoot, 'docs/research/courses/responsive-web-design.json'))
    );
    const graph = ConceptResearchGraphSchema.parse(
      readJson(
        path.join(repositoryRoot, 'docs/research/courses/responsive-web-design-css-concepts.json')
      )
    );

    expect(content).toContain('four pinned Responsive Design blocks');
    expect(content).toContain('Complete 31-step piano audit');
    expect(content).toContain('54 CSS-parser and 32 DOM/source checks');
    expect(content).toContain('22 total source blocks still requiring challenge-level inspection');
    expect(content.length).toBeGreaterThan(35_000);
    expect(graph.sourceIds).toEqual(
      expect.arrayContaining(['rwd-css-contain-three', 'rwd-css-grid-two'])
    );
    expect(
      graph.concepts.find((concept) => concept.id === 'responsive-image-selection')
    ).toMatchObject({ sourceAnchors: [{ sourceId: 'rwd-whatwg-html' }] });
    expect(
      graph.concepts.find((concept) => concept.id === 'responsive-range-syntax-overlap')
    ).toMatchObject({ sourceAnchors: [{ sourceId: 'rwd-media-queries-five' }] });
    expect(
      graph.concepts.find((concept) => concept.id === 'responsive-container-query-model')
    ).toMatchObject({ sourceAnchors: [{ sourceId: 'rwd-css-contain-three' }] });
    expect(
      dossier.sources.find((source) => source.id === 'rwd-fcc-responsive-systems-inspection')
    ).toMatchObject({
      authority: 'direct-observation',
      reviewedAt: '2026-07-16',
      questionIds: ['rwd-current-scope-depth', 'rwd-workspace-assessment'],
    });
    expect(
      dossier.decisions.find((decision) => decision.id === 'rwd-content-driven-responsive')
    ).toMatchObject({
      status: 'accepted',
      sourceIds: expect.arrayContaining([
        'rwd-media-queries-five',
        'rwd-css-contain-three',
        'rwd-css-grid-two',
        'rwd-whatwg-html',
        'rwd-fcc-responsive-systems-inspection',
      ]),
    });
  });

  it('keeps all four Responsive Design blocks exact and agent-inspected', () => {
    const matrix = ExternalObjectiveConceptAlignmentSchema.parse(
      readJson(
        path.join(
          repositoryRoot,
          'docs/research/courses/responsive-web-design-concept-alignment.json'
        )
      )
    );
    const responsiveAlignments = matrix.alignments.filter(
      (alignment) => alignment.sourceModuleId === 'responsive-design'
    );

    expect(responsiveAlignments).toHaveLength(4);
    expect(
      responsiveAlignments.reduce((total, alignment) => total + alignment.sourceChallengeCount, 0)
    ).toBe(37);
    expect(
      responsiveAlignments.reduce(
        (total, alignment) => total + alignment.sourceEvidence.quizQuestionCount,
        0
      )
    ).toBe(52);
    expect(
      responsiveAlignments.reduce(
        (total, alignment) => total + alignment.sourceEvidence.hintCheckCount,
        0
      )
    ).toBe(86);
    expect(
      responsiveAlignments.every(
        (alignment) =>
          alignment.mappingBasis === 'block-specific-source' &&
          alignment.inspectionState === 'agent-inspected'
      )
    ).toBe(true);
    expect(
      Object.fromEntries(
        responsiveAlignments.map((alignment) => [alignment.sourceBlockSlug, alignment.conceptIds])
      )
    ).toEqual({
      'lecture-best-practices-for-responsive-web-design': [
        'css-flex-container-items-axes',
        'css-grid-container-tracks-cells',
        'responsive-fluid-default',
        'responsive-fluid-media',
        'responsive-image-selection',
        'responsive-media-query-model',
        'responsive-content-breakpoints',
        'responsive-mobile-first-enhancement',
        'responsive-range-syntax-overlap',
        'css-input-capability-adaptation',
        'css-forced-colors-preferences',
        'css-print-and-non-screen-media',
      ],
      'workshop-piano': [
        'html-doctype-rendering-mode',
        'html-document-root-head-body',
        'html-document-language',
        'html-character-encoding',
        'html-title-metadata',
        'html-viewport-metadata',
        'html-files-paths-urls',
        'html-images-purpose-alt',
        'css-application-and-loading',
        'css-type-class-id-selectors',
        'css-selector-lists-combinators',
        'css-pseudo-elements',
        'css-box-model-areas',
        'css-box-sizing-models',
        'css-intrinsic-extrinsic-sizing',
        'css-absolute-font-relative-viewport-units',
        'css-backgrounds-borders-shadows',
        'css-overflow-containment-scroll',
        'css-positioning-containing-blocks',
        'css-floats-content-wrapping',
        'responsive-viewport-zoom',
        'responsive-media-query-model',
        'responsive-content-breakpoints',
        'responsive-range-syntax-overlap',
      ],
      'review-responsive-web-design': [
        'responsive-fluid-default',
        'responsive-fluid-media',
        'responsive-media-query-model',
        'responsive-content-breakpoints',
        'responsive-mobile-first-enhancement',
        'responsive-range-syntax-overlap',
        'css-input-capability-adaptation',
        'css-forced-colors-preferences',
        'css-print-and-non-screen-media',
      ],
      'quiz-responsive-web-design': [
        'css-flex-container-items-axes',
        'responsive-fluid-default',
        'responsive-fluid-media',
        'responsive-media-query-model',
        'responsive-content-breakpoints',
        'responsive-mobile-first-enhancement',
        'responsive-range-syntax-overlap',
        'css-input-capability-adaptation',
        'css-forced-colors-preferences',
        'css-print-and-non-screen-media',
      ],
    });
  });

  it('records the complete Technical Documentation lab inspection and current navigation evidence', () => {
    const content = readFileSync(
      path.join(
        repositoryRoot,
        'docs/research/courses/responsive-web-design-technical-documentation-lab-inspection.md'
      ),
      'utf8'
    );
    const dossier = CourseResearchDossierSchema.parse(
      readJson(path.join(repositoryRoot, 'docs/research/courses/responsive-web-design.json'))
    );

    expect(content).toContain('15 user stories, and 22 checks');
    expect(content).toContain('Complete check audit');
    expect(content).toContain('Static DOM, text, count, order, and attribute checks | 20');
    expect(content).toContain('21 total source blocks still requiring challenge-level inspection');
    expect(content.length).toBeGreaterThan(20_000);
    expect(dossier.sources.find((source) => source.id === 'rwd-css-scroll-snap-one')).toMatchObject(
      {
        authority: 'standard',
        reviewedAt: '2026-07-16',
      }
    );
    expect(
      dossier.sources.find(
        (source) => source.id === 'rwd-fcc-technical-documentation-lab-inspection'
      )
    ).toMatchObject({
      authority: 'direct-observation',
      reviewedAt: '2026-07-16',
      questionIds: ['rwd-current-scope-depth', 'rwd-workspace-assessment'],
    });
    for (const decisionId of [
      'rwd-content-driven-responsive',
      'rwd-accessibility-cumulative',
      'rwd-behavioral-grading',
    ]) {
      expect(dossier.decisions.find((decision) => decision.id === decisionId)).toMatchObject({
        sourceIds: expect.arrayContaining([
          'rwd-css-scroll-snap-one',
          'rwd-fcc-technical-documentation-lab-inspection',
        ]),
      });
    }
  });

  it('keeps the Technical Documentation lab exact and removes unsupported transfer credit', () => {
    const matrix = ExternalObjectiveConceptAlignmentSchema.parse(
      readJson(
        path.join(
          repositoryRoot,
          'docs/research/courses/responsive-web-design-concept-alignment.json'
        )
      )
    );
    const alignment = matrix.alignments.find(
      (candidate) => candidate.sourceBlockSlug === 'lab-technical-documentation-page'
    );

    expect(alignment).toMatchObject({
      sourceActivityType: 'lab',
      sourceChallengeCount: 1,
      mappingBasis: 'block-specific-source',
      inspectionState: 'agent-inspected',
      conceptIds: [
        'html-document-root-head-body',
        'html-document-language',
        'html-character-encoding',
        'html-title-metadata',
        'html-files-paths-urls',
        'html-links-destinations',
        'html-link-purpose-fragments',
        'html-heading-hierarchy',
        'html-lists',
        'html-code-preformatted-text',
        'html-landmarks',
        'html-sectioning-articles',
        'html-source-order-keyboard',
        'css-application-and-loading',
        'css-type-class-id-selectors',
        'css-selector-lists-combinators',
        'css-outer-inner-display',
        'css-box-model-areas',
        'css-box-sizing-models',
        'css-intrinsic-extrinsic-sizing',
        'css-absolute-font-relative-viewport-units',
        'css-overflow-containment-scroll',
        'css-type-scale-line-height',
        'css-text-wrap-spacing-decoration',
        'css-positioning-containing-blocks',
        'responsive-fluid-default',
        'responsive-media-query-model',
      ],
    });
    expect(alignment?.sourceEvidence).toMatchObject({
      hintCheckCount: 22,
      quizQuestionCount: 0,
      sourceBytes: 30_275,
      challengeIds: ['587d78b0367417b2b2512b05'],
      sourceFileSha256s: ['10ef4c6e95177a0545569cae35582838328e28951cc10567f901cd6c3e283904'],
    });
    expect(alignment?.conceptIds).not.toEqual(
      expect.arrayContaining([
        'responsive-content-breakpoints',
        'responsive-mobile-first-enhancement',
        'responsive-navigation-disclosure',
        'responsive-test-matrix',
        'css-zoom-reflow-text-spacing',
        'css-independent-transfer-defense',
      ])
    );
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
    const referenceByObjective = new Map(
      reference.chapters.flatMap((chapter) =>
        chapter.modules.flatMap((module) =>
          module.blocks.map(
            (block) => [block.objectiveId, { ...block, sourceModuleId: module.id }] as const
          )
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
    expect(matrix.conceptInventories.map((inventory) => inventory.conceptCount)).toEqual([83, 101]);
    expect(
      matrix.alignments.filter((alignment) => alignment.inspectionState === 'agent-inspected')
    ).toHaveLength(137);
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
    const surveyAlignments = matrix.alignments.filter(
      (alignment) => alignment.sourceModuleId === 'lab-survey-form'
    );
    expect(surveyAlignments).toHaveLength(1);
    expect(surveyAlignments[0]).toMatchObject({
      sourceChallengeCount: 1,
      sourceEvidence: { quizQuestionCount: 0 },
      inspectionState: 'agent-inspected',
      mappingBasis: 'block-specific-source',
      conceptIds: [
        'html-heading-hierarchy',
        'html-paragraphs-breaks',
        'html-attribute-syntax',
        'html-form-submission-data',
        'html-form-labels-instructions',
        'html-input-types-autocomplete',
        'html-choice-groups',
        'html-textarea-select-buttons',
        'html-native-validation',
      ],
    });
    const accessibilityAlignments = matrix.alignments.filter(
      (alignment) => alignment.sourceModuleId === 'html-and-accessibility'
    );
    expect(accessibilityAlignments).toHaveLength(13);
    expect(
      accessibilityAlignments.reduce(
        (total, alignment) => total + alignment.sourceChallengeCount,
        0
      )
    ).toBe(55);
    expect(
      accessibilityAlignments.reduce(
        (total, alignment) => total + alignment.sourceEvidence.quizQuestionCount,
        0
      )
    ).toBe(77);
    expect(
      accessibilityAlignments.every(
        (alignment) =>
          alignment.mappingBasis === 'block-specific-source' &&
          alignment.inspectionState === 'agent-inspected'
      )
    ).toBe(true);
    expect(
      Object.fromEntries(
        accessibilityAlignments.map((alignment) => [
          alignment.sourceBlockSlug,
          alignment.conceptIds,
        ])
      )
    ).toEqual({
      'lecture-importance-of-accessibility-and-good-html-structure': [
        'html-accessibility-user-barriers-tools',
        'html-native-accessibility-tree',
        'html-landmarks',
        'html-heading-hierarchy',
        'html-images-purpose-alt',
        'html-source-order-keyboard',
        'html-accessibility-evaluation-evidence',
        'css-zoom-reflow-text-spacing',
        'css-contrast-noncolor-meaning',
      ],
      'workshop-debug-coding-journey-blog-page': [
        'html-heading-hierarchy',
        'html-link-purpose-fragments',
        'html-landmarks',
        'html-sectioning-articles',
        'html-contact-address-links',
        'html-native-accessibility-tree',
        'html-validation-inspection',
      ],
      'lecture-accessible-tables-forms': [
        'html-form-labels-instructions',
        'html-accessible-name-description',
        'html-table-structure',
        'html-table-cell-spans',
        'html-table-header-associations',
      ],
      'workshop-tech-conference-schedule': [
        'html-heading-hierarchy',
        'html-tables-purpose',
        'html-table-structure',
        'html-table-cell-spans',
        'html-table-header-associations',
        'html-native-accessibility-tree',
      ],
      'lab-debug-donation-form': [
        'html-void-elements',
        'html-parser-recovery',
        'html-form-labels-instructions',
        'html-input-types-autocomplete',
        'html-native-validation',
        'html-accessible-name-description',
        'html-validation-inspection',
      ],
      'lecture-introduction-to-aria': [
        'html-native-controls-first',
        'html-native-accessibility-tree',
        'html-accessible-name-description',
        'html-accessibility-tree-inclusion',
        'html-aria-boundary',
      ],
      'workshop-accessible-audio-controller': [
        'html-native-controls-first',
        'html-input-types-autocomplete',
        'html-form-control-states',
        'html-accessible-name-description',
        'html-native-accessibility-tree',
        'html-aria-boundary',
      ],
      'lecture-accessible-media-elements': [
        'html-images-purpose-alt',
        'html-links-destinations',
        'html-link-purpose-fragments',
        'html-audio-video',
        'html-captions-transcripts',
        'html-source-order-keyboard',
        'html-accessibility-tree-inclusion',
        'html-accessible-name-description',
        'css-focus-visible-indicators',
      ],
      'lab-checkout-page': [
        'html-heading-hierarchy',
        'html-sectioning-articles',
        'html-images-purpose-alt',
        'html-form-labels-instructions',
        'html-native-validation',
        'html-accessible-name-description',
        'html-accessibility-tree-inclusion',
      ],
      'lab-movie-review-page': [
        'html-landmarks',
        'html-heading-hierarchy',
        'html-images-purpose-alt',
        'html-paragraphs-breaks',
        'html-emphasis-importance',
        'html-lists',
        'html-accessibility-tree-inclusion',
      ],
      'lab-multimedia-player': [
        'html-heading-hierarchy',
        'html-sectioning-articles',
        'html-audio-video',
        'html-captions-transcripts',
        'html-accessible-name-description',
      ],
      'review-html-accessibility': [
        'html-accessibility-user-barriers-tools',
        'html-heading-hierarchy',
        'html-native-accessibility-tree',
        'html-accessible-name-description',
        'html-accessibility-tree-inclusion',
        'html-source-order-keyboard',
        'html-aria-boundary',
        'html-accessibility-evaluation-evidence',
        'html-images-purpose-alt',
        'html-links-destinations',
        'html-link-purpose-fragments',
        'html-audio-video',
        'html-captions-transcripts',
        'html-form-labels-instructions',
        'html-table-structure',
        'html-table-header-associations',
      ],
      'quiz-html-accessibility': [
        'html-accessibility-user-barriers-tools',
        'html-heading-hierarchy',
        'html-native-accessibility-tree',
        'html-accessible-name-description',
        'html-accessibility-tree-inclusion',
        'html-source-order-keyboard',
        'html-aria-boundary',
        'html-images-purpose-alt',
        'html-links-destinations',
        'html-link-purpose-fragments',
        'html-audio-video',
        'html-captions-transcripts',
        'html-form-labels-instructions',
        'html-table-structure',
        'html-table-header-associations',
      ],
    });
    const htmlReview = matrix.alignments.find(
      (alignment) => alignment.sourceBlockSlug === 'review-html'
    );
    expect(htmlReview).toMatchObject({
      sourceModuleId: 'review-html',
      sourceChallengeCount: 1,
      sourceEvidence: { quizQuestionCount: 0 },
      mappingBasis: 'block-specific-source',
      inspectionState: 'agent-inspected',
      conceptIds: [
        'html-purpose-structure',
        'html-element-anatomy',
        'html-void-elements',
        'html-attribute-syntax',
        'html-attribute-value-types',
        'html-comments-character-references',
        'html-doctype-rendering-mode',
        'html-document-root-head-body',
        'html-character-encoding',
        'html-title-metadata',
        'html-discovery-metadata',
        'html-files-paths-urls',
        'html-links-destinations',
        'html-link-purpose-fragments',
        'html-replaced-content-boundaries',
        'html-images-purpose-alt',
        'html-media-rights-licensing',
        'html-svg-semantics',
        'html-audio-video',
        'html-captions-transcripts',
        'html-iframe-title-permissions',
        'html-heading-hierarchy',
        'html-paragraphs-breaks',
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
        'html-form-submission-data',
        'html-form-labels-instructions',
        'html-input-types-autocomplete',
        'html-choice-groups',
        'html-textarea-select-buttons',
        'html-form-control-states',
        'html-native-validation',
        'html-table-structure',
        'html-table-cell-spans',
        'html-accessibility-user-barriers-tools',
        'html-native-accessibility-tree',
        'html-accessible-name-description',
        'html-accessibility-tree-inclusion',
        'html-source-order-keyboard',
        'html-aria-boundary',
        'html-validation-inspection',
      ],
    });
    const computerBasicsAlignments = matrix.alignments.filter(
      (alignment) => alignment.sourceModuleId === 'computer-basics'
    );
    expect(computerBasicsAlignments).toHaveLength(5);
    expect(
      computerBasicsAlignments.reduce(
        (total, alignment) => total + alignment.sourceChallengeCount,
        0
      )
    ).toBe(16);
    expect(
      computerBasicsAlignments.reduce(
        (total, alignment) => total + alignment.sourceEvidence.quizQuestionCount,
        0
      )
    ).toBe(82);
    expect(
      computerBasicsAlignments.every(
        (alignment) =>
          alignment.mappingBasis === 'block-specific-source' &&
          alignment.inspectionState === 'agent-inspected'
      )
    ).toBe(true);
    expect(
      Object.fromEntries(
        computerBasicsAlignments.map((alignment) => [
          alignment.sourceBlockSlug,
          alignment.conceptIds,
        ])
      )
    ).toEqual({
      'lecture-understanding-computer-internet-and-tooling-basics': [
        'tooling-local-computer-resources',
        'tooling-input-methods-ergonomics',
        'tooling-internet-access-layers',
        'tooling-account-signin-security',
        'tooling-developer-tool-landscape',
      ],
      'lecture-working-with-file-systems': [
        'tooling-file-manager-operations',
        'tooling-file-naming-portability',
        'tooling-project-folder-organization',
        'tooling-file-types-search-inspection',
        'html-files-paths-urls',
      ],
      'lecture-browsing-the-web-effectively': [
        'tooling-browser-install-update-engines',
        'tooling-browser-site-search-engine',
        'tooling-search-query-refinement',
        'html-browser-request-parse-render',
      ],
      'review-computer-basics': [
        'tooling-local-computer-resources',
        'tooling-internet-access-layers',
        'tooling-account-signin-security',
        'tooling-developer-tool-landscape',
        'tooling-file-manager-operations',
        'tooling-file-naming-portability',
        'tooling-project-folder-organization',
        'tooling-file-types-search-inspection',
        'tooling-browser-site-search-engine',
        'tooling-search-query-refinement',
      ],
      'quiz-computer-basics': [
        'tooling-local-computer-resources',
        'tooling-input-methods-ergonomics',
        'tooling-internet-access-layers',
        'tooling-account-signin-security',
        'tooling-developer-tool-landscape',
        'tooling-file-manager-operations',
        'tooling-file-naming-portability',
        'tooling-project-folder-organization',
        'tooling-file-types-search-inspection',
        'tooling-browser-install-update-engines',
        'tooling-browser-site-search-engine',
        'tooling-search-query-refinement',
      ],
    });
    const basicCssAlignments = matrix.alignments.filter(
      (alignment) => alignment.sourceModuleId === 'basic-css'
    );
    expect(basicCssAlignments).toHaveLength(12);
    expect(
      basicCssAlignments.reduce((total, alignment) => total + alignment.sourceChallengeCount, 0)
    ).toBe(122);
    expect(
      basicCssAlignments.reduce(
        (total, alignment) => total + alignment.sourceEvidence.quizQuestionCount,
        0
      )
    ).toBe(158);
    expect(
      basicCssAlignments.every(
        (alignment) =>
          alignment.mappingBasis === 'block-specific-source' &&
          alignment.inspectionState === 'agent-inspected'
      )
    ).toBe(true);
    expect(
      Object.fromEntries(
        basicCssAlignments.map((alignment) => [alignment.sourceBlockSlug, alignment.conceptIds])
      )
    ).toEqual({
      'lecture-what-is-css': [
        'css-source-preview-loop',
        'css-purpose-and-boundary',
        'css-rule-declaration-anatomy',
        'css-application-and-loading',
        'css-type-class-id-selectors',
        'css-selector-lists-combinators',
        'css-cascade-origins-importance-order',
        'css-outer-inner-display',
        'css-box-model-areas',
        'css-intrinsic-extrinsic-sizing',
        'css-absolute-font-relative-viewport-units',
        'responsive-viewport-zoom',
      ],
      'workshop-cafe-menu': [
        'html-doctype-rendering-mode',
        'html-document-root-head-body',
        'html-document-language',
        'html-character-encoding',
        'html-title-metadata',
        'html-viewport-metadata',
        'html-files-paths-urls',
        'html-heading-hierarchy',
        'html-paragraphs-breaks',
        'html-landmarks',
        'html-sectioning-articles',
        'html-contact-address-links',
        'html-links-destinations',
        'html-images-purpose-alt',
        'html-void-elements',
        'css-source-preview-loop',
        'css-rule-declaration-anatomy',
        'css-application-and-loading',
        'css-type-class-id-selectors',
        'css-selector-lists-combinators',
        'css-link-state-sequence',
        'css-outer-inner-display',
        'css-box-model-areas',
        'css-intrinsic-extrinsic-sizing',
        'css-absolute-font-relative-viewport-units',
        'css-percentages-containing-blocks',
        'css-backgrounds-borders-shadows',
        'css-font-stacks-generic-fallbacks',
        'css-type-scale-line-height',
        'css-readable-measure-alignment',
        'responsive-fluid-default',
        'responsive-viewport-zoom',
      ],
      'lab-business-card': [
        'html-heading-hierarchy',
        'html-paragraphs-breaks',
        'html-links-destinations',
        'html-images-purpose-alt',
        'html-void-elements',
        'css-application-and-loading',
        'css-type-class-id-selectors',
        'css-box-model-areas',
        'css-intrinsic-extrinsic-sizing',
        'css-absolute-font-relative-viewport-units',
        'css-percentages-containing-blocks',
        'css-backgrounds-borders-shadows',
        'css-font-stacks-generic-fallbacks',
        'css-type-scale-line-height',
        'css-readable-measure-alignment',
        'responsive-fluid-media',
      ],
      'lecture-css-specificity-the-cascade-algorithm-and-inheritance': [
        'css-application-and-loading',
        'css-type-class-id-selectors',
        'css-attribute-selectors',
        'css-pseudo-classes',
        'css-pseudo-elements',
        'css-inheritance-initial-unset-revert',
        'css-cascade-origins-importance-order',
        'css-specificity-functional-selectors',
      ],
      'review-basic-css': [
        'css-purpose-and-boundary',
        'css-rule-declaration-anatomy',
        'css-application-and-loading',
        'css-type-class-id-selectors',
        'css-selector-lists-combinators',
        'css-inheritance-initial-unset-revert',
        'css-cascade-origins-importance-order',
        'css-specificity-functional-selectors',
        'css-outer-inner-display',
        'css-box-model-areas',
        'css-intrinsic-extrinsic-sizing',
        'css-absolute-font-relative-viewport-units',
        'responsive-viewport-zoom',
      ],
      'quiz-basic-css': [
        'css-purpose-and-boundary',
        'css-rule-declaration-anatomy',
        'css-application-and-loading',
        'css-type-class-id-selectors',
        'css-selector-lists-combinators',
        'css-cascade-origins-importance-order',
        'css-specificity-functional-selectors',
        'css-outer-inner-display',
        'css-box-model-areas',
        'css-intrinsic-extrinsic-sizing',
        'css-absolute-font-relative-viewport-units',
        'responsive-viewport-zoom',
      ],
      'lecture-styling-lists-and-links': [
        'css-list-markers-counters',
        'css-box-model-areas',
        'css-type-scale-line-height',
        'css-pseudo-classes',
        'css-link-state-sequence',
        'css-focus-visible-indicators',
        'css-contrast-noncolor-meaning',
      ],
      'lab-stylized-to-do-list': [
        'html-lists',
        'html-links-destinations',
        'html-form-labels-instructions',
        'html-choice-groups',
        'css-application-and-loading',
        'css-type-class-id-selectors',
        'css-selector-lists-combinators',
        'css-pseudo-classes',
        'css-link-state-sequence',
        'css-focus-visible-indicators',
      ],
      'lecture-working-with-backgrounds-and-borders': [
        'css-backgrounds-borders-shadows',
        'css-gradients-background-images',
        'css-contrast-noncolor-meaning',
        'html-audio-video',
      ],
      'lab-blog-post-card': [
        'html-heading-hierarchy',
        'html-paragraphs-breaks',
        'html-images-purpose-alt',
        'css-application-and-loading',
        'css-type-class-id-selectors',
        'css-pseudo-classes',
        'css-outer-inner-display',
        'css-box-model-areas',
        'css-intrinsic-extrinsic-sizing',
        'css-percentages-containing-blocks',
        'css-backgrounds-borders-shadows',
        'css-readable-measure-alignment',
        'responsive-fluid-media',
      ],
      'review-css-backgrounds-and-borders': [
        'css-list-markers-counters',
        'css-box-model-areas',
        'css-absolute-font-relative-viewport-units',
        'css-type-scale-line-height',
        'css-pseudo-classes',
        'css-link-state-sequence',
        'css-focus-visible-indicators',
        'css-backgrounds-borders-shadows',
        'css-gradients-background-images',
        'css-contrast-noncolor-meaning',
        'html-audio-video',
      ],
      'quiz-css-backgrounds-and-borders': [
        'css-list-markers-counters',
        'css-box-model-areas',
        'css-absolute-font-relative-viewport-units',
        'css-type-scale-line-height',
        'css-pseudo-classes',
        'css-link-state-sequence',
        'css-focus-visible-indicators',
        'css-backgrounds-borders-shadows',
        'css-gradients-background-images',
      ],
    });
    expect(
      matrix.alignments.filter((alignment) => alignment.mappingBasis === 'block-specific-source')
    ).toHaveLength(141);
    expect(
      matrix.alignments.filter((alignment) => alignment.mappingBasis === 'unmapped-source')
    ).toHaveLength(16);
    expect(new Set(matrix.alignments.map((alignment) => alignment.mappingBasis))).not.toContain(
      'module-fallback'
    );
    expect(
      matrix.alignments
        .filter((alignment) => alignment.mappingBasis !== 'block-specific-source')
        .every((alignment) => alignment.conceptIds.length === 0)
    ).toBe(true);
    expect(matrix.unresolvedConceptIds).toHaveLength(7);

    for (const alignment of matrix.alignments) {
      const sourceEvidence = referenceByObjective.get(alignment.objectiveId);
      expect(sourceEvidence, alignment.objectiveId).toBeDefined();
      expect(alignment).toMatchObject({
        sourceModuleId: sourceEvidence?.sourceModuleId,
        sourceBlockSlug: sourceEvidence?.slug,
        sourceActivityType: sourceEvidence?.type,
        sourceChallengeCount: sourceEvidence?.challengeCount,
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

  it('keeps uninspected source blocks explicitly unmapped and blocks guessed coverage', () => {
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
        conceptIds: string[];
      }>;
      conceptInventories: Array<{ conceptIds: string[] }>;
    };
    const broken = structuredClone(matrix);
    const unmapped = broken.alignments.find(
      (alignment) => alignment.mappingBasis === 'unmapped-source'
    );
    expect(unmapped).toBeDefined();
    if (!unmapped) throw new Error('Expected at least one explicitly unmapped source block.');
    unmapped.conceptIds.push(matrix.conceptInventories[0].conceptIds[0]);

    const result = ExternalObjectiveConceptAlignmentSchema.safeParse(broken);
    expect(result.success).toBe(false);
    expect(
      result.error?.issues.some((issue) => issue.message.includes('assigns guessed concepts'))
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
    expect(architecture.conceptIds).toHaveLength(184);
    expect(architecture.sourceObjectiveIds).toHaveLength(141);
    expect(architecture.unmappedSourceObjectiveIds).toHaveLength(17);
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
      alignment.alignments
        .filter((record) => record.mappingBasis === 'block-specific-source')
        .map((record) => record.objectiveId)
    );
    expect(architecture.unmappedSourceObjectiveIds).toEqual(
      alignment.alignments
        .filter((record) => record.mappingBasis !== 'block-specific-source')
        .map((record) => record.objectiveId)
    );
    expect(
      architecture.modules.every((module) => module.currentState === 'planned-not-authored')
    ).toBe(true);
    expect(
      architecture.projects.every((project) => project.currentState === 'planned-not-authored')
    ).toBe(true);
    expect(new Set(architecture.projects.map((project) => project.scenarioDomain))).toHaveLength(5);
    expect(
      new Set(
        architecture.projects.flatMap((project) => [
          ...project.sourceObjectiveIds,
          ...project.unmappedSourceObjectiveIds,
        ])
      )
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

  it('keeps compiled RWD research outputs reproducible', () => {
    for (const script of [
      'scripts/compile-rwd-html-concept-research.mjs',
      'scripts/compile-rwd-css-concept-research.mjs',
      'scripts/compile-rwd-concept-alignment.mjs',
      'scripts/compile-rwd-research-architecture.mjs',
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
});
