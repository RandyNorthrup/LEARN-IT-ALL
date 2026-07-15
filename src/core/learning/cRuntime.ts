export const C_RUN_TIMEOUT_MS = 8_000;
export const C_MAX_SOURCE_CHARACTERS = 32 * 1024;

export interface CWorkerSuccess {
  id: number;
  ok: true;
  output: string;
  error: string;
  exitCode: number;
  version: string;
}

export interface CWorkerFailure {
  id: number;
  ok: false;
  error: string;
}

export type CWorkerResponse = CWorkerSuccess | CWorkerFailure;

export function validateCSource(source: string): string | null {
  if (!source.trim()) return 'Write a C program before running the lab.';
  if (source.length > C_MAX_SOURCE_CHARACTERS) {
    return `C source must stay under ${C_MAX_SOURCE_CHARACTERS.toLocaleString()} characters.`;
  }
  if (source.includes('\0')) return 'C source cannot contain null bytes.';
  return null;
}
