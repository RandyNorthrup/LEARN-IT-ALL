# Responsive Web Design Book Inventory lab source inspection

Reviewed: 2026-07-16

Status: complete direct inspection; candidate curriculum evidence only

## Decision

The pinned Book Inventory lab is inspected requirement by requirement, check by check, and solution by solution. It contains one 28,308-byte challenge with 17 user stories and 53 implementation checks. It asks for an empty-start HTML table and repeated attribute-selector styling, but it does not establish independent attribute-selector mastery, accessible table competence, responsive behavior, changed-case reasoning, or transfer.

The prior candidate bundle incorrectly credited this block with `css-changed-case-regression` and `css-independent-transfer-defense`. Those credits are removed. No check mutates class order, inserts a new state, changes a rating, changes data length, adds a near-match token, measures behavior, inspects accessibility, or asks for a design defense. An empty editor is not automatically independent practice, and a lab label is not transfer evidence.

The source remains useful as benchmark evidence for contact with:

- one heading and a one-dimensional record list represented as a five-column table;
- `thead`, `tbody`, `tr`, `th`, and `td` structure;
- classes representing reading state and rating tokens;
- exact serialized-class, prefix, and whitespace-token attribute selectors;
- descendant, child, selector-list, and structural pseudo-class combinations;
- borders, gradients, sizing, padding, margins, display, typography, and color-based state presentation.

LEARN-IT-ALL will not publish a renamed book table. The independent lab defined by the Attribute Selectors sequence uses a different stakeholder, dataset, starter boundary, semantic decisions, changed cases, accessibility tasks, and evidence model. Learners must define a stable attribute contract, predict matched sets, inspect actual matches, preserve table relationships, communicate status and rating without color alone, survive hidden mutations, and defend their choices.

## Exact source boundary

The inspection covers this source at freeCodeCamp commit `c115efdd41f868d8850156f6a7a211219c35a847`:

| Source block | Type | Challenges | User stories | Implementation checks | Source bytes |
| --- | ---: | ---: | ---: | ---: | ---: |
| `lab-book-inventory-app` | lab | 1 | 17 | 53 | 28,308 |

Pinned challenge identity: `66a207974c806a19d6607073`.

Pinned relative path: `curriculum/challenges/english/blocks/lab-book-inventory-app/66a207974c806a19d6607073.md`.

Pinned SHA-256: `61874e09821c652ca422c8459f2240b534e3891f56d1ebd37331355bfe3a1cb4`.

The source contains description, hints, seed, and solutions sections with HTML, CSS, JavaScript checks, and plain text. `references/freecodecamp-rwd-v9.json` remains the exact evidence record for source identity, order, paths, hashes, bytes, sections, checks, and languages.

Direct inspection is not technical authority or course approval. It does not prove that the source is correct, original for LEARN-IT-ALL, instructionally sufficient, accessible, responsive, maintainable, secure, assessment-valid, retained, transferable, or successful with learners.

## Current primary evidence

The replacement remains bounded by:

