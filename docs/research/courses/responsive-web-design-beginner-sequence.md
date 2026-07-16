# Responsive Web Design Beginner Entry Sequence Research

Reviewed: 2026-07-15

Source snapshot: freeCodeCamp Responsive Web Design v9 commit `c115efdd41f868d8850156f6a7a211219c35a847`, WHATWG HTML Living Standard, MDN Curriculum, and the rejected LEARN-IT-ALL generated sequence recorded before deletion.

## Status

This is a direct source inspection and sequence decision record. It is not approval of freeCodeCamp instruction, not permission to copy it, and not learner validation of the proposed LEARN-IT-ALL sequence.

The inspection covered all 61 units in the first seven current v9 blocks: the opening curriculum-outline workshop, two debugging labs, the attributes lecture, the document-boilerplate lecture, the 42-step cat-photo workshop, and the one-challenge recipe-page lab. Stable challenge identities, source paths, hashes, byte counts, section names, and check counts are retained in `references/freecodecamp-rwd-v9.json`; learner-facing source prose is not copied into this repository. The prior 64-unit figure was an arithmetic error and has been corrected rather than carried forward as research evidence.

## What the source inspection changed

### Immediate construction is a real requirement

The first v9 workshop does not begin with a long platform tour. Its opening unit names HTML and the editor, its second unit introduces an element as opening tag, content, and closing tag, and its third connects the edited source to preview output. Headings and paragraphs follow through immediate edits. This supports the existing `rwd-begin-with-building` decision.

The deleted generated sequence placed 13 computer, file, browser, DevTools, research, review, and transfer activities before the first `basic-html` activity. That architecture conflicted with the accepted decision that meaningful HTML editing begins within two workshop steps. Required computer-basics material must be integrated just in time around the first artifact or placed after the learner has built and inspected a minimal page.

### The course must explicitly teach the syntax model

The source sequence provides evidence that a true beginner needs all of these named separately and then recombined:

- source text versus browser output;
- element, opening tag, closing tag, content, and void element;
- tag name and lowercase authoring convention;
- nesting, parent, child, sibling, and source indentation as representation rather than structure itself;
- attributes in an opening tag, attribute name, value, quoting, boolean and enumerated behavior;
- character references and comments;
- document, doctype, root, head, body, title, language, character encoding, and viewport metadata;
- content meaning through headings, paragraphs, lists, links, images, figures, media, and sections;
- browser parsing and error recovery versus conforming authored source.

These cannot be compressed into a topic label or inferred from an editor starter. Each requires prediction, explicit explanation, a minimal worked example, a meaningful edit, a malformed case, correction, later retrieval, and changed-case performance.

### Starters can conceal missing knowledge

The later 42-step workshop starts with document elements already present and says the learner is continuing earlier HTML work. It eventually introduces document-level concepts near the end. That is coherent only because earlier blocks exist. LEARN-IT-ALL cannot start from a large unexplained scaffold or assume a learner understands inherited `html`, `head`, or `body` source because it renders.

Every starter must declare which prior learner artifact it continues. Any unfamiliar syntax in a starter is either explicitly taught before use or isolated as a prediction and investigation target before the learner must author it.

### Debugging needs a readiness gate

The current v9 order places debugging labs after short introductory encounters. Debugging is valuable retrieval and diagnosis, but a beginner can only diagnose a construct after forming a usable model of its intended behavior. LEARN-IT-ALL will place micro-debugging immediately after each bounded concept, then use a multi-defect clinic only after relevant element, nesting, attribute, and document models have received guided practice.

### External advice needs standards review

Course wording may present useful conventions as universal requirements. For example, heading structure guidance, image alternative text, new-window links, sectioning elements, and document metadata all require context and current standards or accessibility review. The external curriculum controls coverage and practice-depth benchmarking; WHATWG and W3C sources control technical claims.

## Proposed prerequisite order

This is the sequence to test before authoring expansion:

1. **First visible artifact:** type plain text, wrap it in one meaningful element, and connect source, parsed element, and preview.
2. **Element anatomy:** identify and author opening tag, content, closing tag, tag name, and a void-element contrast.
3. **Nesting and tree relationships:** predict parent, child, sibling, text, and browser recovery from a small malformed example.
4. **Attributes:** add one behavior-changing attribute, distinguish name from value, and test missing, misplaced, quoted, boolean, and enumerated cases.
5. **Minimal complete document:** build doctype, root, language, head, encoding, viewport, title, and body from an empty file rather than receiving an unexplained scaffold.
6. **Text structure:** use page and section headings, paragraphs, emphasis, importance, quotations, code, and ordered or unordered lists by meaning.
7. **Links and paths:** connect link purpose, accessible text, absolute, relative, fragment, email, and telephone URLs to the learner's growing project tree.
8. **Images and SVG:** choose purpose, source, dimensions, alternative treatment, figures, captions, and failure behavior.
9. **Audio, video, and embedded content:** add controls, captions or transcripts, fallbacks, titles, permissions, and responsive bounds.
10. **Structure and semantics:** organize landmarks, sections, articles, navigation, complementary content, disclosures, dates, addresses, and valid content relationships.
11. **Browser evidence and validation:** use source, DOM, accessibility information, validation, network, and console evidence to diagnose rather than guess.
12. **Independent HTML project:** build an unfamiliar information artifact from an empty project, then defend structure, content relationships, accessibility, and error recovery before CSS begins.

Computer, files, URLs, browsers, and DevTools are introduced at the moment the first artifact needs them, then revisited with increasing depth. They remain real competencies, but no longer form a thirteen-activity barrier before HTML.

## Required learning progression for each new construct

1. retrieve the exact earlier construct that forms the prerequisite;
2. state the new construct's purpose and boundary in plain language;
3. predict a minimal example and one tempting misconception;
4. inspect source, parsed structure, accessible information, or behavior;
5. make a small meaningful edit in the inline workspace;
6. test at least one malformed, missing, moved, or changed-content case;
7. receive causal feedback and use a graduated hint only if needed;
8. complete a parallel faded task with less prompting;
9. debug the construct in a different context;
10. retrieve it later while adding a new feature;
11. demonstrate it independently in a project and explain the evidence.

The exact number of steps varies by complexity. Thousands of source-reference challenges establish the minimum interaction-depth benchmark, but no step exists only to inflate inventory.

## Original opening vertical slice to prototype

Use a fictional public-service notice, not a renamed external workshop:

- begin with one line of unmarked notice text in an otherwise empty file;
- create a page heading and paragraph while naming element anatomy;
- compare source, DOM, accessibility information, and visible output;
- create and repair one missing close tag and one invalid nesting case;
- add a language attribute and explain name, value, quotes, and purpose;
- build the complete document envelope from empty source;
- add a section, meaningful link, and informative image with a changed missing-image case;
- save, reload, and resume the exact editor state;
- complete a parallel unfamiliar alert card without copied source;
- explain why the result works, what the browser repaired, and what still needs validation.

The first meaningful edit must occur within two learner actions. The slice must pass source and DOM behavior checks, changed cases, keyboard and screen-reader tasks, tablet and desktop layout, persistence, and beginner observation before subsequent activities are authored.

## Blockers before sequence approval

- decompose all 158 source blocks and relevant standards into concept-level objectives rather than relying on block names and counts;
- map exact prerequisite relationships and known misconceptions for every HTML competency;
- review external statements against current WHATWG, WCAG, WAI, MDN, CSS, and browser evidence;
- design original practice contexts, starters, feedback, hints, hidden changed cases, and independent projects;
- verify that current RWD activities do not delay the first edit, assume unexplained syntax, repeat generic prose, or grade source tokens;
- conduct subject, instructional, assessment, accessibility, safety, and representative true-beginner review;
- repair findings and repeat the opening flow before scaling.
