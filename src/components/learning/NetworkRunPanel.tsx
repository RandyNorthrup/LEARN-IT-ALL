'use client';

import { useState } from 'react';
import { simulateTerminalCommands } from '@/core/learning/networkSimulator';
import styles from './LearningStudio.module.css';

interface NetworkRunPanelProps {
  source: string;
}

export function NetworkRunPanel({ source }: NetworkRunPanelProps) {
  const [output, setOutput] = useState('Run the command notebook to inspect simulated evidence.');

  return (
    <section className={styles.runtimePanel} aria-labelledby="network-output-title">
      <div className={styles.previewBar}>
        <span id="network-output-title">
          <b aria-hidden="true">&gt;_</b> Scenario terminal
        </span>
        <button type="button" onClick={() => setOutput(simulateTerminalCommands(source))}>
          Run simulation
        </button>
      </div>
      <pre className={styles.runtimeOutput} aria-live="polite">
        {output}
      </pre>
      <p className={styles.runtimeNote}>
        Safe, stateful simulation: Linux, Git, and network commands change only this disposable
        scenario—never the host.
      </p>
    </section>
  );
}
