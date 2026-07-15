import { ArrowLeft, ArrowRight, Clock3, Layers3, Route } from 'lucide-react';
import Link from 'next/link';
import { ALL_COURSES } from '@/lib/data/courses';
import { LEARNING_TRACKS } from '@/lib/data/tracks';
import styles from './Tracks.module.css';

export default function TracksPage() {
  const courseById = new Map(ALL_COURSES.map((course) => [course.id, course]));

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
          All courses <ArrowRight aria-hidden="true" />
        </Link>
      </header>

      <section className={styles.hero}>
        <div>
          <span className={styles.eyebrow}>Prerequisites first</span>
          <h1>Career paths that never skip the foundation.</h1>
        </div>
        <p>
          Each path automatically inserts every required course before the work that depends on it.
          Pick an outcome; the sequence protects the learning order.
        </p>
      </section>

      <section className={styles.trackSection} aria-labelledby="track-heading">
        <header>
          <span className={styles.eyebrow}>Current pathways</span>
          <h2 id="track-heading">Six routes through one connected curriculum</h2>
        </header>

        <ol className={styles.trackList}>
          {LEARNING_TRACKS.map((track, trackIndex) => (
            <li key={track.id}>
              <article className={styles.trackCard}>
                <header className={styles.trackHeader}>
                  <span className={styles.trackNumber}>
                    {String(trackIndex + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <span className={styles.level}>{track.difficulty}</span>
                    <h3>{track.title}</h3>
                    <p>{track.description}</p>
                  </div>
                  <dl className={styles.trackFacts}>
                    <div>
                      <dt>
                        <Layers3 aria-hidden="true" /> Courses
                      </dt>
                      <dd>{track.courses.length}</dd>
                    </div>
                    <div>
                      <dt>
                        <Clock3 aria-hidden="true" /> Guided work
                      </dt>
                      <dd>{track.estimatedHours.toLocaleString()} hours</dd>
                    </div>
                  </dl>
                </header>

                <ul className={styles.technologyRow} aria-label={`${track.title} technologies`}>
                  {track.technologies.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>

                <ol className={styles.courseSequence} aria-label={`${track.title} course order`}>
                  {track.courses.map((courseId, courseIndex) => {
                    const course = courseById.get(courseId);
                    if (!course) return null;
                    return (
                      <li key={course.id}>
                        <span aria-hidden="true">{String(courseIndex + 1).padStart(2, '0')}</span>
                        <Link href={`/learn/${course.id}`}>
                          <span>
                            <small>{course.type.replaceAll('-', ' ')}</small>
                            <strong>{course.title}</strong>
                          </span>
                          <ArrowRight aria-hidden="true" />
                        </Link>
                      </li>
                    );
                  })}
                </ol>
              </article>
            </li>
          ))}
        </ol>
      </section>

      <aside className={styles.method} aria-label="How paths are ordered">
        <Route aria-hidden="true" />
        <div>
          <strong>Order is generated from course prerequisites.</strong>
          <p>A path cannot publish a dependent course before the skills it requires.</p>
        </div>
      </aside>
    </main>
  );
}
