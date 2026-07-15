import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { auditCourseBlueprint, CourseBlueprintSchema } from './blueprint';

const expectations = {
  'python-basics': {
    competencies: 89,
    modules: 14,
    activities: 164,
    projects: 4,
  },
  'python-oop': { competencies: 77, modules: 13, activities: 147, projects: 4 },
  'comptia-network-plus': {
    competencies: 123,
    modules: 18,
    activities: 218,
    projects: 4,
  },
  'applied-mathematics-beginner': {
    competencies: 70,
    modules: 14,
    activities: 145,
    projects: 4,
  },
  'applied-mathematics-intermediate': {
    competencies: 75,
    modules: 15,
    activities: 155,
    projects: 4,
  },
  'applied-mathematics-advanced': {
    competencies: 85,
    modules: 17,
    activities: 175,
    projects: 4,
  },
  'prompt-engineering-claude-codex': {
    competencies: 70,
    modules: 14,
    activities: 145,
    projects: 4,
  },
  'agent-loops-goals': {
    competencies: 65,
    modules: 13,
    activities: 135,
    projects: 4,
  },
  'agent-skills-mcp': {
    competencies: 75,
    modules: 15,
    activities: 155,
    projects: 4,
  },
  'repository-quality-gates': {
    competencies: 75,
    modules: 15,
    activities: 155,
    projects: 4,
  },
  'python-functional': {
    competencies: 60,
    modules: 12,
    activities: 125,
    projects: 4,
  },
  'python-dsa': { competencies: 80, modules: 16, activities: 165, projects: 4 },
  'python-dsa-2': {
    competencies: 80,
    modules: 16,
    activities: 165,
    projects: 4,
  },
  'linux-basics': {
    competencies: 70,
    modules: 14,
    activities: 145,
    projects: 4,
  },
  'git-basics': { competencies: 70, modules: 14, activities: 145, projects: 4 },
  'sql-basics': { competencies: 80, modules: 16, activities: 165, projects: 4 },
  'go-basics': { competencies: 90, modules: 18, activities: 186, projects: 5 },
  'http-clients-go': {
    competencies: 90,
    modules: 18,
    activities: 186,
    projects: 5,
  },
  'http-clients-typescript': {
    competencies: 90,
    modules: 18,
    activities: 186,
    projects: 5,
  },
  'http-clients-python': {
    competencies: 90,
    modules: 18,
    activities: 186,
    projects: 5,
  },
  'docker-basics': {
    competencies: 90,
    modules: 18,
    activities: 186,
    projects: 5,
  },
  'kubernetes-basics': {
    competencies: 105,
    modules: 21,
    activities: 216,
    projects: 5,
  },
  'cicd-github-actions': {
    competencies: 100,
    modules: 20,
    activities: 206,
    projects: 5,
  },
  'git-advanced': {
    competencies: 100,
    modules: 20,
    activities: 206,
    projects: 5,
  },
  'http-servers-go': {
    competencies: 105,
    modules: 21,
    activities: 216,
    projects: 5,
  },
  'http-servers-typescript': {
    competencies: 120,
    modules: 24,
    activities: 246,
    projects: 5,
  },
  'http-protocol-go': {
    competencies: 120,
    modules: 24,
    activities: 246,
    projects: 5,
  },
  'pubsub-rabbitmq-typescript': {
    competencies: 135,
    modules: 27,
    activities: 276,
    projects: 5,
  },
  'pubsub-rabbitmq-go': {
    competencies: 135,
    modules: 27,
    activities: 276,
    projects: 5,
  },
  'file-servers-s3-go': {
    competencies: 140,
    modules: 28,
    activities: 286,
    projects: 5,
  },
  'file-servers-s3-typescript': {
    competencies: 140,
    modules: 28,
    activities: 286,
    projects: 5,
  },
  'c-memory-management': {
    competencies: 140,
    modules: 28,
    activities: 286,
    projects: 5,
  },
  'cryptography-go': {
    competencies: 140,
    modules: 28,
    activities: 286,
    projects: 5,
  },
  'rag-retrieval-augmented-generation': {
    competencies: 150,
    modules: 30,
    activities: 306,
    projects: 5,
  },
  'build-bookbot-python': {
    competencies: 90,
    modules: 18,
    activities: 186,
    projects: 5,
  },
  'build-asteroids-python': {
    competencies: 120,
    modules: 24,
    activities: 246,
    projects: 5,
  },
  'build-static-site-python': {
    competencies: 120,
    modules: 24,
    activities: 246,
    projects: 5,
  },
  'build-maze-solver-python': {
    competencies: 120,
    modules: 24,
    activities: 246,
    projects: 5,
  },
  'build-web-scraper-python': {
    competencies: 150,
    modules: 30,
    activities: 306,
    projects: 5,
  },
  'build-ai-agent-python': {
    competencies: 150,
    modules: 30,
    activities: 306,
    projects: 5,
  },
  'build-pokedex-go': {
    competencies: 120,
    modules: 24,
    activities: 246,
    projects: 5,
  },
  'build-pokedex-typescript': {
    competencies: 125,
    modules: 25,
    activities: 256,
    projects: 5,
  },
  'build-blog-aggregator-go': {
    competencies: 150,
    modules: 30,
    activities: 306,
    projects: 5,
  },
  'build-blog-aggregator-typescript': {
    competencies: 160,
    modules: 32,
    activities: 326,
    projects: 5,
  },
  'build-web-scraper-go': {
    competencies: 150,
    modules: 30,
    activities: 306,
    projects: 5,
  },
  'build-web-scraper-typescript': {
    competencies: 160,
    modules: 32,
    activities: 326,
    projects: 5,
  },
} as const;

