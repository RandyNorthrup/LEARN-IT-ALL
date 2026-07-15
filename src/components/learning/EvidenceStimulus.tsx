import type { LearnerStep } from '@/core/curriculum/publicActivity';
import styles from './LearningStudio.module.css';

interface EvidenceStimulusProps {
  stimulus: NonNullable<LearnerStep['stimulus']>;
}

const stimulusLabels = {
  browser: 'WEB',
  'dom-tree': 'DOM',
  'file-tree': 'FILES',
  terminal: 'CLI',
  'code-diff': 'DIFF',
  'network-map': 'NET',
};

export function EvidenceStimulus({ stimulus }: EvidenceStimulusProps) {
  return (
    <figure className={styles.stimulus}>
      <div className={styles.stimulusBar}>
        <span className={styles.windowDots} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span>
          <b aria-hidden="true">{stimulusLabels[stimulus.kind]}</b>
          {stimulus.title}
        </span>
      </div>
      <div className={styles.stimulusLines}>
        {stimulus.lines.map((line) => (
          <div className={`${styles.stimulusLine} ${styles[`tone${line.tone}`]}`} key={line.id}>
            <span>{line.label}</span>
            <code>{line.text}</code>
          </div>
        ))}
      </div>
      <figcaption>{stimulus.caption}</figcaption>
    </figure>
  );
}
