import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { auditCourseBlueprint, CourseBlueprintSchema } from './blueprint';
import { loadCurriculumGraph, validateCurriculumGraph } from './repository';

const moduleIds = [
  'storage-go-outcomes-evidence',
  'storage-go-architecture-selection',
  'storage-go-http-representation-transfer',
  'storage-go-s3-object-model',
  'storage-go-buckets-endpoints-regions',
  'storage-go-sdk-v2-contract',
  'storage-go-client-resilience',
  'storage-go-upload-admission',
  'storage-go-putobject-integrity',
  'storage-go-transfermanager',
  'storage-go-multipart-upload',
  'storage-go-direct-browser-upload',
  'storage-go-download-operations',
  'storage-go-http-gateway',
  'storage-go-metadata-transactions',
  'storage-go-object-mutations',
  'storage-go-versioning-recovery',
  'storage-go-lifecycle-storage-classes',
  'storage-go-iam-bucket-security',
  'storage-go-encryption-key-management',
  'storage-go-signed-access',
  'storage-go-cloudfront-oac-origin',
  'storage-go-cloudfront-cache',
  'storage-go-media-range-streaming',
  'storage-go-edge-security',
  'storage-go-durability-disaster-recovery',
  'storage-go-events-observability-cost',
  'storage-go-testing-release-defense',
];

