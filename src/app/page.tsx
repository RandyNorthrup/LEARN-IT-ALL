import { ArrowRight, BookOpenCheck, Gauge, RotateCcw, Settings, Target } from 'lucide-react';
import Link from 'next/link';
import {
  loadCurriculumActivity,
  loadCurriculumCourse,
  loadCurriculumModule,
} from '@/core/curriculum/repository';
import { buildActivityProgress, type StepProgressRecord } from '@/core/learning/progress';
import { dbHelpers } from '@/lib/db';
import styles from './Home.module.css';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const course = loadCurriculumCourse('responsive-web-design');
  const firstModuleId = course.moduleIds[0];
  if (!firstModuleId) throw new Error(`Course ${course.id} has no modules`);
  const firstModule = loadCurriculumModule(course.id, firstModuleId);
  const firstActivityId = firstModule.activityIds[0];
  if (!firstActivityId) throw new Error(`Module ${firstModule.id} has no activities`);
  const firstActivity = loadCurriculumActivity(course.id, firstActivityId);
  const records = dbHelpers.getLearningStepProgress(firstActivity.id) as StepProgressRecord[];
  const progress = buildActivityProgress(
    firstActivity.steps.map((step) => step.id),
    records
  );
  const settings = dbHelpers.getSettings() as { displayName: string };
  const dueReviews = dbHelpers.getDueLearningReviews() as unknown[];
  const displayName = settings.displayName === 'Learner' ? 'Builder' : settings.displayName;

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
          <span className={styles.eyebrow}>Good to see you, {displayName}</span>
          <h1>What will you build today?</h1>
          <p>
            Short feedback loops. Real artifacts. Every new skill keeps earlier knowledge in play.
          </p>
        </div>

        <article className={styles.missionCard}>
          <header>
            <span>
              <Target aria-hidden="true" /> Today&apos;s mission
            </span>
            <small>
              {progress.completedSteps}/{progress.totalSteps} layers
            </small>
          </header>
          <div>
            <span className={styles.missionType}>{firstActivity.kind}</span>
            <h2>{firstActivity.title}</h2>
            <p>{firstActivity.summary}</p>
          </div>
          <footer>
            <progress max={progress.totalSteps} value={progress.completedSteps}>
              {progress.percent}%
            </progress>
            <Link
              href={`/learn/${course.id}/${firstModule.id}/${firstActivity.id}`}
              prefetch={false}
            >
              {progress.completedSteps ? 'Continue building' : 'Start the mission'}
              <ArrowRight aria-hidden="true" />
            </Link>
          </footer>
        </article>
      </section>

      <section className={styles.metrics} aria-label="Learning momentum">
        <article>
          <BookOpenCheck aria-hidden="true" />
          <span>
            <strong>{progress.completedSteps}</strong> interactions complete
          </span>
        </article>
        <article>
          <Target aria-hidden="true" />
          <span>
            <strong>{progress.totalSteps - progress.completedSteps}</strong> interactions remaining
          </span>
        </article>
        <article>
          <RotateCcw aria-hidden="true" />
          <span>
            <strong>{dueReviews.length}</strong> reviews due
          </span>
        </article>
        <article>
          <Gauge aria-hidden="true" />
          <span>
            <strong>{progress.percent}%</strong> current workshop
          </span>
        </article>
      </section>

      <div className={styles.lowerGrid}>
        <section className={styles.courseShelf}>
          <header className={styles.sectionHeader}>
            <div>
              <span className={styles.eyebrow}>Active path</span>
              <h2>Keep shipping</h2>
            </div>
            <Link href="/learn/responsive-web-design" prefetch={false}>
              View course map <ArrowRight aria-hidden="true" />
            </Link>
          </header>
          <article className={styles.courseCard}>
            <div className={styles.courseNumber}>01</div>
            <div>
              <span>Responsive systems · accessibility · design</span>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <ul>
                {course.outcomes.map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>
            </div>
            <Link
              href="/learn/responsive-web-design"
              prefetch={false}
              aria-label={`Open ${course.title}`}
            >
              <ArrowRight aria-hidden="true" />
            </Link>
          </article>
        </section>

        <aside className={styles.practiceShelf}>
          <header className={styles.sectionHeader}>
            <div>
              <span className={styles.eyebrow}>Learning actions</span>
              <h2>Choose the next useful step</h2>
            </div>
          </header>
          <div className={styles.practiceGrid}>
            <Link href="/learn/responsive-web-design" prefetch={false}>
              <BookOpenCheck aria-hidden="true" />
              <span>
                <strong>Continue the course</strong>
                <small>Resume the first incomplete interaction</small>
              </span>
            </Link>
            <Link href="/tracks" prefetch={false}>
              <Target aria-hidden="true" />
              <span>
                <strong>Explore learning paths</strong>
                <small>See prerequisites and course order</small>
              </span>
            </Link>
            <Link href="/progress" prefetch={false}>
              <BookOpenCheck aria-hidden="true" />
              <span>
                <strong>Review progress</strong>
                <small>Inspect attempts, completed work, and reviews</small>
              </span>
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
