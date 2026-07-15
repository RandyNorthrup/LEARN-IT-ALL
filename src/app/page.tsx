import {
  ArrowRight,
  Blocks,
  BookOpenCheck,
  Bug,
  Flame,
  Gauge,
  RotateCcw,
  Settings,
  Sparkles,
  Target,
} from 'lucide-react';
import Link from 'next/link';
import { loadCurriculumGraph } from '@/core/curriculum/repository';
import { buildActivityProgress, type StepProgressRecord } from '@/core/learning/progress';
import { dbHelpers } from '@/lib/db';
import styles from './Home.module.css';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const graph = loadCurriculumGraph('responsive-web-design');
  const firstActivity = graph.activities[0];
  const firstModule = graph.modules.find((module) => module.id === firstActivity.moduleId);
  if (!firstModule) throw new Error(`Missing module for activity ${firstActivity.id}`);
  const records = dbHelpers.getLearningStepProgress(firstActivity.id) as StepProgressRecord[];
  const progress = buildActivityProgress(
    firstActivity.steps.map((step) => step.id),
    records
  );
  const profile = dbHelpers.getLearningProfile() as {
    totalXp: number;
    currentStreak: number;
  };
  const settings = dbHelpers.getSettings() as { displayName: string };
  const dueReviews = dbHelpers.getDueLearningReviews() as unknown[];
  const displayName = settings.displayName === 'Learner' ? 'Builder' : settings.displayName;

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand}>
          LEARN / BUILD
        </Link>
        <nav aria-label="Primary navigation">
          <Link href="/courses">Courses</Link>
          <Link href="/challenges">Practice</Link>
          <Link href="/progress">Progress</Link>
        </nav>
        <Link className={styles.settings} href="/settings" aria-label="Learning settings">
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
            <Link href={`/learn/${graph.course.id}/${firstModule.id}/${firstActivity.id}`}>
              {progress.completedSteps ? 'Continue building' : 'Start the mission'}
              <ArrowRight aria-hidden="true" />
            </Link>
          </footer>
        </article>
      </section>

      <section className={styles.metrics} aria-label="Learning momentum">
        <article>
          <Sparkles aria-hidden="true" />
          <span>
            <strong>{profile.totalXp}</strong> total XP
          </span>
        </article>
        <article>
          <Flame aria-hidden="true" />
          <span>
            <strong>{profile.currentStreak}</strong> day streak
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
            <Link href="/learn/responsive-web-design">
              View course map <ArrowRight aria-hidden="true" />
            </Link>
          </header>
          <article className={styles.courseCard}>
            <div className={styles.courseNumber}>01</div>
            <div>
              <span>Responsive systems · accessibility · design</span>
              <h3>{graph.course.title}</h3>
              <p>{graph.course.description}</p>
              <ul>
                {graph.course.outcomes.map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>
            </div>
            <Link href="/learn/responsive-web-design" aria-label={`Open ${graph.course.title}`}>
              <ArrowRight aria-hidden="true" />
            </Link>
          </article>
        </section>

        <aside className={styles.practiceShelf}>
          <header className={styles.sectionHeader}>
            <div>
              <span className={styles.eyebrow}>Practice mixer</span>
              <h2>Change the mode</h2>
            </div>
          </header>
          <div className={styles.practiceGrid}>
            <Link href="/challenges">
              <Bug aria-hidden="true" />
              <span>
                <strong>Debug room</strong>
                <small>Find causes, not symptoms</small>
              </span>
            </Link>
            <Link href="/games">
              <Blocks aria-hidden="true" />
              <span>
                <strong>Build sprint</strong>
                <small>Make something under constraints</small>
              </span>
            </Link>
            <Link href="/progress">
              <BookOpenCheck aria-hidden="true" />
              <span>
                <strong>Retrieval queue</strong>
                <small>Bring older skills back</small>
              </span>
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
