import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { auditCourseBlueprint, CourseBlueprintSchema } from './blueprint';
import { loadCurriculumGraph, validateCurriculumGraph } from './repository';

const moduleIds = [
  'scraper-outcomes-authorization-evidence',
  'scraper-repo-runtime-dependencies',
  'scraper-crawl-scope-policy',
  'scraper-url-identity-canonicalization',
  'scraper-robots-sitemaps',
  'scraper-http-fetch-contract',
  'scraper-bytes-encoding-admission',
  'scraper-html-parser-models',
  'scraper-selectors-tree-extraction',
  'scraper-typed-records-provenance',
  'scraper-link-discovery-relations',
  'scraper-crawl-graph-frontier',
  'scraper-url-traps-infinite-spaces',
  'scraper-politeness-rate-retries',
  'scraper-async-structured-concurrency',
  'scraper-session-auth-boundaries',
  'scraper-incremental-checkpoint-cache',
  'scraper-content-dedup-change',
  'scraper-indexing-canonical-hreflang',
  'scraper-structured-social-metadata',
  'scraper-accessibility-audit',
  'scraper-performance-resource-audit',
  'scraper-dynamic-rendering-playwright',
  'scraper-blocks-anti-bot-boundary',
  'scraper-security-untrusted-content',
  'scraper-export-accessible-reports',
  'scraper-testing-fixtures-faults',
  'scraper-scrapy-scale-observability',
  'scraper-packaging-scheduling-operations',
  'scraper-release-recovery-defense',
];

