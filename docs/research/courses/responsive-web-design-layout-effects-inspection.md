# Responsive Web Design v9 CSS Layouts and Effects inspection

Status: `source-inspected-candidate-review`
Reviewed: 2026-07-15
Pinned source: freeCodeCamp commit `c115efdd41f868d8850156f6a7a211219c35a847`
Target: original LEARN-IT-ALL instruction; source material is coverage and depth evidence only

## Decision

All five CSS Layouts and Effects source blocks are inspected challenge by challenge. They are eligible for bounded candidate mapping, not approval. The pinned module provides beginner contact with box areas, box sizing, margin collapse, overflow axes and values, reset rationale, transform functions, filter functions, and frequent edits to a cumulative decorative artifact. It also contains a one-file lab and two quiz pools.

The source module combines distinct rendering models without making their relationships testable. The lecture describes overflow as a property choice more than a signal of an upstream size constraint. It reduces margin collapse to “the larger wins,” which is false for mixed or all-negative margins. It describes a filter blur argument as a radius even though Filter Effects defines it as Gaussian standard deviation. It does not require transform or filter function-order prediction, reference-box inspection, overflow geometry, containing-block or stacking-context evidence, or behavior under zoom and changed content. The reset section treats removal of browser defaults as a route to consistency without requiring authors to preserve useful user-agent semantics, focus, control, list, heading, and platform behavior.

The 44-step painting workshop is dense but remains a literal reconstruction of three empty rectangles. It begins with four disposable image-swapping steps, hard-codes a 500 by 600 pixel canvas inside a large fixed frame, uses a one-pixel padding hack and then `overflow: hidden` to suppress margin collapse, clips effects without explaining the new scroll-container and formatting behavior, and never fades support. The final lab is actively misleading: it asks learners to blur “confidential” text. CSS blur changes pixels; it does not remove underlying text or data. The content remains in the DOM, accessibility tree, source, clipboard, search, and programmatic APIs. A blurred secret is exposed data, not redaction.

LEARN-IT-ALL will teach boxes, sizing, overflow, transforms, and filters as connected but separate models. Learners calculate box edges, identify intrinsic constraints, predict adjoining-margin groups including negative cases, distinguish clipping from scrolling, operate focus and long content, predict transform matrices and reference boxes, inspect changed client and overflow geometry, trace ordered filter pipelines, verify stacking and containing behavior, measure rendered contrast, and examine underlying data. Visual similarity, a property token, or a blurred screenshot cannot pass.

There is no module fallback, compatibility map, legacy generator, or publication shortcut. Every learner-facing explanation, example, scenario, starter, check, hint, feedback route, solution, assessment, and project will be original. Independent subject, instructional, assessment, accessibility, security/privacy, duplication, browser-interoperability, and observed-learner reviews remain blockers.

## Exact source inventory

| Source block | Type | Challenges | Prompts or checks | Exact observed scope |
| --- | --- | ---: | ---: | --- |
| `lecture-working-with-css-transforms-overflow-and-filters` | lecture | 7 | 21 prompts | overflow, transforms, box areas, margin collapse, box sizing, CSS resets, and filter functions |
| `workshop-rothko-painting` | workshop | 44 | 101 checks | temporary diagrams; fixed canvas and frame; margins, padding, overflow, colors, percentages, filters, shadows, radii, and rotation |
| `lab-confidential-email-page` | lab | 1 | 24 checks | fixed email box, stamps, paragraphs, transformed labels, and CSS-blurred text |
| `review-css-layout-and-effects` | review | 1 | 0 | answer-first reference covering the seven lecture topics |
| `quiz-css-layout-and-effects` | quiz | 1 | 40 prompts | two 20-item pools dominated by definition, syntax, and effect recognition |

Totals: five blocks, 54 challenges, 61 question prompts, and 125 implementation checks. Exact challenge identities, source paths, SHA-256 hashes, byte counts, section inventories, language evidence, prompts, and checks remain pinned in `references/freecodecamp-rwd-v9.json`.

The seven lecture files contain 40,355 source bytes. The painting workshop contains 64,476 bytes. The lab, review, and quiz contain 8,093, 8,317, and 13,104 bytes. These measurements prove inventory identity only. They are not evidence of correctness, responsive behavior, safe data handling, accessibility, retention, independent transfer, or learner success.

## Current primary authorities

### CSS Box Model Level 4

Source: <https://drafts.csswg.org/css-box-4/>
Reviewed: 2026-07-15

Every CSS box has a content area and optional surrounding padding, border, and margin areas. Each area has an edge. Backgrounds paint defined inner areas; borders paint the border area; margins remain transparent. Terms such as content box, padding box, border box, and margin box are reused by sizing, backgrounds, clipping, and transform reference-box features.

The target must keep at least five questions separate:

