import { describe, expect, it } from 'vitest';
import { loadCurriculumGraph, validateCurriculumGraph } from './repository';

describe('SQL and relational data systems v2 course', () => {
  const graph = loadCurriculumGraph('sql-basics');

  it('covers the researched institutional sequence and current dialect boundary', () => {
    expect(graph.course.moduleIds).toEqual([
      'sql-data-systems-lifecycle',
      'sql-relational-model-keys-nulls',
      'sql-select-expressions-types',
      'sql-filtering-logic-order',
      'sql-aggregation-grouping',
      'sql-joins-cardinality',
      'sql-subqueries-ctes-sets',
      'sql-data-modification',
      'sql-modeling-normalization',
      'sql-ddl-constraints-migrations',
      'sql-transactions-concurrency-recovery',
      'sql-window-analytics-time',
      'sql-views-triggers-programs',
      'sql-indexes-plans-performance',
      'sql-security-privacy-programmatic',
      'sql-dialects-distribution-capstone',
    ]);
    expect(graph.course.competencies).toHaveLength(80);
    expect(graph.course.description).toContain('research-backed');
    expect(graph.course.status).toBe('preview');
  });

  it('is schema-valid, prerequisite-ordered, cumulative, and interaction-complete', () => {
    expect(validateCurriculumGraph(graph)).toEqual([]);
    expect(graph.modules).toHaveLength(16);
    expect(graph.activities).toHaveLength(165);
    expect(graph.activities.at(-1)?.id).toBe('sql-basics-certification-exam');
    expect(new Set(graph.activities.map((activity) => activity.kind))).toEqual(
      new Set(['theory', 'workshop', 'debug', 'lab', 'review', 'quiz', 'project', 'exam'])
    );
    expect(
      graph.activities.every((activity, index) =>
        index === 0 ? activity.prerequisites.length === 0 : activity.prerequisites.length === 1
      )
    ).toBe(true);
  });

  it('makes every coding increment runnable SQL with changed-case evidence', () => {
    const codeSteps = graph.activities.flatMap((activity) =>
      activity.steps
        .map((step) => ({ activity, step }))
        .filter(({ step }) => step.interaction === 'code')
    );

    expect(codeSteps.length).toBeGreaterThan(100);
    expect(codeSteps.every(({ step }) => step.targetFile === 'sql')).toBe(true);
    expect(
      codeSteps.every(({ activity, step }) => {
        const checks = activity.checks.filter((check) => step.checkIds.includes(check.id));
        const sourcePattern = checks.find((check) => check.type === 'source-matches');
        const example = step.content.find((block) => block.type === 'code');
        return (
          checks.some(
            (check) =>
              check.type === 'source-includes' && check.expected.startsWith('-- Evidence: sql-')
          ) &&
          sourcePattern?.type === 'source-matches' &&
          sourcePattern.file === 'sql' &&
          sourcePattern.pattern.includes('observation|reconciliation|verify') &&
          example?.type === 'code' &&
          example.language === 'sql' &&
          new RegExp(sourcePattern.pattern, sourcePattern.flags).test(example.code)
        );
      })
    ).toBe(true);
    expect(
      graph.activities.every((activity) => activity.starterFiles?.sql.includes('sqlite_version()'))
    ).toBe(true);
  });

  it('routes worked examples to SQL and research anchors to the relevant authority', () => {
    const codeBlocks = graph.activities.flatMap((activity) =>
      activity.steps.flatMap((step) => step.content.filter((block) => block.type === 'code'))
    );
    const selectLesson = graph.activities.find((activity) =>
      activity.id.endsWith('sql-select-from-concept')
    );
    const securityLesson = graph.activities.find((activity) =>
      activity.id.endsWith('sql-parameterized-queries-concept')
    );
    const evidenceValues = (activity: (typeof graph.activities)[number] | undefined) =>
      activity?.steps.flatMap((step) =>
        step.content.flatMap((block) => (block.type === 'evidence' ? [block.value] : []))
      ) ?? [];

    expect(codeBlocks.every((block) => block.type === 'code' && block.language === 'sql')).toBe(
      true
    );
    expect(
      evidenceValues(selectLesson).some((value) => value.includes('SQLite SQL Language'))
    ).toBe(true);
    expect(
      evidenceValues(securityLesson).some((value) => value.includes('OWASP SQL Injection'))
    ).toBe(true);
  });

  it('retains distinct scenarios and source evidence markers across all activities', () => {
    const signatures = graph.activities.map((activity) => `${activity.title}\n${activity.summary}`);
    const markers = graph.activities.flatMap((activity) =>
      activity.checks.flatMap((check) => (check.type === 'source-includes' ? [check.expected] : []))
    );

    expect(new Set(signatures).size).toBe(signatures.length);
    expect(new Set(markers).size).toBe(markers.length);
  });

  it('does not repeat step prose, hints, or answer choices as a disguised template', () => {
    const steps = graph.activities.flatMap((activity) => activity.steps);
    const courseWideValues = [
      steps.map((step) => step.title),
      steps.map((step) => step.instruction),
      steps.map((step) => step.why),
      steps.flatMap((step) => step.hints),
    ];

    for (const values of courseWideValues) {
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
