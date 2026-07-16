import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';
import { auditCourseBlueprint, CourseBlueprintSchema } from './blueprint';
import { loadCurriculumGraph, validateCurriculumGraph } from './repository';

const moduleIds = [
  'http-server-ts-outcomes-toolchain',
  'http-server-ts-node-runtime-lifecycle',
  'http-server-ts-http-semantics-resources',
  'http-server-ts-node-http-protocol-timeouts',
  'http-server-ts-express-routing-paths',
  'http-server-ts-middleware-errors-architecture',
  'http-server-ts-runtime-validation-types',
  'http-server-ts-request-authority-proxy',
  'http-server-ts-fields-representations-cache',
  'http-server-ts-bodies-webhooks-uploads',
  'http-server-ts-responses-problems-streaming',
  'http-server-ts-async-context-cancellation',
  'http-server-ts-concurrency-backpressure-workers',
  'http-server-ts-postgres-pools-transactions',
  'http-server-ts-resource-apis-consistency',
  'http-server-ts-authentication-sessions-jose',
  'http-server-ts-authorization-tenancy',
  'http-server-ts-browser-cors-csrf-cookies',
  'http-server-ts-webhooks-ssrf-abuse',
  'http-server-ts-proxy-framing-smuggling',
  'http-server-ts-testing-contracts-fuzz',
  'http-server-ts-observability-health',
  'http-server-ts-performance-capacity',
  'http-server-ts-openapi-release-recovery',
];

