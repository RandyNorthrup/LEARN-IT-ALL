# Learner Research and Pilot Protocol

Reviewed: 2026-07-15

## Purpose

Research sources and automated tests can establish plausible scope, technical correctness, contracts, and failure boundaries. They cannot prove that a learner understands the course, can navigate the platform, can recover from errors, or can transfer a skill. This protocol supplies that missing evidence without inventing analytics.

No course or major learner flow becomes `approved` or `published` until its required observed tasks pass, critical findings are repaired, and representative re-tests succeed.

## Research questions

1. Does the intended learner understand the course outcome, prerequisites, route, current task, feedback, and progress labels?
2. Can the learner form the intended mental model, predict behavior, build, inspect, diagnose, revise, retrieve, and transfer?
3. Does prior knowledge help rather than cause an unobserved prerequisite gap?
4. Can the learner recover from a wrong answer, broken artifact, timeout, lost connection, unsupported editor, and interrupted session?
5. Can disabled, keyboard-only, zoomed, high-contrast, reduced-motion, screen-reader, touch, and supported tablet learners complete equivalent outcomes?
6. Does each displayed completion, mastery, retention, transfer, and project-readiness claim match the evidence the learner believes it represents?
7. Do hints preserve productive effort, and does correction produce a changed-case improvement?
8. Can the learner complete an unfamiliar authentic task without copying the guided artifact?

## Participant groups

Recruit against the course's stated audience, not convenience alone. Across platform and curriculum waves, include:

- true beginners with no subject-specific experience;
- returning learners with fragmented or outdated experience;
- intermediate learners testing bypass and placement behavior;
- advanced learners testing transfer, review, and efficient navigation;
- keyboard-only users;
- screen-reader users on supported browser and operating-system combinations;
- low-vision users testing zoom, reflow, contrast, and focus visibility;
- users who prefer or require reduced motion;
- supported tablet users using touch and a hardware keyboard;
- users with varied language, reading, attention, working-memory, and motor needs where recruitment and consent permit.

A participant may belong to several groups. Demographic collection is limited to information needed to interpret the research question.

## Ethics, consent, and privacy

- explain the purpose, tasks, recording method, data use, retention period, compensation, risks, withdrawal, and contact route in plain language;
- make participation optional and separate from ordinary course progress or credentials;
- test the product, never the participant; facilitators do not describe errors as learner failure;
- collect the minimum identifiers and accessibility context needed for the analysis;
- never request passwords, private repositories, employer data, protected course answers, credentials, unsafe system access, or external account actions;
- use fictional or participant-owned safe content;
- redact source code, free text, screen content, voice, or personal details not required by the study;
- store consent records separately from de-identified observations;
- define deletion and retention dates before collection and honor withdrawal where feasible;
- do not train models, publish quotes, or reuse recordings beyond the consented purpose;
- record facilitator interventions because an assisted success is not an independent pass.

## Standard task set

### Orientation and placement

- choose a course from a stated learner goal;
- explain audience, outcome, prerequisites, effort, tools, accessibility support, projects, and credential evidence;
- complete a small prerequisite diagnostic;
- select begin, bridge, review, or justified bypass and explain why.

### Navigation and resume

- find current location, prior evidence, next task, due review, project status, and help;
- explain a lock and reach a corrective route;
- leave during an incomplete multi-file activity and resume the exact file, selection, sequence, reflection, output, and checkpoint;
- move between supported tablet and desktop or use the phone handoff without losing work.

### Learning and correction

- explain the bounded model in the participant's own words;
- predict a new example before running it;
- modify a worked example and connect the changed input to the observed output;
- complete faded practice with less guidance;
- diagnose a realistic failure using evidence;
- use hints only as needed, revise, and complete a parallel retry;
- retrieve a named earlier skill in a different context.

### Assessment and transfer

- complete a changed-case performance assessment;
- interpret the resulting completion, mastery, retention, and project-readiness labels;
- return after the planned interval for mixed delayed work;
- complete or defend an unfamiliar stakeholder project without a recipe;
- explain tradeoffs, remaining uncertainty, testing, accessibility, safety, and transfer limits.

