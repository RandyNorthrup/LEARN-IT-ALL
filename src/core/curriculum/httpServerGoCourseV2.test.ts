import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { auditCourseBlueprint, CourseBlueprintSchema } from './blueprint';
import { loadCurriculumGraph, validateCurriculumGraph } from './repository';

const moduleIds = [
  'http-server-go-outcomes-lifecycle',
  'http-server-go-semantics-resources',
  'http-server-go-servemux-routing',
  'http-server-go-handlers-middleware-architecture',
  'http-server-go-request-target-host-proxy',
  'http-server-go-fields-representations-cache',
  'http-server-go-bodies-json-uploads',
  'http-server-go-responses-problems-streams',
  'http-server-go-context-deadlines-cleanup',
  'http-server-go-server-protocols-timeouts',
  'http-server-go-concurrency-backpressure-limits',
  'http-server-go-sql-repositories-transactions',
  'http-server-go-resource-apis-consistency',
  'http-server-go-authentication-sessions-tokens',
  'http-server-go-authorization-tenancy',
  'http-server-go-browser-cors-csrf-cookies',
  'http-server-go-webhooks-abuse-ssrf',
  'http-server-go-reverse-proxy-smuggling',
  'http-server-go-testing-fuzz-race',
  'http-server-go-observability-health-performance',
  'http-server-go-contracts-versioning-release',
];

