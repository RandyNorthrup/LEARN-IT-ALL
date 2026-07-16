# Responsive Web Design CSS Animations source inspection

Reviewed: 2026-07-16

Status: complete direct inspection; candidate curriculum evidence only

## Decision

All seven pinned CSS Animations blocks are inspected challenge by challenge, prompt by prompt, check by check, seed by seed, and solution by solution. Together they contain 139 challenges, 46 question prompts, 451 implementation checks, and 510,809 source bytes. The source introduces transitions, transforms, keyframes, animation longhands and shorthand, easing, iteration, motion concerns, and `prefers-reduced-motion`. It then spends 133 workshop/lab challenges tracing decorative fixed-coordinate art. It does not establish motion purpose, state continuity, complete timing behavior, user control, reduced-motion equivalence, flash safety, runtime performance, causal debugging, changed-case regression, or independent transfer.

The module violates its own order. The second lecture tells learners to respect reduced-motion preferences and provide pause, stop, or hide controls. The immediately following Ferris Wheel, Moon Orbit, and Flappy Penguin activities require infinite motion and provide neither a preference adaptation nor control. The 104-step Penguin workshop defers animation until step 95; the preceding 94 steps are mostly exact-coordinate CSS drawing. This is not a pedagogical animation progression.

The former module bundle also overclaimed evidence. None of the seven blocks exercises DevTools-based causal debugging or changed-case regression, so `css-devtools-causal-debugging` and `css-changed-case-regression` are removed from this source family. The Personal Portfolio lab is misclassified as animation work: its 12 tests require no animation, transition, reduced-motion behavior, or motion evidence. Empty files and a lab label do not award `css-independent-transfer-defense`.

The source remains bounded benchmark evidence for contact with:

- `transform`, `transform-origin`, translate, rotate, scale, skew, and composed transform lists;
- transition and animation shorthand/longhand syntax;
- keyframe names, offsets, interpolation examples, duration, delay, easing, iteration, direction, fill, and play state in lecture/review/quiz material;
- `prefers-reduced-motion`, motion sensitivity, distraction, flashing risk, and the idea of pause/stop/hide controls;
- a large set of prior HTML, selector, box, color, custom-property, positioning, Flexbox, Grid, responsive, and portfolio contacts in the workshops and labs.

LEARN-IT-ALL will not publish renamed Ferris Wheel, orbit, Penguin, or fake portfolio replicas. The replacement teaches motion as a behavior system. Learners classify purpose, predict timelines, build state transitions and bounded keyframes, provide control and preference alternatives, inspect actual animation state and rendering cost, repair injected defects, and transfer the model to unfamiliar interface feedback. Decorative art can be optional extension practice after the core evidence passes.

## Exact source boundary

The inspection covers these blocks at freeCodeCamp commit `c115efdd41f868d8850156f6a7a211219c35a847`:

| Source block | Type | Challenges | Prompts | Checks | Bytes |
| --- | ---: | ---: | ---: | ---: | ---: |
| `lecture-animations-and-accessibility` | lecture | 2 | 6 | 0 | 12,616 |
| `workshop-ferris-wheel` | workshop | 29 | 0 | 96 | 75,166 |
| `lab-moon-orbit` | lab | 1 | 0 | 33 | 11,654 |
| `workshop-flappy-penguin` | workshop | 104 | 0 | 310 | 379,457 |
| `lab-personal-portfolio` | lab | 1 | 0 | 12 | 16,169 |
| `review-css-animations` | review | 1 | 0 | 0 | 2,851 |
| `quiz-css-animations` | quiz | 1 | 40 | 0 | 12,896 |
| **Total** |  | **139** | **46** | **451** | **510,809** |

The pinned challenge identities, order, relative paths, SHA-256 values, byte counts, section inventories, check counts, prompt counts, and languages remain in `references/freecodecamp-rwd-v9.json`. Direct inspection does not prove technical authority, originality permission, instructional sufficiency, accessibility, motion safety, performance, assessment validity, retention, transfer, or learner success.

## Current primary evidence

The replacement is bounded by:

