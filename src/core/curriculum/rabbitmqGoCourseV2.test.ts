import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { auditCourseBlueprint, CourseBlueprintSchema } from './blueprint';
import { loadCurriculumGraph, validateCurriculumGraph } from './repository';

const moduleIds = [
  'rabbit-go-outcomes-delivery-claims',
  'rabbit-go-architecture-pattern-selection',
  'rabbit-go-amqp-model-routing',
  'rabbit-go-go-amqp091-contract',
  'rabbit-go-connections-channels-recovery',
  'rabbit-go-topology-declarations-policies',
  'rabbit-go-direct-routing-work-queues',
  'rabbit-go-fanout-publish-subscribe',
  'rabbit-go-topic-headers-alternate-routing',
  'rabbit-go-message-envelope-schema',
  'rabbit-go-publisher-admission-backpressure',
  'rabbit-go-unroutable-returns',
  'rabbit-go-publisher-confirms-ambiguity',
  'rabbit-go-consumer-goroutines-shutdown',
  'rabbit-go-delivery-tags-redelivery',
  'rabbit-go-prefetch-goroutine-capacity',
  'rabbit-go-idempotency-inbox-effects',
  'rabbit-go-failure-retry-classification',
  'rabbit-go-dead-letter-poison-parking',
  'rabbit-go-quorum-queues-replication',
  'rabbit-go-rabbitmq43-retries-priorities-timeouts',
  'rabbit-go-ordering-single-active-partitioning',
  'rabbit-go-streams-superstreams-choice',
  'rabbit-go-transactional-outbox-sagas',
  'rabbit-go-security-vhosts-tls-authz',
  'rabbit-go-observability-capacity-alarms',
  'rabbit-go-testing-race-chaos-release',
];

const stopWords = new Set(
  'the a an and or to of in for with this that from as is are be before after one go rabbitmq messaging evidence current changed case team browser code model decision build deterministic production transfer gate competency probe message publisher consumer queue exchange'.split(
    ' '
  )
);

