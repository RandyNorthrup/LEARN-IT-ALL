# LEARN-IT-ALL Research-Backed Rebuild Plan

Reviewed: 2026-07-16

## Status and decision

LEARN-IT-ALL is not content-complete. The current repository contains the replacement platform contracts, research program, source evidence, isolated runtimes, and deny-by-default publication boundary. It contains no legacy course implementation, learner-content generator, blueprint system, compatibility route, guessed migration, alternate learner surface, or published course.

The [research inventory](research/course-inventory.json) retains the intended 54-course scope without pretending that course content exists: Responsive Web Design is `researching`, the other 53 courses are `pending`, and zero courses are approved or published. `content/v2/courses` contains no course JSON. Lighthouse remains paused until the entire curriculum, duplication, platform, review, and learner-flow program is complete.

Current scripts have only bounded infrastructure jobs: inspect pinned primary-source evidence, compile reviewed research models, audit reviewed evidence and course source, package independently reviewed course source into the runtime index, synchronize pinned browser-runtime assets, and enforce the held final Lighthouse gate. None authors learner-facing explanations, examples, steps, checks, assessments, or projects. The runtime compiler writes only its runtime database outside course source and is tested to reject a course-source output path.

Publication is deny-by-default through one explicit manifest containing zero courses. Home, catalog, paths, settings, both learner routes, the tracks API, and all course attempt/draft/hint APIs reject unpublished IDs. The learner UI shows an honest navigable empty state with no planned cards, fake hours, fake activity totals, or unusable filters. Git history is the only archive for prior implementation; nothing from it is copied, aliased, regenerated, or executed. Historical learner records remain preserved exactly in one neutral evidence table because learner-owned evidence is data, not implementation.

The objective is not to clone another platform. It is to combine the strongest verified patterns with original instruction, authentic practice, reliable assessment, accessible interaction, safe execution, and transparent evidence of mastery.

## Research-backed goal contract

Research is part of the rebuild goal and its definition of done, not a preliminary reading task. The platform must compete on demonstrated learner outcomes, so implementation proceeds through an evidence chain: frame a falsifiable question; inspect current authoritative and comparative evidence; record bounded claims, limitations, and freshness; translate accepted findings into named scope, sequence, interaction, assessment, accessibility, runtime, data, or maintenance decisions; test those decisions with representative learners; repair the resulting defects; and retain re-test evidence.

The goal therefore includes all of the following blocking research outcomes:

- current learning-science and institutional-course-quality synthesis that controls progression, feedback, practice, assessment, support, and review;
- a current primary-source subject dossier, objective inventory, prerequisite graph, misconception map, authentic-task analysis, safety boundary, tool/version record, and maintenance trigger for every course;
- direct task-level research across strong learning platforms, followed by LEARN-IT-ALL usability and accessibility observation instead of feature copying;
- assessment-validity research for every progress, mastery, retention, project-readiness, credential, feedback, retry, and gamification claim;
- editor, runtime, isolation, privacy, security, dependency, browser, assistive-technology, and stack-compatibility research before platform choices are accepted;
- representative novice, intermediate, advanced, disabled, keyboard-only, tablet, and phone-handoff learner studies with severity-rated findings and re-tests;
- formal subject-matter, instructional-design, assessment, accessibility, safety/privacy, and observed-learner approval before publication.

Research artifacts remain explicitly `researching`, `candidate-review`, or `planned-not-authored` until their own evidence closes. Topic counts, step counts, links, passing schemas, and one successful walkthrough cannot advance those states.

## Complete user requirement register

This plan is incomplete if it omits any item below:

- total platform and curriculum replacement, not cosmetic improvements to legacy layouts;
- no obsolete generated course output, compatibility aliases, API tombstones, guessed mappings, parallel practice surfaces, arbitrary point/streak UI, or generators that can recreate unapproved instruction;
- deny-by-default publication at every learner page and course API; file existence, generated quantity, old status fields, and direct URLs cannot publish a course;
- a blocking, documented research program covering learning science, subject scope, assessment validity, accessibility, usability, safe execution, privacy, stack compatibility, competing learner experiences, and observed learner behavior before and during implementation;
- latest mutually compatible stable stack followed by repair of every upgrade regression;
- completeness and prerequisite-order verification for every course and competency;
- explicit beginner-through-independent teaching with no skipped fundamentals;
- cumulative lessons that retrieve and continue enforcing earlier skills;
- original theory, prediction, worked examples, workshops, faded practice, debugging, labs, reviews, quizzes, real-world projects, exams, and corrective retries;
- meaningful practice variety and catalog-wide exact/semantic duplication removal;
- current freeCodeCamp Responsive Web Design v9 breadth and practice depth with thousands of meaningful original interactions, beginning with actually learning HTML;
- beginner, intermediate, and advanced applied mathematics;
- current 2026 Claude/Codex prompt engineering, agent loops and persistent goals, skills and MCP servers, and repository quality-gate courses;
- repository setup practice covering style, formatting, lint, types, constants/literals, dead code, sanitizers, testing, security, dependencies, supply chain, and maintainability;
- real inline editors or structured artifact workspaces for every build-capable course, with safe runtimes/simulators, feedback, hints, persistence, and real checks;
- a modern, fun, highly interactive build-to-learn experience where gamification supports demonstrated learning rather than fake points;
- real production data and persisted learner evidence only—no mock metrics, pretend recommendations, fake rooms, dead cards, or placeholder records;
- cohesive learner-facing navigation and instructions with no repository architecture, implementation-decision, or internal engineering copy;
- meaningful progress based on completion, competency mastery, delayed retention, transfer, project readiness, attempts, hints, and corrective recovery;
- accessible tablet and desktop course studios, an accessible phone handoff, and phone-usable public information/navigation;
- isolated learner execution: sandboxed web output, bounded workers, deterministic simulators, no learner source executed on the host, and server-held canonical answers;
- no GitHub Actions workflows or push-triggered runners; verification remains explicit and local;
- tests updated with every code, schema, compiler, content-contract, migration, and behavior change;
- Lighthouse held until the entire content/platform/migration/pilot program is complete, followed by tablet and desktop profiles, no SEO, and scores of at least 99 for performance, accessibility, and best practices in both profiles;
- verified milestone commits and pushes with current project-memory handoffs, next work, and blockers.

## Research method

Use this evidence order:

1. consensus reports, government practice guides, systematic reviews, and peer-reviewed research;
2. recognized online-course quality and computing curriculum frameworks;
3. primary technical specifications and official vendor/project documentation;
4. direct inspection of current leading learning platforms and their official product documentation;
5. learner observation and platform outcome data.

Platform features are patterns to test, not proof that a feature improves learning. Research establishes design hypotheses; learner evidence decides whether the implementation works here.

Research is not a finished discovery task or a one-time bibliography. It is a blocking workstream that runs before architecture, before each course rebuild, during vertical-slice testing, and again before approval. A course or feature cannot move from `planned` to `researched` because it has links; it must show how current evidence changed scope, sequence, teaching, interaction, assessment, safety, accessibility, or maintenance decisions.

### Required research tracks

