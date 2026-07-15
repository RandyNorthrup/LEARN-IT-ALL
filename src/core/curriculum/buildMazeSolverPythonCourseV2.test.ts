import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { auditCourseBlueprint, CourseBlueprintSchema } from './blueprint';
import { loadCurriculumGraph, validateCurriculumGraph } from './repository';

const moduleIds = [
  'maze-outcomes-repo-accessibility',
  'maze-runtime-tk-event-loop',
  'maze-grid-coordinate-model',
  'maze-wall-cell-invariants',
  'maze-canvas-rendering-tags',
  'maze-layout-resize-scaling',
  'maze-input-focus-bindings',
  'maze-graph-topology',
  'maze-generation-backtracker',
  'maze-generation-alternatives-bias',
  'maze-dfs-solver-recursion',
  'maze-bfs-shortest-path',
  'maze-weighted-dijkstra-astar',
  'maze-solver-evidence-comparison',
  'maze-animation-after-cancel',
  'maze-state-machine-controls',
  'maze-architecture-pure-core',
  'maze-accessible-interface',
  'maze-determinism-replay-save',
  'maze-testing-properties-headless',
  'maze-performance-profiling',
  'maze-packaging-platforms',
  'maze-security-local-files',
  'maze-release-recovery-defense',
];

