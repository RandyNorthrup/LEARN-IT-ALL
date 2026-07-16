# Responsive Web Design CSS Positioning source inspection

Reviewed: 2026-07-16

Status: complete direct inspection; candidate curriculum evidence only

## Decision

All five pinned CSS Positioning blocks are inspected challenge by challenge, including every one of the 80 cat-painting steps, the complete house lab, both 20-item quiz pools, and all 315 implementation checks. The family supplies substantial contact with `float`, `clear`, `position`, physical insets, transforms, and `z-index`. It does not teach a production positioning model.

LEARN-IT-ALL will replace coordinate tracing with prediction and inspection of:

- normal-flow participation and preserved or removed layout space;
- the box that establishes each containing block and the edge that forms it;
- static position and automatic inset, size, alignment, and margin resolution;
- physical versus flow-relative inset properties and writing modes;
- relative offsets and their scrollable-overflow consequences;
- absolute and fixed containing blocks created by position, transform, containment, or other properties;
- sticky constraint rectangles, nearest scrollports, containing-block limits, and overlap;
- float placement, line-box shortening, clearance, and independent formatting contexts;
- stacking-context creation, local stack levels, paint order, top-layer behavior, hit testing, and focus reachability;
- overflow, clipping, scrolling, zoom, changed content, print, and unsupported-feature cases;
- when normal flow, Flexbox, Grid, or an in-flow disclosure is safer than positioning;
- current anchor positioning as an explicit support-bounded extension, never as a substitute for semantics, keyboard behavior, focus, dismissal, or a fallback.

The terminal evidence is not a recognizable cat or house. It is a learner who can name the reference rectangle, predict used placement and paint order, inspect the browser’s result, diagnose a changed-case failure, choose a simpler layout when appropriate, and defend task access.

## Inspected source boundary

The inspection covers five source blocks from freeCodeCamp commit `c115efdd41f868d8850156f6a7a211219c35a847`:

| Source block | Type | Challenges | Question prompts | Implementation checks | Source bytes |
| --- | ---: | ---: | ---: | ---: | ---: |
| `lecture-understanding-how-to-work-with-floats-and-positioning-in-css` | lecture | 5 | 15 | 0 | 23,796 |
| `workshop-cat-painting` | workshop | 80 | 0 | 268 | 280,780 |
| `lab-house-painting` | lab | 1 | 0 | 47 | 16,962 |
| `review-css-positioning` | review | 1 | 0 | 0 | 4,654 |
| `quiz-css-positioning` | quiz | 1 | 40 | 0 | 19,286 |
| **Total** |  | **88** | **55** | **315** | **345,478** |

Every file was read from the pinned checkout, whose HEAD matched the recorded upstream commit. `references/freecodecamp-rwd-v9.json` remains the exact evidence record for source order, identities, paths, hashes, byte counts, section inventories, prompt counts, checks, and languages.

Direct inspection establishes neither technical authority nor instructional approval. It is not responsive, accessibility, assessment, retention, transfer, browser-support, security, learner-success, or publication evidence.

## Current primary evidence

The replacement is bounded by:

