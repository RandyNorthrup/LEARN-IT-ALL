'use client';

import { useState } from 'react';
import { formatPromptHarnessReport } from '@/core/learning/promptHarness';
import styles from './LearningStudio.module.css';

interface PromptHarnessPanelProps {
  source: string;
}

export function PromptHarnessPanel({ source }: PromptHarnessPanelProps) {
  const [output, setOutput] = useState(
    'Run contract tests to inspect goal, context, boundaries, output, completion, and uncertainty handling.'
  );

  return (
    <section className={styles.runtimePanel} aria-labelledby="prompt-harness-title">
      <div className={styles.previewBar}>
        <span id="prompt-harness-title">
          <b aria-hidden="true">✦</b> Prompt test harness
        </span>
        <button type="button" onClick={() => setOutput(formatPromptHarnessReport(source))}>
          Run prompt tests
        </button>
      </div>
      <pre className={styles.runtimeOutput} aria-live="polite">
        {output}
      </pre>
      <p className={styles.runtimeNote}>
        Deterministic contract feedback. Model-quality evaluation comes in changed-case labs.
      </p>
    </section>
  );
}
