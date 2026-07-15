'use client';

import { useRef, useState } from 'react';
import styles from './LearningStudio.module.css';

interface TypeScriptRunPanelProps {
  source: string;
}

interface DiagnosticResponse {
  ok?: boolean;
  compilerVersion?: string;
  diagnostics?: string[];
  error?: string;
}

export function TypeScriptRunPanel({ source }: TypeScriptRunPanelProps) {
  const requestRef = useRef<AbortController | null>(null);
  const [output, setOutput] = useState('Check the file to inspect strict TypeScript diagnostics.');
  const [isChecking, setIsChecking] = useState(false);

  async function checkTypeScript() {
    requestRef.current?.abort();
    const controller = new AbortController();
    requestRef.current = controller;
    setIsChecking(true);
    setOutput('Running strict TypeScript diagnostics…');

    try {
      const response = await fetch('/api/v2/runtime/typescript', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ source }),
        signal: controller.signal,
      });
      const result = (await response.json()) as DiagnosticResponse;
      if (!response.ok) throw new Error(result.error ?? 'TypeScript diagnostics failed.');
      setOutput(
        result.ok
          ? `TypeScript ${result.compilerVersion}: strict check passed with no diagnostics.`
          : `TypeScript ${result.compilerVersion}:\n${result.diagnostics?.join('\n') || 'Unknown diagnostic.'}`
      );
    } catch (error) {
      if (controller.signal.aborted) return;
      setOutput(error instanceof Error ? error.message : 'TypeScript diagnostics failed.');
    } finally {
      if (requestRef.current === controller) requestRef.current = null;
      if (!controller.signal.aborted) setIsChecking(false);
    }
  }

  return (
    <section className={styles.runtimePanel} aria-labelledby="typescript-output-title">
      <div className={styles.previewBar}>
        <span id="typescript-output-title">
          <b aria-hidden="true">TS</b> Type diagnostics
        </span>
        <button type="button" onClick={checkTypeScript} disabled={isChecking}>
          {isChecking ? 'Checking…' : 'Check TypeScript'}
        </button>
      </div>
      <pre className={styles.runtimeOutput} aria-live="polite">
        {output}
      </pre>
      <p className={styles.runtimeNote}>
        Strict static analysis only. Learner code is never executed by the server.
      </p>
    </section>
  );
}
