import { ArrowLeft, ArrowRight, BookOpenCheck, BrainCircuit, Gauge, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { dbHelpers } from '@/lib/db';
import styles from './Progress.module.css';

export const dynamic = 'force-dynamic';

interface LearningProgressStats {
  coursesStarted: number;
  activitiesPracticed: number;
  interactionsCompleted: number;
  totalAttempts: number;
  reviewsDue: number;
  historicalRecords: number;
}

export default function ProgressPage() {
  const stats = dbHelpers.getProgressStats() as LearningProgressStats;
  const metrics = [
    {
      label: 'Steps completed',
      value: stats.interactionsCompleted,
      note: 'Step requirements passed in current activities',
      icon: BookOpenCheck,
    },
    {
      label: 'Activities practiced',
      value: stats.activitiesPracticed,
      note: 'Workshops, labs, reviews, and assessments touched',
      icon: BrainCircuit,
    },
    {
      label: 'Attempts made',
      value: stats.totalAttempts,
      note: 'Every feedback loop counts, including repairs',
      icon: Gauge,
    },
    {
      label: 'Reviews due',
      value: stats.reviewsDue,
      note: 'Older skills ready for retrieval',
      icon: RotateCcw,
    },
  ];

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.back}>
          <ArrowLeft aria-hidden="true" /> Home
        </Link>
        <Link href="/" className={styles.brand}>
          LEARN / BUILD
        </Link>
        <Link href="/courses" className={styles.catalogLink}>
          Find a course <ArrowRight aria-hidden="true" />
        </Link>
      </header>

      <section className={styles.hero}>
        <div>
          <span className={styles.eyebrow}>Evidence ledger</span>
          <h1>Progress means work you can defend.</h1>
        </div>
        <p>
          These numbers come from interactive checks, attempts, and spaced reviews—not passive seat
          time or arbitrary points.
        </p>
      </section>

      <section className={styles.metrics} aria-labelledby="metric-heading">
        <header>
          <span className={styles.eyebrow}>{stats.coursesStarted} active course paths</span>
          <h2 id="metric-heading" className={styles.sectionTitle}>
            Your current learning signal
          </h2>
        </header>
        <dl>
          {metrics.map(({ label, value, note, icon: Icon }) => (
            <div key={label}>
              <dt>
                <Icon aria-hidden="true" /> {label}
              </dt>
              <dd>{value.toLocaleString()}</dd>
              <p>{note}</p>
            </div>
          ))}
        </dl>
      </section>

      {stats.historicalRecords > 0 && (
        <aside className={styles.history} aria-labelledby="history-heading">
          <div>
            <span className={styles.eyebrow}>History kept, mastery honest</span>
            <h2 id="history-heading" className={styles.historyTitle}>
              {stats.historicalRecords} earlier learning records preserved
            </h2>
          </div>
          <p>
            Earlier completions remain in local history. They do not silently unlock this path
            because current mastery requires observable evidence.
          </p>
        </aside>
      )}

      <nav className={styles.actions} aria-label="Progress next actions">
        <Link href="/courses">
          Continue a course <ArrowRight aria-hidden="true" />
        </Link>
        <Link href="/tracks">
          Choose a prerequisite-safe path <ArrowRight aria-hidden="true" />
        </Link>
      </nav>
    </main>
  );
}
