import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';
import { auditCourseBlueprint, CourseBlueprintSchema } from './blueprint';
import { loadCurriculumGraph, validateCurriculumGraph } from './repository';

const moduleIds = [
  'storage-ts-outcomes-evidence',
  'storage-ts-architecture-selection',
  'storage-ts-http-representation-transfer',
  'storage-ts-s3-object-model',
  'storage-ts-buckets-endpoints-regions',
  'storage-ts-sdk-v2-contract',
  'storage-ts-client-resilience',
  'storage-ts-upload-admission',
  'storage-ts-putobject-integrity',
  'storage-ts-transfermanager',
  'storage-ts-multipart-upload',
  'storage-ts-direct-browser-upload',
  'storage-ts-download-operations',
  'storage-ts-http-gateway',
  'storage-ts-metadata-transactions',
  'storage-ts-object-mutations',
  'storage-ts-versioning-recovery',
  'storage-ts-lifecycle-storage-classes',
  'storage-ts-iam-bucket-security',
  'storage-ts-encryption-key-management',
  'storage-ts-signed-access',
  'storage-ts-cloudfront-oac-origin',
  'storage-ts-cloudfront-cache',
  'storage-ts-media-range-streaming',
  'storage-ts-edge-security',
  'storage-ts-durability-disaster-recovery',
  'storage-ts-events-observability-cost',
  'storage-ts-testing-release-defense',
];

