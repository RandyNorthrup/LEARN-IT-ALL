'use client';

import { ArrowLeft, ArrowRight, Eraser, HardDrive, Save, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { type FormEvent, useEffect, useRef, useState } from 'react';
import styles from './Settings.module.css';

interface SettingsClientProps {
  initialDisplayName: string;
  courses: Array<{ id: string; title: string }>;
}

type ResetRequest = { type: 'all' } | { type: 'course'; courseId: string };

interface StatusMessage {
  tone: 'success' | 'error';
  text: string;
}

export default function SettingsClient({ initialDisplayName, courses }: SettingsClientProps) {
  const [displayName, setDisplayName] = useState(initialDisplayName);
  const [courseId, setCourseId] = useState(courses[0]?.id ?? '');
  const [status, setStatus] = useState<StatusMessage | null>(null);
  const [saving, setSaving] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [resetRequest, setResetRequest] = useState<ResetRequest | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !resetRequest) return;
    dialog.showModal();
    cancelRef.current?.focus();
  }, [resetRequest]);

  const closeDialog = () => {
    dialogRef.current?.close();
    setResetRequest(null);
  };

  const saveProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setStatus(null);
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ displayName }),
      });
      const body = (await response.json()) as { displayName?: string; error?: string };
      if (!response.ok || !body.displayName) {
        setStatus({ tone: 'error', text: body.error ?? 'Profile could not be saved.' });
        return;
      }
      setDisplayName(body.displayName);
      setStatus({ tone: 'success', text: 'Display name saved.' });
    } catch {
      setStatus({ tone: 'error', text: 'Profile could not be saved.' });
    } finally {
      setSaving(false);
    }
  };

  const confirmReset = async () => {
    if (!resetRequest) return;
    setClearing(true);
    setStatus(null);
    try {
      const response = await fetch('/api/progress/clear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resetRequest),
      });
      const body = (await response.json()) as { error?: string };
      if (!response.ok) {
        setStatus({ tone: 'error', text: body.error ?? 'Progress could not be cleared.' });
        return;
      }
      setStatus({
        tone: 'success',
        text:
          resetRequest.type === 'all'
            ? 'All local learning progress cleared.'
            : 'Selected course progress cleared.',
      });
      closeDialog();
    } catch {
      setStatus({ tone: 'error', text: 'Progress could not be cleared.' });
    } finally {
      setClearing(false);
    }
  };

  const selectedCourse = courses.find((course) => course.id === courseId);
  const resetDescription =
    resetRequest?.type === 'all'
      ? 'This removes current V2 attempts, drafts, XP, reviews, and preserved previous-edition history from this device.'
      : `This removes current attempts, drafts, XP, reviews, and preserved history for ${selectedCourse?.title ?? 'the selected course'}.`;

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.back}>
          <ArrowLeft aria-hidden="true" /> Home
        </Link>
        <Link href="/" className={styles.brand}>
          LEARN / BUILD
        </Link>
        <Link href="/progress" className={styles.progressLink}>
          View progress <ArrowRight aria-hidden="true" />
        </Link>
      </header>

      <section className={styles.hero}>
        <div>
          <span className={styles.eyebrow}>Local learning controls</span>
          <h1>Settings with clear boundaries.</h1>
        </div>
        <p>
          Change how the platform addresses you or deliberately reset local evidence. Destructive
          actions always require confirmation.
        </p>
      </section>

      <div className={styles.settingsGrid}>
        <section className={styles.panel} aria-labelledby="profile-heading">
          <header>
            <Save aria-hidden="true" />
            <div>
              <span className={styles.eyebrow}>Profile</span>
              <h2 id="profile-heading">What should we call you?</h2>
            </div>
          </header>
          <form onSubmit={saveProfile}>
            <label htmlFor="display-name">Display name</label>
            <p id="display-name-help">Use 3 to 80 characters. Stored only in the local database.</p>
            <input
              id="display-name"
              name="displayName"
              value={displayName}
              minLength={3}
              maxLength={80}
              aria-describedby="display-name-help"
              onChange={(event) => setDisplayName(event.target.value)}
              required
            />
            <button type="submit" disabled={saving}>
              <Save aria-hidden="true" /> {saving ? 'Saving…' : 'Save display name'}
            </button>
          </form>
        </section>

        <section className={`${styles.panel} ${styles.dataPanel}`} aria-labelledby="data-heading">
          <header>
            <HardDrive aria-hidden="true" />
            <div>
              <span className={styles.eyebrow}>Local data</span>
              <h2 id="data-heading">Reset evidence intentionally</h2>
            </div>
          </header>
          <p>
            Resets delete drafts, attempts, earned XP, and review scheduling. They never change
            curriculum files.
          </p>
          <label htmlFor="reset-course">Course to reset</label>
          <select
            id="reset-course"
            value={courseId}
            onChange={(event) => setCourseId(event.target.value)}
          >
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
          <div className={styles.resetActions}>
            <button
              type="button"
              className={styles.warningButton}
              disabled={!courseId}
              onClick={() => setResetRequest({ type: 'course', courseId })}
            >
              <Eraser aria-hidden="true" /> Reset selected course
            </button>
            <button
              type="button"
              className={styles.dangerButton}
              onClick={() => setResetRequest({ type: 'all' })}
            >
              <ShieldAlert aria-hidden="true" /> Reset everything
            </button>
          </div>
        </section>
      </div>

      <output
        className={status ? styles[status.tone] : styles.status}
        aria-live="polite"
        aria-atomic="true"
      >
        {status?.text ?? ''}
      </output>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby="reset-dialog-heading"
        aria-describedby="reset-dialog-description"
        onCancel={() => setResetRequest(null)}
        onClose={() => setResetRequest(null)}
      >
        <ShieldAlert aria-hidden="true" />
        <h2 id="reset-dialog-heading">Reset progress?</h2>
        <p id="reset-dialog-description">{resetDescription}</p>
        <strong>This cannot be undone.</strong>
        <div>
          <button ref={cancelRef} type="button" onClick={closeDialog} disabled={clearing}>
            Keep my progress
          </button>
          <button
            type="button"
            className={styles.dangerButton}
            onClick={confirmReset}
            disabled={clearing}
          >
            {clearing ? 'Clearing…' : 'Yes, reset progress'}
          </button>
        </div>
      </dialog>
    </main>
  );
}