1. **Learning science and instructional design:** retrieval, spacing, interleaving, worked examples, scaffolding and fading, feedback, misconception repair, cognitive load, motivation, learner agency, project-based learning, deliberate practice, transfer, and accessibility-informed Universal Design for Learning.
2. **Course-quality and institutional review:** objective-assessment-activity alignment, measurable outcomes, workload, learner support, navigation, technology choice, materials, accessibility, academic integrity, rubric quality, continuous improvement, and review evidence.
3. **Subject-matter scope for every course:** current specifications, standards, certification objectives, official manuals, language and library releases, security guidance, professional practices, known misconceptions, authentic tasks, deprecations, disputed practices, scope boundaries, and prerequisite knowledge.
4. **Responsive Web Design certification coverage:** a versioned topic-and-practice map against the current freeCodeCamp v9 curriculum plus WHATWG, W3C, MDN, web.dev, CSS Working Group, and WCAG sources. The map must distinguish external coverage requirements from original LEARN-IT-ALL instruction and assessment.
5. **Competitive learner-experience research:** direct task-level inspection of onboarding, diagnostics, course maps, inline editors, feedback, hints, review, progress, projects, credentials, accessibility, recovery, and pricing/lock boundaries across leading platforms. Features become hypotheses, never requirements copied by popularity.
6. **Editor and runtime research:** CodeMirror 6 accessibility and tablet/desktop browser support, language services, sandboxing, worker isolation, compiler/interpreter limits, dependency policy, deterministic simulation, output termination, state recovery, and transfer to authentic toolchains.
7. **Assessment and progress validity:** what each metric claims, the evidence needed to support it, changed-case and delayed checks, rubric reliability, false-positive and false-negative review, answer security, retry effects, learner explanations, and how mastery may decay or recover.
8. **Information architecture and usability:** learner mental models, labels, wayfinding, prerequisite visibility, resume behavior, error recovery, help, cognitive walkthroughs, screen-reader and keyboard paths, tablet ergonomics, phone handoff, and comprehension of all progress claims.
9. **Safety, security, privacy, and ethics:** learner-code isolation, content security, canonical-answer protection, resource bounds, data minimization, consent, retention, accessibility, authorized practice, AI limitations, model/provider changes, supply-chain risk, and threat modeling.
10. **Stack and compatibility:** current stable releases, support windows, peer constraints, migration notes, browser support, known regressions, security advisories, reproducible install/build/runtime smokes, and a tested rollback or replacement decision for every major dependency.
11. **Observed learner research:** representative novice, intermediate, advanced, disabled, keyboard-only, and tablet learners completing real tasks. Record expectations, breakdowns, misconceptions, hints used, recovery, time-on-task, comprehension, transfer, and qualitative feedback without inventing analytics.

### Research deliverables and evidence rules

Before implementation, maintain these reviewable artifacts:

- a platform research register with question, source type, exact URL or publication identifier, version/date, access/review date, claim, limitations, decision, owner, and next-review trigger;
- one subject research dossier per course with intended learner, entry competence, terminal performance, authoritative scope, exclusions, vocabulary, misconceptions, authentic tasks, tool versions, safety boundaries, and source-backed maintenance schedule;
- a coverage matrix mapping every external objective to original competencies, teaching encounters, practice progression, assessment evidence, projects, and transfer tasks;
- an instructional alignment matrix mapping each competency through introduce, model, guided, faded, retrieve, assess, delayed retain, and transfer stages;
- a competitive task audit with captured learner journeys and accessibility/usability observations, not marketing-feature lists;
- architecture decision records for editor, runtime, progress, navigation, data, privacy, and dependency choices, including rejected options and evidence;
- research-to-design notes that name the exact platform, schema, activity, or review gate changed by each accepted finding;
- pilot protocols, consent/data-minimization rules, observation notes, severity-rated findings, repairs, and re-test evidence.

Sources must be primary and current wherever the claim can change. Peer-reviewed synthesis and recognized frameworks support learning claims; official standards and vendor/project documentation support technical claims; direct inspection supports product-behavior claims. Search snippets, affiliate summaries, copied course content, unsourced AI output, popularity, and file counts are not evidence. Conflicting or weak evidence is recorded with uncertainty and tested rather than silently resolved.

### Research gates

- No candidate course architecture is accepted or used for learner-facing migration or bulk authoring without its reviewed subject dossier, objective coverage map, prerequisite evidence, and required reviewers. Candidate structures may be compiled only as explicit `researching` review artifacts that cannot publish content.
- No learner-facing explanation, example, assessment, or project is approved solely because it matches an external topic list.
- No interaction or gamification mechanic ships without a named learning purpose, an accessibility path, a failure hypothesis, and learner-observation evidence.
- No progress value ships unless research and validation support the learner-facing claim it makes.
- No runtime or simulator ships without threat, isolation, resource, accessibility, failure, and authentic-transfer research.
- No dependency upgrade is accepted from a version number alone; official compatibility evidence and repository smokes must pass together.
- No course becomes `approved` or `published` until subject-matter, instructional-design, assessment, accessibility, safety, and observed-learner reviewers close critical findings.
- Fast-changing technical and AI claims are reverified immediately before their course wave and again before release.

### Research-program implementation evidence — 2026-07-15

Research now has typed, tested repository contracts rather than only prose. `docs/research/platform-research-register.json` records 11 open or decided platform research questions, bounded claims, limitations, decisions, affected artifacts, validation needs, and re-review triggers. `src/core/curriculum/research.ts` validates platform registers and course dossiers, rejects broken source/decision references, and prevents an `approved` dossier from retaining missing objective coverage, open questions, or incomplete reviews.

The rejected generated inventory lacked stable source identity, evidence limitations, research-to-design decision links, review triggers, and complete objective traceability. It has been deleted rather than retained as a baseline contract. The current [course research inventory](research/course-inventory.json) is the sole 54-course scope record: Responsive Web Design has the first started dossier and remains `researching`; 53 dossiers are missing and zero courses are `researched` or approved.

The first platform evidence wave now records 20 bounded sources and 15 traceable decisions. The [competitive task audit](research/COMPETITIVE_TASK_AUDIT_2026-07-15.md) separates official documentation from direct observation and learner validation; the [editor/runtime threat model](research/EDITOR_RUNTIME_THREAT_MODEL_2026-07-15.md) defines assets, trust boundaries, capability policies, adversarial tests, accessibility, recovery, and residual risk; the [stack matrix](research/STACK_COMPATIBILITY_MATRIX_2026-07-15.md) records current versions, the repaired Puppeteer peer conflict, command evidence, and remaining clean-install/browser gates; the [progress and navigation contract](research/PROGRESS_NAVIGATION_EVIDENCE_CONTRACT.md) prevents activity counts or fake metrics from masquerading as mastery; and the [learner pilot protocol](research/LEARNER_RESEARCH_AND_PILOT_PROTOCOL.md) defines consent, participant coverage, tasks, severity, pass rules, repair, and re-test evidence.

These artifacts record decisions, not completion. Competitive hands-on observations, platform comprehension pilots, supported-device and assistive-technology trials, privacy review, clean cross-platform installs, and 53 course dossiers remain open. No course architecture or feature-wide scaling may bypass those gates.

Responsive Web Design has a pinned [158-block and 1,553-challenge primary-source snapshot](../references/freecodecamp-rwd-v9.json), including exact objective IDs, challenge order, source paths, hashes, byte counts, section names, hint-check counts, quiz-question counts, and code-language evidence. The [candidate concept alignment](research/courses/responsive-web-design-concept-alignment.json) derives directly from that snapshot; it does not depend on a generated course blueprint or approve learner content. A direct [beginner entry-sequence inspection](research/courses/responsive-web-design-beginner-sequence.md) reviewed all 61 units in the first seven v9 blocks. It confirmed that meaningful HTML construction belongs at the start and exposed a conflict in the rejected generated architecture: 13 tooling activities preceded the first HTML activity. The rebuild will integrate tooling just in time around the first artifact and prototype the opening flow before scaling. The formerly reported 64-unit total was incorrect and was replaced with the exact 61-source-file count.

