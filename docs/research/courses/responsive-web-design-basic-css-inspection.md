# Responsive Web Design v9 Basic CSS source inspection

Status: direct source inspection complete; candidate mapping only  
Reviewed: 2026-07-15  
Pinned source: freeCodeCamp commit `c115efdd41f868d8850156f6a7a211219c35a847`

This artifact records challenge-level research for the complete `basic-css` source module. It does not approve the benchmark, the current LEARN-IT-ALL course, or a replacement lesson. Source coverage is evidence about what must be considered; it is not permission to copy prose, scenarios, code, checks, or solutions.

## Method and exact inventory

The inspection used the pinned source paths, hashes, byte counts, top-level section inventories, hint checks, and prompt counts in `references/freecodecamp-rwd-v9.json`. Every challenge file was inspected across its learner explanation or interactive section, starter and completed artifact where present, requirements, visible questions, and executable checks. Candidate concepts include only bounded source support; missing modern practice remains an explicit extension or design requirement.

| Source block | Type | Challenges | Prompts | Inspection result |
| --- | --- | ---: | ---: | --- |
| `lecture-what-is-css` | lecture | 10 | 30 | CSS purpose, rule anatomy, application, viewport, sizing, relationships, display, spacing, and browser defaults |
| `workshop-cafe-menu` | workshop | 89 | 0 | One long guided page covering retained HTML plus introductory selectors, sizing, spacing, typography, backgrounds, links, and external CSS |
| `lab-business-card` | lab | 1 | 0 | Independent-looking but strongly recipe-constrained card with mostly source-shape checks |
| `lecture-css-specificity-the-cascade-algorithm-and-inheritance` | lecture | 8 | 24 | Selector categories, specificity, importance, cascade, and inheritance with material simplifications requiring correction |
| `review-basic-css` | review | 1 | 0 | Prose inventory of the first CSS topics |
| `quiz-basic-css` | quiz | 1 | 40 | Recognition and syntax questions; no authentic construction or diagnosis evidence |
| `lecture-styling-lists-and-links` | lecture | 4 | 12 | List spacing and markers plus usable link affordance and state styling |
| `lab-stylized-to-do-list` | lab | 1 | 0 | Lists, checkboxes, labels, links, and five link states with presence-oriented checks |
| `lecture-working-with-backgrounds-and-borders` | lecture | 4 | 12 | Background image controls, gradients, contrast and non-color meaning, media caution, borders, outlines, and radii |
| `lab-blog-post-card` | lab | 1 | 0 | Card background, border, image, spacing, inline-block link appearance, and hover recipe |
| `review-css-backgrounds-and-borders` | review | 1 | 0 | Retrieval inventory for list, link, background, gradient, contrast, and border topics |
| `quiz-css-backgrounds-and-borders` | quiz | 1 | 40 | Property and value recognition questions with no rendered changed-case evidence |
| **Total** |  | **122** | **158** | All blocks mapped as agent-inspected candidates |

## Current primary technical authority

The target course must correct source shortcuts against primary specifications rather than preserve them for benchmark similarity.

