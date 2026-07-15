import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';
import { auditCourseBlueprint, CourseBlueprintSchema } from './blueprint';
import { loadCurriculumGraph, validateCurriculumGraph } from './repository';

const moduleIds = [
  'rabbit-ts-outcomes-delivery-claims',
  'rabbit-ts-architecture-pattern-selection',
  'rabbit-ts-amqp-model-routing',
  'rabbit-ts-node-amqplib-contract',
  'rabbit-ts-connections-channels-heartbeats',
  'rabbit-ts-topology-declarations-policies',
  'rabbit-ts-direct-routing-work-queues',
  'rabbit-ts-fanout-publish-subscribe',
  'rabbit-ts-topic-headers-alternate-routing',
  'rabbit-ts-message-envelope-schema',
  'rabbit-ts-publisher-buffer-backpressure',
  'rabbit-ts-unroutable-returns',
  'rabbit-ts-publisher-confirms-ambiguity',
  'rabbit-ts-consumer-lifecycle-shutdown',
  'rabbit-ts-acknowledgements-redelivery',
  'rabbit-ts-prefetch-concurrency-capacity',
  'rabbit-ts-idempotency-inbox-effects',
  'rabbit-ts-failure-retry-classification',
  'rabbit-ts-dead-letter-poison-parking',
  'rabbit-ts-quorum-queues-replication',
  'rabbit-ts-rabbitmq43-retries-priorities-timeouts',
  'rabbit-ts-ordering-single-active-partitioning',
  'rabbit-ts-streams-superstreams-choice',
  'rabbit-ts-transactional-outbox-sagas',
  'rabbit-ts-security-vhosts-tls-authz',
  'rabbit-ts-observability-capacity-alarms',
  'rabbit-ts-testing-chaos-recovery-release',
];

