import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

interface PackageManifest {
  dependencies?: Record<string, string>;
}

describe('single-path learning code editor contract', () => {
  const root = process.cwd();
  const manifest = JSON.parse(
    readFileSync(path.join(root, 'package.json'), 'utf8')
  ) as PackageManifest;
  const workspace = readFileSync(
    path.join(root, 'src/components/learning/CodeWorkspace.tsx'),
    'utf8'
  );
  const editor = readFileSync(
    path.join(root, 'src/components/learning/LearningCodeEditor.tsx'),
    'utf8'
  );

  it('uses CodeMirror as the only coding editor dependency', () => {
    expect(manifest.dependencies?.codemirror).toBe('^6.0.2');
    expect(Object.keys(manifest.dependencies ?? {})).not.toContain('monaco-editor');
    expect(Object.keys(manifest.dependencies ?? {})).not.toContain('@monaco-editor/react');
  });

  it('removes the coding textarea and exposes labeled keyboard-operable editor help', () => {
    expect(workspace).toContain('<LearningCodeEditor');
    expect(workspace).not.toContain('<textarea');
    expect(workspace).toContain('Tab moves to the next control');
    expect(editor).toMatch(/'aria-label': `Edit \$\{language\.name\} source`/u);
    expect(editor).toContain("'aria-describedby': describedBy");
    expect(editor).toContain('EditorView.lineWrapping');
    expect(editor).toContain("minHeight: 'var(--learning-editor-min-height)'");
    expect(editor).not.toContain('indentWithTab');
  });
});
