const MAX_SOURCE_CHARACTERS = 50_000;

export function buildJavaScriptWorkerSource(source: string): string {
  if (source.length > MAX_SOURCE_CHARACTERS) {
    throw new Error(
      `JavaScript source must be ${MAX_SOURCE_CHARACTERS.toLocaleString()} characters or less.`
    );
  }

  return `
const output = [];
const format = (value) => {
  if (typeof value === 'string') return value;
  if (typeof value === 'undefined') return 'undefined';
  if (typeof value === 'function') return value.toString();
  try { return JSON.stringify(value, null, 2); }
  catch { return String(value); }
};
const record = (...values) => output.push(values.map(format).join(' '));
const blocked = () => Promise.reject(new Error('Network access is disabled in this learning runner.'));
for (const name of ['fetch', 'XMLHttpRequest', 'WebSocket', 'EventSource', 'importScripts']) {
  try { Object.defineProperty(globalThis, name, { value: blocked, writable: false, configurable: false }); }
  catch { /* The worker may already expose a non-configurable host binding. */ }
}
globalThis.console = {
  log: record,
  info: record,
  warn: (...values) => record('Warning:', ...values),
  error: (...values) => record('Error:', ...values),
  assert: (condition, ...values) => {
    if (!condition) throw new Error(values.map(format).join(' ') || 'Assertion failed');
  },
};

try {
  const result = await (async () => {
${source}
  })();
  self.postMessage({ ok: true, output: output.join('\\n'), result: result === undefined ? '' : format(result) });
} catch (error) {
  self.postMessage({
    ok: false,
    output: output.join('\\n'),
    error: error instanceof Error ? error.stack || error.message : String(error),
  });
}
`;
}
