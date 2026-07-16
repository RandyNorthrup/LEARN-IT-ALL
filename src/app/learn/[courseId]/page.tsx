import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { loadCurriculumCourse, loadCurriculumOutline } from '@/core/curriculum/repository';
import { activityAccess } from '@/core/learning/activityAccess';
import { buildActivityProgress, type StepProgressRecord } from '@/core/learning/progress';
import { isPublishedCourse } from '@/lib/data/publishedCourses';
import { dbHelpers } from '@/lib/db';
import styles from './CourseJourney.module.css';

interface CourseJourneyPageProps {
  params: Promise<{ courseId: string }>;
  searchParams: Promise<{ module?: string | string[] }>;
}

interface HistoricalProgressSummary {
  completedLessons: number;
  passedExercises: number;
  passedQuizzes: number;
}

function loadCourse(courseId: string) {
  if (!isPublishedCourse(courseId)) return null;
  try {
    return loadCurriculumOutline(courseId);
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: CourseJourneyPageProps): Promise<Metadata> {
  const { courseId } = await params;
  if (!isPublishedCourse(courseId)) return { title: 'Course not found' };
  try {
    return { title: loadCurriculumCourse(courseId).title };
  } catch {
    return { title: 'Course not found' };
  }
}

export default async function CourseJourneyPage({ params, searchParams }: CourseJourneyPageProps) {
  const { courseId } = await params;
  const query = await searchParams;
  const graph = loadCourse(courseId);
  if (!graph) notFound();

  const activities = graph.activities.map((activity) => {
    const records = dbHelpers.getLearningStepProgress(activity.id) as StepProgressRecord[];
    return {
      ...activity,
      progress: buildActivityProgress(activity.stepIds, records),
    };
  });
  const completedSteps = activities.reduce(
    (total, activity) => total + activity.progress.completedSteps,
    0
  );
  const totalSteps = activities.reduce(
    (total, activity) => total + activity.progress.totalSteps,
    0
  );
  const historicalProgress = dbHelpers.getHistoricalCourseProgressSummary(
    courseId
  ) as HistoricalProgressSummary;
  const historicalRecordCount =
    historicalProgress.completedLessons +
    historicalProgress.passedExercises +
    historicalProgress.passedQuizzes;
  const firstActivity =
    activities.find((activity) => !activity.progress.activityCompleted) ?? activities[0];
  const firstModule = graph.modules.find((module) => module.id === firstActivity.moduleId);
  if (!firstModule) notFound();
  const requestedModuleId = typeof query.module === 'string' ? query.module : null;
  const visibleModuleId = graph.modules.some((module) => module.id === requestedModuleId)
    ? requestedModuleId
    : firstModule.id;
  const visibleModule = graph.modules.find((module) => module.id === visibleModuleId);
  if (!visibleModule) notFound();
  const competencyById = new Map(
    graph.course.competencies.map((competency) => [competency.id, competency])
  );
  const visibleCompetencies = visibleModule.competencyIds.flatMap((competencyId) => {
    const competency = competencyById.get(competencyId);
    return competency ? [competency] : [];
  });
  const completedActivityIds = new Set(
    activities
      .filter((activity) => activity.progress.activityCompleted)
      .map((activity) => activity.id)
  );

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" prefetch={false} className={styles.brand}>
          LEARN / BUILD
        </Link>
        <div>
          <span>
            {completedSteps}/{totalSteps} interactions complete
          </span>
          <strong>{Math.max(0, totalSteps - completedSteps)} remaining</strong>
        </div>
      </header>

      <section className={styles.hero}>
        <div>
          <span className={styles.eyebrow}>
            Interactive course · {graph.modules.length} cumulative modules
          </span>
          <h1>{graph.course.title}</h1>
          <p className={styles.heroLead}>{graph.course.description}</p>
          <div className={styles.heroActions}>
            <Link
              className={styles.primaryLink}
              href={`/learn/${courseId}/${firstModule.id}/${firstActivity.id}`}
              prefetch={false}
            >
              {completedSteps > 0 ? 'Continue the build' : 'Start with evidence'}
              <span aria-hidden="true">→</span>
            </Link>
            <a className={styles.secondaryLink} href="#roadmap">
              Explore the path
            </a>
          </div>
        </div>
        <aside className={styles.manifesto} aria-label="Learning method">
          <strong>Every layer stays in play.</strong>
          <ul>
            <li>Predict before explanation.</li>
            <li>Inspect evidence, not vibes.</li>
            <li>Build one bounded layer.</li>
            <li>Reuse earlier work and skills.</li>
            <li>Transfer to a changed real-world problem.</li>
          </ul>
        </aside>
      </section>

      {historicalRecordCount > 0 && (
        <aside className={styles.migrationNotice} aria-labelledby="migration-notice-title">
          <div>
            <span className={styles.sectionKicker}>Earlier learning history</span>
            <h2 id="migration-notice-title">Your earlier work is still recorded.</h2>
          </div>
          <p>
            We kept {historicalRecordCount} earlier completion{' '}
            {historicalRecordCount === 1 ? 'record' : 'records'} as learning history. This path
            requires current evidence before granting mastery or unlocking later work.
          </p>
          <ul aria-label="Earlier learning history records">
            <li>{historicalProgress.completedLessons} lessons completed</li>
            <li>{historicalProgress.passedExercises} exercises passed</li>
            <li>{historicalProgress.passedQuizzes} quizzes passed</li>
          </ul>
        </aside>
      )}

      <div className={styles.content}>
        <section className={styles.roadmap} id="roadmap">
          <span className={styles.sectionKicker}>Cumulative roadmap</span>
          <h2>One path. Deeper skill.</h2>
          <ol className={styles.moduleList}>
            {graph.modules.map((module) => {
              const moduleActivities = activities.filter(
                (activity) => activity.moduleId === module.id
              );
              const moduleStepCount = moduleActivities.reduce(
                (total, activity) => total + activity.stepIds.length,
                0
              );
              return (
                <li className={styles.module} key={module.id}>
                  <article className={styles.moduleCard} id={`module-${module.id}`}>
                    <header className={styles.moduleHeader}>
                      <div className={styles.moduleSummaryCopy}>
                        <h3>{module.title}</h3>
                        <p>{module.description}</p>
                      </div>
                      <span className={styles.moduleMeta}>
                        {moduleActivities.length} activities · {moduleStepCount} interactions
                      </span>
                      {module.id === visibleModuleId ? (
                        <span className={styles.currentModule}>Open module</span>
                      ) : (
                        <Link
                          className={styles.moduleExplore}
                          href={`/learn/${courseId}?module=${module.id}#module-${module.id}`}
                          prefetch={false}
                        >
                          Explore module <span aria-hidden="true">→</span>
                        </Link>
                      )}
                    </header>
                    {module.id === visibleModuleId && (
                      <ul className={styles.activityList}>
                        {moduleActivities.map((activity) => {
                          const access = activityAccess(
                            activity.prerequisites,
                            completedActivityIds
                          );
                          const content = (
                            <>
                              <span className={styles.activityIcon}>
                                <span aria-hidden="true">
                                  {activity.kind.charAt(0).toUpperCase()}
                                </span>
                              </span>
                              <span>
                                <small>
                                  {activity.kind} · {activity.stepIds.length} interactions ·{' '}
                                  {activity.estimatedMinutes} min
                                </small>
                                <strong>{activity.title}</strong>
                              </span>
                              {access.canOpen ? (
                                <span className={styles.activityArrow} aria-hidden="true">
                                  →
                                </span>
                              ) : (
                                <span className={styles.lockedBadge}>Locked</span>
                              )}
                            </>
                          );
                          return (
                            <li className={styles.activityItem} key={activity.id}>
                              {access.canOpen ? (
                                <Link
                                  className={styles.activityLink}
                                  href={`/learn/${courseId}/${module.id}/${activity.id}`}
                                  prefetch={false}
                                >
                                  {content}
                                </Link>
                              ) : (
                                <div
                                  className={`${styles.activityLink} ${styles.activityLocked}`}
                                  aria-disabled="true"
                                >
                                  {content}
                                </div>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </article>
                </li>
              );
            })}
          </ol>
        </section>

        <aside className={styles.side}>
          <span className={styles.sectionKicker}>Proof, not seat time</span>
          <h2>What you will be able to do</h2>
          <ul className={styles.outcomeList}>
            {graph.course.outcomes.map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ul>
          <p className={styles.competencySummary}>
            {visibleCompetencies.length} capabilities in the open module ·{' '}
            {graph.course.competencies.length} across the course
          </p>
          <ul className={styles.competencyList} aria-label="Competencies in the open module">
            {visibleCompetencies.map((competency) => (
              <li key={competency.id}>
                <span aria-hidden="true">✦</span> {competency.statement}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </main>
  );
}
