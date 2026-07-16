# Responsive Web Design Architecture, Order, Reinforcement, and Duplication Audit

Reviewed: 2026-07-16

Status: **blocking internal second-pass audit; not independent approval**

## Decision

The Responsive Web Design research inventory is broad enough to begin architecture repair, but the current 17-module graph is not yet safe to author at scale. It is a research macro-sequence, not a complete learner sequence. Its prerequisite graph is acyclic and its source inventory is exact, but its beginner order, reinforcement wiring, certification-project selection, activity granularity, and assessment plan require repair.

This audit corrected one concrete project-mapping error immediately: the five project briefs now trace to the five actual certification-project benchmarks in the pinned source—Survey Form, Tribute Page, Technical Documentation Page, Product Landing Page, and Personal Portfolio. Page of Playing Cards and Book Inventory remain useful lab evidence, but they are not substituted for certification projects.

This audit does **not** approve the source mappings, concept graph, modules, projects, assessment, or learner content. No learner content exists to approve. Independent subject-matter, instructional-design, assessment, accessibility, and observed-learner review remain required.

## Evidence reviewed

- `references/freecodecamp-rwd-v9.json`, pinned at upstream commit `c115efdd41f868d8850156f6a7a211219c35a847`;
- all 158 challenge-level source inspection records in `responsive-web-design-concept-alignment.json`;
- all 83 HTML/tooling concepts in `responsive-web-design-html-concepts.json`;
- all 103 CSS/design/responsive concepts in `responsive-web-design-css-concepts.json`;
- all 17 candidate modules and five project briefs in `responsive-web-design-course-architecture.json`;
- the course dossier and its 103 bounded research sources;
- the curriculum design handbook, platform rebuild contract, beginner-sequence inspection, block inspection notes, and current publication boundary;
- exact title and objective normalization, lexical-neighbor review, prerequisite-edge review, retention-edge comparison, retrieval-edge comparison, project provenance review, and module-load review.

## Mechanical inventory

| Evidence | Current result | Meaning |
| --- | ---: | --- |
| Pinned source blocks | 158 | Complete source identity inventory |
| Pinned source challenges | 1,553 | Complete challenge identity inventory |
| Captured prompts | 1,365 | Source depth evidence, not target questions |
| Inspected checks | 5,163 | Source behavior evidence, not target graders |
| Block-specific candidate mappings | 157 | Candidate scope only |
| External exam containers without item evidence | 1 | Hard assessment-validity boundary |
| Target concepts | 186 | 83 HTML/tooling plus 103 CSS/design/responsive |
| Candidate macro-modules | 17 | Too coarse to serve as final learner modules |
| Prerequisite edges | 340 | Acyclic and earlier-pointing under current schema |
| Declared concept-retention edges | 217 | Mostly terminal-project defaults; not an activity schedule |
| Explicit module-retrieval edges | 63 | Only 16 agree with declared retention edges |
| Declared retention edges absent from module retrieval | 201 | Blocking metadata disconnect |
| Module retrieval edges absent from concept retention | 47 | Blocking metadata disconnect |
| Concepts with only one named terminal-project retention | 161 | No explicit intermediate delayed event |
| Concepts with neither explicit module retrieval nor project use | 121 | No visible later evidence assignment |
| Project concept edges | 46 | Planning coverage, not an assessment blueprint |
| Exact normalized duplicate concept titles | 0 | No exact title duplication found |
| Exact normalized duplicate concept objectives | 0 | No exact objective duplication found |
| Authored activities, steps, checks, or assessments | 0 | No teaching or mastery evidence exists |

The counts above are derived from the reviewed research artifacts. They must be recomputed whenever module ownership, concept retention, retrieval, or project placement changes.

## Finding 1: the project provenance was wrong and is now repaired

The previous five-project array used `lab-page-of-playing-cards` and `lab-book-inventory-app` as two of the five certification-project benchmarks. That omitted `lab-tribute-page` and `lab-personal-portfolio`. This was a category error: ordinary labs can inform formative practice, but they cannot replace named certification-project coverage.

