import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { CourseBlueprintSchema } from './blueprint';
import {
  auditCourseResearch,
  CourseResearchDossierSchema,
  PlatformResearchRegisterSchema,
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

  it('reports concrete traceability gaps instead of treating source counts as research', () => {
    const blueprint = CourseBlueprintSchema.parse(
      readJson(path.join(repositoryRoot, 'blueprints/responsive-web-design.json'))
    );
    const audit = auditCourseResearch(blueprint);
    const codes = audit.findings.map((finding) => finding.code);

    expect(audit.blueprintStatus).toBe('audit-required');
    expect(codes).not.toContain('false-review-state');
    expect(codes).toEqual(
      expect.arrayContaining([
        'missing-dossier',
        'missing-source-identity',
        'missing-source-limitations',
        'missing-source-decisions',
        'missing-source-review-trigger',
        'missing-objective-source-map',
      ])
    );
  });
});