const stopWords = new Set(
  'the a an and or to of in for with this that from as is are be before after one scraper crawler python evidence current changed case team browser code model decision build deterministic production transfer gate competency probe authorized crawl site page'.split(
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

const graph = loadCurriculumGraph('build-web-scraper-python');
const blueprint = CourseBlueprintSchema.parse(
  JSON.parse(
    readFileSync(path.join(process.cwd(), 'blueprints', 'build-web-scraper-python.json'), 'utf8')
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

describe('authorized web crawler and accessible site auditor with Python 3.14 v2 course', () => {
  it('progresses from authorization through release recovery at full project depth', () => {
    expect(graph.course.moduleIds).toEqual(moduleIds);
    expect(graph.course.competencies).toHaveLength(150);
    expect(graph.modules).toHaveLength(30);
    expect(graph.activities).toHaveLength(306);
    expect(graph.activities.reduce((total, activity) => total + activity.steps.length, 0)).toBe(
      2494
    );
    expect(graph.activities.reduce((total, activity) => total + activity.checks.length, 0)).toBe(
      2740
    );
    expect(graph.course.credential.requiredProjectIds).toHaveLength(5);
    expect(graph.activities.at(-1)?.id).toBe('build-web-scraper-python-certification-exam');
  });

  it('is schema-valid, cumulative, prerequisite-gated, and scenario-diverse', () => {
    expect(validateCurriculumGraph(graph)).toEqual([]);
    expect(auditCourseBlueprint(blueprint)).toEqual([]);
    expect(blueprint.status).toBe('approved');
    expect(blueprint.pathways.prerequisiteCourseIds).toEqual([
      'python-basics',
      'python-dsa',
      'http-clients-python',
      'responsive-web-design',
      'git-basics',
    ]);
    expect(graph.course.prerequisites).toEqual(blueprint.pathways.prerequisiteCourseIds);
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

  it('gives every build a distinct exact runnable changed-case crawler contract', () => {
    const codeSteps = graph.activities.flatMap((activity) =>
      activity.steps
        .map((step) => ({ activity, step }))
        .filter(({ step }) => step.interaction === 'code')
    );
    expect(codeSteps).toHaveLength(246);
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
          marker.expected.includes('# Evidence: scraper-') &&
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
          activity.starterFiles?.python.includes('cumulative authorized crawler') &&
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
      `near-duplicate scraper Python examples ${closest.left} and ${closest.right}`
    ).toBeLessThan(0.9);
  });

  it('keeps one evidence profile per module and default-runs every browser Python model', () => {
    const contractSource = readFileSync(
      path.join(process.cwd(), 'scripts', 'lib', 'web-scraper-python-evidence-contracts.mjs'),
      'utf8'
    );
    const profileIds = [...contractSource.matchAll(/^ {2}'(scraper-[^']+)': profile\(/gmu)].map(
      (match) => match[1]
    );
    expect(profileIds).toEqual(moduleIds);
    expect(new Set(profileIds).size).toBe(moduleIds.length);

    const activityRoot = path.join(
      process.cwd(),
      'content',
      'v2',
      'courses',
      'build-web-scraper-python',
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
        forbidden = r"(?:^|\\n)\\s*(?:from|import)\\s+(?:httpx|bs4|lxml|scrapy|playwright|socket|urllib)|\\bopen\\s*\\("
        if re.search(forbidden, source):
            raise AssertionError(f"{label}: browser model crosses a native boundary")
        compiled = compile(source, label, "exec")
        parsed += 1
        if not run_function:
            continue
        namespace = {"__name__": "scraper_lesson_check"}
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
    expect(result.stdout.trim()).toBe('parsed=702 executed=396');
  }, 30_000);

  it('routes current primary sources and records exact stable stack boundaries', () => {
    const sourceExpectations: Array<[string, string]> = [
      ['scraper-outcomes-authorization-evidence', 'ACM Code of Ethics'],
      ['scraper-url-identity-canonicalization', 'WHATWG URL Living Standard'],
      ['scraper-robots-sitemaps', 'RFC 9309 Robots Exclusion Protocol'],
      ['scraper-http-fetch-contract', 'HTTPX 0.28.1'],
      ['scraper-bytes-encoding-admission', 'WHATWG HTML Living Standard Parsing'],
      ['scraper-html-parser-models', 'Beautiful Soup 4.15.0'],
      ['scraper-selectors-tree-extraction', 'Selectors Level 4'],
      ['scraper-async-structured-concurrency', 'Python asyncio Task Groups'],
      ['scraper-incremental-checkpoint-cache', 'RFC 9111 HTTP Caching'],
      ['scraper-accessibility-audit', 'WCAG 2.2 Recommendation'],
      ['scraper-dynamic-rendering-playwright', 'Playwright for Python 1.61.0'],
      ['scraper-security-untrusted-content', 'OWASP SSRF Prevention'],
      ['scraper-scrapy-scale-observability', 'Scrapy 2.17.0'],
      ['scraper-packaging-scheduling-operations', 'Python Packaging User Guide'],
    ];
    for (const [moduleId, title] of sourceExpectations) {
      expect(evidenceForModule(moduleId).some((value) => value.includes(title))).toBe(true);
    }
    expect(blueprint.version).toBe('2026.07');
    expect(blueprint.researchedAt.startsWith('2026-07-15')).toBe(true);
    expect(blueprint.sources).toHaveLength(28);
    const authority = blueprint.sources
      .map((source) => `${source.title} ${source.version} ${source.scope}`)
      .join('\n');
    for (const required of [
      'Python 3.14.6',
      'RFC 9309',
      'HTTPX 0.28.1',
      'Beautiful Soup 4.15.0',
      'lxml 6.1.1',
      'Scrapy 2.17.0',
      'Playwright for Python 1.61.0',
      'WCAG 2.2',
      'NIST Privacy Framework',
      'CS2023',
    ]) {
      expect(authority).toContain(required);
    }
  });

  it('teaches authorization and stop policy without inherited course cycles or evasion', () => {
    const learnerText = graph.activities
      .flatMap((activity) =>
        activity.steps.flatMap((step) => [
          step.instruction,
          step.why,
          ...step.content.flatMap((block) =>
            block.type === 'paragraph' || block.type === 'callout' ? [block.text] : []
          ),
          ...(step.options?.map((option) => option.text) ?? []),
        ])
      )
      .join('\n');
    expect(learnerText).toContain('authorization-to-recovery evidence cycle');
    expect(learnerText).toContain(
      'no block, CAPTCHA, identity, or fingerprint evasion is permitted'
    );
    expect(learnerText).toContain('target owner must be able to pause the crawl');
    expect(learnerText).toContain('personal data must remain minimized and redacted');
    for (const leakage of [
      'HTTP evidence cycle',
      'source-to-claim evidence cycle',
      'player-to-native-release evidence cycle',
      'source-to-publication evidence cycle',
      'pygame-ce',
      'RabbitMQ messaging evidence cycle',
      'S3 storage-delivery evidence cycle',
    ]) {
      expect(learnerText).not.toContain(leakage);
    }

    const boundaryText = `${blueprint.audience.deviceConstraints.join(' ')} ${blueprint.scope.includes.join(' ')} ${blueprint.scope.excludes.join(' ')}`;
    for (const boundary of [
      'DNS',
      'HTTPX',
      'Beautiful Soup',
      'lxml',
      'Scrapy',
      'Playwright',
      'credentials',
      'privacy',
      'accessibility',
      'legal-review',
      'load',
      'production',
    ]) {
      expect(boundaryText).toContain(boundary);
    }
  });

  it('retrieves prior skills and reaches transfer before summative evidence', () => {
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
