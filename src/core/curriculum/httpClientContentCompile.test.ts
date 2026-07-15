import { spawnSync } from 'node:child_process';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';
import { loadCurriculumGraph } from './repository';

interface LabeledSource {
  label: string;
  source: string;
}

function collectSources(courseId: string, file: 'typescript' | 'python'): LabeledSource[] {
  const graph = loadCurriculumGraph(courseId);
  return graph.activities.flatMap((activity) => {
    const sources: LabeledSource[] = [];
    const starter = activity.starterFiles?.[file];
    if (starter) sources.push({ label: `${activity.id} starter`, source: starter });
    for (const [stepIndex, step] of activity.steps.entries()) {
      for (const [blockIndex, block] of step.content.entries()) {
        if (block.type !== 'code' || block.language !== file) continue;
        sources.push({
          label: `${activity.id} step ${stepIndex + 1} block ${blockIndex + 1}`,
          source: block.code,
        });
      }
    }
    return sources;
  });
}

function compileTypeScriptSources(sources: LabeledSource[]): string[] {
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
      `/http-client-content-${index}.ts`,
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

describe('HTTP client learner code compilation audits', () => {
  it('strictly type-checks every TypeScript starter and lesson source', () => {
    const sources = collectSources('http-clients-typescript', 'typescript');

    expect(sources.length).toBeGreaterThan(300);
    expect(compileTypeScriptSources(sources)).toEqual([]);
  }, 30_000);

  it('parses every Python starter and lesson source', () => {
    const script = `
import json
import pathlib
import sys

root = pathlib.Path(sys.argv[1])
checked = 0
for path in sorted(root.glob('*.json')):
    activity = json.loads(path.read_text(encoding='utf-8'))
    sources = []
    starter = activity.get('starterFiles', {}).get('python')
    if starter:
        sources.append((f"{activity['id']} starter", starter))
    for step_index, step in enumerate(activity.get('steps', []), start=1):
        for block_index, block in enumerate(step.get('content', []), start=1):
            if block.get('type') == 'code' and block.get('language') == 'python':
                sources.append((f"{activity['id']} step {step_index} block {block_index}", block['code']))
    for label, source in sources:
        try:
            compile(source, label, 'exec')
        except SyntaxError as error:
            print(f"{label}: {error}", file=sys.stderr)
            raise
        checked += 1

if checked < 300:
    raise SystemExit(f"expected at least 300 Python sources, checked {checked}")
print(f"Python HTTP content audit passed: {checked} starter and lesson sources parsed.")
`;
    const result = spawnSync(
      'python3',
      ['-c', script, 'content/v2/courses/http-clients-python/activities'],
      { cwd: process.cwd(), encoding: 'utf8' }
    );

    expect(result.status, result.stderr || result.stdout).toBe(0);
    expect(result.stdout).toContain('Python HTTP content audit passed');
  }, 30_000);
});
