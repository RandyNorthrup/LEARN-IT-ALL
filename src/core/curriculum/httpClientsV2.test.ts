import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { CourseBlueprintSchema } from './blueprint';
import { loadCurriculumGraph, validateCurriculumGraph } from './repository';

const courseExpectations = {
  'http-clients-go': {
    prefix: 'http-go',
    file: 'go',
    language: 'go',
    prerequisite: 'go-basics',
    starterBoundary: 'deterministic request and response models only',
    authority: 'Go 1.26 net/http',
  },
  'http-clients-typescript': {
    prefix: 'http-ts',
    file: 'typescript',
    language: 'typescript',
    prerequisite: 'typescript-basics',
    starterBoundary: 'strict diagnostics and deterministic contract modeling only',
    authority: 'WHATWG Fetch',
  },
  'http-clients-python': {
    prefix: 'http-py',
    file: 'python',
    language: 'python',
    prerequisite: 'python-basics',
    starterBoundary: 'deterministic request and response models only',
    authority: 'Python 3.14 urllib',
  },
} as const;

const moduleSuffixes = [
  'semantics-evidence',
  'uris-origins-dns',
  'requests-methods',
  'fields-representations',
  'responses-errors',
  'body-streams-limits',
  'tls-trust',
  'redirects-policy',
  'cookies-auth-secrets',
  'caching-validation',
  'timeouts-cancellation',
  'retries-backoff',
  'connections-protocols',
  'api-traversal-rates',
  'client-architecture',
  'security-boundaries',
  'testing-observability',
  'performance-release-defense',
];

const similarityStopWords = new Set(
  'the a an and or to of in for with this that from as is are be before after one evidence target case http client decision demonstrate without through result into while then current changed keep connected executable task implementing it competency probe'.split(
    ' '
  )
);

function contentTerms(value: string): Set<string> {
  return new Set(
    value
      .toLowerCase()
      .replace(/https?:\/\/\S+/g, ' ')
      .replace(/[^a-z0-9]+/g, ' ')
      .split(' ')
      .filter((word) => word.length > 2 && !similarityStopWords.has(word))
  );
}

function jaccard(left: Set<string>, right: Set<string>): number {
  let intersection = 0;
  for (const term of left) if (right.has(term)) intersection += 1;
  return intersection / (left.size + right.size - intersection);
}

