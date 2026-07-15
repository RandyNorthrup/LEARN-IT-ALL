'use client';

import { useEffect, useRef, useState } from 'react';
import { buildJavaScriptWorkerSource } from '@/core/learning/javascriptRunner';
import styles from './LearningStudio.module.css';

interface JavaScriptRunPanelProps {
  code: string;
}

interface JavaScriptWorkerResult {
  ok: boolean;
  output?: string;
  result?: string;
  error?: string;
}

const RUN_TIMEOUT_MS = 3_000;

export function JavaScriptRunPanel({ code }: JavaScriptRunPanelProps) {
  const workerRef = useRef<Worker | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const [output, setOutput] = useState('Run the file to inspect JavaScript output.');
  const [isRunning, setIsRunning] = useState(false);

  useEffect(
    () => () => {
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
      workerRef.current?.terminate();
    },
    []
  );

  function stopWorker() {
    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
    workerRef.current?.terminate();
    workerRef.current = null;
    setIsRunning(false);
  }

  function runJavaScript() {
    if (isRunning) return;

    let workerSource: string;
    try {
      workerSource = buildJavaScriptWorkerSource(code);
    } catch (error) {
      setOutput(
        error instanceof Error ? error.message : 'The JavaScript source could not be prepared.'
      );
      return;
    }

    const workerUrl = URL.createObjectURL(new Blob([workerSource], { type: 'text/javascript' }));
    const worker = new Worker(workerUrl, { type: 'module' });
    URL.revokeObjectURL(workerUrl);
    workerRef.current = worker;
    setIsRunning(true);
    setOutput('Running in an isolated browser worker…');

    timeoutRef.current = window.setTimeout(() => {
      stopWorker();
      setOutput('Run stopped after 3 seconds. Check for an infinite loop or unresolved task.');
    }, RUN_TIMEOUT_MS);

    worker.onmessage = (event: MessageEvent<JavaScriptWorkerResult>) => {
      const result = event.data;
      stopWorker();
      const printed = result.output?.trimEnd() ?? '';
      const returned = result.result?.trim() ? `Return value:\n${result.result.trimEnd()}` : '';
      const error = result.ok ? '' : `JavaScript error:\n${result.error ?? 'Program failed.'}`;
      setOutput(
        [printed, returned, error].filter(Boolean).join('\n') || 'Program finished with no output.'
      );
    };

    worker.onerror = (event) => {
      stopWorker();
      setOutput(`JavaScript syntax or worker error:\n${event.message || 'Program could not run.'}`);
    };
  }

  return (
    <section className={styles.runtimePanel} aria-labelledby="javascript-output-title">
      <div className={styles.previewBar}>
        <span id="javascript-output-title">
          <b aria-hidden="true">{'{}'}</b> JavaScript output
        </span>
        <button type="button" onClick={runJavaScript} disabled={isRunning}>
          {isRunning ? 'Running…' : 'Run JavaScript'}
        </button>
      </div>
      <pre className={styles.runtimeOutput} aria-live="polite">
        {output}
      </pre>
      <p className={styles.runtimeNote}>
        Runs in a disposable browser worker. Network APIs are blocked and long runs stop
        automatically.
      </p>
    </section>
  );
}
