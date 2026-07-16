# Responsive Web Design Technical Documentation lab source inspection

Reviewed: 2026-07-16

Status: complete direct inspection; candidate curriculum evidence only

## Decision

The pinned Technical Documentation lab is inspected story by story, check by check, seed by seed, and solution by solution. It contains one 30,275-byte challenge, 15 user stories, and 22 checks. It asks for a long single-page reference, same-document navigation, a left-side navigation treatment at regular sizes, and at least one media query. This is useful benchmark contact, but it does not establish accurate technical writing, heading hierarchy, usable fragment navigation, responsive behavior, accessibility, changed-case testing, or independent transfer.

The former broad candidate bundle overclaimed content-derived breakpoints, narrow-first enhancement, responsive navigation disclosure, a responsive test matrix, zoom/reflow evidence, and independent transfer. Those credits are removed. The block checks only static DOM counts, text/ID correspondence, one initial left offset, and the presence of any media rule or `source[media]`. It never changes viewport size, activates a link, checks the resulting target, verifies visible focus, measures obstruction or overflow, changes content, tests zoom, or asks the learner to explain a decision.

The source remains bounded evidence for contact with:

- a complete document seed, linked stylesheet instruction, landmarks, sectioning, lists, code fragments, headings-as-content, and fragment links;
- class, ID, relationship, display, box, size, typography, overflow, positioning, and media-query CSS in the supplied solution;
- a content-heavy page that changes from side navigation to a top navigation region at one fixed viewport boundary.

LEARN-IT-ALL will not publish a renamed JavaScript documentation page or copy its structure, content, fixed dimensions, test order, or solution. The replacement independent lab uses a different stakeholder and content package. Learners must create a usable field guide with stable fragment targets, semantic headings and landmarks, appropriate `pre` and `code` relationships, a fluid baseline, a justified navigation adaptation, visible and unobscured keyboard operation, changed-content and zoom evidence, source provenance, correction, and design defense.

## Exact source boundary

The inspection covers this source at freeCodeCamp commit `c115efdd41f868d8850156f6a7a211219c35a847`:

| Source block | Type | Challenges | User stories | Implementation checks | Source bytes |
| --- | ---: | ---: | ---: | ---: | ---: |
| `lab-technical-documentation-page` | lab | 1 | 15 | 22 | 30,275 |

Pinned challenge identity: `587d78b0367417b2b2512b05`.

Pinned relative path: `curriculum/challenges/english/blocks/lab-technical-documentation-page/587d78b0367417b2b2512b05.md`.

Pinned SHA-256: `10ef4c6e95177a0545569cae35582838328e28951cc10567f901cd6c3e283904`.

The source contains description, hints, seed, and solutions sections with HTML, CSS, JavaScript checks, and plain text. `references/freecodecamp-rwd-v9.json` remains the exact evidence record for identity, order, path, hash, bytes, sections, check count, and languages.

Direct inspection is not technical authority or course approval. It does not prove that the source is accurate, original for LEARN-IT-ALL, instructionally sufficient, accessible, responsive, maintainable, assessment-valid, retained, transferable, or successful with learners.

## Current primary evidence

The replacement is bounded by:

- [HTML Living Standard](https://html.spec.whatwg.org/), reviewed 16 July 2026, for document conformance, headings, `header`, `nav`, `main`, `section`, lists, `pre`, `code`, links, IDs, and fragment navigation;
- [CSS Scroll Snap Module Level 1](https://www.w3.org/TR/css-scroll-snap-1/), W3C Candidate Recommendation Snapshot dated 11 March 2021 and included in CSS Snapshot 2026, for `scroll-padding` and `scroll-margin` effects on scroll-into-view operations even when snapping is not enabled;
- current CSS Display, Box Model, Sizing, Values and Units, Overflow, Positioned Layout, Text, Fonts, and Media Queries specifications for flow, sizes, overflow, positioning, wrapping, typography, and conditional rules;
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/) for information and relationships, meaningful sequence, reflow, text spacing, keyboard access, bypass blocks, page title, focus order, link purpose, headings and labels, visible focus, focus not obscured, and target size;
- [WAI failure F110](https://www.w3.org/WAI/WCAG22/Techniques/failures/F110), reviewed 16 July 2026, for the specific failure in which an authored sticky or fixed header completely hides a focused element.

`header` is a grouping element and is not a heading merely because it contains topic text. `section` normally needs a real heading when its content forms a titled section. A same-document link needs a stable target and useful link purpose; passing a string comparison does not prove activation, scroll position, focus result, or continued correctness after localization. Fixed or sticky content introduces a continuing visibility obligation for targets and focus. These rules shape the target assessment without mandating one visual layout.

## Story and check findings

### Stories 1–3 create landmarks and sections but not a heading hierarchy

The lab requires `main#main-doc`, at least five `section.main-section` descendants, and a `header` as the first element of every section. This establishes a predictable selector pattern, not a correct document outline.

- A `header` element does not replace `h1`–`h6`; the solution contains no heading elements at all.
- The tests do not inspect one page heading, section heading ranks, skipped ranks, duplicate labels, or outline usefulness.
- Requiring every section's first child to be `header` overprescribes serialization while allowing that header to contain arbitrary non-heading content.
- “At least five” proves quantity only. Empty, duplicated, inaccurate, badly divided, or one-sentence sections pass.
- The tests do not verify that `main` is unique, that `nav` is outside it for a reason, or that section boundaries reflect content relationships.

Target grading parses the document, verifies one coherent heading hierarchy, and tests whether sectioning decisions remain understandable without CSS. It accepts multiple valid grouping choices when the content relationship and heading evidence are defensible.

### Stories 4 and 12 derive durable identifiers from mutable display text

Every section ID must equal its `header` text after spaces become underscores, ignoring case. Navigation text must correspond to each header. This couples three concerns that should be tested separately: human-readable labels, stable fragment identity, and navigation purpose.

- A corrected heading, punctuation change, translation, or terminology update forces the URL to change.
- Replacing only literal spaces does not define behavior for tabs, repeated whitespace, punctuation, non-Latin text, duplicate headings, or characters that require URL encoding.
- Case-insensitive test comparison is not evidence about the fragment-navigation algorithm.
- The check does not reject duplicate IDs, missing unique targets, or an inbound URL broken by a harmless label edit.
- Matching text does not prove that the link remains understandable out of context or identifies the current section.

The target provides stable slugs as content identity and lets visible wording change independently. Changed cases edit one heading, localize another, insert a duplicate display label, and follow a saved deep link. Learners diagnose which contract failed instead of regenerating every ID from presentation text.

### Stories 5–7 count paragraphs, code elements, and list items without judging content

Ten paragraphs, five `code` elements, and five list items can be satisfied by filler, duplicated text, empty code, incorrect commands, or unrelated lists. The supplied solution includes long technical claims but no check examines accuracy, version, authority, warning context, or copy safety.

The solution also styles bare `code` elements as blocks using `white-space: pre-line` rather than marking block snippets with `pre > code`. This collapses some source whitespace and conflates code meaning with preformatted layout. Inline code and block code need different structural and presentation decisions.

The copied JavaScript material is stale in multiple places: it describes an obsolete Scratchpad workflow, presents implicit global assignment as a declaration path, reports an outdated data-type inventory, and discusses cross-frame globals without the security and origin boundaries a current guide would need. A page can therefore pass every project check while teaching unsafe or obsolete material.

The target supplies a bounded, versioned fact package and source record. Learners organize and paraphrase it, preserve code whitespace, distinguish inline from block code, add warnings where required, and identify one claim that needs freshness review. Technical-content correctness is reviewed independently from HTML/CSS behavior.

### Stories 8–13 establish navigation counts and strings, not navigation behavior

The lab requires `nav#navbar`, exactly one `header` within it, one `.nav-link` per section, the header before all links, corresponding visible text, and matching fragment `href` values.

Useful contact includes a navigation landmark, native links, logical source order, and complete destination coverage. Missing evidence includes:

- the `header` does not programmatically name the navigation landmark;
- no list relationship is required, though the solution happens to use one;
- link activation is never performed despite the story saying “when you click”;
- no keyboard activation, focus indicator, current-location cue, history behavior, back/forward behavior, or target visibility is checked;
- no skip link or other bypass mechanism is required before a long navigation list;
- no target is tested after reload with a fragment URL;
- deleted, duplicate, mistyped, or percent-encoded targets are not exercised;
- every link may be visually hidden, overlapped, offscreen, or too small and still pass the DOM checks.

The target executes navigation with keyboard and pointer input, verifies the URL fragment and intended target, records target geometry, checks that focus is not fully obscured, and reopens a deep link. It also verifies a bypass path and useful navigation naming. CSS may enhance the navigation, but native links remain the behavior baseline.

### Story 14 does not prove a left-side navigation that remains usable

The story says the navigation should sit on the left and remain visible on regular laptop and desktop sizes. Its only check reads one initial `offsetLeft` value and accepts values from -15 through 15.

This does not establish:

- fixed, sticky, or persistent visibility after vertical scrolling;
- whether the navigation itself fits, scrolls, or clips;
- whether the main content is covered or pushed outside the viewport;
- whether link focus is visible and unobscured;
- whether text growth or a translated label makes targets overlap;
- whether the navigation remains reachable at the end of a long document;
- whether writing direction changes which physical side is appropriate;
- whether a left-side rail is the correct solution for the actual content and tasks.

The supplied solution uses a 300-pixel fixed navigation and an absolutely positioned main area with a 310-pixel left margin. This is a brittle coordinate agreement, not a layout relationship. It does not measure the content rail, available inline size, scrollbar effects, zoom, or changed labels.

The target begins in normal flow. A wider-layout enhancement may use Grid plus a bounded sticky navigation if content evidence supports it. Geometry checks verify both regions, navigation scrolling, focus visibility, and no overlap at supported tablet and desktop ranges.

### Story 15 accepts an unrelated media rule as responsive proof

The final check passes when any CSS media rule exists or any `source` element has a `media` attribute. The condition, target, declarations, match state, and rendered effect do not matter. An empty print rule or unrelated responsive image source can complete the project.

The solution uses `max-width: 815px` and `max-width: 400px` without naming a failed content invariant. It then:

- moves the navigation to an absolutely positioned 275-pixel top region;
- gives the link list a fixed 207-pixel height;
- compensates with a 270-pixel main-content top margin;
- uses negative margins and fixed minimum width for code at the smallest range;
- retains `min-width: 290px` on the document;
- never tests the boundary values, continuous range, zoom, long content, or text spacing.

This is desktop-first patching. The source does not deserve credit for narrow-first enhancement, content-derived breakpoints, responsive navigation disclosure, zoom/reflow evidence, or a test matrix.

The target requires a predicted invariant, failing-width evidence before the query, and passing evidence after the adaptation. Hidden viewports include just below, exactly at, just above, and fractional values around the learner's chosen boundary. The adaptation must work for long navigation labels and code blocks, not merely make one screenshot fit.

## Complete check audit

The 22 checks divide exactly into:

| Check channel | Count | What it establishes | What it does not establish |
| --- | ---: | --- | --- |
| Static DOM, text, count, order, and attribute checks | 20 | requested tags/classes/IDs exist; minimum counts; source order; text and fragment strings correspond | semantic heading hierarchy, content accuracy, unique IDs, activation, focus, history, target visibility, accessibility, changed cases |
| Initial geometry check | 1 | navigation left offset is between -15 and 15 at the check's current viewport | persistence, visibility, overlap, scrollability, reading direction, zoom, responsive behavior |
| Stylesheet/source inspection | 1 | at least one media rule or one `source[media]` exists | relevant condition, matching, cascade result, layout change, invariant repair, accessible responsive behavior |
| Computed-style checks | 0 | nothing | winning declarations, invalid values, actual visibility, sizing, position, focus styling |
| Interaction and navigation checks | 0 | nothing | keyboard or pointer activation, URL/history, target, focus, back/forward, deep-link restoration |
| Accessibility API or task checks | 0 | nothing | landmarks and names, headings, bypass, sequence, focus, reflow, assistive-technology use |

No check calls `getComputedStyle`, reads a target rectangle after navigation, scrolls the document or navigation, changes viewport size, zooms, applies text spacing, changes a label, inserts a section, duplicates an ID, follows a saved fragment, prints, or asks for causal explanation.

## Seed and solution audit

The seed includes doctype, English language, UTF-8 metadata, and a title. It omits the viewport metadata and the stylesheet link that the note tells learners to add. The supplied solution links the stylesheet but drops the seed's doctype, language, character encoding, and title. The benchmark therefore supplies a formally worse final document than its starter without testing the regression.

Additional solution defects include:

- no heading elements despite a documentation hierarchy;
- `font-weight: thin`, which is not a valid font-weight keyword and is ignored;
- no viewport metadata despite responsive requirements;
- no skip link or equivalent bypass path;
- no explicit focus-visible treatment or focus-obstruction evidence;
- a fixed rail and absolute main content coupled by magic pixel widths;
- fixed navigation and code dimensions vulnerable to text growth and localization;
- physical left/margin properties throughout;
- `word-wrap: normal`, which does not solve long-token overflow;
- negative margins and oversized padding at the narrowest range;
- no print adaptation, even though reference material is commonly printed;
- no stable content version, last-reviewed date, claim provenance, or stale-content warning;
- content copied from an external reference rather than original learner work;
- no changed-case, diagnosis, correction, retention, or transfer evidence.

The target rejects a screenshot match and declaration recipe as project evidence.

## Exact bounded candidate map

This source receives only these concept contacts:

- `html-document-root-head-body`;
- `html-document-language`;
- `html-character-encoding`;
- `html-title-metadata`;
- `html-files-paths-urls`;
- `html-links-destinations`;
- `html-link-purpose-fragments`;
- `html-heading-hierarchy`;
- `html-lists`;
- `html-code-preformatted-text`;
- `html-landmarks`;
- `html-sectioning-articles`;
- `html-source-order-keyboard`;
- `css-application-and-loading`;
- `css-type-class-id-selectors`;
- `css-selector-lists-combinators`;
- `css-outer-inner-display`;
- `css-box-model-areas`;
- `css-box-sizing-models`;
- `css-intrinsic-extrinsic-sizing`;
- `css-absolute-font-relative-viewport-units`;
- `css-overflow-containment-scroll`;
- `css-type-scale-line-height`;
- `css-text-wrap-spacing-decoration`;
- `css-positioning-containing-blocks`;
- `responsive-fluid-default`;
- `responsive-media-query-model`.

This map records source contact, including deficient contact from the seed and solution. It does not credit content-derived breakpoints, narrow-first enhancement, navigation disclosure, a responsive test matrix, zoom/reflow competence, changed-case regression, content accuracy, accessibility conformance, or independent transfer.

## Target independent-lab contract

### Stakeholder and artifact

A neighborhood tool cooperative needs a responsive field guide for its fictional low-voltage irrigation controller. Volunteers use the guide at a shared tablet workbench and on desktop computers while preparing equipment. The cooperative supplies a versioned fact packet, safe configuration snippets, terminology, warning boundaries, maintenance intervals, and source provenance. Learners are not expected to invent technical facts.

The finished guide must let a volunteer:

- identify the guide version and supported controller version;
- navigate directly to setup, status indicators, schedule syntax, troubleshooting, maintenance, and references;
- distinguish a one-line value from a block configuration example;
- follow a saved deep link and return using browser history;
- bypass repeated navigation and reach the main content;
- read and operate the guide with keyboard, touch, zoom, text-spacing overrides, forced colors, and print;
- understand one failure and recovery path without relying on color or position alone.

This differs from copied JavaScript documentation in stakeholder, facts, structure, terminology, navigation decisions, responsive constraints, evidence, and visual treatment.

### Learner choices

The learner decides:

- section boundaries and heading hierarchy;
- stable target slugs and visible link wording;
- landmark labels and bypass mechanism;
- list versus prose versus description-list relationships;
- inline `code` versus `pre > code` representation;
- readable measure and code overflow behavior;
- normal-flow narrow layout;
- whether and when a wider sticky navigation rail improves the task;
- the breakpoint derived from a recorded failed invariant;
- print treatment and visible link-destination strategy;
- how to cite and date supplied facts without copying source prose.

Multiple correct solutions are accepted. Canonical hidden facts, mutations, and grading rules stay server-side.

### Required evidence

The learner submits:

1. a short content model naming audience, tasks, version, sections, and stable identities;
2. a heading and landmark outline before CSS;
3. a fragment-link target table including saved deep links;
4. parsed DOM evidence for headings, lists, code/pre relationships, landmarks, and unique IDs;
5. keyboard and pointer navigation traces with URL, target, focus, and history results;
6. initial normal-flow geometry and readable-measure evidence;
7. a breakpoint hypothesis tied to one named failing invariant;
8. boundary evidence just below, at, just above, and between whole-pixel values;
9. long-label, long-token, added-section, localized-heading, and changed-version results;
10. zoom, text-spacing, forced-colors, tablet portrait/landscape, desktop, and print evidence;
11. one repair after an injected broken fragment, hidden target, or overflow defect;
12. a defense of content identity, navigation adaptation, code treatment, and remaining uncertainty.

### Hidden changed cases

Server-side cases include:

- a visible heading text change with the stable slug preserved;
- two sections with similar display labels;
- a duplicate ID injection;
- a missing and percent-encoded fragment target;
- direct page load with a deep fragment;
- back and forward navigation after two target activations;
- a navigation label twice the expected length;
- a code token with no ordinary break opportunities;
- one extra section inserted in the middle;
- 200% text, 400% zoom-equivalent reflow, and required text-spacing overrides;
- tablet portrait and landscape plus supported desktop ranges;
- a focused target near sticky content;
- forced colors and print;
- one stale version claim marked for diagnosis.

### Feedback and hints

Hints cannot reveal the final DOM tree, breakpoint, selector, or declaration. They progress through:

1. restating the failed user task or invariant;
2. identifying whether the failure is content identity, parsing, target resolution, source order, cascade, layout, scrolling, focus, or output;
3. showing the learner's current DOM, URL, target, matched rule, or geometry evidence;
4. introducing one smaller counterexample;
5. pointing to a paraphrased primary rule;
6. showing an analogous example from another document type.

A failed hidden case requires a new prediction and repair. Repeated attempts route to a bounded fragment, heading, overflow, or positioning clinic rather than exposing the solution.

## Accessibility and responsive verification

Required checks include:

- one main landmark, useful navigation naming, coherent headings, and logical source order;
- a bypass path before a long navigation collection;
- useful link purpose and stable unique targets;
- keyboard activation, visible focus, and no fully obscured focused component;
- target visibility after direct and in-page fragment navigation;
- no keyboard trap inside a scrollable navigation region or code block;
- usable touch targets at supported tablet sizes;
- no content loss under reflow, text spacing, long labels, long code, and zoom;
- no two-dimensional page scrolling for ordinary prose;
- code overflow contained locally only when unbroken content genuinely requires it;
- forced-color and non-color meaning;
- print output with content, hierarchy, references, and destinations preserved;
- representative screen-reader navigation through headings, landmarks, links, lists, and code;
- observed keyboard, low-vision, screen-reader, touch, and cognitive walkthroughs.

Automated DOM and accessibility snapshots are necessary but incomplete. Human task observation and assistive-technology checks remain release gates.

## Originality and duplication constraints

LEARN-IT-ALL must not reuse or lightly rename:

- JavaScript documentation, its section names, prose, examples, or old MDN excerpt;
- `main-doc`, `main-section`, `navbar`, or `nav-link` as required identifiers;
- header-text-to-underscore ID generation;
- ten paragraphs, five code tags, five list items, and five sections as the assessment recipe;
- a fixed 300-pixel left rail, 310-pixel main margin, 815/400-pixel media rules, or negative-margin code patch;
- the source's 15-story order, 22 checks, seed, solution, or wording;
- media-query presence as responsive evidence;
- an empty editor as the sole independence claim.

Automated similarity audits catch obvious overlap. Independent subject, instructional, assessment, accessibility, and duplication reviewers decide whether the task, reasoning, sequence, evidence, and implementation are genuinely different.

## Release gates

This block remains `candidate-review`. Publication is blocked until:

- technical facts, versions, sources, and safety boundaries pass subject review;
- the exact concept map and prerequisite order pass;
- original theory, worked examples, workshop retrieval, and independent fade pass instructional review;
- fragment, focus, history, layout, overflow, breakpoint, changed-content, print, and accessibility behavior checks pass;
- alternate correct structures and breakpoints pass without string allowlists;
- canonical hidden checks remain server-side and learner code remains sandboxed;
- tablet and desktop editor/preview flows pass keyboard, touch, zoom, forced-color, and assistive-technology review;
- representative learners complete the task, repair injected failures, and retain the skills later;
- subject, instructional-design, assessment, accessibility, security, and duplication reviewers approve.

Generated artifacts and test counts are inventory, not proof.

## Inspection outcome

After this wave, the candidate alignment contains:

- 137 agent-inspected source blocks;
- 1,200 inspected source challenges;
- 1,206 captured question prompts in inspected blocks;
- 3,983 inspected implementation checks;
- 141 block-specific candidate mappings;
- 16 uninspected source blocks with exact evidence and zero guessed concepts;
- one unavailable assessment container with zero concept claims;
- 21 total source blocks still requiring challenge-level inspection;
- 184 target concepts, including seven explicit modern extensions and seven unresolved concepts.

The candidate research architecture consequently maps 141 source objectives into modules and retains 17 source identities in the explicit non-specific inventory, including the unavailable assessment container.

These are research facts, not learner content. Independent reviews, original authoring, runtime and grading implementation, learner observation, repair, and re-test remain blocking.