The first concept-level [HTML research graph](research/courses/responsive-web-design-html-concepts.json) now defines 83 ordered concepts across nine proposed modules. Source-file inspection found that the earlier graph had collapsed or omitted 12 beginner tooling competencies explicitly present in v9; complete Basic HTML inspection exposed replaced-content and media-rights models; complete Semantic HTML inspection separated dates, abbreviations, contact context, code and preformatted text, subscript and superscript, editorial annotations, and ruby annotations; complete Forms and Tables inspection separated control-state/submission behavior and table-cell spans; and complete Survey plus HTML Accessibility inspection exposed four missing accessibility models: people, barriers, and access strategies; accessible names versus descriptions; accessibility-tree inclusion; and complementary evaluation evidence with automation limits. Every added model has its own objective, prerequisites, misconceptions, changed-case evidence, and retention requirements. The emphasis model also distinguishes `em`, `strong`, `i`, and `b` from CSS-only presentation. Current WHATWG, MDN, WCAG, WAI tutorials, WAI-ARIA 1.2, ARIA APG, WAI user and evaluation guidance, CISA, U.S. Copyright Office, and Creative Commons evidence bounds these concepts. This prevents one disability from being reduced to one tool, `aria-label` from being treated as harmless decoration, `aria-hidden` from being taught without focus and meaning consequences, or zero automated findings from being reported as accessibility proof. Legal instruction stays evidence-oriented and avoids claiming that educational, noncommercial, credited, or transformative use automatically establishes fair use. The target still begins with HTML: `web-tooling-just-in-time` follows the first meaningful edit instead of recreating the legacy 13-activity pre-HTML barrier. Every concept remains `researched-not-authored`; the graph remains `researching`.

The companion [CSS and responsive-design research graph](research/courses/responsive-web-design-css-concepts.json) now defines 103 ordered concepts across CSS language and cascade, boxes and intrinsic sizing, typography/color/design, flex layout, grid/positioning, responsive systems, interaction/accessibility/motion, and independent transfer. Unregistered custom-property substitution is separated from registered `@property` behavior, and Grid item/self alignment is separated from Flex alignment, Grid content distribution, and subgrid. Beyond the previously separated design and interface contracts, typography distinguishes face selection and synthesis, licensed source delivery and failure, fallback metrics and stability, variable axes and language-aware features, inline line boxes, language-aware text processing, and decoration paint. Positioning separates flow participation, containing blocks, sticky scrollports, fixed reference rectangles, local stacking contexts, float wrapping and `flow-root`, and support-bounded anchor placement with overflow fallbacks. Current primary research includes CSS Snapshot 2026, Syntax, Selectors, Cascade, Custom Properties, Properties and Values API, Display, Box Model 4, Sizing 3, CSS 2.2 formatting, floats, and paint order, Grid 2, Box Alignment 3, current browser CSS inspection, the bounded W3C validator, Positioned Layout 3, Anchor Positioning 1, Overflow 3, Transforms 1, Filter Effects 1, Flexbox 1, Fonts 4, Font Loading 3, Text 4, Text Decoration 4, Inline 3, WOFF2, Media Queries 5, Backgrounds, Values and Units, Color Levels 4 and 5, Images Level 4, Color Adjustment, CSS UI Level 4, CSS Form Control Styling as a freshness watch, the HTML form contracts, WCAG, ARIA APG, WAI ACT and evaluation guidance, WAI multi-page forms, W3C COGA, FDA label guidance, GOV.UK research and pagination, MDN progressive enhancement, and current official handoff-tool evidence. Accepted decisions correct benchmark shortcuts, require complete behavior contracts, and reject stale vendor trivia. The graph replaces device-name, appearance, color-string, unit-suffix, fixed-box, visual-effect, physical-axis, named-font consistency, tiny fixed text, external-font copy/paste, global-z-index, sticky-becomes-fixed, declaration-recipe, fallback-slogan, layout-slogan, and random-toggle debugging with explicit reference frames, sizing and margin models, overflow behavior, track and placement traces, alignment subjects, coordinate and filter pipelines, native-first controls, flex free-space reasoning, accessible source order, computed custom-property behavior, rendered-face and font-failure evidence, language-aware typography, fluid defaults, causal diagnosis, recovery, changed cases, and cumulative accessibility checks.

The compiled and tested [v9-to-concept candidate alignment](research/courses/responsive-web-design-concept-alignment.json) preserves all 158 pinned source blocks and all 1,553 exact challenge identities without assigning guessed coverage. Its source snapshot captures 6,431,329 bytes across the exact pinned files plus paths, SHA-256 hashes, section inventories, 5,163 executable hint checks, and 1,365 question prompts. All previously inspected blocks remain exact. The complete [CSS Grid inspection](research/courses/responsive-web-design-css-grid-inspection.md) adds six blocks, 91 challenges, 67 prompts, and 284 checks. It adds Grid-specific alignment, corrects `fr`, percentage-gap, explicit/implicit, `minmax()`, negative-line, auto-fit/fill, source-order, validator, device-emulation, and debugging claims; rejects the copied 79-step platform magazine, inaccessible icon strip, justified-text requirement, fixed breakpoint patches, overprescribed newspaper, and recall-only debugging as target instruction; and requires track and placement traces, computed/geometry evidence, alignment subjects, intrinsic responsiveness, source-order defense, causal diagnosis, correction, delayed retrieval, and transfer. The complete [Product Landing Page lab inspection](research/courses/responsive-web-design-product-landing-page-lab-inspection.md) adds one challenge, 15 stories, and 25 checks; removes the unrelated five-Grid-concept bundle plus false breakpoint, navigation-disclosure, test-matrix, and independent-transfer credit; rejects placeholder-only labeling, the third-party mock action, unexecuted navigation and form behavior, unlabelled media, one-coordinate fixed-header proof, token-only Flex/media evidence, copied claims, and dead controls; and requires sourced real content, a complete document, real isolated form processing, usable media, navigation activation, focus and target visibility, Flex geometry, content-derived adaptation, correction, and delayed transfer. The complete [CSS Animations inspection](research/courses/responsive-web-design-css-animations-inspection.md) adds seven blocks, 139 challenges, 46 prompts, and 451 checks; upgrades transitions, animations, easing, motion-accessibility, and runtime-performance evidence; removes false DevTools-debugging and changed-case credits; rejects the 29-step coordinate wheel, exact orbit recipe, 104-step Penguin trace, infinite motion without control or reduced mode, global almost-zero-duration override, misleading pointer-only div, and explicitly fake/malformed portfolio; and requires motion purpose, timing-state prediction, controls, preference equivalence, flash/timing safety, runtime traces, correction, authentic portfolio evidence, and delayed transfer. The final [CSS review and exam inspection](research/courses/responsive-web-design-css-review-exam-inspection.md) audits the 59,198-byte zero-question answer sheet and the 296-byte external-exam pointer; replaces rereading with retrieve-first interleaved correction; records current IES retrieval/spacing and recognized testing/evidence-centered-design standards; and keeps the unavailable exam item bank at zero concepts with a hard validity blocker. Challenge-level source inspection now covers all 158 blocks, all 1,553 challenges, all 1,365 prompts, and all 5,163 checks. One hundred fifty-seven blocks have bounded candidate maps; zero blocks remain `unmapped-source`; the exam remains one inspected `assessment-container` with no item-level credit. Seven concepts remain explicitly unresolved. Seven concepts lacking enough pinned-v9 evidence remain explicit modern extensions. No broad, proportional, guessed, module-substitution, or compatibility mapping exists. Every record remains `candidate-review`; independent subject and instructional reviews, original full evidence progression, assessment authoring and validation, runtime evidence, accessibility verification, duplication review, learner pilots, and observed retention/transfer remain blocking.