- [Selectors Level 4](https://www.w3.org/TR/selectors-4/), W3C Working Draft dated 22 January 2026, for exact, token, prefix, structural, selector-list, specificity, parsing, and matching behavior;
- [HTML Living Standard tables](https://html.spec.whatwg.org/multipage/tables.html), last updated 15 July 2026 during review, for the table grid, captions, row groups, rows, header cells, data cells, and header-association algorithms;
- [HTML `meter`](https://html.spec.whatwg.org/multipage/form-elements.html#the-meter-element) for a scalar measurement in a known range and the requirement to preserve a textual representation for non-supporting user agents when the element is chosen;
- [WAI Tables Tutorials](https://www.w3.org/WAI/tutorials/tables/) for caption, simple header, irregular header, and multi-level association guidance;
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/) for information and relationships, meaningful sequence, use of color, text and non-text contrast, reflow, text spacing, keyboard access where interaction exists, and visible focus where controls are added;
- current CSS Display, Box Model, Sizing, Values and Units, Backgrounds and Borders, Images, Fonts, Color, and Overflow specifications for presentation behavior.

The HTML Standard defines a table as data with more than one dimension and requires its cells to cover the grid without overlap. WAI guidance makes header direction explicit for ambiguous or larger tables. The `meter` element may represent a rating only when it is a scalar value inside a known range; it is not a progress bar, and visible text remains necessary. These semantics constrain possible target solutions, but the learner must still choose and justify the simplest appropriate representation.

## Requirement-by-requirement findings

### Stories 1–3 establish only a visual title and table skeleton

The lab requires one `h1` with exact text, a table with columns named Title, Author, Category, Status, and Rate, and at least four total rows. This creates a plausible data-table scenario. It leaves several important decisions untested:

- no `caption` is required, so the table lacks its own programmatic title and context when encountered out of surrounding reading order;
- “at least four rows” includes the heading row, so only three data records are necessary;
- the tests require one `thead` and one `tbody`, five `th` elements, and five children per body row, but never inspect the table model or malformed spans;
- headings are checked by their global `th` order, not by their relationship to this table or their `scope`;
- no row headers are considered even though a book title can be the natural row identifier;
- no missing value, long value, duplicate title, translated header, multiple author, or changed column case is exercised;
- the source does not ask what tasks a reader needs to complete or whether a table is the best representation at narrow size.

The target lab starts from stakeholder questions and data relationships. A learner must explain why the artifact is a data table, supply its caption, choose row and column headers, inspect representative associations, and pass a changed dataset.

### Story 4 uses the first class token as hidden application state

Each body row must have `read`, `to-read`, or `in-progress`, and the check examines `classList[0]`. This turns class serialization order into application data. It also creates a contradiction with later exact selectors:

- the row test accepts an extra class after the first token;
- `tr[class="read"]` rejects that same row as soon as an extra class exists;
- a refactor that places a component class first fails the state test even though the intended state token remains;
- a state such as abandoned, paused, unavailable, or lent cannot enter without changing hard-coded stories and tests;
- CSS class names carry the data model, but the source never asks whether a standard semantic, private `data-*` value, class, or application record is the stable contract.

The target requires an explicit state model. Learners compare `.read`, `[class~="read"]`, `[class="read"]`, and a justified private state attribute over reordered and extended class lists. They must preserve visible state text and keep the record meaningful without CSS.

### Stories 5–7 duplicate status text and encode ratings as empty decoration

The Status cell must contain a `.status` span whose text agrees with the row class. This at least preserves visible text, so the state is not conveyed by color alone. But two separate sources of truth can diverge. The checks compare each supplied status label with the row class in one static DOM; they do not mutate state or require an update mechanism that keeps both representations consistent.

The Rate cell must contain `.rate` wrapping three empty spans. Read rows add a second class token of `one`, `two`, or `three`, and the value must follow `rate`. The visual solution fills empty circles with gradients. This is not a robust rating representation:

- an empty span has no inherent rating meaning;
- sighted users infer the number only from how many circles have a different gradient;
- class words and child positions encode the value without visible numeric text;
- the class order is part of the hidden contract;
- no accessible name, scalar value, text alternative, or stylesheet-disabled rating is required;
- rating is present only for read rows, but the lab does not define whether unrated and not-applicable are different states;
- three is hard-coded as the maximum and cannot change without markup, selectors, tests, and visual assumptions;
- the source never tests a zero rating, invalid value, partial rating, or localization.

The target makes the scalar value visible and programmatically determinable. Depending on the authentic task, a learner may choose plain text, text plus decorative stars, or a properly labeled `meter` with `min`, `max`, `value`, and textual content. Decorative shapes must be excluded from the accessibility tree without hiding the actual value. The decision and its evidence are graded, not one mandated element string.

### Stories 8–12 prescribe exact serialized-class selectors and gradients

Three row selectors must be exactly `tr[class="read"]`, `tr[class="to-read"]`, and `tr[class="in-progress"]`. Three more descendant selectors must exactly combine those row selectors with `span[class="status"]`. Each gets a gradient and borders.

This is poor independent-practice evidence because the user stories dictate the selector operands, attribute, value, relationship, and property family. The learner selects little. The exact serialized-class contract is unusually brittle and conflicts with the earlier allowance for extra row classes.

The checks use CSS parser helpers to find the requested selector text and declarations. They do not establish:

- which elements the selector actually matches in the learner DOM;
- whether another correct selector expresses the intended contract;
- whether additional classes, reordered tokens, or repeated whitespace break styling;
- whether a typo produces a false match or a missing match;
- whether the declared gradient becomes the computed background;
- whether text and component contrast pass over the actual gradient;
- whether the distinction survives forced colors, grayscale, printing, or background-image failure;
- whether the status label and row state remain synchronized.

Target grading first checks the intended matched set and counterexamples, then the computed property behavior, then the human-visible and accessibility result. A source selector string alone is never sufficient.

### Story 13 couples status and rating through serialized class prefixes

The lab requires a selector list for `span[class="status"]` and `span[class^="rate"]`, then fixed height, width, and padding. Only the two requested selector-list orders are accepted.

`[class^="rate"]` operates on the raw serialized attribute, not the class-token list. It matches only when `rate` begins the string. The lab explicitly requires `rate` to be the first class to make the prefix selector pass. This teaches authors to arrange class text around CSS coincidence rather than choose a token or class selector that expresses the intended invariant.

The target changes class order and adds a component token after the first passing run. Learners must predict which selectors survive and repair the hook. Selector-list order should not matter, whitespace and formatting should not be overprescribed, and a correct alternative should pass behavior checks.

Fixed `height: 1.85em` and `width: 7em` also risk clipping longer status text, larger text spacing, translated labels, or a different font. No bounding-box or overflow check exists. Target status indicators use content-driven sizing, min/max constraints only when justified, and actual reflow/overflow evidence.

### Story 14 creates decorative circles through child structure

The required selector targets direct children of a span whose serialized class starts with `rate`, then mandates border, radius, margin, height, width, and background color. This exercises child combinators and presentation properties. It does not ask whether empty children are the appropriate markup or whether generated decoration could reduce DOM noise.

The solution gives each child percentage width and full height inside a fixed box. The test checks declaration presence only. It does not inspect the actual number of visible circles, the computed dimensions, wrapping, overflow, or touch and zoom behavior.

The target separates data from decoration. If shapes are decorative, their DOM or generated-content representation cannot become the only rating evidence. If each shape is interactive, native controls, group naming, keyboard operation, focus, target size, selection state, and submitted data enter the prerequisite and grading contract.

### Stories 15–17 overprescribe structural selectors for one, two, and three

The final stories target the first child for rating `one`, the first two children for rating `two`, and every child for rating `three`. The checks allow long hard-coded lists of textual selector variants. They accept several descendant and child forms, `:first-child`, `:nth-child()`, `:first-of-type`, and `:nth-of-type()` combinations.

This still does not establish structural-selector understanding:

- the expected visual state is never measured;
- an inserted non-span child can change `:nth-child()` while leaving `:nth-of-type()` different;
- the learner is not asked to predict that difference;
- a fourth child or a changed maximum is not tested;
- `.one`, `.two`, and `.three` are English class tokens rather than numeric data;
- selector lists are compared against a finite string catalog instead of an actual matched set;
- no malformed or over-broad selector is rejected by a counterexample DOM;
- a learner cannot choose a simpler semantic representation.

Target practice supplies mixed child types, reordered decoration, changed maxima, and an explicit expected set. The learner predicts and inspects `:nth-child()` versus `:nth-of-type()`, but an independent rating task is graded on the scalar behavior and accessible value rather than on reproducing a star-fill recipe.

## Complete check audit

The 53 checks divide exactly into:

| Check channel | Count | What it establishes | What it does not establish |
| --- | ---: | --- | --- |
| DOM and text checks | 20 | exact heading, table shell, cell counts, class positions, child tags, empty spans, and supplied text consistency | table interpretation, caption, header associations, accessible rating, changed data, user task success |
| CSS parser/declaration checks | 33 | one of the allowlisted selector strings exists and named declarations contain nonempty or gradient values | actual matched set, cascade outcome, computed or used style, layout, contrast, accessibility, changed cases |
| Computed-style checks | 0 | nothing | actual cascade or rendering |
| Geometry/overflow checks | 0 | nothing | reflow, clipping, scroll behavior, text growth, responsive result |
| Accessibility API or task checks | 0 | nothing | name, role, value, header association, reading order, non-color meaning, assistive-technology use |

No check calls `getComputedStyle`, measures a bounding rectangle or scroll extent, changes a class token after initial load, adds a book, changes the rating maximum, removes background images, enables forced colors, prints, zooms, navigates a table with assistive technology, or asks for explanation.

Many checks require syntax more narrowly than the user goal. For example, the selector-list check accepts only two textual orders, and rating checks enumerate long selector catalogs. This creates false negatives for correct alternatives while still allowing false positives that never produce the intended behavior.

## Solution audit

The supplied solution adds a main landmark and overflow wrapper, which are not required by tests. It uses six book records, a full document shell, universal border-box sizing, Arial, a 100-viewport-width table, centered data, gradients for every row state, fixed status/rating boxes, empty circles, and class-order-dependent selectors.

### Useful contacts

- complete document seed with language, encoding, title, and linked stylesheet;
- a main landmark around the page content;
- table header and body grouping;
- visible status words matching the state;
- horizontal overflow containment rather than letting the whole page expand;
- border-box sizing in the supplied solution;
- multiple selector operators and structural combinations.

### Production defects and omissions

- the table has no caption;
- column headers lack explicit `scope="col"` despite ambiguous record data and a table larger than the WAI small-simple exception;
- title cells are plain `td` values rather than considered row headers;
- rating is conveyed through colored empty spans with no text value;
- exact class selectors break on a harmless additional class;
- prefix matching depends on `rate` being serialized first;
- `width: 100vw` inside a body with default margins can produce unnecessary overflow and ignores the wrapper's available inline size;
- horizontal scrolling is not accompanied by focusable-region or narrow alternative decisions;
- fixed status dimensions can clip long or translated labels;
- colors and gradients are arbitrary and unmeasured;
- row state is heavily color-coded, while the visible status cell helps only after the user reaches it;
- numeric rating distinction is color/fill only;
- no forced-colors, print, high-contrast, background-image failure, zoom, or text-spacing behavior exists;
- no sorting, filtering, editing, persistence, data validation, or application behavior exists despite the title calling it an app;
- no hidden dataset or mutation establishes generalization.

The target must use “app” only when real application behavior exists. A static table may be a table exercise; it should not be marketed as an application.

## Why this is not independent transfer

An empty editor reduces copying from a starter, but independence requires more:

- a learner must interpret a functional requirement rather than reproduce named selectors;
- the task must differ meaningfully from its guided workshop;
- the learner must choose structure, state model, hook, and test strategy;
- hints cannot encode the entire solution sequence;
- hidden changed cases must reject overfit code;
- correctness must include behavior and accessibility, not requested strings;
- a learner must diagnose failure and defend the final design;
- delayed evidence must show the skill persists outside the immediate lesson.

This source gives 17 stories that prescribe the output structure and most selector forms, followed by checks that reveal exact accepted strings. It has no prediction, explanation, mutation, diagnosis, delayed retrieval, or defense. Therefore neither `css-changed-case-regression` nor `css-independent-transfer-defense` belongs in its source map.

## Exact bounded candidate map

The lab receives only these concept contacts:

- `html-heading-hierarchy`;
- `html-tables-purpose`;
- `html-table-structure`;
- `html-table-header-associations`;
- `css-application-and-loading`;
- `css-type-class-id-selectors`;
- `css-selector-lists-combinators`;
- `css-attribute-selectors`;
- `css-pseudo-classes`;
- `css-outer-inner-display`;
- `css-box-model-areas`;
- `css-box-sizing-models`;
- `css-intrinsic-extrinsic-sizing`;
- `css-absolute-font-relative-viewport-units`;
- `css-backgrounds-borders-shadows`;
- `css-gradients-background-images`;
- `css-font-stacks-generic-fallbacks`;
- `css-contrast-noncolor-meaning`.

This map records source contact, including deficient contact. It does not credit full instruction, accessibility, behavior, changed-case regression, independent transfer, or approval.

## Target independent-lab contract

The Attribute Selectors inspection already defines the independent scenario: an accessible equipment-loan inventory. This source audit tightens its contract.

### Stakeholder and tasks

A community accessibility center tracks loanable devices. Staff need to answer:

- which device is available, on loan, reserved, or under maintenance;
- which category and compatibility information applies;
- when the current state last changed;
- whether a scalar condition score is present, absent, or not applicable;
- which records need action without relying on color;
- whether the inventory remains usable with long product names and localized labels.

This is different from books, reading progress, and personal ratings.

### Learner choices

The learner must decide:

- table versus another record presentation and the narrow-view strategy;
- caption, row header, column headers, groups, and missing-value representation;
- standard semantics versus private application state;
- a stable selector contract for state and tokens;
- whether condition is plain text or a known-range scalar measurement;
- how color, icon, shape, and text cooperate;
- how to test class reorder, added tokens, new records, locales, and changed maximums;
- whether interaction is needed; if so, which native controls and status announcements are required.

The rubric accepts multiple defensible implementations. Canonical behavior and hidden cases remain server-side.

### Required evidence

The learner submits:

1. a brief data and selector contract naming accepted and rejected values;
2. matched-set predictions before first run;
3. parsed DOM and table-grid evidence;
4. representative row and column header associations;
5. actual matches after hidden class and state mutations;
6. cascade provenance and computed result for one status treatment;
7. visible and programmatic scalar or textual condition evidence;
8. non-color, contrast, forced-color, background-image-disabled, and print results;
9. bounds and overflow results under long text, zoom, tablet, and desktop sizes;
10. a correction after one injected selector or association defect;
11. a written defense of the stable hook and narrow-layout choice.

### Hidden changed cases

Server-side cases include:

- a component class inserted before the state class;
- a second harmless class token;
- a state token with a near-match substring;
- a fourth legitimate state;
- a zero condition score and an absent condition score;
- a rating or condition maximum changed from three to five;
- a record with a long localized device name;
- reordered columns;
- an extra decorative child inside the visual indicator;
- disabled background images and forced colors;
- 200% and 400% zoom;
- tablet and desktop layouts;
- print output;
- an invalid table association injected for diagnosis.

Overfit selector strings fail these cases even if the initial screenshot looks right.

## Pedagogical relationship to the guided workshop

The guided service-status workshop teaches the process with progressive support. The equipment-loan lab changes:

- stakeholder;
- data domain;
- record structure;
- supported states;
- scalar data question;
- starter markup;
- required table reasoning;
- mutation set;
- responsive decision;
- expected evidence;
- design defense.

It retrieves the same core attribute contracts without copying layout, content, selectors, tests, or solution. Guidance is faded: learners receive user tasks and evidence requirements, not selector recipes.

## Hint and correction constraints

Hints cannot enumerate accepted selector strings. They progress through:

1. restating the stable data invariant;
2. asking whether the attribute is raw text, a token list, or a semantic state;
3. showing the learner's predicted and actual stable IDs;
4. identifying parsing, matching, cascade, table, rating, or layout as the failure layer;
5. exposing one counterexample mutation;
6. pointing to a paraphrased primary rule;
7. showing an analogous, different-domain worked example.

A failed hidden case requires a new prediction and repair. Repeated attempts without diagnosis route to a smaller contrast activity. A correct initial source string does not bypass changed-case evidence.

## Accessibility verification

Automated checks are necessary but incomplete. The lab requires:

- caption and header-association inspection;
- screen-reader table navigation with representative supported combinations;
- useful status and scalar announcements;
- stylesheet-disabled and background-image-disabled meaning;
- no color-only state or rating;
- actual text, non-text, and focus contrast where interaction exists;
- keyboard operation and focus order if sorting, filtering, or editing is implemented;
- no unexpected focus target for a static scroll wrapper;
- a discoverable scroll region or a better narrow alternative when horizontal overflow remains;
- text-spacing, zoom, reflow, forced-color, and print checks;
- long and translated content;
- announced update status when state changes dynamically;
- touch targets on supported tablet interactions.

An accessibility API snapshot does not replace task observation. A screen-reader test does not replace visual, keyboard, touch, zoom, or cognitive review.

## Responsive verification

The source's `width: 100vw` and overflow wrapper are not responsive proof. Target evidence records:

- available container size rather than device-name assumptions;
- table and page scroll widths;
- clipped or overlapping text;
- status wrapping and row height;
- sticky or fixed behavior only if justified elsewhere;
- whether headers remain associated in any alternative layout;
- zoom and text-spacing results;
- tablet portrait and landscape;
- supported desktop widths;
- phone-usable public guidance and handoff, while the coding studio retains its supported larger-screen boundary;
- print output without missing status or rating information.

The learner may preserve a horizontally scrollable semantic table for some datasets if it remains understandable and operable. They may instead offer a separate record view. Merely changing table descendants to `display: block` is not accepted if it destroys relationships.

## Assessment validity

The target lab cannot become credential evidence until pilots measure:

- requirement clarity;
- time and difficulty;
- success without solution-pattern copying;
- false-positive and false-negative grading;
- alternate-correct-solution acceptance;
- counterexample discrimination;
- hint dependence;
- correction success;
- delayed retention;
- transfer into a later project;
- keyboard, screen-reader, low-vision, and tablet completion barriers;
- security and privacy of saved learner evidence.

Item and task results must lead to repair and re-test. A high completion percentage can signal a shallow rubric, not mastery.

## Originality and duplication constraints

LEARN-IT-ALL must not reuse or lightly rename:

- Book Inventory, its five columns, its six supplied titles, or its reading states;
- `read`, `to-read`, `in-progress`, `rate one/two/three`, or three empty rating spans;
- the 17 user-story order;
- the exact selector strings or accepted-selector catalogs;
- gradients and circles as the required evidence;
- the source hints, checks, seed, solution, or wording;
- another media inventory with three status rows and a three-dot rating;
- an empty editor as the sole claim of independence;
- declaration presence as behavior evidence.

Automated similarity audits catch obvious overlap. Independent instructional and subject reviewers decide whether scenario, reasoning, sequence, and evidence are genuinely different.

## Release gates

This block remains `candidate-review`. Publication is blocked until:

- source freshness and subject review pass;
- the exact concept map and prerequisite order pass;
- the guided-to-independent fade is reviewed;
- original content and duplication review pass;
- matched-set, mutation, computed behavior, table, rating, responsive, and accessibility tests pass;
- sandbox, canonical-answer, persistence, and privacy review pass;
- alternate correct solutions and hidden cases are calibrated;
- tablet, desktop, zoom, forced-colors, print, keyboard, and assistive-technology flows pass;
- representative learners complete the task, repair failures, and retain the skill later;
- subject, instructional-design, assessment, accessibility, security, and duplication reviewers approve.

Generated artifacts and test counts are inventory, not proof.

## Inspection outcome

After this wave, the candidate alignment contains:

- 132 agent-inspected source blocks;
- 1,162 inspected source challenges;
- 1,154 captured question prompts in inspected blocks;
- 3,875 inspected implementation checks;
- 137 block-specific candidate mappings;
- 20 uninspected source blocks with exact evidence and zero guessed concepts;
- one unavailable assessment container with zero concept claims;
- 26 total source blocks still requiring challenge-level inspection;
- 184 target concepts, including eight explicit modern extensions and six unresolved concepts.

The candidate research architecture consequently maps 137 source objectives into modules and retains 21 source identities in the explicit non-specific inventory, including the unavailable assessment container.

These are research facts, not learner content. Independent reviews, original authoring, runtime and grading implementation, learner observation, repair, and re-test remain blocking.
