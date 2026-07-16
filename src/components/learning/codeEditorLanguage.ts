import { css } from '@codemirror/lang-css';
import { go } from '@codemirror/lang-go';
import { html } from '@codemirror/lang-html';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { sql } from '@codemirror/lang-sql';
import type { Extension } from '@codemirror/state';
import type { LearningFile } from '@/core/learning/workspace';

export interface CodeEditorLanguage {
  extension: Extension;
  name: string;
}

const plainText: CodeEditorLanguage = { extension: [], name: 'Plain text' };

export function codeEditorLanguage(file: LearningFile): CodeEditorLanguage {
  switch (file) {
    case 'html':
      return { extension: html(), name: 'HTML' };
    case 'css':
      return { extension: css(), name: 'CSS' };
    case 'javascript':
      return { extension: javascript(), name: 'JavaScript' };
    case 'python':
      return { extension: python(), name: 'Python' };
    case 'go':
      return { extension: go(), name: 'Go' };
    case 'sql':
      return { extension: sql(), name: 'SQL' };
    case 'shell':
      return { ...plainText, name: 'Shell' };
    case 'prompt':
      return { ...plainText, name: 'Prompt text' };
    case 'config':
      return { ...plainText, name: 'Configuration text' };
  }
}
