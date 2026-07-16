import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { simulateTerminalCommands } from '../learning/networkSimulator';
import { auditCourseBlueprint, CourseBlueprintSchema } from './blueprint';
import { loadCurriculumGraph, validateCurriculumGraph } from './repository';

const moduleIds = [
  'git-advanced-state-revisions',
  'git-advanced-objects-storage-integrity',
  'git-advanced-reflog-reachability-recovery',
  'git-advanced-undo-layered-repair',
  'git-advanced-merge-bases-strategies',
  'git-advanced-conflict-stages-rerere',
  'git-advanced-rebase-sequencer',
  'git-advanced-cherry-pick-replay',
  'git-advanced-stash-wip-patches',
  'git-advanced-bisect-regression',
  'git-advanced-worktrees-parallel',
  'git-advanced-remotes-refspecs-leases',
  'git-advanced-collaboration-stacks-maintainers',
  'git-advanced-tags-signatures-releases',
  'git-advanced-submodules-boundaries',
  'git-advanced-partial-sparse-scale',
  'git-advanced-attributes-filters-merges',
  'git-advanced-hooks-config-trust',
  'git-advanced-maintenance-performance',
  'git-advanced-hash-transition-disaster',
];

const similarityStopWords = new Set(
  'the a an and or to of in for with this that from as is are be before after one git advanced repository task evidence current changed case learner simulator operation state command review transfer preserve verify proof recovery limit exact'.split(
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

const graph = loadCurriculumGraph('git-advanced');
const blueprint = CourseBlueprintSchema.parse(
  JSON.parse(readFileSync(path.join(process.cwd(), 'blueprints', 'git-advanced.json'), 'utf8'))
);

describe('Advanced Git 2.55 v2 course', () => {
  it('follows the state-to-disaster-defense prerequisite sequence at full depth', () => {
    expect(graph.course.moduleIds).toEqual(moduleIds);
    expect(graph.course.competencies).toHaveLength(100);
    expect(graph.modules).toHaveLength(20);
    expect(graph.activities).toHaveLength(206);
    expect(graph.activities.reduce((total, activity) => total + activity.steps.length, 0)).toBe(
      1678
    );
    expect(graph.activities.reduce((total, activity) => total + activity.checks.length, 0)).toBe(
      1844
    );
    expect(graph.course.credential.requiredProjectIds).toHaveLength(5);
    expect(graph.activities.at(-1)?.id).toBe('git-advanced-certification-exam');
  });

  it('is schema-valid, audited, cumulative, prerequisite-gated, and interaction-complete', () => {
    expect(validateCurriculumGraph(graph)).toEqual([]);
    expect(auditCourseBlueprint(blueprint)).toEqual([]);
    expect(blueprint.status).toBe('audit-required');
    expect(blueprint.pathways.prerequisiteCourseIds).toEqual(['git-basics']);
    expect(graph.course.prerequisites).toEqual(['git-basics']);
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
          competency.misconceptions.every((misconception) => misconception.length >= 20)
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

  it('gives every repository increment exact refs, state, changed-case, and recovery evidence', () => {
    const codeSteps = graph.activities.flatMap((activity) =>
      activity.steps
        .map((step) => ({ activity, step }))
        .filter(({ step }) => step.interaction === 'code')
    );

    expect(codeSteps).toHaveLength(166);
    expect(codeSteps.every(({ step }) => step.targetFile === 'shell')).toBe(true);
    expect(
      codeSteps.every(({ activity, step }) => {
        const checks = activity.checks.filter((check) => step.checkIds.includes(check.id));
        const marker = checks.find((check) => check.type === 'source-includes');
        const structure = checks.find((check) => check.type === 'source-matches');
        const example = step.content.find((block) => block.type === 'code');
        return (
          marker?.type === 'source-includes' &&
          marker.file === 'shell' &&
          marker.expected.includes('# Evidence: gita-') &&
          structure?.type === 'source-matches' &&
          structure.file === 'shell' &&
          example?.type === 'code' &&
          example.language === 'bash' &&
          example.code.includes('# before-ref:') &&
          example.code.includes('# after-ref:') &&
          example.code.includes('# tree-proof:') &&
          example.code.includes('# behavior-proof:') &&
          example.code.includes('# changed-case:') &&
          example.code.includes('# recovery:') &&
          example.code.includes('# transfer-limit:') &&
          new RegExp(structure.pattern, structure.flags).test(example.code)
        );
      })
    ).toBe(true);
    expect(
      graph.activities.every(
        (activity) =>
          activity.starterFiles?.shell.includes(
            'Git operations change only disposable simulated repository state'
          ) &&
          activity.starterFiles.shell.includes(
            'Inspect status, diffs, graph, refs, and recovery'
          ) &&
          activity.starterFiles.config === ''
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
      `near-duplicate Advanced Git evidence examples ${closest.left} and ${closest.right}`
    ).toBeLessThan(0.9);
  });

  it('runs every authored Git command through meaningful safe deterministic simulation', () => {
    const codeExamples = graph.activities.flatMap((activity) =>
      activity.steps.flatMap((step) =>
        step.interaction === 'code'
          ? step.content.flatMap((block) => (block.type === 'code' ? [block.code] : []))
          : []
      )
    );
    for (const example of codeExamples) {
      const output = simulateTerminalCommands(example);
      expect(output).not.toContain('fatal: not a git repository');
      expect(output).not.toContain('was parsed in the safe simulator');
      expect(output).not.toContain('never executes learner shell input');
      expect(output.length).toBeGreaterThan(40);
    }

    const simulatorSource = readFileSync(
      path.join(process.cwd(), 'src/core/learning/networkSimulator.ts'),
      'utf8'
    );
    expect(simulatorSource).not.toMatch(
      /child_process|execSync|spawnSync|Bun\.spawn|Deno\.Command/
    );
    expect(simulatorSource).toContain('no network or credential operation occurred');
  });

  it('uses current official Git research and records experimental or transition limits', () => {
    expect(blueprint.version).toBe('2026.07');
    expect(blueprint.researchedAt.startsWith('2026-07-14')).toBe(true);
    expect(blueprint.sources).toHaveLength(20);
    expect(blueprint.sources.every((source) => source.reviewedAt === '2026-07-14')).toBe(true);
    expect(blueprint.sources.every((source) => source.url.startsWith('https://git-scm.com/'))).toBe(
      true
    );
    expect(blueprint.sources.some((source) => source.version.includes('Git 2.55.0'))).toBe(true);
    expect(
      blueprint.sources.some((source) => source.title.includes('Hash Function Transition'))
    ).toBe(true);
    expect(blueprint.scope.includes.join(' ')).toContain('SHA-256 transition');
    expect(blueprint.scope.excludes.join(' ')).toContain('live credential use');
  });
});
