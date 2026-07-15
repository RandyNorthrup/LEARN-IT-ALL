'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { LearnerActivity } from '@/core/curriculum/publicActivity';
import type { LearningInputDrafts } from '@/core/learning/draft';
import { ActivityRail } from './ActivityRail';
import styles from './LearningStudio.module.css';
import { StepWorkspace, type StudioFiles } from './StepWorkspace';

interface InitialProgress {
  completedStepIds: string[];
  currentStepId: string;
  percent: number;
}

interface AttemptResult {
  passed: boolean;
  newlyCompleted: boolean;
  earnedXp: number;
  results: Array<{
    id: string;
    description: string;
    passed: boolean;
    feedback: string;
  }>;
  hiddenFailureMessage: string | null;
  nextStepId: string | null;
}

interface LearningStudioProps {
  activity: LearnerActivity;
  courseTitle: string;
  moduleTitle: string;
  initialProgress: InitialProgress;
  initialXp: number;
  initialFiles: StudioFiles;
  initialDrafts: LearningInputDrafts;
}

function scrambledOptionIds(activity: LearnerActivity, stepId: string): string[] {
  const ids =
    activity.steps.find((step) => step.id === stepId)?.options?.map((option) => option.id) ?? [];
  if (ids.length < 3) return [...ids].reverse();
  return [...ids.slice(2), ...ids.slice(0, 2)];
}

function actionLabel(interaction: LearnerActivity['steps'][number]['interaction']): string {
  return {
    read: 'Confirm understanding',
    code: 'Run evidence checks',
    predict: 'Check prediction',
    inspect: 'Check evidence',
    arrange: 'Check sequence',
    debug: 'Test repair',
    answer: 'Check answer',
    calculate: 'Check calculation',
    reflect: 'Save explanation',
  }[interaction];
}