const similarityStopWords = new Set(
  'the a an and or to of in for with this that from as is are be before after one node express typescript http server evidence current changed case team browser code model decision build deterministic production transfer gate competency probe request response'.split(
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

function compileSources(sources: Array<{ label: string; source: string }>): string[] {
  const options: ts.CompilerOptions = {
    strict: true,
    noEmit: true,
    noUncheckedIndexedAccess: true,
    exactOptionalPropertyTypes: true,
    target: ts.ScriptTarget.ES2024,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    skipLibCheck: true,
  };
  const files = new Map(
    sources.map((entry, index) => [
      `/http-server-typescript-${index}.ts`,
      { ...entry, source: `${entry.source}\nexport {};` },
    ])
  );
  const defaultHost = ts.createCompilerHost(options, true);
  const host: ts.CompilerHost = {
    ...defaultHost,
    fileExists: (fileName) => files.has(fileName) || defaultHost.fileExists(fileName),
    readFile: (fileName) => files.get(fileName)?.source ?? defaultHost.readFile(fileName),
    getSourceFile: (fileName, languageVersion) => {
      const learnerFile = files.get(fileName);
      return learnerFile
        ? ts.createSourceFile(fileName, learnerFile.source, languageVersion, true, ts.ScriptKind.TS)
        : defaultHost.getSourceFile(fileName, languageVersion);
    },
    writeFile: () => undefined,
  };
  const program = ts.createProgram([...files.keys()], options, host);
  return ts
    .getPreEmitDiagnostics(program)
    .filter((diagnostic) => diagnostic.file && files.has(diagnostic.file.fileName))
    .map((diagnostic) => {
      const file = diagnostic.file;
      const learnerFile = file ? files.get(file.fileName) : undefined;
      const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
      if (!file || diagnostic.start === undefined) return `${learnerFile?.label}: ${message}`;
      const position = file.getLineAndCharacterOfPosition(diagnostic.start);
      return `${learnerFile?.label} line ${position.line + 1}, column ${position.character + 1}: ${message}`;
    });
}

const graph = loadCurriculumGraph('http-servers-typescript');
const blueprint = CourseBlueprintSchema.parse(
  JSON.parse(
    readFileSync(path.join(process.cwd(), 'blueprints', 'http-servers-typescript.json'), 'utf8')
  )
);

describe('HTTP Servers in TypeScript Node 24 and Express 5 v2 course', () => {
  it('follows the runtime-to-recovery prerequisite sequence at full depth', () => {
    expect(graph.course.moduleIds).toEqual(moduleIds);
    expect(graph.course.competencies).toHaveLength(120);
    expect(graph.modules).toHaveLength(24);
    expect(graph.activities).toHaveLength(246);
    expect(graph.activities.reduce((total, activity) => total + activity.steps.length, 0)).toBe(
      2006
    );
    expect(graph.activities.reduce((total, activity) => total + activity.checks.length, 0)).toBe(
      2204
    );
    expect(graph.course.credential.requiredProjectIds).toHaveLength(5);
    expect(graph.activities.at(-1)?.id).toBe('http-servers-typescript-certification-exam');
  });

  it('is schema-valid, audited, cumulative, prerequisite-gated, and interaction-complete', () => {
    expect(validateCurriculumGraph(graph)).toEqual([]);
    expect(auditCourseBlueprint(blueprint)).toEqual([]);
    expect(blueprint.status).toBe('audit-required');
    expect(blueprint.pathways.prerequisiteCourseIds).toEqual([
      'http-clients-typescript',
      'sql-basics',
    ]);
    expect(graph.course.prerequisites).toEqual(['http-clients-typescript', 'sql-basics']);
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
      const contexts = module.activities
        .filter((activity) =>
          ['workshop', 'debug', 'lab', 'review', 'quiz'].includes(activity.kind)
        )
        .map((activity) => ({ id: activity.id, terms: contentTerms(activity.authenticContext) }));
      expect(contexts).toHaveLength(5);
      for (const [index, left] of contexts.entries()) {
        for (const right of contexts.slice(index + 1)) {
          expect(
            jaccard(left.terms, right.terms),
            `${module.id} repeats ${left.id} as ${right.id}`
          ).toBeLessThan(0.72);
        }
      }
    }
  });

  it('gives every server increment an exact compile-ready changed-case contract', () => {
    const codeSteps = graph.activities.flatMap((activity) =>
      activity.steps
        .map((step) => ({ activity, step }))
        .filter(({ step }) => step.interaction === 'code')
    );

    expect(codeSteps).toHaveLength(198);
    expect(codeSteps.every(({ step }) => step.targetFile === 'typescript')).toBe(true);
    expect(
      codeSteps.every(({ activity, step }) => {
        const checks = activity.checks.filter((check) => step.checkIds.includes(check.id));
        const marker = checks.find((check) => check.type === 'source-includes');
        const structure = checks.find((check) => check.type === 'source-matches');
        const example = step.content.find((block) => block.type === 'code');
        return (
          marker?.type === 'source-includes' &&
          marker.file === 'typescript' &&
          marker.expected.includes('// Evidence: httpsts-') &&
          structure?.type === 'source-matches' &&
          structure.file === 'typescript' &&
          example?.type === 'code' &&
          example.language === 'typescript' &&
          example.code.includes('// Changed case:') &&
          new RegExp(structure.pattern, structure.flags).test(example.code)
        );
      })
    ).toBe(true);
    expect(
      graph.activities.every(
        (activity) =>
          activity.starterFiles?.typescript.includes('deterministic pure-TypeScript request') &&
          activity.starterFiles.typescript.includes(
            'explicit authorized Node 24 and Express 5 transfer gates'
          )
      )
    ).toBe(true);

    const examples = codeSteps.map(({ step }) => {
      const block = step.content.find((entry) => entry.type === 'code');
      return block?.type === 'code' ? block.code : '';
    });
    expect(new Set(examples).size).toBe(examples.length);
    const terms = examples.map(contentTerms);
    let closest = { score: 0, left: 0, right: 0 };
    for (const [index, left] of terms.entries()) {
      for (const [offset, right] of terms.slice(index + 1).entries()) {
        const score = jaccard(left, right);
        if (score > closest.score) closest = { score, left: index, right: index + offset + 1 };
      }
    }
    expect(
      closest.score,
      `near-duplicate TypeScript server examples ${closest.left} and ${closest.right}`
    ).toBeLessThan(0.9);
  });

  it('strictly checks every lesson source and both compiler paths check exact builds', () => {
    const sources = graph.activities.flatMap((activity) => {
      const result: Array<{ label: string; source: string }> = [];
      if (activity.starterFiles?.typescript) {
        result.push({ label: `${activity.id} starter`, source: activity.starterFiles.typescript });
      }
      for (const [stepIndex, step] of activity.steps.entries()) {
        for (const [blockIndex, block] of step.content.entries()) {
          if (block.type !== 'code' || block.language !== 'typescript') continue;
          result.push({
            label: `${activity.id} step ${stepIndex + 1} block ${blockIndex + 1}`,
            source: block.code,
          });
        }
      }
      return result;
    });
    expect(sources.length).toBeGreaterThan(450);
    expect(compileSources(sources)).toEqual([]);

    const exactFunctions = graph.activities.flatMap((activity) =>
      activity.steps.flatMap((step) =>
        step.interaction === 'code'
          ? step.content.flatMap((block) =>
              block.type === 'code' && block.language === 'typescript' ? [block.code] : []
            )
          : []
      )
    );
    const directory = mkdtempSync(path.join(tmpdir(), 'learn-it-all-http-server-ts-'));
    try {
      const sourcePath = path.join(directory, 'evidence.ts');
      writeFileSync(sourcePath, `${exactFunctions.join('\n\n')}\nexport {};\n`);
      for (const binary of ['tsc', 'tsc6']) {
        const result = spawnSync(
          path.join(process.cwd(), 'node_modules', '.bin', binary),
          [
            '--strict',
            '--noEmit',
            '--skipLibCheck',
            '--target',
            'ES2024',
            '--module',
            'ESNext',
            '--moduleResolution',
            'Bundler',
            sourcePath,
          ],
          { cwd: directory, encoding: 'utf8' }
        );
        expect(result.status, `${binary}: ${result.stderr || result.stdout}`).toBe(0);
      }
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  }, 30_000);

  it('keeps browser execution pure while naming real transfer gates', () => {
    const sources = graph.activities.flatMap((activity) => [
      activity.starterFiles?.typescript ?? '',
      ...activity.steps.flatMap((step) =>
        step.content.flatMap((block) => (block.type === 'code' ? [block.code] : []))
      ),
    ]);
    const forbidden =
      /(?:from\s+|require\s*\()["'](?:node:|express|pg|jose)|\b(?:createServer|listen|fetch|Worker)\s*\(/u;
    expect(sources.length).toBeGreaterThan(450);
    expect(sources.every((source) => !forbidden.test(source))).toBe(true);
    const transferText = `${blueprint.audience.deviceConstraints.join(' ')} ${blueprint.scope.includes.join(' ')} ${blueprint.scope.excludes.join(' ')}`;
    for (const boundary of [
      'Node',
      'Express',
      'listener',
      'TLS',
      'PostgreSQL',
      'proxy',
      'worker',
      'load',
      'production',
    ]) {
      expect(transferText).toContain(boundary);
    }
  });

  it('routes versioned primary research to each governing boundary', () => {
    const expectations: Array<[string, string]> = [
      ['http-server-ts-outcomes-toolchain', 'Node.js 24.18.0 Release'],
      ['http-server-ts-node-runtime-lifecycle', 'Node.js 24 HTTP API'],
      ['http-server-ts-express-routing-paths', 'Express 5.2 API'],
      ['http-server-ts-runtime-validation-types', 'Zod 4 Documentation'],
      ['http-server-ts-request-authority-proxy', 'HTTP/1.1 Message Syntax'],
      ['http-server-ts-fields-representations-cache', 'HTTP Caching'],
      ['http-server-ts-responses-problems-streaming', 'Problem Details'],
      ['http-server-ts-postgres-pools-transactions', 'node-postgres Documentation'],
      ['http-server-ts-authentication-sessions-jose', 'jose Documentation'],
      ['http-server-ts-authorization-tenancy', 'OWASP API Security'],
      ['http-server-ts-observability-health', 'OpenTelemetry HTTP'],
      ['http-server-ts-openapi-release-recovery', 'OpenAPI Specification'],
    ];
    for (const [moduleId, title] of expectations) {
      expect(evidenceForModule(moduleId).some((value) => value.includes(title))).toBe(true);
    }

    expect(blueprint.version).toBe('2026.07');
    expect(blueprint.researchedAt.startsWith('2026-07-14')).toBe(true);
    expect(blueprint.sources).toHaveLength(21);
    expect(blueprint.sources.every((source) => source.reviewedAt === '2026-07-14')).toBe(true);
    for (const version of [
      'Node.js 24.18.0',
      'Express 5.2.1',
      'Zod 4.4.3',
      'node-postgres 8.22.0',
      'jose 6.2.3',
      'OpenAPI 3.2.0',
      'PostgreSQL 18.4',
    ]) {
      expect(blueprint.sources.some((source) => source.version.includes(version))).toBe(true);
    }
  });

  it('is not a renamed copy of the Go server course', () => {
    const goGraph = loadCurriculumGraph('http-servers-go');
    const normalizedStatements = (values: string[]) =>
      new Set(values.map((value) => [...contentTerms(value)].sort().join(' ')));
    const typescriptStatements = normalizedStatements(
      graph.course.competencies.map((competency) => competency.statement)
    );
    const goStatements = normalizedStatements(
      goGraph.course.competencies.map((competency) => competency.statement)
    );
    const identical = [...typescriptStatements].filter((statement) => goStatements.has(statement));
    expect(identical).toEqual([]);

    const corpus =
      `${blueprint.modules.map((entry) => `${entry.id} ${entry.title}`).join(' ')} ${blueprint.competencies
        .flatMap((competency) => [competency.statement, ...competency.misconceptions])
        .join(' ')}`.toLowerCase();
    for (const phrase of [
      'type stripping',
      'express 5',
      'wildcard',
      'safeparse',
      'asynclocalstorage',
      'abortsignal',
      'worker threads',
      'pool.query',
      'jose',
      'insecurehttpparser',
      'supertest',
      'event-loop',
      'openapi 3.2',
    ]) {
      expect(corpus).toContain(phrase);
    }
  });
});
