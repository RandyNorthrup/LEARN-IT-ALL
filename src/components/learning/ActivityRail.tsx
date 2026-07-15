import type { LearnerStep } from '@/core/curriculum/publicActivity';
import styles from './LearningStudio.module.css';

interface ActivityRailProps {
  steps: LearnerStep[];
  activeStepId: string;
  completedStepIds: string[];
  onSelect: (stepId: string) => void;
}

export function ActivityRail({
  steps,
  activeStepId,
  completedStepIds,
  onSelect,
}: ActivityRailProps) {
  const completed = new Set(completedStepIds);
  const firstIncompleteIndex = steps.findIndex((step) => !completed.has(step.id));

  return (
    <nav className={styles.rail} aria-label="Workshop steps">
      <div className={styles.railHeading}>
        <span>Field path</span>
        <strong>
          {completed.size}/{steps.length}
        </strong>
      </div>
      <ol className={styles.stepList}>
        {steps.map((step, index) => {
          const isComplete = completed.has(step.id);
          const isActive = step.id === activeStepId;
          const isLocked = !isComplete && index > firstIncompleteIndex;
          return (
            <li key={step.id}>
              <button
                type="button"
                className={`${styles.stepButton} ${isActive ? styles.stepButtonActive : ''}`}
                aria-current={isActive ? 'step' : undefined}
                disabled={isLocked}
                onClick={() => onSelect(step.id)}
              >
                <span className={styles.stepMarker} aria-hidden="true">
                  {isComplete ? '✓' : isLocked ? '—' : '•'}
                </span>
                <span>
                  <small>
                    {String(index + 1).padStart(2, '0')} · {step.interaction}
                  </small>
                  <strong>{step.title}</strong>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
