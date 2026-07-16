import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';
import { auditCourseBlueprint, CourseBlueprintSchema } from './blueprint';
import { loadCurriculumGraph, validateCurriculumGraph } from './repository';

const goModuleIds = [
  'crawler-go-outcomes-owner-duty',
  'crawler-go-toolchain-module-reproduction',
  'crawler-go-packages-ownership-lifecycle',
  'crawler-go-crawl-charter-scope',
  'crawler-go-neturl-identity-scope',
  'crawler-go-robots-rfc9309-conformance',
  'crawler-go-sitemap-streaming-xml',
  'crawler-go-http-transport-body',
  'crawler-go-dial-ssrf-defense',
  'crawler-go-representation-decoding',
  'crawler-go-html-tokenizer-goquery',
  'crawler-go-selector-typed-extraction',
  'crawler-go-record-provenance-quality',
  'crawler-go-link-graph-semantics',
  'crawler-go-frontier-queue-state',
  'crawler-go-url-space-traps',
  'crawler-go-origin-politeness-retry',
  'crawler-go-worker-pool-context',
  'crawler-go-colly-callback-adapter',
  'crawler-go-checkpoint-resume-state',
  'crawler-go-content-change-dedup',
  'crawler-go-search-metadata-signals',
  'crawler-go-static-accessibility-evidence',
  'crawler-go-resource-delivery-audit',
  'crawler-go-dynamic-browser-service-boundary',
  'crawler-go-session-security-privacy',
  'crawler-go-accessible-report-formats',
  'crawler-go-httptest-fuzz-race',
  'crawler-go-operations-deployment-recovery',
  'crawler-go-release-incident-defense',
];

const typescriptModuleIds = [
  'crawler-ts-outcomes-authorization-charter',
  'crawler-ts-runtime-emission-repository',
  'crawler-ts-architecture-async-ownership',
  'crawler-ts-scope-seeds-budgets',
  'crawler-ts-whatwg-url-identity',
  'crawler-ts-robots-rfc9309-adapter',
  'crawler-ts-sitemap-xml-discovery',
  'crawler-ts-fetch-stream-contract',
  'crawler-ts-redirect-dns-ssrf',
  'crawler-ts-bytes-media-encoding',
  'crawler-ts-cheerio-html-model',
  'crawler-ts-selectors-runtime-extraction',
  'crawler-ts-provenance-quality-records',
  'crawler-ts-link-semantics-discovery',
  'crawler-ts-frontier-state-machine',
  'crawler-ts-url-traps-space-control',
  'crawler-ts-origin-fair-scheduling',
  'crawler-ts-bounded-promise-workers',
  'crawler-ts-checkpoint-resume',
  'crawler-ts-dedup-change-classification',
  'crawler-ts-indexing-metadata-audit',
  'crawler-ts-static-accessibility-audit',
  'crawler-ts-axe-browser-a11y',
  'crawler-ts-resource-performance-audit',
  'crawler-ts-playwright-dynamic-rendering',
  'crawler-ts-authenticated-privacy-boundary',
  'crawler-ts-untrusted-content-security',
  'crawler-ts-accessible-report-exports',
  'crawler-ts-node-test-fault-evidence',
  'crawler-ts-observability-capacity-operations',
  'crawler-ts-supply-chain-package-container',
  'crawler-ts-recovery-release-defense',
];

const stopWords = new Set(
  'the a an and or to of in for with this that from as is are be before after one crawler site audit go typescript evidence current changed case team browser code decision build deterministic production transfer gate competency probe owner source'.split(
    ' '
  )
);

function terms(value: string): Set<string> {
  return new Set(
    value
      .toLowerCase()
      .replace(/https?:\/\/\S+/gu, ' ')
      .replace(/[^a-z0-9]+/gu, ' ')
      .split(' ')
      .filter((word) => word.length > 2 && !stopWords.has(word))
  );
}

