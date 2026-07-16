import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { auditCourseBlueprint, CourseBlueprintSchema } from './blueprint';
import { loadCurriculumGraph, validateCurriculumGraph } from './repository';

const moduleIds = [
  'cmem-outcomes-evidence-toolchain',
  'cmem-translation-diagnostics',
  'cmem-values-integers-overflow',
  'cmem-objects-storage-lifetime',
  'cmem-representation-alignment-padding',
  'cmem-arrays-pointers-bounds',
  'cmem-strings-bytes-encoding',
  'cmem-structs-unions-flexible-arrays',
  'cmem-functions-callbacks-interfaces',
  'cmem-automatic-lifetime-stack',
  'cmem-heap-allocator-contracts',
  'cmem-allocation-size-overflow',
  'cmem-ownership-borrowing-contracts',
  'cmem-cleanup-error-paths',
  'cmem-realloc-transactional-growth',
  'cmem-uaf-double-free-dangling',
  'cmem-buffer-overflow-underflow',
  'cmem-indeterminate-undefined-behavior',
  'cmem-aliasing-effective-type-provenance',
  'cmem-arenas-pools-slabs',
  'cmem-reference-counting-cycles',
  'cmem-tracing-garbage-collection',
  'cmem-resource-ownership-raii-patterns',
  'cmem-concurrency-atomics-races',
  'cmem-abi-ffi-shared-boundaries',
  'cmem-sanitizers-static-analysis-fuzzing',
  'cmem-profiling-performance-hardening',
  'cmem-testing-release-incident-defense',
];

