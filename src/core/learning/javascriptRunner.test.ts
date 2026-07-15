import { describe, expect, it } from 'vitest';
import { buildJavaScriptWorkerSource } from './javascriptRunner';

describe('buildJavaScriptWorkerSource', () => {
  it('wraps learner code with output capture, assertions, and blocked network APIs', () => {
    const worker = buildJavaScriptWorkerSource('console.log("ready");');

    expect(worker).toContain('console.log("ready");');
    expect(worker).toContain(
      "['fetch', 'XMLHttpRequest', 'WebSocket', 'EventSource', 'importScripts']"
    );
    expect(worker).toContain('Assertion failed');
    expect(worker).toContain('self.postMessage({ ok: true');
  });

  it('rejects oversized programs before creating a worker', () => {
    expect(() => buildJavaScriptWorkerSource('x'.repeat(50_001))).toThrow(/50,000/);
  });
});