function jaccard(left: Set<string>, right: Set<string>): number {
  let intersection = 0;
  for (const term of left) if (right.has(term)) intersection += 1;
  return intersection / (left.size + right.size - intersection);
}

const goGraph = loadCurriculumGraph('build-web-scraper-go');
const typescriptGraph = loadCurriculumGraph('build-web-scraper-typescript');
const goBlueprint = CourseBlueprintSchema.parse(
  JSON.parse(
    readFileSync(path.join(process.cwd(), 'blueprints', 'build-web-scraper-go.json'), 'utf8')
  )
);
const typescriptBlueprint = CourseBlueprintSchema.parse(
  JSON.parse(
    readFileSync(
      path.join(process.cwd(), 'blueprints', 'build-web-scraper-typescript.json'),
      'utf8'
    )
  )
);

function codeSteps(graph: ReturnType<typeof loadCurriculumGraph>) {
  return graph.activities.flatMap((activity) =>
    activity.steps
      .map((step) => ({ activity, step }))
      .filter(({ step }) => step.interaction === 'code')
  );
}

function codeBlocks(graph: ReturnType<typeof loadCurriculumGraph>, language: 'go' | 'typescript') {
  return graph.activities.flatMap((activity) =>
    activity.steps.flatMap((step) =>
      step.content.flatMap((block) =>
        block.type === 'code' && block.language === language ? [block.code] : []
      )
    )
  );
}

