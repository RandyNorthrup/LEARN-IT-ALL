/* global Go, importScripts */

const MAX_SOURCE_CHARACTERS = 32 * 1024;
let runtimePromise;

function loadRuntime() {
  if (runtimePromise) return runtimePromise;

  runtimePromise = (async () => {
    importScripts('/go-wasm-exec.js');
    const go = new Go();
    let instantiated;

    try {
      instantiated = await WebAssembly.instantiateStreaming(
        fetch('/go-runtime.wasm'),
        go.importObject
      );
    } catch {
      const bytes = await fetch('/go-runtime.wasm').then((response) => {
        if (!response.ok) throw new Error(`Go runtime request failed with ${response.status}.`);
        return response.arrayBuffer();
      });
      instantiated = await WebAssembly.instantiate(bytes, go.importObject);
    }

    void go.run(instantiated.instance);
    await new Promise((resolve, reject) => {
      let checks = 0;
      const checkReady = () => {
        if (typeof globalThis.runLearnerGo === 'function') {
          resolve();
          return;
        }
        checks += 1;
        if (checks > 200) {
          reject(new Error('Go interpreter did not initialize.'));
          return;
        }
        setTimeout(checkReady, 10);
      };
      checkReady();
    });
  })();

  return runtimePromise;
}

self.onmessage = async (event) => {
  const { id, source } = event.data ?? {};
  if (!Number.isSafeInteger(id)) return;

  try {
    if (typeof source !== 'string' || source.length === 0) {
      throw new Error('Write a Go program before running the lab.');
    }
    if (source.length > MAX_SOURCE_CHARACTERS) {
      throw new Error(`Go source must stay under ${MAX_SOURCE_CHARACTERS} characters.`);
    }

    await loadRuntime();
    const result = globalThis.runLearnerGo(source);
    self.postMessage({ id, ok: true, ...result });
  } catch (error) {
    self.postMessage({
      id,
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