describe('HTTP client v2 course family', () => {
  for (const [courseId, expected] of Object.entries(courseExpectations)) {
    const graph = loadCurriculumGraph(courseId);
    const blueprint = CourseBlueprintSchema.parse(
      JSON.parse(readFileSync(path.join(process.cwd(), 'blueprints', `${courseId}.json`), 'utf8'))
    );

    it(`${courseId} follows the researched protocol-to-production sequence`, () => {
      expect(graph.course.moduleIds).toEqual(
        moduleSuffixes.map((suffix) => `${expected.prefix}-${suffix}`)
      );
      expect(graph.course.competencies).toHaveLength(90);
      expect(graph.modules).toHaveLength(18);
      expect(graph.activities).toHaveLength(186);
      expect(graph.activities.reduce((total, activity) => total + activity.steps.length, 0)).toBe(
        1514
      );
      expect(graph.course.credential.requiredProjectIds).toHaveLength(5);
      expect(graph.course.status).toBe('preview');
    });

    it(`${courseId} is schema-valid, prerequisite-ordered, cumulative, and interaction-complete`, () => {
      expect(validateCurriculumGraph(graph)).toEqual([]);
      expect(graph.course.prerequisites).toEqual([expected.prerequisite]);
      expect(blueprint.pathways.prerequisiteCourseIds).toEqual([expected.prerequisite]);
      expect(graph.activities.at(-1)?.id).toBe(`${courseId}-certification-exam`);
      expect(new Set(graph.activities.map((activity) => activity.kind))).toEqual(
        new Set(['theory', 'workshop', 'debug', 'lab', 'review', 'quiz', 'project', 'exam'])
      );
      expect(
        graph.activities.every((activity, index) =>
          index === 0 ? activity.prerequisites.length === 0 : activity.prerequisites.length === 1
        )
      ).toBe(true);

      for (const module of blueprint.modules) {
        const practiceContexts = module.activities
          .filter((activity) =>
            ['workshop', 'debug', 'lab', 'review', 'quiz'].includes(activity.kind)
          )
          .map((activity) => ({
            kind: activity.kind,
            terms: contentTerms(activity.authenticContext),
          }));
        expect(practiceContexts).toHaveLength(5);
        for (const [index, left] of practiceContexts.entries()) {
          for (const right of practiceContexts.slice(index + 1)) {
            expect(
              jaccard(left.terms, right.terms),
              `${courseId}/${module.id} reuses ${left.kind} as ${right.kind}`
            ).toBeLessThan(0.72);
          }
        }
      }
    });

    it(`${courseId} gives every coding increment a scoped executable evidence contract`, () => {
      const codeSteps = graph.activities.flatMap((activity) =>
        activity.steps
          .map((step) => ({ activity, step }))
          .filter(({ step }) => step.interaction === 'code')
      );

      expect(codeSteps.length).toBeGreaterThan(100);
      expect(codeSteps.every(({ step }) => step.targetFile === expected.file)).toBe(true);
      expect(
        codeSteps.every(({ activity, step }) => {
          const checks = activity.checks.filter((check) => step.checkIds.includes(check.id));
          const marker = checks.find((check) => check.type === 'source-includes');
          const structure = checks.find((check) => check.type === 'source-matches');
          const example = step.content.find((block) => block.type === 'code');
          return (
            marker?.type === 'source-includes' &&
            marker.file === expected.file &&
            marker.expected.replaceAll('_', '-').includes(expected.prefix) &&
            structure?.type === 'source-matches' &&
            structure.file === expected.file &&
            example?.type === 'code' &&
            example.language === expected.language &&
            new RegExp(structure.pattern, structure.flags).test(example.code)
          );
        })
      ).toBe(true);
      expect(
        graph.activities.every((activity) =>
          activity.starterFiles?.[expected.file].includes(expected.starterBoundary)
        )
      ).toBe(true);

      const theorySignatures = graph.modules.map((module) => {
        const example = graph.activities
          .filter((activity) => activity.moduleId === module.id && activity.kind === 'theory')
          .flatMap((activity) => activity.steps)
          .find((step) => step.interaction === 'code')
          ?.content.find((block) => block.type === 'code');
        expect(example?.type).toBe('code');
        const signature =
          example?.type === 'code'
            ? example.code.match(/(?:function|func|def)\s+\w+(?:\[[^\]]+\])?\s*\(([^)]*)\)/)?.[1]
            : undefined;
        expect(signature).toBeTruthy();
        return signature;
      });
      expect(new Set(theorySignatures).size).toBe(18);
      expect(
        codeSteps.every(({ step }) => {
          const example = step.content.find((block) => block.type === 'code');
          if (example?.type !== 'code') return false;
          return !/(?:status\s*:\s*number,\s*bodyBytes|status\s+int,\s*bodyBytes|status\s*:\s*int,\s*body_bytes)/.test(
            example.code
          );
        })
      ).toBe(true);
    });

    it(`${courseId} routes current research to the governing authority`, () => {
      const evidenceForModule = (suffix: string) =>
        graph.activities
          .filter((activity) => activity.moduleId === `${expected.prefix}-${suffix}`)
          .flatMap((activity) =>
            activity.steps.flatMap((step) =>
              step.content.flatMap((block) => (block.type === 'evidence' ? [block.value] : []))
            )
          );

      expect(
        evidenceForModule('uris-origins-dns').some((value) => value.includes('RFC 3986'))
      ).toBe(true);
      expect(
        evidenceForModule('caching-validation').some((value) => value.includes('RFC 9111'))
      ).toBe(true);
      expect(
        evidenceForModule('security-boundaries').some((value) => value.includes('OWASP SSRF'))
      ).toBe(true);
      expect(
        evidenceForModule('testing-observability').some((value) => value.includes('OpenTelemetry'))
      ).toBe(true);
      expect(
        evidenceForModule('client-architecture').some((value) => value.includes(expected.authority))
      ).toBe(true);
    });

    it(`${courseId} keeps browser work deterministic and live-network transfer explicit`, () => {
      const sources = graph.activities.flatMap((activity) => [
        activity.starterFiles?.[expected.file] ?? '',
        ...activity.steps.flatMap((step) =>
          step.content.flatMap((block) => (block.type === 'code' ? [block.code] : []))
        ),
      ]);
      const forbidden =
        expected.file === 'go'
          ? /["']net\/http["']/
          : expected.file === 'typescript'
            ? /\bfetch\s*\(/
            : /\b(?:urlopen|HTTPConnection|HTTPSConnection)\s*\(/;

      expect(sources.length).toBeGreaterThan(300);
      expect(sources.every((source) => !forbidden.test(source))).toBe(true);
      expect(blueprint.audience.deviceConstraints.join(' ')).toContain('transfer');
    });
  }

  it('uses different scenarios, projects, evidence prose, and markers for each language track', () => {
    const graphs = Object.keys(courseExpectations).map((courseId) => loadCurriculumGraph(courseId));
    const values = {
      modules: graphs.flatMap((graph) => graph.modules.map((module) => module.title)),
      projects: graphs.flatMap((graph) => graph.course.credential.requiredProjectIds),
      signatures: graphs.flatMap((graph) =>
        graph.activities.map((activity) => `${activity.title}\n${activity.summary}`)
      ),
      markers: graphs.flatMap((graph) =>
        graph.activities.flatMap((activity) =>
          activity.checks.flatMap((check) =>
            check.type === 'source-includes' ? [check.expected] : []
          )
        )
      ),
      instructions: graphs.flatMap((graph) =>
        graph.activities.flatMap((activity) => activity.steps.map((step) => step.instruction))
      ),
    };

    for (const collection of Object.values(values)) {
      expect(new Set(collection).size).toBe(collection.length);
    }

    const comparableActivities = graphs.flatMap((graph) =>
      graph.activities.map((activity) => ({
        id: activity.id,
        kind: activity.kind,
        terms: contentTerms(
          `${activity.title} ${activity.summary} ${activity.steps
            .map((step) => step.instruction)
            .join(' ')}`
        ),
      }))
    );
    let closest = { score: 0, left: '', right: '' };
    for (const [index, left] of comparableActivities.entries()) {
      for (const right of comparableActivities.slice(index + 1)) {
        if (left.kind !== right.kind) continue;
        const score = jaccard(left.terms, right.terms);
        if (score > closest.score) closest = { score, left: left.id, right: right.id };
      }
    }
    expect(
      closest.score,
      `suspicious near-duplicate activities: ${closest.left} and ${closest.right}`
    ).toBeLessThan(0.93);
  });
});