1. What content or descendant determines the content contribution?
2. Which declared or intrinsic constraint determines the content or border-box size?
3. Which area is painted by a background or border?
4. Which region participates in hit testing or focus indication?
5. Which outer spacing affects adjoining layout without becoming painted content?

The benchmark correctly names four familiar areas but sometimes describes the box model as defining how all elements are structured and positioned. That is too broad. Box areas interact with display, formatting contexts, sizing, containing blocks, alignment, positioning, transforms, and overflow; they do not replace those models.

Level 4 contains evolving features such as `margin-trim`. They are research-watch material, not an assessed beginner requirement without maturity, supported-browser, and changed-case evidence.

### CSS Box Sizing Level 3

Source: <https://drafts.csswg.org/css-sizing-3/>
Reviewed: 2026-07-15

`box-sizing` determines the edge to which quantitative sizing values apply. Under `content-box`, a specified quantitative size applies to the content box and padding and border lie outside it. Under `border-box`, that size applies to the border box and padding and border are subtracted to obtain the content size.

Several important boundaries are absent from the benchmark:

- margin is outside both sizing edges;
- `box-sizing` affects quantitative sizing and does not turn every `auto`, intrinsic, or content-based value into a fixed border box;
- the content size is floored at zero;
- when border plus padding cannot fit, the used border box can exceed the specified border-box size;
- content and intrinsic minimums can still overflow;
- some HTML controls use border-box behavior by default;
- computed style, used size, border box, scroll size, and rendered ink can differ.

The target requires arithmetic and browser evidence. A `box-sizing: border-box` token is not enough. Changed borders, padding, long unbreakable content, replaced content, minimums, zoom, and writing modes must produce a predicted and explained result.

### CSS 2.2 margin collapse and block formatting

Source: <https://drafts.csswg.org/css2/#collapsing-margins>
Reviewed: 2026-07-15

Adjoining vertical margins in block formatting can collapse even when the boxes are not siblings. Relationships include adjacent in-flow blocks, parent and first or last in-flow children under defined conditions, and a box whose own top and bottom margins adjoin through it. Borders, padding, inline content, clearance, fixed height or minimum height, formatting contexts, floats, positioning, flex, and grid can change the result.

The collapsed result is not always the larger written value:

- for positive margins, the maximum positive width contributes;
- when negative margins adjoin, the largest absolute negative contribution is subtracted from the maximum positive contribution;
- when no positive margin exists, the largest absolute negative contribution is subtracted from zero;
- a chain can collapse through an empty box and involve more than two values.

The pinned lecture demonstrates only positive margins and then generalizes “the larger wins.” That shortcut creates a false learner model. The target will include positive, zero, mixed-sign, all-negative, sibling, parent-child, and empty-through cases. Learners must identify the adjoining group before arithmetic.

Adding one pixel of padding merely to stop an observed collapse can be a useful experiment, but it is not a universal repair. The learner must decide whether spacing belongs to the parent, the child, a layout gap, or an intentionally established formatting context. A repair should express layout intent, not hide a model that remains misunderstood.

### CSS Overflow Level 3

Source: <https://drafts.csswg.org/css-overflow/>
Reviewed: 2026-07-15

The current model distinguishes values the benchmark compresses:

- `visible` gives no special overflow handling;
- `hidden` clips to the overflow edge and supplies no direct user scrolling interface, but the content remains programmatically scrollable;
- `clip` forbids scrolling and does not create the formatting context that `hidden` creates;
- `scroll` creates a scroll container and makes a scrolling mechanism available even when current content does not overflow;
- `auto` behaves like scroll when overflow exists and like hidden otherwise;
- axis combinations can compute differently from their specified values;
- scroll containers affect formatting and must be considered in print or other static media where interactive scrolling is unavailable.

The source calls `hidden`, `scroll`, and `auto` interchangeable “fixes” at different moments without making these behavior differences assessable. It also says vertical scrolling is generally acceptable while horizontal scrolling might be questioned. That is too generic. A code editor, table, timeline, map, carousel, bidirectional document, or intentional local pane can have different requirements. Page-wide overflow caused by a bad minimum is different from a deliberate accessible scroll region.

The target treats overflow as evidence before treatment. Learners first locate the size, minimum, intrinsic content, white-space, transform, or positioned descendant that creates it. They then determine whether the content should reflow, wrap, resize, clip as decoration, or remain locally scrollable. Keyboard focus, visible focus, touch panning, scroll trapping, nested containers, zoom, long words, errors, and print output must remain usable.

### CSS Transforms Level 1

Source: <https://drafts.csswg.org/css-transforms/>
Reviewed: 2026-07-15

Transforms apply after boxes are sized and positioned by layout. They do not reallocate ordinary-flow space, but that does not make them isolated decoration. A non-`none` transform can affect:

- the rendered coordinate system;
- scrollable overflow;
- `getClientRects()` and `getBoundingClientRect()` results;
- percentage resolution against a transform reference box;
- transform origin;
- containing blocks for descendants;
- stacking contexts;
- hit testing and visual target location;
- the composition result when function order changes.

