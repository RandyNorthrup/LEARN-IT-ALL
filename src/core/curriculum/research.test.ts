import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { CourseBlueprintSchema } from './blueprint';
import {
  auditCourseResearch,
  ConceptResearchGraphSchema,
  CourseResearchDossierSchema,
  PlatformResearchRegisterSchema,
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
    nextReview: { triggers: ['The official documentation or relevant behavior changes.'] },
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
    maintenance: { triggers: ['A source, requirement, runtime, or learner finding changes.'] },
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

    expect(content).toContain('covered all 64 units');
    expect(content).toContain('The first meaningful edit must occur within two learner actions');
    expect(content).toContain('thirteen-activity barrier before HTML');
    expect(content).toContain('## Blockers before sequence approval');
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

    expect(graph.status).toBe('researching');
    expect(graph.concepts).toHaveLength(54);
    expect(
      graph.concepts.every((concept) => concept.currentState === 'researched-not-authored')
    ).toBe(true);
    expect(graph.sourceIds.every((sourceId) => dossierSourceIds.has(sourceId))).toBe(true);
    expect(graph.gaps.length).toBeGreaterThan(0);
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
