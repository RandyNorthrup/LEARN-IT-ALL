import { describe, expect, it } from 'vitest';
import { loadCurriculumGraph, validateCurriculumGraph } from './repository';

const browserImportAllowlist = new Set([
  'bytes',
  'cmp',
  'container/heap',
  'container/list',
  'container/ring',
  'context',
  'encoding/csv',
  'encoding/hex',
  'encoding/json',
  'errors',
  'fmt',
  'io',
  'maps',
  'math',
  'math/bits',
  'math/rand',
  'math/rand/v2',
  'reflect',
  'regexp',
  'slices',
  'sort',
  'strconv',
  'strings',
  'sync',
  'sync/atomic',
  'time',
  'unicode',
  'unicode/utf8',
]);

describe('Modern Go 1.26 v2 course', () => {
  const graph = loadCurriculumGraph('go-basics');

  it('covers the researched sequence from first program through production defense', () => {
    expect(graph.course.moduleIds).toEqual([
      'go-toolchain-programs-packages',
      'go-values-variables-types',
      'go-control-flow-defer',
      'go-functions-closures-contracts',
      'go-arrays-slices-memory',
      'go-maps-strings-unicode',
      'go-structs-methods-composition',
      'go-interfaces-errors-boundaries',
      'go-failures-resources-recovery',
      'go-packages-modules-workspaces',
      'go-generics-constraints-iterators',
      'go-testing-fuzzing-quality',
      'go-goroutines-channels-select',
      'go-context-cancellation-backpressure',
      'go-memory-model-synchronization',
      'go-io-serialization-cli',
      'go-http-services-security',
      'go-diagnostics-performance-release',
    ]);
    expect(graph.course.competencies).toHaveLength(90);
    expect(graph.course.description).toContain('research-backed');
    expect(graph.course.status).toBe('preview');
  });

  it('is schema-valid, prerequisite-ordered, cumulative, and interaction-complete', () => {
    expect(validateCurriculumGraph(graph)).toEqual([]);
    expect(graph.modules).toHaveLength(18);
    expect(graph.activities).toHaveLength(186);
    expect(graph.activities.at(-1)?.id).toBe('go-basics-certification-exam');
    expect(graph.course.credential.requiredProjectIds).toHaveLength(5);
    expect(new Set(graph.activities.map((activity) => activity.kind))).toEqual(
      new Set(['theory', 'workshop', 'debug', 'lab', 'review', 'quiz', 'project', 'exam'])
    );
    expect(
      graph.activities.every((activity, index) =>
        index === 0 ? activity.prerequisites.length === 0 : activity.prerequisites.length === 1
      )
    ).toBe(true);
  });

  it('makes every coding increment executable Go with scoped changed-case evidence', () => {
    const codeSteps = graph.activities.flatMap((activity) =>
      activity.steps
        .map((step) => ({ activity, step }))
        .filter(({ step }) => step.interaction === 'code')
    );

    expect(codeSteps.length).toBeGreaterThan(100);
    expect(codeSteps.every(({ step }) => step.targetFile === 'go')).toBe(true);
    expect(
      codeSteps.every(({ activity, step }) => {
        const checks = activity.checks.filter((check) => step.checkIds.includes(check.id));
        const sourcePattern = checks.find((check) => check.type === 'source-matches');
        const example = step.content.find((block) => block.type === 'code');
        return (
          checks.some(
            (check) =>
              check.type === 'source-includes' && check.expected.startsWith('// Evidence: go-')
          ) &&
          sourcePattern?.type === 'source-matches' &&
          sourcePattern.file === 'go' &&
          example?.type === 'code' &&
          example.language === 'go' &&
          new RegExp(sourcePattern.pattern, sourcePattern.flags).test(example.code)
        );
      })
    ).toBe(true);
    expect(
      graph.activities.every(
        (activity) =>
          activity.starterFiles?.go.includes('package main') &&
          activity.starterFiles.go.includes('isolated Yaegi subset')
      )
    ).toBe(true);
  });

  it('keeps browser-runnable examples inside the runtime import boundary', () => {
    const codeBlocks = graph.activities.flatMap((activity) =>
      activity.steps.flatMap((step) =>
        step.content.flatMap((block) => (block.type === 'code' ? [block] : []))
      )
    );
    const imports = codeBlocks.flatMap((block) =>
      Array.from(block.code.matchAll(/(?:import\s+|^\s*)"([^"]+)"/gm), (match) => match[1])
    );

    expect(codeBlocks.every((block) => block.language === 'go')).toBe(true);
    expect(imports.length).toBeGreaterThan(20);
    expect(imports.every((importPath) => browserImportAllowlist.has(importPath))).toBe(true);
    expect(imports).not.toContain('os');
    expect(imports).not.toContain('net/http');
  });

  it('routes research anchors to the governing current Go authority', () => {
    const evidenceValues = (activity: (typeof graph.activities)[number] | undefined) =>
      activity?.steps.flatMap((step) =>
        step.content.flatMap((block) => (block.type === 'evidence' ? [block.value] : []))
      ) ?? [];
    const concept = (suffix: string) =>
      graph.activities.find((activity) => activity.id.endsWith(`${suffix}-concept`));

    expect(
      evidenceValues(concept('go-basic-types-zero-values')).some((value) =>
        value.includes('Language Specification')
      )
    ).toBe(true);
    expect(
      evidenceValues(concept('go-module-version-selection')).some((value) =>
        value.includes('Modules Reference')
      )
    ).toBe(true);
    expect(
      evidenceValues(concept('go-data-races-happens-before')).some((value) =>
        value.includes('Memory Model')
      )
    ).toBe(true);
    expect(
      evidenceValues(concept('go-service-validation-security')).some((value) =>
        value.includes('Security Best Practices')
      )
    ).toBe(true);
    expect(
      evidenceValues(concept('go-profile-trace-diagnostics')).some((value) =>
        value.includes('Diagnostics')
      )
    ).toBe(true);
  });

  it('does not repeat activity signatures, evidence markers, step prose, hints, or choices', () => {
    const signatures = graph.activities.map((activity) => `${activity.title}\n${activity.summary}`);
    const markers = graph.activities.flatMap((activity) =>
      activity.checks.flatMap((check) => (check.type === 'source-includes' ? [check.expected] : []))
    );
    const steps = graph.activities.flatMap((activity) => activity.steps);

    expect(new Set(signatures).size).toBe(signatures.length);
    expect(new Set(markers).size).toBe(markers.length);
    for (const values of [
      steps.map((step) => step.title),
      steps.map((step) => step.instruction),
      steps.map((step) => step.why),
      steps.flatMap((step) => step.hints),
    ]) {
      expect(new Set(values).size).toBe(values.length);
    }
    for (const activity of graph.activities) {
      const options = activity.steps.flatMap(
        (step) => step.options?.map((option) => option.text) ?? []
      );
      expect(new Set(options).size, activity.id).toBe(options.length);
    }
  });
});
