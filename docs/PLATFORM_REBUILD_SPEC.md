# LEARN-IT-ALL Platform Rebuild Contract

## Decision

This is a replacement architecture. The current pages and course files are migration input, not the target design. Legacy code is removed only after equivalent data and learner flows pass migration tests.

The 2026-07-15 learner review invalidated the earlier content-complete checkpoint. Generated activity counts, topic mappings, schemas, and duplication scores did not prove that the material actually taught a beginner. Every course is audit-required until its learner-facing explanations, practice progression, editor/runtime path, feedback, assessment validity, and transfer evidence pass the contracts in [the research-backed rebuild plan](./LEARNING_PLATFORM_RESEARCH_AND_REBUILD_PLAN.md).

## Verified Responsive Web Design baseline

Reference snapshot: freeCodeCamp `responsive-web-design-v9` at commit `c115efdd41f868d8850156f6a7a211219c35a847` (2026-07-13).

| Unit | Upstream count | LEARN-IT-ALL target |
| --- | ---: | ---: |
| Chapters | 4 | 4 or more |
| Modules | 29 | 29 mapped modules |
| Blocks | 158 | 158 mapped activities |
| Workshop blocks | 33 | 33 original guided builds |
| Workshop steps | 1,287 | At least 1,287 original code steps |
| Lecture challenges | 185 | At least 185 interactive theory steps |
| Independent labs | 34 | 34 original labs with multiple requirements |
| Reviews | 24 | 24 active-recall reviews |
| Module quizzes | 22 | 22 question banks with randomized attempts |
| Certification projects | 5 | 5 original, independently built projects |
| Certification exam | 1 | 1 broad, randomized exam |
| Total upstream challenges | 1,553 | At least 2,000 learner interactions before quizzes and exam |

The first 28-lesson RWD prototype covered topic headings but did not approach this depth. It is replaced by the mapped activity graph above.

## Learning loop

Every instructional module follows a deliberate progression:

1. **Orient** — objectives, prior knowledge, useful mental model, and a concrete outcome.
2. **Explain** — short theory interactions with executable examples and prediction checks.
3. **Model** — a guided build that explains why each small change matters.
4. **Fade** — later workshop steps provide less scaffolding and require recall.
5. **Practice** — a distinct lab uses a new scenario and no step-by-step recipe.
6. **Debug** — learners diagnose realistic broken code and explain evidence.
7. **Retrieve** — active-recall review mixes current and earlier concepts.
8. **Assess** — randomized quiz requires mastery and supplies answer explanations.
9. **Transfer** — projects combine several modules without copying workshop code.

At least 70% of estimated course time must involve building, debugging, predicting, arranging, inspecting, or answering. Passive reading cannot be the dominant activity.

## Cumulative sequence rule

Every lesson names prerequisite, introduced, reinforced, and assessed competencies. It must reuse prior skills correctly, add a bounded layer of new complexity, and check retained skills alongside new ones. The course compiler rejects prerequisite inversions, isolated lessons, unreinforced competencies, and summative assessment before guided, faded, and independent practice.

Competencies are tracked through introduce, guided practice, faded practice, delayed retrieval, assessment, and transfer states. Later projects continue enforcing earlier fundamentals; a new topic never creates permission to abandon semantics, accessibility, testing, security, or previously learned design and coding habits.

## Version 2 curriculum model

Content is stored as a graph of versioned course, module, activity, and step documents.

- A **course** owns outcomes, prerequisites, modules, credential rules, and release status.
- A **module** owns prerequisites and an ordered sequence of activity IDs.
- An **activity** is theory, workshop, lab, debug, review, project, quiz, or exam.
- A **step** is one learner interaction: read, code, predict, inspect, arrange, debug, answer, or reflect.
- A **check** is canonical grader input. Public activity APIs strip hidden answers and expected values.
- A **mastery record** stores attempts, hints, time, completion, and spaced-review due dates.

IDs are stable. Schema versions are explicit. Migrations are tested. Content loaders reject dangling prerequisites, duplicate IDs, missing checks, invalid order, and unsafe or incomplete grading rules.

