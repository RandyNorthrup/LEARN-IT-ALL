# Course Blueprint Release Template

Every catalog course gets a reviewed blueprint before lessons are authored. The machine-readable form must pass `CourseBlueprintSchema` and `auditCourseBlueprint` in `src/core/curriculum/blueprint.ts`.

## Identity and learner

- Course ID, version, status, research date, owner, and review date
- Intended learner and authentic post-course roles
- Entry knowledge and diagnostic evidence
- Device, connectivity, language, and accessibility assumptions
- Included depth, excluded depth, and next-course boundary

## Source register

List at least three current authorities. For each source record title, authority type, exact URL, version/date, review date, and which part of the course it controls. Technical claims should use primary specifications or official documentation.

## Competency graph

For each competency record:

- stable ID and observable statement;
- knowledge type and target cognitive level;
- prerequisite competency IDs;
- common misconceptions;
- evidence accepted as mastery.

Include a rendered dependency graph and prove it is acyclic.

## Module map

For every module record:

- order and module prerequisites;
- measurable objectives;
- theory, prediction, worked example, guided workshop, faded practice, debugging, independent lab, review, quiz, and transfer activities as appropriate;
- authentic context and estimated effort for every activity;
- competency coverage marked I, G, F, R, A, and T.

Every activity after the first must reinforce at least one previously introduced competency. Every terminal competency needs all six coverage stages.

## Project ladder

Plan at least three distinct cumulative real-world projects. Each includes stakeholder, user need, constraints, competency coverage, automated acceptance evidence, judgment rubric, accessibility requirements, reflection, and extension options. Project scenarios and starters cannot duplicate workshops or each other.

## Assessment blueprint

Define mastery threshold, formative correction and parallel-retry policy, quiz/exam competency distribution, cognitive-level distribution, minimum item-bank size, performance assessments, rubric dimensions, and item-analysis review policy.

## Spiral schedule

For every competency show immediate guided use, same-module faded use, next relevant lesson reuse, independent lab use, delayed retrieval, and cumulative project transfer. The plan must show that fundamentals remain enforced in later work.

## Review signatures

- Subject-matter expert
- Instructional designer
- Assessment reviewer
- Accessibility reviewer
- Technical freshness reviewer
- Pilot evidence and remediation owner