export function LearningStudio({
  activity,
  courseTitle,
  moduleTitle,
  initialProgress,
  initialXp,
  initialFiles,
  initialDrafts,
}: LearningStudioProps) {
  const [activeStepId, setActiveStepId] = useState(initialProgress.currentStepId);
  const [completedStepIds, setCompletedStepIds] = useState(initialProgress.completedStepIds);
  const [files, setFiles] = useState<StudioFiles>(initialFiles);
  const [selectedByStep, setSelectedByStep] = useState<Record<string, string>>(
    initialDrafts.selectedByStep
  );
  const [orderByStep, setOrderByStep] = useState<Record<string, string[]>>(
    initialDrafts.orderByStep
  );
  const [textByStep, setTextByStep] = useState<Record<string, string>>(initialDrafts.textByStep);
  const [hintsByStep, setHintsByStep] = useState<Record<string, string[]>>({});
  const [attempt, setAttempt] = useState<AttemptResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingHint, setIsLoadingHint] = useState(false);
  const [totalXp, setTotalXp] = useState(initialXp);

  const activeIndex = activity.steps.findIndex((step) => step.id === activeStepId);
  const step = activity.steps[activeIndex] ?? activity.steps[0];
  const orderedOptionIds = orderByStep[step.id] ?? scrambledOptionIds(activity, step.id);
  const hints = hintsByStep[step.id] ?? [];
  const completedCount = completedStepIds.length;
  const progressPercent = Math.round((completedCount / activity.steps.length) * 100);
  const buildsOnTitles = step.buildsOnStepIds
    .map((stepId) => activity.steps.find((entry) => entry.id === stepId)?.title)
    .filter((title): title is string => Boolean(title));
  const publicChecks = activity.checks.filter((check) => step.checkIds.includes(check.id));

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      void fetch(`/api/v2/courses/${activity.courseId}/activities/${activity.id}/draft`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stepId: step.id,
          files,
          selectedOptionId: selectedByStep[step.id],
          orderedOptionIds,
          textResponse: textByStep[step.id],
        }),
      });
    }, 500);
    return () => window.clearTimeout(timeout);
  }, [
    activity.courseId,
    activity.id,
    files,
    orderedOptionIds,
    selectedByStep,
    step.id,
    textByStep,
  ]);

  function openStep(stepId: string) {
    const requestedIndex = activity.steps.findIndex((entry) => entry.id === stepId);
    const firstIncompleteIndex = activity.steps.findIndex(
      (entry) => !completedStepIds.includes(entry.id)
    );
    if (completedStepIds.includes(stepId) || requestedIndex <= firstIncompleteIndex) {
      setActiveStepId(stepId);
      setAttempt(null);
    }
  }

  async function submitStep() {
    setIsSubmitting(true);
    setAttempt(null);
    try {
      const response = await fetch(
        `/api/v2/courses/${activity.courseId}/activities/${activity.id}/attempt`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            stepId: step.id,
            files,
            selectedOptionId: selectedByStep[step.id],
            orderedOptionIds,
            textResponse: textByStep[step.id],
          }),
        }
      );
      if (!response.ok) {
        const error = (await response.json()) as { error?: string };
        throw new Error(error.error ?? 'Evidence checks could not run.');
      }
      const result = (await response.json()) as AttemptResult;
      setAttempt(result);
      if (result.passed && !completedStepIds.includes(step.id)) {
        setCompletedStepIds((current) => [...current, step.id]);
        setTotalXp((current) => current + result.earnedXp);
      }
    } catch (error) {
      setAttempt({
        passed: false,
        newlyCompleted: false,
        earnedXp: 0,
        results: [],
        hiddenFailureMessage:
          error instanceof Error ? error.message : 'Evidence checks could not run.',
        nextStepId: step.id,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function revealHint() {
    setIsLoadingHint(true);
    try {
      const response = await fetch(
        `/api/v2/courses/${activity.courseId}/activities/${activity.id}/hint`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ stepId: step.id }),
        }
      );
      if (!response.ok) throw new Error('Hint unavailable');
      const data = (await response.json()) as { hint: string };
      setHintsByStep((current) => ({
        ...current,
        [step.id]: [...(current[step.id] ?? []), data.hint],
      }));
    } finally {
      setIsLoadingHint(false);
    }
  }

  function continueForward() {
    if (attempt?.nextStepId) openStep(attempt.nextStepId);
  }

  return (
    <main className={styles.studioShell}>
      <h1 className={styles.visuallyHidden}>{activity.title}</h1>
      <header className={styles.topbar}>
        <div className={styles.brandBlock}>
          <Link href="/" className={styles.exitButton} aria-label="Exit learning studio">
            <span aria-hidden="true">←</span>
          </Link>
          <div>
            <span className={styles.brand}>LEARN / BUILD</span>
            <nav className={styles.breadcrumbs} aria-label="Course location">
              <span>{courseTitle}</span>
              <span aria-hidden="true">›</span>
              <strong>{moduleTitle}</strong>
            </nav>
          </div>
        </div>

        <div className={styles.progressCluster}>
          <div className={styles.xpPill} title="Experience earned">
            <span aria-hidden="true">✦</span>
            <strong>{totalXp}</strong> XP
          </div>
          <div className={styles.progressSummary}>
            <span>{progressPercent}% explored</span>
            <progress max={activity.steps.length} value={completedCount}>
              {progressPercent}%
            </progress>
          </div>
        </div>
      </header>

      <div className={styles.studioGrid}>
        <ActivityRail
          steps={activity.steps}
          activeStepId={step.id}
          completedStepIds={completedStepIds}
          onSelect={openStep}
        />

        <section className={styles.mainStage} aria-labelledby="current-step-title">
          <div className={styles.activityMeta}>
            <span>{activity.kind}</span>
            <span>
              Step {activeIndex + 1} of {activity.steps.length}
            </span>
            <span>{step.xp} XP</span>
          </div>
          <StepWorkspace
            key={step.id}
            step={step}
            files={files}
            selectedOptionId={selectedByStep[step.id]}
            orderedOptionIds={orderedOptionIds}
            textResponse={textByStep[step.id] ?? ''}
            onFilesChange={setFiles}
            onSelectOption={(optionId) =>
              setSelectedByStep((current) => ({ ...current, [step.id]: optionId }))
            }
            onOrderChange={(optionIds) =>
              setOrderByStep((current) => ({ ...current, [step.id]: optionIds }))
            }
            onTextChange={(response) =>
              setTextByStep((current) => ({ ...current, [step.id]: response }))
            }
          />

          {attempt && (
            <section
              className={`${styles.feedback} ${attempt.passed ? styles.feedbackPassed : styles.feedbackRetry}`}
              aria-live="polite"
              aria-labelledby="feedback-title"
            >
              <span className={styles.feedbackGlyph} aria-hidden="true">
                {attempt.passed ? '✓' : '×'}
              </span>
              <div>
                <h3 id="feedback-title">
                  {attempt.passed ? 'Evidence holds up' : 'Revise and test again'}
                </h3>
                {attempt.results.map((result) => (
                  <p key={result.id}>{result.passed ? result.description : result.feedback}</p>
                ))}
                {attempt.hiddenFailureMessage && <p>{attempt.hiddenFailureMessage}</p>}
                {attempt.passed && !attempt.nextStepId && (
                  <p>Workshop complete. Retrieval reviews are queued for 1, 7, 21, and 60 days.</p>
                )}
                {attempt.passed && attempt.nextStepId && (
                  <button type="button" onClick={continueForward}>
                    Continue to next layer <span aria-hidden="true">→</span>
                  </button>
                )}
              </div>
            </section>
          )}

          <div className={styles.actionDock}>
            <button
              type="button"
              className={styles.secondaryAction}
              onClick={() => setAttempt(null)}
            >
              <span aria-hidden="true">↺</span> Clear feedback
            </button>
            <button
              type="button"
              className={styles.primaryAction}
              onClick={submitStep}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Checking evidence…' : actionLabel(step.interaction)}
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </section>

        <aside className={styles.evidencePanel} aria-label="Learning support">
          <section>
            <span className={styles.panelKicker}>
              <span aria-hidden="true">◎</span> Why this matters
            </span>
            <p>{step.why}</p>
          </section>

          <section>
            <span className={styles.panelKicker}>
              <span aria-hidden="true">↻</span> Kept in play
            </span>
            {buildsOnTitles.length ? (
              <ul className={styles.buildsOnList}>
                {buildsOnTitles.map((title) => (
                  <li key={title}>{title}</li>
                ))}
              </ul>
            ) : (
              <p>This is the first foundation. Later steps must retrieve it.</p>
            )}
          </section>

          <section>
            <span className={styles.panelKicker}>Evidence target</span>
            <ul className={styles.checkList}>
              {publicChecks.map((check) => (
                <li key={check.id}>{check.description}</li>
              ))}
              {publicChecks.length === 0 && (
                <li>Some requirements stay hidden to test transfer.</li>
              )}
            </ul>
          </section>

          <section className={styles.hintSection}>
            <span className={styles.panelKicker}>
              <span aria-hidden="true">?</span> Hint ladder
            </span>
            {hints.length > 0 && (
              <ol>
                {hints.map((hint) => (
                  <li key={`${step.id}-${hint}`}>{hint}</li>
                ))}
              </ol>
            )}
            <button
              type="button"
              onClick={revealHint}
              disabled={isLoadingHint || hints.length >= step.hintCount}
            >
              {hints.length >= step.hintCount
                ? 'All hints revealed'
                : isLoadingHint
                  ? 'Revealing…'
                  : `Reveal hint ${hints.length + 1}`}
            </button>
            <small>Hints reduce XP, never block learning.</small>
          </section>
        </aside>
      </div>
    </main>
  );
}