const stopWords = new Set(
  'the a an and or to of in for with this that from as is are be before after one c memory evidence changed case browser practice current native transfer gate invariant int return static include main void printf'.split(
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

const graph = loadCurriculumGraph('c-memory-management');
const blueprint = CourseBlueprintSchema.parse(
  JSON.parse(
    readFileSync(path.join(process.cwd(), 'blueprints', 'c-memory-management.json'), 'utf8')
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

describe('modern C23 memory management v2 course', () => {
  it('follows the foundation-to-production-defense prerequisite sequence at full depth', () => {
    expect(graph.course.moduleIds).toEqual(moduleIds);
    expect(graph.course.competencies).toHaveLength(140);
    expect(graph.modules).toHaveLength(28);
    expect(graph.activities).toHaveLength(286);
    expect(graph.activities.reduce((total, activity) => total + activity.steps.length, 0)).toBe(
      2333
    );
    expect(graph.activities.reduce((total, activity) => total + activity.checks.length, 0)).toBe(
      2563
    );
    expect(graph.course.credential.requiredProjectIds).toHaveLength(5);
    expect(graph.activities.at(-1)?.id).toBe('c-memory-management-certification-exam');
  });

  it('is schema-valid, audited, cumulative, prerequisite-gated, and scenario-diverse', () => {
    expect(validateCurriculumGraph(graph)).toEqual([]);
    expect(auditCourseBlueprint(blueprint)).toEqual([]);
    expect(blueprint.status).toBe('audit-required');
    expect(blueprint.pathways.prerequisiteCourseIds).toEqual(['python-dsa']);
    expect(graph.course.prerequisites).toEqual(['python-dsa']);
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

  it('gives every C build an exact runnable changed-case contract', () => {
    const codeSteps = graph.activities.flatMap((activity) =>
      activity.steps
        .map((step) => ({ activity, step }))
        .filter(({ step }) => step.interaction === 'code')
    );
    expect(codeSteps).toHaveLength(230);
    expect(codeSteps.every(({ step }) => step.targetFile === 'c')).toBe(true);
    expect(
      codeSteps.every(({ activity, step }) => {
        const checks = activity.checks.filter((check) => step.checkIds.includes(check.id));
        const marker = checks.find((check) => check.type === 'source-includes');
        const structure = checks.find((check) => check.type === 'source-matches');
        const example = step.content.find((block) => block.type === 'code');
        return (
          marker?.type === 'source-includes' &&
          marker.file === 'c' &&
          marker.expected.includes('/* Evidence: cmem-') &&
          structure?.type === 'source-matches' &&
          structure.file === 'c' &&
          example?.type === 'code' &&
          example.language === 'c' &&
          example.code.includes('/* Changed case ') &&
          example.code.includes('invariant=') &&
          new RegExp(structure.pattern, structure.flags).test(example.code)
        );
      })
    ).toBe(true);
    expect(
      graph.activities.every(
        (activity) =>
          activity.starterFiles?.c.includes('PicoC 3.2.2') &&
          activity.starterFiles.c.includes('explicit controlled transfer gates')
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
      `near-duplicate C examples ${closest.left} and ${closest.right}`
    ).toBeLessThan(0.9);
  });

  it('compiles every C lesson program and runs one changed case from every module', () => {
    const codeBlocks = graph.activities.flatMap((activity) =>
      activity.steps.flatMap((step) =>
        step.content.flatMap((block) =>
          block.type === 'code' && block.language === 'c' ? [block.code] : []
        )
      )
    );
    expect(codeBlocks.length).toBeGreaterThan(350);

    const exactPrograms = graph.activities.flatMap((activity) =>
      activity.steps.flatMap((step) =>
        step.interaction === 'code'
          ? step.content.flatMap((block) =>
              block.type === 'code' && block.language === 'c' ? [block.code] : []
            )
          : []
      )
    );
    const directory = mkdtempSync(path.join(tmpdir(), 'learn-it-all-c-memory-'));
    try {
      expect(exactPrograms).toHaveLength(230);
      const lessonPaths = codeBlocks.map((source, index) => {
        const sourcePath = path.join(directory, `lesson-${index}.c`);
        writeFileSync(sourcePath, source);
        return sourcePath;
      });
      const syntax = spawnSync(
        'gcc',
        ['-std=c99', '-Wall', '-Wextra', '-Werror', '-pedantic', '-fsyntax-only', ...lessonPaths],
        { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 }
      );
      expect(syntax.status, syntax.stderr || syntax.stdout).toBe(0);

      const representative = new Map<string, string>();
      for (const activity of graph.activities) {
        if (representative.has(activity.moduleId)) continue;
        const source = activity.steps
          .flatMap((step) => step.content)
          .find((block) => block.type === 'code' && block.language === 'c');
        if (source?.type === 'code') representative.set(activity.moduleId, source.code);
      }
      expect([...representative.keys()]).toEqual(moduleIds);
      for (const [index, [moduleId, source]] of [...representative.entries()].entries()) {
        const sourcePath = path.join(directory, `representative-${index}.c`);
        const binaryPath = path.join(directory, `representative-${index}`);
        writeFileSync(sourcePath, source);
        const compile = spawnSync(
          'gcc',
          ['-std=c99', '-Wall', '-Wextra', '-Werror', '-pedantic', sourcePath, '-o', binaryPath],
          { encoding: 'utf8' }
        );
        expect(compile.status, `${moduleId}: ${compile.stderr || compile.stdout}`).toBe(0);
        const run = spawnSync(binaryPath, [], { encoding: 'utf8', timeout: 2_000 });
        expect(run.status, `${moduleId}: ${run.stderr || run.stdout}`).toBe(0);
        expect(run.stdout, moduleId).toContain('invariant=1');
      }
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  }, 30_000);

  it('keeps instant practice bounded and names every native transfer boundary', () => {
    const sources = graph.activities.flatMap((activity) => [
      activity.starterFiles?.c ?? '',
      ...activity.steps.flatMap((step) =>
        step.content.flatMap((block) =>
          block.type === 'code' && block.language === 'c' ? [block.code] : []
        )
      ),
    ]);
    const forbidden =
      /\b(?:gets|strcpy|strcat|sprintf|system|popen|fork|execve|fopen|socket|pthread_create)\s*\(/u;
    expect(sources.length).toBeGreaterThan(650);
    expect(sources.every((source) => !forbidden.test(source))).toBe(true);

    const transferText = `${blueprint.audience.deviceConstraints.join(' ')} ${blueprint.scope.includes.join(' ')} ${blueprint.scope.excludes.join(' ')}`;
    for (const boundary of [
      'C23',
      'GCC',
      'Clang',
      'ABI',
      'threads',
      'sanitizers',
      'analyzer',
      'fuzz',
      'operating-system',
      'FFI',
      'load',
      'production',
    ]) {
      expect(transferText).toContain(boundary);
    }
    expect(transferText).toContain('PicoC 3.2.2');
    expect(transferText).toContain('Emscripten 6.0.3');
  });

  it('maps each module to current primary or recognized sources and explicit evidence limits', () => {
    expect(blueprint.sources).toHaveLength(30);
    expect(new Set(blueprint.sources.map((source) => source.url)).size).toBe(30);
    expect(blueprint.sources.every((source) => source.reviewedAt === '2026-07-14')).toBe(true);
    for (const moduleId of moduleIds) {
      const evidence = evidenceForModule(moduleId);
      expect(evidence.length, moduleId).toBeGreaterThanOrEqual(5);
      expect(
        evidence.some((value) =>
          /WG14|GCC|Clang|CERT|POSIX|CWE|Python|Rust|WebAssembly|Boehm|mimalloc|jemalloc/u.test(
            value
          )
        ),
        moduleId
      ).toBe(true);
    }
    expect(blueprint.sharedRequirements.join(' ')).toContain('Code shape alone');
    expect(blueprint.sharedRequirements.join(' ')).toContain('Unsafe examples');
  });
});
