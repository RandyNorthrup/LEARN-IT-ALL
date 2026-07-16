import { syntaxTree } from '@codemirror/language';
import { EditorState } from '@codemirror/state';
import { describe, expect, it } from 'vitest';
import type { LearningFile } from '@/core/learning/workspace';
import { codeEditorLanguage } from './codeEditorLanguage';

const parsedSamples: Array<[LearningFile, string, string]> = [
  ['html', '<main></main>', 'Document(Element('],
  ['css', 'main { color: red; }', 'StyleSheet(RuleSet('],
  ['javascript', 'const value = 1;', 'Script(VariableDeclaration('],
  ['python', 'value = 1', 'Script(AssignStatement('],
  ['go', 'package main', 'SourceFile(PackageClause'],
  ['sql', 'SELECT 1;', 'Script(Statement(Keyword,Number'],
];

describe('learning code editor languages', () => {
  it.each(parsedSamples)(
    'parses %s source with its selected language',
    (file, source, expected) => {
      const language = codeEditorLanguage(file);
      const state = EditorState.create({ doc: source, extensions: [language.extension] });

      expect(language.name).not.toBe('Plain text');
      expect(syntaxTree(state).toString()).toContain(expected);
    }
  );

  it('keeps shell, prompt, and mixed configuration artifacts as intentional plain text', () => {
    expect(codeEditorLanguage('shell')).toMatchObject({ name: 'Shell', extension: [] });
    expect(codeEditorLanguage('prompt')).toMatchObject({ name: 'Prompt text', extension: [] });
    expect(codeEditorLanguage('config')).toMatchObject({
      name: 'Configuration text',
      extension: [],
    });
  });
});
