'use client';

import { useState } from 'react';
import { formatConfigLabReport } from '@/core/learning/configLabSimulator';
import styles from './LearningStudio.module.css';

interface QualityGatePanelProps {
  source: string;
}

export function QualityGatePanel({ source }: QualityGatePanelProps) {
  const [output, setOutput] = useState(
    'Run contract review to inspect career evidence, product evidence, repository gates, agent skills, MCP servers, containers, orchestration, or delivery evidence.'
  );

  return (
    <section className={styles.runtimePanel} aria-labelledby="config-lab-title">
      <div className={styles.previewBar}>
        <span id="config-lab-title">
          <b aria-hidden="true">✓</b> Configuration contract review
        </span>
        <button type="button" onClick={() => setOutput(formatConfigLabReport(source))}>
          Review contract
        </button>
      </div>
      <pre className={styles.runtimeOutput} aria-live="polite">
        {output}
      </pre>
      <p className={styles.runtimeNote}>
        Safe manifest analysis. Configurations are inspected but never executed on the host.
      </p>
    </section>
  );
}
