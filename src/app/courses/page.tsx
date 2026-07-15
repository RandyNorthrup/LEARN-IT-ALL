import { ArrowLeft, ArrowRight, Clock3, Filter, Layers3 } from 'lucide-react';
import Link from 'next/link';
import { filterCourseCatalog, paginateCourseCatalog } from '@/lib/courseCatalog';
import { ALL_COURSES } from '@/lib/data/courses';
import styles from './Courses.module.css';

interface CoursesPageProps {
  searchParams: Promise<{
    difficulty?: string;
    type?: string;
    planned?: string;
    page?: string;
  }>;
}

interface CatalogHrefOptions {
  difficulty: string;
  type: string;
  showPlanned: boolean;
  page: number;
}

function buildCatalogHref({ difficulty, type, showPlanned, page }: CatalogHrefOptions): string {
  const params = new URLSearchParams();
  if (difficulty !== 'all') params.set('difficulty', difficulty);
  if (type !== 'all') params.set('type', type);
  if (showPlanned) params.set('planned', 'yes');
  if (page > 1) params.set('page', String(page));
  const query = params.toString();
  return query ? `/courses?${query}` : '/courses';
}

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const query = await searchParams;
  const difficulty = query.difficulty ?? 'all';
  const type = query.type ?? 'all';
  const showPlanned = query.planned === 'yes';
  const visibleCourses = filterCourseCatalog(ALL_COURSES, {
    difficulty,
    type,
    showPlanned,
  });
  const catalogPage = paginateCourseCatalog(visibleCourses, query.page);
  const plannedCount = ALL_COURSES.filter((course) => course.status === 'coming-soon').length;

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" prefetch={false} className={styles.back}>
          <ArrowLeft aria-hidden="true" /> Home
        </Link>
        <Link href="/" prefetch={false} className={styles.brand}>
          LEARN / BUILD
        </Link>
        <span>{ALL_COURSES.length} paths mapped</span>
      </header>

      <section className={styles.hero}>
        <div>
          <span className={styles.eyebrow}>Choose a capability, not a playlist</span>
          <h1>Course field guide</h1>
          <p>
            Every rebuilt path ends in observable work: projects, investigations, explanations, and
            retained-skill checks.
          </p>
        </div>
        <aside>
          <strong>Release standard</strong>
          <span>Research → competency map → cumulative build → independent transfer → exam</span>
        </aside>
      </section>

      <form className={styles.filters} aria-label="Filter courses">
        <span>
          <Filter aria-hidden="true" /> Filter the field guide
        </span>
        <label>
          Difficulty
          <select name="difficulty" defaultValue={difficulty}>
            <option value="all">All levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </label>
        <label>
          Experience
          <select name="type" defaultValue={type}>
            <option value="all">All experiences</option>
            <option value="course">Courses</option>
            <option value="guided-project">Guided projects</option>
            <option value="portfolio-project">Portfolio projects</option>
          </select>
        </label>
        {plannedCount > 0 && (
          <label className={styles.checkLabel}>
            <input type="checkbox" name="planned" value="yes" defaultChecked={showPlanned} />
            Include {plannedCount} rebuild-queue paths
          </label>
        )}
        <button type="submit">Apply filters</button>
      </form>

      <section className={styles.catalog} aria-labelledby="catalog-title">
        <header>
          <div>
            <span className={styles.eyebrow}>Current catalog</span>
            <h2 id="catalog-title">{showPlanned ? 'All mapped paths' : 'Ready to enter'}</h2>
          </div>
          <strong>
            {catalogPage.firstResult}–{catalogPage.lastResult} of {visibleCourses.length} results
          </strong>
        </header>

        <ol className={styles.courseList}>
          {catalogPage.courses.map((course, index) => {
            const isPlanned = course.status === 'coming-soon';
            const href = `/learn/${course.id}`;
            return (
              <li key={course.id}>
                <article className={styles.courseCard}>
                  <div className={styles.courseIndex}>
                    {String(catalogPage.firstResult + index).padStart(2, '0')}
                  </div>
                  <div className={styles.courseBody}>
                    <div className={styles.courseMeta}>
                      <span>{isPlanned ? 'rebuild queue' : 'interactive studio'}</span>
                      <span>{course.difficulty}</span>
                      <span>{course.type.replaceAll('-', ' ')}</span>
                    </div>
                    <h3>{course.title}</h3>
                    <p>{course.description}</p>
                    <div className={styles.courseFacts}>
                      <span>
                        <Clock3 aria-hidden="true" /> {course.estimatedHours} hours
                      </span>
                      <span>
                        <Layers3 aria-hidden="true" /> {course.lessonCount} interactive activities
                      </span>
                    </div>
                    <ul className={styles.tags} aria-label={`${course.title} topics`}>
                      {course.tags.slice(0, 4).map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  </div>
                  {isPlanned ? (
                    <span className={styles.queued}>Planned</span>
                  ) : (
                    <Link
                      className={styles.openCourse}
                      href={href}
                      prefetch={false}
                      aria-label={`Open ${course.title}`}
                    >
                      <ArrowRight aria-hidden="true" />
                    </Link>
                  )}
                </article>
              </li>
            );
          })}
        </ol>

        {visibleCourses.length > 0 && catalogPage.totalPages > 1 && (
          <nav className={styles.pagination} aria-label="Course catalog pages">
            {catalogPage.currentPage > 1 ? (
              <Link
                href={buildCatalogHref({
                  difficulty,
                  type,
                  showPlanned,
                  page: catalogPage.currentPage - 1,
                })}
                prefetch={false}
                rel="prev"
              >
                <ArrowLeft aria-hidden="true" /> Previous
              </Link>
            ) : (
              <span aria-disabled="true">
                <ArrowLeft aria-hidden="true" /> Previous
              </span>
            )}
            <strong className={styles.pageCount}>
              Page {catalogPage.currentPage} of {catalogPage.totalPages}
            </strong>
            {catalogPage.currentPage < catalogPage.totalPages ? (
              <Link
                href={buildCatalogHref({
                  difficulty,
                  type,
                  showPlanned,
                  page: catalogPage.currentPage + 1,
                })}
                prefetch={false}
                rel="next"
              >
                Next <ArrowRight aria-hidden="true" />
              </Link>
            ) : (
              <span aria-disabled="true">
                Next <ArrowRight aria-hidden="true" />
              </span>
            )}
          </nav>
        )}

        {visibleCourses.length === 0 && (
          <p className={styles.empty}>No path matches those filters. Try a broader combination.</p>
        )}
      </section>
    </main>
  );
}
