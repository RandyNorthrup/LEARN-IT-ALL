# Responsive Web Design CSS Variables source inspection

Reviewed: 2026-07-16

Status: complete direct inspection; candidate curriculum evidence only

## Decision

All five pinned CSS Variables blocks are inspected challenge by challenge, prompt by prompt, check by check, and solution by solution. The family contains 120 challenges, 46 question prompts, 420 implementation checks, and 606,043 source bytes. Its largest artifact is a 115-step decorative skyline whose cumulative seed code accounts for most of the byte volume.

The source contacts custom-property declaration and use, inheritance, `var()` fallback, `:root`, `@property`, theme overrides, gradients, media conditions, layout, tables, and color scales. It does not establish the crucial distinctions among:

- an unregistered custom property's cascading token stream;
- whether the custom property is missing or guaranteed-invalid;
- whether substitution makes the consuming property invalid at computed-value time;
- a registered property's syntax, inheritance flag, and registered initial value;
- `var()` fallback versus a registered initial value;
- typed interpolation versus discrete animation;
- reuse literals, semantic design tokens, user preferences, and a complete theme contract.

The existing 101-concept CSS graph therefore missed one bounded competency. `css-registered-custom-properties` is added separately from `css-custom-properties-fallbacks`. The new concept requires valid `@property` registration, computationally independent initial values, computed-value diagnosis, inheritance prediction, typed interpolation, unsupported-registration behavior, and reduced-motion evidence. It is benchmark contact, not an uncredited extension, because the pinned lecture, review, and quiz explicitly address `@property`.

The former module-wide assignment also credited cascade architecture and theme competence too broadly. It is replaced with five exact block maps. No block receives changed-case, debugging, accessibility, retention, or transfer credit merely because it has many steps, a lab label, or an empty editor.

LEARN-IT-ALL will not publish a renamed skyline, availability heatmap, color-number token set, or viewport-triggered day/night palette. The target sequence separates substitution, registration, semantic tokens, preferences, responsive overrides, and motion. It uses varied original scenarios, specified and computed-value evidence, deliberate faults, hidden mutations, accessible theme behavior, correction, delayed retrieval, and independent defense.

## Exact source boundary

The inspection covers these sources at freeCodeCamp commit `c115efdd41f868d8850156f6a7a211219c35a847`:

| Source block | Type | Challenges | Question prompts | Implementation checks | Source bytes |
| --- | ---: | ---: | ---: | ---: | ---: |
| `lecture-working-with-css-variables` | lecture | 2 | 6 | 0 | 13,723 |
| `workshop-city-skyline` | workshop | 115 | 0 | 385 | 554,657 |
| `lab-availability-table` | lab | 1 | 0 | 35 | 21,242 |
| `review-css-variables` | review | 1 | 0 | 0 | 2,467 |
| `quiz-css-variables` | quiz | 1 | 40 | 0 | 13,954 |
| **Total** |  | **120** | **46** | **420** | **606,043** |

The pinned snapshot records every challenge ID, path, SHA-256 hash, byte count, top-level section, language, check count, and quiz count. Direct inspection is not technical authority or approval. It does not prove that the source is correct, sufficient, original for LEARN-IT-ALL, accessible, responsive, assessment-valid, retained, transferable, or successful with learners.

## Current primary evidence

The replacement is bounded by:

