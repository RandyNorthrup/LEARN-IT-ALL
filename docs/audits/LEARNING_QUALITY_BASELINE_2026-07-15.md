# Learning Quality Baseline

Reviewed: 2026-07-15  
State: audit evidence, not course approval

## Why this audit exists

The previous catalog gates proved inventory, schema, ordering metadata, selected runtime behavior, and text-similarity thresholds. They did not prove that learner-facing activities explicitly teach a novice, begin practice promptly, model new syntax, or grade the claimed performance. Direct inspection of the opening Responsive Web Design HTML flow exposed that gap.

`scripts/audit-v2-learning-quality.ts` now runs a conservative static defect scan across every version 2 activity. It does not award quality. It flags unambiguous patterns for human review and supplies a baseline that must fall as courses are rewritten.

## Baseline result

| Measure | Result |
| --- | ---: |
| Courses scanned | 54 |
| Activities scanned | 11,742 |
| Courses with at least one finding | 54 |
| Activities with at least one finding | 9,051 |
| Blocker finding groups | 3,599 |
| Warning finding groups | 8,764 |

Findings group related steps inside an activity; they are not learner, error, or step counts.

### Finding types

| Finding | Severity | Groups | Meaning |
| --- | --- | ---: | --- |
| Delayed artifact practice | Blocker | 3,269 | A workshop, lab, debugging task, or project delays the first real artifact interaction beyond the allowed opening. |
| Token-only grading | Blocker | 207 | A code step can pass using source-token presence alone. |
| Generic template language | Blocker | 88 | Learner instructions contain known generic checkpoint/build phrases instead of activity-specific teaching. |
| Missing code models | Blocker | 35 | Fewer than one quarter of a multi-step workshop's artifact steps show concrete code. |
| Shape-only grading | Warning | 8,764 | Artifact evidence is limited to source structure or regular-expression shape without runnable or semantic evidence. Human review decides the appropriate replacement. |

The audit also checks repeated instructions, low instruction diversity, and missing cumulative final validation. Those rules passed this baseline because earlier duplication/cumulative gates addressed their narrow detectable forms. This does not prove broader variety or assessment validity.

## Course baseline

| Course | Activities | Affected | Blockers | Warnings |
| --- | ---: | ---: | ---: | ---: |
| agent-loops-goals | 135 | 65 | 38 | 42 |
| agent-skills-mcp | 155 | 125 | 44 | 125 |
| applied-mathematics-advanced | 175 | 38 | 38 | 38 |
| applied-mathematics-beginner | 145 | 32 | 32 | 32 |
| applied-mathematics-intermediate | 155 | 34 | 34 | 34 |
| build-ai-agent-python | 306 | 246 | 91 | 246 |
| build-asteroids-python | 246 | 198 | 69 | 198 |
| build-blog-aggregator-go | 306 | 246 | 88 | 246 |
| build-blog-aggregator-typescript | 326 | 262 | 91 | 262 |
| build-bookbot-python | 186 | 150 | 57 | 150 |
| build-maze-solver-python | 246 | 198 | 70 | 198 |
| build-pokedex-go | 246 | 198 | 73 | 198 |
| build-pokedex-typescript | 256 | 206 | 76 | 206 |
| build-static-site-python | 246 | 198 | 73 | 198 |
| build-web-scraper-go | 306 | 246 | 87 | 246 |
| build-web-scraper-python | 306 | 246 | 89 | 246 |
| build-web-scraper-typescript | 326 | 262 | 90 | 262 |
| c-memory-management | 286 | 230 | 81 | 230 |
| capstone-project | 166 | 134 | 48 | 134 |
| cicd-github-actions | 206 | 166 | 59 | 166 |
| comptia-a-plus | 407 | 327 | 118 | 327 |
| comptia-network-plus | 218 | 182 | 52 | 182 |
| cryptography-go | 286 | 230 | 83 | 230 |
| docker-basics | 186 | 150 | 54 | 150 |
| file-servers-s3-go | 286 | 230 | 84 | 230 |
| file-servers-s3-typescript | 286 | 230 | 86 | 230 |
| git-advanced | 206 | 166 | 60 | 166 |
| git-basics | 145 | 117 | 41 | 117 |
| go-basics | 186 | 150 | 56 | 150 |
| http-clients-go | 186 | 150 | 54 | 150 |
| http-clients-python | 186 | 150 | 55 | 150 |
| http-clients-typescript | 186 | 150 | 56 | 150 |
| http-protocol-go | 246 | 198 | 71 | 198 |
| http-servers-go | 216 | 174 | 62 | 174 |
| http-servers-typescript | 246 | 198 | 67 | 198 |
| javascript-basics | 159 | 131 | 45 | 131 |
| job-search | 206 | 166 | 60 | 166 |
| kubernetes-basics | 216 | 174 | 62 | 174 |
| linux-basics | 145 | 117 | 43 | 117 |
| personal-project-1 | 126 | 102 | 40 | 102 |
| personal-project-2 | 146 | 118 | 44 | 118 |
| prompt-engineering-claude-codex | 145 | 44 | 44 | 0 |
| pubsub-rabbitmq-go | 276 | 222 | 77 | 222 |
| pubsub-rabbitmq-typescript | 276 | 222 | 79 | 222 |
| python-basics | 164 | 136 | 44 | 136 |
| python-dsa | 165 | 133 | 50 | 133 |
| python-dsa-2 | 165 | 133 | 48 | 133 |
| python-functional | 125 | 101 | 39 | 101 |
| python-oop | 147 | 121 | 39 | 121 |
| rag-retrieval-augmented-generation | 306 | 246 | 88 | 246 |
| repository-quality-gates | 155 | 125 | 45 | 125 |
| responsive-web-design | 303 | 220 | 330 | 0 |
| sql-basics | 165 | 133 | 47 | 133 |
| typescript-basics | 155 | 125 | 48 | 125 |

## Responsive Web Design diagnosis

Responsive Web Design has the most blocker groups: 330 across 220 of 303 activities. The groups comprise 207 token-only grading findings, 85 generic-template-language findings, 35 missing-code-model findings, and 3 delayed-artifact-practice findings. Its zero warning count is not a strength: token-only steps are classified as blockers instead of also being counted as shape-only warnings.

The first repair slice starts with actual beginner HTML: HTML purpose, elements, opening and closing tags, content, headings, paragraphs, nesting, void elements, attributes, a complete document, text structure, links, images, semantics, forms, tables, media, accessibility, validation, debugging, independent projects, and delayed assessment.

## Limits and next gates

This scanner cannot determine whether an explanation is accurate, a scenario is authentic, a project is motivating, a distractor diagnoses a misconception, a rubric is fair, or a learner can transfer the skill. Those require source review, alignment review, subject and assessment experts, real runtime evidence, accessibility inspection, and observed learner pilots.

The next automated gates add workspace declarations, runtime/semantic checks, beginner-teaching contracts, course source registers, review evidence, and honest release states. Findings are removed only by repairing learner flow—not by weakening thresholds or adding synonyms around the same template.