const similarityStopWords = new Set(
  'the a an and or to of in for with this that from as is are be before after one go http server evidence current changed case team browser code model decision build deterministic production transfer gate competency probe request response'.split(
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

function evidenceForModule(moduleId: string): string[] {
  return graph.activities
    .filter((activity) => activity.moduleId === moduleId)
    .flatMap((activity) =>
      activity.steps.flatMap((step) =>
        step.content.flatMap((block) => (block.type === 'evidence' ? [block.value] : []))
      )
    );
}

const graph = loadCurriculumGraph('http-servers-go');
const blueprint = CourseBlueprintSchema.parse(
  JSON.parse(readFileSync(path.join(process.cwd(), 'blueprints', 'http-servers-go.json'), 'utf8'))
);

describe('HTTP Servers in Go 1.26 v2 course', () => {
  it('follows the lifecycle-to-production prerequisite sequence at full depth', () => {
    expect(graph.course.moduleIds).toEqual(moduleIds);
    expect(graph.course.competencies).toHaveLength(105);
    expect(graph.modules).toHaveLength(21);
    expect(graph.activities).toHaveLength(216);
    expect(graph.activities.reduce((total, activity) => total + activity.steps.length, 0)).toBe(
      1762
    );
    expect(graph.activities.reduce((total, activity) => total + activity.checks.length, 0)).toBe(
      1936
    );
    expect(graph.course.credential.requiredProjectIds).toHaveLength(5);
    expect(graph.activities.at(-1)?.id).toBe('http-servers-go-certification-exam');
  });

  it('is schema-valid, audited, cumulative, prerequisite-gated, and interaction-complete', () => {
    expect(validateCurriculumGraph(graph)).toEqual([]);
    expect(auditCourseBlueprint(blueprint)).toEqual([]);
    expect(blueprint.status).toBe('audit-required');
    expect(blueprint.pathways.prerequisiteCourseIds).toEqual(['http-clients-go', 'sql-basics']);
    expect(graph.course.prerequisites).toEqual(['http-clients-go', 'sql-basics']);
    expect(new Set(graph.activities.map((activity) => activity.kind))).toEqual(
      new Set(['theory', 'workshop', 'debug', 'lab', 'review', 'quiz', 'project', 'exam'])
    );
    expect(
      graph.activities.every((activity, index) =>
        index === 0 ? activity.prerequisites.length === 0 : activity.prerequisites.length === 1
      )
    ).toBe(true);
    expect(
      blueprint.competencies.every(
        (competency) =>
          competency.misconceptions.length > 0 &&
          competency.misconceptions.every((misconception) => misconception.length >= 24)
      )
    ).toBe(true);

    for (const module of blueprint.modules) {
      const practiceContexts = module.activities
        .filter((activity) =>
          ['workshop', 'debug', 'lab', 'review', 'quiz'].includes(activity.kind)
        )
        .map((activity) => ({ id: activity.id, terms: contentTerms(activity.authenticContext) }));
      expect(practiceContexts).toHaveLength(5);
      for (const [index, left] of practiceContexts.entries()) {
        for (const right of practiceContexts.slice(index + 1)) {
          expect(
            jaccard(left.terms, right.terms),
            `${module.id} repeats ${left.id} as ${right.id}`
          ).toBeLessThan(0.72);
        }
      }
    }
  });

  it('gives every server increment an exact compile-ready changed-case evidence contract', () => {
    const codeSteps = graph.activities.flatMap((activity) =>
      activity.steps
        .map((step) => ({ activity, step }))
        .filter(({ step }) => step.interaction === 'code')
    );

    expect(codeSteps).toHaveLength(174);
    expect(codeSteps.every(({ step }) => step.targetFile === 'go')).toBe(true);
    expect(
      codeSteps.every(({ activity, step }) => {
        const checks = activity.checks.filter((check) => step.checkIds.includes(check.id));
        const marker = checks.find((check) => check.type === 'source-includes');
        const structure = checks.find((check) => check.type === 'source-matches');
        const example = step.content.find((block) => block.type === 'code');
        return (
          marker?.type === 'source-includes' &&
          marker.file === 'go' &&
          marker.expected.includes('// Evidence: httpsgo-') &&
          structure?.type === 'source-matches' &&
          structure.file === 'go' &&
          example?.type === 'code' &&
          example.language === 'go' &&
          example.code.includes('// Changed case:') &&
          new RegExp(structure.pattern, structure.flags).test(example.code)
        );
      })
    ).toBe(true);
    expect(
      graph.activities.every(
        (activity) =>
          activity.starterFiles?.go.includes('deterministic pure-Go request') &&
          activity.starterFiles.go.includes('explicit authorized Go 1.26 transfer gates')
      )
    ).toBe(true);

    const examples = codeSteps.map(({ step }) => {
      const block = step.content.find((entry) => entry.type === 'code');
      return block?.type === 'code' ? block.code : '';
    });
    expect(new Set(examples).size).toBe(examples.length);
    const exampleTerms = examples.map(contentTerms);
    let closest = { score: 0, left: 0, right: 0 };
    for (const [index, left] of exampleTerms.entries()) {
      for (const [offset, right] of exampleTerms.slice(index + 1).entries()) {
        const score = jaccard(left, right);
        if (score > closest.score) closest = { score, left: index, right: index + offset + 1 };
      }
    }
    expect(
      closest.score,
      `near-duplicate server evidence examples ${closest.left} and ${closest.right}`
    ).toBeLessThan(0.9);
  });

  it('parses every Go lesson block and compiles every exact learner evidence function', () => {
    const codeBlocks = graph.activities.flatMap((activity) =>
      activity.steps.flatMap((step) =>
        step.content.flatMap((block) =>
          block.type === 'code' && block.language === 'go' ? [block.code] : []
        )
      )
    );
    expect(codeBlocks.length).toBeGreaterThan(250);
    const goRoot = spawnSync('go', ['env', 'GOROOT'], { encoding: 'utf8' });
    expect(goRoot.status, goRoot.stderr).toBe(0);
    const gofmt = path.join(goRoot.stdout.trim(), 'bin', 'gofmt');
    for (const source of codeBlocks) {
      const parsed = spawnSync(gofmt, {
        input: `package main\n${source}\n`,
        encoding: 'utf8',
      });
      expect(parsed.status, parsed.stderr).toBe(0);
    }

    const exactFunctions = graph.activities.flatMap((activity) =>
      activity.steps.flatMap((step) =>
        step.interaction === 'code'
          ? step.content.flatMap((block) =>
              block.type === 'code' && block.language === 'go' ? [block.code] : []
            )
          : []
      )
    );
    const directory = mkdtempSync(path.join(tmpdir(), 'learn-it-all-http-server-go-'));
    try {
      writeFileSync(
        path.join(directory, 'go.mod'),
        'module example.test/httpserverevidence\n\ngo 1.26\n'
      );
      writeFileSync(
        path.join(directory, 'evidence_test.go'),
        `package httpserverevidence\n\n${exactFunctions.join('\n\n')}\n`
      );
      const result = spawnSync('go', ['test', './...'], {
        cwd: directory,
        encoding: 'utf8',
        env: { ...process.env, GOWORK: 'off' },
      });
      expect(result.status, result.stderr || result.stdout).toBe(0);
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  }, 30_000);

  it('keeps browser execution pure while naming real transfer gates', () => {
    const sources = graph.activities.flatMap((activity) => [
      activity.starterFiles?.go ?? '',
      ...activity.steps.flatMap((step) =>
        step.content.flatMap((block) => (block.type === 'code' ? [block.code] : []))
      ),
    ]);
    const forbidden =
      /import\s+["'(]*(?:net|net\/http|database\/sql|os|os\/exec)|\b(?:ListenAndServe|ServeTLS|sql\.Open|exec\.Command|net\.Listen)\s*\(/;

    expect(sources.length).toBeGreaterThan(400);
    expect(sources.every((source) => !forbidden.test(source))).toBe(true);
    const transferText = `${blueprint.audience.deviceConstraints.join(' ')} ${blueprint.scope.includes.join(' ')} ${blueprint.scope.excludes.join(' ')}`;
    expect(transferText).toContain('listener');
    expect(transferText).toContain('TLS');
    expect(transferText).toContain('PostgreSQL');
    expect(transferText).toContain('proxy');
    expect(transferText).toContain('load');
    expect(transferText).toContain('production');
  });

  it('routes versioned primary research to each governing server boundary', () => {
    const expectations: Array<[string, string]> = [
      ['http-server-go-server-protocols-timeouts', 'Go 1.26.5 net/http Package'],
      ['http-server-go-request-target-host-proxy', 'HTTP/1.1 Message Syntax'],
      ['http-server-go-fields-representations-cache', 'HTTP Caching'],
      ['http-server-go-responses-problems-streams', 'Problem Details'],
      ['http-server-go-sql-repositories-transactions', 'PostgreSQL 18.4'],
      ['http-server-go-authentication-sessions-tokens', 'OAuth 2.0 Security'],
      ['http-server-go-authorization-tenancy', 'OWASP API Security'],
      ['http-server-go-testing-fuzz-race', 'Security Best Practices'],
      ['http-server-go-observability-health-performance', 'OpenTelemetry HTTP'],
      ['http-server-go-contracts-versioning-release', 'OpenAPI Specification'],
    ];
    for (const [moduleId, title] of expectations) {
      expect(evidenceForModule(moduleId).some((value) => value.includes(title))).toBe(true);
    }

    expect(blueprint.version).toBe('2026.07');
    expect(blueprint.researchedAt.startsWith('2026-07-14')).toBe(true);
    expect(blueprint.sources).toHaveLength(16);
    expect(blueprint.sources.every((source) => source.reviewedAt === '2026-07-14')).toBe(true);
    expect(blueprint.sources.some((source) => source.version.includes('Go 1.26.5'))).toBe(true);
    expect(blueprint.sources.some((source) => source.version.includes('OpenAPI 3.2.0'))).toBe(true);
    expect(blueprint.sources.some((source) => source.version.includes('PostgreSQL 18.4'))).toBe(
      true
    );
  });

  it('covers distinct security, browser, proxy, protocol, data, and release misconceptions', () => {
    const corpus =
      `${blueprint.modules.map((module) => `${module.id} ${module.title}`).join(' ')} ${blueprint.competencies
        .flatMap((competency) => [competency.statement, ...competency.misconceptions])
        .join(' ')}`.toLowerCase();
    for (const phrase of [
      'cors',
      'crossoriginprotection',
      'request forgery',
      'issuer',
      'audience',
      'authorization',
      'ssrf',
      'reverseproxy.rewrite',
      'director',
      'request smuggling',
      'ambiguous commit',
      'openapi 3.2',
      'http/3',
    ]) {
      expect(corpus).toContain(phrase);
    }
  });
});
