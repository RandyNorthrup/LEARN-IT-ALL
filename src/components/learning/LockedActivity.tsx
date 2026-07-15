import Link from 'next/link';
import type { CurriculumActivity } from '@/core/curriculum/schema';
import styles from './LockedActivity.module.css';

interface LockedActivityProps {
  courseId: string;
  activityTitle: string;
  prerequisites: CurriculumActivity[];
}

export function LockedActivity({ courseId, activityTitle, prerequisites }: LockedActivityProps) {
  const next = prerequisites[0];
  return (
    <main className={styles.page}>
      <Link className={styles.brand} href={`/learn/${courseId}`}>
        LEARN / BUILD
      </Link>
      <section className={styles.card} aria-labelledby="locked-activity-title">
        <span className={styles.kicker}>Cumulative path · Field station locked</span>
        <h1 id="locked-activity-title">Keep the earlier layer in play.</h1>
        <p>
          <strong>{activityTitle}</strong> depends on evidence you have not completed yet. Finish
          the required activity before opening this one.
        </p>
        <ul>
          {prerequisites.map((prerequisite) => (
            <li key={prerequisite.id}>{prerequisite.title}</li>
          ))}
        </ul>
        <div className={styles.actions}>
          {next && (
            <Link
              className={styles.primary}
              href={`/learn/${courseId}/${next.moduleId}/${next.id}`}
            >
              Continue required activity <span aria-hidden="true">→</span>
            </Link>
          )}
          <Link className={styles.secondary} href={`/learn/${courseId}#roadmap`}>
            Return to course map
          </Link>
        </div>
      </section>
      <p className={styles.note}>
        This gate protects the build order; it does not spend XP or reveal assessment answers.
      </p>
    </main>
  );
}