The benchmark introduces translate, rotate, scale, skew, and a combined list, but it does not require function-order prediction or explain that the list becomes composed matrices. The prose says the combined example moves, rotates, and scales the element in written order without confronting the different output produced by reordering the same functions. That omission makes transforms look like independent labels rather than coordinate operations.

The accessibility discussion contains useful warnings about visual versus source order, motion, text size, and hiding. It also overgeneralizes. A screen reader does not inherently “inaccurately convey transformed content”; the problem arises when meaningful visual order, location, state, or visibility diverges from DOM and accessibility behavior. `display: none` and `visibility: hidden` generally remove content from rendering and accessibility exposure, so they are not an automatic answer when content must remain available to screen-reader users. A correct solution begins with the product's visible, operable, and accessibility-tree requirements.

The target uses transforms for intentional rendered-coordinate effects, not as a substitute for layout when siblings should reflow. Learners inspect flow allocation, visual bounds, focus, pointer target, transformed overflow, source order, and motion preference before accepting a result.

### Filter Effects Level 1

Source: <https://drafts.csswg.org/filter-effects-1/>
Reviewed: 2026-07-15

The `filter` property applies an ordered filter list to the rendered element. The first function consumes the source graphic; each later function consumes the preceding output. A non-`none` filter creates a stacking context and a containing block for absolute and fixed descendants under the defined conditions. The element and descendants render as a group. Filters do not change CSS box geometry but can contribute ink overflow. They affect content, backgrounds, borders, text decoration, outlines, visible scrolling mechanisms, and descendants as painted output.

The source's blur explanation is technically incorrect. The argument to `blur()` is the standard deviation of a Gaussian blur. The specification explicitly distinguishes it from a box-shadow blur radius. This matters for explanation, prediction, output bounds, and assessment wording.

Filter function order matters. `brightness()` followed by `contrast()` is not generally equivalent to the reversed list. Hue rotation operates on samples in the defined processing model; it is not a semantic palette replacement. Filtered text or focus indicators can lose contrast. Filter output may be clipped. Unsupported effects, forced colors, low-performance devices, print, and user transparency or contrast preferences need usable fallbacks.

Most importantly, filters change pixels rather than underlying content. Blur, opacity, grayscale, or contrast cannot redact a secret, remove personally identifiable information, enforce authorization, or hide text from assistive technology and scripts. Secure redaction removes or irreversibly replaces sensitive data before the unauthorized client receives it. A visual effect can at most be decoration or a deliberately reversible reveal affordance for already-authorized data.

### WCAG 2.2 supporting evidence

Sources:

- <https://www.w3.org/WAI/WCAG22/Understanding/reflow.html>
- <https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html>
- <https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html>
- <https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html>
- <https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html>

Reviewed: 2026-07-15

Changed layout and effect work must preserve content and operation under zoom and narrow display, expose visible keyboard focus, keep required component and state evidence perceivable, avoid color or filtered appearance as the sole meaning, and provide safe motion behavior. A scroll container may be permissible, but focus targets and content must remain reachable and understandable. A transform or filter that makes an element attractive does not excuse loss of reading order, target clarity, contrast, or stable operation.

## Challenge-by-challenge findings

### Seven-part lecture

#### Overflow

Useful coverage:

- establishes x and y overflow axes;
- demonstrates `overflow-y: hidden`, `scroll`, and `auto`;
- notes that clipping can make content unreachable;
- uses an editable long-text example.

Required corrections and expansions:

- `hidden` and `clip` are absent as distinct behavior models; the learner is not told that hidden remains programmatically scrollable while clip forbids scrolling.
- The relationship between axis values and computed results is absent.
- `visible` and the initial behavior are not tested in changed geometry.
- The source jumps from symptom to property without finding the constraint that caused overflow.
- Scroll containers, formatting contexts, focus reachability, scrollbars, scrollbar gutter, touch panning, keyboard operation, nested scroll, transformed overflow, and print are absent.
- “Vertical okay, horizontal questionable” is a broad design preference presented without task context.
- No long word, enlarged text, translated label, dynamic error, replaced media, or minimum-size case is required.

The three questions ask for the definition, the y-axis property, and which direction the lecture calls more acceptable. They do not establish overflow diagnosis or behavior.

#### Transforms

Useful coverage:

- introduces translate, rotate, scale, skew, and combined functions;
- correctly separates ordinary flow allocation from rendered position at a high level;
- warns about visual/source order, text scaling, motion, depth-only meaning, hidden content, and transformed controls.

Required corrections and expansions:

- function order, matrix composition, transform origin, and reference box are absent;
- percentage translation has no reference-box model;
- containing-block, stacking-context, client-rectangle, and scrollable-overflow effects are absent;
- the sample claims sequential effects without asking learners to compare a reordered list;
- sibling flow is stated but never observed with a changed neighbor;
- source-order accessibility is reduced to a screen-reader warning rather than focus, reading, hit-testing, and visual relationship evidence;
- blanket use of `display: none` or `visibility: hidden` for content moved offscreen ignores cases where content must remain available in the accessibility tree;
- motion advice is not connected to an operated reduced-motion implementation;
- no learner chooses between layout, positioning, and transform for a changed requirement.

The questions test recognition of concerns, 3D perception, and hidden-content advice. None require transform output prediction or diagnosis.

#### Box areas

Useful coverage:

- names content, padding, border, and margin;
- demonstrates padding, border, and margin shorthands;
- states initial border width, style, and color behavior;
- introduces total-size arithmetic.

Required corrections and expansions:

- the four areas are called “elements,” blurring box-tree terminology;
- the box model is said to define structure and position, which conflates semantic structure, box generation, formatting contexts, and positioning;
- background painting and transparent margin boundaries are absent;
- pointer and focus regions are absent;
- inline boxes, replaced elements, fragmentation, scroll areas, ink overflow, and logical edges are absent;
- total size is discussed without intrinsic minimums or changed content;
- padding is framed as a generic readability improvement rather than one spacing input whose effect depends on the component.

The questions are simple component labels.

#### Margin collapse

Useful coverage:

- demonstrates adjacent siblings, parent/first child, and empty block cases;
- shows that padding can prevent one parent-child collapse;
- warns that expected additive arithmetic can be wrong.

Required corrections and expansions:

- “larger wins” is only a positive-margin shortcut and is false for mixed and all-negative groups;
- adjoining conditions are compressed to margins “coming into contact,” which is not a testable model;
- chains of more than two margins are absent;
- empty blocks can collapse through their own margins and neighboring groups, not just select one internal number;
- clearance, line boxes, min-height, height, borders, padding, floats, positioned elements, formatting contexts, flex, and grid are absent;
- physical vertical language is not connected to block-axis intent and writing modes;
- a one-pixel padding fix changes the box and can be a magic-number hack;
- the explanation that collapse exists for more aesthetically pleasing documents is not evidence and should not be graded.

The questions test direction, larger positive value, and one prevention choice. No negative or chained case appears.

#### Content-box and border-box

Useful coverage:

- distinguishes content and border sizing edges;
- calculates a 300-pixel content box plus padding and borders as a 348-pixel border box;
- excludes margin from border-box sizing;
- compares two otherwise similar elements.

Required corrections and expansions:

- the learner does not inspect content box, border box, scroll size, client size, or used value in DevTools;
- `box-sizing` application to all width/height-accepting elements and element-specific browser defaults are absent;
- the content-box floor at zero is absent;
- border plus padding can force a border box beyond its specified size, contradicting a simplistic “total size stays fixed” rule;
- intrinsic content, minimum sizes, replaced content, min/max constraints, and flex/grid sizing interactions are absent;
- “choose based on project need” is correct but no actual decision or changed case is required.

The questions recognize the default, a broad advantage, and content-box width meaning.

#### CSS resets

Useful coverage:

- makes browser default styles visible as a cascade input;
- distinguishes custom and third-party approaches;
- warns that resets can affect accessibility and load cost;
- names targeted normalization as an alternative to indiscriminate removal.

Required corrections and expansions:

- browser defaults are described mostly as inconsistencies to avoid rather than useful behavior to inspect and preserve;
- the universal `margin: 0; padding: 0` example is presented as a very common starting point without requiring heading, paragraph, list, form, dialog, table, focus, print, and forced-color checks;
- “blank starting point” is not necessarily desirable and can remove signifiers learners depend on;
- a reset does not eliminate cross-browser differences in controls, layout, fonts, rendering, or platform integration;
- third-party source, version, maintenance, license, scope, and supply-chain review are absent;
- cascade layers, scoping, `revert`, `revert-layer`, and component boundaries are absent;
- accessibility is reduced to styles that might help screen readers, when the more direct risks include visual structure, focus, control affordance, list relationships, and forced-color behavior.

The target teaches reset decisions inside cascade architecture. Learners inventory user-agent behavior, remove only a named conflict, record what must be restored, and test changed elements. No third-party stylesheet is copied into the course merely because its package name is recognizable.

#### Filters

Useful coverage:

- introduces blur, brightness, grayscale, sepia, hue rotation, contrast, invert, saturation, and ordered lists;
- shows multiple editable visual examples;
- warns against overwhelming users and compromising accessibility.

Required corrections and expansions:

- `blur()` is incorrectly described as taking a radius; it takes Gaussian standard deviation;
- the ordered image-pipeline model is not taught and no reversed list is compared;
- filters apply to the element and descendants as rendered group output, not merely to an original image asset;
- containing-block and stacking-context creation are absent;
- box geometry versus ink overflow is absent;
- filter region/clipping and transformed coordinates are absent;
- sRGB processing, clamping, alpha, and intermediate output are absent;
- filter effects on text, outline, focus, scrollbars, and actual contrast are not measured;
- blur is suggested for “obscuring” image parts without a strong warning that it cannot redact sensitive data;
- no unsupported, print, forced-color, reduced-transparency, low-performance, or no-filter fallback is operated.

The questions recognize grayscale syntax, black brightness output, and a two-function string. They do not assess order, data exposure, group output, contrast, or fallback.

### Rothko-style painting workshop: 44 steps

The exact progression is:

1. Steps 1–4 add an external image, swap among three box-model diagrams, and then delete it.
2. Steps 5–9 create a fixed 500 by 600 pixel `.canvas`, link CSS, and set one exact background color.
3. Steps 10–14 wrap it in a `.frame` with 50-pixel border and padding, another 500-pixel width, fixed margins, and horizontal auto centering.
4. Steps 15–20 create a first fixed rectangle, color it, set margins, encounter parent-child collapse, and add one pixel of canvas padding.
5. Step 21 deletes the padding and sets `overflow: hidden`, returning declared canvas dimensions while changing overflow and formatting behavior.
6. Steps 22–32 add two more fixed or percentage-sized rectangles, exact colors, and prescribed margins.
7. Steps 33–35 apply blur to the canvas and further blur to individual rectangles.
8. Steps 36–38 add exact same-color box shadows.
9. Steps 39–41 add prescribed border radii.
10. Steps 42–44 rotate each rectangle by an exact fractional angle.

Useful properties:

- the artifact accumulates across 44 frequent edit-and-preview contacts;
- box areas, margin collapse, overflow, percentages, filters, shadows, radii, and transforms appear in one result;
- the learner sees that one CSS change can affect parent and descendant output;
- exact early checks can provide immediate coaching for syntax.

Pedagogical defects the target must not repeat:

- Four opening steps create, swap, and remove a diagram rather than asking the learner to predict or inspect the actual artifact's box model.
- The learner copies exact selectors, dimensions, colors, margins, filters, shadows, radii, and angles through the final step. Support never fades.
- The same three empty rectangles carry nearly the whole module. There are no users, real content constraints, interaction states, failures, or stakeholder outcome.
- No learner states a hypothesis before preview or explains an unexpected result after preview.
- No debugging clinic varies one cause at a time.
- No changed case alters content, container, zoom, writing mode, transform order, filter order, or preference.
- Previously learned semantic HTML and accessibility are not meaningfully retrieved.
- The ending is a final literal rotation, not independent reconstruction, delayed retrieval, or transfer.

Technical defects and hidden behavior:

- The canvas and frame produce a very large fixed outer width. A 500-pixel frame content box plus 100 pixels of padding plus 100 pixels of border is 700 pixels before margins. It cannot be assumed usable in a narrow container or at zoom.
- The lesson adds one pixel of padding to prevent collapse and then replaces it with `overflow: hidden`. Both change behavior for reasons the learner does not model.
- `overflow: hidden` creates a scroll container and independent formatting context for a block box, remains programmatically scrollable, and clips effect output. The step says it changes the canvas back to its original dimensions but does not teach these consequences.
- `margin: auto` on `.two` assigns auto to all axes; block-axis auto margins in this context do not vertically center it. The useful effect is inline-axis centering.
- The percentage height works because the containing canvas has a definite height. The learner is not shown the failure under an indefinite block size.
- Filters on the canvas and rectangles compose. The output is not merely “increase blur by one pixel” in a simple arithmetic sense.
- Blur and shadow add ink outside the geometry while overflow can clip it. The relationship is visible but unexplained.
- Rotations alter client and overflow bounds without changing ordinary-flow allocation. No neighboring element or focus target reveals that difference.
- Empty rectangles are acceptable decoration only if that boundary is intentional; no task asks the learner to keep meaningful content out of CSS-only paint.
- A named artist resemblance is used as correctness motivation, but visual similarity to one artwork does not prove the rendering models or an original design decision.

The 101 checks mostly enforce exact source structure and literal declarations. They are appropriate for early syntax coaching but insufficient for module evidence. Later work must test computed and used geometry, operation, changed cases, explanation, correction, and unfamiliar transfer.

### Confidential-email lab

The lab starts from a document skeleton and requires:

- one `main#email`;
- exact 50-pixel padding, top margin, 500-pixel width, 2-pixel border, and border-box sizing;
- two inline-block `div` stamps with exact text, padding, left margin, border, and any non-`none` transform;
- at least three paragraphs;
- at least three nonempty `.blurred` spans;
- exact `filter: blur(3px)` on the blurred spans.

The supplied solution creates a playful fictional secret message, rotates red stamps, and visually blurs names and phrases. Twenty-four checks inspect structure and declarations.

This lab fails as a security or confidentiality artifact:

- the sensitive strings remain literal text nodes in the document;
- the browser receives the strings before CSS filters them;
- users can select, copy, search, inspect, print, serialize, or script the strings;
- accessibility APIs can expose the underlying text rather than a visual blur;
- disabling or overriding CSS reveals the text;
- a no-filter browser or mode reveals the text;
- the filter does not implement authorization, redaction, encryption, access control, data minimization, or disclosure prevention.

Calling the page confidential and requiring blur creates security theater. The target will turn this misconception into a debugging clinic: learners must demonstrate the exposure through DOM, clipboard, styles-disabled, and accessibility evidence, then remove or irreversibly replace the unauthorized data before delivery. Authorized reveal behavior, if used, requires a separate access and interaction design.

The lab also fails as independent layout evidence:

- the exact 500-pixel width can overflow a supported narrow container or high zoom;
- the check verifies authored declarations, not actual responsive total width under changed content;
- the transform check accepts any non-`none` transform even though the requirement says rotate;
- padding, margin, and border checks accept arbitrary nonzero values for the stamps without a stakeholder reason;
- fixed left margins can push long or translated stamps out of the container;
- there is no heading even though a main document region contains a standalone message;
- stamp meaning is primarily color, rotation, and uppercase presentation rather than structured status;
- blurred text can reduce readability and contrast but no measurement is required;
- no print, styles-disabled, forced-color, zoom, long content, changed recipient, or changed language case is tested;
- no transform order, filter order, client rectangle, stacking, or containing behavior is explained;
- the scenario and check structure are unrelated to the guided workshop, but the lab still samples shallow property presence rather than the complete module model.

An authentic independent lab must use non-sensitive content, content-driven sizing, a real stakeholder outcome, and changed cases. Security-sensitive material belongs in an explicit safe-redaction clinic with server-side data boundaries, not a CSS appearance exercise.

### Review

The review is a clear lookup sheet, but it exposes definitions and examples before an attempt. It repeats the lecture shortcuts:

- positive-only margin collapse is generalized;
- reset libraries are named without version or adoption evidence;
- filter blur retains the radius wording;
- transform and filter lists omit order, reference boxes, stacking, and containing effects;
- overflow omits the hidden-versus-clip distinction;
- no underlying-data warning accompanies blurred content.

The target review must begin with unprompted box arithmetic, adjoining-margin grouping, overflow operation, transform-order prediction, filter-order prediction, and blurred-data exposure. It then reveals an explanation, asks the learner to correct the model, and reassesses with different content, signs, values, and output conditions.

### Quiz

The file contains two 20-item pools while the learner description says 18 of 20 are required. Most prompts ask for a term, purpose, property name, direction, percentage type, or memorized effect.

Weaknesses include:

- repeated questions ask which axis `overflow-x` or `overflow-y` controls;
- repeated questions ask what grayscale, brightness, contrast, sepia, or hue rotation does;
- box model questions remain component labels and content-box/border-box recognition;
- margin collapse is represented as one positive-value definition;
- transforms are assessed as property/function recognition, not composed output;
- reset package names receive assessment weight;
- no question distinguishes hidden from clip, programmatic from direct scrolling, or local scroll from root-constraint repair;
- no question uses negative or chained collapsing margins;
- no question tests content-box floor, padding/border overflow, intrinsic minimum, or actual used size;
- no question tests transform origin, reference box, order, client geometry, overflow, stacking, or containing blocks;
- no question tests ordered filter output, group rendering, stacking, containing blocks, ink overflow, contrast, or fallback;
- no question exposes why blurred confidential text remains available;
- distractors can often be rejected by property vocabulary rather than causal reasoning.

The target blueprint will retain some rapid interpretation but require code operation, changed-case calculation, causal diagnosis, security judgment, correction, and explanation before passing.

## Exact candidate mapping

### Lecture

- cascade reset/base/layer boundaries
- box areas and sizing edges
- margin collapse and formatting contexts
- overflow and scroll containers
- borders and paint areas
- transform reference boxes and coordinate effects
- filter pipelines and fallbacks

### Painting workshop

- CSS loading, class selectors, and selector lists
- block behavior, box areas, margin collapse, intrinsic/extrinsic sizing, percentages, and overflow
- backgrounds, colors, borders, radii, and shadows
- filters and transforms

### Confidential-email lab

- HTML main landmark and paragraphs
- CSS loading, ID/class selectors, inline-block behavior, box areas, box sizing, and sizing
- backgrounds, borders, and shadows
- transforms and filters

### Review

- cascade reset boundaries
- box areas, box sizing, and margin collapse
- overflow, transforms, and filters

### Quiz

- cascade reset boundaries
- box areas, box sizing, and margin collapse
- overflow, transforms, and filters

These mappings identify source contact only. They do not establish correctness, depth, retention, transfer, accessibility, or security. The lab receives filter contact, not credit for confidentiality, redaction, or safe data handling. The lecture's accessibility prose is not credit for operated accessibility evidence.