- [CSS Positioned Layout Module Level 3](https://www.w3.org/TR/css-position-3/), W3C Working Draft dated 7 October 2025, for static, relative, sticky, absolute, and fixed schemes; containing blocks; insets; static position; sizing; margins; alignment; paint order; and stacking contexts;
- [CSS 2.2 Visual Formatting Model](https://www.w3.org/TR/CSS22/visuren.html) and [stacking-context appendix](https://www.w3.org/TR/CSS22/zindex.html) for floats, clearance, normal flow, block formatting contexts, layered presentation, and detailed paint order;
- [CSS Display Module Level 3](https://www.w3.org/TR/css-display-3/) for in-flow and out-of-flow definitions, independent formatting contexts, `flow-root`, and the modern replacement for clearfix and overflow containment hacks;
- [CSS Overflow Module Level 3](https://www.w3.org/TR/css-overflow-3/) for scroll containers, clipping, scrollable overflow, and reachability;
- [CSS Transforms Level 1](https://www.w3.org/TR/css-transforms-1/) because transforms can create containing blocks and stacking contexts as well as changing painted geometry;
- [CSS Anchor Positioning Module Level 1](https://www.w3.org/TR/css-anchor-position-1/), W3C Working Draft dated 27 March 2026, for anchor association, `position-area`, `anchor()` and `anchor-size()`, and overflow-driven position fallbacks;
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/) for meaningful order, reflow, keyboard operation, visible and unobscured focus, content on hover or focus, pointer cancellation and target behavior, dragging alternatives, and motion or overlap consequences;
- [HTML Living Standard](https://html.spec.whatwg.org/) and current ARIA guidance where positioned disclosures, popovers, dialogs, tooltips, menus, or other interfaces need semantics, state, keyboard, focus, top-layer, and dismissal behavior.

The positioned-layout and anchor-positioning documents are Working Drafts. Open issues, changes, partial implementations, and Web Platform Tests remain freshness gates. Anchor positioning is an explicit modern extension because the pinned benchmark does not teach it. It may enter learner work only with an accepted support matrix, feature detection where needed, a complete fallback, and independent accessibility review.

## Source-family findings

### The lecture model is materially inaccurate

The lectures use approachable vocabulary, but several simplifications become false rules:

- a float is said to be removed from normal flow without explaining that line boxes shorten around it, block boxes can flow behind it, and float placement follows its own formatting rules;
- the closest “positioned ancestor” is presented as the only absolute-containing-block source, omitting transforms, containment, `will-change`, inline containing-block geometry, grids, and the initial containing block;
- absolute positioning is described as a separate layer, although out-of-flow placement does not itself mean a new compositor layer or a stacking context;
- fixed positioning is described as always viewport-relative, although a qualifying ancestor can establish the fixed containing block and paged media uses page areas;
- sticky is described as becoming fixed after a threshold, rather than relative positioning whose used offsets are adjusted against the nearest scrollport and constrained within its containing block;
- a non-auto inset on the relevant axis, available scroll range, scroll container, element size, and ancestor overflow are not included in the sticky model;
- `z-index` is described as working only on non-static positioned elements, omitting flex and grid items and other modern applicability;
- higher `z-index` is said to always paint above lower values, ignoring nested stacking contexts, paint phases, top-layer elements, and local scope;
- “the highest value” is treated as globally topmost, which is false when the element is trapped inside a lower ancestor context;
- fixed headers and modal-like overlays are recommended without focus obstruction, zoom, escape, content reachability, scroll locking, semantics, or dismissal constraints.

The target must tell learners when an explanation is a first approximation and then replace it with the correct model before assessment. A quiz cannot reward a statement the later professional model must unteach.

### Floats are still relevant, but clearfix is not the target default

The source correctly preserves the original useful float case: prose wrapping beside media. It also explains `clear` and shows a generated-pseudo-element clearfix. It does not explain enough behavior to predict failure:

- float placement from the current line and available inline space;
- block boxes versus their line boxes in the presence of floats;
- outer edges, margins, source order, and multiple floats;
- shrinking, downward movement when space is insufficient, and writing direction;
- clearance as a layout constraint rather than deletion or generic spacing;
- interaction with margin collapse and independent formatting contexts;
- float containment with `display: flow-root`;
- why `overflow: hidden` is a harmful containment hack when content must remain visible;
- why Flexbox and Grid are better for columns but not equivalent to figure-and-prose wrapping.

CSS Display explicitly provides `flow-root` as the switch that removes the need for clearfix and overflow hacks in this case. The replacement retains one authentic editorial wrapping task, makes learners predict the line boxes and container height, changes media size and text direction, and then requires migration of an obsolete float column layout to a suitable modern system.

### Position schemes need reference-rectangle evidence

The source organizes positioning around property names and coordinate literals. A durable model asks a consistent set of questions:

1. Is the box in flow, relatively shifted, sticky-adjusted, or out of flow?
2. Which formatting context would lay it out if static?
3. Which ancestor or initial rectangle establishes the applicable containing block?
4. Which edge—content, padding, scrollport, viewport, page area, grid area, or anchor-derived area—is the reference?
5. What are the computed and used inset values?
6. What happens when both opposing insets are non-auto, one is auto, or size and margins are auto?
7. Does the box create or enter a stacking context?
8. What contributes to scrollable overflow, clipping, and hit testing?
9. Can all content and focus remain reached at changed size, zoom, writing mode, and media?

The lectures do not inspect any of these. The target editor needs a containing-block and geometry overlay, computed/used style evidence where available, scroll-container identification, and a stacking-context trace. Learners must predict before viewing the trace.

### Relative positioning is not ordinary layout movement

The source demonstrates `position: relative; top: 30px; left: 30px` and notes that original space remains. It does not drive home the consequences:

- sibling layout is based on the unshifted position;
- the visual box can overlap other content;
- the shift can enlarge ancestor scrollable overflow;
- physical `left` moves the box right and physical `top` moves it down;
- opposing insets can overconstrain an axis and resolve according to writing direction;
- flow-relative insets are safer for different writing modes;
- relative positioning is often used only to establish an absolute containing block, but transform or containment may change the intended reference unexpectedly;
- margins, transforms, and relative insets have different layout and paint effects.

Target practice compares normal margins, transforms, relative offsets, and an actual layout system for the same changed requirement. The learner must choose based on whether surrounding layout should respond.

### Absolute and fixed positioning are taught as coordinate shortcuts

The source says absolute positioning makes the element behave independently and recommends it for modals, tooltips, dropdowns, and overlays. That recommendation collapses placement into a complete component.

Absolute positioning supplies no:

- dialog, tooltip, menu, listbox, or popover semantics;
- trigger name or expanded state;
- keyboard interaction;
- initial focus, containment, restoration, or focus visibility;
- dismissal, escape behavior, outside interaction, or return path;
- top-layer or backdrop behavior;
- collision handling or viewport fit;
- live status behavior;
- no-script or unsupported-feature fallback;
- protection from clipping by an ancestor;
- reason to exist instead of an in-flow disclosure.

Fixed positioning can also make content permanently unreachable when it extends beyond the viewport. A transformed or contained ancestor can change its containing block. In print, fixed content can repeat on pages. A production course must test all of these before accepting a persistent header, floating action, or overlay.

### Sticky is not “relative until fixed”

The source’s hybrid metaphor is common but insufficient. Sticky remains in flow and is offset relative to a sticky view rectangle based on its nearest scrollport. It remains constrained by its containing block. Multiple sticky siblings can overlap. A sticky element can appear not to work when:

- both insets on the relevant axis are auto;
- there is no useful scroll range;
- the sticky box is too large for the available rectangle;
- an ancestor creates a scroll container unexpectedly;
- the containing block ends before the expected viewport range;
- grid or flex stretching eliminates the expected movement;
- overflow or containment changes the scrollport;
- another sticky or fixed element obscures it.

The source examples do not diagnose any of these. The fixed-header example uses a 500-pixel width and body padding as a manual compensation. It never checks a fragment destination or focused control hidden beneath the header.

The target clinic varies the scroll container, containing block, inset, content height, box size, zoom, and overlapping sticky elements. Learners must identify the cause rather than increase `z-index` or add padding blindly. Persistent UI must pass focus-not-obscured and content-reachability checks.

### Stacking context is not one global z-index list

The lecture and quiz describe `z-index` as a vertical order number, say it only works for positioned elements, and ask which integer puts an element above all others. The workshop says a higher value will “always” place an ear above a lower-valued box. The house lab accepts a negative chimney value as proof that it is behind the house.

A correct model must include:

- the root stacking context;
- positioned contexts created by non-auto `z-index`;
- fixed and sticky contexts with `z-index: auto`;
- flex and grid items with non-auto `z-index`;
- transforms, opacity, filters, isolation, containment, blending, and other context triggers;
- negative, zero/auto, in-flow, float, inline, and positive paint phases;
- the atomic treatment of a descendant context inside its parent;
- top-layer elements outside ordinary author stacking;
- hit testing, pointer access, and visible focus when layers overlap;
- small semantic layer tokens rather than escalating integers.

The replacement stacking inspector must show why a child with `z-index: 999999` can still paint below a sibling context. Learners repair the context boundary or layer architecture, then verify pointer and keyboard access. They do not pass by choosing a larger number.

### The 80-step workshop is pixel tracing with add/remove churn

The cat workshop dedicates early steps to adding document boilerplate, reset-like box sizing, background, and a fixed-size head. Steps 7 through 16 cycle the same head through static, relative, absolute, fixed, and sticky positioning, add a 600-pixel-tall black box to manufacture scroll, then delete the box and its CSS. The source even tells learners that experimental inset values will not pass unless they use hidden exact values.

Steps 17 through 80 build decorative ears, eyes, nose, mouth, and six whiskers from nested generic elements, transparent borders, radii, transforms, and dozens of absolute pixel coordinates. Nearly every instruction names the selector, property, and literal value. The result exercises typing and visual imitation, not positioning judgment.

The learner never has to:

- choose the containing block;
- predict a used position;
- inspect which ancestor established the reference;
- handle long or translated content;
- preserve a real control or reading task;
- diagnose a sticky or fixed failure;
- compare normal flow, grid, flex, and positioning;
- account for writing mode or logical insets;
- trace stacking-context boundaries;
- make a positioned element fit a viewport;
- retain focus visibility and reachability;
- build a support fallback;
- transfer the concept to a non-illustration artifact.

Add-then-delete steps inflate interaction counts without building retained competence. Deliberate experimentation can be valuable, but the experiment needs a prediction, an observed result, a model update, and later retrieval. It should not require deleting evidence merely to continue a prescribed drawing.

### The 268 workshop checks inspect source shape, not layout behavior

Direct check inspection found:

- 62 of 80 steps use a CSS rule/declaration inspection helper;
- 15 steps inspect DOM selectors or element counts;
- four steps include source matching;
- zero steps call `getComputedStyle`;
- zero steps inspect a bounding rectangle, containing block, scroll container, scroll position, overflow region, or paint order;
- zero steps vary content, viewport, zoom, writing mode, ancestor properties, or user settings;
- zero steps verify focus visibility, hit testing, keyboard operation, or complete task access.

The checks can establish that an exact selector and literal were typed. They cannot establish that an element used the intended containing block or stayed reachable. Even the early positioning experiments are graded by source declarations rather than the behavior the prose says learners should observe.

The replacement must grade behavior from changed cases. Source inspection can reject forbidden host execution or unsafe constructs, but it cannot award positioning mastery.

### The house lab repeats the same illustration instead of testing transfer

The lab changes a cat into a house while retaining the same core task: arrange decorative generic boxes at fixed coordinates inside a fixed-size canvas. It requires:

- a 500-by-400-pixel house;
- explicit absence of every min/max size property;
- five exact descendant IDs;
- absolute positioning for every immediate child;
- width, height, border, and background declarations on each part;
- a roof at top zero, a door at bottom zero, windows at numeric offsets, and a negative-layer chimney.

This is not independent transfer. The requirements choose the layout system and most evidence before the learner sees the problem. They explicitly prohibit resilient size bounds. The result has no real content, interaction, responsive need, or stakeholder constraint.

The checks also overstate what they prove:

- any nonempty border or background value passes without assessing rendering or contrast;
- a positive `left` or `right` value is described as proving an item lies inside the house, but it does not account for item width, borders, transforms, or the opposite edge;
- window checks depend on numeric top and bottom values rather than actual geometry;
- a negative chimney stack level is treated as proof of correct paint order without tracing stacking contexts;
- exact selector rules can pass despite later cascade overrides;
- no changed viewport or content case exists;
- no check detects clipping, offscreen content, overlap failure, or unreachable focus.

The provided solution adds extra decorative smoke, welcome text, gradients, transforms, fixed viewport height, and Flexbox centering. Those additions are not evidence that the required lab tests valid positioning decisions.

The target independent lab must use an unfamiliar functional artifact—such as a map callout, data annotation, anchored help panel, or sticky table control—with multiple possible layouts. Learners choose positioning only for the bounded out-of-flow need and preserve the task under changed cases.

### The review repeats the inaccurate mental model

The review says floats are removed from normal flow, teaches the clearfix hack, describes sticky as turning into fixed, fixed as viewport-relative, and `z-index` as vertical order for positioned elements. It offers editable examples but no prediction or assignment beyond reviewing the page.

A reference can be useful after understanding exists. It cannot repair inaccurate rules or substitute for retrieval. The target reference must show scheme, flow participation, containing-block rule, inset reference, scroll behavior, stacking behavior, common failures, and inspection steps in one comparison table, with draft and support status clearly bounded.

### Both quiz pools reward false or shallow rules

The 40 prompts are dominated by vocabulary, syntax recognition, property names, and fixed snippets. Materially weak or false accepted answers include:

- floats are simply removed from flow;
- `z-index` only affects non-static positioned elements;
- a higher z-index pair necessarily puts one box above another without ancestor context;
- fixed is always viewport-relative;
- 10% top on fixed is always based on viewport height;
- an unpositioned parent makes an absolute child relative to something “such as the body,” confusing the body with the initial containing block;
- sticky “behaves like relative until a specified scroll position” without nearest-scrollport and containing-block constraints;
- one `top` and `left` snippet is presented as the upper-left corner of the page without identifying the containing block;
- absolute positioning is said to make an element behave independently, hiding sizing, overflow, static-position, and paint dependencies.

No item asks a learner to trace a nested containing block, explain a sticky failure, draw a paint order, compare actual geometry, repair focus obstruction, or choose against positioning. Passing 18 recognition questions is not terminal assessment.

The replacement quiz uses diagrams, traces, changed ancestors, writing modes, and failure symptoms. The exam requires diagnosis, repair, re-test, and defense in a new artifact.

## Complete workshop-step inspection

Every workshop step was inspected. The sequence can be summarized without reusing learner-facing material:

| Steps | Source contact | Replacement judgment |
| --- | --- | --- |
| 1–6 | stylesheet, box sizing, background, landmark, fixed box, gradient | Retrieve existing CSS foundations; do not count setup and decorative values as positioning evidence. |
| 7–13 | static, relative, absolute, fixed, sticky, manufactured scroll | Keep as a prediction lab only after correcting containing-block and sticky models; save observations instead of deleting them. |
| 14–16 | absolute centering, removal of temporary markup and CSS | Compare absolute auto-inset/auto-margin behavior with Grid and Flexbox centering; reject unnecessary out-of-flow layout. |
| 17–38 | ears and inner ears from borders, radii, transforms, absolute coordinates, z-index | Decorative tracing has low transfer value. A bounded geometry sandbox may demonstrate paint, but cannot dominate the sequence or assess stacking. |
| 39–62 | eyes, nose, and mouth with more generic elements and exact coordinates | Repetition reinforces coordinate copying, not new concepts. Replace with faded changed-case tasks and a functional callout. |
| 63–80 | six whiskers with repeated one-pixel lines, coordinates, and rotations | Pure repetition with no choice, diagnosis, responsive behavior, or transfer. Remove from target curriculum. |

## Bounded source-to-concept mapping

The five blocks now receive explicit maps. The former module-wide positioning bundle is removed.

- The lecture maps to normal flow, formatting contexts, display/flow-root, positioned containing blocks, stacking contexts, and floats.
- The workshop maps only to the HTML landmark and CSS loading, selectors, box, sizing, colors, gradients, normal-flow, positioning, stacking, and transform concepts it contacts.
- The house lab maps to loading, selectors, boxes, sizing, colors, gradients, normal flow, positioning, and stacking. It receives no responsive or transfer credit.
- The review maps to generated clearfix content, display/flow-root, normal flow, positioning, stacking, and floats.
- The quiz maps to its sampled pseudo-element, flow, positioning, stacking, and float vocabulary and remains invalid as a terminal assessment.

CSS anchor positioning remains an explicit modern extension with zero benchmark credit. Source mapping records scope contact and defects; it does not approve or authorize copying any source work.

## Target learning progression

1. **Retrieve normal flow and formatting contexts.** Predict block and inline layout before overriding it.
2. **Use floats only for genuine content wrapping.** Inspect line boxes, clearance, container height, writing direction, and `flow-root`; migrate a float column layout.
3. **Compare static and relative positioning.** Track original layout space, visual offset, scrollable overflow, logical insets, and overlap.
4. **Establish absolute containing blocks deliberately.** Vary positioned, transformed, contained, inline, grid, and absent ancestors and inspect the reference edge.
5. **Resolve insets, size, margins, and static position.** Predict auto and overconstrained cases instead of always specifying top, left, width, and height.
6. **Debug fixed placement and media behavior.** Vary transformed ancestors, zoom, viewport size, long content, and print; keep every control reachable.
7. **Debug sticky constraints.** Identify nearest scrollport, sticky view rectangle, containing-block end, axis inset, size, overlap, and focus obstruction.
8. **Trace stacking contexts and paint order.** Draw boundaries and phases; repair a trapped high z-index without escalating the number.
9. **Build one complete positioned interface.** Add semantic disclosure or popover behavior separately from placement and pass keyboard, focus, dismissal, zoom, and overflow tests.
10. **Use anchor positioning as a guarded extension.** Compare manual and anchor-based placement, inspect fallbacks, preserve an unsupported-feature path, and reject it when an in-flow layout is better.
11. **Transfer to an unfamiliar stakeholder task.** Begin from an empty style boundary, choose the layout mechanism, diagnose changed failures, and defend remaining uncertainty.

Every later grid, responsive, animation, lab, and project task retrieves flow, containing-block, paint-order, focus, overflow, and changed-case requirements.

## Required interactions

The platform should provide:

- a normal-flow ghost showing the original position of a relatively shifted box;
- a containing-block overlay naming the ancestor and reference edge;
- computed and used inset, size, margin, and static-position evidence where the browser exposes it;
- a scroll-container and sticky-view-rectangle overlay;
- a stacking-context tree with paint phases and top-layer separation;
- hit-test and focus-order traces over overlapping content;
- a float and line-box visualizer;
- toggles for ancestor `position`, `transform`, `contain`, `overflow`, writing mode, and direction;
- changed content, zoom, viewport, print, and unsupported-feature cases;
- anchor-placement and winning-fallback inspection;
- progressive hints that move from symptom to invariant to inspection target to bounded mechanism.

None of these visualizers is itself mastery. Learners must predict first, explain discrepancies, make a repair, and pass an unpreviewed changed case.

## Assessment contract

| Claim | Required evidence | Insufficient alone |
| --- | --- | --- |
| Position scheme is understood | flow participation, original space, containing block, inset reference, scroll response, changed case | correct `position` keyword |
| Absolute placement is correct | actual geometry inside intended containing block, auto/size behavior, overflow and task reachability | top/left declarations |
| Fixed UI is usable | containing-block trace, zoom/reflow, long content, focus not obscured, scroll and print behavior | stays visible while scrolling |
| Sticky UI is correct | nearest scrollport, constraint rectangle, containing-block range, inset axis, overlap and focus cases | `position: sticky; top: 0` present |
| Layering is correct | stacking-context tree, paint order, hit testing, focus path, top-layer policy | larger `z-index` |
| Float is appropriate | authentic wrap, line behavior, clearance, flow-root containment, direction and media changes | `float: left` and clearfix |
| Anchor positioning is production-ready | support boundary, semantic behavior, logical placement, overflow fallback, unsupported-feature path | anchor syntax parses |
| Transfer is independent | unfamiliar functional task, learner-selected mechanism, changed cases, diagnosis and defense | another decorative fixed canvas |

## Originality and duplication constraints

The target must not reuse or lightly rename:

- the cat painting, its 80-step sequence, selectors, geometry, or colors;
- the house painting, fixed IDs, fixed 500-by-400 canvas, or solution;
- add-and-delete black-box scrolling steps;
- exact coordinate prompts;
- clearfix as the primary containment solution;
- lecture or quiz wording;
- source checks, distractors, hints, or solutions;
- any decorative workshop with a different animal, building, face, or palette as alleged transfer.

Candidate real tasks include an anchored field explanation, sticky data-table controls, a map annotation, an incident-status callout, an editorial figure, and a constrained comparison panel. Each requires separate stakeholder, accessibility, runtime, support, and assessment review.

## Inspection outcome

This wave adds one explicit modern concept: `css-anchor-positioning-fallbacks`. It is not credited to freeCodeCamp v9. The existing position, stacking, and float concepts now use primary specification anchors and stronger changed-case evidence.

After this wave, the candidate alignment contains:

- 127 agent-inspected source blocks;
- 1,090 inspected source challenges;
- 1,135 captured question prompts in inspected blocks;
- 3,548 inspected implementation checks;
- 133 block-specific candidate mappings;
- 24 uninspected source blocks with exact evidence and zero guessed concepts;
- one unavailable assessment container with zero concept claims;
- 31 total source blocks still requiring challenge-level inspection;
- 184 target concepts, including eight explicit modern extensions and six unresolved concepts.

These are research facts, not a completed course. Independent subject, instructional-design, assessment, accessibility, security, browser-support, and duplication reviews remain required. The full activity matrix, authored learner work, runtime and grading evidence, representative learner observation, repair, and re-test remain blocking.