- [CSS Snapshot 2026](https://www.w3.org/TR/css-2026/), W3C Group Note dated 26 March 2026, for the current CSS module surface and maturity context;
- [CSS Custom Properties for Cascading Variables Module Level 1](https://www.w3.org/TR/css-variables-1/), Candidate Recommendation Snapshot dated 16 June 2022 and included in CSS Snapshot 2026, for custom-property values, cascade, inheritance, `var()` substitution, fallback, dependency cycles, guaranteed-invalid values, and invalid-at-computed-value behavior;
- [CSS Properties and Values API Level 1](https://www.w3.org/TR/css-properties-values-api-1/), Working Draft dated 26 March 2024 with the current Editor's Draft monitored 16 July 2026, for registration, syntax strings, `inherits`, `initial-value`, computational independence, computed-value validation, registration precedence, and typed animation;
- current Cascade, Values and Units, Color, Color Adjustment, Backgrounds and Borders, Images, Transitions, Media Queries, and WCAG 2.2 evidence already registered in the dossier for theme, interpolation, preferences, forced colors, contrast, and responsive behavior.

Unregistered custom properties accept token streams and inherit by default. A declaration can win the cascade but become unusable only after substitution into a typed receiving property. A `var()` fallback is not a general catch for every invalid substituted result. Registered custom properties still parse declarations like unregistered properties; their declared syntax is enforced at computed-value time. A valid `@property` rule requires `syntax` and `inherits`; a non-universal syntax normally also requires a matching computationally independent `initial-value`. Registration does not add cascade priority. When a typed registered value is invalid, registered-property initial behavior is distinct from a `var()` fallback argument.

These are the mental models the target must teach and measure. Browser-support claims remain a freshness boundary and cannot replace actual supported-browser evidence.

## Lecture audit

### Custom Properties lecture

The first lecture gives six editor examples and three recall questions. Useful contacts include:

- `--name: value` declaration syntax;
- `var(--name)` substitution;
- local override and inherited availability;
- nested references;
- a `var()` fallback argument;
- theme classes and media-condition overrides.

The explanation repeatedly calls custom properties “variables” without first establishing that they are cascading custom properties holding token streams rather than general programming variables. More serious problems follow.

The fallback example defines `--text-color: green` and consumes `var(--text-color, green)`, so its fallback is never exercised. The prose then says a fallback is used when a property is “not defined or invalid.” That collapses distinct cases. An unregistered custom property can be defined with tokens that are invalid for `color`; in that case the fallback argument is not necessarily selected, and the receiving declaration can become invalid at computed-value time.

The theme example declares `--bg-color` on `:root`, consumes it on `body`, then overrides it only on a descendant `.light-theme` while also setting the descendant's own background. This does not demonstrate switching a document theme by changing a class on `body`, despite the following prose claiming that it does. No interaction changes the class, no theme state is inspected, and no default/light/dark preference contract exists.

The responsive example hard-codes “Tablet screens and up” at 600 pixels and “Desktop screens and up” at 1024 pixels. It changes card width, background, padding, and uses `transition: all`. It does not identify a content constraint, test a boundary, respect reduced motion, or establish that device names follow from viewport widths.

The final browser-support warning is generic and unversioned. It tells authors to “always have a fallback plan” for a broadly implemented feature without naming the supported browser matrix, required behavior, actual unsupported case, or refresh trigger.

The three questions test declaration punctuation, `var()` syntax, and old-browser caution. None asks for cascade, inheritance, missing versus invalid behavior, cycles, nested fallback, computed output, or repair.

### `@property` lecture

The second lecture introduces `syntax`, `inherits`, and `initial-value`, plus a registered angle transitioned through a gradient. That is valid benchmark contact. Important omissions and errors remain.

- It does not say that `syntax` and `inherits` are required for a valid rule.
- It does not explain when `initial-value` is required or that a typed initial value must be computationally independent.
- It says typed custom-property animation “wasn't possible before,” rather than distinguishing smooth typed interpolation from the discrete animation behavior of unregistered values.
- It treats a normal `:root` declaration before `@property` as a generic browser fallback without explaining how registration changes initial and inheritance behavior when supported.
- It says `var(--main-color, #3498db)` handles a registered property being undefined or invalid. With a valid non-universal registration and initial value, the property has registered initial behavior; invalid typed declarations do not simply route to the `var()` fallback.
- It calls the registered initial value “type-safe fallback,” merging two different mechanisms.
- It never checks specified versus computed values, invalid rules, invalid typed declarations, registration order, or unsupported registration.
- The hover-only gradient demonstration has no keyboard-equivalent state and no reduced-motion treatment.

Its three questions only recall the at-rule's broad purpose, descriptor names, and a claimed unsupported-browser recipe.

## Complete 115-step skyline audit

All 115 step descriptions and all 385 checks were inspected. The source is a long cumulative drawing trace, not 115 distinct custom-property learning events.

### Step distribution

Direct classification of the instructions finds:

- 33 steps whose description names the project as variables work, declares a custom property, consumes one, changes one, or embeds one in another value;
- 19 steps primarily constructing gradients;
- 44 steps primarily prescribing layout, dimensions, borders, overflow, or positioning;
- 5 final steps adding one media condition and hard-coded palette overrides;
- no step registering a custom property with `@property`;
- no step predicting a specified or computed custom-property value;
- no step constructing a dependency graph or cycle;
- no step diagnosing an invalid-at-computed-value result;
- no step designing semantic tokens from stakeholder requirements;
- no step testing user preferences, forced colors, contrast, motion, or changed content.

The categories overlap because a gradient or border can consume a custom property. This overlap is exactly why raw step count is not pedagogy evidence.

### Steps 1–10 build a full-viewport drawing canvas

The seed contains doctype, language, character encoding, title, body, and an editable stylesheet link. The steps add a universal debug border, universal border-box sizing, `height: 100vh`, zero body margin, and `overflow: hidden`. They then create empty building containers with percentage dimensions and Flexbox.

Hiding overflow before content exists trains the learner to conceal failures. A fixed viewport-height decorative canvas is not a content-responsive page. No viewport metadata is present. Step 16 later claims percentage units plus Flexbox make the artifact “completely responsive,” but the final artifact relies on viewport units, fixed assumptions, absolute positioning, hidden overflow, physical offsets, and a single arbitrary media boundary.

### Steps 11–24 introduce scope by forcing a missing sibling value

The first color custom property is declared on `.bb1`, consumed by descendants, then incorrectly expected to exist on sibling buildings. A fallback makes one sibling green. The lesson eventually moves all colors to `:root` and removes the fallbacks.

This sequence can expose inheritance boundaries, but it does not ask learners to predict them. It says sibling failure is “just how CSS works” rather than tracing cascade and inheritance. It calls `:root` “the highest level selector in CSS,” rather than the pseudo-class that matches the document root. Moving every token globally is presented as the general solution; component-local defaults, semantic scope, inheritance intent, and override ownership are not considered.

Removing every fallback immediately after globalizing tokens also misses the opportunity to distinguish a required token, optional token, nested fallback, registration initial value, and invalid consuming value.

### Steps 25–35 prescribe overlapping layout and spacer markup

Foreground and background containers become absolute, full-size layers. Empty `div` elements are inserted as Flexbox spacer items to squeeze buildings together. Buildings are shifted with physical `left` and `right` offsets. These are coordinate recipes with no content model, intrinsic constraint, writing-mode reasoning, or changed case.

The step called “optimize your code” only merges two selector rules. It does not address unnecessary DOM, global token scope, hidden overflow, selector responsibility, or maintainability.

### Steps 36–110 are mostly gradient and shape tracing

The project creates secondary color properties, linear, repeating-linear, multi-layer, and radial gradients, border triangles, trapezoids, windows, and building sections. These steps provide extensive gradient and layout contact but little new custom-property reasoning.

Specific defects include:

- Step 47 tells learners to create `window-color2` without the required leading `--`, while later code expects `--window-color2`.
- Fixed percentage and viewport dimensions are prescribed without predicting containing blocks or failure cases.
- Empty decorative elements dominate the document rather than using a bounded generated or vector representation.
- Physical axes and offsets are copied without writing-mode or content constraints.
- Step 97 calls width-30-percent, height-10-percent elements with `border-radius: 50%` “circular” even though equal rendered dimensions are not established.
- The global debug border is removed at Step 107, but no actual geometry, overflow, or layout inspection replaces it.
- A visually plausible picture is treated as evidence even though no user task, semantic content, accessibility behavior, or responsive invariant exists.

### Steps 111–115 tie night mode to viewport width

The final five steps add `@media (max-width: 1000px)`, copy the entire sky rule, and replace palette tokens with black, gray, and dark colors. The prose calls width the “document size,” then interprets the narrow range as night.

This is neither content-derived responsiveness nor user-controlled theming. Time of day, user color-scheme preference, environmental light, and viewport width are different signals. A narrow desktop window should not silently become night, and a wide screen should not block a requested dark theme. No contrast, color-scheme declaration, forced-color behavior, saved preference, or no-JavaScript baseline is tested.

The copy-pasted sky rule also contradicts the maintainability claim used to motivate custom properties. A theme should override meaningful tokens or states, not duplicate unrelated gradient structure.

### Skyline check audit

The 385 checks divide exclusively into:

| Check channel | Count | What it establishes | What it does not establish |
| --- | ---: | --- | --- |
| CSS parser/helper checks | 285 | requested selectors and declaration strings appear | winning cascade, computed custom-property values, used geometry, rendered gradient, invalid-at-computed behavior |
| Static DOM checks | 90 | prescribed empty elements, class names, order, and stylesheet link exist | semantic purpose, changed DOM, accessibility, task success |
| Source/comment regular-expression checks | 10 | exact deletions, comments, or textual rule shapes match | behavior, maintainability, reasoning, alternate correct solutions |

There are zero computed-style, geometry, overflow, media-match, interaction, accessibility-tree, keyboard, preference, mutation, diagnosis, explanation, correction, delayed-retention, or transfer checks. No check calls `getComputedStyle`, measures a box or scroll extent, activates a theme, changes a token, inserts a building, switches a preference, or verifies the media condition's rendered outcome.

## Availability Table lab audit

The lab contains eight user stories and 35 checks. It requires a weekly table, time headers, empty availability cells classified from zero through five, six numbered color properties, two border properties, alternating row classes, and a hard-stop color legend.

### Semantic and accessibility defects

- There is no table caption.
- The supplied solution has no `thead` and no explicit `scope` values.
- Time headers use `rowspan="2"`, but row-group meaning and header associations are never inspected.
- Every availability data cell is empty; its number exists only in a class token and background color.
- The external legend is not programmatically associated with cells.
- A user navigating the table through a screen reader receives blank data cells.
- Color is the only cell-level availability evidence.
- No contrast, grayscale, forced-color, stylesheet-disabled, or print behavior is checked.
- The final solution includes a blank row whose `td` elements lack the required availability class; the tests ignore it because they only select rows serialized exactly as `sharp` or `half`.

### Data and selector defects

The six custom properties are named `--color0` through `--color5`, encoding palette order instead of semantic purpose. Each `.available-N` selector must reference its identically numbered variable, so the exercise is a mechanical six-line expansion. A changed maximum, non-linear scale, unavailable state, unknown value, or alternate palette requires rewiring the HTML class contract, stylesheet, legend, and tests.

The `sharp` and `half` row classes encode border style, not data meaning. Exact row-class selectors in one check ignore otherwise valid extra classes. The test called “all your td elements” only examines data cells under exact serialized row classes, creating a false positive for the unclassified final row.

The hard-stop gradient check parses an allowlisted string shape. In shorthand mode it checks two integer percentages per token but does not prove adjacent stops share boundaries, cover the range monotonically, or render six useful segments. No computed gradient, sampled color, legend label relationship, or changed palette is measured.

### Layout defects

The solution fixes the table at 32rem, gives the body `100vw` by `100vh`, and vertically distributes the table and legend. It has no responsive query, overflow strategy, long-label case, zoom evidence, or tablet/desktop test. `100vw` plus scrollbars and default behavior can create needless horizontal overflow. Fixed heights can clip text.

### Lab check audit

The 35 checks divide into:

| Check channel | Count | What it establishes | What it does not establish |
| --- | ---: | --- | --- |
| CSS parser/helper checks | 20 | named variables, selector strings, border references, and gradient text exist | computed values, valid token use, hard-stop rendering, contrast, cascade, theme behavior |
| Static DOM checks | 15 | one table, minimum rows/columns, class tokens, legend nodes, and supplied text exist | caption, header associations, non-color values, changed data, reflow, accessibility |

There are zero computed-style, geometry, responsive, interaction, accessibility API, mutation, diagnosis, explanation, correction, or transfer checks. An empty independent editor does not make this independent mastery.

## Review and quiz audit

The review repeats the lecture definitions and one hover-only registered-angle gradient. It has no retrieval prompt, prediction, editable fault, changed case, feedback, or correction path. It again labels a `var()` argument simply as “Fallbacks” without distinguishing missing custom property, guaranteed-invalid value, invalid consuming declaration, or registered initial value.

The quiz contains two 20-item pools and requires 18 correct responses. The pools heavily duplicate declaration syntax, `:root`, `var()`, `@property` descriptor recall, theme-class overrides, fallback slogans, and gradient terminology. Problems include:

- calling registered `initial-value` “the fallback value” in one answer;
- saying a custom property declared inside a no-longer-matching media query is “no longer available,” rather than tracing the newly winning, inherited, initial, or guaranteed-invalid result;
- claiming a `var()` fallback guarantees a valid receiving value whenever a custom property is undefined while never testing a defined-but-invalid substitution;
- treating old-browser support as a timeless fact without a versioned matrix;
- saying any property can change using a custom property without requiring the substituted tokens to satisfy the receiving grammar;
- testing `@property` animation benefit without asking for typed interpolation, invalid syntax, inheritance, initial behavior, or reduced motion;
- including gradient questions that do not assess custom-property reasoning.

All 46 lecture and quiz prompts are selected-response recall or single-trace questions. None requires browser evidence, a causal explanation, an alternate correct design, correction, or transfer.

## Combined evidence audit

Across the workshop and lab, the 420 implementation checks divide exactly into:

| Check channel | Count |
| --- | ---: |
| CSS parser/helper checks | 305 |
| Static DOM checks | 105 |
| Source/comment regular-expression checks | 10 |
| Computed-style checks | 0 |
| Geometry, overflow, or responsive behavior checks | 0 |
| Interaction or preference checks | 0 |
| Accessibility API or human-task checks | 0 |

The 46 question prompts do not fill these gaps. Step count, source bytes, and repeated declarations are inventory, not mastery evidence.

## Exact bounded candidate maps

### `lecture-working-with-css-variables`

- `css-custom-properties-fallbacks`;
- `css-registered-custom-properties`;
- `css-design-tokens-theming`;
- `css-gradients-background-images`;
- `css-transitions-state-change`;
- `responsive-media-query-model`.

### `workshop-city-skyline`

- document shell, language, character encoding, title, file path, and stylesheet-loading contacts;
- type/class/ID selectors and selector lists;
- box model, border-box sizing, intrinsic/extrinsic sizing, percentages, viewport units, and overflow;
- color and gradient construction;
- Flexbox container, direction, wrapping, and alignment contacts;
- normal flow and positioned layout contacts;
- unregistered custom properties and deficient theme-token contact;
- media-query model contact.

It receives no registered-property, content-derived-breakpoint, accessible-theme, changed-case, debugging, or transfer credit.

### `lab-availability-table`

- document shell, language, character encoding, title, viewport, path, and stylesheet-loading contacts;
- table purpose, structure, and deficient header-association contact;
- selectors, pseudo-classes, box/sizing/units, borders, colors, contrast/non-color, gradients, and Flexbox contacts;
- unregistered custom properties and deficient token-system contact.

It receives no accessibility, responsive, registered-property, changed-case, debugging, or transfer credit.

### `review-css-variables`

- unregistered and registered custom properties;
- theme-token, gradient, and transition contact.

### `quiz-css-variables`

- unregistered and registered custom properties;
- theme-token, gradient, transition, and media-query contact.

Every map records source contact, including deficient contact. It is not a completeness or approval claim.

## Target learning progression

The target sequence enters after cascade, inheritance, values, color, gradients, preferences, and basic responsive conditions. It uses a cumulative introduce-model-guided-faded-debug-retrieve-assess-transfer progression.

### 1. Prediction studio: cascading token streams

Learners annotate a small component tree and predict custom-property specified values before running it. Cases include local override, inheritance, no declaration, CSS-wide keywords, nested fallback, case-sensitive names, and one dependency cycle. The editor shows matched declarations, winning custom-property values, the consuming declaration, computed output, and a causal trace.

### 2. Worked model: missing is not invalid

A worked example contrasts:

- missing unregistered property with a `var()` fallback;
- guaranteed-invalid value;
- defined token stream valid for one property but invalid for another;
- nested fallback;
- an invalid consuming declaration's inherited or initial result.

Prediction occurs before browser evidence. The learner explains why the fallback did or did not run.

### 3. Guided workshop: museum wayfinding tokens

A local museum needs a wayfinding panel with semantic surface, text, accent, warning, spacing, radius, and measure roles. Learners first remove duplicated literals, then scope component defaults, add a high-contrast-safe default, and implement an explicit light/dark preference contract. The workshop fades from named edits to stakeholder invariants.

The scenario has semantic content and user tasks. It is not a decorative skyline. Theme changes never hide content, change meaning, or depend on viewport width.

### 4. Registration lab: typed status meter

Learners register a bounded percentage or angle, compare it with an unregistered value, and inspect interpolation. They test missing `syntax`, missing `inherits`, dependent initial values, invalid typed declarations, inheritance true/false, and duplicate registration boundaries. Reduced motion and an unregistered usable baseline remain required.

### 5. Debugging clinic: the fallback that never ran

An intentionally broken component contains:

- a misspelled custom-property name;
- a cycle;
- a defined color token used as a length;
- a registered value that resolves to its initial value rather than the `var()` fallback;
- a cascade override in the wrong scope;
- one `transition: all` motion defect.

Learners classify each failure layer, predict the computed result, repair one cause at a time, and verify a changed case.

### 6. Independent lab: conservation condition report

A fictional museum conservation team needs a responsive condition report for exhibit cases. Supplied HTML and data contain temperature, humidity, light, and inspection status as visible text. Learners design semantic tokens, component-local defaults, one typed bounded indicator where justified, preference-aware themes, forced-color behavior, print output, and long-label resilience.

This is not a schedule heatmap. Cells are never empty color swatches; meaning remains in text and relationships. Learners choose whether table, list, or cards best fit each relationship and defend the choice.

### 7. Retrieval, delayed assessment, and transfer

Later Grid, animation, and certification projects retrieve tokens without re-teaching syntax. Delayed items alter scope, registration, preference, and component context. Transfer requires a new stakeholder artifact and a defense of which values should remain literal, become component properties, or become system-level semantic tokens.

## Required behavior evidence

Each learner must provide:

1. specified and computed custom-property traces for inherited, local, missing, invalid, and cyclic cases;
2. consuming-property computed results with an explanation of fallback behavior;
3. one semantic token inventory with owners, allowed values, and non-goals;
4. default, explicit preference, system preference, unsupported preference, and partial-theme results;
5. valid and invalid `@property` registrations with rule-validity evidence;
6. typed interpolation and interrupted-transition evidence;
7. reduced-motion behavior and an unregistered usable baseline;
8. long content, new component, missing token, changed scope, and changed value-type cases;
9. contrast, forced-color, print, zoom, tablet, and desktop results;
10. one diagnosed injected failure, repair, retest, and causal explanation;
11. delayed retrieval and an independent design defense.

Canonical hidden cases and answer models remain server-side.

## Accessibility, responsive, and preference gates

Token reuse cannot substitute for accessible outcomes. The target verifies:

- semantic content and state remain present without CSS;
- color never carries status or scalar value alone;
- text, component, and focus contrast use actual rendered colors;
- native controls and form states remain usable under every supported theme;
- `color-scheme` and browser-controlled UI are coherent with authored themes;
- forced colors are not defeated by decorative tokens;
- keyboard, pointer, touch, screen-reader, zoom, and text-spacing tasks pass;
- no viewport width silently changes an unrelated user preference;
- responsive overrides change semantic tokens only when the content constraint requires it;
- long labels, missing tokens, partial overrides, and new components do not expose unreadable literals;
- print retains labels, values, references, and state meaning.

Automated checks are necessary but incomplete. Observed representative-user tasks remain required.

## Hint and correction constraints

Hints never reveal the final token name, scope, registration, or value. They progress through:

1. restating the failed invariant;
2. identifying declaration, cascade, inheritance, substitution, consuming grammar, registration, interpolation, preference, or rendering as the failure layer;
3. showing current matched and computed evidence;
4. asking for a predicted next result;
5. introducing one smaller counterexample;
6. pointing to a paraphrased primary rule;
7. showing an analogous example from another component.

A correct declaration string cannot bypass changed cases. Repeated failure routes to a smaller contrast task and returns to the original artifact after a fresh prediction.

## Originality and duplication constraints

LEARN-IT-ALL must not reuse or lightly rename:

- a city skyline, its 115-step order, buildings, windows, spacer divs, gradients, border shapes, or day/night viewport switch;
- an availability schedule, empty colored cells, `available-0` through `available-5`, `--color0` through `--color5`, `sharp`/`half` rows, or hard-stop legend recipe;
- the source lectures, prompts, review, hints, checks, seeds, solutions, or wording;
- a theme example consisting only of background/text swaps;
- a missing-variable example whose fallback is never exercised;
- declaration presence, a changed screenshot, or an empty editor as mastery evidence;
- numbered tokens without semantic ownership;
- a viewport width standing in for a user preference.

Automated semantic similarity audits catch obvious overlap. Independent reviewers decide whether scenario, reasoning, sequence, starter, evidence, and solution are genuinely different.

## Release gates

This family remains `candidate-review`. Publication is blocked until:

- subject review verifies every custom-property, registration, cascade, invalid-value, animation, preference, and support claim;
- the new 102-concept CSS graph and prerequisite order pass;
- exact source maps and original activity matrices pass instructional review;
- specified, computed, changed-case, theme, preference, motion, accessibility, responsive, and print tests pass;
- alternate correct token architectures and registrations pass without string allowlists;
- canonical checks remain server-side and learner code remains sandboxed;
- tablet and desktop editor/preview flows pass keyboard, touch, zoom, forced-color, and assistive-technology review;
- representative learners complete, diagnose, correct, retain, and transfer the skills;
- subject, instructional-design, assessment, accessibility, security, and duplication reviewers approve.

Generated artifacts and step counts are inventory, not proof.

## Inspection outcome

After this wave, the candidate alignment contains:

- 142 agent-inspected source blocks;
- 1,320 inspected source challenges;
- 1,252 captured question prompts in inspected blocks;
- 4,403 inspected implementation checks;
- 145 block-specific candidate mappings;
- 12 uninspected source blocks with exact evidence and zero guessed concepts;
- one unavailable assessment container with zero concept claims;
- 16 total source blocks still requiring challenge-level inspection;
- 185 target concepts: 83 HTML/tooling and 102 CSS/responsive/design;
- seven explicit modern extensions and seven unresolved concepts.

The candidate research architecture consequently maps 145 source objectives into modules and retains 13 source identities in the explicit non-specific inventory, including the unavailable assessment container.

These are research facts, not learner content. Independent reviews, original authoring, runtime and grading implementation, learner observation, repair, and re-test remain blocking.
