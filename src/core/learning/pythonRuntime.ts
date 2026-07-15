export const PYTHON_RUN_TIMEOUT_MS = 8_000;
export const PYTHON_MAX_SOURCE_CHARACTERS = 32 * 1024;
export const PYTHON_MAX_OUTPUT_CHARACTERS = 64 * 1024;

export interface PythonWorkerSuccess {
  id: number;
  ok: true;
  stdout: string;
  stderr: string;
  result: string;
  truncated: boolean;
}

export interface PythonWorkerFailure {
  id: number;
  ok: false;
  error: string;
}

export type PythonWorkerResponse = PythonWorkerSuccess | PythonWorkerFailure;

export function validatePythonSource(source: string): string | null {
  if (!source.trim()) return 'Write a Python program before running the lab.';
  if (source.length > PYTHON_MAX_SOURCE_CHARACTERS) {
    return `Python source must stay under ${PYTHON_MAX_SOURCE_CHARACTERS.toLocaleString()} characters.`;
  }
  if (source.includes('\0')) return 'Python source cannot contain null bytes.';
  return null;
}
