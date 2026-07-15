export const GO_RUN_TIMEOUT_MS = 12_000;
export const GO_MAX_SOURCE_CHARACTERS = 32 * 1024;

export interface GoWorkerSuccess {
  id: number;
  ok: true;
  output: string;
  error: string;
  version: string;
}

export interface GoWorkerFailure {
  id: number;
  ok: false;
  error: string;
}

export type GoWorkerResponse = GoWorkerSuccess | GoWorkerFailure;

export function validateGoSource(source: string): string | null {
  if (!source.trim()) return 'Write a Go program before running the lab.';
  if (source.length > GO_MAX_SOURCE_CHARACTERS) {
    return `Go source must stay under ${GO_MAX_SOURCE_CHARACTERS.toLocaleString()} characters.`;
  }
  if (source.includes('\0')) return 'Go source cannot contain null bytes.';
  return null;
}
