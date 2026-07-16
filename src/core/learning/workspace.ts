import type { LearningFiles } from './draft';

export type LearningFile = keyof LearningFiles;

export const LEARNING_FILE_ORDER: LearningFile[] = [
  'html',
  'css',
  'javascript',
  'python',
  'go',
  'sql',
  'shell',
  'prompt',
  'config',
];

const FILE_LABELS: Record<LearningFile, string> = {
  html: '<> HTML',
  css: '# CSS',
  javascript: '{} JavaScript',
  python: '🐍 Python',
  go: 'GO Go',
  sql: 'DB SQL',
  shell: '>_ Terminal',
  prompt: '✦ Prompt',
  config: '⚙ Config',
};

export function learningFileLabel(file: LearningFile): string {
  return FILE_LABELS[file];
}

export function visibleLearningFiles(
  files: LearningFiles,
  targetFile?: LearningFile
): LearningFile[] {
  const visible = LEARNING_FILE_ORDER.filter((file) => files[file].trim().length > 0);
  if (targetFile && !visible.includes(targetFile)) visible.push(targetFile);
  if (visible.length === 0) visible.push(targetFile ?? 'html');
  return LEARNING_FILE_ORDER.filter((file) => visible.includes(file));
}

export type WorkspaceOutput =
  | 'web'
  | 'javascript'
  | 'python'
  | 'go'
  | 'sql'
  | 'network'
  | 'prompt'
  | 'gates';

export function workspaceOutputFor(file: LearningFile, files?: LearningFiles): WorkspaceOutput {
  if (file === 'javascript') {
    return files?.html.trim() || files?.css.trim() ? 'web' : 'javascript';
  }
  if (file === 'python') return 'python';
  if (file === 'go') return 'go';
  if (file === 'sql') return 'sql';
  if (file === 'shell') return 'network';
  if (file === 'prompt') return 'prompt';
  if (file === 'config') return 'gates';
  return 'web';
}