The compiled and tested [candidate research architecture](research/courses/responsive-web-design-course-architecture.json) translates verified candidate mappings into 38 learner-sized candidate modules—16 HTML/tooling and 22 CSS/design/responsive—rather than copying the benchmark's 29-module navigation or retaining the overloaded 17-module macro-sequence. It opens with `html-first-content`, requires a meaningful source edit by learner action two, teaches headings, paragraphs, and lists in the first cumulative artifact, then introduces source repair and two just-in-time tooling modules before complete documents and loading. No module owns more than ten new concepts. It assigns every one of the 186 target concepts exactly once, maps 157 bounded source objectives into modules, and retains only the exam container as one explicit non-specific identity. Its five project briefs trace to the five actual certification-project benchmarks—Survey Form, Tribute Page, Technical Documentation Page, Product Landing Page, and Personal Portfolio—using original mutual-aid, local-history, emergency-information, community-energy, and professional-evidence scenarios.

The [blocking architecture, order, reinforcement, and duplication audit](research/courses/responsive-web-design-architecture-audit.md) records both the detected failures and the structural repair. The abstract HTML opening and overloaded CSS buckets are replaced. The disconnected 217 `retainedInModuleIds` defaults tied to macro-module IDs are removed from schema, compilers, and artifacts instead of being aliased. The repaired modules contain 133 candidate prerequisite-retrieval edges covering 75 concepts. Exact concept-title and objective duplication is zero, and three lexical-neighbor pairs are intentional mechanism-specific distinctions, but learner-content duplication remains untestable because no learner content exists. All modules and projects remain `planned-not-authored`; the architecture remains `researching` and cannot drive scaled authoring until every activity family is decomposed to original step evidence and independent reviews close.

The machine-checkable [RWD activity matrix](research/courses/responsive-web-design-activity-matrix.json) now gives all 38 modules explicit model/prediction, guided workshop, faded build, debugging clinic, independent lab, retrieval/correction review, and quiz or performance-check families. Its 266 planned activity families contain unique IDs and scenario domains, name both new and earlier retrieval concepts, and record minimums of 376 theory interactions, 1,488 workshop steps, 38 independent labs, 38 reviews, 24 quiz banks, and 3,854 interactions before assessment. These exceed source-depth inventory floors but remain planning evidence only: there are still zero authored learner activities or steps. Every family still needs original step-level objectives, checks, hints, feedback, corrective branches, delayed scheduling, semantic-duplication review, runtime/accessibility verification, independent review, and observed learner evidence.

The first detailed decomposition is recorded in the [HTML first-content step design](research/courses/responsive-web-design-html-first-content-step-design.json). It expands all seven families in `html-first-content` into 203 explicit planned interactions: 18 worked-model interactions, a 72-step transit workshop, a 27-step faded library build, an 18-step storm debugging clinic, a 27-step independent market lab, a 14-item retrieval/correction review, and a 27-item performance-check bank. Every interaction names a learner action, concept evidence, artifact change, observable behavior, feedback target, correction route, layout, and support boundary; 97 require a changed case, and scored assessment interactions expose no hints.

The [HTML source-syntax and repair step design](research/courses/responsive-web-design-html-source-syntax-and-repair-step-design.json) adds another 140 explicit interactions: 12 model, 48 workshop, 18 faded, 12 debug, 18 lab, 14 review, and 18 assessment. It teaches tag/element/node distinctions, void syntax, attribute grammar and value contracts, comments, character references, and browser recovery while requiring direct retrieval of element anatomy, tree relationships, and content models in every evidence role. Ninety-two interactions contain changed cases.

The [local-project tooling step design](research/courses/responsive-web-design-tooling-local-projects-step-design.json) adds 161 explicit interactions: 14 model, 56 workshop, 21 faded, 14 debug, 21 lab, 14 review, and 21 assessment. It introduces local resource evidence, accessible input parity, developer-tool roles and transfer limits, reversible bounded file operations, portable file identity, project-root and path invariants, and content-based search and inspection only after the learner already owns working HTML. One hundred thirty-three interactions require changed consequences.

The [browser and research step design](research/courses/responsive-web-design-tooling-web-browser-research-step-design.json) adds 116 explicit interactions: 10 model, 40 workshop, 15 faded, 10 debug, 15 lab, 11 review, and 15 assessment. It introduces device-to-request connectivity layers, fictional credential-free account safety, official browser installation and update evidence, browser-brand versus rendering-engine coverage, direct navigation versus search intermediaries, and query/source/authority/freshness/version/test/uncertainty traces only when the learner needs external evidence for the existing project. Ninety-six interactions require changed traces.

The [complete-document, paths, and loading step design](research/courses/responsive-web-design-html-documents-paths-and-loading-step-design.json) adds 231 explicit interactions: 20 model, 80 workshop, 30 faded, 20 debug, 30 lab, 21 delayed retrieval/correction review, and 30 no-hint assessment. It teaches standards mode and complete document envelopes, accurate language scopes, UTF-8 byte-to-copy verification, useful titles, truthful consumer-specific discovery metadata, accessible viewport configuration, portable document and public URL resolution, request-to-interaction browser pipelines, and claim-specific current-authority verification. Attribute grammar, parser recovery, project organization, and query refinement remain primary assessed evidence in every role. Two hundred seven interactions require changed cases.

The [links and navigation step design](research/courses/responsive-web-design-html-links-and-navigation-step-design.json) adds 52 explicit interactions: 4 model, 16 workshop, 6 faded, 4 debug, 6 lab, 8 delayed retrieval/correction review, and 8 no-hint assessment. It separates anchors from genuine `href`-bearing hyperlinks, resolves local, public, query, fragment, email, telephone, file, and bounded download destinations, tests keyboard and pointer activation without external side effects, audits purpose in valid programmatic context and links-only output, and verifies fragment URL state, unique target identity, heading context, visibility, focus state, and keyboard continuation as separate evidence. All 52 interactions require changed cases.

The [images, graphics, and rights step design](research/courses/responsive-web-design-html-images-graphics-and-rights-step-design.json) adds 140 explicit interactions: 12 model, 48 workshop, 18 faded, 12 debug, 18 lab, 14 delayed retrieval/correction review, and 18 no-hint assessment. It separates externally replaced resource content from document children and page-controlled boxes, classifies image alternatives by contextual purpose, distinguishes intrinsic pixels and ratio hints from rendered dimensions and loading evidence, keeps figure captions separate from alternatives and source credits, requires exact ownership/permission/license/attribution/adaptation/commercial/share-alike evidence, refuses or escalates uncertain rights claims, and chooses SVG embedding from purpose, ownership, styling, caching, interaction, security, fallback, and accessibility boundaries. One hundred thirty-four interactions require changed cases. Together the first seven designs cover 49 of 266 families and 1,043 planned interactions with 811 changed cases. They are reviewable planning structure, not learner-facing copy, media fixtures, simulator implementation, executable checks, canonical answers, legal advice, or authored publication. The other 217 activity families remain undecomposed.