## Original cumulative learning sequence contract

The eventual LEARN-IT-ALL sequence must retrieve CSS parsing, cascade, display, units, colors, semantics, and accessibility in this order:

1. Inspect a real content component and label content, padding, border, and margin boxes in DevTools.
2. Predict which areas receive background paint, border paint, focus indication, hit testing, and transparent spacing.
3. Calculate content and border-box dimensions from declared width, padding, and borders, then compare computed and used browser evidence.
4. Change border and padding until they exceed a border-box size; explain the zero content floor and resulting outer size.
5. Add long unbreakable content, replaced media, minimums, and zoom; distinguish arithmetic overflow from intrinsic constraint overflow.
6. Identify an adjoining margin group before calculating the result.
7. Calculate positive, zero, mixed-positive-negative, all-negative, sibling, parent-child, and empty-through collapsed margins.
8. Compare padding, border, inline content, `flow-root`, flex/grid, and layout gap interventions; choose one based on spacing ownership.
9. Inventory user-agent styles on headings, lists, forms, tables, focus, and print before authoring any reset.
10. Use cascade layers or bounded selectors to remove one named default conflict, restore required behavior, and reject an unnecessary universal reset.
11. Trigger overflow with long text, long words, media, transformed ink, dynamic errors, and zoom; locate the controlling constraint.
12. Compare visible, hidden, clip, scroll, and auto through direct scrolling, programmatic scrolling, focus navigation, and print.
13. Build an intentional local scroll region only when the task requires it; preserve keyboard, touch, visible focus, labels, and boundary cues.
14. Predict a single translate, rotate, scale, and skew relative to its origin and reference box.
15. Reorder two transform functions, predict both outputs, inspect matrices and client rectangles, and explain why the results differ.
16. Compare transformed rendering with unchanged sibling flow and decide when layout or positioning is the correct mechanism.
17. Inspect transformed overflow, hit target, focus indicator, stacking context, and containing block in changed cases.
18. Apply reduced-motion and source-order constraints when transforms participate in interaction or animation.
19. Predict a single filter function from its defined parameter model, including Gaussian standard deviation for blur.
20. Reorder brightness, contrast, hue, or blur functions and trace each output through the ordered pipeline.
21. Inspect filter group rendering, descendant output, ink overflow, clipping, stacking, containing blocks, focus, and rendered contrast.
22. Operate unsupported, no-filter, forced-color, print, reduced-transparency, and low-performance fallbacks without losing the task.
23. Demonstrate that visually blurred text remains in DOM, clipboard, source, accessibility, and programmatic output.
24. Replace exposed data with safe server-side omission or irreversible redaction before delivery; distinguish authorized reveal from decoration.
25. Complete a guided content panel with frequent predictions and feedback, then rebuild a different component with faded prompts.
26. Repair a box-sizing, negative-margin, overflow, transform-order, filter-order, contrast, and false-redaction clinic using causal evidence.
27. Complete an independent stakeholder lab using real content, content-driven constraints, intentional effects, and a written defense.
28. Retrieve every model after delay in forms, responsive layout, navigation, projects, and the cumulative exam.
29. Pass a mixed assessment containing arithmetic, prediction, operation, changed cases, diagnosis, security judgment, correction, explanation, and unfamiliar transfer.

No early canonical solution may introduce Flexbox, Grid, positioning, container queries, or another untaught mechanism merely because it is convenient. When those mechanisms become prerequisites later, box, overflow, transform, and filter models are retrieved through them.

## Activity diversity contract

The target activity family must not rename three painted rectangles or a blurred message:

- **Theory and prediction:** calculate box edges, margin groups, overflow behavior, transform matrices, reference boxes, and filter pipelines before preview.
- **Worked example:** inspect a service-notice component with real content, a visible boundary, long-text changes, and one restrained decorative effect.
- **Guided workshop:** build a museum artifact label with content-driven box sizing, intentional spacing, safe overflow, and a bounded transform; prompts fade across changed content.
- **Faded practice:** style a different repair-guide callout from accepted semantics using learner-selected constraints and no copied rectangle recipe.
- **Debugging clinic:** repair negative margin arithmetic, border-box overflow, hidden focus content, transformed hit geometry, reversed filter order, clipped ink, and exposed “redacted” text.
- **Independent lab:** create a public-record summary interface whose content, size, overflow, effects, print output, and data disclosure follow stakeholder constraints rather than visual imitation.
- **Retrieval review:** answer first, inspect second, correct the model, then retry with changed signs, boxes, functions, and content.
- **Quiz:** combine rapid interpretation with executable geometry, scrolling, transform, filter, security, and causal-repair items.
- **Cumulative project:** defend box architecture, reset boundaries, overflow decisions, coordinate effects, filter fallbacks, accessibility, performance, data safety, and uncertainty.

