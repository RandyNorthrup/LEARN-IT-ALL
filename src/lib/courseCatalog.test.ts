import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  COURSE_CATALOG_PAGE_SIZE,
  filterCourseCatalog,
  paginateCourseCatalog,
} from './courseCatalog';
import { ALL_COURSES, type CourseMetadata, isV2Course } from './data/courses';

const courses: CourseMetadata[] = [
  {
    id: 'available-beginner',
    title: 'Available beginner',
    description: 'Ready now',
    difficulty: 'beginner',
    estimatedHours: 1,
    tags: [],
    prerequisites: [],
    status: 'available',
    lessonCount: 1,
    chapterCount: 1,
    type: 'course',
  },
  {
    id: 'planned-advanced',
    title: 'Planned advanced',
    description: 'Planned',
    difficulty: 'advanced',
    estimatedHours: 1,
    tags: [],
    prerequisites: [],
    status: 'coming-soon',
    lessonCount: 1,
    chapterCount: 1,
    type: 'course',
  },
];

describe('filterCourseCatalog', () => {
  it('keeps the first render focused on courses learners can open', () => {
    const visibleCourses = filterCourseCatalog([...courses], {
      difficulty: 'all',
      type: 'all',
      showPlanned: false,
    });

    expect(visibleCourses.map((course) => course.id)).toEqual(['available-beginner']);
  });

  it('reveals planned courses while preserving filters', () => {
    const visibleCourses = filterCourseCatalog([...courses], {
      difficulty: 'advanced',
      type: 'course',
      showPlanned: true,
    });

    expect(visibleCourses.map((course) => course.id)).toEqual(['planned-advanced']);
  });

  it('paginates the catalog without duplicating or skipping courses', () => {
    const catalog = Array.from({ length: COURSE_CATALOG_PAGE_SIZE + 2 }, (_, index) => ({
      ...courses[0],
      id: `course-${index + 1}`,
    }));

    const firstPage = paginateCourseCatalog(catalog, undefined);
    const secondPage = paginateCourseCatalog(catalog, '2');

    expect(firstPage).toMatchObject({
      currentPage: 1,
      totalPages: 2,
      firstResult: 1,
      lastResult: COURSE_CATALOG_PAGE_SIZE,
    });
    expect(firstPage.courses).toHaveLength(COURSE_CATALOG_PAGE_SIZE);
    expect(secondPage).toMatchObject({
      currentPage: 2,
      totalPages: 2,
      firstResult: COURSE_CATALOG_PAGE_SIZE + 1,
      lastResult: COURSE_CATALOG_PAGE_SIZE + 2,
    });
    expect([...firstPage.courses, ...secondPage.courses].map((course) => course.id)).toEqual(
      catalog.map((course) => course.id)
    );
  });

  it('normalizes invalid and out-of-range page requests', () => {
    expect(paginateCourseCatalog([...courses], 'not-a-page').currentPage).toBe(1);
    expect(paginateCourseCatalog([...courses], '-2').currentPage).toBe(1);
    expect(paginateCourseCatalog([...courses], '99', 1).currentPage).toBe(2);
    expect(() => paginateCourseCatalog([...courses], '1', 0)).toThrow(RangeError);
  });

  it('publishes every rebuilt course through the v2 learning studio', () => {
    const expectedIds = [
      'responsive-web-design',
      'python-basics',
      'python-oop',
      'comptia-network-plus',
      'javascript-basics',
      'typescript-basics',
      'python-functional',
      'python-dsa',
      'python-dsa-2',
      'linux-basics',
      'git-basics',
      'applied-mathematics-beginner',
      'applied-mathematics-intermediate',
      'applied-mathematics-advanced',
      'prompt-engineering-claude-codex',
      'agent-loops-goals',
      'agent-skills-mcp',
      'repository-quality-gates',
      'sql-basics',
      'go-basics',
    ];

    expect(expectedIds.every(isV2Course)).toBe(true);
    expect(
      expectedIds.every((courseId) =>
        ALL_COURSES.some((course) => course.id === courseId && course.status === 'available')
      )
    ).toBe(true);

    for (const courseId of expectedIds) {
      const generated = JSON.parse(
        readFileSync(
          path.join(process.cwd(), 'content', 'v2', 'courses', courseId, 'course.json'),
          'utf8'
        )
      ) as { estimatedHours: number; moduleIds: string[] };
      const activityCount = readdirSync(
        path.join(process.cwd(), 'content', 'v2', 'courses', courseId, 'activities')
      ).filter((fileName) => fileName.endsWith('.json')).length;
      const metadata = ALL_COURSES.find((course) => course.id === courseId);
      expect(metadata?.estimatedHours).toBe(generated.estimatedHours);
      expect(metadata?.chapterCount).toBe(generated.moduleIds.length);
      expect(metadata?.lessonCount).toBe(activityCount);
    }
  });

  it('publishes the verified HTTP client courses through the v2 studio', () => {
    const publishedIds = ['http-clients-go', 'http-clients-typescript', 'http-clients-python'];

    expect(publishedIds.every(isV2Course)).toBe(true);
    expect(
      publishedIds.every((courseId) =>
        ALL_COURSES.some((course) => course.id === courseId && course.status === 'available')
      )
    ).toBe(true);

    for (const courseId of publishedIds) {
      const generated = JSON.parse(
        readFileSync(
          path.join(process.cwd(), 'content', 'v2', 'courses', courseId, 'course.json'),
          'utf8'
        )
      ) as { estimatedHours: number; moduleIds: string[] };
      const activityCount = readdirSync(
        path.join(process.cwd(), 'content', 'v2', 'courses', courseId, 'activities')
      ).filter((fileName) => fileName.endsWith('.json')).length;
      const metadata = ALL_COURSES.find((course) => course.id === courseId);
      expect(metadata?.estimatedHours).toBe(generated.estimatedHours);
      expect(metadata?.chapterCount).toBe(generated.moduleIds.length);
      expect(metadata?.lessonCount).toBe(activityCount);
    }
  });

  it('publishes the verified Docker course through the safe v2 configuration studio', () => {
    const courseId = 'docker-basics';
    expect(isV2Course(courseId)).toBe(true);
    expect(
      ALL_COURSES.some((course) => course.id === courseId && course.status === 'available')
    ).toBe(true);

    const generated = JSON.parse(
      readFileSync(
        path.join(process.cwd(), 'content', 'v2', 'courses', courseId, 'course.json'),
        'utf8'
      )
    ) as { estimatedHours: number; moduleIds: string[] };
    const activityCount = readdirSync(
      path.join(process.cwd(), 'content', 'v2', 'courses', courseId, 'activities')
    ).filter((fileName) => fileName.endsWith('.json')).length;
    const metadata = ALL_COURSES.find((course) => course.id === courseId);
    expect(metadata?.estimatedHours).toBe(generated.estimatedHours);
    expect(metadata?.chapterCount).toBe(generated.moduleIds.length);
    expect(metadata?.lessonCount).toBe(activityCount);
  });

  it('publishes the verified Kubernetes course through the safe v2 configuration studio', () => {
    const courseId = 'kubernetes-basics';
    expect(isV2Course(courseId)).toBe(true);
    expect(
      ALL_COURSES.some((course) => course.id === courseId && course.status === 'available')
    ).toBe(true);

    const generated = JSON.parse(
      readFileSync(
        path.join(process.cwd(), 'content', 'v2', 'courses', courseId, 'course.json'),
        'utf8'
      )
    ) as { estimatedHours: number; moduleIds: string[] };
    const activityCount = readdirSync(
      path.join(process.cwd(), 'content', 'v2', 'courses', courseId, 'activities')
    ).filter((fileName) => fileName.endsWith('.json')).length;
    const metadata = ALL_COURSES.find((course) => course.id === courseId);
    expect(metadata?.estimatedHours).toBe(generated.estimatedHours);
    expect(metadata?.chapterCount).toBe(generated.moduleIds.length);
    expect(metadata?.lessonCount).toBe(activityCount);
  });

  it('publishes the verified CI/CD course through the safe v2 configuration studio', () => {
    const courseId = 'cicd-github-actions';
    expect(isV2Course(courseId)).toBe(true);
    expect(
      ALL_COURSES.some((course) => course.id === courseId && course.status === 'available')
    ).toBe(true);

    const generated = JSON.parse(
      readFileSync(
        path.join(process.cwd(), 'content', 'v2', 'courses', courseId, 'course.json'),
        'utf8'
      )
    ) as { estimatedHours: number; moduleIds: string[] };
    const activityCount = readdirSync(
      path.join(process.cwd(), 'content', 'v2', 'courses', courseId, 'activities')
    ).filter((fileName) => fileName.endsWith('.json')).length;
    const metadata = ALL_COURSES.find((course) => course.id === courseId);
    expect(metadata?.estimatedHours).toBe(generated.estimatedHours);
    expect(metadata?.chapterCount).toBe(generated.moduleIds.length);
    expect(metadata?.lessonCount).toBe(activityCount);
  });

  it('publishes the verified Advanced Git course through the safe v2 terminal studio', () => {
    const courseId = 'git-advanced';
    expect(isV2Course(courseId)).toBe(true);
    expect(
      ALL_COURSES.some((course) => course.id === courseId && course.status === 'available')
    ).toBe(true);

    const generated = JSON.parse(
      readFileSync(
        path.join(process.cwd(), 'content', 'v2', 'courses', courseId, 'course.json'),
        'utf8'
      )
    ) as { estimatedHours: number; moduleIds: string[] };
    const activityCount = readdirSync(
      path.join(process.cwd(), 'content', 'v2', 'courses', courseId, 'activities')
    ).filter((fileName) => fileName.endsWith('.json')).length;
    const metadata = ALL_COURSES.find((course) => course.id === courseId);
    expect(metadata?.estimatedHours).toBe(generated.estimatedHours);
    expect(metadata?.chapterCount).toBe(generated.moduleIds.length);
    expect(metadata?.lessonCount).toBe(activityCount);
  });

  it('publishes the verified Go HTTP server course through the isolated v2 Go studio', () => {
    const courseId = 'http-servers-go';
    expect(isV2Course(courseId)).toBe(true);
    expect(
      ALL_COURSES.some((course) => course.id === courseId && course.status === 'available')
    ).toBe(true);

    const generated = JSON.parse(
      readFileSync(
        path.join(process.cwd(), 'content', 'v2', 'courses', courseId, 'course.json'),
        'utf8'
      )
    ) as { estimatedHours: number; moduleIds: string[] };
    const activityCount = readdirSync(
      path.join(process.cwd(), 'content', 'v2', 'courses', courseId, 'activities')
    ).filter((fileName) => fileName.endsWith('.json')).length;
    const metadata = ALL_COURSES.find((course) => course.id === courseId);
    expect(metadata?.estimatedHours).toBe(generated.estimatedHours);
    expect(metadata?.chapterCount).toBe(generated.moduleIds.length);
    expect(metadata?.lessonCount).toBe(activityCount);
  });

  it('publishes the verified TypeScript HTTP server course through the isolated v2 studio', () => {
    const courseId = 'http-servers-typescript';
    expect(isV2Course(courseId)).toBe(true);
    expect(
      ALL_COURSES.some((course) => course.id === courseId && course.status === 'available')
    ).toBe(true);

    const generated = JSON.parse(
      readFileSync(
        path.join(process.cwd(), 'content', 'v2', 'courses', courseId, 'course.json'),
        'utf8'
      )
    ) as { estimatedHours: number; moduleIds: string[] };
    const activityCount = readdirSync(
      path.join(process.cwd(), 'content', 'v2', 'courses', courseId, 'activities')
    ).filter((fileName) => fileName.endsWith('.json')).length;
    const metadata = ALL_COURSES.find((course) => course.id === courseId);
    expect(metadata?.estimatedHours).toBe(generated.estimatedHours);
    expect(metadata?.chapterCount).toBe(generated.moduleIds.length);
    expect(metadata?.lessonCount).toBe(activityCount);
  });

  it('publishes the verified Go HTTP protocol course through the isolated v2 Go studio', () => {
    const courseId = 'http-protocol-go';
    expect(isV2Course(courseId)).toBe(true);
    expect(
      ALL_COURSES.some((course) => course.id === courseId && course.status === 'available')
    ).toBe(true);

    const generated = JSON.parse(
      readFileSync(
        path.join(process.cwd(), 'content', 'v2', 'courses', courseId, 'course.json'),
        'utf8'
      )
    ) as { estimatedHours: number; moduleIds: string[] };
    const activityCount = readdirSync(
      path.join(process.cwd(), 'content', 'v2', 'courses', courseId, 'activities')
    ).filter((fileName) => fileName.endsWith('.json')).length;
    const metadata = ALL_COURSES.find((course) => course.id === courseId);
    expect(metadata?.estimatedHours).toBe(generated.estimatedHours);
    expect(metadata?.chapterCount).toBe(generated.moduleIds.length);
    expect(metadata?.lessonCount).toBe(activityCount);
  });

  it('publishes the verified RabbitMQ TypeScript course through the isolated v2 studio', () => {
    const courseId = 'pubsub-rabbitmq-typescript';
    expect(isV2Course(courseId)).toBe(true);
    expect(
      ALL_COURSES.some((course) => course.id === courseId && course.status === 'available')
    ).toBe(true);

    const generated = JSON.parse(
      readFileSync(
        path.join(process.cwd(), 'content', 'v2', 'courses', courseId, 'course.json'),
        'utf8'
      )
    ) as { estimatedHours: number; moduleIds: string[] };
    const activityCount = readdirSync(
      path.join(process.cwd(), 'content', 'v2', 'courses', courseId, 'activities')
    ).filter((fileName) => fileName.endsWith('.json')).length;
    const metadata = ALL_COURSES.find((course) => course.id === courseId);
    expect(metadata?.estimatedHours).toBe(generated.estimatedHours);
    expect(metadata?.chapterCount).toBe(generated.moduleIds.length);
    expect(metadata?.lessonCount).toBe(activityCount);
  });

  it('publishes the verified RabbitMQ Go course through the isolated v2 studio', () => {
    const courseId = 'pubsub-rabbitmq-go';
    expect(isV2Course(courseId)).toBe(true);
    expect(
      ALL_COURSES.some((course) => course.id === courseId && course.status === 'available')
    ).toBe(true);

    const generated = JSON.parse(
      readFileSync(
        path.join(process.cwd(), 'content', 'v2', 'courses', courseId, 'course.json'),
        'utf8'
      )
    ) as { estimatedHours: number; moduleIds: string[] };
    const activityCount = readdirSync(
      path.join(process.cwd(), 'content', 'v2', 'courses', courseId, 'activities')
    ).filter((fileName) => fileName.endsWith('.json')).length;
    const metadata = ALL_COURSES.find((course) => course.id === courseId);
    expect(metadata?.estimatedHours).toBe(generated.estimatedHours);
    expect(metadata?.chapterCount).toBe(generated.moduleIds.length);
    expect(metadata?.lessonCount).toBe(activityCount);
  });

  it('publishes the verified S3 and CloudFront Go course through the isolated v2 studio', () => {
    const courseId = 'file-servers-s3-go';
    expect(isV2Course(courseId)).toBe(true);
    expect(
      ALL_COURSES.some((course) => course.id === courseId && course.status === 'available')
    ).toBe(true);

    const generated = JSON.parse(
      readFileSync(
        path.join(process.cwd(), 'content', 'v2', 'courses', courseId, 'course.json'),
        'utf8'
      )
    ) as { estimatedHours: number; moduleIds: string[] };
    const activityCount = readdirSync(
      path.join(process.cwd(), 'content', 'v2', 'courses', courseId, 'activities')
    ).filter((fileName) => fileName.endsWith('.json')).length;
    const metadata = ALL_COURSES.find((course) => course.id === courseId);
    expect(metadata?.estimatedHours).toBe(generated.estimatedHours);
    expect(metadata?.chapterCount).toBe(generated.moduleIds.length);
    expect(metadata?.lessonCount).toBe(activityCount);
  });

  it('publishes the verified S3 and CloudFront TypeScript course through the isolated v2 studio', () => {
    const courseId = 'file-servers-s3-typescript';
    expect(isV2Course(courseId)).toBe(true);
    expect(
      ALL_COURSES.some((course) => course.id === courseId && course.status === 'available')
    ).toBe(true);

    const generated = JSON.parse(
      readFileSync(
        path.join(process.cwd(), 'content', 'v2', 'courses', courseId, 'course.json'),
        'utf8'
      )
    ) as { estimatedHours: number; moduleIds: string[] };
    const activityCount = readdirSync(
      path.join(process.cwd(), 'content', 'v2', 'courses', courseId, 'activities')
    ).filter((fileName) => fileName.endsWith('.json')).length;
    const metadata = ALL_COURSES.find((course) => course.id === courseId);
    expect(metadata?.estimatedHours).toBe(generated.estimatedHours);
    expect(metadata?.chapterCount).toBe(generated.moduleIds.length);
    expect(metadata?.lessonCount).toBe(activityCount);
  });

  it('publishes the verified C23 memory-safety course through the isolated v2 C studio', () => {
    const courseId = 'c-memory-management';
    expect(isV2Course(courseId)).toBe(true);
    expect(
      ALL_COURSES.some((course) => course.id === courseId && course.status === 'available')
    ).toBe(true);

    const generated = JSON.parse(
      readFileSync(
        path.join(process.cwd(), 'content', 'v2', 'courses', courseId, 'course.json'),
        'utf8'
      )
    ) as { estimatedHours: number; moduleIds: string[] };
    const activityCount = readdirSync(
      path.join(process.cwd(), 'content', 'v2', 'courses', courseId, 'activities')
    ).filter((fileName) => fileName.endsWith('.json')).length;
    const metadata = ALL_COURSES.find((course) => course.id === courseId);
    expect(metadata?.estimatedHours).toBe(generated.estimatedHours);
    expect(metadata?.chapterCount).toBe(generated.moduleIds.length);
    expect(metadata?.lessonCount).toBe(activityCount);
  });

  it('publishes the verified Go cryptographic-engineering course through the isolated v2 studio', () => {
    const courseId = 'cryptography-go';
    expect(isV2Course(courseId)).toBe(true);
    expect(
      ALL_COURSES.some((course) => course.id === courseId && course.status === 'available')
    ).toBe(true);

    const generated = JSON.parse(
      readFileSync(
        path.join(process.cwd(), 'content', 'v2', 'courses', courseId, 'course.json'),
        'utf8'
      )
    ) as { estimatedHours: number; moduleIds: string[] };
    const activityCount = readdirSync(
      path.join(process.cwd(), 'content', 'v2', 'courses', courseId, 'activities')
    ).filter((fileName) => fileName.endsWith('.json')).length;
    const metadata = ALL_COURSES.find((course) => course.id === courseId);
    expect(metadata?.estimatedHours).toBe(generated.estimatedHours);
    expect(metadata?.chapterCount).toBe(generated.moduleIds.length);
    expect(metadata?.lessonCount).toBe(activityCount);
  });

  it('publishes the verified Python RAG engineering course through the isolated v2 studio', () => {
    const courseId = 'rag-retrieval-augmented-generation';
    expect(isV2Course(courseId)).toBe(true);
    expect(
      ALL_COURSES.some((course) => course.id === courseId && course.status === 'available')
    ).toBe(true);

    const generated = JSON.parse(
      readFileSync(
        path.join(process.cwd(), 'content', 'v2', 'courses', courseId, 'course.json'),
        'utf8'
      )
    ) as { estimatedHours: number; moduleIds: string[] };
    const activityCount = readdirSync(
      path.join(process.cwd(), 'content', 'v2', 'courses', courseId, 'activities')
    ).filter((fileName) => fileName.endsWith('.json')).length;
    const metadata = ALL_COURSES.find((course) => course.id === courseId);
    expect(metadata?.estimatedHours).toBe(generated.estimatedHours);
    expect(metadata?.chapterCount).toBe(generated.moduleIds.length);
    expect(metadata?.lessonCount).toBe(activityCount);
  });

  it('publishes the verified Unicode-safe Python Bookbot project through the isolated v2 studio', () => {
    const courseId = 'build-bookbot-python';
    expect(isV2Course(courseId)).toBe(true);
    expect(
      ALL_COURSES.some((course) => course.id === courseId && course.status === 'available')
    ).toBe(true);

    const generated = JSON.parse(
      readFileSync(
        path.join(process.cwd(), 'content', 'v2', 'courses', courseId, 'course.json'),
        'utf8'
      )
    ) as { estimatedHours: number; moduleIds: string[] };
    const activityCount = readdirSync(
      path.join(process.cwd(), 'content', 'v2', 'courses', courseId, 'activities')
    ).filter((fileName) => fileName.endsWith('.json')).length;
    const metadata = ALL_COURSES.find((course) => course.id === courseId);
    expect(metadata?.estimatedHours).toBe(generated.estimatedHours);
    expect(metadata?.chapterCount).toBe(generated.moduleIds.length);
    expect(metadata?.lessonCount).toBe(activityCount);
  });

  it('publishes the verified accessible Python Asteroids project through the isolated v2 studio', () => {
    const courseId = 'build-asteroids-python';
    expect(isV2Course(courseId)).toBe(true);
    expect(
      ALL_COURSES.some((course) => course.id === courseId && course.status === 'available')
    ).toBe(true);

    const generated = JSON.parse(
      readFileSync(
        path.join(process.cwd(), 'content', 'v2', 'courses', courseId, 'course.json'),
        'utf8'
      )
    ) as { estimatedHours: number; moduleIds: string[] };
    const activityCount = readdirSync(
      path.join(process.cwd(), 'content', 'v2', 'courses', courseId, 'activities')
    ).filter((fileName) => fileName.endsWith('.json')).length;
    const metadata = ALL_COURSES.find((course) => course.id === courseId);
    expect(metadata?.estimatedHours).toBe(generated.estimatedHours);
    expect(metadata?.chapterCount).toBe(generated.moduleIds.length);
    expect(metadata?.lessonCount).toBe(activityCount);
  });

  it('publishes the verified production Python static-site generator through the isolated v2 studio', () => {
    const courseId = 'build-static-site-python';
    expect(isV2Course(courseId)).toBe(true);
    expect(
      ALL_COURSES.some((course) => course.id === courseId && course.status === 'available')
    ).toBe(true);

    const generated = JSON.parse(
      readFileSync(
        path.join(process.cwd(), 'content', 'v2', 'courses', courseId, 'course.json'),
        'utf8'
      )
    ) as { estimatedHours: number; moduleIds: string[] };
    const activityCount = readdirSync(
      path.join(process.cwd(), 'content', 'v2', 'courses', courseId, 'activities')
    ).filter((fileName) => fileName.endsWith('.json')).length;
    const metadata = ALL_COURSES.find((course) => course.id === courseId);
    expect(metadata?.estimatedHours).toBe(generated.estimatedHours);
    expect(metadata?.chapterCount).toBe(generated.moduleIds.length);
    expect(metadata?.lessonCount).toBe(activityCount);
  });

  it('publishes the verified accessible Python maze solver through the isolated v2 studio', () => {
    const courseId = 'build-maze-solver-python';
    expect(isV2Course(courseId)).toBe(true);
    expect(
      ALL_COURSES.some((course) => course.id === courseId && course.status === 'available')
    ).toBe(true);

    const generated = JSON.parse(
      readFileSync(
        path.join(process.cwd(), 'content', 'v2', 'courses', courseId, 'course.json'),
        'utf8'
      )
    ) as { estimatedHours: number; moduleIds: string[] };
    const activityCount = readdirSync(
      path.join(process.cwd(), 'content', 'v2', 'courses', courseId, 'activities')
    ).filter((fileName) => fileName.endsWith('.json')).length;
    const metadata = ALL_COURSES.find((course) => course.id === courseId);
    expect(metadata?.estimatedHours).toBe(generated.estimatedHours);
    expect(metadata?.chapterCount).toBe(generated.moduleIds.length);
    expect(metadata?.lessonCount).toBe(activityCount);
  });

  it('publishes the verified authorized Python crawler through the isolated v2 studio', () => {
    const courseId = 'build-web-scraper-python';
    expect(isV2Course(courseId)).toBe(true);
    expect(
      ALL_COURSES.some((course) => course.id === courseId && course.status === 'available')
    ).toBe(true);

    const generated = JSON.parse(
      readFileSync(
        path.join(process.cwd(), 'content', 'v2', 'courses', courseId, 'course.json'),
        'utf8'
      )
    ) as { estimatedHours: number; moduleIds: string[] };
    const activityCount = readdirSync(
      path.join(process.cwd(), 'content', 'v2', 'courses', courseId, 'activities')
    ).filter((fileName) => fileName.endsWith('.json')).length;
    const metadata = ALL_COURSES.find((course) => course.id === courseId);
    expect(metadata?.estimatedHours).toBe(generated.estimatedHours);
    expect(metadata?.chapterCount).toBe(generated.moduleIds.length);
    expect(metadata?.lessonCount).toBe(activityCount);
  });

  it('publishes the verified safe evaluated Python AI agent through the isolated v2 studio', () => {
    const courseId = 'build-ai-agent-python';
    expect(isV2Course(courseId)).toBe(true);
    expect(
      ALL_COURSES.some((course) => course.id === courseId && course.status === 'available')
    ).toBe(true);

    const generated = JSON.parse(
      readFileSync(
        path.join(process.cwd(), 'content', 'v2', 'courses', courseId, 'course.json'),
        'utf8'
      )
    ) as { estimatedHours: number; moduleIds: string[] };
    const activityCount = readdirSync(
      path.join(process.cwd(), 'content', 'v2', 'courses', courseId, 'activities')
    ).filter((fileName) => fileName.endsWith('.json')).length;
    const metadata = ALL_COURSES.find((course) => course.id === courseId);
    expect(metadata?.estimatedHours).toBe(generated.estimatedHours);
    expect(metadata?.chapterCount).toBe(generated.moduleIds.length);
    expect(metadata?.lessonCount).toBe(activityCount);
  });

  it('publishes both verified production-grade Pokedex tracks through the isolated v2 studio', () => {
    const courseIds = ['build-pokedex-go', 'build-pokedex-typescript'];
    expect(courseIds.every(isV2Course)).toBe(true);
    expect(
      courseIds.every((courseId) =>
        ALL_COURSES.some((course) => course.id === courseId && course.status === 'available')
      )
    ).toBe(true);

    for (const courseId of courseIds) {
      const generated = JSON.parse(
        readFileSync(
          path.join(process.cwd(), 'content', 'v2', 'courses', courseId, 'course.json'),
          'utf8'
        )
      ) as { estimatedHours: number; moduleIds: string[] };
      const activityCount = readdirSync(
        path.join(process.cwd(), 'content', 'v2', 'courses', courseId, 'activities')
      ).filter((fileName) => fileName.endsWith('.json')).length;
      const metadata = ALL_COURSES.find((course) => course.id === courseId);
      expect(metadata?.estimatedHours).toBe(generated.estimatedHours);
      expect(metadata?.chapterCount).toBe(generated.moduleIds.length);
      expect(metadata?.lessonCount).toBe(activityCount);
    }
  });

  it('publishes both verified production feed-aggregator tracks through the isolated v2 studio', () => {
    const courseIds = ['build-blog-aggregator-go', 'build-blog-aggregator-typescript'];
    expect(courseIds.every(isV2Course)).toBe(true);
    expect(
      courseIds.every((courseId) =>
        ALL_COURSES.some((course) => course.id === courseId && course.status === 'available')
      )
    ).toBe(true);

    for (const courseId of courseIds) {
      const generated = JSON.parse(
        readFileSync(
          path.join(process.cwd(), 'content', 'v2', 'courses', courseId, 'course.json'),
          'utf8'
        )
      ) as { estimatedHours: number; moduleIds: string[] };
      const activityCount = readdirSync(
        path.join(process.cwd(), 'content', 'v2', 'courses', courseId, 'activities')
      ).filter((fileName) => fileName.endsWith('.json')).length;
      const metadata = ALL_COURSES.find((course) => course.id === courseId);
      expect(metadata?.estimatedHours).toBe(generated.estimatedHours);
      expect(metadata?.chapterCount).toBe(generated.moduleIds.length);
      expect(metadata?.lessonCount).toBe(activityCount);
    }
  });

  it('publishes both verified authorized crawler and accessible site-auditor tracks through the isolated v2 studio', () => {
    const courseIds = ['build-web-scraper-go', 'build-web-scraper-typescript'];
    expect(courseIds.every(isV2Course)).toBe(true);
    expect(
      courseIds.every((courseId) =>
        ALL_COURSES.some((course) => course.id === courseId && course.status === 'available')
      )
    ).toBe(true);

    for (const courseId of courseIds) {
      const generated = JSON.parse(
        readFileSync(
          path.join(process.cwd(), 'content', 'v2', 'courses', courseId, 'course.json'),
          'utf8'
        )
      ) as { estimatedHours: number; moduleIds: string[] };
      const activityCount = readdirSync(
        path.join(process.cwd(), 'content', 'v2', 'courses', courseId, 'activities')
      ).filter((fileName) => fileName.endsWith('.json')).length;
      const metadata = ALL_COURSES.find((course) => course.id === courseId);
      expect(metadata?.estimatedHours).toBe(generated.estimatedHours);
      expect(metadata?.chapterCount).toBe(generated.moduleIds.length);
      expect(metadata?.lessonCount).toBe(activityCount);
    }
  });

  it('publishes the independent product studio and capstone sequence through the safe v2 evidence studio', () => {
    const courseIds = ['personal-project-1', 'personal-project-2', 'capstone-project'];
    expect(courseIds.every(isV2Course)).toBe(true);
    expect(
      courseIds.every((courseId) =>
        ALL_COURSES.some((course) => course.id === courseId && course.status === 'available')
      )
    ).toBe(true);

    for (const courseId of courseIds) {
      const generated = JSON.parse(
        readFileSync(
          path.join(process.cwd(), 'content', 'v2', 'courses', courseId, 'course.json'),
          'utf8'
        )
      ) as { estimatedHours: number; moduleIds: string[] };
      const activityCount = readdirSync(
        path.join(process.cwd(), 'content', 'v2', 'courses', courseId, 'activities')
      ).filter((fileName) => fileName.endsWith('.json')).length;
      const metadata = ALL_COURSES.find((course) => course.id === courseId);
      expect(metadata?.estimatedHours).toBe(generated.estimatedHours);
      expect(metadata?.chapterCount).toBe(generated.moduleIds.length);
      expect(metadata?.lessonCount).toBe(activityCount);
    }
  });
});