const similarityStopWords = new Set(
  'the a an and or to of in for with this that from as is are be before after one rabbitmq typescript messaging evidence current changed case team browser code model decision build deterministic production transfer gate competency probe message publisher consumer queue exchange'.split(
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
      `/rabbitmq-typescript-${index}.ts`,
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

const graph = loadCurriculumGraph('pubsub-rabbitmq-typescript');
const blueprint = CourseBlueprintSchema.parse(
  JSON.parse(
    readFileSync(path.join(process.cwd(), 'blueprints', 'pubsub-rabbitmq-typescript.json'), 'utf8')
  )
);

describe('RabbitMQ 4.3 Pub/Sub and Reliable Messaging with TypeScript 7 v2 course', () => {
  it('follows the delivery-claims-to-production-defense prerequisite sequence at full depth', () => {
    expect(graph.course.moduleIds).toEqual(moduleIds);
    expect(graph.course.competencies).toHaveLength(135);
    expect(graph.modules).toHaveLength(27);
    expect(graph.activities).toHaveLength(276);
    expect(graph.activities.reduce((total, activity) => total + activity.steps.length, 0)).toBe(
      2257
    );
    expect(graph.activities.reduce((total, activity) => total + activity.checks.length, 0)).toBe(
      2479
    );
    expect(graph.course.credential.requiredProjectIds).toHaveLength(5);
    expect(graph.activities.at(-1)?.id).toBe('pubsub-rabbitmq-typescript-certification-exam');
  });

  it('is schema-valid, audited, cumulative, prerequisite-gated, and scenario-diverse', () => {
    expect(validateCurriculumGraph(graph)).toEqual([]);
    expect(auditCourseBlueprint(blueprint)).toEqual([]);
    expect(blueprint.status).toBe('approved');
    expect(blueprint.pathways.prerequisiteCourseIds).toEqual(['http-servers-typescript']);
    expect(graph.course.prerequisites).toEqual(['http-servers-typescript']);
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

  it('gives every messaging build an exact compile-ready changed-case contract', () => {
    const codeSteps = graph.activities.flatMap((activity) =>
      activity.steps
        .map((step) => ({ activity, step }))
        .filter(({ step }) => step.interaction === 'code')
    );
    expect(codeSteps).toHaveLength(222);
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
          marker.expected.includes('// Evidence: rabbit-ts-') &&
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
          activity.starterFiles?.typescript.includes('deterministic pure-TypeScript topology') &&
          activity.starterFiles.typescript.includes('explicit authorized transfer gates')
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
      `near-duplicate RabbitMQ examples ${closest.left} and ${closest.right}`
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
    expect(sources.length).toBeGreaterThan(600);
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
    const directory = mkdtempSync(path.join(tmpdir(), 'learn-it-all-rabbitmq-ts-'));
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

  it('keeps browser execution pure while naming live transfer gates', () => {
    const sources = graph.activities.flatMap((activity) => [
      activity.starterFiles?.typescript ?? '',
      ...activity.steps.flatMap((step) =>
        step.content.flatMap((block) => (block.type === 'code' ? [block.code] : []))
      ),
    ]);
    const forbidden =
      /(?:from\s+|require\s*\()["'](?:node:|amqplib)|\b(?:connect|fetch|createConnection|exec|spawn)\s*\(/u;
    expect(sources.length).toBeGreaterThan(600);
    expect(sources.every((source) => !forbidden.test(source))).toBe(true);
    const transferText = `${blueprint.audience.deviceConstraints.join(' ')} ${blueprint.scope.includes.join(' ')} ${blueprint.scope.excludes.join(' ')}`;
    for (const boundary of [
      'amqplib',
      'RabbitMQ',
      'TLS',
      'partition',
      'restart',
      'Docker',
      'database',
      'load',
      'upgrade',
      'production',
    ]) {
      expect(transferText).toContain(boundary);
    }
  });

  it('routes current primary research to governing messaging boundaries', () => {
    const expectations: Array<[string, string]> = [
      ['rabbit-ts-outcomes-delivery-claims', 'RabbitMQ Reliability Guide'],
      ['rabbit-ts-amqp-model-routing', 'AMQP 0-9-1 Model'],
      ['rabbit-ts-node-amqplib-contract', 'amqplib 2.0.1 Channel API'],
      ['rabbit-ts-connections-channels-heartbeats', 'Connections, Channels, and Heartbeats'],
      ['rabbit-ts-message-envelope-schema', 'AsyncAPI Specification 3.1.0'],
      ['rabbit-ts-publisher-confirms-ambiguity', 'Acknowledgements and Publisher Confirms'],
      ['rabbit-ts-dead-letter-poison-parking', 'Dead Letter Exchanges'],
      ['rabbit-ts-quorum-queues-replication', 'RabbitMQ Quorum Queues'],
      ['rabbit-ts-rabbitmq43-retries-priorities-timeouts', 'RabbitMQ 4.3 Delayed Retries'],
      ['rabbit-ts-streams-superstreams-choice', 'Streams and Super Streams'],
      ['rabbit-ts-security-vhosts-tls-authz', 'Access Control and TLS'],
      ['rabbit-ts-observability-capacity-alarms', 'RabbitMQ Flow Control'],
      ['rabbit-ts-testing-chaos-recovery-release', 'Release Information and 4.3 Upgrade Path'],
    ];
    for (const [moduleId, title] of expectations) {
      expect(evidenceForModule(moduleId).some((value) => value.includes(title))).toBe(true);
    }

    expect(blueprint.version).toBe('2026.07');
    expect(blueprint.researchedAt.startsWith('2026-07-14')).toBe(true);
    expect(blueprint.sources).toHaveLength(23);
    expect(blueprint.sources.every((source) => source.reviewedAt === '2026-07-14')).toBe(true);
    for (const version of [
      'RabbitMQ 4.3.2',
      'amqplib 2.0.1',
      'Node.js 24.18.0',
      'TypeScript 7.0.2',
      'AsyncAPI 3.1.0',
      'CloudEvents 1.0.2',
      '1.43.0',
    ]) {
      expect(blueprint.sources.some((source) => source.version.includes(version))).toBe(true);
    }
  });

  it('covers modern RabbitMQ behavior instead of renaming HTTP server material', () => {
    const serverGraph = loadCurriculumGraph('http-servers-typescript');
    const normalizedStatements = (values: string[]) =>
      new Set(values.map((value) => [...contentTerms(value)].sort().join(' ')));
    const messagingStatements = normalizedStatements(
      graph.course.competencies.map((competency) => competency.statement)
    );
    const serverStatements = normalizedStatements(
      serverGraph.course.competencies.map((competency) => competency.statement)
    );
    expect([...messagingStatements].filter((statement) => serverStatements.has(statement))).toEqual(
      []
    );

    const corpus =
      `${blueprint.modules.map((entry) => `${entry.id} ${entry.title}`).join(' ')} ${blueprint.competencies
        .flatMap((competency) => [competency.statement, ...competency.misconceptions])
        .join(' ')}`.toLowerCase();
    for (const phrase of [
      'exactly-once',
      'competing consumers',
      'waitforconfirms',
      'x-delivery-count',
      'transactional outbox',
      'delayed retry',
      '32 strict priority',
      'consumer timeout',
      'single active consumer',
      'super streams',
      'configure, write, and read',
      'oldest age',
      'rabbitmq 3.13',
    ]) {
      expect(corpus).toContain(phrase);
    }
  });

  it('keeps internal IDs out of learner labels and explanatory narrative', () => {
    const learnerLabelsAndNarrative = graph.activities.flatMap((activity) => [
      activity.title,
      activity.summary,
      ...activity.steps.flatMap((step) => [step.title, step.why]),
    ]);
    expect(learnerLabelsAndNarrative.every((value) => !/rabbit[- ]ts/i.test(value))).toBe(true);
    expect(
      learnerLabelsAndNarrative.every((value) => !/executable Go behavior evidence/i.test(value))
    ).toBe(true);
    expect(
      learnerLabelsAndNarrative.every(
        (value) => !/\b(concept|workshop|lab|quiz)\s+\1\b/i.test(value)
      )
    ).toBe(true);

    const markerInstructions = graph.activities.flatMap((activity) =>
      activity.steps
        .map((step) => step.instruction)
        .filter((instruction) => /rabbit-ts/i.test(instruction))
    );
    expect(markerInstructions).toHaveLength(222);
    expect(
      markerInstructions.every((instruction) => instruction.includes('"// Evidence: rabbit-ts-'))
    ).toBe(true);
  });
});