- [CSS Transitions Level 1](https://www.w3.org/TR/css-transitions-1/), Working Draft dated 8 January 2026, for transitionable properties, before-change and after-change style, generation, reversing behavior, events, duration, delay, easing, and shorthand behavior;
- [CSS Transitions Level 2](https://www.w3.org/TR/css-transitions-2/), Working Draft dated 4 February 2026, for the Level 1 delta including discrete transition behavior and `@starting-style`, with explicit draft limitations;
- [CSS Animations Level 1](https://www.w3.org/TR/css-animations-1/), Working Draft dated 2 March 2023, for keyframes, animation properties, timing, events, and CSS animation behavior;
- [CSS Animations Level 2](https://www.w3.org/TR/css-animations-2/), Working Draft dated 2 June 2023, for owning elements, composite order, computed and used keyframes, coordinating lists, composition, timelines, and Web Animations relationships, with explicit draft limitations;
- [CSS Easing Functions Level 2](https://www.w3.org/TR/css-easing-2/), First Public Working Draft dated 29 August 2024, for input progress, output progress, cubic Bézier, steps, and linear easing functions;
- [CSS Transforms Level 1](https://drafts.csswg.org/css-transforms/), reviewed 16 July 2026, for coordinate spaces, reference boxes, transform order, origins, overflow, client rectangles, containing blocks, and stacking contexts;
- [Media Queries Level 5](https://www.w3.org/TR/mediaqueries-5/), Working Draft dated 19 February 2026, for the reduced-motion preference as a request to remove or replace nonessential motion;
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/), for keyboard operation, timing, pause/stop/hide, three flashes or below threshold, animation from interactions, focus, target size, status, reflow, and non-color meaning;
- [Chrome DevTools runtime performance guidance](https://developer.chrome.com/docs/devtools/performance), updated 23 October 2024 and reviewed 16 July 2026, for recording runtime behavior, frame evidence, CPU work, layout, paint, compositing, and cause tracing rather than assuming a property is fast.

Specifications define animation and transition mechanics. They do not decide whether motion is necessary, safe, comprehensible, or effective for a particular learner artifact. WCAG conformance does not establish comfort for every person. One browser performance trace does not establish all-browser behavior. Draft-only features require support and fallback evidence.

## Lecture findings

### The animation lecture is a property inventory, not a timing model

The first lecture correctly identifies `@keyframes`, animation binding, duration, timing function, delay, iteration, direction, fill, and play state. It shows translation and color examples and distinguishes a simple transition example from a keyframe animation. Its three questions retrieve only the purpose of keyframes, duration syntax, and infinite iteration.

Important omissions and inaccuracies remain:

- “smoothly transition elements between different styles” collapses transitions and keyframe animations and does not explain before, active, after, underlying, and animated values;
- percentages are described as animation progress without distinguishing keyframe offset, iteration progress, easing input/output, direction, delay, and timeline;
- interpolation type, non-animatable/discrete values, missing keyframes, duplicate offsets, cascade, animation lists, event timing, negative delay, zero duration, fill, cancellation, and interruption are not practiced;
- the color example loops forever and communicates state only through color;
- the hover example is not keyboard-equivalent and is a transition, despite the surrounding animation lesson;
- “without JavaScript” is a boundary statement, not evidence that CSS is the correct mechanism for every trigger, sequence, or control;
- “performant” is asserted without recording frames, layout, paint, composite work, or low-capability behavior.

The target begins with a timeline simulator. Learners predict underlying style, before-change style, after-change style, keyframe offsets, eased progress, iteration, direction, fill, pause, cancellation, and interruption. The browser then exposes computed state and animation objects so prediction can be compared with behavior.

### The accessibility lecture recommends a brittle global override

The second lecture correctly names vestibular discomfort, distraction, moving text, flashing risk, reduced-motion preference, and the need for user controls. It also says reduced motion need not erase every useful state cue. Those ideas should be cumulative requirements.

Its main code example applies a universal selector, four `!important` declarations, `0.01ms` durations, one iteration, and automatic scrolling. Problems include:

- an almost-zero duration is not the same contract as no animation and can still generate animation lifecycle behavior;
- code that waits for transition or animation events can race, time out, or observe different timing;
- one global rule cannot classify essential, orienting, feedback, decorative, vestibular, parallax, zoom, or flashing motion;
- universal important overrides can interfere with components and do not explain cascade layers, origins, or third-party boundaries;
- one iteration still plays motion and may preserve the risky transform;
- reduced motion can require replacement, smaller distance, opacity, immediate state, or user control rather than only shorter time;
- the three prompts reward the blanket recipe, including the claim that `0.01ms !important` “effectively turns off” animation.

The target makes learners classify motion by purpose and risk. Each component defines an ordinary mode and a reduced mode that communicate the same state and preserve operation. Tests emulate both preferences, compare task results, and reject rules that merely shorten dangerous movement while retaining its distance or flash.

## Complete 29-step Ferris Wheel audit

Steps 1–15 build an exact decorative wheel: one wrapper, six empty spans, six empty cabin divs, fixed border and margin, absolute positioning, viewport-relative square size, maximum size, line geometry, six positional selectors, and cabin coordinates. Steps 16–24 add two infinite rotation animations and change one easing function. Steps 25–29 animate cabin background colors at prescribed offsets.

Useful contact includes transform origins, rotation, offsets, keyframes, longhands, shorthand, duration, iteration, timing functions, and continuity across a looping boundary. The activity nevertheless fails as target instruction:

- more than half the workshop is an exact coordinate trace before the first keyframe;
- empty spans and divs create no meaningful document or user task;
- six separate positional recipes do not generalize to changed cabin counts or sizes;
- the wheel and cabins move forever without pause/stop/hide controls or reduced-motion adaptation;
- the cabin easing explanation calls `ease-in-out` “natural” without relating input/output progress to the required physical model;
- color animation carries no task state and does not check non-color meaning or contrast throughout interpolation;
- the loop repair changes colors by recipe without asking the learner to predict the missing endpoint interpolation;
- no check samples timeline states, rendered geometry, visual continuity, runtime work, preference mode, or changed content.

The 96 checks consist of 85 CSS parser/helper checks, 10 static DOM checks, and one source-shape check. They assert exact selectors and serialized values. They do not run or inspect the animation.

The replacement guided workshop uses a status indicator for a real asynchronous task. Learners first implement an immediate, fully understandable state change, then add a bounded transition that improves continuity. They inspect rapid reversal, interruption, reduced motion, failure, and completion. Decorative motion is optional and cannot hide status.

## Moon Orbit lab findings

The lab contains 16 stories and 33 checks. It requires a 200-pixel fixed canvas, three generic divs, relative and absolute positioning, exact 100/200/30-pixel sizes, exact translate values, circles, one `orbit` keyframe, a five-second linear infinite rotation, and specific transform serialization.

The block is not independent animation transfer:

- nearly every implementation decision is prescribed;
- its “orbit” is a rotating box with one child, not a physical model and not an accurate astronomical representation;
- the markup provides no textual explanation or alternative for the visual relationship;
- the infinite animation has no control or reduced-motion path despite the immediately preceding accessibility lecture;
- transform order is mandated but never traced through reference boxes or matrices;
- no check observes angle, timeline time, path, center, frame output, or reduced mode;
- exact CSS strings reject equivalent defensible implementations and reward copying;
- a full-viewport-height centering recipe is unrelated to animation competence and can create small-height problems.

The 33 checks are 27 CSS parser/helper checks and six static DOM checks. No computed timeline, geometry, interaction, accessibility, performance, changed-case, diagnosis, or transfer evidence exists.

The replacement faded lab uses an orbit-like loader only if the learner can state its purpose and provide an equivalent reduced mode. The learner chooses transform origin and keyframes from a drawn coordinate model, inspects sampled positions, adds stop behavior, and passes changed size, duration, direction, and preference cases.

## Complete 104-step Flappy Penguin audit

### Steps 1–27 build fixed scenery and hide failure

The first 27 steps link CSS, set exact gradients, force a `100vh` body, hide all overflow, add fixed-size ground and mountains, layer generic divs with global z-index numbers, and position a decorative sun partly outside the viewport. Hiding both scrollbars conceals overflow rather than solving it. The lesson incorrectly says setting `z-index: 3` makes an element “third in the stacking context”; stack levels are not global ordinal slots, and the activity never traces stacking-context formation.

### Steps 28–70 trace a coordinate drawing

Forty-three steps construct head, body, faces, chin, eyes, lids, blush, and beak using nested generic divs, global absolute positioning, fixed percentages, radii, gradients, opacity, and exact left/right coordinates. There is no animation model in this interval. Generated pseudo-content, custom properties, shapes, and selectors are prior CSS retrieval, but the rigid serial trace crowds out prediction, debugging, and learner choice.

### Steps 71–94 add clothing and limbs through more exact placement

Twenty-four steps add an emoji shirt, text, feet, arms, custom properties, transform origins, rotate/scale lists, and negative coordinates. The prose includes contrived “fun facts” such as a penguin being unable to stand without at least two feet and unable to fly without wings. These are not reliable subject facts and are not needed to teach CSS.

### Steps 95–104 finally add one animation and a misleading interaction

Only the last ten steps address motion. Four waypoints alternate two transform lists on the left arm. The animation runs linearly and infinitely. The lesson then styles `:active` on a non-interactive penguin div, scales it by 50%, and assigns `cursor: not-allowed` because it only looks draggable. This creates an interaction affordance that has no semantic action, no keyboard equivalent, no accessible name, and no stated learning purpose. A transition is added, and ground height is calculated from two fixed dimensions.

The final artifact:

- ignores the reduced-motion lesson and offers no stop control;
- hides overflow for the full page;
- uses a non-interactive div as a pointer-only active target;
- visually says “not allowed” while still animating on activation;
- contains no meaningful alternative for the CSS art;
- uses global z-index numbers and absolute positioning as recipes;
- has no changed-size, changed-text, zoom, reduced-height, keyboard, focus, forced-color, performance, or missing-style case;
- tests no animation timeline state or rendered frame.

The 310 checks consist of 204 CSS parser/helper checks, 72 static DOM checks, and 34 source-shape checks. No computed timeline, geometry, input operation, accessibility-tree, preference emulation, runtime performance, changed case, causal diagnosis, or transfer evidence exists.

LEARN-IT-ALL rejects the 104-step trace as core animation instruction. A short optional CSS-art extension may retrieve transforms and custom properties after the learner passes meaningful motion work, but it cannot substitute for motion competence.

## Personal Portfolio lab findings

The Personal Portfolio lab is placed inside CSS Animations but its 11 stories and 12 checks require no animation behavior. It checks a welcome section, nonempty `h1`, project section, project tile, project link, fragment navigation, external profile link, any media rule, full viewport height, and one persistent top coordinate.

The supplied solution contains hover transitions and transforms, but none is required or tested. It also:

- explicitly tells the learner that the portfolio, projects, and contact details are fake;
- links to freeCodeCamp's projects and accounts rather than the learner's evidence;
- includes placeholder email and telephone data;
- repeats generic `alt="project"` on every project image;
- opens many new tabs without testing purpose, focus, or opener behavior;
- drops the seed's language, character encoding, title, and viewport metadata;
- contains malformed duplicate closing body tags;
- uses old third-party icon and font dependencies;
- removes link underlines and supplies hover-only feedback without focus equivalents;
- fixes navigation and enables smooth scrolling without reduced-motion or target-obscuration evidence;
- changes root font size through copied breakpoint calculations;
- calls an auto-fit Grid “automagic” while adding a fixed 320-pixel minimum and a later patch;
- uses one initial/after-scroll coordinate check as proof of usable persistent navigation.

The 12 checks are ten static DOM checks, one media-rule presence check, and one scroll-coordinate check. There is no project validity, link success, asset provenance, responsive task, accessibility, transition, animation, reduced-motion, performance, correction, or transfer evidence.

The target portfolio is a later authentic certification project, not an animation lab. It displays the learner's actual verified course artifacts and evidence. No fake projects, metrics, contact details, or dead links are allowed. Motion is optional and graded only if it improves a named task while preserving focus, reduced mode, control, and performance.

## Review and quiz findings

The review repeats two short examples: an unbounded slide-in animation and a hover-only transform transition with a reduced-motion rule. It omits timeline prediction, controls, interruption, fill behavior, flash thresholds, performance inspection, and corrections. It is a reference sheet, not retrieval practice.

The quiz contains two pools of 20 recognition questions. It samples transform direction, keyframe syntax, duration, delay, timing, iteration, direction, fill, play state, shorthand, motion concerns, and `prefers-reduced-motion`. It contains several weak or misleading items:

- “top level, outside any selectors” ignores valid conditional grouping contexts and tests source placement as a slogan;
- `50%` is called the halfway point without distinguishing keyframe offset, eased progress, and visual distance;
- “all animation properties” is not a safe description of shorthand coverage as levels evolve and coordinating-list behavior matters;
- the blanket `0.01ms !important` and one-iteration recipe is rewarded rather than tested for behavioral equivalence;
- performance and accessibility appear as recall claims with no trace, task, preference, control, or changed state;
- duplicated property questions crowd out cancellation, interruption, underlying style, missing keyframes, multiple animations, negative delay, discrete behavior, events, control, and repair.

All 46 lecture and quiz prompts are immediate recognition. None requires a learner to predict a timeline, operate a control, inspect animation state, emulate a preference, measure frames, repair motion, compare alternatives, or transfer the model.

## Complete 451-check audit

| Mechanism | Count | What it can establish | What it cannot establish |
| --- | ---: | --- | --- |
| CSS parser/helper checks | 317 | selector and declaration presence, exact serialized values, keyframe names/offset strings, media-rule presence | animation playback, eased progress, interruption, controls, reduced-mode equivalence, frame cost, geometry, accessibility, or transfer |
| Static DOM checks | 98 | required element/class/relationship counts and selected text/link attributes | semantics, keyboard operation, meaningful alternatives, authentic content, animation state, responsive behavior, or success |
| Source-shape checks | 35 | prescribed source tokens or patterns | parsed behavior, rendered output, cascade result, timeline state, changed cases, or understanding |
| Scroll-coordinate check | 1 | one navigation rectangle remains near viewport top before/after one scroll | usable persistent navigation, focus/target visibility, reflow, zoom, changed height, or animation competence |

There are zero computed animation-state checks, sampled timeline checks, transition reversal checks, preference emulations, pause/stop/hide operations, flash analyses, frame or paint traces, keyboard sequences, accessibility-tree checks, changed-content cases, causal debugging tasks, delayed retrieval tasks, or transfer defenses.

## Original LEARN-IT-ALL motion sequence

### 1. Motion purpose and risk sort

Learners classify examples as state feedback, continuity, orientation, progress, decoration, attention capture, vestibular risk, flashing risk, or unnecessary delay. They identify what information must remain when motion is removed and choose immediate, reduced, or no-motion alternatives before writing CSS.

### 2. Transition state laboratory

A real save/status component begins with correct immediate states. Learners add a transition to one intentional property, predict before/after values, choose duration and easing from the feedback purpose, and test rapid reversal, repeated activation, disabled state, keyboard/pointer parity, and a newly added property. `transition: all` is an injected defect, not a recommended default.

### 3. Easing and interpolation simulator

Learners manipulate linear, cubic Bézier, steps, and linear-stop functions. A graph shows input progress, output progress, property value, and time separately. Changed cases include non-animatable, discrete, color, length, transform-list, and custom-property behavior. The learner explains when an easing choice delays critical feedback or creates overshoot risk.

### 4. Keyframe timeline workshop

Learners assemble keyframes from an underlying correct state and predict delay, negative delay, missing endpoints, direction, iteration, fill, pause, cancellation, and completion. The browser exposes computed keyframes and sampled state. The artifact remains correct when animation is absent, unsupported, paused, or finished.

### 5. Reduced-motion equivalence clinic

Each motion purpose receives an ordinary and reduced mode. Tests emulate both preference values, compare task state, and verify that no essential content or feedback disappears. Learners repair a global almost-zero-duration override that causes lifecycle and third-party-component failures.

### 6. Control, timing, and flash safety lab

An updating status display includes pause/stop/hide controls where required, keeps controls keyboard operable, retains state, and avoids time pressure. A bounded flash analyzer varies frequency, area, luminance, and red-flash cases. Learners do not claim safety from a color name or one screenshots-per-second count.

### 7. Rendering performance clinic

Learners record two intentionally different animations, identify style/layout/paint/composite work, frames, dropped frames, and the actual bottleneck, then repair the cause without assuming `transform` automatically solves every case. Reduced work must not sacrifice semantics, focus, reading order, or necessary feedback.

### 8. Guided interface workshop

The learner builds a real task-progress and completion interface with bounded motion, user control, reduced alternative, failure state, and status announcement. Hints reveal timeline and evidence surfaces before code. The scenario, starter, state machine, and checks do not resemble the later lab.

### 9. Independent lab and delayed transfer

The lab supplies an unfamiliar component brief with state and acceptance criteria, not coordinates or property strings. Learners choose transition, keyframes, or no motion; build and test both preference modes; diagnose an injected defect; record a performance trace; and defend purpose, timing, controls, and remaining risk. A delayed second brief changes states, content, and input method before transfer credit is awarded.

### 10. Authentic portfolio integration

The portfolio occurs after projects exist. It uses actual learner artifacts, real evidence, working links, sourced assets, and meaningful contact choices. Motion remains optional. If used, it must pass the same purpose, preference, control, focus, performance, and changed-case gates.

## Assessment evidence required

| Evidence | Required observation |
| --- | --- |
| State model | named underlying, before, active, after, completed, interrupted, and cancelled states |
| Timing | predicted and observed delay, duration, offset, eased progress, iteration, direction, and fill |
| Transition behavior | intentional property list, rapid reversal, repeat activation, new-property case, keyboard/pointer parity |
| Keyframe behavior | computed keyframes, sampled timeline, missing/duplicate endpoints, pause/resume/cancel, unsupported/disabled baseline |
| Motion purpose | classified purpose, non-motion information, necessity and alternative defense |
| Preference | ordinary and reduced modes complete the same task without risky or gratuitous movement |
| User control | pause/stop/hide where required, reachable controls, retained state, no unexpected restart |
| Flash/timing safety | threshold-aware evidence, no unbounded time pressure, no simplistic frequency-only claim |
| Performance | recorded frames and rendering work, identified bottleneck, measured repair, no accessibility regression |
| Debugging | falsifiable hypothesis, animation/computed/performance evidence, causal repair, changed-case rerun |
| Transfer | unfamiliar state system completed without copied coordinates or property recipe and defended |

Property strings, one screenshot, an endlessly moving decorative artifact, or a quiz score cannot substitute for this evidence.

## Candidate status after this inspection

After replacing the seven broad/unmapped records with exact inspected maps:

- 156 of 158 source blocks have challenge-level agent inspection;
- 1,551 of 1,553 source challenges are inside inspected blocks;
- all 1,365 captured question prompts are inside inspected blocks;
- all 5,163 captured implementation checks are inside inspected blocks;
- 156 source blocks have block-specific candidate mappings;
- only `review-css` remains uninspected and unmapped;
- the inaccessible certification assessment remains one separate item-level evidence gap;
- 2 total source blocks still require challenge-level or item-level inspection;
- all 186 target concepts remain `researched-not-authored`;
- seven concepts remain unresolved and seven current concepts remain explicit uncredited modern extensions.

The source wave and replacement sequence remain `candidate-review` and `planned-not-authored`. Independent subject, instructional-design, assessment, accessibility, motion-safety, performance, and originality reviews remain required. Runtime behavior, learner correction, delayed retention, transfer, and observed beginner success remain unverified. Nothing in this inspection authorizes publication.