function terms(value: string): Set<string> {
  return new Set(
    value
      .toLowerCase()
      .replace(/https?:\/\/\S+/g, ' ')
      .replace(/[^a-z0-9]+/g, ' ')
      .split(' ')
      .filter((word) => word.length > 2 && !stopWords.has(word))
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

const graph = loadCurriculumGraph('pubsub-rabbitmq-go');
const blueprint = CourseBlueprintSchema.parse(
  JSON.parse(
    readFileSync(path.join(process.cwd(), 'blueprints', 'pubsub-rabbitmq-go.json'), 'utf8')
  )
);

describe('RabbitMQ 4.3 Reliable Messaging with Go 1.26 v2 course', () => {
  it('follows the delivery-evidence-to-production-defense prerequisite sequence at full depth', () => {
    expect(graph.course.moduleIds).toEqual(moduleIds);
    expect(graph.course.competencies).toHaveLength(135);
    expect(graph.modules).toHaveLength(27);
    expect(graph.activities).toHaveLength(276);
    expect(graph.activities.reduce((total, activity) => total + activity.steps.length, 0)).toBe(
      2249
    );
    expect(graph.activities.reduce((total, activity) => total + activity.checks.length, 0)).toBe(
      2471
    );
    expect(graph.course.credential.requiredProjectIds).toHaveLength(5);
    expect(graph.activities.at(-1)?.id).toBe('pubsub-rabbitmq-go-certification-exam');
  });

  it('is schema-valid, audited, cumulative, prerequisite-gated, and scenario-diverse', () => {
    expect(validateCurriculumGraph(graph)).toEqual([]);
    expect(auditCourseBlueprint(blueprint)).toEqual([]);
    expect(blueprint.status).toBe('audit-required');
    expect(blueprint.pathways.prerequisiteCourseIds).toEqual(['http-servers-go']);
    expect(graph.course.prerequisites).toEqual(['http-servers-go']);
    expect(new Set(graph.activities.map((activity) => activity.kind))).toEqual(
      new Set(['theory', 'workshop', 'debug', 'lab', 'review', 'quiz', 'project', 'exam'])
    );
    expect(
      graph.activities.every((activity, index) =>
        index === 0 ? activity.prerequisites.length === 0 : activity.prerequisites.length === 1
      )
    ).toBe(true);

    for (const module of blueprint.modules) {
      const contexts = module.activities
        .filter((activity) =>
          ['workshop', 'debug', 'lab', 'review', 'quiz'].includes(activity.kind)
        )
        .map((activity) => ({ id: activity.id, words: terms(activity.authenticContext) }));
      expect(contexts).toHaveLength(5);
      for (const [index, left] of contexts.entries()) {
        for (const right of contexts.slice(index + 1)) {
          expect(
            jaccard(left.words, right.words),
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
          marker.expected.includes('// Evidence: rabbit-go-') &&
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
          activity.starterFiles?.go.includes('deterministic pure-Go topology') &&
          activity.starterFiles.go.includes('explicit authorized transfer gates')
      )
    ).toBe(true);

    const examples = codeSteps.map(({ step }) => {
      const block = step.content.find((entry) => entry.type === 'code');
      return block?.type === 'code' ? block.code : '';
    });
    expect(new Set(examples).size).toBe(examples.length);
    const exampleTerms = examples.map(terms);
    let closest = { score: 0, left: 0, right: 0 };
    for (const [index, left] of exampleTerms.entries()) {
      for (const [offset, right] of exampleTerms.slice(index + 1).entries()) {
        const score = jaccard(left, right);
        if (score > closest.score) closest = { score, left: index, right: index + offset + 1 };
      }
    }
    expect(
      closest.score,
      `near-duplicate RabbitMQ Go examples ${closest.left} and ${closest.right}`
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
    expect(codeBlocks.length).toBeGreaterThan(300);
    const goRoot = spawnSync('go', ['env', 'GOROOT'], { encoding: 'utf8' });
    expect(goRoot.status, goRoot.stderr).toBe(0);
    const gofmt = path.join(goRoot.stdout.trim(), 'bin', 'gofmt');
    for (const source of codeBlocks) {
      const parsed = spawnSync(gofmt, { input: `package main\n${source}\n`, encoding: 'utf8' });
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
    const directory = mkdtempSync(path.join(tmpdir(), 'learn-it-all-rabbitmq-go-'));
    try {
      writeFileSync(
        path.join(directory, 'go.mod'),
        'module example.test/rabbitmqevidence\n\ngo 1.26\n'
      );
      writeFileSync(
        path.join(directory, 'evidence_test.go'),
        `package rabbitmqevidence\n\n${exactFunctions.join('\n\n')}\n`
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

  it('keeps browser execution pure while naming full Go and broker transfer gates', () => {
    const sources = graph.activities.flatMap((activity) => [
      activity.starterFiles?.go ?? '',
      ...activity.steps.flatMap((step) =>
        step.content.flatMap((block) => (block.type === 'code' ? [block.code] : []))
      ),
    ]);
    const forbidden =
      /import\s+["'(]*(?:github[.]com\/rabbitmq|net|crypto\/tls|os|os\/exec)|\b(?:Dial|DialTLS|exec[.]Command|net[.]Dial|tls[.]Dial)\s*\(/u;
    expect(sources.length).toBeGreaterThan(600);
    expect(sources.every((source) => !forbidden.test(source))).toBe(true);
    const transferText = `${blueprint.audience.deviceConstraints.join(' ')} ${blueprint.scope.includes.join(' ')} ${blueprint.scope.excludes.join(' ')}`;
    for (const boundary of [
      'amqp091-go',
      'RabbitMQ',
      'TLS',
      'partition',
      'restart',
      'Docker',
      'database',
      'race',
      'leak',
      'load',
      'upgrade',
      'production',
    ]) {
      expect(transferText).toContain(boundary);
    }
  });

  it('routes current primary research to governing Go messaging boundaries', () => {
    const expectations: Array<[string, string]> = [
      ['rabbit-go-outcomes-delivery-claims', 'RabbitMQ Reliability Guide'],
      ['rabbit-go-amqp-model-routing', 'AMQP 0-9-1 Model'],
      ['rabbit-go-go-amqp091-contract', 'amqp091-go 1.12 API'],
      ['rabbit-go-connections-channels-recovery', 'amqp091-go 1.12 API'],
      ['rabbit-go-message-envelope-schema', 'AsyncAPI Specification 3.1.0'],
      ['rabbit-go-publisher-confirms-ambiguity', 'Acknowledgements and Publisher Confirms'],
      ['rabbit-go-dead-letter-poison-parking', 'Dead Letter Exchanges'],
      ['rabbit-go-quorum-queues-replication', 'RabbitMQ Quorum Queues'],
      ['rabbit-go-rabbitmq43-retries-priorities-timeouts', 'RabbitMQ 4.3 Delayed Retries'],
      ['rabbit-go-streams-superstreams-choice', 'RabbitMQ Stream Go Client'],
      ['rabbit-go-security-vhosts-tls-authz', 'Access Control and TLS'],
      ['rabbit-go-observability-capacity-alarms', 'RabbitMQ Flow Control'],
      ['rabbit-go-testing-race-chaos-release', 'Go Testing, Fuzzing, and Diagnostics'],
    ];
    for (const [moduleId, title] of expectations) {
      expect(evidenceForModule(moduleId).some((value) => value.includes(title))).toBe(true);
    }
    expect(blueprint.version).toBe('2026.07');
    expect(blueprint.researchedAt.startsWith('2026-07-14')).toBe(true);
    expect(blueprint.sources).toHaveLength(24);
    for (const version of [
      'RabbitMQ 4.3.2',
      'amqp091-go 1.12.0',
      'Go 1.26.5',
      'AsyncAPI 3.1.0',
      'CloudEvents 1.0.2',
      '1.43.0',
    ]) {
      expect(blueprint.sources.some((source) => source.version.includes(version))).toBe(true);
    }
  });

  it('is Go-specific rather than a renamed TypeScript sibling', () => {
    const typescriptGraph = loadCurriculumGraph('pubsub-rabbitmq-typescript');
    const normalized = (values: string[]) =>
      new Set(values.map((value) => [...terms(value)].sort().join(' ')));
    const goStatements = normalized(graph.course.competencies.map((entry) => entry.statement));
    const typescriptStatements = normalized(
      typescriptGraph.course.competencies.map((entry) => entry.statement)
    );
    expect([...goStatements].filter((statement) => typescriptStatements.has(statement))).toEqual(
      []
    );

    const corpus = blueprint.competencies
      .flatMap((entry) => [entry.id, entry.statement, ...entry.misconceptions])
      .join(' ');
    expect(corpus).not.toMatch(/TypeScript|amqplib|EventEmitter|tsx|assertQueue/u);
    for (const phrase of [
      'amqp091-go 1.12.0',
      'PublishWithContext',
      'notification channels',
      'automatic recovery',
      'goroutine',
      'delivery tags',
      'race',
      'leak',
      'errors.Is',
      'RabbitMQ 4.3',
    ]) {
      expect(corpus).toContain(phrase);
    }
  });

  it('keeps internal IDs and HTTP ordering language out of learner narrative', () => {
    const learnerNarrative = graph.activities.flatMap((activity) => [
      activity.title,
      activity.summary,
      ...activity.steps.flatMap((step) => [step.title, step.why]),
    ]);
    expect(learnerNarrative.every((value) => !/rabbit[- ]go/i.test(value))).toBe(true);
    const arrangeText = graph.activities.flatMap((activity) =>
      activity.steps
        .filter((step) => step.interaction === 'arrange')
        .map((step) =>
          [step.instruction, ...(step.options?.map((option) => option.text) ?? [])].join(' ')
        )
    );
    expect(
      arrangeText.every((value) => !/HTTP evidence cycle|method semantics|redirect/u.test(value))
    ).toBe(true);
    expect(
      arrangeText.every((value) =>
        /messaging evidence cycle|publish|route|custody|delivery|effect|failure|recovery/u.test(
          value
        )
      )
    ).toBe(true);

    const markerInstructions = graph.activities.flatMap((activity) =>
      activity.steps
        .map((step) => step.instruction)
        .filter((instruction) => /rabbit-go/i.test(instruction))
    );
    expect(markerInstructions).toHaveLength(222);
    expect(
      markerInstructions.every((instruction) => instruction.includes('"// Evidence: rabbit-go-'))
    ).toBe(true);
  });
});
