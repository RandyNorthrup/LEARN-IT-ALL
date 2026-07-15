import type { LearnerStep } from '@/core/curriculum/publicActivity';
import { getInteractionPresentation } from './interactionPresentation';
import styles from './LearningStudio.module.css';

interface StepIntroProps {
  step: LearnerStep;
}

export function StepIntro({ step }: StepIntroProps) {
  const presentation = getInteractionPresentation(step.interaction);
  const [taskTitle, caseLabel] = step.title.split(' · ');

  return (
    <div className={styles.taskIntro}>
      <span className={styles.interactionLabel}>
        <b aria-hidden="true">{presentation.symbol}</b>
        {presentation.label}
      </span>
      <h2 id="current-step-title">
        <span>{taskTitle}</span>
        {caseLabel && <small>{caseLabel}</small>}
      </h2>
      <p className={styles.instruction}>{step.instruction}</p>
      <p className={styles.modeGuidance}>{presentation.guidance}</p>
    </div>
  );
}