function compileTypescriptSources(sources: Array<{ label: string; source: string }>): string[] {
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
      `/web-scraper-typescript-${index}.ts`,
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

describe('authorized web crawler and accessible site auditor Go and TypeScript v2 courses', () => {
  it('uses complete language-specific cumulative sequences at declared depth', () => {
    expect(goGraph.course.title).toBe(
      'Build and Ship an Authorized Web Crawler and Accessible Site Auditor in Go 1.26'
    );
    expect(typescriptGraph.course.title).toBe(
      'Build and Ship an Authorized Web Crawler and Accessible Site Auditor in TypeScript 7 and Node 24'
    );
    const tracks = [
      {
        graph: goGraph,
        moduleIds: goModuleIds,
        competencies: 150,
        modules: 30,
        activities: 306,
        steps: 2494,
        checks: 2740,
      },
      {
        graph: typescriptGraph,
        moduleIds: typescriptModuleIds,
        competencies: 160,
        modules: 32,
        activities: 326,
        steps: 2656,
        checks: 2918,
      },
    ];
    for (const expected of tracks) {
      expect(expected.graph.course.moduleIds).toEqual(expected.moduleIds);
      expect(expected.graph.course.competencies).toHaveLength(expected.competencies);
      expect(expected.graph.modules).toHaveLength(expected.modules);
      expect(expected.graph.activities).toHaveLength(expected.activities);
      expect(
        expected.graph.activities.reduce((sum, activity) => sum + activity.steps.length, 0)
      ).toBe(expected.steps);
      expect(
        expected.graph.activities.reduce((sum, activity) => sum + activity.checks.length, 0)
      ).toBe(expected.checks);
      expect(expected.graph.course.credential.requiredProjectIds).toHaveLength(5);
      expect(expected.graph.activities.at(-1)?.id).toBe(
        expected.graph.course.credential.finalExamId
      );
      expect(new Set(expected.graph.activities.map((activity) => activity.kind))).toEqual(
        new Set(['theory', 'workshop', 'debug', 'lab', 'review', 'quiz', 'project', 'exam'])
      );
      expect(
        expected.graph.activities.every((activity, index) =>
          index === 0 ? activity.prerequisites.length === 0 : activity.prerequisites.length === 1
        )
      ).toBe(true);
    }
  });

  it('is schema-valid, audited, approved, and prerequisite-gated', () => {
    expect(validateCurriculumGraph(goGraph)).toEqual([]);
    expect(validateCurriculumGraph(typescriptGraph)).toEqual([]);
    expect(auditCourseBlueprint(goBlueprint)).toEqual([]);
    expect(auditCourseBlueprint(typescriptBlueprint)).toEqual([]);
    expect(goBlueprint.status).toBe('audit-required');
    expect(typescriptBlueprint.status).toBe('audit-required');
    expect(goBlueprint.pathways.prerequisiteCourseIds).toEqual([
      'go-basics',
      'http-clients-go',
      'responsive-web-design',
      'git-basics',
      'repository-quality-gates',
    ]);
    expect(typescriptBlueprint.pathways.prerequisiteCourseIds).toEqual([
      'typescript-basics',
      'http-clients-typescript',
      'responsive-web-design',
      'git-basics',
      'repository-quality-gates',
    ]);
    expect(goGraph.course.prerequisites).toEqual(goBlueprint.pathways.prerequisiteCourseIds);
    expect(typescriptGraph.course.prerequisites).toEqual(
      typescriptBlueprint.pathways.prerequisiteCourseIds
    );
  });

  it('keeps practice modes and stakeholder projects scenario-distinct', () => {
    for (const blueprint of [goBlueprint, typescriptBlueprint]) {
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
      const projects = blueprint.projects.map((entry) =>
        terms(`${entry.title} ${entry.stakeholder} ${entry.userNeed}`)
      );
      for (const [index, left] of projects.entries()) {
        for (const right of projects.slice(index + 1))
          expect(jaccard(left, right)).toBeLessThan(0.4);
      }
    }
  });

  it('gives every build a unique exact changed-case contract and one profile per module', () => {
    const tracks = [
      {
        graph: goGraph,
        language: 'go',
        markerPrefix: '// Evidence: crawler-go-',
        starter: 'cumulative owner-approved accessible site-audit portfolio',
        modules: goModuleIds,
        profilePath: 'web-scraper-go-evidence-contracts.mjs',
        profilePrefix: 'crawler-go-',
        builds: 246,
      },
      {
        graph: typescriptGraph,
        language: 'typescript',
        markerPrefix: '// Evidence: crawler-ts-',
        starter: 'cumulative owner-authorized accessible site-audit portfolio',
        modules: typescriptModuleIds,
        profilePath: 'web-scraper-typescript-evidence-contracts.mjs',
        profilePrefix: 'crawler-ts-',
        builds: 262,
      },
    ] as const;
    const allExamples: string[] = [];
    for (const track of tracks) {
      const builds = codeSteps(track.graph);
      expect(builds).toHaveLength(track.builds);
      expect(builds.every(({ step }) => step.targetFile === track.language)).toBe(true);
      for (const { activity, step } of builds) {
        const checks = activity.checks.filter((check) => step.checkIds.includes(check.id));
        const marker = checks.find((check) => check.type === 'source-includes');
        const structure = checks.find((check) => check.type === 'source-matches');
        const example = step.content.find((block) => block.type === 'code');
        expect(marker?.type).toBe('source-includes');
        if (marker?.type !== 'source-includes') continue;
        expect(marker.file).toBe(track.language);
        expect(marker.expected).toContain(track.markerPrefix);
        expect(structure?.type).toBe('source-matches');
        if (structure?.type !== 'source-matches' || example?.type !== 'code') continue;
        expect(structure.file).toBe(track.language);
        expect(example.language).toBe(track.language);
        expect(example.code).toContain('// Changed case:');
        expect(new RegExp(structure.pattern, structure.flags).test(example.code)).toBe(true);
        allExamples.push(example.code);
      }
      expect(
        track.graph.activities.every((activity) =>
          activity.starterFiles?.[track.language].includes(track.starter)
        )
      ).toBe(true);
      const source = readFileSync(
        path.join(process.cwd(), 'scripts', 'lib', track.profilePath),
        'utf8'
      );
      const profileIds = [...source.matchAll(/^ {2}'(crawler-(?:go|ts)-[^']+)': profile\(/gmu)]
        .map((match) => match[1])
        .filter((id) => id.startsWith(track.profilePrefix));
      expect(profileIds).toEqual(track.modules);
      expect(new Set(profileIds).size).toBe(track.modules.length);
    }
    expect(new Set(allExamples).size).toBe(allExamples.length);
    const exampleTerms = allExamples.map(terms);
    let closest = 0;
    for (const [index, left] of exampleTerms.entries()) {
      for (const right of exampleTerms.slice(index + 1))
        closest = Math.max(closest, jaccard(left, right));
    }
    expect(closest).toBeLessThan(0.92);
  });

  it('parses every Go block and compiles all exact Go learner functions', () => {
    const blocks = codeBlocks(goGraph, 'go');
    expect(blocks).toHaveLength(396);
    const goRoot = spawnSync('go', ['env', 'GOROOT'], { encoding: 'utf8' });
    expect(goRoot.status, goRoot.stderr).toBe(0);
    const gofmt = path.join(goRoot.stdout.trim(), 'bin', 'gofmt');
    for (const source of blocks) {
      const complete = source.trimStart().startsWith('package ')
        ? source
        : `package main\n${source}\n`;
      const parsed = spawnSync(gofmt, { input: complete, encoding: 'utf8' });
      expect(parsed.status, parsed.stderr).toBe(0);
    }
    const exactFunctions = codeSteps(goGraph).flatMap(({ step }) =>
      step.content.flatMap((block) =>
        block.type === 'code' && block.language === 'go' ? [block.code] : []
      )
    );
    const directory = mkdtempSync(path.join(tmpdir(), 'learn-it-all-crawler-go-'));
    try {
      writeFileSync(
        path.join(directory, 'go.mod'),
        'module example.test/crawlerevidence\n\ngo 1.26\n'
      );
      writeFileSync(
        path.join(directory, 'evidence_test.go'),
        `package crawlerevidence\n\n${exactFunctions.join('\n\n')}\n`
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

  it('strictly compiles every TypeScript block on both compiler paths and runs defaults', () => {
    const sources = typescriptGraph.activities.flatMap((activity) => {
      const result: Array<{ label: string; source: string }> = [];
      if (activity.starterFiles?.typescript)
        result.push({ label: `${activity.id} starter`, source: activity.starterFiles.typescript });
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
    expect(sources).toHaveLength(748);
    expect(compileTypescriptSources(sources)).toEqual([]);
    const exactFunctions = codeSteps(typescriptGraph).flatMap(({ step }) =>
      step.content.flatMap((block) =>
        block.type === 'code' && block.language === 'typescript' ? [block.code] : []
      )
    );
    const names = exactFunctions.map((source) => {
      const match = source.match(/function\s+([A-Za-z0-9_]+)\s*\(/u);
      expect(match).not.toBeNull();
      return match?.[1] ?? '';
    });
    const directory = mkdtempSync(path.join(tmpdir(), 'learn-it-all-crawler-ts-'));
    try {
      const sourcePath = path.join(directory, 'evidence.ts');
      const combined = `${exactFunctions.join('\n\n')}\nconst results = [${names.map((name) => `${name}()`).join(',')}];\nif (results.some((result) => !result.ok)) throw new Error('default evidence failed');\n`;
      writeFileSync(sourcePath, combined);
      for (const binary of ['tsc', 'tsc6']) {
        const result = spawnSync(
          path.join(process.cwd(), 'node_modules', '.bin', binary),
          [
            '--strict',
            '--skipLibCheck',
            '--target',
            'ES2024',
            '--module',
            'NodeNext',
            '--moduleResolution',
            'NodeNext',
            '--outDir',
            path.join(directory, binary),
            sourcePath,
          ],
          { cwd: directory, encoding: 'utf8' }
        );
        expect(result.status, `${binary}: ${result.stderr || result.stdout}`).toBe(0);
        const runtime = spawnSync('node', [path.join(directory, binary, 'evidence.js')], {
          encoding: 'utf8',
        });
        expect(runtime.status, `${binary} runtime: ${runtime.stderr || runtime.stdout}`).toBe(0);
      }
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  }, 30_000);

  it('records current primary authorities, honest transfer gates, and separate language designs', () => {
    const expectations = [
      {
        blueprint: goBlueprint,
        required: [
          'RFC 9309',
          'Go 1.26.5',
          'golang.org/x/net 0.57.0',
          'goquery 1.12.0',
          'Colly 2.3.0',
          'robotstxt 1.1.2',
          'Web Content Accessibility Guidelines 2.2',
          'CS2023',
        ],
      },
      {
        blueprint: typescriptBlueprint,
        required: [
          'RFC 9309',
          'Node 24.18.0',
          'TypeScript 7.0.2',
          'Cheerio 1.2.0',
          'robots-parser 3.0.1',
          'p-limit 7.3.0',
          'Playwright 1.61.1',
          'axe-core 4.12.1',
          'Web Content Accessibility Guidelines 2.2',
          'CS2023',
        ],
      },
    ];
    for (const expected of expectations) {
      expect(expected.blueprint.version).toBe('2026.07');
      expect(expected.blueprint.researchedAt.startsWith('2026-07-15')).toBe(true);
      expect(expected.blueprint.sources).toHaveLength(19);
      const authority = expected.blueprint.sources
        .map((source) => `${source.title} ${source.version} ${source.scope}`)
        .join('\n');
      for (const required of expected.required) expect(authority).toContain(required);
      const boundary =
        `${expected.blueprint.audience.deviceConstraints.join(' ')} ${expected.blueprint.scope.includes.join(' ')} ${expected.blueprint.scope.excludes.join(' ')}`.toLowerCase();
      for (const required of [
        'authorization',
        'robots',
        'accessibility',
        'privacy',
        'legal',
        'restore',
        'production',
      ])
        expect(boundary).toContain(required);
    }
    const goSources = goGraph.activities.flatMap((activity) => [
      activity.starterFiles?.go ?? '',
      ...activity.steps.flatMap((step) =>
        step.content.flatMap((block) => (block.type === 'code' ? [block.code] : []))
      ),
    ]);
    expect(
      goSources.every(
        (source) =>
          !/import\s+['"(]*(?:net|os|golang[.]org|github[.]com)|\b(?:http[.]Get|Dial|exec[.]Command)\s*\(/u.test(
            source
          )
      )
    ).toBe(true);
    const typescriptSources = typescriptGraph.activities.flatMap((activity) => [
      activity.starterFiles?.typescript ?? '',
      ...activity.steps.flatMap((step) =>
        step.content.flatMap((block) => (block.type === 'code' ? [block.code] : []))
      ),
    ]);
    expect(
      typescriptSources.every(
        (source) =>
          !/(?:from\s+|require\s*\()['"](?:node:|cheerio|playwright|axe-core|robots-parser|p-limit)|\b(?:fetch|readFile|writeFile|spawn|setInterval)\s*\(/u.test(
            source
          )
      )
    ).toBe(true);
    const typescriptModuleSet = new Set(typescriptModuleIds);
    expect(goModuleIds.filter((id) => typescriptModuleSet.has(id))).toEqual([]);
    const typescriptCompetencies = new Set(
      typescriptGraph.course.competencies.map((entry) => entry.id)
    );
    expect(
      goGraph.course.competencies.filter((entry) => typescriptCompetencies.has(entry.id))
    ).toEqual([]);
    const goProjects = new Set(goBlueprint.projects.map((entry) => entry.id));
    expect(typescriptBlueprint.projects.every((entry) => !goProjects.has(entry.id))).toBe(true);
  });
});
