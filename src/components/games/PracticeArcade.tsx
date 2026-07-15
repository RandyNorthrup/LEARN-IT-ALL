'use client';

import { ArrowDown, ArrowLeft, ArrowUp, Lightbulb, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { useId, useState } from 'react';
import {
  ARCADE_CHALLENGES,
  type ArcadeMode,
  type ArcadeResponse,
  type ArcadeTask,
  gradeArcadeTask,
  initialArcadeResponse,
  practicePoints,
} from '@/core/games/arcade';
import styles from './PracticeArcade.module.css';

interface PracticeArcadeProps {
  mode: ArcadeMode;
  title: string;
  description: string;
}

type Phase = 'primary' | 'transfer' | 'review';

function TaskInput({
  task,
  response,
  onChange,
}: {
  task: ArcadeTask;
  response: ArcadeResponse;
  onChange: (response: ArcadeResponse) => void;
}) {
  const inputId = useId();

  if (task.kind === 'choice') {
    return (
      <fieldset className={styles.choices}>
        <legend>{task.prompt}</legend>
        {task.options.map((option) => (
          <label key={option.id} className={styles.choice}>
            <input
              type="radio"
              name={inputId}
              value={option.id}
              checked={response === option.id}
              onChange={() => onChange(option.id)}
            />
            <span>{option.text}</span>
          </label>
        ))}
      </fieldset>
    );
  }

  if (task.kind === 'typing') {
    return (
      <div className={styles.typingTask}>
        <p>{task.prompt}</p>
        <div className={styles.targetLabel}>Target · {task.language}</div>
        <pre className={styles.targetCode}>
          <code>{task.target}</code>
        </pre>
        <label htmlFor={inputId}>Your exact code</label>
        <textarea
          id={inputId}
          value={typeof response === 'string' ? response : ''}
          onChange={(event) => onChange(event.target.value)}
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          rows={3}
        />
      </div>
    );
  }

  const order = Array.isArray(response) ? response : task.initialOrder;
  const itemById = new Map(task.items.map((item) => [item.id, item.text]));

  function move(index: number, offset: -1 | 1) {
    const targetIndex = index + offset;
    if (targetIndex < 0 || targetIndex >= order.length) return;
    const next = [...order];
    [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
    onChange(next);
  }

  return (
    <fieldset className={styles.orderTask}>
      <legend>{task.prompt}</legend>
      <ol>
        {order.map((itemId, index) => (
          <li key={itemId}>
            <span className={styles.orderNumber}>{index + 1}</span>
            <code>{itemById.get(itemId)}</code>
            <span className={styles.orderActions}>
              <button
                type="button"
                onClick={() => move(index, -1)}
                disabled={index === 0}
                aria-label={`Move step ${index + 1} up`}
              >
                <ArrowUp aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => move(index, 1)}
                disabled={index === order.length - 1}
                aria-label={`Move step ${index + 1} down`}
              >
                <ArrowDown aria-hidden="true" />
              </button>
            </span>
          </li>
        ))}
      </ol>
    </fieldset>
  );
}

export default function PracticeArcade({ mode, title, description }: PracticeArcadeProps) {
  const challenges = ARCADE_CHALLENGES[mode];
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('primary');
  const [response, setResponse] = useState<ArcadeResponse>(() =>
    initialArcadeResponse(challenges[0].primary)
  );
  const [attempts, setAttempts] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState('Read the scenario, then submit evidence.');

  const challenge = challenges[challengeIndex];
  const task = phase === 'transfer' ? challenge.transfer : challenge.primary;
  const completedAll = phase === 'review' && challengeIndex === challenges.length - 1;

  function checkAnswer() {
    const nextAttempt = attempts + 1;
    setAttempts(nextAttempt);
    if (!gradeArcadeTask(task, response)) {
      setStreak(0);
      setFeedback('Not yet. Inspect the invariant, use a hint if needed, and try again.');
      return;
    }

    setScore((current) => current + practicePoints(nextAttempt, hintsUsed));
    if (phase === 'primary') {
      setPhase('transfer');
      setResponse(initialArcadeResponse(challenge.transfer));
      setAttempts(0);
      setHintsUsed(0);
      setFeedback('Primary case verified. Now prove the skill transfers to a changed case.');
      return;
    }

    setPhase('review');
    setStreak((current) => current + 1);
    setFeedback('Transfer verified. Review the causal explanation before moving on.');
  }

  function revealHint() {
    if (hintsUsed >= challenge.hints.length || phase === 'review') return;
    setHintsUsed((current) => current + 1);
    setFeedback(`Hint ${hintsUsed + 1} revealed. Points remain available.`);
  }

  function loadChallenge(index: number) {
    const nextChallenge = challenges[index];
    setChallengeIndex(index);
    setPhase('primary');
    setResponse(initialArcadeResponse(nextChallenge.primary));
    setAttempts(0);
    setHintsUsed(0);
    setFeedback('New challenge ready. Read the scenario, then submit evidence.');
  }

  function resetSession() {
    setScore(0);
    setStreak(0);
    loadChallenge(0);
  }

  return (
    <main className={styles.page}>
      <header className={styles.siteHeader}>
        <Link href="/games" className={styles.back}>
          <ArrowLeft aria-hidden="true" /> Practice arcade
        </Link>
        <span className={styles.brand}>LEARN / BUILD</span>
        <button type="button" className={styles.reset} onClick={resetSession}>
          <RotateCcw aria-hidden="true" /> Reset session
        </button>
      </header>

      <section className={styles.hero}>
        <div>
          <span className={styles.eyebrow}>Deterministic skill circuit</span>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <dl className={styles.scoreboard} aria-label="Session statistics">
          <div>
            <dt>Practice points</dt>
            <dd>{score}</dd>
          </div>
          <div>
            <dt>Transfer streak</dt>
            <dd>{streak}</dd>
          </div>
          <div>
            <dt>Challenge</dt>
            <dd>
              {challengeIndex + 1}/{challenges.length}
            </dd>
          </div>
        </dl>
      </section>

      <p className={styles.boundary}>
        Practice points are session feedback only. Course mastery and XP require curriculum checks.
      </p>

      <section className={styles.workspace} aria-labelledby="challenge-title">
        <aside className={styles.brief}>
          <span className={styles.phase}>
            {phase === 'primary'
              ? '01 · Diagnose'
              : phase === 'transfer'
                ? '02 · Transfer'
                : '03 · Explain'}
          </span>
          <h2 id="challenge-title">{challenge.title}</h2>
          <p className={styles.scenario}>{challenge.scenario}</p>
          <h3>Competency</h3>
          <p>{challenge.competency}</p>
          {challenge.stimulus ? (
            <>
              <h3>Evidence</h3>
              <pre className={styles.stimulus}>
                <code>{challenge.stimulus}</code>
              </pre>
            </>
          ) : null}
        </aside>

        <div className={styles.practice}>
          <nav className={styles.progressTrack} aria-label={`Phase ${phase}`}>
            <span data-complete="true">Diagnose</span>
            <span data-complete={phase !== 'primary'}>Transfer</span>
            <span data-complete={phase === 'review'}>Explain</span>
          </nav>

          {phase === 'review' ? (
            <div className={styles.review}>
              <span className={styles.verified}>Changed-case evidence verified</span>
              <h3>Why it works</h3>
              <p>{challenge.explanation}</p>
              <button
                type="button"
                className={styles.primaryAction}
                onClick={() => !completedAll && loadChallenge(challengeIndex + 1)}
                disabled={completedAll}
              >
                {completedAll ? 'Circuit complete' : 'Next challenge'}
              </button>
            </div>
          ) : (
            <>
              <TaskInput task={task} response={response} onChange={setResponse} />

              {hintsUsed > 0 ? (
                <aside className={styles.hints} aria-label="Revealed hints">
                  <h3>Hints used</h3>
                  <ol>
                    {challenge.hints.slice(0, hintsUsed).map((hint) => (
                      <li key={hint}>{hint}</li>
                    ))}
                  </ol>
                </aside>
              ) : null}

              <div className={styles.actions}>
                <button type="button" className={styles.primaryAction} onClick={checkAnswer}>
                  Check evidence
                </button>
                <button
                  type="button"
                  className={styles.secondaryAction}
                  onClick={revealHint}
                  disabled={hintsUsed >= challenge.hints.length}
                >
                  <Lightbulb aria-hidden="true" />
                  {hintsUsed >= challenge.hints.length ? 'All hints shown' : 'Reveal next hint'}
                </button>
              </div>
            </>
          )}

          <p className={styles.feedback} aria-live="polite" aria-atomic="true">
            {feedback}
          </p>
        </div>
      </section>
    </main>
  );
}