- [CSS Syntax Module Level 3](https://drafts.csswg.org/css-syntax/), Editor's Draft 10 June 2026, controls the distinction among qualified rules, at-rules, selectors, declaration blocks, declarations, properties, values, and parser recovery. It is work in progress and does not establish browser interoperability or teaching quality.
- [Selectors Level 4](https://drafts.csswg.org/selectors/), Editor's Draft 13 July 2026, controls matching, selector lists, combinators, pseudo-classes, pseudo-elements, privacy limits, and the three specificity columns. It is work in progress and identifies at-risk features.
- [CSS Cascading and Inheritance Level 5](https://www.w3.org/TR/css-cascade-5/), Candidate Recommendation Snapshot 13 January 2022, is the controlling reviewed level for value processing, origins, importance, layers, specificity, order, inheritance, and explicit defaulting.
- [CSS Cascading and Inheritance Module Level 6](https://drafts.csswg.org/css-cascade-6/), exploratory Editor's Draft 28 April 2026, is watched for evolving scope behavior. Its own status directs implementers to Level 5, so it cannot control stable instruction by itself.
- [CSS Display Module Level 3](https://www.w3.org/TR/css-display-3/), Candidate Recommendation Draft 5 June 2026, controls box-tree generation and outer/inner display behavior. Candidate status and at-risk features require browser and assistive-technology verification.
- [CSS Backgrounds and Borders Module Level 3](https://www.w3.org/TR/css-backgrounds-3/), Candidate Recommendation Draft 11 March 2024, controls background layers, clipping, border geometry, radii, images, and shadows. Accessibility and resilient fallback require separate evidence.
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/) controls applicable contrast, non-color, focus, reflow, target, input, and motion outcomes; conformance alone does not prove overall usability.

The dossier decision `rwd-css-spec-graph` requires the replacement to teach these as separate models. Rule parsing is not selector matching. Specificity is not a decimal or four-position score. An important declaration does not escape cascade-origin ordering. CSS display changes boxes, not HTML semantics. Backgrounds and borders paint defined box areas and cannot carry required meaning alone.

## Block findings

### First CSS lecture

The ten lecture challenges establish a useful breadth inventory: CSS purpose and boundaries, rules and declarations, viewport metadata, user-agent styles, three application methods, width and height, four combinators, block and inline behavior, inline-block, and margin versus padding. Interactive examples help connect source to output.

The material does not yet provide a durable source-to-matched-rule-to-computed-value diagnostic loop. It also presents facts in small isolated explanations without cumulative construction, changed cases, saved checkpoints, or delayed retrieval. The target opening must let a learner style an earlier semantic HTML artifact immediately, predict what should match, observe computed evidence, break one bounded case, and repair it.

### Cafe menu workshop

The 89 steps repeatedly edit one artifact and retrieve earlier HTML document, heading, paragraph, landmark, section, article, address, link, image, and void-element skills. CSS work includes external loading, type/class/ID and relationship selectors, lengths and percentages, width and maximum width, margin and padding shorthands, backgrounds, borders, font stacks, type sizes and styles, alignment, display, and link states. This is meaningful practice volume and proves that Basic CSS must continue enforcing HTML rather than reset the learner to unrelated snippets.

The source also demonstrates why step count is not quality evidence. Several techniques are brittle or dated: fitting two inline-block columns through source-whitespace management, rigid proportions, negative margin positioning, fixed visual recipes, and link-state choices that can erase useful visited distinction. Many checks establish exact code shape or appearance rather than causal understanding. The target replaces the single 89-step recipe with several connected but varied builds: an early guided slice, a faded continuation, a deliberate debugging clinic, and a changed-content transfer. Modern layout may be previewed only where its prerequisite model is taught; unexplained flex or grid shortcuts are not allowed.

### Business-card lab

The lab retrieves meaningful image alternatives, paragraphs, headings, links, a stylesheet reference, selectors, named color, a font fallback, fixed and percentage sizing, spacing, alignment, and fluid image width. Its requirements dictate a 300-pixel card, 100-pixel top margin, exact class names, and exact spacing values. The checks largely reward element or declaration presence.

That cannot prove responsive behavior, readable contact information, semantic contact context, keyboard link use, focus visibility, color contrast, long-name resilience, zoom, text spacing, or learner design judgment. The target independent task must state stakeholder outcomes and constraints, allow defensible design choices, then test long names, narrow and wide containers, zoom, text spacing, missing media, keyboard operation, focus, and contrast. Exact literals are acceptable only when the requirement itself makes the literal meaningful.

### Specificity, cascade, and inheritance lecture

The eight challenges distinguish selector categories, universal/type/class/ID selectors, importance, cascade, and inheritance. This is required scope, but two presentations cannot become target instruction. Specificity is framed using an older four-part shorthand that places inline styles beside selector columns. The explanation of `!important` is too broad if read as overriding every competing declaration regardless of origin. The source also does not build a complete winner trace through current cascade stages.

The replacement uses Selectors Level 4's ID, class-like, and type-like columns, handles style attributes in the cascade model, and teaches functional selector rules for `:is()`, `:not()`, `:has()`, and `:where()`. Learners must predict winners across author, user, user-agent, normal, important, layer, animation, transition, specificity, scope, and order cases; inspect the actual matched and computed evidence; and repair architecture without merely escalating specificity or adding `!important`.

### Basic review and quiz

The review is a useful topic checklist. The 40-item quiz samples terminology, syntax, application methods, viewport behavior, width and height, combinators, display, universal/type/class/ID selectors, specificity, importance, cascade, and box spacing. It mostly asks learners to recognize one answer from supplied alternatives.

Recognition cannot substitute for prediction, construction, changed-case output, causal diagnosis, or explanation. Target assessment keeps bounded retrieval questions where they add value but also requires matching-set prediction, cascade traces, malformed-rule recovery, load-failure diagnosis, computed-style evidence, and a small independent style change that survives altered markup and content.

### Lists, links, and to-do lab

The lecture correctly separates inter-item margin from within-item line height, covers native marker type/position/image, explains default link affordance, preserves underline as non-color evidence, and introduces unvisited, visited, hover, focus, and active states. The to-do lab retrieves nested lists, checkboxes, labels, links, stylesheet loading, selectors, outlines, and link states.

The lab still lets arbitrary colors pass without contrast or state-distinguishability evidence, removes all text decoration, opens new tabs without teaching the user and security implications, and checks mostly for selector/property presence. The target task must preserve native list and control meaning, verify accessible names, announce any new-context behavior, retain keyboard focus in forced colors, distinguish states without color alone, and test pointer plus keyboard paths. It must not require `target="_blank"` as a decorative recipe.

### Backgrounds, borders, and blog-card lab

The lecture covers image size, repeat, position, attachment and shorthand; linear and radial gradients; text/background contrast; non-color meaning; distracting background media; border shorthand and sides; outlines; and radius. These topics connect paint behavior to accessibility better than the two labs do.

The blog-card lab again dictates a visual card recipe and accepts any non-default colors, chosen width, image width, spacing, inline-block link appearance, and hover change. It does not require a valid destination, keyboard focus, contrast, changed content, responsive evidence, or a semantic article. The target counterpart must begin with content and interaction requirements, preserve a useful HTML article before CSS, handle long headings and excerpts, keep media fluid, test missing imagery, distinguish a real link or button correctly, preserve focus, and defend paint choices under high contrast and zoom.

### Background review and quiz

The review retrieves list markers, line height, spacing, link states, backgrounds, gradients, contrast, non-color meaning, borders, and radius. The 40-item quiz samples property/value recognition for those areas but does not assess its own accessibility topics. Target review must interleave earlier selectors, cascade, HTML semantics, and box reasoning; target assessment must include computed paint order, shorthand resets, missing images, contrast across gradient/image regions, focus visibility, and changed content rather than isolated vocabulary alone.

## Replacement sequence and activity contract

Basic CSS will not be a renamed copy of these twelve blocks. Its candidate replacement sequence is:

1. Retrieve the learner's earlier semantic HTML artifact and make one bounded, saved, inspectable style change.
2. Model CSS rule syntax, loading, parser recovery, browser defaults, and source-to-computed evidence.
3. Build and predict universal, type, class, ID, relationship, state, and bounded attribute selectors against changing markup.
4. Trace cascade, importance, specificity, inheritance, and defaulting before adding layout complexity.
5. Build box, sizing, spacing, typography, list, link, background, border, and fluid-media decisions while earlier HTML correctness remains enforced.
6. Complete varied guided, faded, debugging, independent, retrieval, assessment, delayed-retention, and transfer tasks with progressive hints and corrective routes.

Every activity must name prerequisites and retained skills. Workshops model decisions and then fade support. Labs start from meaningfully different stakeholders, content, starters, and acceptance evidence. Debugging clinics begin from plausible failures, require a causal diagnosis, and verify the repair against a changed case. Quizzes sample misconceptions and reasoning but do not carry mastery alone. Projects begin from an empty or deliberately incomplete artifact and require behavior, accessibility, responsive, explanation, and defense evidence.

## Grading and interaction consequences

Source text or declaration presence is never sufficient evidence. The inline workspace must support HTML and CSS editing, sandboxed preview, matched-rule and computed-style diagnostics, viewport/container changes, keyboard operation, persistent checkpoints, progressive hints, tests, and announced feedback. Canonical hidden checks remain server-side.

Basic CSS grading must combine:

- parsed source and stylesheet-load evidence;
- selector matching against intended and rejected elements;
- computed values and cascade winner traces;
- rendered behavior under narrow/wide containers, zoom, long content, missing media, and changed markup;
- keyboard, focus, contrast, non-color, and relevant forced-color evidence;
- causal explanation and repair evidence;
- delayed retrieval and unfamiliar transfer.

## Remaining blockers

- Independent subject-matter review must confirm every concept assignment and specification interpretation.
- The complete 179-concept introduce/model/guided/faded/debug/retrieve/assess/delayed-retain/transfer matrix is not authored.
- Original Basic CSS activities, checks, hints, correction paths, and server-side grading are not authored or flow-verified.
- Tablet and desktop editor behavior plus accessible phone handoff are not verified with representative learners.
- The remaining 76 source blocks still need challenge-level inspection; 61 blocks and one unavailable assessment container now retain exact evidence with zero guessed concept assignments.
- Lighthouse remains on hold until all content, migration, duplication, editor, progress, navigation, review, and pilot work is complete.
