import { ArrowLeft, ArrowRight, Bug, FlaskConical, LockKeyhole, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { loadCurriculumActivity } from '@/core/curriculum/repository';
import { getCourseById } from '@/lib/data/courses';
import { storedActivityAccess } from '@/lib/learningActivityAccess';
import styles from './Challenges.module.css';

export const dynamic = 'force-dynamic';

const PRACTICE_ROOMS = [
  {
    courseId: 'responsive-web-design',
    activityId: 'attribute-selectors-transfer-lab',
    focus: 'Responsive interface repair',
  },
  {
    courseId: 'python-basics',
    activityId: 'python-control-flow-debugging-clinic',
    focus: 'Control-flow diagnosis',
  },
  {
    courseId: 'javascript-basics',
    activityId: 'javascript-async-event-loop-debugging-clinic',
    focus: 'Async state forensics',
  },
  {
    courseId: 'sql-basics',
    activityId: 'sql-aggregation-grouping-independent-lab',
    focus: 'Changed-data evidence',
  },
  {
    courseId: 'go-basics',
    activityId: 'go-arrays-slices-memory-debugging-clinic',
    focus: 'Memory-behavior diagnosis',
  },
  {
    courseId: 'comptia-network-plus',
    activityId: 'network-access-management-independent-lab',
    focus: 'Changed-topology investigation',
  },
] as const;

export default function ChallengesPage() {
  const rooms = PRACTICE_ROOMS.map((room) => {
    const course = getCourseById(room.courseId);
    const activity = loadCurriculumActivity(room.courseId, room.activityId);
    const access = storedActivityAccess(room.courseId, activity);
    return { ...room, course, activity, access };
  });

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
          Course catalog <ArrowRight aria-hidden="true" />
        </Link>
      </header>

      <section className={styles.hero}>
        <div>
          <span className={styles.eyebrow}>Real curriculum, mixed modes</span>
          <h1>Practice rooms with actual checks.</h1>
        </div>
        <p>
          No pretend points or dead challenge cards. Every room opens a real lab or debugging clinic
          with prerequisite enforcement, feedback, hints, and saved evidence.
        </p>
      </section>

      <section className={styles.rooms} aria-labelledby="rooms-heading">
        <header>
          <span className={styles.eyebrow}>Practice mixer</span>
          <h2 id="rooms-heading">Change the domain. Keep the habits.</h2>
        </header>
        <ol>
          {rooms.map(({ courseId, focus, course, activity, access }, index) => {
            const nextActivity = access.canOpen ? activity : access.unmetPrerequisites[0];
            const href = `/learn/${courseId}/${nextActivity.moduleId}/${nextActivity.id}`;
            return (
              <li key={activity.id}>
                <article className={styles.roomCard}>
                  <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
                  <div className={styles.roomCopy}>
                    <span className={styles.kind}>
                      {activity.kind === 'debug' ? (
                        <Bug aria-hidden="true" />
                      ) : (
                        <FlaskConical aria-hidden="true" />
                      )}
                      {activity.kind} · {focus}
                    </span>
                    <h3>{activity.title}</h3>
                    <p>{activity.summary}</p>
                    <span className={styles.courseName}>{course?.title ?? courseId}</span>
                  </div>
                  <div className={styles.roomMeta}>
                    <span>{activity.steps.length} interactions</span>
                    <span>{activity.estimatedMinutes} minutes</span>
                    {access.canOpen ? (
                      <span className={styles.ready}>
                        <ShieldCheck aria-hidden="true" /> Ready
                      </span>
                    ) : (
                      <span className={styles.locked}>
                        <LockKeyhole aria-hidden="true" /> {access.unmetPrerequisites.length}{' '}
                        earlier {access.unmetPrerequisites.length === 1 ? 'activity' : 'activities'}
                      </span>
                    )}
                  </div>
                  <Link
                    href={href}
                    aria-label={
                      access.canOpen
                        ? `Open ${activity.title}`
                        : `Start prerequisite ${nextActivity.title} to unlock ${activity.title}`
                    }
                  >
                    {access.canOpen ? 'Enter room' : 'Start next prerequisite'}
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </article>
              </li>
            );
          })}
        </ol>
      </section>
    </main>
  );
}
