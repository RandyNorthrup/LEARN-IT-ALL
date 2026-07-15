import { readdirSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { ALL_COURSES } from '../../lib/data/courses';
import { loadCurriculumGraph } from './repository';

const expectations = {
  'applied-mathematics-beginner': {
    modules: 14,
    activities: 145,
    competencies: 70,
    steps: 1212,
    workspaces: ['python'],
  },
  'applied-mathematics-intermediate': {
    modules: 15,
    activities: 155,
    competencies: 75,
    steps: 1295,
    workspaces: ['python'],
  },
  'applied-mathematics-advanced': {
    modules: 17,
    activities: 175,
    competencies: 85,
    steps: 1461,
    workspaces: ['python'],
  },
  'prompt-engineering-claude-codex': {
    modules: 14,
    activities: 145,
    competencies: 70,
    steps: 1180,
    workspaces: ['prompt'],
  },
  'agent-loops-goals': {
    modules: 13,
    activities: 135,
    competencies: 65,
    steps: 1098,
    workspaces: ['prompt', 'python'],
  },
  'agent-skills-mcp': {
    modules: 15,
    activities: 155,
    competencies: 75,
    steps: 1261,
    workspaces: ['config', 'python'],
  },
  'repository-quality-gates': {
    modules: 15,
    activities: 155,
    competencies: 75,
    steps: 1261,
    workspaces: ['config'],
  },
  'sql-basics': {
    modules: 16,
    activities: 165,
    competencies: 80,
    steps: 1342,
    workspaces: ['sql'],
  },
  'go-basics': {
    modules: 18,
    activities: 186,
    competencies: 90,
    steps: 1514,
    workspaces: ['go'],
    projects: 5,
  },
  'http-clients-go': {
    modules: 18,
    activities: 186,
    competencies: 90,
    steps: 1514,
    workspaces: ['go'],
    projects: 5,
  },
  'http-clients-typescript': {
    modules: 18,
    activities: 186,
    competencies: 90,
    steps: 1514,
    workspaces: ['typescript'],
    projects: 5,
  },
  'http-clients-python': {
    modules: 18,
    activities: 186,
    competencies: 90,
    steps: 1514,
    workspaces: ['python'],
    projects: 5,
  },
  'docker-basics': {
    modules: 18,
    activities: 186,
    competencies: 90,
    steps: 1514,
    workspaces: ['config'],
    projects: 5,
  },
  'kubernetes-basics': {
    modules: 21,
    activities: 216,
    competencies: 105,
    steps: 1757,
    workspaces: ['config'],
    projects: 5,
  },
  'cicd-github-actions': {
    modules: 20,
    activities: 206,
    competencies: 100,
    steps: 1676,
    workspaces: ['config'],
    projects: 5,
  },
  'git-advanced': {
    modules: 20,
    activities: 206,
    competencies: 100,
    steps: 1678,
    workspaces: ['shell'],
    projects: 5,
  },
  'http-servers-go': {
    modules: 21,
    activities: 216,
    competencies: 105,
    steps: 1762,
    workspaces: ['go'],
    projects: 5,
  },
  'http-servers-typescript': {
    modules: 24,
    activities: 246,
    competencies: 120,
    steps: 2006,
    workspaces: ['typescript'],
    projects: 5,
  },
  'http-protocol-go': {
    modules: 24,
    activities: 246,
    competencies: 120,
    steps: 2006,
    workspaces: ['go'],
    projects: 5,
  },
  'pubsub-rabbitmq-typescript': {
    modules: 27,
    activities: 276,
    competencies: 135,
    steps: 2257,
    workspaces: ['typescript'],
    projects: 5,
  },
  'pubsub-rabbitmq-go': {
    modules: 27,
    activities: 276,
    competencies: 135,
    steps: 2249,
    workspaces: ['go'],
    projects: 5,
  },
  'file-servers-s3-go': {
    modules: 28,
    activities: 286,
    competencies: 140,
    steps: 2332,
    workspaces: ['go'],
    projects: 5,
  },
  'file-servers-s3-typescript': {
    modules: 28,
    activities: 286,
    competencies: 140,
    steps: 2332,
    workspaces: ['typescript'],
    projects: 5,
  },
  'c-memory-management': {
    modules: 28,
    activities: 286,
    competencies: 140,
    steps: 2333,
    workspaces: ['c'],
    projects: 5,
  },
  'cryptography-go': {
    modules: 28,
    activities: 286,
    competencies: 140,
    steps: 2331,
    workspaces: ['go'],
    projects: 5,
  },
  'rag-retrieval-augmented-generation': {
    modules: 30,
    activities: 306,
    competencies: 150,
    steps: 2494,
    workspaces: ['python'],
    projects: 5,
  },
  'build-bookbot-python': {
    modules: 18,
    activities: 186,
    competencies: 90,
    steps: 1519,
    workspaces: ['python'],
    projects: 5,
  },
  'build-asteroids-python': {
    modules: 24,
    activities: 246,
    competencies: 120,
    steps: 2006,
    workspaces: ['python'],
    projects: 5,
  },
  'build-static-site-python': {
    modules: 24,
    activities: 246,
    competencies: 120,
    steps: 2006,
    workspaces: ['python'],
    projects: 5,
  },
  'build-maze-solver-python': {
    modules: 24,
    activities: 246,
    competencies: 120,
    steps: 2006,
    workspaces: ['python'],
    projects: 5,
  },
  'build-web-scraper-python': {
    modules: 30,
    activities: 306,
    competencies: 150,
    steps: 2494,
    workspaces: ['python'],
    projects: 5,
  },
  'build-ai-agent-python': {
    modules: 30,
    activities: 306,
    competencies: 150,
    steps: 2494,
    workspaces: ['python'],
    projects: 5,
  },
  'build-pokedex-go': {
    modules: 24,
    activities: 246,
    competencies: 120,
    steps: 2006,
    workspaces: ['go'],
    projects: 5,
  },
  'build-pokedex-typescript': {
    modules: 25,
    activities: 256,
    competencies: 125,
    steps: 2087,
    workspaces: ['typescript'],
    projects: 5,
  },
  'build-blog-aggregator-go': {
    modules: 30,
    activities: 306,
    competencies: 150,
    steps: 2494,
    workspaces: ['go'],
    projects: 5,
  },
  'build-blog-aggregator-typescript': {
    modules: 32,
    activities: 326,
    competencies: 160,
    steps: 2656,
    workspaces: ['typescript'],
    projects: 5,
  },
  'build-web-scraper-go': {
    modules: 30,
    activities: 306,
    competencies: 150,
    steps: 2494,
    workspaces: ['go'],
    projects: 5,
  },
  'build-web-scraper-typescript': {
    modules: 32,
    activities: 326,
    competencies: 160,
    steps: 2656,
    workspaces: ['typescript'],
    projects: 5,
  },
} as const;

const requiredKinds = new Set([
  'theory',
  'workshop',
  'debug',
  'lab',
  'review',
  'quiz',
  'project',
  'exam',
]);

const minimumStepsByKind = {
  theory: 7,
  workshop: 10,
  debug: 9,
  lab: 10,
  review: 8,
  quiz: 8,
  project: 9,
  exam: 20,
} as const;

describe('expanded interactive courses', () => {
  for (const [courseId, expected] of Object.entries(expectations)) {
    it(`${courseId} is ordered, cumulative, varied, and interaction-complete`, () => {
      const graph = loadCurriculumGraph(courseId);
      const stepCount = graph.activities.reduce(
        (total, activity) => total + activity.steps.length,
        0
      );
      const checkCount = graph.activities.reduce(
        (total, activity) => total + activity.checks.length,
        0
      );
      const kinds = new Set(graph.activities.map((activity) => activity.kind));
      const workspaces = new Set(
        graph.activities.flatMap((activity) =>
          activity.steps.flatMap((step) => (step.targetFile ? [step.targetFile] : []))
        )
      );

      expect(graph.modules).toHaveLength(expected.modules);
      expect(graph.activities).toHaveLength(expected.activities);
      expect(graph.course.competencies).toHaveLength(expected.competencies);
      expect(stepCount).toBe(expected.steps);
      expect(checkCount).toBeGreaterThan(stepCount);
      expect(kinds).toEqual(requiredKinds);
      expect([...workspaces].sort()).toEqual([...expected.workspaces].sort());
      expect(graph.course.status).toBe('preview');
      const catalogEntry = ALL_COURSES.find((course) => course.id === courseId);
      expect(catalogEntry?.estimatedHours).toBe(graph.course.estimatedHours);
      expect(catalogEntry?.lessonCount).toBe(graph.activities.length);
      expect(catalogEntry?.chapterCount).toBe(graph.modules.length);
      expect(graph.course.credential.requiredProjectIds).toHaveLength(
        'projects' in expected ? expected.projects : 4
      );
      expect(graph.activities.at(-1)?.id).toBe(graph.course.credential.finalExamId);
      const courseRoot = path.join(process.cwd(), 'content', 'v2', 'courses', courseId);
      expect(
        readdirSync(path.join(courseRoot, 'modules'))
          .filter((fileName) => fileName.endsWith('.json'))
          .sort()
      ).toEqual(graph.modules.map((module) => `${module.id}.json`).sort());
      expect(
        readdirSync(path.join(courseRoot, 'activities'))
          .filter((fileName) => fileName.endsWith('.json'))
          .sort()
      ).toEqual(graph.activities.map((activity) => `${activity.id}.json`).sort());

      const activityFingerprints = graph.activities.map(
        (activity) => `${activity.title}\n${activity.summary}`
      );
      expect(new Set(activityFingerprints).size).toBe(activityFingerprints.length);

      for (const [index, activity] of graph.activities.entries()) {
        expect(activity.steps.length).toBeGreaterThanOrEqual(minimumStepsByKind[activity.kind]);
        expect(activity.steps.every((step) => step.content.length > 0)).toBe(true);
        expect(
          activity.steps
            .filter((step) => step.interaction === 'inspect' || step.interaction === 'debug')
            .every((step) => Boolean(step.stimulus))
        ).toBe(true);
        expect(
          activity.steps.filter((step) => step.interaction === 'reflect').length
        ).toBeGreaterThan(0);
        expect(activity.prerequisites).toHaveLength(index === 0 ? 0 : 1);

        const sourceChecks = activity.checks.filter((check) => check.type === 'source-includes');
        expect(new Set(sourceChecks.map((check) => check.expected)).size).toBe(sourceChecks.length);
        expect(
          sourceChecks.every(
            (check) => !activity.starterFiles?.[check.file].includes(check.expected)
          )
        ).toBe(true);
        expect(
          activity.steps
            .filter((step) => step.interaction === 'code')
            .every((step) => {
              const stepChecks = activity.checks.filter((check) =>
                step.checkIds.includes(check.id)
              );
              return (
                stepChecks.some((check) => check.type === 'source-includes') &&
                stepChecks.some((check) => check.type !== 'source-includes')
              );
            })
        ).toBe(true);
      }

      const courseMarkers = graph.activities.flatMap((activity) =>
        activity.checks
          .filter((check) => check.type === 'source-includes')
          .map((check) => check.expected)
      );
      expect(new Set(courseMarkers).size).toBe(courseMarkers.length);

      for (const kind of ['theory', 'workshop', 'debug', 'lab', 'review', 'quiz'] as const) {
        const signatures = new Set(
          graph.activities
            .filter((activity) => activity.kind === kind)
            .map((activity) => activity.steps.map((step) => step.interaction).join('>'))
        );
        expect(signatures.size).toBeGreaterThanOrEqual(3);
      }
    });
  }

  it('delivers the declared platform-scale interaction expansion', () => {
    const totals = Object.keys(expectations)
      .map((courseId) => loadCurriculumGraph(courseId))
      .reduce(
        (sum, graph) => ({
          modules: sum.modules + graph.modules.length,
          activities: sum.activities + graph.activities.length,
          steps:
            sum.steps +
            graph.activities.reduce(
              (activitySum, activity) => activitySum + activity.steps.length,
              0
            ),
        }),
        { modules: 0, activities: 0, steps: 0 }
      );

    expect(totals).toEqual({ modules: 858, activities: 8800, steps: 71811 });
  }, 15_000);
});
