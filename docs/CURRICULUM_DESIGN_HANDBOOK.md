# Institution-Grade Curriculum Design Handbook

## Purpose

This handbook controls course planning, authoring, review, and release for LEARN-IT-ALL. A course is not complete because it has many files. It is complete only when a learner can enter with stated prerequisites, progress through a coherent competency sequence, repeatedly apply earlier skills, produce authentic work, and demonstrate durable independent performance.

This is an evidence-informed engineering standard, not a claim of accreditation. Research findings are translated into explicit product policies and measured after release. Where evidence does not prescribe one universal number, the platform uses a documented starting policy and gathers outcome data rather than presenting the number as scientifically optimal.

## Evidence base

The standard uses an evidence hierarchy: consensus reports and government practice guides; meta-analyses and systematic reviews; relevant controlled studies; discipline-specific computing education research; then official technical and accessibility standards.

### Learning and memory

- The US Institute of Education Sciences recommends spacing learning over time, interleaving worked examples with problem solving, active retrieval through quizzing, and deep explanatory questions. [IES practice guide](https://ies.ed.gov/ncee/wwc/PracticeGuide/1)
- The National Academies concludes that prior knowledge changes what instruction is effective; retrieval, explanation, spacing, structured presentation, agency, purpose, and belonging support learning. [How People Learn II](https://www.nationalacademies.org/read/24783/chapter/2)
- Retrieval practice can improve delayed retention more than repeated study even when repeated study produces greater confidence. [Roediger and Karpicke, 2006](https://www.psychologicalscience.org/journals/psychological-science/j.1467-9280.2006.01693.x/)
- A quantitative review covering 317 experiments found robust benefits from distributed rather than massed practice, while the useful spacing depends on the intended retention interval. [Cepeda et al., 2006](https://digitalcommons.usf.edu/psy_facpub/1771/)
- A meta-analysis of 225 undergraduate STEM studies found better exam performance and lower failure under active learning than traditional lecture. [Freeman et al., 2014](https://pmc.ncbi.nlm.nih.gov/articles/PMC4060654/)

### Novice-to-independent skill development

- Worked examples can reduce unnecessary novice problem-solving load; a smooth transition uses increasingly incomplete examples before independent problems. [Renkl et al. fading research](https://escholarship.org/uc/item/81b9j9hs)
- Learners who explain why example steps follow from principles form more transferable, example-independent knowledge. [Chi et al., 1989](https://onlinelibrary.wiley.com/doi/10.1207/s15516709cog1302_1)
- Programming-specific research reports that novices benefit from worked examples and that self-explanation should accompany them. [Vieira, Yan, and Magana, 2015](https://jocse.org/articles/6/1/1/)
- A recent programming study found faded worked examples combined with metacognitive scaffolding most effective among the tested conditions for problem-solving and self-regulation. [Shin et al., 2023](https://journals.sagepub.com/doi/10.1177/07356331231174454)
- PRIMM structures programming learning as Predict, Run, Investigate, Modify, and Make so learners understand and adapt code before creating independently. Its school evaluation involved 13 schools and 493 learners. [Sentance, Waite, and Kallia, 2019](https://eric.ed.gov/?id=EJ1217966)

### Alignment, mastery, access, and motivation

- Learning objectives, instruction, and assessment must ask for the same cognitive performance; a course that teaches recall but assesses design is misaligned. [Carnegie Mellon Eberly Center](https://www.cmu.edu/teaching/assessment/basics/alignment.html)
- Mastery learning uses initial instruction, formative evidence, targeted correction, reassessment, and enrichment rather than moving on with uncorrected gaps. [Mastery learning review](https://pmc.ncbi.nlm.nih.gov/articles/PMC10159400/)
- CAST UDL 3.0 calls for multiple means of engagement, representation, and action/expression, including prior-knowledge connections, graduated support, authentic relevance, learner choice, and action-oriented feedback. [CAST UDL Guidelines 3.0](https://udlguidelines.cast.org/)
- WCAG 2.2 is the platform accessibility baseline; W3C advises using 2.2 for future applicability. [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- Gamification has varied effects and depends on design elements and learning context. It is treated as motivational support, never proof of learning. [Sailer and Homner meta-analysis](https://link.springer.com/article/10.1007/s10648-019-09498-w)
- Motivation design supports autonomy, competence, and relatedness instead of controlling rewards. [Niemiec and Ryan, 2009](https://journals.sagepub.com/doi/10.1177/1477878509104318)

### Computing and web scope authorities

- Course scope uses the current ACM/IEEE-CS/AAAI CS2023 knowledge areas and curricular practices where applicable. [CS2023](https://csed.acm.org/)
- Front-end scope is cross-checked against the current MDN Curriculum, which identifies essential beginner front-end skills and practices. [MDN Curriculum](https://developer.mozilla.org/en-US/curriculum/)
- Responsive Web Design depth is mapped to the current freeCodeCamp v9 course structure, while all LEARN-IT-ALL explanations, examples, builds, and assessments remain original. [freeCodeCamp curriculum model](https://contribute.freecodecamp.org/how-to-work-on-coding-challenges/)
- Technical claims must ultimately match primary specifications and official vendor documentation for the exact version taught.

## Course design process

No course authoring begins from a list of lesson titles. Each course passes these gates in order.

### 1. Define learner and destination

Document:

- intended learner, prior experience, age assumptions, language level, device constraints, and accessibility needs;
- explicit entry competencies and a diagnostic for each;
- authentic roles and tasks the learner should perform after the course;
- observable terminal competencies using verbs such as explain, implement, debug, compare, design, verify, and defend;
- boundaries: included depth, intentionally excluded depth, and the next course.

### 2. Research the domain

Build a source register with versions and retrieval dates. Prefer:

1. primary technical standards and specifications;
2. official vendor or project documentation;
3. current professional certification objectives when relevant;
4. ACM/IEEE or other recognized curriculum frameworks;
5. high-quality textbooks and peer-reviewed computing education research;
6. multiple job-realistic task examples to verify transfer value.

Every technical topic in the scope matrix must cite at least one authority. Fast-changing claims have a review date and owner.

### 3. Build the competency graph

Each competency has:

- stable ID and observable statement;
- knowledge type: conceptual, procedural, strategic, metacognitive, or professional disposition;
- target performance level: recognize, explain, apply, analyze/debug, evaluate, or create;
- prerequisite competency IDs;
- common misconceptions and likely failure signatures;
- acceptable evidence of mastery;
- the activities that introduce, reinforce, retrieve, assess, and transfer it.

The graph must be acyclic. A topological order constrains course sequence. Convenience or source-document order cannot override prerequisites.

### 4. Create the scope and alignment matrix

Rows are competencies. Columns are activities. Every cell is one of:

- **I** — introduce and model;
- **G** — guided practice;
- **F** — faded practice;
- **R** — retrieve after delay;
- **A** — assess under familiar conditions;
- **T** — transfer to a new context.

A competency cannot be summatively assessed before I, G, and F evidence exists. Every terminal competency requires at least one T event in a lab or project. Every assessment item maps to a competency and target cognitive level.

### 5. Sequence cumulative modules

Every instructional lesson must:

1. activate one or more named prerequisite competencies;
2. reuse earlier skills correctly in its starter, example, or build;
3. introduce a bounded amount of new complexity;
4. include checks for both the new skill and retained earlier skills;
5. explain how the new skill changes or extends the learner's mental model;
6. end with evidence that informs correction, enrichment, or progression.

The content audit rejects orphan lessons, prerequisite inversions, unreinforced skills, and long gaps without retrieval.

New lessons do not reset the learner. HTML semantics remain required in later CSS work. Accessibility remains required in every later interface. Earlier Python data, control flow, testing, and decomposition remain required in later functions and object-oriented projects. Networking models remain active during later configuration and troubleshooting.

### 6. Plan the practice progression

Each skill sequence moves through:

1. **Predict** — anticipate output or behavior before execution.
2. **Run and inspect** — compare evidence with prediction.
3. **Explain** — connect observed behavior to a principle.
4. **Modify** — change a worked example with focused guidance.
5. **Complete** — fill increasingly larger missing portions.
6. **Debug** — diagnose realistic errors from evidence.
7. **Make** — solve a new problem without the recipe.
8. **Transfer** — combine the skill with earlier skills in a different domain.

Guidance fades only after success. Learners who struggle receive a smaller worked example, targeted explanation, and parallel retry—not the final answer followed by automatic progression.

### 7. Spiral and space practice

Each introduced competency receives, at minimum:

- immediate guided use;
- a same-module faded use;
- use in the next relevant lesson;
- independent module lab evidence;
- delayed retrieval in a later module;
- cumulative project evidence when the competency is terminal.

The initial review queue uses expanding intervals as a product policy and adjusts them using correctness, attempts, hints, response latency, and confidence. It does not claim one fixed schedule is optimal for every learner or skill.

Interleaving starts after learners can distinguish the individual skills. Early practice blocks one new mechanism long enough to form a usable model; later practice mixes similar mechanisms and asks the learner to select the right one.

### 8. Design authentic builds

Workshops model professional reasoning in a real-world scenario. Labs use a different scenario and do not repeat workshop wording, starter code, requirement order, or visual design. Projects include:

- a stakeholder and user need;
- realistic content and constraints;
- accessibility, security, performance, maintainability, and testing criteria appropriate to the domain;
- ambiguous decisions the learner must justify;
- rubric dimensions linked to competencies;
- automated checks for observable requirements plus human-readable criteria for judgment and design quality;
- a reflection on tradeoffs, evidence, and future improvement.

Each course has several cumulative builds. The final project cannot be completed by copying one workshop and renaming variables or colors.

### 9. Assess and correct

Formative checks are low stakes and frequent. Feedback states:

- what evidence the grader observed;
- which competency is not yet demonstrated;
- why the mismatch matters;
- the smallest useful next action;
- when a worked example or prerequisite review is recommended.

Quizzes include retrieval, prediction, explanation, code reading, debugging, and selection of an appropriate method. Projects measure implementation, analysis, evaluation, and creation. Exams sample the published assessment blueprint rather than surprising the learner with untaught tasks.

Mastery requires demonstrated performance, not accumulated XP. A failed check creates corrective practice and a parallel reassessment. A first-pass learner receives enrichment or an optional harder transfer task.

### 10. Review and release

Every course receives:

- subject-matter review;
- instructional-design review;
- assessment and rubric review;
- accessibility review with keyboard and assistive-technology testing;
- content duplication and similarity audit;
- learner pilot with error, hint, abandonment, and time-on-task analysis;
- technical freshness review;
- signed release checklist and planned re-review date.

## Lesson contract

Every lesson file must include:

- prerequisite competency IDs;
- introduced and reinforced competency IDs;
- measurable objectives aligned to activities and checks;
- prior-knowledge retrieval opener;
- concise explanation with a concrete model;
- worked example with expert reasoning made visible;
- prediction or inspection interaction;
- guided code/design activity;
- faded task;
- independent or debugging task;
- cumulative retained-skill checks;
- three progressive hints per guided step;
- misconception-specific feedback;
- exit check and corrective branch;
- delayed-review registration;
- accessibility and responsive expectations for all UI output.

## Gamification policy

Game mechanics serve learning:

- XP reflects completed effort but never unlocks a credential without mastery.
- Levels visualize increasing independence: observe, modify, debug, build, and mentor.
- Achievements recognize strategies such as testing, accessibility, revision, explanation, and successful delayed retrieval.
- Learners can choose project themes and optional challenge paths where outcomes remain equivalent.
- Streaks are forgiving, rest-aware, and never shame or erase earned progress.
- Celebrations are brief, dismissible, screen-reader coherent, and reduced or removed under reduced-motion preferences.
- No random rewards, manipulative scarcity, pay-to-progress, public humiliation, or leaderboards that discourage novices.

The primary reward is visible competence: working software, explainable decisions, a project portfolio, and an accurate mastery map.

## Required metrics

Course quality is monitored with more than completion rate:

- competency mastery and delayed retention;
- first-attempt and eventual success by step;
- misconception and failure-pattern frequency;
- hint sequence effectiveness;
- corrective-path recovery;
- lab and project transfer performance;
- assessment item difficulty and discrimination;
- time-on-task and abandonment points;
- accessibility defects and accommodation success;
- learner confidence calibration against performance;
- performance gaps between learner groups where ethically and lawfully measurable.

Metrics trigger review; they do not silently lower standards or steer learners into permanent ability tracks.
