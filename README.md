# LEARN-IT-ALL

LEARN-IT-ALL is being rebuilt as a local-first, research-backed, build-to-learn platform. The target experience combines concise theory, prediction, worked examples, guided workshops, faded practice, debugging, independent labs, retrieval, authentic projects, quizzes, correction, delayed review, and cumulative exams. Course order follows prerequisites, and every progress or mastery claim must open the evidence that supports it.

## Current state

No legacy curriculum, blueprint, compatibility route, learner-content generator, fake progress metric, or generated-course publication path exists in the current tree. Git history is the only record of prior implementation.

The production catalog intentionally contains zero courses. `content/v2/courses/README.md` is the only file under the course directory, the runtime curriculum index contains zero documents, and the published course and path manifests are empty. This is a deny-by-default boundary: no course appears until research, authoring, runtime, assessment, duplication, accessibility, responsive-flow, review, and observed-learner gates pass.

The sole scope inventory is `docs/research/course-inventory.json`:

- 54 intended courses;
- Responsive Web Design is `researching`;
- 53 course dossiers are still `pending`;
- zero courses are researched, approved, or published.

See [Project Memory](docs/PROJECT_MEMORY.md) for dated verified evidence and [the rebuild plan](docs/LEARNING_PLATFORM_RESEARCH_AND_REBUILD_PLAN.md) for the active program.

## Current stack

- Node.js 24.18 LTS and npm 12.0.1
- Next.js 16.2 and React 19.2
- CodeMirror 6 as the single tablet/desktop coding editor
- TypeScript 6.0.3, the newest single compiler compatible with current Next.js tooling
- SQLite through `better-sqlite3`
- Zod 4 research, curriculum, request, and evidence contracts
- Vitest 4.1 and Biome 2.5
- Tailwind CSS 4 plus CSS modules

Versions and reviewed install scripts are recorded in `package.json`, `package-lock.json`, `.npmrc`, `.nvmrc`, and the container build. GitHub Actions and workflow files are intentionally absent; verification runs locally.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The current catalog shows an honest empty state while research and authoring remain blocked. Local learner state is stored in `database/learn-it-all.db` and excluded from version control.

For a production check:

```bash
npm run build
npm start
```

## Repository map

```text
content/v2/courses/                  Deny-by-default publication directory; currently empty
docs/research/                       Platform evidence, course dossiers, source inspections, decisions
docs/CURRICULUM_DESIGN_HANDBOOK.md   Pedagogy and evidence rules
docs/PLATFORM_REBUILD_SPEC.md        Product, safety, UI, editor, and release contract
docs/PROJECT_MEMORY.md               Dated repository-local handoff evidence
references/                          Pinned external objective and challenge evidence
scripts/                             Current research, runtime-index, and audit compilers
src/app/                             Public, learner, settings, and API routes
src/components/learning/             Accessible learning studio and workspaces
src/core/curriculum/                 Research schemas, curriculum contracts, loaders, and audits
src/core/learning/                   Grading, progress, persistence, runtimes, and simulators
```

## Required verification order

After code or curriculum changes, run:

```bash
npm test
npm run type-check
npm run lint
npm run lint:strict
npm run build
```

Then verify changed learner flows in real supported tablet and desktop browsers. Public information and the phone handoff must remain phone-usable. UI checks include keyboard operation, visible focus, announced status, logical landmarks and headings, reduced motion, forced colors, zoom/reflow, touch targets, console errors, overflow, persistence, and the real grading/runtime path.

Useful focused research and curriculum gates:

```bash
npm run curriculum:audit:research
npm run curriculum:audit:duplication
npm run curriculum:audit:learning-quality
npm run curriculum:research:rwd:check
```

Empty curriculum cannot pass the duplication or learning-quality release audits.

## Learner-code safety

- HTML/CSS/JavaScript previews run in sandboxed browser contexts.
- Python, Go, JavaScript, and SQL practice use bounded browser runtimes appropriate to the language.
- Shell, network, infrastructure, prompt, repository-quality, and configuration work use deterministic simulations.
- Canonical answers and changed-case grading remain server-side.
- Learner source never reaches host command execution.

Every runtime still requires its threat, resource, browser, accessibility, recovery, and transfer gates before a course may publish.

The planned C course has no live runtime contract. The removed PicoC path covered only an older language subset; C remains blocked until current C23, sanitizer, diagnostics, isolation, and browser-delivery research accepts one implementation.

The planned TypeScript course also has no live runtime contract. TypeScript 7.0 ships without a programmatic API, current Next.js tooling still requires one, and learner source cannot be sent to a host CLI. The application therefore uses one direct TypeScript 6.0.3 dependency. The course remains blocked until one current isolated browser or bounded-service design passes the runtime gates.

## Curriculum authoring rules

1. Research current primary specifications, official documentation, certification objectives, misconceptions, and authentic work before architecture or authoring.
2. Define entry skills, terminal competencies, prerequisites, scope boundaries, and valid mastery evidence.
3. Order modules and activities by prerequisite and cognitive load, not a source site's navigation.
4. Retrieve earlier skills before adding bounded complexity and keep prior correctness requirements active.
5. Cover explanation, prediction, modelling, guided practice, faded practice, debugging, retrieval, assessment, correction, delayed retention, and transfer.
6. Give workshops, labs, debugging, quizzes, and projects different scenarios, starters, reasoning, and evidence.
7. Require runnable behavior, changed cases, causal diagnosis, invariant checks, or defensible stakeholder evidence. Code shape alone is not mastery.
8. Keep all learner-facing prose, examples, code, assessments, projects, feedback, and solutions original.
9. Never publish generated inventory or a schema-valid outline as a finished course.

Read the [Curriculum Design Handbook](docs/CURRICULUM_DESIGN_HANDBOOK.md) and [Platform Rebuild Spec](docs/PLATFORM_REBUILD_SPEC.md) before changing course scope or architecture.

## Lighthouse hold

Do not run Lighthouse while any planned content, migration, duplication, editor, progress, navigation, review, or learner-pilot work remains. After every earlier release gate closes, run tablet and desktop profiles, exclude SEO, and require at least 99 for performance, accessibility, and best practices in both profiles.

```bash
npm run lighthouse:tablet
npm run lighthouse:desktop
```
