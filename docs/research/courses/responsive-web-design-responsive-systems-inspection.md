# Responsive Web Design responsive-systems source inspection

Reviewed: 2026-07-16

Status: complete direct inspection; candidate curriculum evidence only

## Decision

All four pinned Responsive Design blocks are inspected challenge by challenge: four lectures, all 31 piano steps, the complete review, both 20-item quiz pools, all 52 question prompts, and all 86 implementation checks. The family supplies useful first contact with fluid sizing, flexible media, Grid and Flexbox, media types and features, width conditions, breakpoints, narrow-first enhancement, interaction capability, color-scheme preference, resolution, orientation, and responsive image markup.

It does not teach a production responsive-system model. The source repeatedly tells learners to derive breakpoints from content, then makes them memorize device categories and arbitrary pixel widths. It describes orientation as device orientation rather than a width/height relationship of the viewport, reduces hover capability to mouse support, treats `flex` as the property that creates responsive layout, implies mobile-first CSS automatically delivers performance and SEO, and presents fixed-width clipping as responsiveness.

The 31-step piano is not an interactive piano. It is a decorative set of empty `div` elements. At smaller widths it hides most keys with `overflow: hidden`; it has no key names, controls, keyboard behavior, audio, status, touch interaction, content-preservation decision, or accessible purpose. Its two pixel-range conditions leave fractional CSS-pixel gaps, and widths below the fixed narrow canvas can still overflow.

LEARN-IT-ALL will replace the family with an original responsive-system progression that requires:

- fluid and intrinsic behavior before a breakpoint is added;
- a viewport and zoom model that preserves user scaling;
- content-derived boundaries based on explicit failing invariants;
- media-query predicates over environment, output, capabilities, and preferences rather than guessed device identity;
- deliberate inclusive and exclusive range ownership with below/at/above/between tests;
- container queries for reusable components when component space, not viewport space, is the real condition;
- Flexbox and Grid chosen from layout relationships and sizing behavior, not page-versus-component slogans;
- responsive image candidate prediction across rendered size, density, zoom, format support, and art direction;
- no loss of content or function at narrow width, zoom, changed content, or input mode;
- keyboard, touch, focus, forced-color, theme, print, reduced-motion, density, orientation, and network evidence where relevant;
- real bounds, overflow, computed behavior, user tasks, changed cases, diagnosis, correction, delayed retention, and transfer.

The terminal evidence is not three screenshots or the presence of two `@media` strings. It is a learner who can state invariants, find the first failing interval, choose the appropriate adaptation mechanism, predict condition truth, inspect the browser result, preserve all required content and operations, repair a changed-case failure, and defend the system.

## Inspected source boundary

The inspection covers these source blocks from freeCodeCamp commit `c115efdd41f868d8850156f6a7a211219c35a847`:

| Source block | Type | Challenges | Question prompts | Implementation checks | Source bytes |
| --- | ---: | ---: | ---: | ---: | ---: |
| `lecture-best-practices-for-responsive-web-design` | lecture | 4 | 12 | 0 | 25,328 |
| `workshop-piano` | workshop | 31 | 0 | 86 | 78,202 |
| `review-responsive-web-design` | review | 1 | 0 | 0 | 5,697 |
| `quiz-responsive-web-design` | quiz | 1 | 40 | 0 | 13,384 |
| **Total** |  | **37** | **52** | **86** | **122,611** |

Every file was read from the pinned checkout, whose HEAD matched the recorded upstream commit. `references/freecodecamp-rwd-v9.json` remains the exact evidence record for identities, order, paths, hashes, byte counts, sections, checks, prompt counts, and languages.

Direct inspection records benchmark contact and defects. It does not establish technical authority, complete scope, pedagogical sufficiency, accessibility, performance, responsive behavior, assessment validity, retention, transfer, originality permission, or learner success.

## Current primary evidence

The target is bounded by:

- [Media Queries Level 5](https://www.w3.org/TR/mediaqueries-5/), W3C Working Draft dated 19 February 2026, for logical conditions, media types, range and discrete features, width, height, aspect ratio, orientation, resolution, pointer and hover capabilities, user preferences, range syntax, error handling, CSSOM, privacy, and security;
- [CSS Containment Level 3](https://www.w3.org/TR/css-contain-3/), published Working Draft dated 18 August 2022 with the current Editor's Draft monitored, for query containers, `container-type`, `container-name`, `@container`, size and style features, and container-relative units;
- [CSS Grid Layout Level 2](https://www.w3.org/TR/css-grid-2/), Candidate Recommendation Draft dated 26 March 2025, for two-dimensional track layout, intrinsic and flexible sizing, repeat-to-fill, overflow, source order, and subgrid;
- [CSS Flexible Box Layout Level 1](https://www.w3.org/TR/css-flexbox-1/) and Box Alignment Level 3 for axes, line formation, base size, free-space distribution, alignment, gaps, ordering, overflow, and accessibility;
- [HTML Living Standard responsive images](https://html.spec.whatwg.org/multipage/images.html#adaptive-images) for `src`, `srcset`, `sizes`, `picture`, `source`, media, type, candidate selection, density, zoom, rendered size, and resource choice;
- current CSS Values and Units, Sizing, Display, Overflow, Positioned Layout, and Images specifications for reference frames, intrinsic sizing, fluid functions, clipping, and layout consequences;
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/) for orientation, reflow, text spacing, content on hover/focus, keyboard use, target behavior, focus visibility and obstruction, contrast, meaningful order, and equivalent content;
- the current web-platform test suites and an explicit supported-browser matrix for every assessed feature.

These documents are behavior authorities, not course approval. Several are drafts. Maturity, open issues, actual interoperability, user-agent behavior, and support boundaries remain research gates.

## Correct responsive-system model

### Responsive design is constraint satisfaction, not device styling

A responsive interface preserves named content, operation, reading order, relationships, legibility, reachability, and performance constraints as its environment changes. Viewport width is one input. Container size, font metrics, language, zoom, user styles, input capabilities, preference features, orientation, density, output medium, embedded context, data length, and browser behavior can be equally important.

The learner starts by writing invariants:

- all required content remains available;
- controls remain operable and named;
- reading and focus order remain meaningful;
- text stays readable and does not clip;
- no page-level two-dimensional scrolling appears at required zoom, except bounded content whose alternative is usable;
- media preserves meaning and does not cause avoidable layout shift;
- visual state survives user colors and non-color output;
- performance claims have measured resource and runtime evidence.

Responsive techniques are then selected to maintain those invariants. A media query is not evidence that the result is responsive.

### Fluid and intrinsic layout comes first

The source says fluid grids use percentages instead of pixels. That is an incomplete rule. Percentages can overflow, fixed values can be appropriate bounds, and intrinsic sizing or layout algorithms often adapt without any explicit percentage.

Target instruction compares:

- normal block flow;
- `max-inline-size` and logical auto margins;
- fluid media with intrinsic aspect ratio;
- Flexbox wrapping and min-content constraints;
- Grid `repeat()`, `minmax()`, `auto-fit`, and `auto-fill`;
- `min()`, `max()`, and `clamp()`;
- viewport conditions;
- container conditions.

Learners inspect minimum contribution, available space, overflow, and changed content before adding a conditional rule.

### Media queries are predicates, not device detectors

Media Queries Level 5 defines a query as a true-or-false expression over user-agent or output-device aspects. Width describes the viewport; it does not reveal a phone, tablet, desktop, brand, operating system, physical size, user posture, or input method.

The target requires each query to name the actual reason for adaptation:

- available inline space;
- print output;
- a primary or any pointer's precision;
- primary or any hover capability;
- reduced motion, contrast, forced colors, or color-scheme preference;
- display resolution when resource or rendering behavior genuinely depends on it;
- orientation only when the viewport relationship creates a real constraint.

Device-label comments fail review when the condition actually tests a viewport or capability.

### Orientation is a viewport ratio

The source alternates between “device orientation” and a viewport explanation. The specification defines portrait when media height is greater than or equal to media width; otherwise it is landscape. A square viewport is portrait. Browser chrome, split-screen, a resized desktop window, embedded contexts, and foldable segments mean this cannot be reduced to how a physical device is held.

Learners predict square, nearly square, split-window, and rotated cases. The adaptation must respond to the layout constraint, not hide content because an assumed device category changed.

### Hover describes the primary pointing mechanism, not a mouse guarantee

The source says `(hover: hover)` tests whether a device supports hover and a quiz answer says it checks for mouse hover. The media feature represents the user's ability to hover conveniently with the primary pointing device. A device can have multiple pointers; `any-hover` and `any-pointer` ask different questions. Capability can change.

Target interfaces never place required action or information only behind hover. Learners test keyboard, touch, coarse pointer, fine pointer, hybrid input, and changed primary-device cases.

### Breakpoints are discovered from content failure

One lecture correctly states that the best breakpoints depend on content and design. Most of the same lecture then lists several competing phone/tablet/desktop scales, and the quizzes reward memorizing 480, 640, 768, 960, 1024, or 1400 pixels.

The target has no canonical phone or tablet breakpoint. The learner continuously resizes with long text and real controls, records the first interval where an invariant fails, and places a relative-unit or other justified condition. Widths below, at, above, and between boundaries must pass.

### Range boundaries must cover fractional CSS pixels

The piano uses `max-width: 768px`, then a second interval from `min-width: 769px` through `max-width: 1199px`. This leaves `(768px, 769px)` unmatched. The next base regime begins above 1199, leaving another discontinuity when the intent is “wider than 769 but smaller than 1199.” CSS pixels can be fractional due to zoom, device scale, viewport calculation, and embedding.

The wording and syntax also disagree: `min-width: 769px` includes 769, while “wider than 769” excludes it; `max-width: 1199px` includes 1199, while “smaller than 1199” excludes it.

Target work uses explicit boundary ownership. Modern range syntax may express `48rem <= width < 75rem`, or overlapping min-width enhancements may be harmless because the cascade is intentional. Learners test exact and fractional values and explain simultaneous matches.

### Narrow-first is a cascade strategy, not a performance guarantee

The mobile-first lecture makes broad claims about traffic, performance, content priority, and search ranking. A narrow-first stylesheet can be useful, but it does not by itself:

- prevent large images from downloading;
- reduce JavaScript, font, CSS, or API cost;
- prioritize critical requests;
- preserve all content and function;
- satisfy search-engine requirements;
- improve interaction latency;
- guarantee accessibility;
- represent every user's most common context.

Target language uses “narrow-first progressive enhancement” for the CSS strategy. Required content and operations exist in the base. Wider-space enhancements add layout capability; they do not restore content that narrow users were denied. Performance is measured separately through actual resource, rendering, and interaction evidence.

### Container queries solve a different problem

The source is viewport-only. Reusable components can appear in a narrow sidebar and wide main region at the same viewport width. CSS Containment Level 3 provides query-container establishment and container conditions so a descendant can adapt to the relevant ancestor's space or style.

Container queries are an explicit modern extension not credited to the pinned family. Learners must identify the eligible query container, avoid impossible self-query dependencies, choose inline-size versus size containment carefully, and test the same component in multiple host contexts. Container units remain bounded by readable and operable minima and maxima.

### Responsive image selection is a browser negotiation

The lecture mentions `srcset` and `picture`, then implies they serve images for smaller screens or lower resolution. The actual model separates:

- density switching with `x` descriptors;
- viewport/rendered-size selection with `w` descriptors and `sizes`;
- format selection with `type`;
- art direction through ordered `source` candidates and media conditions;
- intrinsic `width` and `height` for stable allocation;
- a user agent that may choose based on density, zoom, format support, network conditions, and other factors.

Learners predict candidate sets rather than asserting one guaranteed download where the standard leaves user-agent choice. Every crop preserves subject and alternative-text meaning.

## Complete lecture audit

### Lecture 1: responsive design, Grid, Flexbox, and images

Useful contact:

- adaptability across environments;
- fluid sizing, flexible media, and conditional rules;
- Flexbox as one-dimensional and Grid as two-dimensional first approximations;
- `calc()`;
- `srcset` and `picture`;
- narrow-to-wide Grid examples.

Required corrections:

- “optimal viewing and interaction” is not an observable acceptance contract;
- relative units do not automatically produce a fluid layout;
- Flexbox can wrap and Grid can serve one-axis tasks, so layout choice follows relationships and sizing behavior rather than a strict component/page division;
- the fixed 768/1024 example is not evidence that its breakpoints come from content;
- fixed 20-pixel gaps and columns are not tested with long or translated content;
- responsive image selection is oversimplified;
- no viewport, zoom, min-content, overflow, source-order, accessibility, or performance evidence is collected;
- each of three closing questions is recognition-only.

### Lecture 2: media types and features

Useful contact:

- `all`, `print`, and `screen`;
- width, height, aspect ratio, orientation, resolution, hover, and color scheme;
- conjunction, negation, `only`, and comma lists;
- the cascade remains active inside conditional groups;
- print is distinguished from screen output.

Required corrections:

- media features are called “properties” in places, obscuring the grammar distinction;
- `screen` is presented as routine even when a feature-only query is clearer;
- `only` is listed without explaining that the current spec says it is rarely necessary;
- orientation begins as device orientation instead of viewport width/height state;
- hover is reduced to device support instead of primary-pointer capability;
- `any-hover`, `pointer`, `any-pointer`, forced colors, contrast, reduced motion, reduced transparency, reduced data, and other relevant preferences are omitted;
- range comparison syntax and fractional boundary behavior are omitted;
- the example changes fixed container widths without box sizing or overflow tests;
- no query truth table or live environment change is required.

### Lecture 3: breakpoints

The lecture contains the correct sentence that project breakpoints should be determined by content and design. It undermines that principle by devoting most examples and two of three questions to memorized device categories and fixed common widths.

The sets also create ambiguous or uncovered boundaries: “up to 640” followed by “641 to 1024” leaves fractional widths, as do 576/577 and 768/769 transitions. Modern design is said to be fluid, but the learner never builds or measures a fluid system.

The target removes “common breakpoint” recall from mastery assessment. Learners can recognize framework defaults as external conventions, but they must not infer device type or suitability from the number.

### Lecture 4: mobile-first

Useful contact:

- base styles first;
- min-width enhancements for more space;
- required content prioritization;
- the idea that one document adapts rather than separate sites.

Required corrections:

- fast-changing global-traffic and search-engine claims are unsourced within the block and not required to understand the CSS strategy;
- “mobile first” is mixed with physical-device assumptions rather than available-space constraints;
- performance is claimed without resource or runtime behavior;
- fixed 750/960-pixel containers can overflow with padding under content-box sizing;
- smaller screens are treated as the sole base context, omitting zoomed desktops, split windows, embedded components, and large-text users;
- no required action or content-preservation test exists;
- challenges are described, but the assessment remains three recognition questions.

## Complete 31-step piano audit

### Steps 1–6 build empty decorative markup

Learners create a piano wrapper, a keys wrapper, 21 empty key `div`s, 15 `black--key` class tokens, and a stylesheet link. The work is exact duplication:

- the seven-key class pattern is copied three times;
- keys have no semantic name, label, state, or operation;
- there is no button, keyboard, audio, or touch behavior;
- no heading or explanation tells a user what the graphic is;
- the stylesheet-link check partly relies on source extraction and a harness-specific `dataset.href` path;
- the content is not connected to the responsive-system concepts introduced in lecture.

A decorative visual can teach layout, but it must not be called an interactive piano or responsive task without preserved information and behavior.

### Steps 7–8 teach a valid border-box pattern with terminology defects

The root receives `box-sizing: border-box`; elements and generated pseudo-elements inherit it. This is a useful pattern. The source says `::before` creates the first child and `::after` the last child “in the HTML.” Generated pseudo-elements are rendering abstractions, not ordinary HTML or DOM children.

The step calls them pseudo-selectors later. The target retains the border-box reasoning in the sizing sequence and uses precise pseudo-element terminology.

### Steps 9–15 hard-code a 992-pixel float canvas

The piano becomes 992 by 290 pixels, the key strip 949 by 180, each key 41 by 175, and horizontal layout uses `float: left`. Padding, margin, and fixed colors are copied.

Problems:

- the artifact is intentionally non-fluid before responsiveness is introduced;
- the 21 keys and margins are fitted by arithmetic the learner never predicts;
- float is used as a column-layout mechanism after the lecture praises Flexbox and Grid as modern replacements;
- no intrinsic size, min-content, flex, grid, wrapping, overflow, or writing-mode comparison occurs;
- the checks confirm literal declarations, not actual fit;
- a wider font, changed key count, border, scrollbar, or zoom is never tested.

### Steps 16–18 draw black keys with absolutely positioned pseudo-elements

Generated empty boxes receive a fixed color, `left: -18px`, and fixed dimensions. This contacts compound selectors, pseudo-elements, relative containing blocks, and absolute placement. It does not teach:

- the generated box is not DOM content;
- containing-block and paint-order reasoning;
- what happens when key width changes;
- logical positioning or different writing modes;
- hit testing or focus if keys were interactive;
- changed key counts and collision;
- responsive scaling.

The fixed black-key geometry is a traced picture, not transferable positioning or responsive evidence.

### Steps 19–24 add and position a branded image

A hotlinked freeCodeCamp logo with exact alternative text is inserted and absolutely positioned. The source checks spelling and case twice. It does not decide whether the logo is content, redundant branding, or decorative in this context; does not provide intrinsic dimensions; and does not test image failure, privacy, external-host availability, layout shift, format support, density, or `srcset`.

One check calls `assert.exists` with the position value and the expected string as the assertion message, so it does not actually compare the declaration to `absolute`. This can accept an unintended truthy position and is a concrete false-positive risk.

The lecture's responsive-image topic is never practiced.

### Steps 25–28 add fixed device-style width recipes

A max-width 768 query changes the piano to 358 pixels, keys to 318, and logo to 150. The step describes `max-width` and `min-width` as properties even though they are media-feature names in the query. The boundary is supplied without a content failure, and the new fixed widths are supplied without sizing derivation.

No check resizes the viewport or establishes that the conditional declarations apply. Parser helpers only locate the media text and rule declarations.

### Step 29 hides the failure instead of repairing it

The source observes that keys collapse below 768 and tells the learner to use `overflow: hidden` so pushed-out elements disappear. This is the opposite of content preservation. At the 358-pixel piano width, the 318-pixel key viewport exposes only part of a 21-key fixed strip. Most keys are intentionally removed from view with no scrolling, scaling, alternative, or explanation.

Hiding content can be correct for decorative cropping when the full content is unnecessary and an equivalent meaning remains. Here the artifact's entire subject is the key set. The source does not make or test that decision.

### Steps 30–31 create a gapped middle interval

The second query uses min-width 769 and max-width 1199, then sets 675/633-pixel widths. The authoring prompt says wider than 769 and smaller than 1199, but the syntax includes both endpoints. Fractional widths between 768 and 769 receive neither responsive block, and widths between 1199 and 1200 jump to the base 992-pixel canvas.

The learner does not predict active rules, test boundaries, or resolve overlap and gaps. Completion means the strings exist.

## Check-evidence audit

All 86 workshop checks were classified from their JavaScript bodies: 54 CSS-parser and 32 DOM/source checks.

| Channel | Count | Establishes | Does not establish |
| --- | ---: | --- | --- |
| CSS parser and rule/declaration checks | 54 | requested selectors, media text, and declaration values are present | active condition, matched set, computed/used style, layout, content preservation |
| DOM/source-shape checks | 32 | exact wrapper/key/image/link counts, class tokens, source order, and literal attributes | semantic purpose, operation, accessibility, changed content, responsive behavior |
| Computed-style checks | 0 | nothing | cascade result or active responsive rule |
| Geometry/overflow checks | 0 | nothing | fit, clipping, page scroll, hidden keys, reflow, layout shift |
| Interaction checks | 0 | nothing | keyboard, touch, pointer, sound, focus, operation |
| Accessibility API or user-task checks | 0 | nothing | names, roles, states, content equivalence, reading/focus order |

The two exact `alt` checks are DOM string checks, not accessibility evidence. No step exercises a viewport, environment preference, density, orientation, zoom, print, network, or changed input capability.

## Review audit

The review repeats definitions and fixed examples. Its interactive editors change paragraph backgrounds or fixed widths at 768 and 1024 pixels. It includes a hover-gated button style but no keyboard-equivalent requirement and no operation. It lists common phone/tablet/desktop widths immediately after warning against chasing screen sizes.

There is no initial retrieval attempt, prediction, boundary table, continuous resize, changed content, feedback, correction, or delayed evidence. “Review the topics” is the only assignment.

The target review interleaves:

- condition truth tables;
- content-failure breakpoint discovery;
- boundary and fractional-width diagnosis;
- fluid-versus-conditional mechanism choice;
- viewport-versus-container-query choice;
- responsive-image candidate prediction;
- hover/pointer/preference cases;
- overflow and content-loss repair;
- print, zoom, orientation, and changed-content evidence.

## Quiz audit

The two pools contain 40 prompts; a learner receives 20 and passes with 18. Most answers are syntax or definition recall. Material defects include:

- device-category breakpoint memorization is rewarded despite the lecture's content-derived warning;
- `min-width` is called the media feature that checks browser width, although `width` is the feature and `min-` is legacy range syntax;
- “smaller than 768px” is used for `max-width: 768px`, which includes equality;
- a width interval is described as device width although the query uses viewport width;
- hover is described as mouse hover rather than convenient primary-pointer hover capability;
- orientation is described as physical device orientation in distractor framing rather than viewport width/height relationship;
- resolution is described as resolution “in pixels” instead of pixel density with resolution units and zoom behavior;
- `flex` is given as the property that creates responsive layout, but `display: flex` establishes a flex formatting context and Flexbox does not by itself guarantee responsive behavior;
- a percentage is treated as the responsive unit answer without overflow or reference-frame context;
- `width: 100%` is described as proportionally scaling with the parent while box sizing, padding, intrinsic minima, and containing-block behavior are ignored;
- malformed distractors make recognition easy without diagnosing realistic misconceptions;
- no item asks for actual content, bounds, computed style, changed input, accessibility, or performance evidence;
- no pilot difficulty, discrimination, false-positive, false-negative, correction, or reassessment evidence exists.

The target assessment uses executable and explanation evidence. Canonical answers and hidden environments remain server-side.

## Exact bounded source maps

### Lecture

- `css-flex-container-items-axes`
- `css-grid-container-tracks-cells`
- `responsive-fluid-default`
- `responsive-fluid-media`
- `responsive-image-selection`
- `responsive-media-query-model`
- `responsive-content-breakpoints`
- `responsive-mobile-first-enhancement`
- `responsive-range-syntax-overlap`
- `css-input-capability-adaptation`
- `css-forced-colors-preferences`
- `css-print-and-non-screen-media`

### Piano workshop

- prior document, language, encoding, title, viewport, path, and image-purpose concepts;
- CSS loading, basic selectors, selector lists, pseudo-elements, box model, border box, intrinsic/extrinsic sizing, absolute units, backgrounds/borders, overflow, positioning, and floats;
- `responsive-viewport-zoom`;
- `responsive-media-query-model`;
- `responsive-content-breakpoints`;
- `responsive-range-syntax-overlap`.

The workshop does not receive fluid-layout, content-preservation, mobile-first, responsive-image, test-matrix, changed-case, or transfer credit.

### Review

- `responsive-fluid-default`
- `responsive-fluid-media`
- `responsive-media-query-model`
- `responsive-content-breakpoints`
- `responsive-mobile-first-enhancement`
- `responsive-range-syntax-overlap`
- `css-input-capability-adaptation`
- `css-forced-colors-preferences`
- `css-print-and-non-screen-media`

### Quiz

- `css-flex-container-items-axes`
- the same responsive, query, breakpoint, enhancement, range, input, theme, and print contacts as the review.

These are contact maps. A mapped concept can contain serious source defects and remains `candidate-review`.

## Original target progression

### Entry contract

Before responsive systems, learners must already demonstrate:

- semantic HTML and meaningful source order;
- viewport metadata without disabled zoom;
- normal flow, box sizing, intrinsic and extrinsic sizing, overflow, and logical properties;
- readable measure and content-aware typography;
- fluid media basics;
- Flexbox and Grid foundations;
- keyboard, focus, contrast, non-color meaning, and user-preference basics;
- inline editor, preview, diagnostics, evidence, save, hint, and correction operation.

Missing evidence routes to corrective practice.

### Theory and prediction

Learners receive one component and a constraint table. Before CSS changes, they predict:

- its min-content pressure;
- which content wraps first;
- when horizontal overflow begins;
- what happens under long localized text and 200% zoom;
- which requirements can be satisfied by normal flow, Flexbox, Grid, or fluid bounds;
- whether any condition is still needed.

Media queries then enter as logical predicates. Learners complete truth tables for width, orientation, hover/pointer, preferences, print, and compound conditions, including invalid syntax and unsupported concepts.

### Guided workshop

The original workshop is a community-event schedule and registration summary. It begins as a narrow in-flow document and gains wider-space layout only when evidence shows the schedule and action summary can share space.

Checkpoints:

1. establish invariants and baseline bounds;
2. make media and text intrinsically safe;
3. use Grid or Flexbox based on relationships;
4. discover a content breakpoint through continuous resizing;
5. write and predict a range condition;
6. add an input-capability enhancement without hover-only behavior;
7. add theme/forced-color and print behavior;
8. select responsive image candidates and preserve meaning;
9. test long content, zoom, orientation, tablet, desktop, and boundary values;
10. diagnose a hidden fractional-gap and overflow regression.

Guidance fades across the sequence. It shares no piano content, geometry, steps, selectors, colors, or solution.

### Container-query lab

A reusable event card is placed in a narrow filter rail, a wide results region, and a nested recommendation panel at one viewport width. Learners establish the intended query container, use inline-size conditions and bounded container units, and prove the same component adapts independently of the viewport.

Hidden cases change container nesting, names, writing mode, content length, and minimum size. The learner must identify the queried ancestor and diagnose an impossible self-dependency.

### Responsive-image clinic

Learners receive candidate metadata and predict the candidate set for:

- fixed rendered size at 1x and 2x;
- viewport-derived rendered sizes with `w` descriptors;
- changed `sizes` conditions;
- zoom;
- format support;
- art-direction crops;
- narrow and wide layouts;
- media failure and alternative text.

Network logs are evidence, but the rubric respects user-agent choice where the standard allows it.

### Debugging clinic

An unfamiliar interface contains:

- `width: 100vw` inside a padded page;
- `min-width` overflow;
- an image without stable dimensions;
- arbitrary device breakpoints;
- a 1-pixel fractional range gap;
- clipped required content;
- hover-only instructions;
- visually reordered focus targets;
- a viewport query where container space is the real constraint;
- fixed font size that fails zoom and long text;
- a dark-theme rule that breaks forced colors;
- missing print context.

Learners reproduce, name the violated invariant, inspect cause evidence, repair, and re-test a new case.

### Independent lab and transfer

The independent lab is a public-service availability explorer. It has real filters, results, status, details, and changed data. Learners choose mechanisms, derive boundaries, preserve operation, build a risk-based test matrix, and defend tradeoffs. A later capstone must reuse the responsive-system reasoning in a different domain after delay.

## Evidence and grading contract

| Claim | Required evidence | Insufficient alone |
| --- | --- | --- |
| Baseline is fluid | changed content and container widths, bounds, no unexpected page overflow | `%` or `width: 100%` in source |
| Breakpoint is justified | first failing interval and named invariant, plus below/at/above/between results | common phone/tablet number |
| Query logic is correct | predicted and actual truth table including fractional boundaries | parses as `@media` |
| No content is lost | complete content and operations at narrow, wide, zoomed, and changed cases | hidden overflow looks tidy |
| Layout mechanism fits | sizing/relationship explanation and changed-item behavior | `display: flex` or Grid screenshot |
| Container query is correct | actual queried ancestor, multiple host contexts, nested changed case | `@container` exists |
| Responsive image is correct | candidate-set prediction, rendered size, density/zoom/support evidence, stable dimensions, preserved meaning | `srcset` text |
| Capability adaptation works | keyboard/touch/pointer/hover tasks with no exclusive path | `(hover: hover)` exists |
| Preference/output adaptation works | forced colors, light/dark, relevant contrast/motion, and print tasks | color-scheme query |
| Responsive quality is established | risk-based matrix, failure reproduction, cause, repair, re-test | three viewport screenshots |
| Transfer is independent | unfamiliar stakeholder, learner-derived conditions, hidden changes, defense | another fixed decorative canvas |

Client submissions are evidence. Canonical expectations and hidden cases remain server-side.

## Responsive evidence matrix

Every substantial learner interface derives a matrix from risk rather than blindly running presets. Minimum dimensions include:

- smallest supported coding-studio size, tablet portrait/landscape, and supported desktop widths;
- continuous resizing and representative between-boundary values;
- exact, just-below, and just-above each condition;
- fractional CSS-pixel boundaries;
- 200% and 400% zoom where applicable;
- browser text-size and WCAG text-spacing overrides;
- longest realistic and translated content;
- empty, one, many, missing, and error data;
- keyboard-only, touch, coarse pointer, fine pointer, and hybrid capability;
- orientation and split-window changes;
- light, dark, forced colors, contrast, and reduced-motion conditions as relevant;
- image success, slow load, failure, density, format, and art-direction cases;
- print or non-screen output where content must remain useful;
- current supported browser engines;
- save, reload, retry, and correction behavior in the learning workspace.

The public information and phone handoff remain phone-usable. The coding studio's supported-device boundary does not excuse learner projects from teaching or proving responsive web principles across relevant narrow contexts.

## Accessibility contract

Responsive changes must preserve:

- meaningful DOM, reading, and focus order;
- all required content and actions;
- visible and unobscured focus;
- keyboard and touch operation;
- no hover-only or pointer-precision-only requirement;
- non-color meaning and required contrast;
- names, roles, values, states, and status announcements;
- target size and spacing;
- text reflow and user spacing;
- orientation access unless a specific orientation is essential;
- reduced-motion and user-color preferences;
- media alternatives and art-direction meaning;
- scroll reachability and discoverability;
- no clipping caused by fixed heights or hidden overflow.

Automated evidence is complemented by keyboard, screen-reader, low-vision, touch, and representative learner tasks.

## Performance and privacy contract

The target never claims that narrow-first CSS is performance proof. Learners inspect:

- image candidate requests and decoded dimensions;
- font and script cost;
- render-blocking resources;
- layout shift;
- long-task and interaction evidence where applicable;
- unused conditional resources;
- cache and repeated-load behavior;
- privacy implications of third-party assets and capability queries.

The learning platform uses local deterministic assets where possible. External branding and hotlinks are not inserted merely to make an exercise look official.

## Hint and correction design

Hints progress through:

1. restate the invariant;
2. identify the failing size or environment;
3. show measured bounds and overflow without prescribing a fix;
4. ask whether normal flow, intrinsic sizing, layout, viewport query, container query, or media selection owns the problem;
5. show the learner's predicted versus actual condition truth;
6. expose one hidden boundary or content case;
7. link a paraphrased primary rule;
8. provide a different-domain worked analogy.

After failure, the learner predicts a new case before rerunning. Repeated declaration guessing routes to smaller sizing or condition practice.

## Originality and duplication constraints

The target must not reuse or lightly rename:

- the piano, 21 empty keys, black-key class pattern, or freeCodeCamp logo;
- the 992/675/358 and 949/633/318 fixed geometries;
- `overflow: hidden` as the responsive repair;
- the 768/769/1199 range sequence;
- float-based key layout;
- fixed absolute pseudo-element keys;
- lecture, review, quiz, hint, test, or solution wording;
- common-device breakpoint recall as assessment;
- another instrument, keyboard, building, or decorative canvas with changed colors;
- three preset screenshots as the complete test matrix;
- source declaration checks as behavior evidence.

Workshop, clinic, lab, project, quiz, and exam differ in stakeholder, content, starter, mechanism choices, hidden cases, evidence, and defense. Automated similarity gates supplement independent human review.

## Release gates

The family remains `candidate-review` until:

- primary-source freshness and browser-support reviews pass;
- subject and prerequisite reviews pass;
- fluid, query, container, image, capability, preference, accessibility, and performance scope is complete;
- introduce/model/guided/faded/debug/retrieve/assess/transfer coverage passes;
- all learner-facing work is original and duplication-reviewed;
- behavior, geometry, overflow, environment, image, and hidden-case grading passes;
- sandbox, canonical-answer, persistence, privacy, and security review passes;
- tablet, desktop, public phone handoff, zoom, keyboard, touch, assistive-technology, forced-color, theme, and print flows pass;
- assessment false positives, false negatives, difficulty, discrimination, correction, and delayed retention are calibrated;
- representative learners complete tasks, repair failures, and transfer the skills;
- subject, instructional-design, assessment, accessibility, security, performance, and duplication reviewers approve.

High step counts and passing schemas do not satisfy these gates.

## Inspection outcome

This wave adds current primary CSS Containment Level 3 and CSS Grid Level 2 evidence. It moves responsive-image selection, media-query range syntax, and container-query concepts to primary specification anchors. It adds no concept for count inflation.

After this wave, the candidate alignment contains:

- 136 agent-inspected source blocks;
- 1,199 inspected source challenges;
- 1,206 captured question prompts in inspected blocks;
- 3,961 inspected implementation checks;
- 140 block-specific candidate mappings;
- 17 uninspected source blocks with exact evidence and zero guessed concepts;
- one unavailable assessment container with zero concept claims;
- 22 total source blocks still requiring challenge-level inspection;
- 184 target concepts, including seven explicit modern extensions and seven unresolved concepts.

The candidate architecture maps 140 bounded source objectives into 17 cumulative modules and retains 18 source identities in the explicit non-specific inventory, including the unavailable assessment container.

These are research facts, not a published course. Independent reviews, original authoring, runtime and grading implementation, learner observation, repair, and re-test remain blocking.
