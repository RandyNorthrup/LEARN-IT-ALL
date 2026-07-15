/* global createPicocModule, importScripts */

const MAX_SOURCE_CHARACTERS = 32 * 1024;
const MAX_OUTPUT_CHARACTERS = 64 * 1024;
const VERSION = 'PicoC 3.2.2 practice subset · C89/C90 + selected C99';

importScripts('/c-picoc.js');

function boundedCollector() {
  const chunks = [];
  let length = 0;
  let truncated = false;

  return {
    push(value) {
      if (truncated) return;
      const line = `${String(value)}\n`;
      const remaining = MAX_OUTPUT_CHARACTERS - length;
      if (line.length > remaining) {
        chunks.push(line.slice(0, Math.max(0, remaining)));
        chunks.push('\n[output truncated]\n');
        truncated = true;
        return;
      }
      chunks.push(line);
      length += line.length;
    },
    text() {
      return chunks.join('');
    },
  };
}

self.onmessage = async (event) => {
  const { id, source } = event.data ?? {};
  if (!Number.isSafeInteger(id)) return;

  try {
    if (typeof source !== 'string' || source.trim().length === 0) {
      throw new Error('Write a C program before running the lab.');
    }
    if (source.length > MAX_SOURCE_CHARACTERS) {
      throw new Error(`C source must stay under ${MAX_SOURCE_CHARACTERS} characters.`);
    }
    if (source.includes('\0')) throw new Error('C source cannot contain null bytes.');

    const stdout = boundedCollector();
    const stderr = boundedCollector();
    const module = await createPicocModule({
      locateFile: (path) => (path.endsWith('.wasm') ? '/c-picoc.wasm' : path),
      print: (value) => stdout.push(value),
      printErr: (value) => stderr.push(value),
      noInitialRun: true,
    });
    const sourcePath = '/learner.c';
    module.FS.writeFile(sourcePath, source);

    let exitCode = 0;
    try {
      exitCode = module.callMain([sourcePath]) ?? 0;
    } catch (error) {
      if (error && typeof error === 'object' && Number.isInteger(error.status)) {
        exitCode = error.status;
      } else {
        stderr.push(error instanceof Error ? error.message : String(error));
        exitCode = 1;
      }
    }

    self.postMessage({
      id,
      ok: true,
      output: stdout.text(),
      error: stderr.text(),
      exitCode,
      version: VERSION,
    });
  } catch (error) {
    self.postMessage({
      id,
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
