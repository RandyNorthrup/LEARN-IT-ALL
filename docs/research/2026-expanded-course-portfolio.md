# 2026 Expanded Course Portfolio Research Brief

Reviewed: 2026-07-13

This brief controls seven planned course research dossiers and architectures. Course prose, examples, datasets, labs, and assessments must be original. Sources control scope and technical accuracy; they are not copied lesson material.

## Portfolio

| Course ID                          | Course                                   | Entry point                                                       | Exit evidence                                                                                                     |
| ---------------------------------- | ---------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `applied-mathematics-beginner`     | Beginner Applied Mathematics             | Whole-number arithmetic and basic computer use                    | Defensible everyday model using units, algebra, geometry, data, probability, and a spreadsheet or Python notebook |
| `applied-mathematics-intermediate` | Intermediate Applied Mathematics         | Foundations credential or placement evidence                      | Calculus, linear algebra, statistics, ODE, numerical-method, and optimization models with validation              |
| `applied-mathematics-advanced`     | Advanced Applied Mathematics             | Intermediate credential or equivalent calculus and linear algebra | Reproducible multivariable, dynamical, PDE, optimization, stochastic, inverse-problem, and uncertainty study      |
| `prompt-engineering-claude-codex`  | Prompt Engineering with Claude and Codex | Basic terminal and repository use                                 | Cross-agent prompt system with eval set, failure taxonomy, provider adaptations, and regression evidence          |
| `agent-loops-goals`                | Agent Loops and Persistent Goals         | Prompting fundamentals                                            | Bounded agent harness with explicit state, stop rules, checkpoints, steering, recovery, and evals                 |
| `agent-skills-mcp`                 | Creating Skills and MCP Servers          | Prompting plus one programming language                           | Tested portable skill and least-authority MCP server/client integration                                           |
| `repository-quality-gates`         | Production Repository Quality Gates      | Basic Git and programming                                         | Reusable repo templates with local and CI gates across TypeScript, Python, Rust, Go, and C/C++                    |

## Shared learning design

Every module uses this evidence sequence:

1. Elicit a prediction and the learner's current model.
2. Explain one bounded concept with worked and non-worked examples.
3. Model a real task while naming decisions and evidence.
4. Guide cumulative construction with immediate checks.
5. Debug a plausible misconception or tool failure.
6. Fade support in an unfamiliar transfer lab.
7. Retrieve earlier material in reviews and scenario quizzes.
8. Reuse skills in later projects and the final performance exam.

Math courses additionally use concrete-to-representational-to-symbolic-to-computational progression. Every numerical answer carries units, assumptions, bounds, and a reasonableness check. Modeling uses the cycle: define the decision, choose quantities and assumptions, formulate, compute, validate, communicate, and revise.

The 2026 agent courses separate durable ideas from product-specific commands. Durable concepts are assessed independently. Claude and Codex labs pin the documentation review date, compare surfaces explicitly, and include an update audit so changing product behavior cannot silently make a lesson false.

The quality-gates course distinguishes four layers: editor feedback, deterministic local commands, required CI checks, and release/security evidence. A gate must have a named failure, actionable output, stable exit status, documented suppression policy, and test proving it can fail.

## Applied mathematics source map

