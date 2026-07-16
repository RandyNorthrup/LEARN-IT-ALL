import { ArrowLeft, ArrowRight, Route } from 'lucide-react';
import Link from 'next/link';
import styles from './Tracks.module.css';

export default function TracksPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" prefetch={false} className={styles.back}>
          <ArrowLeft aria-hidden="true" /> Home
        </Link>
        <Link href="/" prefetch={false} className={styles.brand}>
          LEARN / BUILD
        </Link>
        <Link href="/courses" prefetch={false} className={styles.catalogLink}>
          Courses <ArrowRight aria-hidden="true" />
        </Link>
      </header>

      <section className={styles.hero}>
        <div>
          <span className={styles.eyebrow}>Prerequisites first</span>
          <h1>Learning paths protect the order.</h1>
        </div>
        <p>
          A learning path groups available courses around a larger goal and places each prerequisite
          before the work that depends on it.
        </p>
      </section>

      <section className={styles.trackSection} aria-labelledby="track-heading">
        <header>
          <span className={styles.eyebrow}>Available paths</span>
          <h2 id="track-heading">No complete learning paths are open yet.</h2>
        </header>
        <div className={styles.empty} role="status">
          <Route aria-hidden="true" />
          <div>
            <h3>Start with the course library.</h3>
            <p>
              A path will appear here only when every course in its prerequisite sequence is
              available. The course library shows what you can enter now.
            </p>
          </div>
          <Link href="/courses" prefetch={false}>
            Open courses <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
