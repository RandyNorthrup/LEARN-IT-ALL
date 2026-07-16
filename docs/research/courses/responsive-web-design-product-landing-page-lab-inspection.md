# Responsive Web Design Product Landing Page lab source inspection

Reviewed: 2026-07-16

Status: complete direct inspection; candidate curriculum evidence only

## Decision

The pinned Product Landing Page lab is inspected story by story, check by check, seed by seed, and solution by solution. It contains one 18,457-byte challenge, 15 user stories, and 25 implementation checks. The source asks for page-level landmarks, fragment navigation, an image, embedded video, an email form, a persistent top navigation treatment, one media query, and one Flexbox declaration. Those are useful integration contacts. The checks do not establish a complete document, trustworthy product content, accessible navigation, an accessible form, usable media, a working submission, responsive adaptation, Flexbox reasoning, changed-case survival, or independent transfer.

The former broad candidate bundle was unrelated to the source. It credited five Grid concepts even though the requirements and supplied solution contain no Grid layout. It also credited content-derived breakpoints, responsive navigation disclosure, a responsive test matrix, and independent transfer without evidence. Those claims are removed. An empty editor, a lab label, one media-rule token, and one `display: flex` declaration do not prove independent responsive design.

The block remains bounded benchmark evidence for contact with:

- a document seed and linked stylesheet instruction;
- a page header, navigation, sections, lists, footer, headings, image, media or embedded-document choice, and fragment links;
- form action, named email data, an email input type, placeholder hint, and submit control;
- classes, IDs, combinators, state selectors, box styling, typography, fixed positioning, Flexbox, fluid widths, transitions, and media conditions in the supplied solution.

LEARN-IT-ALL will not publish a renamed trombone page, the copied product claims, the dead controls, the third-party mock submission endpoint, or the source's selector and layout recipe. The replacement is an independent launch-page studio. Learners choose an actual product, service, open-source project, or public-interest offering; record the authority for every factual claim and asset; build a complete semantic document; make navigation, media, and form behavior work in the isolated lab runtime; and prove accessibility and responsive behavior under changed content and supported tablet and desktop constraints.

## Exact source boundary

The inspection covers this source at freeCodeCamp commit `c115efdd41f868d8850156f6a7a211219c35a847`:

| Source block | Type | Challenges | User stories | Implementation checks | Source bytes |
| --- | ---: | ---: | ---: | ---: | ---: |
| `lab-product-landing-page` | lab | 1 | 15 | 25 | 18,457 |

Pinned challenge identity: `587d78af367417b2b2512b04`.

Pinned relative path: `curriculum/challenges/english/blocks/lab-product-landing-page/587d78af367417b2b2512b04.md`.

Pinned SHA-256: `8c453f451216c4d30cd5414b1dab758f8b21c508eb8d4dc01727d28deacaeb5e`.

The source contains description, hints, seed, and solutions sections with HTML, CSS, JavaScript checks, and plain text. `references/freecodecamp-rwd-v9.json` remains the exact evidence record for identity, order, path, hash, byte count, section inventory, check count, and languages.

Direct inspection is not technical authority or course approval. It does not prove that the source is accurate, original for LEARN-IT-ALL, instructionally sufficient, accessible, responsive, secure, privacy-preserving, maintainable, assessment-valid, retained, transferable, or successful with learners.

## Current primary evidence

The replacement is bounded by:

- [HTML Living Standard](https://html.spec.whatwg.org/), reviewed 16 July 2026, for document conformance, images, links, fragments, `video`, `iframe`, forms, successful controls, email-input behavior, placeholder limitations, validation, button behavior, and embedded browsing contexts;
- [W3C WAI Forms Tutorial](https://www.w3.org/WAI/tutorials/forms/), updated 27 March 2026 and reviewed 16 July 2026, for visible associated labels, instructions, validation, error recovery, and collecting only data required for the actual process;
- [WAI H64](https://www.w3.org/WAI/WCAG22/Techniques/html/H64), reviewed 16 July 2026, as one current technique for giving an `iframe` a useful name that identifies its contents;
- [CSS Flexible Box Layout Module Level 1](https://www.w3.org/TR/css-flexbox-1/), Candidate Recommendation Draft dated 14 October 2025 and reviewed 16 July 2026, for flex container formation, axes, wrapping, automatic minimums, free-space distribution, alignment, and visual-only reordering;
- [CSS Positioned Layout Module Level 3](https://www.w3.org/TR/css-position-3/), Working Draft dated 7 October 2025 and reviewed 16 July 2026, for fixed and sticky positioning, containing blocks, insets, sizing, and paint behavior;
- [Media Queries Level 5](https://www.w3.org/TR/mediaqueries-5/), Working Draft dated 19 February 2026 and reviewed 16 July 2026, for media conditions based on viewport, output, input capability, and user preference rather than device labels;
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/), for non-text content, captions, information and relationships, meaningful sequence, reflow, keyboard operation, bypass blocks, focus order, link purpose, headings and labels, error identification, visible focus, focus not obscured, target size, and name-role-value;
- [WAI failure F110](https://www.w3.org/WAI/WCAG22/Techniques/failures/F110), reviewed 16 July 2026, for authored sticky or fixed headers that completely hide focused elements.

The HTML Standard explicitly distinguishes a persistent label from a transient placeholder hint. An email input type supplies a value syntax and browser behavior; it does not prove that the field is labeled, that the request is appropriate, that an error is understandable, or that a server safely handles the data. A form action string does not prove a submission occurred. A fixed header that remains at one coordinate does not prove that its links, destinations, and following content remain visible or reachable.

## Requirement and check findings

### Stories 1–5 create page navigation identifiers but do not prove navigation

The first five stories require `header#header`, an image with `id="header-img"`, `nav#nav-bar`, at least three `.nav-link` elements, and fragment destinations. This creates contact with native links and stable targets. The checks are almost entirely selector and string tests.

- Required IDs are grading handles, not evidence that the structure suits the content.
- The header is never required to contain an `h1`, and the supplied solution has no `h1` or descriptive document title.
- The image needs a source URL that resolves to a string beginning with `http`; it need not load, be trustworthy, have known dimensions, match its text alternative, have reuse rights, or preserve layout when delayed.
- No check requires `alt`, even though the solution happens to provide it.
- The navigation is not required to be named when multiple navigation regions exist, organized as a list, preceded by a bypass link, or understandable outside surrounding context.
- The story says links are clicked, but no check activates a link, observes the URL, finds the target after navigation, checks browser history, or verifies focus and target visibility.
- A hidden, overlapped, one-pixel, offscreen, keyboard-invisible, or color-indistinguishable link passes.
- A destination may be an empty generic element with the correct ID and still pass.

The target lab activates every primary navigation link with keyboard and pointer input. It verifies the resulting fragment, intended destination, scroll position, focus visibility, and lack of obstruction. A saved deep link is reopened. Changed cases insert a long heading, reorder one section, and add one navigation destination without breaking source order or destination identity.

### Stories 6 and the media checks accept two different contracts without assessing either

The lab accepts either `video#video` or `iframe#video` and only checks that a source attribute exists. Native media and an embedded document are not interchangeable implementations.

For native video, the source does not require:

- controls or keyboard-operable playback;
- captions, transcript, audio description decision, language, or fallback content;
- a poster, dimensions, preload decision, source fallback, or failure behavior;
- ownership, license, file size, format support, or network evidence.

For an iframe, the source does not require:

- an accessible name such as an accurate `title`;
- a minimal `allow` policy, a sandbox decision, origin awareness, or consent/loading boundary;
- a fallback link, aspect ratio, responsive bound, or failure state;
- a check that the embedded content itself remains usable.

The supplied iframe has no title, uses obsolete `frameborder`, grants fullscreen without explaining the permission, hard-codes a height, and loads third-party content. Its URL uses a privacy-enhanced host, but that alone is not proof of a complete privacy or consent strategy.

The target requires the learner to choose native media, an embed, or a static alternative from the actual communication purpose. Native media must expose user controls and appropriate alternatives. An embed must have a useful name, bounded permissions, responsive geometry, and a direct fallback. A learner may reject media entirely when it adds no task value.

### Stories 7–12 build a form-shaped request but not an accessible or real transaction

The source requires `form#form`, `input#email`, a placeholder, `type="email"`, `input#submit`, `type="submit"`, `name="email"`, and an action equal to `https://www.freecodecamp.org/email-submit`.

Useful contact includes native form submission vocabulary, a named data entry, an email-specific input state, and a submit control. Missing or harmful evidence includes:

- no visible `label` and no programmatically associated label;
- placeholder text is incorrectly treated as the only instruction, even though it disappears after entry and is not a label substitute;
- no `autocomplete="email"`, purpose statement, required-state communication, privacy notice, data-minimization decision, or retention boundary;
- no valid, invalid, empty, internationalized, pasted, autofilled, corrected, or restored case;
- no error identification, useful browser message review, correction path, or success acknowledgement;
- no test submits the form, observes a request, inspects submitted name-value data, handles a server response, or confirms failure recovery;
- a mandated third-party mock endpoint cannot establish the learner's product flow and would be unacceptable as production behavior;
- the lab accepts a successful static string while the actual service may be unavailable or unrelated.

The target runtime provides a real isolated submission receiver owned by the lab. It captures the learner's actual `FormData`, returns deterministic success and rejected cases, and exposes the request and response as evidence without sending personal data to an unrelated host. Learners must label the field, state its purpose, use the right name/type/autocomplete contract, submit valid data, repair invalid data, handle an unavailable response, and verify that only intended fields are transmitted.

### Story 13 measures one fixed coordinate, not persistent usable navigation

The only behavioral-looking check finds the smallest absolute top coordinate among the header and its direct children, scrolls 500 pixels, waits one millisecond, and expects approximately zero before and after. This can be satisfied by fixing the entire header or one child. It does not establish:

- complete viewport width, stacking, contrast, readable content, or non-overlap;
- whether page content begins below the persistent region;
- whether a fragment destination or focused component is hidden beneath it;
- whether the header itself fits at increased text size or narrow inline size;
- whether keyboard focus remains visible while the header changes height;
- whether a sticky treatment would be more appropriate than permanently fixed content;
- scroll-container behavior, reduced viewport height, zoom, text spacing, print, or changed navigation labels;
- cleanup after the async check beyond returning to the initial scroll coordinate.

The supplied solution fixes the header, omits an explicit full-width relationship and stacking strategy, and compensates with unrelated top margins that change at one breakpoint. This is a brittle coordinate agreement. The target accepts normal flow, sticky, or fixed navigation only when the learner can justify it. Any persistent treatment must pass target and focus visibility, reflow, changed-height, and print evidence.

### Story 14 detects syntax presence, not responsive adaptation

The media check accepts either any CSS media rule or a `source` element with a `media` attribute. It does not inspect the condition, matched state, contained declarations, affected content, or outcome. Empty, impossible, redundant, overlapping, device-named, and behavior-free conditions pass.

The supplied solution uses unrelated `max-width` values of 800, 650, 600, and 550 pixels. It changes header wrapping, logo size, navigation direction, hero margin, icon visibility, feature geometry, and pricing direction, but supplies no content-derived rationale or boundary tests. It hides feature icons rather than deciding whether they are decorative or informative. Fixed heights and compensating margins make the page sensitive to long text and zoom.

The target begins with a fluid, source-ordered baseline. Learners resize until content evidence reveals one constraint, document that boundary, and add a conditional change only when the change improves the actual task. Tests run just below, at, and just above every authored boundary plus long labels, added offer cards, increased text spacing, 200% zoom, and supported tablet and desktop viewports.

### Story 15 detects one declaration, not a Flexbox model

The Flexbox check accepts the existence of any rule whose computed declaration text includes `display: flex` or `inline-flex`, including inside a media rule. It never verifies which element becomes a container, which children become items, the main or cross axis, wrapping, intrinsic minimums, overflow, alignment, free-space distribution, or source order.

The supplied solution uses Flexbox throughout. Some uses are reasonable row and column layouts; one applies `display: flex` to an image even though it has no child boxes to arrange. The solution removes list markers globally, uses viewport-relative widths as layout contracts, and repeatedly changes directions without changed-content evidence. It provides no `gap`, no `min-width: 0` reasoning, no wrap evidence for long labels, and no comparison with normal flow or Grid.

The target requires a Flexbox decision only where a one-dimensional relationship exists. Learners draw the axis, identify items, predict free-space behavior, and inspect geometry. A changed item count, long label, missing media item, and narrow container must preserve order, reachability, and readable content. A meaningless Flex declaration receives no credit.

## Complete 25-check audit

| Check mechanism | Count | What it can establish | What it cannot establish |
| --- | ---: | --- | --- |
| Static DOM, attribute, selector, and URL-string checks | 22 | required element names, descendants, IDs, class counts, attribute strings, source presence, and fragment-target existence in one DOM | complete semantics, asset loading or rights, accessible names, activation, submitted data, validation recovery, media usability, source order, responsive behavior, changed cases, or transfer |
| Scroll/geometry check | 1 | one header candidate stays within 15 pixels of the viewport top before and after one scripted scroll | usable fixed/sticky navigation, full bounds, obstruction, focus visibility, target visibility, reflow, zoom, changed height, or print |
| CSS parser/helper presence checks | 2 | at least one media/source condition and at least one Flexbox display declaration are present | whether either condition matches, changes useful behavior, uses a valid model, preserves content, or survives any changed case |

There are no computed-style assertions, request/response assertions, navigation activations, accessibility-tree assertions, keyboard sequences, focus assertions, media-control assertions, viewport-range sweeps, content mutations, correction tasks, explanations, delayed retrieval tasks, or transfer tasks.

## Seed and supplied-solution findings

### The seed is incomplete for the advertised responsive task

The seed includes a doctype, language, UTF-8 metadata, title, head, body, and an empty stylesheet. It omits viewport metadata, a stylesheet link, a meaningful first artifact, and any starter content contract. The note tells the learner to link CSS, but neither the checks nor the solution verifies the link itself.

Starting from almost empty files can be appropriate for independent work only after the prerequisite sequence has established planning, document structure, paths, semantics, form behavior, media choices, Flexbox, positioning, responsive design, accessibility, testing, and recovery. Empty files alone do not prove independence.

### The solution is not a production-quality exemplar

The supplied solution should not be used as a model because it:

- drops the seed's doctype, language, character encoding, descriptive title, and viewport metadata;
- imports an old Font Awesome stylesheet and a third-party font without a necessity, privacy, performance, fallback-metric, or failure decision;
- loads a remote logo and video without intrinsic image dimensions, resilient media alternatives, or failure evidence;
- omits an `h1`, a `main` landmark, a visible form label, iframe title, autocomplete purpose, form instructions, errors, and status feedback;
- removes underlines from all links and list markers from all lists, supplies hover changes without equivalent focus treatment, and provides no visible-focus design;
- contains footer links whose `href="#"` destinations do nothing useful and product-selection buttons with no behavior;
- hard-codes product prices and promotional claims without sources or freshness boundaries;
- uses a 30-pixel-tall submit control, fixed section heights, fixed media height, multiple magic breakpoints, and compensating margins;
- places `transition` only on hovered states, so the reverse state does not receive the same transition contract;
- hides feature icons at one width without defining their meaning, while other icon markup inconsistently uses `aria-hidden`;
- forces a fixed header without proving focus, fragment, content, or print reachability.

These are not minor polish issues. They contradict cumulative document, accessibility, responsive, and behavior requirements that learners should retain from earlier modules.

## Concepts supported by bounded source contact

The candidate map may credit contact with document structure; paths and URL references; links and fragments; replaced image/media/embed boundaries; image alternatives; headings, lists, landmarks, and sections; form submission data, labels and placeholder instructions, and input type/purpose; CSS application, selectors, state selectors, display, box sizing and spacing, widths, backgrounds, color, typography, text presentation, list presentation, positioning, Flexbox container/direction/alignment, fluid defaults and media, transitions, and media conditions.

This is not mastery credit. Several concepts appear only in a defective supplied solution or as a requirement whose checks accept invalid substitutes. The inspection deliberately does not award:

- any Grid concept;
- content-derived breakpoint competence;
- responsive navigation disclosure;
- a responsive test matrix;
- changed-case regression testing;
- independent transfer or design defense;
- complete accessible form, media, navigation, positioning, Flexbox, or responsive competence.

## Original LEARN-IT-ALL replacement sequence

The landing page is a cumulative independent project after dedicated HTML, form, media, accessibility, Flexbox, positioning, and responsive-system practice. It is not the first place those models appear.

### 1. Brief and evidence inventory

The learner selects a real offering from an approved category and records:

- intended audience and primary task;
- factual claim, authoritative source, review date, and freshness trigger;
- asset source, rights, purpose, intrinsic dimensions, and text-alternative decision;
- whether media is necessary and, if so, whether native media, embed, or a direct link is safest;
- form purpose, minimum required data, receiver, retention boundary, success, rejection, and unavailable behavior.

Unsupported product claims, invented metrics, dead offers, and copied marketing text fail the content gate.

### 2. Structural plan and source-order review

Before styling, the learner creates a heading outline and region map, then builds a complete document with one descriptive page title and `h1`, useful header/navigation/main/footer relationships, source-ordered sections, destination-specific links, and stable fragment IDs. The unstyled page must remain understandable and operable.

### 3. Asset and media boundary

The learner makes every image purpose explicit, adds intrinsic dimensions, and verifies a missing/slow asset case. If media is used, the learner implements the full chosen contract and tests keyboard operation, alternatives, name, permissions, responsive size, and failure. External resources require a stated reason and a usable failure path.

### 4. Real isolated form transaction

The lab receiver processes the form inside the bounded runtime. The learner observes the actual request payload and response, rather than matching a mock action string. Valid, invalid, empty, corrected, autofilled, rejected, and unavailable cases must retain a persistent label, instructions, accessible error/status information, focus movement only when justified, and user data on recoverable failure.

### 5. Fluid baseline and Flexbox trace

The learner builds the smallest layout that works without conditional rules. For each Flex container, the learner identifies items and axes, predicts wrap and free-space behavior, and records inspected geometry. Long text, an added item, a missing item, and a narrower container expose brittle widths, ordering, or overflow.

### 6. Persistent navigation decision

Normal flow is the baseline. If the learner chooses sticky or fixed navigation, the decision must improve the real task and pass header-height, fragment-target, visible-focus, scroll, zoom, text-spacing, reduced-height, and print cases. `scroll-margin`, `scroll-padding`, layout space, or another strategy may be used, but no declaration string is mandated.

### 7. Content-derived adaptation

The learner finds constraints by resizing content, not by naming phones or copying breakpoint numbers. Each conditional change records the failing constraint and expected behavior. A boundary harness evaluates below/at/above cases, and a tablet/desktop matrix records overflow, reflow, reading order, keyboard order, focus, targets, media, form behavior, and console/network failures.

### 8. Debugging clinic and faded correction

The platform injects two defects from different systems, such as an obscured fragment target plus a lost form label, or a flex overflow plus a failing embed. The learner forms a hypothesis, gathers DOM/computed/geometry/accessibility/network evidence, repairs the cause, and reruns one changed case. Hints reveal evidence sources before revealing code.

### 9. Independent defense and delayed transfer

The learner explains three consequential decisions and their alternatives: one semantic/content choice, one interaction/accessibility choice, and one layout/responsive choice. After delay, a different stakeholder brief changes content length, navigation count, media availability, and form purpose. The learner adapts the system without copying the first artifact's exact structure.

## Assessment evidence required

| Evidence | Required observation |
| --- | --- |
| Document and content | conforming complete document, descriptive title and heading hierarchy, unstyled meaning, verified claims and asset provenance |
| Navigation | keyboard and pointer activation, fragment/history behavior, visible focus, useful purpose, unobscured target, deep-link reload |
| Image and media | purpose/alternative, intrinsic dimensions, failure behavior, controls or embed name/permissions, responsive geometry |
| Form | persistent label/instructions, name/type/autocomplete, actual `FormData`, valid/invalid/recovery paths, submitted-data minimization, success/error status |
| Flexbox | container/item/axis prediction, inspected geometry, changed count/content, source-order preservation, no overflow |
| Persistent UI | justified need, flow/containing-block trace, changed header height, focus and target visibility, zoom/reflow, print |
| Responsive system | fluid baseline, content-derived constraint, below/at/above boundary evidence, tablet and desktop task completion |
| Accessibility | landmarks/headings, non-text alternatives, captions decision, keyboard, focus, contrast, non-color meaning, target size, text spacing, zoom/reflow |
| Debugging and correction | falsifiable cause, inspected evidence, causal repair, changed-case regression |
| Transfer | independently adapted second brief plus bounded design defense |

Passing requires the real behavior and evidence. Required words, IDs, class names, declaration presence, screenshots, or a visual resemblance to a reference cannot substitute for task completion.

## Duplication and order decisions

- The project retrieves form, media, Flexbox, positioning, accessibility, and responsive models; it does not reteach them through another long recipe.
- The earlier guided work uses different stakeholders, starters, content, layouts, defects, and evidence so the landing page cannot be completed by renaming a prior artifact.
- The project follows the dedicated responsive-system and Grid sequences but does not require Grid. Learners choose normal flow, Flexbox, or Grid from relationships and defend the choice.
- Form submission uses the one production-like isolated runtime contract. No third-party mock endpoint or dead submit control is permitted.
- Navigation disclosure remains a separate concept. A simple wrapping or stacked link list does not earn disclosure credit.
- The first landing-page attempt is independent application; transfer is awarded only after the delayed different brief succeeds.

## Candidate status after this inspection

After adding this block to the exact alignment ledger:

- 149 source blocks have challenge-level agent inspection;
- 1,412 source challenges are inside inspected blocks;
- 1,319 question prompts are inside inspected blocks;
- 4,712 implementation checks are inside inspected blocks;
- 150 source blocks have block-specific candidate mappings;
- 7 source blocks remain uninspected and unmapped;
- the inaccessible certification assessment remains one separate item-level evidence gap;
- 9 total source blocks still require challenge-level or item-level inspection;
- all 186 target concepts remain `researched-not-authored`;
- seven concepts remain unresolved and seven current concepts remain explicit uncredited modern extensions.

The block and replacement sequence remain `candidate-review` and `planned-not-authored`. Independent subject, instructional-design, assessment, accessibility, privacy/security, and originality reviews remain required. Runtime behavior, responsive flow, learner correction, delayed retention, transfer, and observed beginner success remain unverified. Nothing in this inspection authorizes publication.