const expectedPrerequisites: Record<string, string[]> = {
  'python-basics': [],
  'python-oop': ['python-basics'],
  'comptia-network-plus': [],
  'applied-mathematics-beginner': [],
  'applied-mathematics-intermediate': ['applied-mathematics-beginner'],
  'applied-mathematics-advanced': ['applied-mathematics-intermediate'],
  'prompt-engineering-claude-codex': [],
  'agent-loops-goals': ['prompt-engineering-claude-codex'],
  'agent-skills-mcp': ['prompt-engineering-claude-codex'],
  'repository-quality-gates': [],
  'python-functional': ['python-basics', 'python-oop'],
  'python-dsa': ['python-basics', 'python-oop'],
  'python-dsa-2': ['python-dsa'],
  'linux-basics': [],
  'git-basics': ['linux-basics'],
  'sql-basics': [],
  'go-basics': [],
  'http-clients-go': ['go-basics'],
  'http-clients-typescript': ['typescript-basics'],
  'http-clients-python': ['python-basics'],
  'docker-basics': ['linux-basics'],
  'kubernetes-basics': ['docker-basics'],
  'cicd-github-actions': [
    'git-basics',
    'repository-quality-gates',
    'typescript-basics',
    'docker-basics',
  ],
  'git-advanced': ['git-basics'],
  'http-servers-go': ['http-clients-go', 'sql-basics'],
  'http-servers-typescript': ['http-clients-typescript', 'sql-basics'],
  'http-protocol-go': ['http-servers-go'],
  'pubsub-rabbitmq-typescript': ['http-servers-typescript'],
  'pubsub-rabbitmq-go': ['http-servers-go'],
  'file-servers-s3-go': ['http-servers-go'],
  'file-servers-s3-typescript': ['http-servers-typescript'],
  'c-memory-management': ['python-dsa'],
  'cryptography-go': ['go-basics'],
  'rag-retrieval-augmented-generation': ['python-basics', 'python-oop'],
  'build-bookbot-python': ['python-basics', 'git-basics'],
  'build-asteroids-python': ['python-basics', 'python-oop'],
  'build-static-site-python': [
    'python-basics',
    'python-oop',
    'responsive-web-design',
    'git-basics',
  ],
  'build-maze-solver-python': ['python-basics', 'python-dsa'],
  'build-web-scraper-python': [
    'python-basics',
    'python-dsa',
    'http-clients-python',
    'responsive-web-design',
    'git-basics',
  ],
  'build-ai-agent-python': [
    'python-basics',
    'python-functional',
    'http-clients-python',
    'prompt-engineering-claude-codex',
    'agent-loops-goals',
    'git-basics',
  ],
  'build-pokedex-go': ['go-basics', 'http-clients-go', 'git-basics', 'repository-quality-gates'],
  'build-pokedex-typescript': [
    'typescript-basics',
    'http-clients-typescript',
    'git-basics',
    'repository-quality-gates',
  ],
  'build-blog-aggregator-go': [
    'go-basics',
    'http-clients-go',
    'http-servers-go',
    'sql-basics',
    'git-basics',
    'repository-quality-gates',
    'docker-basics',
  ],
  'build-blog-aggregator-typescript': [
    'typescript-basics',
    'http-clients-typescript',
    'http-servers-typescript',
    'sql-basics',
    'git-basics',
    'repository-quality-gates',
    'docker-basics',
  ],
  'build-web-scraper-go': [
    'go-basics',
    'http-clients-go',
    'responsive-web-design',
    'git-basics',
    'repository-quality-gates',
  ],
  'build-web-scraper-typescript': [
    'typescript-basics',
    'http-clients-typescript',
    'responsive-web-design',
    'git-basics',
    'repository-quality-gates',
  ],
};

