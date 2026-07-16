import { ArrowRight, BookOpenCheck, CheckCircle2, RotateCcw, Settings, Wrench } from 'lucide-react';
import Link from 'next/link';
import styles from './Home.module.css';

const learningSteps = [
  {
    title: 'Choose a course',
    description: 'Open Courses to compare entry skills, outcomes, and prerequisite order.',
    icon: BookOpenCheck,
  },
  {
    title: 'Build in the lesson',
    description: 'Use the lesson workspace to predict, edit, run, inspect feedback, and repair.',
    icon: Wrench,
  },
  {
    title: 'Prove the skill',
    description: 'Pass changed cases, revisit due skills, and complete independent projects.',
    icon: CheckCircle2,
  },
] as const;

export default function HomePage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" prefetch={false} className={styles.brand}>
          LEARN / BUILD
        </Link>
        <nav aria-label="Primary navigation">
          <Link href="/courses" prefetch={false}>
            Courses
          </Link>
          <Link href="/tracks" prefetch={false}>
            Learning paths
          </Link>
          <Link href="/progress" prefetch={false}>
            Progress
          </Link>
        </nav>
        <Link
          className={styles.settings}
          href="/settings"
          prefetch={false}
          aria-label="Learning settings"
        >
          <Settings aria-hidden="true" />
        </Link>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>Learn it by building it</span>
          <h1>Make something that works.</h1>
          <p>
            Learn one idea at a time, use it immediately, repair mistakes with specific feedback,
            and keep earlier skills active as your projects grow.
          </p>
          <div className={styles.heroActions}>
            <Link href="/courses" prefetch={false}>
              Browse courses <ArrowRight aria-hidden="true" />
            </Link>
            <Link href="/progress" prefetch={false}>
              View saved progress
            </Link>
          </div>
        </div>

        <aside className={styles.availability} aria-labelledby="availability-title">
          <span className={styles.eyebrow}>Course availability</span>
          <h2 id="availability-title">No courses are open yet.</h2>
          <p>
            Open Courses to check availability. When a course opens, its course map will show the
            exact starting point and the first activity you can enter.
          </p>
          <Link href="/courses" prefetch={false}>
            Check the course library <ArrowRight aria-hidden="true" />
          </Link>
        </aside>
      </section>

      <section className={styles.guide} aria-labelledby="guide-title">
        <header>
          <span className={styles.eyebrow}>How to learn here</span>
          <h2 id="guide-title">A clear path from explanation to independent work</h2>
        </header>
        <ol>
          {learningSteps.map(({ title, description, icon: Icon }, index) => (
            <li key={title}>
              <span className={styles.stepNumber}>{String(index + 1).padStart(2, '0')}</span>
              <Icon aria-hidden="true" />
              <h3>{title}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.resume} aria-labelledby="resume-title">
        <RotateCcw aria-hidden="true" />
        <div>
          <span className={styles.eyebrow}>Returning learner</span>
          <h2 id="resume-title">Your saved evidence is under Progress.</h2>
          <p>
            Review attempts, completed interactions, due retrieval, and preserved history there.
          </p>
        </div>
        <Link href="/progress" prefetch={false}>
          Open progress <ArrowRight aria-hidden="true" />
        </Link>
      </section>
    </main>
  );
}