const stopWords = new Set(
  'the a an and or to of in for with this that from as is are be before after one maze python evidence current changed case team browser code build puzzle solver transfer gate competency probe player'.split(
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

const graph = loadCurriculumGraph('build-maze-solver-python');
const blueprint = CourseBlueprintSchema.parse(
  JSON.parse(
    readFileSync(path.join(process.cwd(), 'blueprints', 'build-maze-solver-python.json'), 'utf8')
  )
);

describe('accessible maze solver with Python 3.14 and Tkinter v2 guided project', () => {
  it('builds from player outcome through production recovery at full project depth', () => {
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
    expect(graph.activities.at(-1)?.id).toBe('build-maze-solver-python-certification-exam');
  });

  it('is schema-valid, audited, cumulative, prerequisite-gated, and scenario-diverse', () => {
    expect(validateCurriculumGraph(graph)).toEqual([]);
    expect(auditCourseBlueprint(blueprint)).toEqual([]);
    expect(blueprint.status).toBe('approved');
    expect(blueprint.pathways.prerequisiteCourseIds).toEqual(['python-basics', 'python-dsa']);
    expect(graph.course.prerequisites).toEqual(['python-basics', 'python-dsa']);
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

  it('gives every code build an exact runnable changed-case maze contract', () => {
    const codeSteps = graph.activities.flatMap((activity) =>
      activity.steps
        .map((step) => ({ activity, step }))
        .filter(({ step }) => step.interaction === 'code')
    );
    expect(codeSteps).toHaveLength(198);
    expect(codeSteps.every(({ step }) => step.targetFile === 'python')).toBe(true);
    expect(
      codeSteps.every(({ activity, step }) => {
        const checks = activity.checks.filter((check) => step.checkIds.includes(check.id));
        const marker = checks.find((check) => check.type === 'source-includes');
        const structure = checks.find((check) => check.type === 'source-matches');
        const example = step.content.find((block) => block.type === 'code');
        return (
          marker?.type === 'source-includes' &&
          marker.file === 'python' &&
          marker.expected.includes('# Evidence: maze-') &&
          structure?.type === 'source-matches' &&
          structure.file === 'python' &&
          example?.type === 'code' &&
          example.language === 'python' &&
          example.code.includes('# Changed case:') &&
          example.code.includes('assert ') &&
          !/(?:from|import)\s+tkinter|open\s*\(/u.test(example.code) &&
          new RegExp(structure.pattern, structure.flags).test(example.code)
        );
      })
    ).toBe(true);
    expect(
      graph.activities.every(
        (activity) =>
          activity.starterFiles?.python.includes('cumulative accessible desktop maze portfolio') &&
          activity.starterFiles.python.includes('controlled transfer gates')
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
      `near-duplicate maze Python examples ${closest.left} and ${closest.right}`
    ).toBeLessThan(0.9);
  });

  it('parses and default-runs every browser Python maze model', () => {
    const activityRoot = path.join(
      process.cwd(),
      'content',
      'v2',
      'courses',
      'build-maze-solver-python',
      'activities'
    );
    const script = `
import json
import pathlib
import re
import sys

root = pathlib.Path(sys.argv[1])
parsed = 0
executed = 0
for path in sorted(root.glob("*.json")):
    activity = json.loads(path.read_text(encoding="utf-8"))
    sources = []
    starter = activity.get("starterFiles", {}).get("python")
    if starter:
        sources.append((f"{activity['id']} starter", starter, False))
    for step_index, step in enumerate(activity.get("steps", []), start=1):
        for block_index, block in enumerate(step.get("content", []), start=1):
            if block.get("type") == "code" and block.get("language") == "python":
                sources.append((f"{activity['id']} step {step_index} block {block_index}", block["code"], True))
    for label, source, run_function in sources:
        if re.search(r"(?:from|import)\\s+tkinter|open\\s*\\(", source):
            raise AssertionError(f"{label}: browser model crosses a native boundary")
        compiled = compile(source, label, "exec")
        parsed += 1
        if not run_function:
            continue
        namespace = {"__name__": "maze_lesson_check"}
        exec(compiled, namespace)
        functions = [value for key, value in namespace.items() if key.startswith(("worked_", "evidence_")) and callable(value)]
        if len(functions) != 1:
            raise AssertionError(f"{label}: expected one lesson function, found {len(functions)}")
        result = functions[0]()
        if not isinstance(result, tuple) or len(result) != 3 or result[0] is not True:
            raise AssertionError(f"{label}: invalid default evidence {result!r}")
        executed += 1

print(f"parsed={parsed} executed={executed}")
`;
    const result = spawnSync('python3', ['-c', script, activityRoot], {
      encoding: 'utf8',
      maxBuffer: 16 * 1024 * 1024,
    });
    expect(result.status, result.stderr || result.stdout).toBe(0);
    expect(result.stdout.trim()).toBe('parsed=564 executed=318');
  });

  it('uses current primary authorities and preserves honest browser and native boundaries', () => {
    expect(blueprint.researchedAt.startsWith('2026-07')).toBe(true);
    expect(blueprint.sources.length).toBeGreaterThanOrEqual(20);
    const authority = blueprint.sources
      .map((source) => `${source.title} ${source.version} ${source.scope}`)
      .join('\n');
    for (const required of [
      'Python 3.14.6',
      'Python tkinter Documentation',
      'Tcl and Tk 8.6.18',
      'Tk Canvas Manual',
      'Tk bind Manual',
      'Tcl after Manual',
      'Minimum Cost Paths',
      'Generating Random Spanning Trees',
      'WCAG 2.2',
      'Xbox Accessibility Guidelines 3.2',
      'PyInstaller 6.21.0',
      'Git 2.55',
      'CS2023',
    ]) {
      expect(authority).toContain(required);
    }

    const corpus = graph.activities
      .flatMap((activity) => [
        activity.title,
        activity.summary,
        ...activity.steps.flatMap((step) => [
          step.title,
          step.instruction,
          step.why,
          ...step.content.map((block) => JSON.stringify(block)),
        ]),
      ])
      .join('\n');
    expect(corpus).toContain('Tkinter');
    expect(corpus).toContain('controlled native transfer');
    expect(corpus).toContain('A-star');
    expect(corpus).not.toContain('CommonMark');
    expect(corpus).not.toContain('pygame-ce');
    expect(corpus).not.toContain('RabbitMQ');
    expect(corpus).not.toContain('CloudFront');
    expect(corpus).not.toContain('target authority, credentials, body ownership');
    expect(corpus).not.toContain('resolution, transport, redirect, status');
    expect(corpus).not.toContain('request or response model');
    expect(corpus).not.toContain('live-network transfer limits');
    expect(corpus).not.toContain('HTTP evidence cycle');
  });

  it('retrieves earlier competencies and reaches transfer before summative evidence', () => {
    const priorModuleIds = new Set<string>();
    for (const module of graph.modules) {
      expect(module.prerequisites.every((id) => priorModuleIds.has(id))).toBe(true);
      expect(module.activityIds.length).toBeGreaterThanOrEqual(10);
      priorModuleIds.add(module.id);
    }
    for (const competency of graph.course.competencies) {
      const related = graph.activities.filter((activity) =>
        [
          ...activity.competencyCoverage.introduces,
          ...activity.competencyCoverage.reinforces,
          ...activity.competencyCoverage.assesses,
        ].includes(competency.id)
      );
      expect(related.length, competency.id).toBeGreaterThanOrEqual(4);
      expect(related.some((activity) => activity.kind === 'workshop')).toBe(true);
      expect(related.some((activity) => ['lab', 'project', 'exam'].includes(activity.kind))).toBe(
        true
      );
    }
  });
});
