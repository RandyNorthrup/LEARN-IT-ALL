import { describe, expect, it } from 'vitest';
import type { LearningFiles } from './draft';
import { learningFileLabel, visibleLearningFiles, workspaceOutputFor } from './workspace';

const emptyFiles: LearningFiles = {
  html: '',
  css: '',
  javascript: '',
  typescript: '',
  python: '',
  go: '',
  c: '',
  sql: '',
  shell: '',
  prompt: '',
  config: '',
};

describe('learning workspace', () => {
  it('shows populated files and always includes the current target', () => {
    expect(
      visibleLearningFiles({ ...emptyFiles, html: '<main></main>', css: 'main {}' }, 'javascript')
    ).toEqual(['html', 'css', 'javascript']);
  });

  it('selects purpose-built outputs instead of a web preview for every language', () => {
    expect(workspaceOutputFor('html')).toBe('web');
    expect(workspaceOutputFor('javascript')).toBe('javascript');
    expect(workspaceOutputFor('javascript', { ...emptyFiles, html: '<main></main>' })).toBe('web');
    expect(workspaceOutputFor('typescript')).toBe('typescript');
    expect(workspaceOutputFor('python')).toBe('python');
    expect(workspaceOutputFor('go')).toBe('go');
    expect(workspaceOutputFor('c')).toBe('c');
    expect(workspaceOutputFor('sql')).toBe('sql');
    expect(workspaceOutputFor('shell')).toBe('network');
    expect(workspaceOutputFor('prompt')).toBe('prompt');
    expect(workspaceOutputFor('config')).toBe('gates');
    expect(learningFileLabel('shell')).toContain('Terminal');
    expect(learningFileLabel('typescript')).toContain('TypeScript');
    expect(learningFileLabel('go')).toContain('Go');
    expect(learningFileLabel('c')).toContain('C source');
    expect(learningFileLabel('sql')).toContain('SQL');
    expect(learningFileLabel('config')).toContain('Config');
  });
});
