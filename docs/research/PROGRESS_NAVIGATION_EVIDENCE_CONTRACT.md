# Progress and Navigation Evidence Contract

Reviewed: 2026-07-15

## Research status

Current learning-science, course-quality, accessibility, and competitive evidence supports the hypotheses in this contract. Representative learner comprehension and navigation tasks have not passed yet. These rules therefore block implementation drift but do not claim validated usability.

Relevant evidence includes the [IES study practice guide](https://ies.ed.gov/ncee/wwc/PracticeGuide/1), [How People Learn II](https://nap.nationalacademies.org/catalog/24783/how-people-learn-ii-learners-contexts-and-cultures), [Quality Matters](https://www.qualitymatters.org/qa-resources/rubric-standards/higher-ed-rubric), [SUNY OSCQR](https://oscqr.suny.edu/), [WCAG 2.2](https://www.w3.org/TR/WCAG22/), [OLI practice guidance](https://oli.cmu.edu/faq-items/practice-pages/), and [Khan Academy Mastery Challenges](https://support.khanacademy.org/hc/en-us/articles/360037494231-What-are-Mastery-Challenges). Product behavior remains a hypothesis until tested here.

## Learner questions every surface must answer

1. Where am I?
2. What can I do now?
3. What comes next, and why?
4. What earlier skill returns here?
5. Why is something unavailable?
6. What evidence have I produced?
7. What does the platform currently claim I can do?
8. What needs correction or review?
9. How do I resume, get help, or recover?
10. What real project or outcome is this preparing me for?

If a dashboard, map, module, activity, assessment, or credential surface cannot answer its relevant questions without repository terminology, it fails learner-facing review.

## Evidence types

| Learner-facing state | Minimum persisted evidence                                                                                 | Forbidden inference                                                                     |
| -------------------- | ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Not started          | No qualifying attempt exists                                                                               | Do not infer disinterest, inability, or recommended difficulty                          |
| Draft saved          | Artifact or response draft with version and save time                                                      | A draft is not an attempt or competence claim                                           |
| Attempted            | Submitted response plus check version, observed result, and feedback                                       | Time, clicks, or source tokens do not prove effort quality or understanding             |
| Completed            | Required activity evidence passed under the named contract                                                 | Completion is not mastery, retention, transfer, or project readiness                    |
| Corrected            | A prior failure was repaired and a parallel changed case passed                                            | Repeating the exact answer does not prove correction                                    |
| Demonstrated         | Independent changed-case performance for a named competency                                                | One guided example does not prove broad mastery                                         |
| Retained             | Delayed mixed evidence meets the competency threshold                                                      | Initial completion or a streak does not prove retention                                 |
| Transferred          | Unfamiliar authentic task uses the competency under changed constraints                                    | A renamed workshop or near-identical starter is not transfer                            |
| Project-ready        | Required competencies, independent builds, delayed evidence, and project prerequisites are current         | Course percentage or activity count is not readiness                                    |
| Credential-ready     | All terminal tasks, projects, exam, delayed work, review, and defense requirements have auditable evidence | Generated content, schema validity, or automated tests alone cannot confer a credential |

## Progress rules

- Preserve historical completion even when later retention evidence declines.
- Show mastery, retention, transfer, and project readiness separately; never collapse them into one flattering number.
- Every value opens a plain-language explanation and the exact attempts, checks, projects, dates, versions, and limitations supporting it.
- Show uncertainty and stale evidence. A source or check version change can require review without erasing prior work.
- A due review names the competency, reason, approximate effort, and consequence of postponing it.
- Failed evidence produces a corrective action, prerequisite bridge, parallel retry, and reassessment route.
- Hints and facilitator intervention remain attached to the attempt so independent and supported evidence are not confused.
- Learner choice can change route and timing but cannot silently weaken terminal evidence.
- No XP, streak, room, card, badge, recommendation, or ranking appears unless it has a defined learning purpose, real data source, accessible alternative, failure hypothesis, and learner validation.
- No analytics value is displayed merely because it can be counted.

## Navigation rules

- Use one stable hierarchy: catalog or goal, course, module, activity, evidence or project.
- The course map is inspectable even when a prerequisite blocks action.
- A lock identifies the missing evidence and offers only real available routes: diagnostic, bridge, review, wait for due evidence, or an explicitly justified bypass.
- The resume action returns to the exact recoverable state, not merely the course landing page.
- The next action is derived from prerequisites, due review, incomplete required evidence, corrective work, and learner choice; it is never fake personalization.
- Back, breadcrumbs, headings, landmarks, page title, current item, and focus restoration agree.
- Error, empty, loading, offline, stale-version, and unsupported-editor states retain orientation and provide a recovery action.
- Course studios target supported tablets and desktops. Public information remains phone-usable, and a phone handoff explains the device need, preserves progress, and gives a direct resumable route.
- Labels describe learner actions and outcomes, not schemas, migrations, generators, checks, repository architecture, or product boasts.

## Required comprehension tasks

Representative learners must be able to:

1. distinguish completion, mastery, retention, transfer, and project readiness in their own words;
2. locate the evidence and limitation behind a displayed state;
3. explain why an activity is locked and choose an appropriate corrective route;
4. resume an interrupted activity at the exact artifact and step state;
5. find due review and explain why it is due;
6. recover after a failed check without receiving the answer;
7. find the current project, its prerequisites, and the skill the current activity contributes;
8. navigate the full task with keyboard, screen reader, zoom/reflow, and touch where supported;
9. use the phone handoff without losing work or assuming the course is broken;
10. identify when evidence is supported, assisted, stale, failed, or awaiting transfer.

## Automated reconciliation tests

- recompute every displayed state from persisted fixtures and compare the rendered value;
- reject counts or percentages with missing denominators, populations, versions, or source records;
- prove completion remains while retention changes;
- prove failed, corrected, hinted, assisted, delayed, and transferred attempts produce distinct states;
- prove cross-course prerequisites use the same competency identity and do not unlock on unrelated activity completion;
- prove corrupt or stale fields degrade independently and never invent a passing state;
- prove next-action selection uses only available real records and deterministic rules;
- prove empty accounts show truthful zero-state guidance without mock recommendations or fake metrics;
- prove learner-facing strings contain no internal repository or architecture language;
- prove all state and feedback changes are announced and do not rely on color alone.

## Approval gate

Progress and navigation cannot be called validated until automated reconciliation, cognitive walkthrough, accessibility review, novice and returning learner comprehension, supported tablet tasks, interruption recovery, and representative re-tests close all critical and serious findings.