### Accessibility and runtime recovery

- enter, use, and leave the editor with the participant's input method;
- find and act on semantic diagnostics without depending on color or visual markers;
- run work without unexpected focus movement and review announced status and detailed output;
- recover from timeout, worker failure, offline change, corrupt field, storage denial, unsupported Monaco path, preview denial, and reset confirmation;
- complete the same outcome through the native editor fallback.

## Session procedure

1. verify consent, access needs, device, browser, and input method;
2. collect the participant's expectation before the task;
3. ask the participant to think aloud only when that method is accessible and does not materially alter the task;
4. withhold help until the participant reaches the defined stuck threshold or requests it;
5. record action, evidence consulted, interpretation, error, hint, recovery, facilitator intervention, and outcome;
6. ask the participant what the interface, feedback, and progress label meant;
7. run a changed case so recognition or remembered wording cannot masquerade as understanding;
8. debrief, confirm data choices, and record requested deletion or follow-up needs;
9. severity-rate findings and assign a repair owner;
10. re-test repaired critical and serious findings with representative participants.

## Evidence record

Each observation must include:

- study and participant pseudonymous IDs;
- consent scope and deletion/retention date;
- date, build commit, content/runtime/check versions, feature state, device, viewport, browser, operating system, input, assistive technology, zoom, contrast, and motion preference;
- course, module, activity, prerequisite state, starting artifact, and task script;
- expected learner interpretation and observable success criteria;
- timestamped actions, errors, attempts, hints, feedback, interventions, recovery, completion, changed case, and transfer result;
- participant explanation in bounded paraphrase unless quotation was explicitly consented;
- finding, affected competency or flow, severity, evidence location, proposed repair, owner, status, and re-test result;
- researcher limitations, uncertainty, and possible observer effect.

## Severity

| Severity | Definition                                                                                                                                               | Release effect                                                                              |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Critical | Prevents the core outcome, risks safety/privacy, loses work, exposes answers/data, traps an assistive-technology user, or makes a false credential claim | Blocks all affected publication; repair and representative re-test required                 |
| Serious  | Causes repeated failure, major misunderstanding, invalid evidence, inaccessible alternative, or unrecoverable wrong path                                 | Blocks affected course or feature approval; repair and re-test required                     |
| Moderate | Causes material delay, avoidable hint dependence, confusion, or inconsistent recovery but a viable route remains                                         | Must be scheduled and justified before wave approval; re-test when it changes the task      |
| Minor    | Low-impact clarity, efficiency, or polish issue that does not alter outcome or evidence                                                                  | Track with owner and next review; may ship only if no accumulation creates a larger barrier |

## Pass rules

- success means the participant completes the observable outcome and can explain the relevant evidence; clicks, time, or facilitator completion do not count;
- a guided success and an independent success are recorded separately;
- one participant cannot establish universal usability or learning validity;
- sample size follows risk, learner diversity, finding saturation, and the consequence of failure rather than one arbitrary platform-wide number;
- every critical and serious finding requires repair and representative re-test;
- no subgroup failure is averaged away by a stronger overall rate;
- progress-label comprehension, changed-case performance, delayed retention, project transfer, and accessibility outcomes are separately reported;
- missing recruitment or observation remains an explicit release blocker, never a guessed pass.

## Pilot waves

1. **Research prototype:** small task fragments test labels, mental models, interaction, and editor/runtime recovery before broad implementation.
2. **Vertical slice:** one full prerequisite-to-transfer path in Responsive Web Design and one non-web domain test the complete platform contract.
3. **Course pilot:** intended learners complete representative modules, cumulative projects, delayed reviews, and the independent assessment.
4. **Cross-course pilot:** learners navigate prerequisites, bridges, shared skills, due review, progress evidence, and handoff between courses.
5. **Release pilot:** supported devices, browsers, accessibility configurations, persistence, safe-runtime failures, and credential evidence are tested on the release candidate.

## Current blocker

No representative learner pilot has yet passed under this protocol. Existing browser automation and prior live route checks prove implementation behavior only. They do not prove comprehension, learning, retention, transfer, or usability by the stated learners.
