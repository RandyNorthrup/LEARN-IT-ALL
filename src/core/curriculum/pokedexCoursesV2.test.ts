import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';
import { auditCourseBlueprint, CourseBlueprintSchema } from './blueprint';
import { loadCurriculumGraph, validateCurriculumGraph } from './repository';

const goModuleIds = [
  'pokedex-go-outcomes-repl-contract',
  'pokedex-go-repository-toolchain-baseline',
  'pokedex-go-input-tokenization-dispatch',
  'pokedex-go-help-output-accessibility',
  'pokedex-go-pokeapi-resource-contract',
  'pokedex-go-json-domain-boundary',
  'pokedex-go-http-client-lifecycle',
  'pokedex-go-map-pagination-state',
  'pokedex-go-history-back-recovery',
  'pokedex-go-cache-ttl-identity',
  'pokedex-go-concurrent-cache-flight',
  'pokedex-go-pokemon-inspect-view',
  'pokedex-go-catch-collection-invariants',
  'pokedex-go-owned-inspect-release',
  'pokedex-go-location-explore-encounters',
  'pokedex-go-errors-recovery-contract',
  'pokedex-go-context-signal-shutdown',
  'pokedex-go-bounded-prefetch-pipeline',
  'pokedex-go-persistence-schema-atomicity',
  'pokedex-go-security-data-boundaries',
  'pokedex-go-testing-fuzz-race',
  'pokedex-go-observability-performance-fairuse',
  'pokedex-go-packaging-crossplatform-release',
  'pokedex-go-release-recovery-defense',
];

const typescriptModuleIds = [
  'pokedex-ts-product-command-contract',
  'pokedex-ts-repo-node-toolchain',
  'pokedex-ts-readline-lifecycle',
  'pokedex-ts-tokenizer-command-registry',
  'pokedex-ts-help-output-accessibility',
  'pokedex-ts-pokeapi-url-fairuse',
  'pokedex-ts-unknown-json-validation',
  'pokedex-ts-fetch-response-abort',
  'pokedex-ts-pagination-view-model',
  'pokedex-ts-history-undo-state',
  'pokedex-ts-cache-ttl-copy',
  'pokedex-ts-promise-dedup-ownership',
  'pokedex-ts-pokemon-detail-view',
  'pokedex-ts-catch-immutable-collection',
  'pokedex-ts-owned-inspect-export',
  'pokedex-ts-location-explore-relations',
  'pokedex-ts-error-result-recovery',
  'pokedex-ts-signals-abort-shutdown',
  'pokedex-ts-bounded-async-prefetch',
  'pokedex-ts-persistence-schema-atomic',
  'pokedex-ts-security-runtime-boundaries',
  'pokedex-ts-node-test-type-evidence',
  'pokedex-ts-observability-performance',
  'pokedex-ts-package-distribution',
  'pokedex-ts-release-recovery-defense',
];

