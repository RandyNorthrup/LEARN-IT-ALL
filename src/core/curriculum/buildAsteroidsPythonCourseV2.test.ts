import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { auditCourseBlueprint, CourseBlueprintSchema } from './blueprint';
import { loadCurriculumGraph, validateCurriculumGraph } from './repository';

const moduleIds = [
  'asteroids-outcomes-repo-accessibility',
  'asteroids-runtime-sdl-loop',
  'asteroids-coordinate-vector-units',
  'asteroids-time-step-simulation',
  'asteroids-input-events-remapping',
  'asteroids-game-state-scenes',
  'asteroids-ship-motion-physics',
  'asteroids-wrap-viewport-resize',
  'asteroids-render-surfaces-assets',
  'asteroids-projectiles-cooldowns-pools',
  'asteroids-generation-polygons-difficulty',
  'asteroids-collision-detection',
  'asteroids-collision-response-damage',
  'asteroids-score-progression-spawning',
  'asteroids-sprites-groups-ownership',
  'asteroids-audio-mixer-cues',
  'asteroids-hud-menus-accessibility',
  'asteroids-determinism-replay-save',
  'asteroids-architecture-pure-core',
  'asteroids-testing-headless-fixtures',
  'asteroids-performance-profiling',
  'asteroids-packaging-assets-platforms',
  'asteroids-security-save-assets',
  'asteroids-release-recovery-defense',
];

const stopWords = new Set(
  'the a an and or to of in for with this that from as is are be before after one asteroids python evidence current changed case team browser code game player build deterministic transfer gate competency probe pygame'.split(
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

const graph = loadCurriculumGraph('build-asteroids-python');
const blueprint = CourseBlueprintSchema.parse(
  JSON.parse(
    readFileSync(path.join(process.cwd(), 'blueprints', 'build-asteroids-python.json'), 'utf8')
  )
);

describe('accessible Asteroids with Python 3.14 and pygame-ce 2.5.7 v2 guided project', () => {
  it('follows player outcome through production defense at full guided-project depth', () => {
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
    expect(graph.activities.at(-1)?.id).toBe('build-asteroids-python-certification-exam');
  });

  it('is schema-valid, audited, cumulative, prerequisite-gated, and scenario-diverse', () => {
    expect(validateCurriculumGraph(graph)).toEqual([]);
    expect(auditCourseBlueprint(blueprint)).toEqual([]);
    expect(blueprint.status).toBe('approved');
    expect(blueprint.pathways.prerequisiteCourseIds).toEqual(['python-basics', 'python-oop']);
    expect(graph.course.prerequisites).toEqual(['python-basics', 'python-oop']);
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
        .map((activity) => ({
          id: activity.id,
          words: terms(activity.authenticContext),
        }));
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

  it('gives every build an exact runnable changed-case Python game contract', () => {
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
          marker.expected.includes('# Evidence: asteroids-') &&
          structure?.type === 'source-matches' &&
          structure.file === 'python' &&
          example?.type === 'code' &&
          example.language === 'python' &&
          example.code.includes('# Changed case:') &&
          example.code.includes('assert ') &&
          !example.code.includes('import pygame') &&
          new RegExp(structure.pattern, structure.flags).test(example.code)
        );
      })
    ).toBe(true);
    expect(
      graph.activities.every(
        (activity) =>
          activity.starterFiles?.python.includes('accessible real-time game portfolio') &&
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
      `near-duplicate Asteroids Python examples ${closest.left} and ${closest.right}`
    ).toBeLessThan(0.9);
  });

  it('parses and default-runs every browser Python game model', () => {
    const activityRoot = path.join(
      process.cwd(),
      'content',
      'v2',
      'courses',
      'build-asteroids-python',
      'activities'
    );
    const script = `
import json
import pathlib
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
        if "import pygame" in source:
            raise AssertionError(f"{label}: browser model imports native pygame")
        compiled = compile(source, label, "exec")
        parsed += 1
        if not run_function:
            continue
        namespace = {"__name__": "asteroids_lesson_check"}
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

  it('uses current primary authorities and preserves honest browser-versus-desktop boundaries', () => {
    expect(blueprint.researchedAt.startsWith('2026-07')).toBe(true);
    expect(blueprint.sources.length).toBeGreaterThanOrEqual(23);
    const authority = blueprint.sources
      .map((source) => `${source.title} ${source.version} ${source.scope}`)
      .join('\n');
    for (const required of [
      'Python 3.14.6',
      'pygame-ce 2.5.7',
      'Python 3.14 wheels',
      'Event Queue',
      'Vector Mathematics',
      'Sprites and Groups',
      'PyInstaller 6.21',
      'Xbox Accessibility Guidelines 3.2',
      'WCAG 2.2',
      'Git 2.55',
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
    expect(corpus).toContain('Asteroids');
    expect(corpus).toContain('pygame-ce');
    expect(corpus).toContain('SDL');
    expect(corpus).toContain('frame rate');
    expect(corpus).toContain('accessibility');
    expect(corpus).toContain('controlled desktop transfer gates');
    expect(corpus).not.toMatch(/Bookbot|RabbitMQ|CloudFront|vector database|AES-GCM|ServeMux/);
  });
});