Scenarios, stakeholders, content, starters, box relationships, overflow causes, transform lists, filter lists, state sets, failure cases, checks, hint routes, and artifacts must differ materially. New colors, angles, class names, or “secret” words do not create new practice.

## Required grading evidence

Relevant activities must require several of these evidence types, proportionate to stage:

- labelled content, padding, border, and margin boxes;
- declared, computed, used, client, scroll, border, and ink geometry where relevant;
- content-box and border-box arithmetic with changed borders, padding, and minimums;
- zero content floor and border-box expansion evidence;
- long word, replaced content, dynamic error, zoom, text spacing, and narrow-container survival;
- identified adjoining margin group before result calculation;
- positive, mixed-sign, all-negative, parent-child, sibling, and empty-through collapse results;
- formatting-context or spacing-ownership rationale for a repair;
- user-agent style inventory before and after a bounded reset;
- heading, list, form, focus, table, forced-color, and print behavior retained after reset;
- overflow cause hypothesis and controlling constraint;
- direct versus programmatic scroll behavior for hidden, clip, scroll, and auto;
- keyboard, touch, focus, nested-scroll, and static-media operation;
- transform list, origin, reference box, percentage basis, and predicted composed output;
- changed transform-order output and inspected client rectangle;
- ordinary-flow allocation versus rendered geometry;
- transform-created overflow, stacking, containing, hit, and focus effects;
- filter parameter meaning and ordered input/output trace;
- changed filter-order output;
- filter group, descendant, ink overflow, clipping, stacking, containing, and hit-testing evidence;
- actual rendered text, focus, component, and state contrast after effects;
- no-filter, unsupported, forced-color, print, preference, and low-performance fallback;
- DOM, source, clipboard, accessibility, and script evidence that a visual blur retains underlying text;
- proof that unauthorized sensitive data is absent before client delivery;
- causal diagnosis naming box, sizing, margin, formatting, overflow, coordinate, paint, filter, stacking, containing, accessibility, or data-boundary failure;
- corrected behavior on a changed case, not only the original screenshot;
- design and security rationale tied to stakeholder need and evidence limits;
- delayed retention and unfamiliar transfer.

A requested keyword, exact pixel value, non-`none` transform, `blur(3px)`, attractive screenshot, or visual match cannot pass a substantial activity.

## Anti-duplication, security, and performance boundaries

The painting workshop can inform interaction density but will not be copied, recolored, or renamed. The target guided build uses meaningful content and a different geometry problem. The independent lab cannot be another fixed decorative canvas or document with rotated stamps. Semantic duplication review compares content model, stakeholder, box relationships, failure causes, code shape, required reasoning, evidence, feedback, and output—not only prose similarity.

No learner task represents CSS blur, opacity, clipping, offscreen positioning, color matching, or transforms as security. Sensitive data is omitted, tokenized, or irreversibly redacted before unauthorized delivery. Examples use synthetic content. Canonical checks remain server-side. Browser previews remain sandboxed. Learner source never reaches host command execution.

Filters and large painted effects need measured performance evidence. The target does not teach `will-change`, transforms, or filters as universal acceleration recipes. Learners identify the affected load, layout, paint, compositing, memory, or interaction evidence and compare before and after on the supported matrix. A performance shortcut cannot remove content, focus, contrast, or user preferences.

## Remaining blockers

- The remaining 21 source blocks still require complete challenge-level inspection with zero guessed mappings.
- Independent subject reviewers must verify the five candidate maps and every technical correction against current specifications, Web Platform Tests, and supported-browser behavior.
- Instructional and assessment reviewers must approve the complete concept-to-activity matrix, fading plan, retrieval schedule, misconception treatment, item blueprint, corrective routes, and anti-duplication evidence.
- Accessibility review must approve reflow, scrolling, keyboard and touch operation, visible focus, reading and focus order, target geometry, contrast, motion, forced colors, print, and representative assistive-technology tasks.
- Security and privacy review must approve the false-redaction clinic, client-delivery boundary, synthetic data, authorized reveal behavior, clipboard/source/accessibility evidence, and canonical grading isolation.
- Browser and performance review must approve transform and filter ordering, geometry, stacking and containing behavior, ink overflow, fallbacks, and measured resource cost.
- Original scenarios, starters, checks, hints, feedback, solutions, and assessments are not yet authored.
- The first real HTML/CSS vertical slice must prove the single CodeMirror editor, sandboxed preview, parsed/computed/geometry diagnostics, saved evidence, server-side canonical checks, correction, recovery, and tablet/desktop flow.
- Representative beginners and disabled learners must complete, correct, retain, and transfer the intended outcomes; internal inspection and generated inventory cannot substitute for observed evidence.
- All course modules and projects remain `planned-not-authored`; no content is available or published.
- Lighthouse remains held until content, migration, duplication, editor, progress, navigation, runtime, accessibility, and learner-pilot work is complete.