The [competency evidence matrix](research/courses/responsive-web-design-competency-evidence-matrix.json) traces all 186 concepts through introduce/model, guided, faded, debug, independent transfer, familiar assessment, next relevant use, delayed retrieval, correction, parallel reassessment, and certification-strand references. Due points are adaptive scheduling seeds, not claims of one optimal interval. The original [certification assessment blueprint](research/courses/responsive-web-design-assessment-blueprint.json) covers every repaired module and concept in 12 weighted strands and plans 50 balanced items per secure form across prediction, code/tree reading, causal debugging, changed cases, accessibility/design evidence, bounded repair, and defense. It requires at least three parallel forms, server-side canonical answers, five passing projects, correction before a different form, accessibility/security review, item analysis, and defensible standard setting. It sets no cut score and keeps credential issuance blocked because no items, forms, pilot data, scoring evidence, or standard-setting result exists.

## Findings translated into product rules

### Learning science and course quality

| Evidence                                                                                                                                                                    | Relevant finding                                                                                                                                        | LEARN-IT-ALL rule                                                                                                                                                                        |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [US Institute of Education Sciences practice guide](https://ies.ed.gov/ncee/wwc/PracticeGuide/1)                                                                            | Space learning, interleave worked examples and problems, retrieve through quizzing, and ask deep explanatory questions.                                 | Every competency receives modelled, guided, faded, independent, delayed-retrieval, and transfer encounters.                                                                              |
| [National Academies, How People Learn II](https://nap.nationalacademies.org/read/24783/chapter/10)                                                                          | Technology is useful when fitted to the learning need; it can scaffold real-world problem solving, feedback, reflection, and revision.                  | No interaction exists only for novelty. Every editor, simulation, game, and visualization names the learning job it performs.                                                            |
| [Carnegie Mellon Open Learning Initiative](https://oli.cmu.edu/students/learn-how-oli-helps-students/)                                                                      | Clear objectives, frequent interactive practice, immediate targeted feedback, and misconception-aware correction support learning.                      | Objectives, instruction, checks, feedback, and remediation map to the same competency and performance level.                                                                             |
| [OLI practice pages](https://oli.cmu.edu/faq-items/practice-pages/)                                                                                                         | Low-stakes practice and feedback should precede graded assessment.                                                                                      | Learners can try, inspect feedback, revise, and retry before summative evidence is recorded.                                                                                             |
| [CAST UDL Guidelines 3.0](https://udlguidelines.cast.org/more/downloads/)                                                                                                   | Reduce barriers through multiple means of engagement, representation, and action/expression.                                                            | Equivalent text, visual, interactive, and keyboard-operable paths are planned with the content, not added at release.                                                                    |
| [Quality Matters Higher Education Rubric](https://www.qualitymatters.org/qa-resources/rubric-standards/higher-ed-rubric)                                                    | Objectives, assessment, materials, activities, interaction, technology, support, accessibility, and usability must align.                               | A course fails release if any one of these components is present only as inventory or is misaligned.                                                                                     |
| [SUNY OSCQR](https://oscqr.suny.edu/about/about-oscqr/)                                                                                                                     | Online courses need predictable navigation, clear expectations, measurable objectives, self-assessment, support, accessibility, and systematic refresh. | Course orientation, module maps, help, feedback, review dates, and learner feedback channels are release requirements.                                                                   |
| [ACM/IEEE-CS/AAAI CS2023](https://csed.acm.org/)                                                                                                                            | Computing curriculum should be competency-led, current, coherent, and broader than topic lists.                                                         | Courses map knowledge, skills, professional dispositions, authentic tasks, constraints, and evidence—not headings alone.                                                                 |
| [Raspberry Pi computing pedagogy](https://www.raspberrypi.org/teach/pedagogy) and [PRIMM](https://training-hub.raspberrypi.org/en/courses/using-primm-to-teach-programming) | Novices benefit from reading and discussing code, then predicting, running, investigating, modifying, and making.                                       | Beginner code lessons move from a small intelligible example to modification and independent creation; they do not begin with a large unexplained artifact.                              |
| [Faded Parsons Problems research](https://dl.acm.org/doi/fullHtml/10.1145/3411764.3445228)                                                                                  | Rearranging and progressively completing code can scaffold pattern learning.                                                                            | Arrange and completion tasks are used selectively as a bridge to writing, never as the terminal evidence.                                                                                |
| [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/)                                                                                                                               | Every supported responsive variation must conform; status, focus, target size, reflow, input, and semantics are testable requirements.                  | Every changed learner flow is verified at tablet and desktop with keyboard, status, reflow, contrast, motion, and semantic checks; the phone handoff and public pages remain accessible. |

### Competitive benchmark

| Platform/source                                                                                                                                             | Pattern worth adopting                                                                                                                | Limitation LEARN-IT-ALL must address                                                                                                                                                       |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [freeCodeCamp Responsive Web Design v9](https://www.freecodecamp.org/learn/responsive-web-design-v9/) and its pinned open-source curriculum snapshot        | Very small cumulative coding steps, workshops, labs, reviews, quizzes, and certification projects.                                    | Matching names or counts is not enough. Explanations, scenarios, code, checks, feedback, and projects must be original and stronger than token checks.                                     |
| [MDN Curriculum](https://developer.mozilla.org/en-US/curriculum/) and [MDN Learn Core](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core) | Standards-based beginner outcomes, strong fundamentals, accessibility, browser knowledge, gentle density, tests, and challenges.      | MDN's curriculum is a scope guide, not a complete interactive course; LEARN-IT-ALL must teach and assess every outcome.                                                                    |
| [The Odin Project](https://www.theodinproject.com/about)                                                                                                    | A visible roadmap and strategically placed portfolio projects emphasize learning by building.                                         | Projects need platform-integrated formative checks, accessibility review, and bounded feedback without reducing independence.                                                              |
| [Exercism Learning Mode](https://exercism.org/docs/building/product/unlocking-exercises)                                                                    | Prerequisite learning exercises unlock broader practice; mentoring and alternative practice modes support agency.                     | Unlocking must be based on demonstrated prerequisites and offer corrective routes, not merely completion.                                                                                  |
| [CodeCrafters](https://app.codecrafters.io/concepts/overview)                                                                                               | Real systems are built in stages against tests and official specifications.                                                           | Beginner courses need more explicit conceptual models and faded guidance before test-driven independence.                                                                                  |
| [Codecademy Paths](https://help.codecademy.com/hc/en-us/articles/220453248-Picking-Your-Learning-Path) and [projects](https://www.codecademy.com/projects)  | Clear milestones combine lessons, quizzes, guided practice, and increasingly independent real-world projects.                         | Progress must expose actual competency evidence rather than subscription, completion, or activity totals.                                                                                  |
| [Khan Academy mastery challenges](https://www.khanacademy.org/resources/teacher-essentials/product-tour-videos/a/mastery-challenges-course-mastery)         | Skill-level progress and delayed mixed review make retention visible.                                                                 | Coding mastery also requires runnable behavior, debugging, changed cases, and transfer builds.                                                                                             |
| [Carnegie Mellon OLI](https://oli.cmu.edu/homepage/)                                                                                                        | Immediate feedback, hints, clear goals, practice data, and continuous course improvement form a coherent learning system.             | Analytics must be privacy-minimal, explainable, and used to improve instruction rather than manipulate engagement.                                                                         |
| [CodeSandbox Sandpack](https://codesandbox.io/blog/sandpack-announcement)                                                                                   | Browser-local multi-file editing, preview, tests, and customizable learning surfaces support rapid build-feedback loops.              | Third-party bundling is not automatically safe or accessible; the selected editor and runtime must pass every required safety, accessibility, and recovery gate without an alternate editor mode. |
| [CodeMirror 6 documentation](https://codemirror.net/docs/), [Tab handling](https://codemirror.net/examples/tab/), and [changelog](https://codemirror.net/docs/changelog/) | A composable browser editor supports language modes and diagnostics, intentionally avoids a default Tab trap, and records current touch, composition, selection, and accessibility repairs. | CodeMirror is the one coding editor path, not proof of this integration. Supported tablet/desktop devices, browsers, keyboards, touch, zoom, forced colors, and assistive technologies must pass observed tasks; phones receive a clear handoff. |

### What the platform will not copy

- arbitrary points, streak pressure, random rewards, or completion percentages presented as mastery;
- passive video or prose sequences with a quiz bolted on at the end;
- one repeated lesson layout regardless of concept or learner need;
- exact-answer leakage, keyword-presence grading, or tests that accept malformed and misplaced code;
- locked paths with no explanation, corrective route, or diagnostic bypass;
- recipe projects that differ from workshops only by names, colors, or domain nouns;
- cloud or host execution of learner code without an explicit isolation and resource contract;
- AI that completes the learning task for the learner or makes opaque mastery decisions.

## Learner journey contract

### 1. Start and placement

The learner chooses a goal or course and sees audience, outcomes, prerequisites, expected effort, tools, accessibility provisions, projects, and credential evidence. A diagnostic samples every claimed prerequisite with authentic microtasks. Results produce one of three transparent choices: begin, take a prerequisite bridge, or review selected skills. Learners may inspect the whole map even when an activity is not yet available.

### 2. Dashboard

The dashboard answers four questions without repository terminology:

1. What should I continue?
2. What should I review now?
3. Which skills have I demonstrated, and with what evidence?
4. Which real projects are becoming portfolio-ready?

It uses persisted attempts, drafts, reviews, projects, and competency evidence only. It does not invent goals, streaks, rooms, recommendations, or activity statistics.

### 3. Course and module maps

The course map shows prerequisite order, module outcomes, estimated active time, required builds, mastery state, and the next accessible action. The module page shows what prior skills return, what new capability is added, why the order matters, and what evidence closes the module.

### 4. Learning workspace

One cohesive workspace contains the current explanation, artifact editor, preview/output, evidence/tests, hints, notes, and step path. It saves continuously, resumes precisely, and keeps the cumulative artifact intact. The learner can focus any panel, collapse secondary panels, enlarge text, use only a keyboard, request reduced motion, and move between supported tablet and desktop browsers without losing work.

### 5. Feedback and correction

Feedback reports observed evidence, expected behavior, the competency involved, why the difference matters, and the smallest productive next action. Hints progress from concept, to location/strategy, to bounded syntax/example. A failed attempt can route to a prerequisite refresher and a parallel retry. A correct attempt explains why the solution works and may offer a changed-case challenge.

### 6. Review and mastery

Due review mixes earlier skills only after each has usable initial understanding. The learner predicts, reads, debugs, implements, explains, and selects methods in varied contexts. Mastery can move down when delayed evidence fails; the platform preserves completed work while honestly distinguishing completion from retained competence.

### 7. Projects and credentials

Projects begin with a stakeholder need and acceptance criteria, not a starter identical to a workshop. Automated checks cover observable behavior. Rubrics cover reasoning, accessibility, design quality, security, maintainability, testing, evidence, and tradeoffs. Credentials require independent projects, delayed assessment, changed cases, and a defensible evidence record.

## Universal inline editor and artifact workspace

### Required workspace declaration

Every build-capable activity declares:

- artifact type and supported files or structured sections;
- CodeMirror language mode, language service, formatting behavior, and the single verified accessible editor path;
- starter provenance and the exact earlier learner artifact it continues;
- preview, output, simulator, or visualization surface;
- canonical check adapter and hidden changed-case tests;
- runtime location, isolation, imports/dependencies, network policy, time/memory/output limits, and termination behavior;
- autosave, conflict, reset, checkpoint, recovery, export, and resume behavior;
- keyboard, screen-reader, high-contrast, zoom, reflow, touch, and reduced-motion behavior;
- transfer boundary: what must later be run with a real toolchain, device, service, or authorized environment.

An activity that requires an artifact but lacks this declaration fails publication.

### Editor behavior

- Editing, running/checking, previewing, resetting, and saving work inline at every supported viewport.
- Supported tablets and desktops use the same CodeMirror 6 editor. Unsupported environments cannot enter the studio and receive a precise supported-environment explanation.
- File tabs follow the ARIA tab pattern, preserve per-file undo, and never hide the active file name from assistive technology.
- The editor exposes filename/language, line and column, diagnostics, keyboard help, and a direct way to leave the editing surface.
- Error markers also appear in a semantic, focusable list linked to the relevant file and location.
- Learners can compare starter, current, and last-passing states without revealing a final solution.
- Preview and output never steal focus after a run. Status is announced politely; detailed output remains reviewable.

### Workspace profiles

| Domain                        | Inline artifact and evidence                                                                                                          | Isolation rule                                                                                                                              |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| HTML/CSS/JavaScript           | Multi-file editor, sandboxed live preview, DOM/accessibility tree, responsive viewport controls, console, source and behavior tests.  | Opaque sandboxed iframe, restrictive content policy, no same-origin access, bounded output and navigation.                                  |
| TypeScript                    | Editor, type diagnostics, emitted JavaScript, tests, output, and changed-case checks.                                                 | Bounded compiler/runtime service or isolated worker; explicit dependency allowlist; no host files, processes, credentials, or open network. |
| Python                        | Editor, stdout/stderr, tests, data/graphics alternatives, and project files where supported.                                          | Fresh Pyodide worker, source/output limits, timeout kill, allowlisted packages, no host access.                                             |
| Go                            | Editor, diagnostics, output, tests, and documented browser-subset boundaries.                                                         | Fresh browser worker and allowlisted deterministic imports; real toolchain required for named transfer gates.                               |
| C                             | Editor, diagnostics, output, memory-model visualizations, tests, and undefined-behavior explanations.                                 | Disposable browser interpreter worker; no native compiler or host access; real sanitizer/toolchain transfer gates.                          |
| SQL                           | Query editor, schema/data browser, results table, query plan where supported, tests, and reset.                                       | Fresh deterministic in-memory database with statement, row, output, and time bounds.                                                        |
| Shell/Linux/Git/network       | Script/config editor, deterministic terminal, state/file/repository/network views, checks, and reset/checkpoint.                      | Stateful simulator only unless a separately authorized disposable sandbox exists; learner text never reaches host execution.                |
| Docker/Kubernetes/CI/CD/cloud | Multi-file configuration editor, schema/contract diagnostics, state transition and failure simulations, policy/security checks.       | No daemon, kubeconfig, provider credentials, runner, registry, or cloud access from learner input.                                          |
| Prompt/agents/skills/MCP      | Prompt/config/code editor, deterministic cases, rubric feedback, trace/state visualizations, adversarial and changed-case evaluation. | Fixed local fixtures by default; live provider use is optional, authorized, budgeted, and never required for core completion.               |
| Applied mathematics/data      | Expression and notebook-style editor, units, tables, graphs, derivation steps, code where useful, changed inputs, and interpretation. | Deterministic math/data engine with precision, domain, resource, and accessibility contracts.                                               |
| Career/product/support        | Structured evidence editor, rubric, scenario simulator, diff/history, and changed-case defense.                                       | Text/data analysis only; no applications, messages, accounts, devices, employers, or external actions.                                      |

## Curriculum architecture

### Course contract

Each course must define and verify:

- intended learner, entry skills, diagnostic, device/language/access assumptions;
- observable terminal competencies and authentic post-course tasks;
- scope, exclusions, current authorities, versions, review date, and next course;
- acyclic competency graph with misconceptions and mastery evidence;
- introduce/guided/faded/retrieve/assess/transfer alignment matrix;
- prerequisite-ordered modules and cumulative artifacts;
- distinct theory, prediction, worked example, workshop, faded practice, debugging, lab, review, quiz, project, and exam experiences;
- inline workspace and safe runtime/simulator coverage;
- correction, enrichment, delayed review, and reassessment paths;
- several authentic projects and an independent final defense;
- accessibility, subject-matter, assessment, duplication, runtime, and learner-pilot reviews.

### Module contract

Every module follows a purposeful loop, varied to fit the domain:

1. orient with outcome, relevance, artifact, and prerequisite retrieval;
2. explain one bounded mental model with concrete and visual representations;
3. predict, inspect, or trace a small worked example;
4. modify the example in the inline workspace with immediate feedback;
5. complete a faded task with less support;
6. diagnose a realistic failure from evidence;
7. build a different independent lab artifact;
8. retrieve current and earlier competencies;
9. pass a varied quiz or performance check;
10. integrate the skill into the cumulative project.

The order may compress for a small competency, but no module can jump directly from a topic label to an independent project or from a worked example to a token-presence check.

### Step contract

Each learner step has one observable purpose and contains enough teaching to act:

- what to notice, decide, change, or produce;
- the concept and vocabulary needed now;
- a concrete example or evidence source when introducing syntax or procedure;
- where the change belongs and why it belongs there;
- one focused check plus retained checks when cumulative;
- misconception-specific failure feedback;
- three progressive hints where productive struggle is expected;
- a clear relationship to earlier and next work.

In a beginner workshop, the first meaningful artifact interaction occurs within the first two learner steps. A long orientation can exist before the workshop, but it cannot be disguised as eight generic checkpoints inside it.

## Assessment and progress model

### Evidence hierarchy

Strongest evidence first:

1. unfamiliar transfer project and design defense;
2. delayed independent implementation or diagnosis;
3. changed-case behavior and invariant tests;
4. independent familiar lab;
5. faded implementation or debugging;
6. guided implementation;
7. explanation, prediction, code reading, or selection;
8. reading/acknowledgment.

Completion at a lower level never substitutes for a required higher level.

### Check validity

Checks must verify the claimed performance. For HTML this means parsed structure, relationships, accessible names, behavior, and changed cases where applicable—not the presence of `<h1>` somewhere in source. For programming it means execution, tests, invariants, diagnostics, or causal explanation—not one marker string. For infrastructure and systems it means state transitions, constraints, failure, repair, rollback, and verification within the safe simulator. For math it means method, units, changed inputs, interpretation, and reasonableness—not a copied final number.

Canonical expected results remain server-side or in non-public isolated test assets. Public check descriptions state the requirement without exposing exact answers. A final step reruns all retained requirements so deleting earlier work cannot pass.

### Real learner metrics

The learner sees separate, honest measures:

- **Course completion:** required activities finished.
- **Current mastery:** competencies recently demonstrated at their required evidence level.
- **Retention:** competencies successfully retrieved after delay.
- **Transfer:** competencies used in unfamiliar labs/projects.
- **Project readiness:** acceptance and rubric dimensions met with linked artifacts.

Internally, evidence records competency, activity, check, attempt, hints, latency, result, changed case, timestamp, and artifact revision. No fake streak, room count, card count, or arbitrary XP unlocks learning or credentials. Optional celebrations recognize real firsts and meaningful revisions without changing mastery.

## Responsive Web Design rebuild order

The course starts with creating HTML, not with a long abstract browser-systems sequence. Tooling and browser models appear just in time and remain available as a short bridge.

### HTML foundation

1. Create and preview one HTML file; explain HTML, markup, elements, opening/closing tags, content, and `.html`.
2. Build headings and paragraphs; inspect the rendered result and document tree.
3. Nest elements correctly; distinguish parent, child, sibling, normal, and void elements.
4. Add attributes; distinguish names, values, global, boolean, and element-specific behavior.
5. Build a complete document with doctype, `html`, language, `head`, charset, viewport, title, and `body`.
6. Structure text with heading hierarchy, paragraphs, emphasis, importance, lists, quotations, code, and time/data semantics.
7. Create usable URLs and links: relative, absolute, fragments, email, telephone, downloads, and clear link purpose.
8. Add images and figures with dimensions, paths, formats, meaningful alternatives, decorative treatment, and responsive-source foundations.
9. Structure pages with landmarks and sectioning elements; inspect DOM and accessibility trees.
10. Build accessible tables from data relationships, captions, headers, and scope.
11. Build accessible forms with labels, names, types, groups, instructions, autocomplete, constraints, errors, and submission models.
12. Add audio, video, tracks, embeds, and fallbacks with permission, privacy, performance, and equivalence decisions.
13. Debug malformed documents with validator, source, DOM, accessibility, network, and path evidence.
14. Complete an independent HTML information-service project and cumulative HTML assessment before CSS.

Every item contains original micro-workshops, distinct debugging cases, a different independent lab, retrieval of earlier syntax and accessibility, and cumulative artifact checks.

### CSS and responsive design

1. CSS purpose, rules, selectors, declarations, values, stylesheet linking, and browser defaults.
2. Cascade, specificity, inheritance, source order, layers, and debugging computed styles.
3. Colors, contrast, custom properties, functions, and resilient fallbacks.
4. Units, intrinsic sizing, logical properties, overflow, and box model.
5. Typography, readable measure, fluid type, fonts, fallbacks, and loading behavior.
6. Backgrounds, borders, effects, replaced elements, and content/presentation boundaries.
7. Normal flow, display, formatting contexts, positioning, stacking, and legacy float use.
8. Flexbox from axes and sizing through wrapping, alignment, source order, and component patterns.
9. Grid from tracks and placement through responsive composition, subgrid, and source order.
10. Mobile-first responsive design, content breakpoints, media queries, container queries, and preference queries.
11. Responsive images, aspect ratios, media, embeds, and performance.
12. Pseudo-classes/elements, interaction states, forms, focus, forced colors, and touch.
13. Transforms, transitions, animation, performance, reduced motion, and attention ethics.
14. Design foundations: hierarchy, spacing, composition, content design, usability, accessibility, and evidence-based critique.
15. Cross-browser, responsive, accessibility, performance, and maintainability testing.
16. Five original independent certification projects plus a broad delayed exam and portfolio defense.

Coverage is cross-checked against the pinned freeCodeCamp v9 snapshot, MDN Curriculum, MDN Learn, web.dev learning paths, WHATWG HTML Living Standard, current CSS specifications, and WCAG 2.2. External curricula control coverage and depth only.

## Catalog audit and rebuild order

### Mandatory audit scorecard

Each course receives a 0–3 score and evidence links for:

1. learner and destination definition;
2. current authoritative scope coverage;
3. prerequisite and cognitive order;
4. explanatory clarity and beginner sufficiency;
5. active practice and support fading;
6. cumulative retrieval and retention;
7. scenario, starter, requirement, and interaction variety;
8. assessment validity and changed-case strength;
9. authentic independent projects and transfer;
10. inline editor/runtime/simulator completeness;
11. accessibility and tablet/desktop learner flow;
12. meaningful persisted progress and correction;
13. exact and semantic duplication control;
14. subject, instructional-design, assessment, and learner review;
15. technical freshness and scheduled maintenance.

A critical zero in teaching clarity, order, assessment validity, execution safety, accessibility, or learner-flow verification blocks release regardless of total score. Automated tests support reviewers; they cannot award quality by counting files or keywords.

### Rebuild waves

1. **Research foundation:** build the platform register, institutional-quality evidence base, competitive task audit, usability/accessibility research, runtime threat research, stack compatibility matrix, and research templates; record open questions and review triggers.
2. **Course research dossiers:** research all 54 intended learners, current authoritative scopes, prerequisites, misconceptions, authentic tasks, versions, safety boundaries, coverage maps, and maintenance schedules before their rebuild wave opens.
3. **Platform contracts:** convert accepted research into schemas, audit reports, workspace declarations, progress evidence, publication states, architecture decisions, and false-completion removal.
4. **Responsive Web Design researched vertical slice:** complete its current-source coverage matrix, then build the true-beginner HTML foundation and universal web editor as the reference implementation; observe learners and repair it before scaling.
5. **Foundation courses:** research, author, review, and pilot beginner applied mathematics, Linux, Git, Python, JavaScript, TypeScript, SQL, Go, and repository quality gates in prerequisite order.
6. **Intermediate language and systems:** refresh sources, author, review, and pilot Python paradigms/DSA, Advanced Git, HTTP, Docker, Kubernetes, CI/CD, networking, support, C, and cryptography.
7. **Production builds:** refresh sources, author, review, and pilot Pokedex, Bookbot, Asteroids, static site, maze, crawlers, feeds, servers, messaging, storage, RAG, and safe agents.
8. **Advanced AI and professional practice:** research immediately before authoring and pilot prompt engineering, loops/goals, skills/MCP, advanced mathematics, career, product studios, and capstone.
9. **Catalog integration:** research and validate the cross-course prerequisite graph, diagnostics, review scheduling, project portfolio, search, navigation, progress comprehension, and learner support.
10. **Observed pilots and release research:** representative novice/intermediate/advanced and accessibility-focused studies, repairs and re-tests, source freshness review, full local gates, tablet/desktop verification, then final Lighthouse only after a newly reviewed completion marker is deliberately created.

Courses remain unpublished until their wave passes. A technically runnable artifact is not published instruction.

## Engineering work packages and gates

### Package 0: research program

- Create durable platform, course, source, coverage, decision, and learner-pilot research records instead of leaving evidence only in prose or chat history.
- Research every course before its architecture and refresh fast-changing sources immediately before authoring and release.
- Translate every accepted finding into an explicit requirement, design decision, curriculum mapping, test, or review gate.
- Track uncertainty, conflicting evidence, rejected options, review ownership, source expiry, and upstream-change triggers.
- Block course authoring scale-up, platform feature scaling, dependency upgrades, approval, and publication when required research evidence is absent or stale.

Execution order:

1. finish platform learning-science, institutional-quality, competitive-task, usability, progress-validity, safety/privacy, editor/runtime, stack, and pilot records;
2. complete all 54 course dossiers and versioned objective coverage maps, starting with Responsive Web Design;
3. review each dossier with subject, instructional, assessment, accessibility, safety, and observed-learner responsibilities named;
4. write architecture decisions and alignment matrices only from accepted bounded evidence;
5. build a vertical slice, run adversarial and learner tasks, repair findings, and then decide whether scaling is warranted;
6. refresh sources and repeat review before each course wave and before release.

### Package A: truth and audit infrastructure

- Remove content-complete and published claims invalidated by learner review.
- Add explicit course states: planned, researched, authored, schema-valid, runtime-valid, flow-verified, pilot-validated, approved, published.
- Produce a human-readable audit report with evidence and failures for every course.
- Fail on generic scaffolds, instructions without teaching content, late first practice, token-only mastery, weak cumulative checks, and missing workspace profiles.

### Package B: universal learner workspace

- Replace the coding textarea and unused Monaco dependencies with CodeMirror 6 as the one tablet/desktop artifact editor for every build-capable course.
- Keep phone course studios unsupported with a clear work-preserving handoff; do not ship a second coding editor implementation.
- Add semantic diagnostics, tests, artifact history/diff, checkpoints, reset, export, responsive preview controls, and workspace help.
- Map every course/activity to a verified runtime or simulator and expose transfer boundaries in learner language.

### Package C: real mastery and navigation

- XP, streak, room, and card copy plus point/streak storage are removed; deleted-course step records are historical evidence rather than false active progress.
- Add resume, due review, competency evidence, retention, transfer, project state, and corrective actions only from current persisted evidence.
- Use one shared header/navigation model and predictable course/module/activity hierarchy.
- Make every progress value traceable to persisted evidence.

### Package D: curriculum rebuild

- Write the competency and alignment matrix before learner prose.
- Author explicit explanations and small worked examples before defining repeated activity structures.
- Compile only runtime indexes and research evidence from reviewed source models; never generate learner-facing instruction, examples, practice, checks, feedback, or assessments from topic names.
- Inspect and learner-test each vertical slice before authoring the next sequence.

### Package E: release

Required order:

1. focused schema/content/runtime/behavior tests;
2. complete curriculum audit and reviewer sign-off;
3. full `npm test`;
4. `npm run type-check`;
5. `npm run lint`;
6. `npm run lint:strict`;
7. `npm run build`;
8. mobile public-information/phone-handoff plus tablet and desktop studio browser verification of real learner flows;
9. observed learner pilot evidence and repairs;
10. creation of `content/v2/CONTENT_COMPLETE` only after all planned course and migration work is closed;
11. final Lighthouse tablet and desktop profiles, excluding SEO, with at least 99 for performance, accessibility, and best practices.

## Definition of done

The overhaul is complete only when:

- the platform register, competitive task audit, architecture decisions, all 54 course research dossiers, coverage/alignment matrices, current-source reviews, and learner-pilot records are complete and linked to implemented decisions;
- every catalog course has approved scope, competency, alignment, source, misconception, assessment, workspace, project, and maintenance records;
- every required concept is explicitly taught before it is used or assessed;
- every build-capable activity opens a real inline editor/artifact workspace and verified safe runtime or simulator;
- every terminal competency has independent, delayed, and transfer evidence;
- every course has original varied workshops, debugging, labs, reviews, quizzes, projects, exam, and corrective paths appropriate to its domain;
- no course relies on generic template prose, renamed copies, token-only grading, fake data, or vanity progress;
- navigation and progress are understandable to a learner without exposing repository or implementation decisions;
- representative learner pilots find no critical teaching, order, navigation, editor, feedback, accessibility, or recovery failure;
- all local technical gates, mobile public-information/phone-handoff flows, and tablet/desktop learner flows pass;
- only then, both final Lighthouse profiles pass the required non-SEO thresholds.

## Research maintenance

Research remains open throughout the rebuild. Technical sources record exact version, URL, review date, bounded claim, limitation, resulting decision, owner, next review, and upstream trigger. Curricular frameworks and platform patterns are reviewed at least yearly; fast-changing technical, dependency, security, browser, certification, and AI sources are reviewed before their wave, before release, and on relevant upstream changes. Course owners must be able to trace a requirement from current authority through competency, teaching sequence, practice, assessment, project, and maintenance test.

Observed learner outcomes, abandonment, retry, hint, misconception, retention, transfer, accessibility, navigation, editor, and recovery evidence drive revisions. Qualitative evidence remains attached to the task and context that produced it. Quantitative evidence names its population, time window, denominator, and limitations. No metric silently lowers standards, invents a recommendation, assigns a permanent ability track, or substitutes engagement for learning.