The corrected project provenance is:

| Original LEARN-IT-ALL transfer | Pinned certification benchmark | Planned placement |
| --- | --- | --- |
| Community Support Intake and Service Schedule | `fcc-v9-lab-survey-form` | after independent HTML transfer |
| Neighborhood History Evidence Exhibit | `fcc-v9-lab-tribute-page` | after user evidence, typography, color, and design |
| Emergency Preparedness Field Guide | `fcc-v9-lab-technical-documentation-page` | after responsive systems |
| Community Energy Program Launch | `fcc-v9-lab-product-landing-page` | after interaction, accessibility, motion, and regression |
| Professional Evidence Portfolio | `fcc-v9-lab-personal-portfolio` | after independent responsive transfer |

The five scenarios are original and use different stakeholder evidence, artifacts, content risks, requirements, and defenses. The portfolio explicitly prohibits invented projects, fake metrics, dead controls, and unsupported capability claims. Project briefs remain `planned-not-authored` and require review before implementation.

## Finding 2: the beginner opening is still too abstract

The opening contract is correct in one important way: the learner changes HTML by action two, and tooling follows the first artifact instead of recreating the rejected thirteen-activity pre-HTML barrier.

The concept grouping is still not beginner-ready:

- `html-first-page` owns twelve concepts, including element-versus-tag terminology, DOM-node distinctions, content models, void syntax, character references, and parser recovery;
- headings, paragraphs, and lists do not enter until `html-text-and-semantics`, currently module five;
- links enter in module three;
- images and media currently enter in module four, before the text-and-semantics module;
- the first module therefore risks teaching taxonomy and recovery rules before the learner has built enough ordinary page content to give those models a purpose.

The architecture repair must create a concrete content-first opening. A true beginner should quickly write and inspect a complete small page using a heading, paragraphs, a list, and a meaningful link while learning only the element anatomy needed for the next action. Tree, content-model, parser-recovery, character-reference, and DOM/source distinctions should enter at the first defect or changed case that makes each model useful. Images, licensing, media, and embeds should follow basic document content and paths. The first artifact must stay cumulative rather than restart for every concept.

No learner-facing HTML authoring may scale from the current macro grouping. The repaired opening sequence and its activity matrix must be reviewed first, then implemented as the vertical slice.

## Finding 3: CSS concept buckets are not final learner modules

The current CSS macro-modules contain 17, 13, 23, 8, 12, 14, 15, and 1 newly owned concepts. The sequence has sensible broad dependencies—language before boxes, boxes before Flex and Grid, layout before responsive integration—but several buckets combine too many mechanisms and decision types for one beginner module:

- `css-language-and-cascade` combines first stylesheet use, selector families, pseudo-elements, list counters, inheritance, origins, importance, specificity, cascade layers and scope, unregistered and registered custom properties, and link-state sequencing before box layout;
- `css-type-color-and-design` combines font delivery and metrics, variable-font features, text layout, color spaces and derived colors, filters and gradients, user research, prototyping, tokens, wayfinding, cards, registration disclosure, and control states;
- `css-grid-and-positioning` combines two-dimensional Grid, subgrid, positioning, anchor positioning, stacking contexts, and legacy float use;
- `css-interaction-accessibility-and-motion` combines zoom, focus, input capability, target size, modal behavior, multistep recovery, cart correction, motion, forced colors, print, causal debugging, performance, and regression.

These are defensible research strands, but not defensible final lesson loads. Architecture repair must split them into learner-sized modules and lessons based on mental-model boundaries, not copy the benchmark's navigation or force an arbitrary module count. Each new module must name its prerequisite retrieval, bounded new complexity, cumulative artifact change, formative evidence, independent lab, delayed event, and exit decision.

Advanced mechanisms such as registered custom properties, cascade scope, variable-font features, anchor positioning, container units, forced colors, and rendering-performance traces must not delay or obscure basic stylesheet application, selectors, declarations, ordinary text styling, and box behavior. They should extend an already usable model at a justified artifact decision.