function normalized(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

describe('platform course blueprints', () => {
  for (const [courseId, expected] of Object.entries(expectations)) {
    it(`${courseId} has a complete ordered cumulative plan`, () => {
      const blueprint = CourseBlueprintSchema.parse(
        JSON.parse(readFileSync(path.join(process.cwd(), 'blueprints', `${courseId}.json`), 'utf8'))
      );

      expect(auditCourseBlueprint(blueprint)).toEqual([]);
      expect(blueprint.status).toBe('approved');
      expect(blueprint.competencies).toHaveLength(expected.competencies);
      expect(blueprint.modules).toHaveLength(expected.modules);
      expect(blueprint.modules.reduce((total, module) => total + module.activities.length, 0)).toBe(
        expected.activities
      );
      expect(blueprint.projects).toHaveLength(expected.projects);
      expect(blueprint.pathways.prerequisiteCourseIds).toEqual(expectedPrerequisites[courseId]);
      expect(blueprint.pathways.placementEvidence.length).toBeGreaterThan(0);
      expect(blueprint.pathways.completionEvidence.length).toBeGreaterThanOrEqual(2);
      expect(
        new Set(blueprint.modules.flatMap((module) => module.activities.map((entry) => entry.kind)))
      ).toEqual(
        new Set(['theory', 'workshop', 'debug', 'lab', 'review', 'quiz', 'project', 'exam'])
      );

      if (
        courseId.startsWith('applied-mathematics-') ||
        [
          'prompt-engineering-claude-codex',
          'agent-loops-goals',
          'agent-skills-mcp',
          'repository-quality-gates',
          'python-functional',
          'python-dsa',
          'python-dsa-2',
          'linux-basics',
          'git-basics',
          'sql-basics',
          'go-basics',
          'http-clients-go',
          'http-clients-typescript',
          'http-clients-python',
          'docker-basics',
          'kubernetes-basics',
          'cicd-github-actions',
          'http-servers-go',
          'http-servers-typescript',
          'http-protocol-go',
          'pubsub-rabbitmq-typescript',
          'pubsub-rabbitmq-go',
          'file-servers-s3-go',
          'file-servers-s3-typescript',
          'c-memory-management',
          'cryptography-go',
          'rag-retrieval-augmented-generation',
          'build-bookbot-python',
          'build-asteroids-python',
          'build-static-site-python',
          'build-maze-solver-python',
          'build-web-scraper-python',
          'build-ai-agent-python',
          'build-pokedex-go',
          'build-pokedex-typescript',
          'build-blog-aggregator-go',
          'build-blog-aggregator-typescript',
          'build-web-scraper-go',
          'build-web-scraper-typescript',
        ].includes(courseId)
      ) {
        const requiredModuleKinds = [
          'theory',
          'workshop',
          'debug',
          'lab',
          'review',
          'quiz',
        ] as const;
        for (const module of blueprint.modules) {
          const moduleKinds = new Set(module.activities.map((activity) => activity.kind));
          for (const kind of requiredModuleKinds) expect(moduleKinds.has(kind)).toBe(true);
        }
      }
    });
  }

  it('does not duplicate competency, module, or project concepts across the portfolio', () => {
    const courseIds = ['responsive-web-design', ...Object.keys(expectations)];
    const seen = {
      competency: new Set<string>(),
      module: new Set<string>(),
      project: new Set<string>(),
    };

    for (const courseId of courseIds) {
      const blueprint = CourseBlueprintSchema.parse(
        JSON.parse(readFileSync(path.join(process.cwd(), 'blueprints', `${courseId}.json`), 'utf8'))
      );
      for (const competency of blueprint.competencies) {
        const key = normalized(competency.statement);
        expect(seen.competency.has(key), `duplicate competency: ${competency.statement}`).toBe(
          false
        );
        seen.competency.add(key);
      }
      for (const module of blueprint.modules) {
        const key = normalized(module.title);
        expect(seen.module.has(key), `duplicate module: ${module.title}`).toBe(false);
        seen.module.add(key);
      }
      for (const project of blueprint.projects) {
        const key = normalized(project.title);
        expect(seen.project.has(key), `duplicate project: ${project.title}`).toBe(false);
        seen.project.add(key);
      }
    }
  });
});
