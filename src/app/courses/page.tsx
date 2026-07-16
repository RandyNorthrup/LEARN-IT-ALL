import { ArrowLeft, ArrowRight, Filter } from 'lucide-react';
import Link from 'next/link';
import { filterCourseCatalog, paginateCourseCatalog } from '@/lib/courseCatalog';
import { PUBLISHED_COURSES } from '@/lib/data/publishedCourses';
import styles from './Courses.module.css';

interface CoursesPageProps {
  searchParams: Promise<{
    difficulty?: string;
    type?: string;
    page?: string;
  }>;
}

interface CatalogHrefOptions {
  difficulty: string;
  type: string;
  page: number;
}

function buildCatalogHref({ difficulty, type, page }: CatalogHrefOptions): string {
  const params = new URLSearchParams();
  if (difficulty !== 'all') params.set('difficulty', difficulty);
  if (type !== 'all') params.set('type', type);
  if (page > 1) params.set('page', String(page));
  const query = params.toString();
  return query ? `/courses?${query}` : '/courses';
}

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const query = await searchParams;
  const difficulty = query.difficulty ?? 'all';
  const type = query.type ?? 'all';
  const visibleCourses = filterCourseCatalog(PUBLISHED_COURSES, {
    difficulty,
    type,
  });
  const catalogPage = paginateCourseCatalog(visibleCourses, query.page);
  const hasPublishedCourses = PUBLISHED_COURSES.length > 0;

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" prefetch={false} className={styles.back}>
          <ArrowLeft aria-hidden="true" /> Home
        </Link>
        <Link href="/" prefetch={false} className={styles.brand}>
          LEARN / BUILD
        </Link>
        <span>{PUBLISHED_COURSES.length} courses available</span>
      </header>

      <section className={styles.hero}>
        <div>
          <span className={styles.eyebrow}>Choose what you want to build</span>
          <h1>Course library</h1>
          <p>
            Open a course to see its prerequisites, modules, current activity, and saved progress.
            Continue from the first unfinished activity whenever you return.
          </p>
        </div>
        <aside>
          <strong>How courses work</strong>
          <span>Learn a concept, practice it, repair mistakes, then use it in a real build.</span>
        </aside>
      </section>

      {hasPublishedCourses && (
        <form className={styles.filters} aria-label="Filter courses">
          <span>
            <Filter aria-hidden="true" /> Filter the course library
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
          <button type="submit">Apply filters</button>
        </form>
      )}

      <section className={styles.catalog} aria-labelledby="catalog-title">
        <header>
          <div>
            <span className={styles.eyebrow}>Current catalog</span>
            <h2 id="catalog-title">Ready to learn</h2>
          </div>
          <strong>
            {visibleCourses.length === 0
              ? '0 results'
              : `${catalogPage.firstResult}–${catalogPage.lastResult} of ${visibleCourses.length} results`}
          </strong>
        </header>

        <ol className={styles.courseList}>
          {catalogPage.courses.map((course, index) => {
            const href = `/learn/${course.id}`;
            return (
              <li key={course.id}>
                <article className={styles.courseCard}>
                  <div className={styles.courseIndex}>
                    {String(catalogPage.firstResult + index).padStart(2, '0')}
                  </div>
                  <div className={styles.courseBody}>
                    <div className={styles.courseMeta}>
                      <span>interactive studio</span>
                      <span>{course.difficulty}</span>
                      <span>{course.type.replaceAll('-', ' ')}</span>
                    </div>
                    <h3>{course.title}</h3>
                    <p>{course.description}</p>
                    <ul className={styles.tags} aria-label={`${course.title} topics`}>
                      {course.tags.slice(0, 4).map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    className={styles.openCourse}
                    href={href}
                    prefetch={false}
                    aria-label={`Open ${course.title}`}
                  >
                    <ArrowRight aria-hidden="true" />
                  </Link>
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
          <div className={styles.empty} role="status">
            <h3>No courses are open yet.</h3>
            <p>
              Available courses will appear here with a direct link to their prerequisite-ordered
              course map. Existing learning records remain available on the Progress page.
            </p>
            <Link href="/progress" prefetch={false}>
              View saved progress <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
