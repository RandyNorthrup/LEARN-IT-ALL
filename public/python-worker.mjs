const PYODIDE_VERSION = '314.0.2';
const PYODIDE_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/pyodide.mjs`;
const MAX_SOURCE_CHARACTERS = 32768;
const MAX_OUTPUT_CHARACTERS = 65536;

let runtimePromise;

async function runtime() {
  runtimePromise ??= import(PYODIDE_URL).then(({ loadPyodide }) =>
    loadPyodide({ indexURL: PYODIDE_URL.replace('pyodide.mjs', '') })
  );
  return runtimePromise;
}

self.addEventListener('message', async (event) => {
  const { id, code } = event.data ?? {};
  if (typeof id !== 'number' || typeof code !== 'string') return;

  try {
    if (!code.trim()) throw new Error('Write a Python program before running the lab.');
    if (code.length > MAX_SOURCE_CHARACTERS) {
      throw new Error(`Python source must stay under ${MAX_SOURCE_CHARACTERS} characters.`);
    }
    if (code.includes('\0')) throw new Error('Python source cannot contain null bytes.');

    const pyodide = await runtime();
    await pyodide.loadPackagesFromImports(code);
    let stdout = '';
    let stderr = '';
    let outputCharacters = 0;
    let truncated = false;

    function appendOutput(current, line) {
      if (outputCharacters >= MAX_OUTPUT_CHARACTERS) {
        truncated = true;
        return current;
      }
      const value = `${line}\n`;
      const remaining = MAX_OUTPUT_CHARACTERS - outputCharacters;
      const accepted = value.slice(0, remaining);
      outputCharacters += accepted.length;
      if (accepted.length < value.length) truncated = true;
      return current + accepted;
    }

    pyodide.setStdout({ batched: (line) => (stdout = appendOutput(stdout, line)) });
    pyodide.setStderr({ batched: (line) => (stderr = appendOutput(stderr, line)) });

    const makeDictionary = pyodide.globals.get('dict');
    const globals = makeDictionary();
    let result;
    try {
      result = await pyodide.runPythonAsync(code, { globals });
      const renderedResult = result == null ? '' : String(result);
      const remaining = MAX_OUTPUT_CHARACTERS - outputCharacters;
      const boundedResult = renderedResult.slice(0, Math.max(0, remaining));
      if (boundedResult.length < renderedResult.length) truncated = true;
      self.postMessage({
        id,
        ok: true,
        stdout,
        stderr,
        result: boundedResult,
        truncated,
      });
    } finally {
      result?.destroy?.();
      globals.destroy();
      makeDictionary.destroy();
    }
  } catch (error) {
    self.postMessage({
      id,
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
});
