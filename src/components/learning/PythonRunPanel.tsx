'use client';

import { useEffect, useRef, useState } from 'react';
import {
  PYTHON_RUN_TIMEOUT_MS,
  type PythonWorkerResponse,
  validatePythonSource,
} from '@/core/learning/pythonRuntime';
import styles from './LearningStudio.module.css';

interface PythonRunPanelProps {
  code: string;
}

export function PythonRunPanel({ code }: PythonRunPanelProps) {
  const workerRef = useRef<Worker | null>(null);
  const requestIdRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);
  const [output, setOutput] = useState('Run the file to inspect Python output.');
  const [isRunning, setIsRunning] = useState(false);

  useEffect(
    () => () => {
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
      workerRef.current?.terminate();
      workerRef.current = null;
    },
    []
  );

  function createWorker(): Worker {
    const worker = new Worker('/python-worker.mjs', { type: 'module' });
    workerRef.current = worker;
    return worker;
  }

  function runPython() {
    if (isRunning) return;
    const validationError = validatePythonSource(code);
    if (validationError) {
      setOutput(validationError);
      return;
    }
    const worker = workerRef.current ?? createWorker();
    const id = ++requestIdRef.current;
    setIsRunning(true);
    setOutput('Starting isolated Python 3.14 runtime…');

    timeoutRef.current = window.setTimeout(() => {
      worker.terminate();
      workerRef.current = null;
      timeoutRef.current = null;
      setIsRunning(false);
      setOutput('Run stopped after 8 seconds. Check for an infinite loop or blocking input.');
    }, PYTHON_RUN_TIMEOUT_MS);

    function finish(event: MessageEvent<PythonWorkerResponse>) {
      if (event.data.id !== id) return;
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      worker.removeEventListener('message', finish);
      worker.onerror = null;
      setIsRunning(false);
      if (!event.data.ok) {
        setOutput(`Python error:\n${event.data.error ?? 'The program could not run.'}`);
        return;
      }
      const sections = [event.data.stdout, event.data.stderr, event.data.result]
        .filter((value): value is string => Boolean(value?.trim()))
        .map((value) => value.trimEnd());
      if (event.data.truncated) sections.push('[Output stopped at the 65,536-character limit.]');
      setOutput(sections.join('\n') || 'Program finished with no printed output.');
    }

    worker.addEventListener('message', finish);
    worker.onerror = () => {
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      worker.terminate();
      workerRef.current = null;
      setIsRunning(false);
      setOutput('Python runtime failed to load. Check the network connection and try again.');
    };
    worker.postMessage({ id, code });
  }

  return (
    <section className={styles.runtimePanel} aria-labelledby="python-output-title">
      <div className={styles.previewBar}>
        <span id="python-output-title">
          <b aria-hidden="true">🐍</b> Python output
        </span>
        <button type="button" onClick={runPython} disabled={isRunning}>
          {isRunning ? 'Running…' : 'Run Python'}
        </button>
      </div>
      <pre className={styles.runtimeOutput} aria-live="polite" aria-busy={isRunning}>
        {output}
      </pre>
      <p className={styles.runtimeNote}>
        Runs with fresh globals in an isolated Python 3.14 browser worker. Source, output, and
        runtime are bounded; stalled runs stop automatically.
      </p>
    </section>
  );
}