const stopWords = new Set(
  'the a an and or to of in for with this that from as is are be before after one s3 cloudfront storage file evidence current changed case team browser code model decision build deterministic production transfer gate competency probe object bucket aws'.split(
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
      `/file-servers-s3-typescript-${index}.ts`,
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

const graph = loadCurriculumGraph('file-servers-s3-typescript');
const goGraph = loadCurriculumGraph('file-servers-s3-go');
const blueprint = CourseBlueprintSchema.parse(
  JSON.parse(
    readFileSync(path.join(process.cwd(), 'blueprints', 'file-servers-s3-typescript.json'), 'utf8')
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

describe('Amazon S3 and CloudFront file delivery with TypeScript 7 v2 course', () => {
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
    expect(graph.activities.at(-1)?.id).toBe('file-servers-s3-typescript-certification-exam');
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

  it('gives every TypeScript storage build an exact compile-ready changed-case contract', () => {
    const codeSteps = graph.activities.flatMap((activity) =>
      activity.steps
        .map((step) => ({ activity, step }))
        .filter(({ step }) => step.interaction === 'code')
    );
    expect(codeSteps).toHaveLength(230);
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
          marker.expected.includes('// Evidence: storage-ts-') &&
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
          activity.starterFiles?.typescript.includes('deterministic pure-TypeScript') &&
          activity.starterFiles.typescript.includes('explicit authorized transfer gates')
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
      `near-duplicate S3 TypeScript examples ${closest.left} and ${closest.right}`
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
    expect(sources.length).toBeGreaterThan(650);
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
    const directory = mkdtempSync(path.join(tmpdir(), 'learn-it-all-s3-ts-'));
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

  it('keeps browser execution pure while naming complete Node and AWS transfer gates', () => {
    const sources = graph.activities.flatMap((activity) => [
      activity.starterFiles?.typescript ?? '',
      ...activity.steps.flatMap((step) =>
        step.content.flatMap((block) => (block.type === 'code' ? [block.code] : []))
      ),
    ]);
    const forbidden =
      /(?:from\s+|require\s*\()["'](?:node:|@aws-sdk)|\b(?:fetch|createConnection|exec|spawn)\s*\(/u;
    expect(sources.length).toBeGreaterThan(650);
    expect(sources.every((source) => !forbidden.test(source))).toBe(true);
    const transferText = `${blueprint.audience.deviceConstraints.join(' ')} ${blueprint.scope.includes.join(' ')} ${blueprint.scope.excludes.join(' ')}`;
    for (const boundary of [
      'Node',
      'AWS SDK',
      'S3',
      'CloudFront',
      'KMS',
      'IAM',
      'WAF',
      'PostgreSQL',
      'stream',
      'load',
      'cost',
      'restore',
      'production',
    ]) {
      expect(transferText).toContain(boundary);
    }
  });

  it('routes current primary research to each governing TypeScript boundary', () => {
    const expectations: Array<[string, string]> = [
      ['storage-ts-outcomes-evidence', 'HTTP Semantics RFC 9110'],
      ['storage-ts-s3-object-model', 'Amazon S3 Data Consistency Model'],
      ['storage-ts-buckets-endpoints-regions', 'Amazon S3 Directory Buckets'],
      ['storage-ts-sdk-v2-contract', 'AWS SDK for JavaScript v3 Developer Guide'],
      ['storage-ts-putobject-integrity', 'Amazon S3 Checking Object Integrity'],
      ['storage-ts-transfermanager', 'AWS SDK v3 S3 lib-storage Package'],
      ['storage-ts-multipart-upload', 'Amazon S3 Multipart Upload'],
      ['storage-ts-direct-browser-upload', 'AWS SDK v3 S3 Request Presigner'],
      ['storage-ts-versioning-recovery', 'Amazon S3 Versioning'],
      ['storage-ts-lifecycle-storage-classes', 'Amazon S3 Lifecycle Management'],
      ['storage-ts-iam-bucket-security', 'Amazon S3 Security Best Practices'],
      ['storage-ts-encryption-key-management', 'Amazon S3 Server-Side Encryption'],
      ['storage-ts-signed-access', 'AWS SDK v3 CloudFront Signer'],
      ['storage-ts-cloudfront-oac-origin', 'CloudFront Restrict S3 Origins with OAC'],
      ['storage-ts-cloudfront-cache', 'CloudFront Cache Key and Origin Requests'],
      ['storage-ts-media-range-streaming', 'CloudFront Range GET Requests'],
      ['storage-ts-edge-security', 'CloudFront Security Best Practices'],
      ['storage-ts-durability-disaster-recovery', 'Amazon S3 Replication'],
      ['storage-ts-testing-release-defense', 'Node.js 24.18.0 Documentation'],
    ];
    for (const [moduleId, title] of expectations) {
      expect(evidenceForModule(moduleId).some((value) => value.includes(title))).toBe(true);
    }
    expect(blueprint.version).toBe('2026.07');
    expect(blueprint.researchedAt.startsWith('2026-07-14')).toBe(true);
    expect(blueprint.sources).toHaveLength(30);
    for (const version of ['Node.js 24.18.0', 'TypeScript 7.0.2', '3.1087.0', 'RFC 9110']) {
      expect(blueprint.sources.some((source) => source.version.includes(version))).toBe(true);
    }
    const manifest = JSON.parse(readFileSync(path.join(process.cwd(), 'package.json'), 'utf8')) as {
      devDependencies: Record<string, string>;
    };
    expect(manifest.devDependencies.typescript).toBe('npm:@typescript/typescript6@^6.0.2');
    const compatibilityCompiler = spawnSync(
      path.join(process.cwd(), 'node_modules', '.bin', 'tsc6'),
      ['--version'],
      { encoding: 'utf8' }
    );
    expect(compatibilityCompiler.status).toBe(0);
    expect(compatibilityCompiler.stdout.trim()).toBe('Version 6.0.3');
    expect(
      blueprint.sources.some((source) =>
        source.version.includes('@typescript/typescript6 package 6.0.2, compiler reports 6.0.3')
      )
    ).toBe(true);
  });

  it('is TypeScript-specific rather than a renamed Go sibling', () => {
    const normalized = (values: string[]) =>
      new Set(values.map((value) => [...terms(value)].sort().join(' ')));
    const typescriptStatements = normalized(
      graph.course.competencies.map((entry) => entry.statement)
    );
    const goStatements = normalized(goGraph.course.competencies.map((entry) => entry.statement));
    expect([...typescriptStatements].filter((statement) => goStatements.has(statement))).toEqual(
      []
    );

    const corpus = blueprint.competencies
      .flatMap((entry) => [entry.id, entry.statement, ...entry.misconceptions])
      .join(' ');
    expect(corpus).not.toMatch(
      /aws-sdk-go|feature\/s3\/transfermanager|s3\/manager|HashSHA256|errors\.Is|errors\.As|MaxBytesReader|ParseMultipartForm|goroutine|\bvet\b/u
    );
    for (const phrase of [
      '@aws-sdk/lib-storage 3.1087.0',
      'S3ServiceException',
      '$metadata',
      'AbortSignal',
      'queueSize',
      'leavePartsOnError',
      '@aws-sdk/s3-request-presigner',
      '@aws-sdk/cloudfront-signer 3.1087.0',
      'unknown',
      'open handles',
      'compiler reports 6.0.3',
    ]) {
      expect(corpus).toContain(phrase);
    }

    const learnerNarrative = graph.activities.flatMap((activity) => [
      activity.title,
      activity.summary,
      ...activity.steps.flatMap((step) => [step.title, step.why]),
    ]);
    expect(learnerNarrative.every((value) => !/storage[- ]ts/i.test(value))).toBe(true);
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
        .filter((instruction) => /storage-ts/i.test(instruction))
    );
    expect(markerInstructions).toHaveLength(230);
    expect(
      markerInstructions.every((instruction) => instruction.includes('"// Evidence: storage-ts-'))
    ).toBe(true);
  });
});
