import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { auditCourseBlueprint, CourseBlueprintSchema } from './blueprint';
import { loadCurriculumGraph, validateCurriculumGraph } from './repository';

const moduleIds = [
  'bookbot-outcomes-repo-evidence',
  'bookbot-cli-lifecycle-contract',
  'bookbot-paths-file-admission',
  'bookbot-text-io-encoding',
  'bookbot-unicode-normalization',
  'bookbot-tokenization-word-policy',
  'bookbot-frequency-counter',
  'bookbot-ranking-determinism',
  'bookbot-character-grapheme-metrics',
  'bookbot-streaming-bounded-memory',
  'bookbot-domain-model-pipeline',
  'bookbot-report-format-accessibility',
  'bookbot-errors-exit-status',
  'bookbot-argparse-interface',
  'bookbot-testing-fixtures',
  'bookbot-performance-profiling',
  'bookbot-packaging-release',
  'bookbot-security-recovery-defense',
];

const stopWords = new Set(
  'the a an and or to of in for with this that from as is are be before after one bookbot python evidence current changed case team browser code text file report command build deterministic transfer gate competency probe'.split(
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

const graph = loadCurriculumGraph('build-bookbot-python');
const blueprint = CourseBlueprintSchema.parse(
  JSON.parse(
    readFileSync(path.join(process.cwd(), 'blueprints', 'build-bookbot-python.json'), 'utf8')
  )
);

describe('Unicode-safe Bookbot with Python 3.14 v2 guided project', () => {
  it('follows corpus decision through production defense at full guided-project depth', () => {
    expect(graph.course.moduleIds).toEqual(moduleIds);
    expect(graph.course.competencies).toHaveLength(90);
    expect(graph.modules).toHaveLength(18);
    expect(graph.activities).toHaveLength(186);
    expect(graph.activities.reduce((total, activity) => total + activity.steps.length, 0)).toBe(
      1519
    );
    expect(graph.activities.reduce((total, activity) => total + activity.checks.length, 0)).toBe(
      1669
    );
    expect(graph.course.credential.requiredProjectIds).toHaveLength(5);
    expect(graph.activities.at(-1)?.id).toBe('build-bookbot-python-certification-exam');
  });

  it('is schema-valid, audited, cumulative, prerequisite-gated, and scenario-diverse', () => {
    expect(validateCurriculumGraph(graph)).toEqual([]);
    expect(auditCourseBlueprint(blueprint)).toEqual([]);
    expect(blueprint.status).toBe('audit-required');
    expect(blueprint.pathways.prerequisiteCourseIds).toEqual(['python-basics', 'git-basics']);
    expect(graph.course.prerequisites).toEqual(['python-basics', 'git-basics']);
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

  it('gives every build an exact runnable changed-case Python contract', () => {
    const codeSteps = graph.activities.flatMap((activity) =>
      activity.steps
        .map((step) => ({ activity, step }))
        .filter(({ step }) => step.interaction === 'code')
    );
    expect(codeSteps).toHaveLength(150);
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
          marker.expected.includes('# Evidence: bookbot-') &&
          structure?.type === 'source-matches' &&
          structure.file === 'python' &&
          example?.type === 'code' &&
          example.language === 'python' &&
          example.code.includes('# Changed case:') &&
          example.code.includes('assert ') &&
          new RegExp(structure.pattern, structure.flags).test(example.code)
        );
      })
    ).toBe(true);
    expect(
      graph.activities.every(
        (activity) =>
          activity.starterFiles?.python.includes('Unicode-safe text-analysis portfolio') &&
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
      `near-duplicate Bookbot Python examples ${closest.left} and ${closest.right}`
    ).toBeLessThan(0.9);
  });

  it('parses every Python source and default-runs every lesson evidence function', () => {
    const activityRoot = path.join(
      process.cwd(),
      'content',
      'v2',
      'courses',
      'build-bookbot-python',
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
        compiled = compile(source, label, "exec")
        parsed += 1
        if not run_function:
            continue
        namespace = {"__name__": "bookbot_lesson_check"}
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
    expect(result.stdout.trim()).toBe('parsed=426 executed=240');
  });

  it('uses current primary authorities and preserves honest browser-versus-native boundaries', () => {
    expect(blueprint.researchedAt.startsWith('2026-07')).toBe(true);
    expect(blueprint.sources.length).toBeGreaterThanOrEqual(20);
    const authority = blueprint.sources
      .map((source) => `${source.title} ${source.version} ${source.scope}`)
      .join('\n');
    for (const required of [
      'Python 3.14.6',
      'Unicode 17.0.0',
      'Unicode Text Segmentation',
      'Python argparse',
      'Python unittest',
      'Python Packaging',
      'Git 2.55',
      'WCAG 2.2',
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
    expect(corpus).toContain('Bookbot');
    expect(corpus).toContain('Unicode');
    expect(corpus).toContain('corpus authority');
    expect(corpus).toContain('stdout');
    expect(corpus).toContain('fresh environment');
    expect(corpus).toContain('controlled transfer gates');
    expect(corpus).not.toMatch(/RabbitMQ|CloudFront|vector database|AES-GCM|ServeMux/);
  });
});