const stopWords = new Set(
  'the a an and or to of in for with this that from as is are be before after one pokedex pokemon evidence current changed case team browser code decision build deterministic production transfer gate competency probe'.split(
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
      `/pokedex-typescript-${index}.ts`,
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

const goGraph = loadCurriculumGraph('build-pokedex-go');
const typescriptGraph = loadCurriculumGraph('build-pokedex-typescript');
const goBlueprint = CourseBlueprintSchema.parse(
  JSON.parse(readFileSync(path.join(process.cwd(), 'blueprints', 'build-pokedex-go.json'), 'utf8'))
);
const typescriptBlueprint = CourseBlueprintSchema.parse(
  JSON.parse(
    readFileSync(path.join(process.cwd(), 'blueprints', 'build-pokedex-typescript.json'), 'utf8')
  )
);

describe('production-grade Go and TypeScript Pokedex v2 courses', () => {
  it('uses complete but language-specific cumulative prerequisite sequences', () => {
    expect(goGraph.course.moduleIds).toEqual(goModuleIds);
    expect(goGraph.course.competencies).toHaveLength(120);
    expect(goGraph.modules).toHaveLength(24);
    expect(goGraph.activities).toHaveLength(246);
    expect(goGraph.activities.reduce((total, activity) => total + activity.steps.length, 0)).toBe(
      2006
    );
    expect(goGraph.activities.reduce((total, activity) => total + activity.checks.length, 0)).toBe(
      2204
    );

    expect(typescriptGraph.course.moduleIds).toEqual(typescriptModuleIds);
    expect(typescriptGraph.course.competencies).toHaveLength(125);
    expect(typescriptGraph.modules).toHaveLength(25);
    expect(typescriptGraph.activities).toHaveLength(256);
    expect(
      typescriptGraph.activities.reduce((total, activity) => total + activity.steps.length, 0)
    ).toBe(2087);
    expect(
      typescriptGraph.activities.reduce((total, activity) => total + activity.checks.length, 0)
    ).toBe(2293);

    for (const graph of [goGraph, typescriptGraph]) {
      expect(graph.course.credential.requiredProjectIds).toHaveLength(5);
      expect(graph.activities.at(-1)?.id).toBe(graph.course.credential.finalExamId);
      expect(new Set(graph.activities.map((activity) => activity.kind))).toEqual(
        new Set(['theory', 'workshop', 'debug', 'lab', 'review', 'quiz', 'project', 'exam'])
      );
      expect(
        graph.activities.every((activity, index) =>
          index === 0 ? activity.prerequisites.length === 0 : activity.prerequisites.length === 1
        )
      ).toBe(true);
    }
  });

  it('is schema-valid, audited, approved, and gated by the correct prior courses', () => {
    expect(validateCurriculumGraph(goGraph)).toEqual([]);
    expect(validateCurriculumGraph(typescriptGraph)).toEqual([]);
    expect(auditCourseBlueprint(goBlueprint)).toEqual([]);
    expect(auditCourseBlueprint(typescriptBlueprint)).toEqual([]);
    expect(goBlueprint.status).toBe('audit-required');
    expect(typescriptBlueprint.status).toBe('audit-required');
    expect(goBlueprint.pathways.prerequisiteCourseIds).toEqual([
      'go-basics',
      'http-clients-go',
      'git-basics',
      'repository-quality-gates',
    ]);
    expect(typescriptBlueprint.pathways.prerequisiteCourseIds).toEqual([
      'typescript-basics',
      'http-clients-typescript',
      'git-basics',
      'repository-quality-gates',
    ]);
    expect(goGraph.course.prerequisites).toEqual(goBlueprint.pathways.prerequisiteCourseIds);
    expect(typescriptGraph.course.prerequisites).toEqual(
      typescriptBlueprint.pathways.prerequisiteCourseIds
    );
  });

  it('keeps workshops, debugging, labs, retrieval, quizzes, and projects scenario-diverse', () => {
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
        for (const right of projects.slice(index + 1)) {
          expect(jaccard(left, right)).toBeLessThan(0.4);
        }
      }
    }
  });

  it('gives every build a distinct exact language-specific changed-case contract', () => {
    const tracks = [
      {
        graph: goGraph,
        language: 'go',
        markerPrefix: '// Evidence: pokedex-go-',
        starter: 'cumulative accessible fair-use Pokedex decision portfolio',
        count: 198,
      },
      {
        graph: typescriptGraph,
        language: 'typescript',
        markerPrefix: '// Evidence: pokedex-ts-',
        starter: 'cumulative inclusive runtime-validated Pokedex decision portfolio',
        count: 206,
      },
    ] as const;

    const allExamples: string[] = [];
    for (const track of tracks) {
      const builds = codeSteps(track.graph);
      expect(builds).toHaveLength(track.count);
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
    }
    expect(new Set(allExamples).size).toBe(allExamples.length);
  });

  it('parses and compiles every Go source and every exact Go learner function', () => {
    const blocks = codeBlocks(goGraph, 'go');
    expect(blocks.length).toBeGreaterThan(300);
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
    const directory = mkdtempSync(path.join(tmpdir(), 'learn-it-all-pokedex-go-'));
    try {
      writeFileSync(
        path.join(directory, 'go.mod'),
        'module example.test/pokedexevidence\n\ngo 1.26\n'
      );
      writeFileSync(
        path.join(directory, 'evidence_test.go'),
        `package pokedexevidence\n\n${exactFunctions.join('\n\n')}\n`
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

  it('strictly checks all TypeScript sources and both compiler paths compile exact builds', () => {
    const sources = typescriptGraph.activities.flatMap((activity) => {
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
    expect(sources.length).toBeGreaterThan(580);
    expect(compileTypescriptSources(sources)).toEqual([]);

    const exactFunctions = codeSteps(typescriptGraph).flatMap(({ step }) =>
      step.content.flatMap((block) =>
        block.type === 'code' && block.language === 'typescript' ? [block.code] : []
      )
    );
    const directory = mkdtempSync(path.join(tmpdir(), 'learn-it-all-pokedex-ts-'));
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

  it('keeps browser code pure while naming honest native transfer boundaries', () => {
    const goSources = goGraph.activities.flatMap((activity) => [
      activity.starterFiles?.go ?? '',
      ...activity.steps.flatMap((step) =>
        step.content.flatMap((block) => (block.type === 'code' ? [block.code] : []))
      ),
    ]);
    expect(
      goSources.every(
        (source) =>
          !/import\s+['"(]*(?:net|os|os\/signal|os\/exec)|\b(?:http[.]Get|Dial|exec[.]Command)\s*\(/u.test(
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
          !/(?:from\s+|require\s*\()['"]node:|\b(?:fetch|process[.]on|readFile|writeFile|spawn)\s*\(/u.test(
            source
          )
      )
    ).toBe(true);

    const goTransfer = `${goBlueprint.audience.deviceConstraints.join(' ')} ${goBlueprint.scope.includes.join(' ')} ${goBlueprint.scope.excludes.join(' ')}`;
    for (const boundary of [
      'PokéAPI',
      'race',
      'filesystem',
      'signal',
      'terminal',
      'cross-platform',
      'accessibility',
      'production',
    ]) {
      expect(goTransfer.toLowerCase()).toContain(boundary.toLowerCase());
    }

    const typescriptTransfer = `${typescriptBlueprint.audience.deviceConstraints.join(' ')} ${typescriptBlueprint.scope.includes.join(' ')} ${typescriptBlueprint.scope.excludes.join(' ')}`;
    for (const boundary of [
      'TypeScript 7',
      'Node 24',
      'PokéAPI',
      'readline',
      'filesystem',
      'signal',
      'package',
      'accessibility',
      'production',
    ]) {
      expect(typescriptTransfer.toLowerCase()).toContain(boundary.toLowerCase());
    }
  });

  it('records current primary authorities and does not translate one course into the other', () => {
    const goAuthority = goBlueprint.sources
      .map((source) => `${source.title} ${source.version} ${source.scope}`)
      .join('\n');
    for (const required of [
      'PokéAPI v2',
      'PokeAPI 2.9.0',
      'Go 1.26.5',
      'Go Data Race Detector',
      'HTTP Semantics RFC 9110',
      'Web Content Accessibility Guidelines 2.2',
    ]) {
      expect(goAuthority).toContain(required);
    }

    const typescriptAuthority = typescriptBlueprint.sources
      .map((source) => `${source.title} ${source.version} ${source.scope}`)
      .join('\n');
    for (const required of [
      'PokéAPI v2',
      'PokeAPI 2.9.0',
      'TypeScript 7.0',
      'Node.js 24.18.0',
      'HTTP Caching RFC 9111',
      'Web Content Accessibility Guidelines 2.2',
    ]) {
      expect(typescriptAuthority).toContain(required);
    }

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
