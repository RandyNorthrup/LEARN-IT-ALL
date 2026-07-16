# Responsive Web Design CSS Grid source inspection

Reviewed: 2026-07-16

Status: complete direct inspection; candidate curriculum evidence only

## Decision

All six pinned CSS Grid blocks are inspected challenge by challenge, prompt by prompt, check by check, and solution by solution. The family contains 91 challenges, 67 question prompts, 284 implementation checks, and 763,902 source bytes. Most bytes repeat the cumulative state of one 79-step magazine.

The source contacts Grid containers, tracks, lines, cells, gaps, explicit and implicit grids, fractional sizing, `repeat()`, `minmax()`, auto-placement, line placement, named areas, alignment, media conditions, and developer tools. It still lacks a bounded Grid-specific alignment concept. The existing graph contains Flex alignment and subgrid alignment, but neither models the shared Box Alignment properties as they apply to grid items, grid areas, and the grid track collection. `css-grid-alignment-distribution` is therefore added as a distinct benchmark-contact concept.

The candidate matrix is narrowed block by block. The debugging lecture loses unsupported `css-changed-case-regression` credit because it contains three recall prompts and no defect investigation, changed case, correction, or retest. The quiz receives bounded contact for `responsive-grid-auto-fit-fill` because it explicitly asks about `auto-fit`; that concept leaves the unresolved list, while the newly uncredited changed-case concept enters it, so the honest unresolved total remains seven. No block receives causal-debugging, responsive, accessibility, retention, or transfer credit from its label, quantity, screenshot, or declaration strings.

LEARN-IT-ALL will not publish a renamed magazine, newspaper, “holy grail” layout, social-icon strip, or fixed breakpoint trace. The target sequence teaches track sizing, placement, alignment, source order, overflow, intrinsic responsiveness, and causal debugging through prediction, Grid overlays, computed and geometric evidence, varied original artifacts, hidden mutations, correction, delayed retrieval, and independent defense.

## Exact source boundary

The inspection covers these sources at freeCodeCamp commit `c115efdd41f868d8850156f6a7a211219c35a847`:

| Source block | Type | Challenges | Question prompts | Implementation checks | Source bytes |
| --- | ---: | ---: | ---: | ---: | ---: |
| `lecture-working-with-css-grid` | lecture | 8 | 24 | 0 | 43,721 |
| `workshop-magazine` | workshop | 79 | 0 | 257 | 681,315 |
| `lab-newspaper-layout` | lab | 1 | 0 | 27 | 14,388 |
| `lecture-debugging-css` | lecture | 1 | 3 | 0 | 4,863 |
| `review-css-grid` | review | 1 | 0 | 0 | 4,924 |
| `quiz-css-grid` | quiz | 1 | 40 | 0 | 14,691 |
| **Total** |  | **91** | **67** | **284** | **763,902** |

The pinned snapshot records every challenge ID, path, SHA-256 hash, byte count, section, language, check count, and quiz count. Direct inspection is not technical authority or approval. It does not prove that the source is correct, sufficient, original for LEARN-IT-ALL, accessible, responsive, assessment-valid, retained, transferable, or successful with learners.

## Current primary evidence

The replacement is bounded by:

