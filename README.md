# LEARN-IT-ALL

LEARN-IT-ALL is a local-first, practice-heavy learning platform. It teaches through prediction,
short theory, guided workshops, faded practice, debugging, independent labs, retrieval, authentic
projects, quizzes, and cumulative exams. Course order is prerequisite-driven and every mastery
claim must be backed by observable evidence.

## Current verified curriculum

As of 2026-07-14, the version 2 catalog contains:

- 54 published courses
- 1,135 cumulative modules
- 11,742 interactive activities
- 98,870 learner steps
- 108,370 checks

Generated counts are inventory, not proof of quality. The repository also enforces schema, graph
order, competency-stage coverage, compilation/runtime checks, safe execution boundaries, and exact
plus near-duplication audits. See [Project Memory](docs/PROJECT_MEMORY.md) for dated verification
evidence.

The old Markdown lesson and JSON exercise format has been retired. Old `/courses/...` bookmarks are
permanently mapped into equivalent version 2 theory, practice, or assessment activities. Legacy API
methods return `410 Gone` with a current learner URL and are never replayed. Existing legacy progress
records remain local history but do not silently grant mastery in the rebuilt curriculum.

## Stack

- Node.js 24.18 LTS and npm 12.0.1
- Next.js 16.2 and React 19.2
- strict TypeScript compatibility checking plus the native TypeScript 7 compiler path
- SQLite through `better-sqlite3`
- Zod 4 curriculum and request contracts
- Vitest 4.1 and Biome 2.5
- Tailwind CSS 4 for remaining utility-based game surfaces; CSS modules for the rebuilt learner UI

Versions are pinned by `package.json`, the lockfile, `.nvmrc`, containers, and CI-facing commands.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Learner state is stored in `database/learn-it-all.db` and is excluded
from version control.

For a production check:

```bash
npm run build
npm start
```

## Repository map

```text
blueprints/                         Observable competencies and course release contracts
content/v2/courses/<course-id>/     Canonical course, module, and activity graphs
docs/CURRICULUM_DESIGN_HANDBOOK.md  Pedagogy and evidence rules
docs/PLATFORM_REBUILD_SPEC.md        Product, safety, UI, and release contract
docs/PROJECT_MEMORY.md               Dated repository-local handoff evidence
scripts/                             Deterministic generators and audit commands
src/app/learn/                       Current learner routes
src/components/learning/             Interactive learning studio and workspaces
src/core/curriculum/                 Schemas, graph loading, validators, and duplication audit
src/core/learning/                   Grading, access, progress, runtimes, and simulators
```

Legacy curriculum pages are compatibility redirects only. Do not add content outside `content/v2`.

## Required verification order

Run gates in this order after code or curriculum changes:

```bash
npm test
npm run type-check
npm run lint
npm run lint:strict
npm run build
```

Then verify changed learner flows in a real browser at mobile, tablet, and desktop widths. Every UI
change must work with keyboard-only input, visible focus, screen-reader-friendly status, reduced
motion, 44-pixel targets, semantic headings and landmarks, and no horizontal overflow.

Useful focused curriculum audits:

```bash
npm run curriculum:audit:duplication
npm run curriculum:audit:go
npm run curriculum:content:rwd-all
```

The duplication audit checks normalized repeated scaffold text, structural layout diversity,
trigram-near activity copies, and renamed project copies.

## Learner-code safety

- HTML/CSS/JavaScript previews run in sandboxed browser contexts.
- Python runs in a fresh browser worker with source, output, and time limits.
- Go runs in isolated WebAssembly with an allowlisted standard-library surface.
- SQL runs in a fresh in-memory SQLite database.
- C runs in a disposable browser worker using the documented practice subset.
- Shell, network, infrastructure, prompt, and repository work use deterministic simulation.
- Learner source never reaches host command execution.

## Curriculum authoring rules

1. Start with entry skills, observable competencies, prerequisites, misconceptions, and mastery
   evidence.
2. Order modules and activities by prerequisite—not by a source site's presentation order.
3. Retrieve earlier skills before adding bounded complexity.
4. Cover introduce, guided, faded, retrieve, assess, and transfer stages.
5. Give workshops, labs, debugging, quizzes, and projects meaningfully different scenarios and
   evidence.
6. Require changed-case behavior, causal diagnosis, invariant checks, or defensible stakeholder
   proof. Code shape alone is not mastery.
7. Record official source version and review date for fast-changing technical content.
8. Keep all learner-facing prose, examples, assessments, and solutions original.
9. Do not publish until schema, order, coverage, duplication, accessibility, and learner-flow gates
   pass.

Read the [Curriculum Design Handbook](docs/CURRICULUM_DESIGN_HANDBOOK.md) and
[Platform Rebuild Spec](docs/PLATFORM_REBUILD_SPEC.md) before changing course scope or architecture.

## Lighthouse hold

Lighthouse is a final gate. Do not run it while planned course, migration, or duplication work
remains. After content completion, run mobile, tablet, and desktop profiles, exclude SEO, and require
at least 99 for performance, accessibility, and best practices.

```bash
npm run lighthouse:mobile
npm run lighthouse:tablet
npm run lighthouse:desktop
```
