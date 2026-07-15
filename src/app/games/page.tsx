import { ArrowLeft, ArrowRight, Braces, Bug, Gauge, GitMerge, Keyboard, Orbit } from 'lucide-react';
import Link from 'next/link';
import styles from './Games.module.css';

const PRACTICE_CIRCUITS = [
  {
    href: '/games/code-hunter',
    number: '01',
    title: 'Bug Forensics',
    skill: 'causal debugging',
    description: 'Locate the fault, predict its effect, then repair a changed case.',
    icon: Bug,
  },
  {
    href: '/games/code-builder',
    number: '02',
    title: 'System Builder',
    skill: 'workflow ordering',
    description: 'Arrange production steps around safety, evidence, and rollback constraints.',
    icon: GitMerge,
  },
  {
    href: '/games/logic-maze',
    number: '03',
    title: 'Decision Labyrinth',
    skill: 'operational reasoning',
    description: 'Navigate incidents and releases without skipping prerequisite evidence.',
    icon: Braces,
  },
  {
    href: '/games/algorithm-arena',
    number: '04',
    title: 'Algorithm Arena',
    skill: 'invariants and complexity',
    description: 'Reason about searches, graphs, sorting, negative edges, and dynamic state.',
    icon: Gauge,
  },
  {
    href: '/games/syntax-speed',
    number: '05',
    title: 'Syntax Recall Circuit',
    skill: 'accurate code recall',
    description: 'Type a language pattern, then transfer it to changed names and values.',
    icon: Keyboard,
  },
] as const;

export default function GamesPage() {
  return (
    <main className={styles.page}>
      <header className={styles.siteHeader}>
        <Link href="/" className={styles.back}>
          <ArrowLeft aria-hidden="true" /> Home
        </Link>
        <Link href="/" className={styles.brand}>
          LEARN / BUILD
        </Link>
        <Link href="/challenges" className={styles.roomsLink}>
          Curriculum practice <ArrowRight aria-hidden="true" />
        </Link>
      </header>

      <section className={styles.hero}>
        <div>
          <span className={styles.eyebrow}>Low-stakes retrieval playground</span>
          <h1>Practice skills. Prove the transfer.</h1>
        </div>
        <div className={styles.heroCopy}>
          <p>
            Every result follows explicit rules. Diagnose one case, handle a changed case, and read
            the causal explanation. No random grades, fake execution, or timer punishment.
          </p>
          <span>Session points stay separate from course mastery.</span>
        </div>
      </section>

      <section className={styles.flightDeck} aria-labelledby="flight-heading">
        <header>
          <span className={styles.eyebrow}>Control-systems flight deck</span>
          <h2 id="flight-heading" className={styles.sectionHeading}>
            Same physics. Two ways to think.
          </h2>
        </header>
        <div className={styles.flightGrid}>
          <Link href="/games/lunar-lander" className={styles.flightCard}>
            <span className={styles.flightIcon}>
              <Orbit aria-hidden="true" /> Manual control
            </span>
            <h3>Lunar Lander</h3>
            <p>Choose one command per telemetry update and reason about feedback in real time.</p>
            <span className={styles.openLabel}>
              Enter cockpit <ArrowRight aria-hidden="true" />
            </span>
          </Link>
          <Link href="/games/code-lander" className={styles.flightCard}>
            <span className={styles.flightIcon}>
              <Braces aria-hidden="true" /> Program control
            </span>
            <h3>Code Lander</h3>
            <p>Write a safe command program, run it, inspect the full trace, and revise.</p>
            <span className={styles.openLabel}>
              Open console <ArrowRight aria-hidden="true" />
            </span>
          </Link>
        </div>
      </section>

      <section className={styles.circuits} aria-labelledby="circuits-heading">
        <header>
          <span className={styles.eyebrow}>Five deterministic circuits</span>
          <h2 id="circuits-heading" className={styles.sectionHeading}>
            Short rounds. Changed cases. Real reasons.
          </h2>
        </header>
        <ol>
          {PRACTICE_CIRCUITS.map(({ href, number, title, skill, description, icon: Icon }) => (
            <li key={href}>
              <Link href={href}>
                <span className={styles.number}>{number}</span>
                <span className={styles.circuitIcon}>
                  <Icon aria-hidden="true" />
                </span>
                <span className={styles.circuitCopy}>
                  <span className={styles.skill}>{skill}</span>
                  <strong>{title}</strong>
                  <span>{description}</span>
                </span>
                <ArrowRight className={styles.arrow} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <aside className={styles.masteryBoundary}>
        <div>
          <span className={styles.eyebrow}>Where mastery lives</span>
          <h2 className={`${styles.sectionHeading} ${styles.masteryHeading}`}>
            Games retrieve. Courses assess.
          </h2>
        </div>
        <p>
          Use the arcade for repetition and feedback. Use curriculum workshops, debugging clinics,
          labs, projects, quizzes, and exams for saved evidence and mastery progression.
        </p>
        <Link href="/courses" className={styles.masteryLink}>
          Browse 54 courses <ArrowRight aria-hidden="true" />
        </Link>
      </aside>
    </main>
  );
}
