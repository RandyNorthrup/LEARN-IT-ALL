'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { C_RUN_TIMEOUT_MS, type CWorkerResponse, validateCSource } from '@/core/learning/cRuntime';
import styles from './LearningStudio.module.css';

interface CRunPanelProps {
  source: string;
}

interface CRunState {
  message: string;
  output: string;
  version: string;
  tone: 'idle' | 'running' | 'success' | 'error';
}

const INITIAL_STATE: CRunState = {
  message: 'Build and run this bounded C practice program in your browser.',
  output: '',
  version: '',
  tone: 'idle',
};

export function CRunPanel({ source }: CRunPanelProps) {
  const workerRef = useRef<Worker | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const requestIdRef = useRef(0);
  const [runState, setRunState] = useState<CRunState>(INITIAL_STATE);
  const isRunning = runState.tone === 'running';

  const clearDeadline = useCallback(() => {
    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  }, []);

  const stopWorker = useCallback(() => {
    clearDeadline();
    workerRef.current?.terminate();
    workerRef.current = null;
  }, [clearDeadline]);

  useEffect(() => () => stopWorker(), [stopWorker]);

  function runC() {
    if (isRunning) return;
    const validationError = validateCSource(source);
    if (validationError) {
      setRunState({ message: validationError, output: '', version: '', tone: 'error' });
      return;
    }

    stopWorker();
    const worker = new Worker('/c-worker.js');
    workerRef.current = worker;
    const id = ++requestIdRef.current;
    setRunState({
      message: 'Building and running inside disposable browser WebAssembly…',
      output: '',
      version: '',
      tone: 'running',
    });

    timeoutRef.current = window.setTimeout(() => {
      stopWorker();
      setRunState({
        message: 'Run stopped after 8 seconds. Check loops, recursion, and pointer logic.',
        output: '',
        version: '',
        tone: 'error',
      });
    }, C_RUN_TIMEOUT_MS);

    worker.onmessage = (event: MessageEvent<CWorkerResponse>) => {
      if (event.data.id !== id) return;
      stopWorker();

      if (!event.data.ok) {
        setRunState({
          message: `C runtime error: ${event.data.error || 'The program could not run.'}`,
          output: '',
          version: '',
          tone: 'error',
        });
        return;
      }

      const failed = event.data.exitCode !== 0 || Boolean(event.data.error);
      setRunState({
        message: failed
          ? `Program stopped with exit code ${event.data.exitCode}.`
          : event.data.output
            ? 'Program completed.'
            : 'Program completed without output.',
        output: [event.data.output, event.data.error].filter(Boolean).join(''),
        version: event.data.version,
        tone: failed ? 'error' : 'success',
      });
    };

    worker.onerror = (event) => {
      stopWorker();
      setRunState({
        message: `C runtime error: ${event.message || 'The browser worker could not load.'}`,
        output: '',
        version: '',
        tone: 'error',
      });
    };

    worker.postMessage({ id, source });
  }

  return (
    <section className={styles.runtimePanel} aria-labelledby="c-output-title">
      <div className={styles.previewBar}>
        <span id="c-output-title">
          <b aria-hidden="true">C</b> Program output
        </span>
        <button type="button" onClick={runC} disabled={isRunning}>
          {isRunning ? 'Running…' : 'Build and run C'}
        </button>
      </div>
      <div
        className={styles.goOutput}
        aria-live="polite"
        aria-busy={isRunning}
        data-tone={runState.tone}
      >
        <p>{runState.message}</p>
        {runState.output && <pre>{runState.output}</pre>}
        {runState.version && <small>{runState.version}</small>}
      </div>
      <p className={styles.runtimeNote}>
        Instant practice uses a clearly bounded PicoC subset in disposable browser WebAssembly. C23
        compiler, sanitizer, ABI, and concurrency transfer gates target current Clang and GCC.
      </p>
    </section>
  );
}