- [OpenStax mathematics catalog](https://openstax.org/subjects/math/) — reviewed scope and sequence for prealgebra, algebra, trigonometry, calculus, statistics, contemporary mathematics, and data science.
- [OpenStax Algebra 1](https://openstax.org/k12/algebra/) — coherent linear, exponential, and quadratic progression with projects and continuous assessment.
- [OpenStax Algebra and Trigonometry](https://openstax.org/books/algebra-and-trigonometry/pages/preface) — functions-first algebra, trigonometry, analytic geometry, systems, sequences, probability, and counting.
- [MIT OpenCourseWare Engineering Math](https://ocw.mit.edu/courses/2-087-engineering-math-differential-equations-and-linear-algebra-fall-2014/) — integrated linear algebra, ODE, and numerical modeling.
- [MIT OpenCourseWare Numerical Analysis](https://ocw.mit.edu/courses/18-330-introduction-to-numerical-analysis-spring-2012/) — root finding, interpolation, approximation, quadrature, differential equations, and numerical linear algebra.
- [SIAM Modeling Across the Curriculum](https://www.siam.org/publications/reports/modeling-across-the-curriculum/) — mathematical modeling as a continuous K-12 through undergraduate thread.
- [SIAM Applied Mathematics Education 2026](https://www.siam.org/conferences-events/siam-conferences/ed26/) — current emphasis on modeling, data ethics, AI, inclusion, and instructional technology.
- [MAA CUPM Curriculum Guide](https://maa.org/wp-content/uploads/2024/06/2015-CUPM-Curriculum-Guide.pdf) — reasoning, assumptions, estimation, modeling, communication, and undergraduate mathematical-sciences expectations.

## Prompt engineering, loops, and goals source map

- [OpenAI Codex manual: Prompting](https://learn.chatgpt.com/docs/prompting) — goal, context, output, boundaries, final checks, steering, and queueing.
- [OpenAI Codex manual: Long-running work](https://learn.chatgpt.com/docs/long-running-work) — persistent goals, measurable completion, steering, sandbox continuity, worktrees, and parallel-write boundaries.
- [OpenAI Codex manual: AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md) — durable repository instruction discovery and precedence.
- [Anthropic prompt engineering overview](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview) — success criteria and empirical evaluation before prompt optimization.
- [Anthropic Console prompting tools](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-tools) — templates, variables, examples, structured sections, and iterative improvement.
- [Anthropic: Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) — workflows versus agents and simple composable routing, parallelization, orchestration, and evaluator-optimizer patterns.
- [Anthropic: Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) — outcome, transcript, tool, and multi-turn agent-loop evaluation.
- [Anthropic: Harness design for long-running application development](https://www.anthropic.com/engineering/harness-design-long-running-apps) — 2026 long-running coding harness and verification design.

## Skills and MCP source map

- [OpenAI Codex manual: Build skills](https://learn.chatgpt.com/docs/build-skills) — skill anatomy, progressive disclosure, explicit and implicit invocation, locations, metadata, testing, and distribution.
- [OpenAI Codex manual: Model Context Protocol](https://learn.chatgpt.com/docs/extend/mcp) — STDIO and Streamable HTTP configuration, OAuth, tool policy, timeouts, and integrations.
- [Claude Code extension overview](https://code.claude.com/docs/en/features-overview) — boundaries among CLAUDE.md, skills, subagents, hooks, MCP, and plugins.
- [Claude Code hooks reference](https://code.claude.com/docs/en/hooks) — lifecycle enforcement and deterministic hook behavior.
- [MCP specification overview, revision 2025-06-18](https://modelcontextprotocol.io/specification/2025-06-18/basic/index) — JSON-RPC base protocol, lifecycle, capability negotiation, authorization, server and client features.
- [MCP server primitives](https://modelcontextprotocol.io/specification/2025-06-18/server/index) — user-controlled prompts, application-controlled resources, and model-controlled tools.
- [MCP authorization](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization) — OAuth 2.1 flow, PKCE, resource indicators, token audience validation, secure storage, and HTTPS.
- [MCP tools](https://modelcontextprotocol.io/specification/draft/server/tools) — input validation, access control, rate limits, output sanitization, confirmations, timeouts, and audit logs. Draft material must be rechecked before publication.
- [Agent Skills open specification](https://agentskills.io/specification) — portable skill format and metadata.

## Repository quality-gates source map

- [Biome getting started](https://biomejs.dev/guides/getting-started/) — pinned formatter/linter installation, local checks, safe fixes, and CI mode.
- [TypeScript TSConfig reference](https://www.typescriptlang.org/tsconfig/) — strict typing, unused code, unchecked indexing, exact optional properties, and build boundaries.
- [Ruff configuration](https://docs.astral.sh/ruff/configuration/) and [Ruff linter](https://docs.astral.sh/ruff/linter/) — explicit Python formatter/linter policy, rule selection, unused/dead-code findings, and CI behavior.
- [pre-commit](https://pre-commit.com/) — reproducible multi-language hooks and isolated tool environments.
- [Clang AddressSanitizer](https://clang.llvm.org/docs/AddressSanitizer.html), [UndefinedBehaviorSanitizer](https://clang.llvm.org/docs/UndefinedBehaviorSanitizer.html), and [ThreadSanitizer](https://clang.llvm.org/docs/ThreadSanitizer.html) — memory, undefined-behavior, and race detection with documented limitations.
- [GitHub Actions secure use](https://docs.github.com/en/actions/reference/security/secure-use) — least privilege, untrusted input, pinning, credentials, and workflow review.
- [GitHub dependency review](https://docs.github.com/en/code-security/concepts/supply-chain-security/dependency-review) — pull-request dependency policy enforcement.
- [OWASP Input Validation](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html) and [Secrets Management](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html) — boundary validation and secret lifecycle.

## Required architecture reviews

- No competency is used before introduction.
- Every competency has introduction, guided, faded, retrieval, assessment, and transfer evidence.
- Every module has theory, workshop, debug clinic, independent lab, review, and quiz.
- Each course has at least three original stakeholder projects and a cumulative performance exam.
- Course-to-course prerequisites are explicit and placement alternatives are documented.
- Fast-changing product claims include source, reviewed date, and an update/revalidation task.
- No assessment accepts answer length, source substring, or happy-path output as sole mastery evidence where execution or judgment can be observed.