- [CSS Grid Layout Module Level 2](https://www.w3.org/TR/css-grid-2/), Candidate Recommendation Draft dated 26 March 2025, for grid containers and items, explicit and implicit tracks, intrinsic and flexible sizing, line and area placement, auto-placement, ordering, alignment integration, overflow, repeat-to-fill, and subgrid;
- [CSS Box Alignment Module Level 3](https://www.w3.org/TR/css-align-3/), Working Draft dated 30 January 2026, for alignment subjects and containers, self and content alignment, logical axes, baseline, distribution, gaps, overflow safety, and fallback behavior;
- [Chrome DevTools CSS reference](https://developer.chrome.com/docs/devtools/css/reference), current official vendor documentation reviewed 16 July 2026, for matched, overridden, inactive, and computed declarations; Grid overlays and editors; box geometry; responsive emulation; contrast; and accessibility inspection;
- [W3C CSS Validation Service documentation](https://jigsaw.w3.org/css-validator/about.html.en), reviewed 16 July 2026, for validation by input, file, or URL and for the service's explicit warning that specifications—not validator software—are the authority;
- current HTML, WCAG 2.2, Sizing, Values and Units, Overflow, Media Queries, responsive, typography, images, and font-loading evidence already registered in the dossier.

Grid's `fr` unit distributes leftover space after non-flexible tracks, gaps, and constraints; equal `fr` factors do not erase automatic minimum contributions. Percentage tracks plus gaps can exceed the grid container. In `minmax(min, max)`, a flexible value is not valid as the minimum. Negative line indices count from the explicit grid, not an arbitrarily extended implicit grid. Auto-placement and dense packing are visual placement mechanisms, not a license to contradict meaningful source or focus order. `auto-fit` and `auto-fill` differ when empty repeated tracks exist. Grid item alignment and grid-content distribution move different subjects.

These models constrain the target teaching and hidden cases. A tool screenshot or valid property string cannot replace them.

## Eight-lecture audit

### Grid versus Flexbox

The opening lecture correctly introduces Grid as two-dimensional and Flexbox as one-dimensional in their primary models. It overstates the distinction by calling Flexbox “content-first” and Grid “layout-first.” Both layout algorithms incorporate content contributions, intrinsic minimums, available space, and author constraints. The relevant question is which relationships and axes the component requires, not a slogan.

The example says three `1fr` tracks each take one third of available space. That is only safe in the simple demonstrated case after accounting for gaps and track minimums. Long unbreakable content, replaced elements, and automatic minimums can make equal-flex tracks visibly unequal or overflow.

The three questions test the one-versus-two-dimensional slogan, equal `fr` recall, and precise placement. No item count, content size, or container change is traced.

### Fractional tracks

The `fr` lecture first creates four `25%` columns plus three 15-pixel gaps. That exceeds the container; percentages do not subtract gaps. The refactor to four `1fr` tracks avoids that particular arithmetic because flexible tracks divide leftover space, but the lecture does not explain the overflow it created.

It says `fr` is a fraction of “the space for the grid container” and that four tracks take equal available space. It omits non-flex tracks, gaps, intrinsic contributions, automatic minimums, and the difference between a flex fraction and a simple percentage.

### Gaps

The gap lecture correctly distinguishes row, column, and shorthand gaps and notes that `normal` computes differently across layout modes. It reduces acceptable values to a short unit list and does not teach percentage-gap cyclic sizing, logical axes, used-value behavior, or the fact that gaps are fixed gutters rather than alignment distribution.

Its revised two-column example produces two rows only because there are four items; no changed item count checks the relationship.

### `repeat()`

The repeat lecture teaches fixed integer repetition and a repeated two-track pattern. It does not cover named lines, `auto-fill`, `auto-fit`, repeat restrictions, or how repeated tracks interact with minimums and available space. Those topics appear later only as one quiz item.

### Explicit and implicit grids

The explicit/implicit lecture correctly names `grid-template-*` and `grid-auto-*`. Its comparison table adds unsupported stereotypes:

- explicit grids are called rigid while implicit grids are called flexible;
- implicit grids are claimed easier for unstructured content;
- explicit grids are claimed potentially more performant because predefined;
- implicit grid creation is framed as extra browser computation without measured evidence.

Explicit tracks can be intrinsically flexible, and implicit tracks can be rigid fixed sizes. Performance depends on the actual document and engine; it is not a reason to select one model from this table.

The example also says only two explicit columns exist while all later rows are implicit. In Grid terminology the row axis has no explicit tracks, so the generated rows are implicit from the start; this deserves a two-axis trace rather than a loose table.

### `minmax()`

The lecture says minimum and maximum accept the same units after listing pixels, percentages, and `auto`. Grid grammar is more constrained: a flexible `<flex>` value is invalid as the minimum, while it is useful as a maximum. The lesson does not cover `minmax(0, 1fr)`, automatic minimums, min greater than max, intrinsic keywords, or overflow caused by an overly large minimum.

It calls `minmax()` more flexible and “ideal” for responsiveness without asking what constraint the minimum protects or whether that minimum fits the narrowest container.

### Line placement

The placement lecture covers positive lines, end-exclusive ranges, spans, and `-1`. It later calls a staggered fixed-row arrangement “masonry,” though it is manually placed Grid, not the evolving masonry layout model.

It does not distinguish negative lines in the explicit grid from implicit tracks, named lines, auto-placement collision, overlap, source order, focus order, or changed item insertion. The quiz later claims `grid-row: 1 / -1` spans all available rows, which is false when implicit rows extend beyond the explicit grid end.

### Named areas

The named-area lecture explains the string matrix and `grid-area` assignment. It does not teach that every named area must form one filled rectangle, how periods represent empty cells, what invalid templates do, or how responsive area rearrangement can contradict source and focus order.

The “holy grail” example uses generic `div` elements named header, sidebars, main, and footer instead of the semantic elements those labels imply. It describes the pattern as responsive without any changed layout or media condition.

## Debugging lecture audit

The debugging lecture lists DevTools, the element inspector, a validator, and device emulation. It includes a missing-semicolon example and three recall questions. It never asks the learner to open a tool, state a hypothesis, inspect a matched rule, compare specified and computed values, use a Grid overlay, identify the affected parse boundary, edit source, save, reload, or verify a changed case.

Specific overclaims include:

- calling tools a way to ensure stylesheets are “error-free and optimized”;
- presenting one validator as if it represented current CSS without its profile and legacy limitations;
- treating device emulation as evidence across devices rather than a bounded viewport and user-agent simulation;
- saying a validator reports the missing semicolon without explaining CSS parser recovery and which following declaration is consumed or lost;
- recommending live edits without distinguishing temporary DevTools state from saved source.

The W3C Validator's own documentation says it is software with bugs and legacy limitations and that specifications are authoritative. The target uses validation as one signal, not a correctness oracle.

Because this source has no investigation or changed case, it receives only `css-devtools-causal-debugging` contact and loses `css-changed-case-regression`.

## Complete 79-step magazine audit

All 79 step descriptions and 257 checks were inspected.

### Steps 1–24 build copied content before Grid begins

The first 24 steps create a magazine from a 2019 freeCodeCamp press release. They add three Google-hosted fonts, Font Awesome 5.8.2, a remote hero image, author and date, five icon-only social links, six long paragraphs about freeCodeCamp curriculum changes, a quotation, a history list, and three more remote images.

This material is stale, platform-internal copy of exactly the kind the learner-facing site must not contain. Claims about certification counts, projects, learning format, and versions are historical and unrelated to learning Grid. Learners spend almost one third of the workshop transcribing content and class names before creating a grid container.

Additional defects include:

- the above-the-fold hero is marked `loading="lazy"`, risking delayed largest-content rendering;
- external font and icon requests add availability, privacy, version, licensing, and performance dependencies without analysis;
- the social links contain only icon-font `i` elements and have no accessible names;
- visible icon identity depends on an old external Font Awesome stylesheet;
- `target="_blank"` behavior is prescribed without explaining new-context purpose or user need;
- image alternatives such as “image of” and “Cover Image” describe the medium rather than the useful content;
- content and assets are copied rather than original learner work.

### Steps 25–30 establish brittle global typography

The workshop resets every element and pseudo-element, then sets `html { font-size: 62.5%; }` so rem arithmetic resembles decimal pixels. This overrides the user's chosen base size and assumes a 16-pixel default. Accessible sizing should use rem relationships without shrinking the root to simplify mental arithmetic.

It loads named remote fonts, removes all link underlines, and provides no replacement affordance beyond color. No failure, privacy, font swap, long-text, or focus state is tested.

### Steps 31–53 teach a fixed magazine Grid

The main grid begins with `1fr 94rem 1fr`, then wraps each track in `minmax()` to make it “responsive on any device.” The center still has a 94rem maximum and the outer tracks have fixed 2rem minimums. No device, zoom, text, or overflow evidence supports the claim.

The sequence covers nested grids, repeated columns, line placement, `-1`, implicit columns, `grid-auto-flow: column`, `grid-auto-columns`, and item alignment. It is useful guided contact. It remains a declaration trace:

- learners do not draw tracks or predict occupied cells;
- no long item or extra social link is inserted and inspected;
- no Grid overlay or computed track list is used;
- the effect of automatic minimums is not examined;
- no writing mode or logical axis changes;
- no source-order versus visual-order case;
- no alignment subject is identified.

The source warns that `dense` may display items out of order but does not provide a task where learners must accept or reject it.

### Steps 54–75 leave Grid for copied presentation recipes

The workshop applies letter spacing, multi-column layout, justified text, a floated drop cap, borders, quote styling, pseudo-element quotation marks, list styling, colors, typography, image grids, gaps, and placement.

It explicitly notes that justified web text can create accessibility problems for people with dyslexia, then immediately requires `text-align: justify` “to look like a printed magazine.” That is not an acceptable teaching pattern. A known barrier should be rejected or tested against a documented user need, not required for imitation.

The only link state is hover. There is no visible focus requirement. Generated quotation marks, icon fonts, remote fonts, and presentation are never tested without CSS or external resources.

Step 72 calls `2fr 1fr` columns “fixed width based on the container.” Flexible tracks are not fixed widths. Step 43 says `object-fit` positions content; `object-fit` controls fitting, while `object-position` controls positioning within the replaced-element box.

### Steps 76–79 add fixed responsive patches

Four `max-width` media queries at 720, 600, 550, and 420 pixels collapse image/text grids and shrink type. No breakpoint is traced to a failing content invariant. The sequence is wide-first, not an intrinsic or narrow-first design. It never tests just below, at, above, or between boundaries; long headings; font failure; zoom; text spacing; orientation; tablet; desktop; or print.

The final “responsive” claim rests entirely on presence of prescribed media declarations.

### Magazine check audit

The 257 checks divide exactly into:

| Check channel | Count | What it establishes | What it does not establish |
| --- | ---: | --- | --- |
| CSS parser/helper checks | 113 | requested selectors and declaration strings exist | computed tracks, intrinsic sizing, placement, alignment, overflow, rendering |
| Static DOM checks | 144 | copied elements, classes, attributes, URLs, and exact text exist | semantic quality, accessible names, resource behavior, changed content, user tasks |
| Computed-style checks | 0 | nothing | winning rules and actual Grid behavior |
| Geometry/overflow checks | 0 | nothing | track and item boxes, clipping, reflow, breakpoint repair |
| Interaction/accessibility checks | 0 | nothing | focus, keyboard, links, assistive technology, preference behavior |

No check opens a Grid overlay, changes item count, inserts long content, removes an image, fails a font, follows a link, uses keyboard focus, changes a viewport, or diagnoses a defect.

## Newspaper lab audit

The lab contains 15 stories and 27 checks. It requires one exact three-column, four-row named-area layout for a newspaper with a title, feature story, secondary story, three small stories, and cover image.

### Overprescribed layout is not independent Grid design

The stories provide every area name, row arrangement, column count, equal fraction, row sizing, and content class. Learners implement one serialized visual matrix rather than derive layout from stakeholder tasks and content constraints. Alternate correct arrangements fail.

The source provides no narrow layout, media condition, source-order decision, missing-story case, added-story case, long headline, image failure, or print behavior. A three-column layout is required at every width.

### Content and accessibility defects

- The supplied news stories are generic filler and include health and volcano safety claims without sources or freshness boundaries.
- The figure has no `figcaption`.
- The image alternative is only “Cover Image.”
- The solution uses justified text again.
- Heading rank follows the supplied class hierarchy, but no article outline or navigation task is observed.
- Visual named-area rearrangement is not compared with reading or focus order.
- No links, dates, sources, correction notices, or publication context make it a credible newspaper.

### Image and sizing defects

The story requires `max-width: 100%`, but the solution also sets both width and height to 350 pixels without preserving intrinsic aspect ratio or using an appropriate fitting strategy. The fixed height can distort the volcano image. No geometry or resource-failure check catches it.

### Lab check audit

The 27 checks divide exclusively into:

| Check channel | Count |
| --- | ---: |
| CSS parser/helper checks | 10 |
| Static DOM checks | 11 |
| Computed-style checks | 6 |

Four computed checks parse the exact `grid-template-areas` row strings; one checks `display: grid`; one checks image `max-width`. None measures track sizes, item boxes, order, overflow, image distortion, responsive behavior, or accessibility. There are zero geometry, interaction, mutation, diagnosis, explanation, correction, or transfer checks.

An empty editor does not make this independent performance when every structure and Grid decision is prescribed.

## Review and quiz audit

The review is a reference sheet followed by an assignment to review it. It adds debugging definitions but no retrieval prompt, editor fault, prediction, evidence, correction, or feedback. It repeats imprecise claims that named areas “provide a name for the items,” implicit grids are only items placed outside the grid, and device emulation verifies responsive designs.

The quiz contains two 20-item pools. Most items recall property names or select one code string. Important defects include:

- an `auto-fit` answer says columns “collapse when space is limited” instead of explaining collapse of empty repeated tracks and contrasting `auto-fill`;
- a distractor correctly describes `auto-fill` reserving empty tracks, but the lesson never teaches the distinction;
- `minmax()` is named as the property that controls overflow behavior in grid tracks, though overflow is controlled by overflow properties and min/max track choices only influence whether content fits;
- `grid-row: 1 / -1` is said to span all available rows, ignoring implicit rows beyond the explicit end line;
- equal `fr` answers ignore intrinsic minimum contributions;
- `grid-column: 1` is said to stay in the first column “regardless of Grid changes” without bounding explicit/implicit changes or writing mode;
- no item requires a placement trace, computed track inspection, overflow diagnosis, source-order defense, or repair.

The debugging lecture contributes three more recall prompts. Across all 67 prompts, none produces authentic browser evidence or a corrected artifact.

## Combined evidence audit

Across the workshop and lab, the 284 implementation checks divide exactly into:

| Check channel | Count |
| --- | ---: |
| CSS parser/helper checks | 123 |
| Static DOM checks | 155 |
| Computed-style checks | 6 |
| Geometry, overflow, and responsive behavior checks | 0 |
| Interaction and accessibility-task checks | 0 |

The six computed checks verify exact lab declarations, not generalized layout behavior. Source bytes, prompt count, and many passing declaration checks remain inventory rather than pedagogy proof.

## Exact bounded candidate maps

### `lecture-working-with-css-grid`

- Flex container/item/axis comparison;
- Grid containers, tracks, lines, cells, and areas;
- explicit tracks and fractional space;
- repeat, `minmax()`, and intrinsic tracks;
- line placement and spans;
- named areas;
- implicit tracks and auto-placement.

### `workshop-magazine`

The workshop receives bounded contact for its document shell, links, images, headings, paragraphs, lists, quotations, landmarks, sectioning, source order, CSS loading, selectors, pseudo states/elements, link states, boxes, units, colors, fonts, typography, text, lists, floats, Grid containers, explicit and intrinsic tracks, line placement, auto-placement, Grid alignment, viewport metadata, fluid media, and media-query model.

It receives no content-derived-breakpoint, narrow-first, accessible-link, causal-debugging, changed-case, or transfer credit.

### `lab-newspaper-layout`

The lab receives bounded contact for document structure, language, metadata, paths, headings, paragraphs, landmarks, articles, figure/image semantics, CSS loading, selectors, boxes, sizing, units, backgrounds, fonts, text alignment, Grid containers, explicit tracks, named areas, and fluid media.

It receives no responsive, accessibility, changed-case, debugging, or transfer credit.

### `lecture-debugging-css`

- `css-devtools-causal-debugging` contact only.

### `review-css-grid`

- Grid container model;
- explicit/fractional and repeat/minmax/intrinsic tracks;
- line placement, named areas, auto-placement, Grid alignment;
- developer-tool debugging contact.

### `quiz-css-grid`

- Grid container model;
- explicit/fractional and repeat/minmax/intrinsic tracks;
- line placement, named areas, auto-placement, Grid alignment;
- intrinsic `auto-fit`/`auto-fill` responsive-grid contact.

Every map records source contact, including deficient contact. It is not a completeness or approval claim.

## Target learning progression

The target enters after normal flow, intrinsic sizing, Flexbox, source order, accessibility, and responsive foundations.

### 1. Track laboratory

Learners draw grid lines, tracks, cells, and areas before enabling the preview. They compare percentages plus gaps, `fr`, fixed/intrinsic tracks, automatic minimums, `minmax(0, 1fr)`, and an oversized minimum. The workspace shows the computed track list, Grid overlay, item boxes, and scroll dimensions.

### 2. Placement simulator

A bounded simulator asks learners to predict explicit and implicit tracks, auto-placement cursor movement, spanning, negative lines, inserted items, and dense packing. Source order, reading order, focus order, and visual placement appear side by side. Dense packing must be accepted or rejected from content meaning.

### 3. Guided workshop: community arts program

A community arts center needs a program page with current exhibitions, accessible event cards, venue facts, and one optional image. The workshop begins in normal flow, establishes content constraints, then adds Grid for relationships that are genuinely two-dimensional. Guidance fades across explicit tracks, intrinsic tracks, areas, alignment, and changed item counts.

No copied magazine, external social icon kit, or fixed editorial text is used.

### 4. Alignment clinic

Learners identify alignment subject, alignment container, logical axis, and free space for `justify-items`, `align-items`, `place-items`, `justify-content`, `align-content`, and `place-content`. Baseline, writing mode, safe overflow, and oversized-item cases reject property-name guessing.

### 5. Intrinsic responsive Grid lab

Learners compare `auto-fill` and `auto-fit` with changed item counts and container widths, then choose a safe minimum based on actual content. The lab must avoid overflow without unnecessary viewport breakpoints and must preserve logical source order.

### 6. Debugging clinic

An unfamiliar interface contains an invalid template area, automatic-minimum overflow, unexpected implicit row, line `-1` misconception, misapplied alignment property, and dense-order defect. Learners state one hypothesis, select validation, matched rules, computed tracks, overlay, geometry, or accessibility evidence, repair one cause, save source, reload, and pass a changed case.

### 7. Independent lab: library discovery board

A public library needs a discovery board for services, events, closures, and resources. The learner receives content and tasks, not a layout matrix. They choose normal flow, Grid, or Flex per relationship; preserve heading and source order; support missing and added cards; accommodate long translated labels; and defend track sizing, placement, alignment, responsive behavior, and print output.

### 8. Delayed retrieval and transfer

Later animation and certification projects retrieve Grid without recipes. Delayed items change writing mode, content count, intrinsic size, focusable order, and container size. Transfer requires an unrelated stakeholder layout and a browser-evidence defense.

## Required evidence

Each learner must provide:

1. a drawn line/track/cell model for an unfamiliar grid;
2. computed track and item geometry before and after changed content;
3. a fractional-space calculation accounting for gaps and non-flex tracks;
4. explicit/implicit placement traces with inserted and missing items;
5. an `auto-fit` versus `auto-fill` prediction and observed result;
6. an alignment-subject and logical-axis explanation;
7. source, reading, focus, and visual-order evidence;
8. long-content, zoom, text-spacing, writing-mode, tablet, desktop, and print results;
9. overflow and scroll-width evidence at boundary containers;
10. one causal diagnosis, saved repair, reload, changed-case retest, and explanation;
11. delayed retrieval and independent design defense.

Canonical hidden cases remain server-side.

## Accessibility and responsive gates

Every Grid artifact must preserve:

- semantic HTML before layout;
- logical source, reading, speech, and focus order;
- useful headings, links, image alternatives, and visible focus;
- content under long labels, missing resources, enlarged text, text spacing, and zoom;
- no two-dimensional page scrolling for ordinary content;
- locally bounded overflow only where the content relationship needs it;
- touch and keyboard operation at supported tablet sizes;
- forced-color, reduced-motion, and print behavior where relevant;
- content-derived or intrinsic adaptation instead of device-name widths;
- actual tablet and desktop browser evidence plus phone-usable public handoff.

Automated DOM and accessibility snapshots are necessary but incomplete. Observed keyboard, screen-reader, low-vision, touch, and cognitive tasks remain required.

## Hint and correction constraints

Hints never reveal the final track list, line, area map, breakpoint, or declaration. They progress through:

1. restating the failed relationship or invariant;
2. identifying syntax, cascade, track sizing, placement, alignment, source order, overflow, or responsive condition as the failure layer;
3. showing the learner's current matched rule, computed track list, overlay, item box, or accessibility evidence;
4. asking for a falsifiable next prediction;
5. introducing one smaller changed case;
6. pointing to a paraphrased primary rule;
7. showing an analogous example from another domain.

A correct source string cannot bypass changed cases. Repeated failure routes to a smaller simulator and returns to the original artifact after a fresh prediction.

## Originality and duplication constraints

LEARN-IT-ALL must not reuse or lightly rename:

- the 2019 freeCodeCamp curriculum magazine, its press release, history list, social icons, remote assets, or 79-step order;
- a newspaper with title, feature, secondary, cover image, and three small stories in the prescribed four-row matrix;
- the holy-grail example or generic numbered boxes as the dominant teaching context;
- Font Awesome 5.8.2, the three copied Google fonts, or the old source URLs as required dependencies;
- the fixed `94rem` center track or 720/600/550/420-pixel patch sequence;
- the source lectures, prompts, review, hints, checks, seeds, solutions, or wording;
- declaration presence, a Grid screenshot, or an empty editor as mastery evidence.

Automated semantic similarity audits catch obvious overlap. Independent reviewers decide whether scenario, reasoning, starter, sequence, evidence, and solution are genuinely different.

## Release gates

This family remains `candidate-review`. Publication is blocked until:

- subject review verifies every Grid, Box Alignment, sizing, auto-placement, source-order, debugging, validator, and tooling claim;
- the new 103-concept CSS graph and prerequisite order pass;
- exact maps and original activity matrices pass instructional review;
- track, placement, alignment, geometry, overflow, changed-content, responsive, accessibility, and print tests pass;
- alternate correct layouts pass without string allowlists;
- tool instructions pass keyboard and assistive-technology review and remain current;
- canonical checks remain server-side and learner code remains sandboxed;
- tablet and desktop editor/preview flows pass keyboard, touch, zoom, forced-color, and assistive-technology review;
- representative learners complete, diagnose, correct, retain, and transfer the skills;
- subject, instructional-design, assessment, accessibility, security, and duplication reviewers approve.

Generated artifacts and step counts are inventory, not proof.

## Inspection outcome

After this wave, the candidate alignment contains:

- 148 agent-inspected source blocks;
- 1,411 inspected source challenges;
- 1,319 captured question prompts in inspected blocks;
- 4,687 inspected implementation checks;
- 149 block-specific candidate mappings;
- 8 uninspected source blocks with exact evidence and zero guessed concepts;
- one unavailable assessment container with zero concept claims;
- 10 total source blocks still requiring challenge-level inspection;
- 186 target concepts: 83 HTML/tooling and 103 CSS/responsive/design;
- seven explicit modern extensions and seven unresolved concepts.

The candidate research architecture consequently maps 149 source objectives into modules and retains 9 source identities in the explicit non-specific inventory, including the unavailable assessment container.

These are research facts, not learner content. Independent reviews, original authoring, runtime and grading implementation, learner observation, repair, and re-test remain blocking.