## Finding 4: the retention graph is disconnected from the retrieval graph

The concept graphs declare 217 `retainedInModuleIds` edges. The architecture declares 63 module `retrievalConceptIds` edges. These are currently independent lists:

- 201 declared retention edges are not named by the target module's retrieval list;
- 47 module retrieval edges are not declared as retention by the concept;
- only 16 concept-to-module pairs agree;
- 161 concepts name only an HTML or CSS independent-project module as their sole retention target;
- 121 concepts have neither an explicit module retrieval assignment nor use in one of the five project briefs.

Listing every evidence stage on every research concept does not repair this. The stage labels state the intended progression; they do not identify an actual activity, delay, changed scenario, evidence rule, correction branch, or reassessment.

The replacement must be one authoritative activity-level reinforcement schedule. For every concept it must identify:

1. immediate model and guided use;
2. same-module faded use;
3. use in the next relevant lesson or build;
4. a distinct independent lab or debugging event;
5. delayed retrieval in a later module;
6. assessment only after introduce, guided, and faded evidence;
7. transfer when the competency is terminal;
8. continued correctness checks in later cumulative work where failure would invalidate the artifact.

The schedule must link each event to an activity ID, interaction type, scenario, observable evidence, prerequisite set, feedback/correction path, and delay boundary. Module summaries may be derived from that reviewed schedule, but must not become a second manually maintained truth.

## Finding 5: activity and step depth is unplanned below the macro-module level

The platform contract requires at least the benchmark depth: 33 original guided builds, at least 1,287 original workshop code steps, at least 185 interactive theory steps, 34 independent labs, 24 active-recall reviews, 22 quiz banks, five original certification projects, one broad randomized exam, and at least 2,000 meaningful learner interactions before quizzes and the exam.

The current graph has zero authored activities and no complete activity matrix. It cannot yet show:

- where prediction, inspection, explanation, modification, completion, debugging, making, and transfer occur;
- how guidance fades within and across workshops;
- which prior concepts remain required on every cumulative step;
- whether workshop, lab, debugging, review, project, and assessment scenarios are semantically distinct;
- whether each code step has one observable purpose, real checks, three progressive hints, useful failure feedback, and cumulative final validation;
- whether active work reaches the required share of course time;
- whether the source depth is met with meaningful original interactions instead of inflated click or paragraph counts.

The next architecture artifact must be the complete original activity matrix. Counts are minimum inventory guards, not completion evidence. Every planned row must also survive instructional, assessment, duplication, accessibility, runtime, and learner review.

## Finding 6: the external exam cannot validate LEARN-IT-ALL certification

The pinned exam source is a 296-byte pointer to an external exam environment. It exposes no reviewable items, blueprint, cognitive targets, form construction, scoring rules, correction policy, item statistics, security model, accessibility evidence, or standard-setting method. It therefore maps to zero concepts.

LEARN-IT-ALL must author its own assessment system from the terminal competency model. Before certification it needs:

- a published assessment blueprint mapping competencies, cognitive demand, item format, evidence, and weight;
- original item and task banks with parallel forms and no exposed canonical answers;
- formative correction and parallel reassessment that do not leak summative items;
- behavior, changed-case, explanation, diagnosis, accessibility, design-defense, and transfer evidence rather than syntax recall alone;
- scoring and mastery rules linked to observable evidence;
- accessibility and runtime validation for every item type;
- reviewer evidence for content validity, bias/sensitivity, clarity, security, form balance, and defensible cut-score decisions;
- pilot data before any claim that a passing result certifies independent responsive-design performance.

External source breadth can inform scope. It cannot supply hidden validity evidence and it cannot be guessed.

## Finding 7: concept duplication is currently bounded, but content duplication is untestable

Exact normalization found no duplicate concept titles and no duplicate concept objectives. A lexical-neighbor pass surfaced three pairs:

- HTML purpose/structure versus CSS purpose/document boundary;
- Flex alignment/distribution versus Grid alignment/distribution;
- independent HTML transfer defense versus independent CSS transfer defense.

These are intentional distinctions, not merge candidates. Each pair has a different mechanism, prerequisite context, artifact evidence, and failure mode. The authoring matrix must preserve those contrasts explicitly so later prose or exercises do not collapse them into repeated generic explanations.

No learner-facing activity content exists, so the platform cannot yet claim successful semantic duplication removal. The duplication gate must run on planned activity briefs before authoring, on authored instructions/starters/requirements/checks/solutions/feedback before review, and across the full catalog before publication. It must reject renamed scenarios, repeated requirement order, repeated starter structure, repeated answer shapes, and one generic exercise template even when surface words differ.

## Finding 8: source inspection is complete, independent mapping review is not

All 158 source blocks have challenge-level agent inspection at the evidence available in the pinned snapshot. One hundred fifty-seven have bounded block-specific candidate maps. The unavailable exam container is explicitly non-specific. Seven target concepts remain unresolved and seven modern concepts remain separate extensions rather than receiving false benchmark credit.

That is an honest source boundary, not subject approval. Every map remains `candidate-review`. Independent reviewers must still inspect omissions, overclaim, technical accuracy, concept boundaries, prerequisite choices, accessibility implications, and benchmark-versus-extension classification. A passing schema proves structural consistency only.

## Accepted architecture strengths

The repair should preserve these decisions unless evidence disproves them:

- no legacy learner content, blueprint generator, compatibility route, alternate course surface, or guessed migration is retained;
- HTML is the first coding language and the first meaningful edit occurs by action two;
- computer, file, browser, search, safety, and DevTools teaching enters just in time around real artifact needs;
- HTML semantics and accessibility remain correctness requirements during CSS and responsive work;
- source block identity is coverage evidence, not the learner navigation layout;
- projects use original scenarios and begin from stakeholder evidence rather than copied workshop source;
- canonical answers stay outside public learner payloads and learner code remains isolated;
- phone course studios remain unsupported with an accessible handoff, while public information remains phone-usable;
- Lighthouse remains held until content, migration, duplication, platform, review, and pilot work is complete.

## Required repair order

1. Replace the 17 macro-buckets with reviewed learner-sized module and lesson boundaries, starting with a concrete content-first HTML opening.
2. Create one authoritative activity-level I-G-F-R-A-T reinforcement matrix for all 186 concepts; derive module retrieval summaries from it.
3. Design distinct original theory, prediction, worked-example, workshop, faded, debug, lab, review, quiz, project, correction, delayed-retrieval, and transfer events at or above the verified depth floor.
4. Publish an internal assessment blueprint and author original formative and summative evidence plans without using unavailable external exam items.
5. Run second-pass subject, instructional, assessment, accessibility, runtime, and semantic-duplication review on the planned matrix.
6. Author only the true-beginner HTML/editor vertical slice, verify its real grading, hints, persistence, correction, keyboard, tablet, desktop, and phone-handoff behavior, and observe representative beginners.
7. Repair pilot findings before scaling the rest of Responsive Web Design.

## Exit conditions for this blocker

This audit can close only when:

- every concept has coherent prerequisite ownership and an activity-level evidence progression;
- every declared delayed-retention event points to a real later activity and every module retrieval summary is derived from those events;
- the concrete beginner opening teaches usable HTML before advanced terminology and recovery detail;
- the CSS sequence separates first-use fundamentals from advanced cascade, design-system, layout, preference, and performance mechanisms;
- all five certification project benchmarks retain correct provenance and all five original briefs pass reviewer checks;
- the complete activity matrix meets depth floors without placeholder or semantic duplication;
- the assessment blueprint covers terminal competencies and explicitly bounds unavailable external exam evidence;
- independent subject, instructional-design, assessment, and accessibility reviewers approve the repaired plan;
- the architecture remains `researching` until those decisions have evidence.

Until then, the correct state is **researching, planned-not-authored, unpublished, and Lighthouse-held**.