## Interaction contract

Guided code steps must have:

- one specific observable change;
- a learner-facing reason, not only a command;
- one or more canonical checks;
- three progressive hints (concept, location, concrete syntax);
- a useful failure message based on observed output;
- keyboard-operable controls and announced results;
- autosaved files and resumable step position;
- cumulative final validation so deleting earlier work cannot pass completion.

Independent labs and projects must not reuse workshop starter code, wording, visual scenario, or requirement sequence. They expose user stories and acceptance tests, not a recipe.

## Universal inline workspace contract

Every activity that asks a learner to create, modify, inspect, debug, test, or defend an artifact opens that artifact inline. A code or build course cannot send the learner to a passive challenge card or require an unrelated local setup for its primary practice path.

Each course declares its workspace profile: supported files, editor language modes, preview or output surface, execution boundary, test/check adapter, resource limits, reset behavior, persistence contract, and named transfer boundary. The supported profiles include:

- sandboxed HTML/CSS/JavaScript preview with source, DOM, accessibility, responsive, and behavior checks;
- isolated browser workers for bounded Python, Go, C, SQL, and JavaScript practice;
- bounded TypeScript compilation and execution with deterministic diagnostics;
- deterministic stateful shell, Git, network, infrastructure, support, prompt, repository-quality, and configuration simulators that never execute learner text on the host;
- calculation, data, and mathematical workspaces with expression, table, graph, units, and changed-case evidence rather than a prose-only response box.

The workspace provides files or artifact sections, syntax support where appropriate, preview/output, diagnostics, tests, check results, progressive hints, reset and diff/review actions, autosave, resume, and an export path. It must preserve one coherent artifact across cumulative steps instead of replacing the learner's work with a new starter on every screen.

Desktop and supported tablet layouts use an enhanced inline editor with accessibility support, explicit ARIA labels, keyboard help, high-contrast support, and no keyboard trap. Monaco is the preferred desktop editor; tablet browsers receive Monaco only where supported and otherwise use the fully functional native editor. Phone course studios are intentionally unsupported and show an accessible handoff to continue on a tablet or computer. Public navigation and course information remain readable on phones.

## Quality gates

The curriculum audit fails CI when it finds:

- an unmapped required topic or reference block;
- a dangling course/module/activity/step/check reference;
- exact duplicate instructions, starters, solutions, question stems, or requirement sets;
- suspicious near-duplicate activities above the configured similarity threshold;
- a workshop with repeated placeholder steps or fewer checks than code steps;
- a lab that is merely a renamed workshop;
- missing theory, workshop, lab, review, quiz, project, or exam stages;
- prerequisite cycles or pedagogically invalid ordering;
- client-supplied answers used as canonical grading data;
- inaccessible interaction controls or layouts that fail supported viewports.

Application gates are unit, content-contract, migration, API integration, browser flow, type, lint, build, and Lighthouse tests. Lighthouse covers performance, accessibility, and best practices on mobile, tablet, and desktop; every score must be at least 99. SEO is intentionally excluded. Mobile validates public information, navigation, and the accessible phone handoff rather than an unsupported full course studio.

## Product experience

The rebuilt interface uses a responsive workspace instead of a collection of disconnected pages:

- a personalized dashboard with one clear resume action, due review, demonstrated competencies, unfinished builds, and recent evidence;
- a course map that shows prerequisites, mastery, projects, and estimated effort;
- a distraction-free learning workspace with instructions, editor, preview, tests, console, notes, and step navigation;
- a project gallery, evidence-backed mastery map, and brief optional celebrations that respect reduced-motion preferences;
- a productive tablet workspace and a full desktop workspace, plus a clear phone handoff;
- persistent skip links, landmarks, visible focus, screen-reader status messages, logical headings, large touch targets, and no color-only state.

Fun comes from rapid feedback, visible progress, varied challenges, creative builds, and learner choice—not from obstructive animation or arbitrary points.
