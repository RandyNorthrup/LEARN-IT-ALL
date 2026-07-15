'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  GO_RUN_TIMEOUT_MS,
  type GoWorkerResponse,
  validateGoSource,
} from '@/core/learning/goRuntime';
import styles from './LearningStudio.module.css';

interface GoRunPanelProps {
  source: string;
}

interface GoRunState {
  message: string;
  output: string;
  version: string;
  tone: 'idle' | 'running' | 'success' | 'error';
}

const INITIAL_STATE: GoRunState = {
  message: 'Run the file in a local, isolated Go interpreter.',
  output: '',
  version: '',
  tone: 'idle',
};

export function GoRunPanel({ source }: GoRunPanelProps) {
  const workerRef = useRef<Worker | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const requestIdRef = useRef(0);
  const [runState, setRunState] = useState<GoRunState>(INITIAL_STATE);
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

  function workerForRun(): Worker {
    const current = workerRef.current;
    if (current) return current;

    const worker = new Worker('/go-worker.js');
    workerRef.current = worker;
    return worker;
  }

  function runGo() {
    if (isRunning) return;
    const validationError = validateGoSource(source);
    if (validationError) {
      setRunState({ message: validationError, output: '', version: '', tone: 'error' });
      return;
    }

    clearDeadline();
    const worker = workerForRun();
    const id = ++requestIdRef.current;
    setRunState({
      message: 'Running inside browser WebAssembly…',
      output: '',
      version: '',
      tone: 'running',
    });

    timeoutRef.current = window.setTimeout(() => {
      stopWorker();
      setRunState({
        message: 'Run stopped after 12 seconds. Check loops, blocked channels, or long sleeps.',
        output: '',
        version: '',
        tone: 'error',
      });
    }, GO_RUN_TIMEOUT_MS);

    worker.onmessage = (event: MessageEvent<GoWorkerResponse>) => {
      if (event.data.id !== id) return;
      clearDeadline();

      if (!event.data.ok) {
        setRunState({
          message: `Go runtime error: ${event.data.error || 'The program could not run.'}`,
          output: '',
          version: '',
          tone: 'error',
        });
        return;
      }

      if (event.data.error) {
        setRunState({
          message: `Go program error: ${event.data.error}`,
          output: event.data.output,
          version: event.data.version,
          tone: 'error',
        });
        return;
      }

      setRunState({
        message: event.data.output ? 'Program completed.' : 'Program completed without output.',
        output: event.data.output,
        version: event.data.version,
        tone: 'success',
      });
    };

    worker.onerror = (event) => {
      stopWorker();
      setRunState({
        message: `Go runtime error: ${event.message || 'The browser worker could not load.'}`,
        output: '',
        version: '',
        tone: 'error',
      });
    };

    worker.postMessage({ id, source });
  }

  return (
    <section className={styles.runtimePanel} aria-labelledby="go-output-title">
      <div className={styles.previewBar}>
        <span id="go-output-title">
          <b aria-hidden="true">GO</b> Program output
        </span>
        <button type="button" onClick={runGo} disabled={isRunning}>
          {isRunning ? 'Running…' : 'Run Go'}
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
        A fresh interpreter runs in browser WebAssembly. Host files, processes, environment, and
        network are unavailable; stalled runs stop automatically.
      </p>
    </section>
  );
}