const stopWords = new Set(
  'the a an and or to of in for with this that from as is are be before after one go s3 cloudfront storage file evidence current changed case team browser code model decision build deterministic production transfer gate competency probe object bucket aws'.split(
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

const graph = loadCurriculumGraph('file-servers-s3-go');
const blueprint = CourseBlueprintSchema.parse(
  JSON.parse(
    readFileSync(path.join(process.cwd(), 'blueprints', 'file-servers-s3-go.json'), 'utf8')
  )
);

function evidenceForModule(moduleId: string): string[] {
  return graph.activities
    .filter((activity) => activity.moduleId === moduleId)
    .flatMap((activity) =>
      activity.steps.flatMap((step) =>
        step.content.flatMap((block) => (block.type === 'evidence' ? [block.value] : []))
      )
    );
}

describe('Amazon S3 and CloudFront file delivery with Go 1.26 v2 course', () => {
  it('follows the outcome-to-production-defense prerequisite sequence at full depth', () => {
    expect(graph.course.moduleIds).toEqual(moduleIds);
    expect(graph.course.competencies).toHaveLength(140);
    expect(graph.modules).toHaveLength(28);
    expect(graph.activities).toHaveLength(286);
    expect(graph.activities.reduce((total, activity) => total + activity.steps.length, 0)).toBe(
      2332
    );
    expect(graph.activities.reduce((total, activity) => total + activity.checks.length, 0)).toBe(
      2562
    );
    expect(graph.course.credential.requiredProjectIds).toHaveLength(5);
    expect(graph.activities.at(-1)?.id).toBe('file-servers-s3-go-certification-exam');
  });

  it('is schema-valid, audited, cumulative, prerequisite-gated, and scenario-diverse', () => {
    expect(validateCurriculumGraph(graph)).toEqual([]);
    expect(auditCourseBlueprint(blueprint)).toEqual([]);
    expect(blueprint.status).toBe('approved');
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

    const projectContexts = blueprint.projects.map((entry) =>
      terms(`${entry.title} ${entry.userNeed}`)
    );
    for (const [index, left] of projectContexts.entries()) {
      for (const right of projectContexts.slice(index + 1)) {
        expect(jaccard(left, right)).toBeLessThan(0.35);
      }
    }
  });

  it('gives every storage build an exact compile-ready changed-case contract', () => {
    const codeSteps = graph.activities.flatMap((activity) =>
      activity.steps
        .map((step) => ({ activity, step }))
        .filter(({ step }) => step.interaction === 'code')
    );
    expect(codeSteps).toHaveLength(230);
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
          marker.expected.includes('// Evidence: storage-go-') &&
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
          activity.starterFiles?.go.includes('deterministic pure-Go identity') &&
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
      `near-duplicate S3 Go examples ${closest.left} and ${closest.right}`
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
    expect(codeBlocks.length).toBeGreaterThan(350);
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
    const directory = mkdtempSync(path.join(tmpdir(), 'learn-it-all-s3-go-'));
    try {
      writeFileSync(path.join(directory, 'go.mod'), 'module example.test/s3evidence\n\ngo 1.26\n');
      writeFileSync(
        path.join(directory, 'evidence_test.go'),
        `package s3evidence\n\n${exactFunctions.join('\n\n')}\n`
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

  it('keeps browser execution pure while naming complete Go and AWS transfer gates', () => {
    const sources = graph.activities.flatMap((activity) => [
      activity.starterFiles?.go ?? '',
      ...activity.steps.flatMap((step) =>
        step.content.flatMap((block) => (block.type === 'code' ? [block.code] : []))
      ),
    ]);
    const forbidden =
      /import\s+["'(]*(?:github[.]com\/aws|net|crypto\/tls|os|os\/exec)|\b(?:Dial|DialTLS|exec[.]Command|net[.]Dial|tls[.]Dial)\s*\(/u;
    expect(sources.length).toBeGreaterThan(650);
    expect(sources.every((source) => !forbidden.test(source))).toBe(true);
    const transferText = `${blueprint.audience.deviceConstraints.join(' ')} ${blueprint.scope.includes.join(' ')} ${blueprint.scope.excludes.join(' ')}`;
    for (const boundary of [
      'AWS SDK',
      'S3',
      'CloudFront',
      'KMS',
      'IAM',
      'WAF',
      'database',
      'race',
      'leak',
      'load',
      'cost',
      'restore',
      'production',
    ]) {
      expect(transferText).toContain(boundary);
    }
  });

  it('routes current primary research to each governing storage boundary', () => {
    const expectations: Array<[string, string]> = [
      ['storage-go-outcomes-evidence', 'HTTP Semantics RFC 9110'],
      ['storage-go-s3-object-model', 'Amazon S3 Data Consistency Model'],
      ['storage-go-buckets-endpoints-regions', 'Amazon S3 Directory Buckets'],
      ['storage-go-sdk-v2-contract', 'AWS SDK for Go v2 Core API'],
      ['storage-go-putobject-integrity', 'Amazon S3 Checking Object Integrity'],
      ['storage-go-transfermanager', 'AWS S3 Transfer Manager for Go'],
      ['storage-go-multipart-upload', 'Amazon S3 Multipart Upload'],
      ['storage-go-direct-browser-upload', 'Amazon S3 Presigned URL Upload'],
      ['storage-go-versioning-recovery', 'Amazon S3 Versioning'],
      ['storage-go-lifecycle-storage-classes', 'Amazon S3 Lifecycle Management'],
      ['storage-go-iam-bucket-security', 'Amazon S3 Security Best Practices'],
      ['storage-go-encryption-key-management', 'Amazon S3 Server-Side Encryption'],
      ['storage-go-signed-access', 'AWS CloudFront Sign for Go'],
      ['storage-go-cloudfront-oac-origin', 'CloudFront Restrict S3 Origins with OAC'],
      ['storage-go-cloudfront-cache', 'CloudFront Cache Key and Origin Requests'],
      ['storage-go-media-range-streaming', 'CloudFront Range GET Requests'],
      ['storage-go-edge-security', 'CloudFront Security Best Practices'],
      ['storage-go-durability-disaster-recovery', 'Amazon S3 Replication'],
      ['storage-go-testing-release-defense', 'Go 1.26 Release Contract'],
    ];
    for (const [moduleId, title] of expectations) {
      expect(evidenceForModule(moduleId).some((value) => value.includes(title))).toBe(true);
    }
    expect(blueprint.version).toBe('2026.07');
    expect(blueprint.researchedAt.startsWith('2026-07-14')).toBe(true);
    expect(blueprint.sources).toHaveLength(28);
    for (const version of [
      'Go 1.26.5',
      '1.42.1',
      '1.105.0',
      '0.3.2',
      '1.22.33',
      '1.11.7',
      'RFC 9110',
    ]) {
      expect(blueprint.sources.some((source) => source.version.includes(version))).toBe(true);
    }
  });

  it('is a storage course rather than a renamed HTTP or messaging course', () => {
    const corpus = blueprint.competencies
      .flatMap((entry) => [entry.id, entry.statement, ...entry.misconceptions])
      .join(' ');
    expect(corpus).not.toMatch(/RabbitMQ|amqp091|amqplib|queue declaration|publisher confirm/u);
    for (const phrase of [
      'transfermanager 0.3.2',
      'errors.Is and errors.As',
      'HashSHA256',
      'CORS',
      'Object Lock',
      'SSE-KMS',
      'OAC',
      'Range',
      'Origin Shield',
      'Multi-Region Access Points',
    ]) {
      expect(corpus).toContain(phrase);
    }

    const learnerNarrative = graph.activities.flatMap((activity) => [
      activity.title,
      activity.summary,
      ...activity.steps.flatMap((step) => [step.title, step.why]),
    ]);
    expect(learnerNarrative.every((value) => !/storage[- ]go/i.test(value))).toBe(true);
    const arrangeText = graph.activities.flatMap((activity) =>
      activity.steps
        .filter((step) => step.interaction === 'arrange')
        .map((step) =>
          [step.instruction, ...(step.options?.map((option) => option.text) ?? [])].join(' ')
        )
    );
    expect(
      arrangeText.every((value) => !/HTTP evidence cycle|publish, route|broker/u.test(value))
    ).toBe(true);
    expect(
      arrangeText.every((value) =>
        /storage-delivery evidence cycle|file and object identity|authorization|custody|integrity|cache|recovery/u.test(
          value
        )
      )
    ).toBe(true);

    const markerInstructions = graph.activities.flatMap((activity) =>
      activity.steps
        .map((step) => step.instruction)
        .filter((instruction) => /storage-go/i.test(instruction))
    );
    expect(markerInstructions).toHaveLength(230);
    expect(
      markerInstructions.every((instruction) => instruction.includes('"// Evidence: storage-go-'))
    ).toBe(true);
  });
});
