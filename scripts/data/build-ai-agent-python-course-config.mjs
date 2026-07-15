import { finalizeCourse, project, skill } from './course-config-helpers.mjs';

const REVIEWED_AT = '2026-07-14';
const RESEARCHED_AT = '2026-07-15T01:30:00.000Z';

function outcome(id, statement, misconception, knowledgeType = 'procedural', level = 'apply') {
  if (!misconception) throw new Error(`Missing misconception for AI agent competency ${id}`);
  return skill(id, statement, misconception, knowledgeType, level);
}

function agentModule(id, title, context, artifact, skillSpecs) {
  const skills = skillSpecs.map((entry) => outcome(...entry));
  return {
    id,
    title,
    context,
    artifact,
    objectives: skills.slice(0, 3).map((entry) => entry[1]),
    skills,
    contexts: {
      theory: `${context} Predict authority, model and API behavior, state, tool effects, budgets, privacy, safety, accessibility, failure, and evidence before reading the governing source.`,
      workshop: `A public-interest product team incrementally builds ${artifact} from original fixed provider, interaction, tool, approval, evaluation, and failure fixtures while retaining prior Python, HTTP, prompt, loop, security, accessibility, testing, and recovery requirements.`,
      debug: `A preserved agent trajectory contains one plausible model, schema, tool, authority, state, loop, memory, concurrency, injection, evaluation, telemetry, deployment, or recovery defect; locate the first failed invariant before editing.`,
      lab: `An independent organization supplies a different user population, task distribution, tool set, risk tier, model response, resource budget, accessibility need, and failure condition and transfers ${title.toLowerCase()} into a changed ${artifact}.`,
      review: `A delayed engineering review reconstructs ${title.toLowerCase()} from stakeholder, revision, runtime, model, interaction, call, result, state, approval, evaluation, trace, failure, and recovery evidence.`,
      quiz: `A release reviewer compares near-miss decisions for ${title.toLowerCase()} and accepts only runnable changed-case evidence, explicit non-claims, and named provider, network, identity, storage, sandbox, privacy, accessibility, load, cost, and production transfer gates.`,
    },
  };
}

const modules = [
  agentModule(
    'agentpy-product-risk-contract',
    'Stakeholder Task, Workflow Fit, Authority, Risk, and Evidence',
    'A sponsor asks for an autonomous assistant but has not defined the user decision, accepted failure, permitted actions, affected people, oversight, or why a deterministic workflow is insufficient.',
    'bounded agent product and risk charter',
    [
      [
        'agentpy-stakeholder-task',
        'Define stakeholder, user population, decision, task distribution, observable value, failure, review cadence, and non-goals before choosing a model.',
        'A fluent demo is sufficient evidence of stakeholder value.',
        'strategic',
        'create',
      ],
      [
        'agentpy-workflow-agent-fit',
        'Compare deterministic code, workflow, model-assisted step, and agent loop and choose the least variable architecture that satisfies the task.',
        'Every multi-step language task benefits from an autonomous loop.',
        'strategic',
        'evaluate',
      ],
      [
        'agentpy-harm-risk-tier',
        'Classify impact, reversibility, affected groups, uncertainty, data sensitivity, action authority, and required human oversight.',
        'Risk depends only on whether the model can generate harmful words.',
        'professional',
        'evaluate',
      ],
      [
        'agentpy-success-failure-evidence',
        'Specify task, safety, tool, accessibility, latency, cost, refusal, recovery, and user-outcome evidence with acceptance thresholds.',
        'One average response-quality score captures agent success.',
        'metacognitive',
        'create',
      ],
      [
        'agentpy-nongoals-escalation',
        'Define prohibited tasks, uncertainty disclosures, stop conditions, escalation owners, support paths, and authority revocation.',
        'The agent should always attempt the task rather than refuse or escalate.',
        'professional',
        'create',
      ],
    ]
  ),
  agentModule(
    'agentpy-repo-runtime-dependencies',
    'Repository, Python Runtime, SDKs, Dependencies, and Reproduction',
    'The prototype runs from an unknown revision with a floating Gemini SDK, a copied deprecated import, hidden environment state, no license inventory, and no clean-install proof.',
    'reproducible Python agent repository baseline',
    [
      [
        'agentpy-repository-baseline',
        'Inspect revision, status, existing behavior, tests, configuration, fixtures, secrets, licenses, threat model, and recovery anchor before editing.',
        'A prototype agent is too small to need repository and rollback evidence.',
      ],
      [
        'agentpy-python-runtime-contract',
        'Record Python implementation and version, platform, event-loop behavior, SSL backend, free-threaded status, encoding environment, and supported matrix.',
        'Any Python 3 runtime gives identical async, SDK, validation, and packaging behavior.',
      ],
      [
        'agentpy-dependency-lock',
        'Pin direct and resolved dependencies, verify package sources and hashes, review licenses and advisories, and prove isolated installation.',
        'Broad minimum versions make an agent installation reproducible.',
      ],
      [
        'agentpy-sdk-version-surface',
        'Distinguish google-genai, deprecated predecessor SDKs, google-adk, API versions, model versions, stable features, previews, and migrations.',
        'All Google generative AI Python packages expose the same current API surface.',
        'conceptual',
        'analyze',
      ],
      [
        'agentpy-clean-reproduction',
        'Rebuild the repository from a clean environment and reconcile versions, import behavior, fixed fixtures, tests, artifacts, and shutdown state.',
        'A working developer virtual environment proves the declared dependency set.',
      ],
    ]
  ),
  agentModule(
    'agentpy-model-api-capabilities',
    'Models, Interactions API, Capabilities, Stability, and Provider Ports',
    'The code hard-codes a preview model, assumes every endpoint supports tools and schemas, mixes legacy generateContent examples with Interactions state, and has no migration seam.',
    'verified model capability and provider-adapter record',
    [
      [
        'agentpy-interactions-api-choice',
        'Use the Gemini Interactions API for new agent work and document when a legacy generateContent integration must remain during migration.',
        'Every Gemini endpoint and SDK example represents the same recommended state model.',
        'strategic',
        'evaluate',
      ],
      [
        'agentpy-model-capability-discovery',
        'Discover and record model support for interactions, function calls, structured output, multimodal parts, thinking, streaming, context, and limits.',
        'A model family name guarantees every capability and limit across versions.',
      ],
      [
        'agentpy-stable-preview-boundary',
        'Separate stable, preview, experimental, deprecated, and retired features and assign migration, fallback, and re-review owners.',
        'A documented preview feature is production-stable by definition.',
        'professional',
        'evaluate',
      ],
      [
        'agentpy-generation-config',
        'Choose system instruction, temperature, thinking level, output limits, safety configuration, and tools from task evidence and re-declare per interaction.',
        'One creative generation configuration is appropriate for every agent step.',
      ],
      [
        'agentpy-provider-adapter',
        'Define a narrow typed provider interface that preserves provider-specific steps and usage while keeping orchestration testable and replaceable.',
        'Provider portability means discarding provider-specific state and metadata.',
        'strategic',
        'create',
      ],
    ]
  ),
  agentModule(
    'agentpy-deterministic-model-port',
    'Deterministic Model Port, Scripted Fake, Recordings, and Test Identity',
    'Routine tests call a live model, accept semantic drift as flakiness, overwrite golden responses, and cannot prove which request produced a failure.',
    'scripted provider fake and versioned interaction fixture set',
    [
      [
        'agentpy-model-protocol',
        'Express model requests, typed steps, usage, errors, cancellation, and async lifecycle through a minimal Python protocol.',
        'Mocking the entire SDK object graph is a stable provider abstraction.',
      ],
      [
        'agentpy-scripted-model',
        'Build a scripted fake that consumes expected requests and emits deterministic model output, tool calls, safety blocks, usage, and faults.',
        'Returning one canned string tests an agent loop adequately.',
        'procedural',
        'create',
      ],
      [
        'agentpy-recorded-fixtures',
        'Store sanitized versioned provider fixtures with schema, model, API, SDK, timestamp, purpose, and explicit replay limits.',
        'A captured response remains valid forever without its request or version identity.',
      ],
      [
        'agentpy-request-response-identity',
        'Hash canonical request inputs and correlate every response, step, call, result, error, and usage record to one test case.',
        'Test names alone provide sufficient trajectory identity.',
      ],
      [
        'agentpy-no-live-default',
        'Keep unit and routine integration tests offline and reserve authorized live-provider smoke, compatibility, and quality runs for controlled gates.',
        'Live model calls make a test suite more realistic and therefore more reliable.',
        'professional',
        'evaluate',
      ],
    ]
  ),
  agentModule(
    'agentpy-interaction-state-parts',
    'Interaction Resources, Typed Parts, Conversation State, and Retention',
    'The agent concatenates messages into text, loses function-call identity, assumes previous_interaction_id preserves tools and system instruction, and cannot explain provider retention.',
    'typed Gemini interaction and state ledger',
    [
      [
        'agentpy-interaction-resource',
        'Model each interaction with stable local identity, provider interaction ID, parent, state mode, timestamps, model, configuration, and outcome.',
        'A conversation is only an ordered list of plain role and text pairs.',
      ],
      [
        'agentpy-input-part-types',
        'Preserve text, function call, function result, image, file, refusal, safety, and model-output parts without lossy string flattening.',
        'All multimodal and tool content can be safely converted to one text field.',
        'conceptual',
        'analyze',
      ],
      [
        'agentpy-previous-interaction-state',
        'Use previous_interaction_id deliberately, distinguish server-side history from stateless replay, and preserve local audit evidence.',
        'Passing a prior interaction ID preserves every parameter and tool automatically.',
      ],
      [
        'agentpy-per-turn-configuration',
        'Re-declare interaction-scoped tools, system instruction, and generation configuration on every turn that needs them.',
        'Provider-side conversation state implicitly carries all prior request configuration.',
      ],
      [
        'agentpy-state-retention-choice',
        'Choose stateless, provider-stateful, or application-stateful operation from privacy, deletion, audit, latency, cost, and recovery requirements.',
        'Server-side state is always cheaper and safer than application-managed state.',
        'strategic',
        'evaluate',
      ],
    ]
  ),
  agentModule(
    'agentpy-structured-output-validation',
    'Structured Output, Pydantic, JSON Schema, Validation, and Repair',
    'The model returns JSON-looking text that is coerced into domain objects, blocked outputs are parsed as success, schema drift is hidden, and invalid values are silently repaired.',
    'strict versioned agent output boundary',
    [
      [
        'agentpy-structured-output-fit',
        'Use structured output for final typed data and function calling for intermediate actions rather than confusing the two contracts.',
        'Structured output and function calling are interchangeable ways to invoke application effects.',
        'conceptual',
        'analyze',
      ],
      [
        'agentpy-pydantic-strict-validation',
        'Validate provider output with strict Pydantic models, explicit bounds, discriminated variants, forbidden extras, and actionable errors.',
        'Pydantic coercion makes any model-produced value safe for downstream use.',
      ],
      [
        'agentpy-json-schema-boundary',
        'Generate, inspect, version, and test the supported JSON Schema subset instead of assuming provider and local validators implement every keyword.',
        'A valid Draft 2020-12 schema is necessarily supported by every model endpoint.',
      ],
      [
        'agentpy-blocked-refusal-output',
        'Represent safety blocks, refusals, truncation, missing output, invalid schema, and transport errors as distinct non-success outcomes.',
        'No parseable object means the same failure regardless of provider finish state.',
      ],
      [
        'agentpy-output-repair-policy',
        'Bound repair attempts, preserve original invalid evidence, avoid semantic invention, and reject or escalate when validity cannot be proven.',
        'Repeatedly asking the model to fix JSON guarantees the intended meaning.',
        'strategic',
        'evaluate',
      ],
    ]
  ),
  agentModule(
    'agentpy-tool-schema-design',
    'Typed Tool Contracts, JSON Schema, Descriptions, Domains, and Versions',
    'A broad execute tool accepts free-form strings, hides side effects, uses ambiguous parameter names, has no bounds or schema version, and exposes more authority than the task needs.',
    'least-capability typed tool catalog',
    [
      [
        'agentpy-tool-purpose-boundary',
        'Define one narrow tool purpose, effect class, caller, user benefit, authority, timeout, idempotency, and prohibited use.',
        'A generic execute command tool is more flexible and therefore better designed.',
        'strategic',
        'create',
      ],
      [
        'agentpy-tool-parameter-schema',
        'Specify required properties, types, bounds, patterns, enums, nested limits, and additional-property policy with a supported schema subset.',
        'Parameter names and Python annotations eliminate the need for explicit constraints.',
      ],
      [
        'agentpy-tool-descriptions',
        'Write tool and parameter descriptions that distinguish when to call, when not to call, required evidence, effects, and failure semantics.',
        'Long marketing prose helps the model choose tools accurately.',
      ],
      [
        'agentpy-tool-domain-types',
        'Replace ambiguous strings with domain types, enums, identifiers, units, timestamps, and validated references without leaking secrets.',
        'Every identifier, amount, and timestamp is safely represented as an unconstrained string.',
      ],
      [
        'agentpy-tool-schema-version',
        'Version tool contracts and provide compatibility, migration, deprecation, and replay tests for changed parameters and results.',
        'Tool schemas can change in place because the model sees only the latest definition.',
        'professional',
        'create',
      ],
    ]
  ),
  agentModule(
    'agentpy-tool-registry-dispatch',
    'Tool Registry, Allowlist, Validation, Dispatch, Results, and Unknown Calls',
    'The dispatcher uses globals by name, trusts model arguments, drops call IDs, returns raw exceptions, retries effects, and invokes unknown tools through dynamic import.',
    'allowlisted tool registry and result envelope',
    [
      [
        'agentpy-tool-registry',
        'Register immutable tool name, schema version, handler, effect class, policy, timeout, owner, and result contract in one auditable catalog.',
        'Looking up any callable by model-provided name is a valid registry.',
      ],
      [
        'agentpy-call-id-correlation',
        'Preserve provider call ID, local attempt ID, interaction ID, tool version, arguments digest, result digest, and timestamps.',
        'Tool name alone correlates a result when calls are parallel or repeated.',
      ],
      [
        'agentpy-argument-validation',
        'Validate and normalize model arguments before policy and execution while retaining rejected input evidence safely.',
        'Provider schema adherence removes the need for application validation.',
      ],
      [
        'agentpy-result-envelope',
        'Return a bounded typed success or failure envelope with safe user detail, retryability, effect identity, redaction, and provenance.',
        'Returning exception text directly gives the model the best recovery context.',
      ],
      [
        'agentpy-unknown-tool-rejection',
        'Reject unknown, disabled, stale, unauthorized, and version-mismatched tools without dynamic resolution or side effects.',
        'A model-selected tool should be invoked if any similarly named function exists.',
        'professional',
        'evaluate',
      ],
    ]
  ),
  agentModule(
    'agentpy-tool-authorization-policy',
    'User, Agent, and Tool Authority, Least Agency, Dry Runs, and Revocation',
    'The model inherits a service account, treats user intent as permission, uses write tools for read tasks, and cannot distinguish allowed, approval-required, or denied actions.',
    'least-agency authorization decision engine',
    [
      [
        'agentpy-authority-principals',
        'Distinguish authenticated user, affected subject, agent, application, tool, service identity, resource owner, and approver.',
        'The agent may act with every permission held by the application service account.',
        'conceptual',
        'analyze',
      ],
      [
        'agentpy-least-privilege-tools',
        'Issue task-scoped, resource-scoped, time-bounded capabilities and expose only tools permitted for the current state.',
        'Tool descriptions are an adequate security boundary for excessive agency.',
      ],
      [
        'agentpy-effect-classification',
        'Classify pure reads, sensitive reads, reversible writes, irreversible writes, external communication, financial, identity, and security effects.',
        'All function calls have equivalent risk if their schemas validate.',
      ],
      [
        'agentpy-dry-run-preview',
        'Generate deterministic application-owned previews and diffs before effects without trusting model-written summaries of the action.',
        'A natural-language confirmation generated by the model is a trustworthy action preview.',
      ],
      [
        'agentpy-deny-escalate-revoke',
        'Deny by default, escalate ambiguous authority, revoke capabilities, stop in-flight work, rotate exposure, and audit policy changes.',
        'Once an agent session starts, its tool authority must remain fixed until completion.',
        'professional',
        'create',
      ],
    ]
  ),
  agentModule(
    'agentpy-single-tool-turn',
    'Complete Interactions API Tool Turn and Provider Context Circulation',
    'The application reads only output text, misses function-call steps, executes twice, sends a result without call identity, drops provider context, and reports success before final model output.',
    'one complete correlated Gemini tool turn',
    [
      [
        'agentpy-step-classification',
        'Classify model output, function call, function result, built-in tool, retrieval, safety, error, and terminal interaction steps exhaustively.',
        'Every successful interaction contains only one output_text value.',
      ],
      [
        'agentpy-exactly-once-dispatch',
        'Reserve call identity before execution and reconcile retries so one logical function call cannot create duplicate effects.',
        'A provider will never repeat a function call after a timeout.',
      ],
      [
        'agentpy-function-result-circulation',
        'Return the exact function name, call ID, bounded typed result parts, and required tools and configuration in the follow-up interaction.',
        'Sending raw result text in a new chat is equivalent to a correlated function result.',
      ],
      [
        'agentpy-provider-context-preservation',
        'Preserve opaque provider state and required interaction history without interpreting hidden reasoning or dropping tool context.',
        'Provider metadata can be reconstructed safely from visible text.',
      ],
      [
        'agentpy-final-output-provenance',
        'Link final output claims to interaction, call, arguments, result, model, schema, policy, and validation evidence.',
        'A final answer is grounded whenever a tool was called somewhere in the conversation.',
        'metacognitive',
        'evaluate',
      ],
    ]
  ),
  agentModule(
    'agentpy-bounded-control-loop',
    'Explicit Agent State Machine, Progress, Budgets, Termination, and Cancellation',
    'A while-true loop stops only when the model chooses text, repeats the same call after unchanged failures, ignores cancellation, and has no terminal reason or partial-result policy.',
    'bounded observable Python agent loop',
    [
      [
        'agentpy-loop-state-machine',
        'Represent observe, request, classify, authorize, approve, execute, record, continue, complete, refuse, fail, cancel, and escalate transitions explicitly.',
        'An agent loop needs only call model, call tool, and repeat.',
        'conceptual',
        'create',
      ],
      [
        'agentpy-step-resource-budgets',
        'Enforce steps, wall time, tokens, model calls, tool calls, retries, bytes, concurrency, and spend before each transition.',
        'A maximum iteration count alone bounds every agent resource.',
      ],
      [
        'agentpy-progress-invariant',
        'Define observable state change and detect repeated calls, unchanged errors, oscillation, cyclic plans, and declining evidence quality.',
        'Any new model message proves progress.',
        'strategic',
        'analyze',
      ],
      [
        'agentpy-terminal-reasons',
        'Emit exactly one typed complete, refused, exhausted, failed, cancelled, expired, or escalated terminal reason with partial evidence.',
        'Stopping the Python function implies the agent completed successfully.',
      ],
      [
        'agentpy-cooperative-cancellation',
        'Propagate cancellation through provider, tool, approval, task, stream, and checkpoint boundaries and reconcile uncertain effects.',
        'Cancelling an asyncio task guarantees external work did not happen.',
        'professional',
        'evaluate',
      ],
    ]
  ),
  agentModule(
    'agentpy-parallel-tool-calls',
    'Parallel Tool Calls, TaskGroup Ownership, Ordering, and Shared Effects',
    'The agent launches every call concurrently, loses call-result order, mutates shared session state, swallows ExceptionGroup failures, and leaks tasks after cancellation.',
    'structured bounded parallel tool executor',
    [
      [
        'agentpy-call-independence',
        'Prove tool-call independence from inputs, effects, authority, ordering, rate limits, shared resources, and compensating behavior before parallel execution.',
        'Multiple calls returned together by a model are necessarily independent.',
        'strategic',
        'analyze',
      ],
      [
        'agentpy-taskgroup-ownership',
        'Own concurrent calls with asyncio TaskGroup, explicit timeout and semaphore budgets, and structured error and cancellation propagation.',
        'Creating background tasks and retaining their references is equivalent to structured concurrency.',
      ],
      [
        'agentpy-parallel-result-correlation',
        'Correlate each result by call ID and return required result parts in provider-valid order independent of completion order.',
        'Appending results as tasks finish always preserves model call identity.',
      ],
      [
        'agentpy-shared-effect-serialization',
        'Serialize or transactionally coordinate calls that touch shared resources, quotas, sessions, files, records, or external effects.',
        'asyncio single-threaded execution prevents every shared-state race.',
      ],
      [
        'agentpy-parallel-cleanup',
        'Cancel siblings when policy requires, collect partial outcomes, close handlers, reconcile uncertain effects, and prove no task survives the turn.',
        'TaskGroup exit makes cleanup and external-effect reconciliation automatic.',
        'professional',
        'evaluate',
      ],
    ]
  ),
  agentModule(
    'agentpy-human-approval-resume',
    'Human Approval, Trustworthy Preview, Pause, Expiry, and Resume',
    'The model asks “Are you sure?”, hides exact recipients and amount, edits arguments after approval, treats silence as consent, and cannot safely resume after process restart.',
    'cryptographically bound approval checkpoint',
    [
      [
        'agentpy-approval-trigger-policy',
        'Trigger approval from effect class, value, uncertainty, novelty, policy, affected party, data sensitivity, and user settings before execution.',
        'Approval is needed only when the model expresses uncertainty.',
      ],
      [
        'agentpy-trustworthy-action-preview',
        'Render application-owned exact tool, arguments, target, before and after state, consequences, reversibility, cost, and alternatives accessibly.',
        'A model-generated natural-language summary is sufficient for informed consent.',
      ],
      [
        'agentpy-approval-request-binding',
        'Bind approval to user, session, policy, tool version, normalized arguments digest, preview digest, expiry, and one execution nonce.',
        'Approval for a tool name authorizes any later arguments to that tool.',
      ],
      [
        'agentpy-pause-checkpoint',
        'Persist pending action and evidence atomically without holding open clients, locks, credentials, or unbounded provider state.',
        'A paused coroutine is a durable approval workflow.',
      ],
      [
        'agentpy-approval-resume-reject',
        'Resume only after revalidation; handle approve, reject, edit, revoke, expire, duplicate submission, changed policy, and already-completed action.',
        'A stored yes remains valid regardless of elapsed time or changed state.',
        'professional',
        'create',
      ],
    ]
  ),
  agentModule(
    'agentpy-session-checkpoint-replay',
    'Session Events, Atomic Checkpoints, Idempotent Resume, Fork, and Replay',
    'Mutable session blobs overwrite history, checkpoints split state from effects, resume repeats a tool call, and a debugging replay contacts production services.',
    'append-only replayable agent session',
    [
      [
        'agentpy-session-identity',
        'Define tenant, user, session, invocation, interaction, turn, attempt, call, effect, checkpoint, and parent identities and their lifetimes.',
        'One conversation ID can safely identify every layer of agent work.',
        'conceptual',
        'analyze',
      ],
      [
        'agentpy-append-only-event-log',
        'Record typed immutable state transitions with sequence, schema, causation, correlation, redaction, and integrity evidence.',
        'Overwriting the latest session JSON is easier and equally auditable.',
      ],
      [
        'agentpy-atomic-checkpoint',
        'Commit state, pending calls, completed effects, budgets, approvals, and provider references atomically with version checks.',
        'Saving messages is enough to resume an agent safely.',
      ],
      [
        'agentpy-idempotent-resume',
        'Reconcile in-progress and uncertain effects before continuation using idempotency keys, receipts, status queries, or human review.',
        'Restarting from the last model message cannot duplicate tool effects.',
      ],
      [
        'agentpy-fork-replay-simulation',
        'Fork historical state into a new identity and replay with fakes or no-effect tools for debugging, evals, migration, and counterfactual comparison.',
        'Replaying a production trajectory should re-execute its original tools for realism.',
        'professional',
        'evaluate',
      ],
    ]
  ),
  agentModule(
    'agentpy-context-assembly-compaction',
    'Context Assembly, Trust Labels, Token Budgets, Truncation, and Compaction',
    'The agent appends everything, places untrusted text beside system instructions, trims oldest messages blindly, trusts summaries, and cannot detect lost constraints after compaction.',
    'budgeted provenance-aware context builder',
    [
      [
        'agentpy-context-source-contract',
        'Label each context item by source, authority, tenant, purpose, timestamp, sensitivity, trust, instruction status, and expiry.',
        'All text in the context window has equal authority once tokenized.',
      ],
      [
        'agentpy-context-token-budget',
        'Reserve output and tool budget, measure or conservatively estimate input tokens, and admit context by task-specific value and risk.',
        'Fitting under the model context limit prevents truncation and cost defects.',
      ],
      [
        'agentpy-context-priority',
        'Preserve active policy, user goal, approvals, tool schemas, recent results, unresolved errors, and evidence while removing redundant or expired material.',
        'Oldest-first deletion is a safe universal context policy.',
        'strategic',
        'evaluate',
      ],
      [
        'agentpy-compaction-contract',
        'Create structured summaries with source references, retained decisions, rejected alternatives, open questions, limits, and uncertainty without hidden-reasoning claims.',
        'A fluent summary preserves every operationally important fact.',
      ],
      [
        'agentpy-compaction-regression',
        'Test pre- and post-compaction decisions on changed goals, permissions, failures, tool calls, citations, and adversarial instructions.',
        'Lower token count is sufficient proof that compaction improved the agent.',
        'metacognitive',
        'analyze',
      ],
    ]
  ),
  agentModule(
    'agentpy-memory-policy',
    'Working Memory, Durable Memory, Write Admission, Provenance, and Poisoning Defense',
    'The agent stores every conversation, mixes tenants, remembers injected instructions as facts, never expires data, and treats similarity as truth.',
    'provenance-gated tenant-isolated memory service',
    [
      [
        'agentpy-memory-kind-lifetime',
        'Distinguish in-turn state, session memory, user preferences, task facts, organizational knowledge, examples, and audit records by owner and lifetime.',
        'Agent memory is one vector store containing every prior message.',
        'conceptual',
        'analyze',
      ],
      [
        'agentpy-memory-write-admission',
        'Admit memory only for an allowed purpose with source, claim type, confidence, sensitivity, consent or authority, expiry, and contradiction policy.',
        'The model should decide by itself which user statements become durable memory.',
      ],
      [
        'agentpy-memory-provenance-retrieval',
        'Retrieve candidate memories with provenance and policy, then validate relevance, freshness, authority, tenant, and conflicts before context use.',
        'High similarity means a memory is current, authorized, and true.',
      ],
      [
        'agentpy-memory-tenant-isolation',
        'Enforce tenant and user isolation at storage, index, query, cache, logs, deletion, export, backup, and restore boundaries.',
        'Adding a tenant filter to the final result prevents cross-tenant memory leaks.',
      ],
      [
        'agentpy-memory-poisoning-defense',
        'Test direct, indirect, cross-session, shared-memory, stale-fact, hidden-instruction, and authority-confusion poisoning with quarantine and repair paths.',
        'Prompt instructions can reliably tell the model to ignore poisoned memories.',
        'professional',
        'evaluate',
      ],
    ]
  ),
  agentModule(
    'agentpy-errors-retries-idempotency',
    'Provider and Tool Errors, Retry Eligibility, Idempotency, Compensation, and Stop',
    'Every exception receives exponential retry, rate-limit guidance is ignored, write tools repeat after timeouts, compensation is untested, and terminal failures become generic apologies.',
    'typed idempotent agent recovery policy',
    [
      [
        'agentpy-error-taxonomy',
        'Classify validation, safety, authentication, authorization, quota, rate, transient provider, terminal provider, tool, policy, timeout, cancellation, and uncertain-effect failures.',
        'All provider errors are transient HTTP failures.',
        'conceptual',
        'analyze',
      ],
      [
        'agentpy-retry-eligibility',
        'Retry only idempotent or protected operations when policy, deadline, budget, status, provider guidance, and attempt evidence permit.',
        'Exponential backoff makes any failed operation safe to retry.',
      ],
      [
        'agentpy-backoff-rate-budget',
        'Apply bounded delay, Retry-After, jitter, global and per-resource concurrency, rate, token, and spend budgets without retry storms.',
        'Independent callers with jitter cannot amplify load together.',
      ],
      [
        'agentpy-idempotency-effect-reconcile',
        'Use operation keys, effect receipts, status reconciliation, deduplication windows, and atomic state to prevent duplicate writes.',
        'A request timeout proves the external action did not occur.',
      ],
      [
        'agentpy-compensation-stop',
        'Design and test compensation where possible, preserve partial evidence, stop visibly when safety is uncertain, and escalate irreversible outcomes.',
        'Every external effect can be rolled back automatically.',
        'professional',
        'evaluate',
      ],
    ]
  ),
  agentModule(
    'agentpy-streaming-events-accessibility',
    'Streaming Events, Accessible Status, Cancellation, Reconnect, and Rendering',
    'Token deltas overwrite tool status, every chunk is announced, focus jumps, cancel is mouse-only, reconnect duplicates output, and color is the only failure signal.',
    'accessible typed agent event stream',
    [
      [
        'agentpy-agent-event-model',
        'Define typed lifecycle, model delta, tool request, approval, tool progress, result, warning, error, terminal, and usage events with stable identity.',
        'An agent UI needs only assistant text tokens and a loading spinner.',
      ],
      [
        'agentpy-stream-delta-assembly',
        'Assemble ordered deltas and state snapshots idempotently while preserving call, interaction, retry, and terminal boundaries.',
        'Appending every received event always reconstructs correct state.',
      ],
      [
        'agentpy-accessible-live-status',
        'Announce meaningful milestones through restrained live regions, expose structured text, keep headings and focus stable, and avoid color-only meaning.',
        'Screen readers should announce every generated token for immediacy.',
        'professional',
        'create',
      ],
      [
        'agentpy-keyboard-cancel-control',
        'Provide keyboard-operable pause, cancel, approve, reject, retry, details, and recovery controls with visible focus and large targets.',
        'A keyboard-accessible text box makes the whole agent workflow accessible.',
      ],
      [
        'agentpy-stream-reconnect-dedup',
        'Resume streams from sequence or snapshot, deduplicate events, reconcile terminal state, and avoid replaying side effects after reconnect.',
        'Opening a new stream after disconnect can safely start the agent turn again.',
        'strategic',
        'create',
      ],
    ]
  ),
  agentModule(
    'agentpy-injection-output-security',
    'Prompt Injection, Tool Output Trust, Exfiltration, and Safe Rendering',
    'Retrieved text claims to be system instructions, a tool result requests secrets, the agent follows embedded links, approval text is forged, and model Markdown reaches an unsafe renderer.',
    'instruction-data separation and agent security gateway',
    [
      [
        'agentpy-instruction-data-separation',
        'Represent application policy, user instructions, retrieved data, tool output, memory, and provider metadata with explicit authority and non-executable boundaries.',
        'Delimiters alone prevent untrusted data from becoming instructions.',
        'conceptual',
        'analyze',
      ],
      [
        'agentpy-direct-indirect-injection',
        'Test direct and indirect goal hijacking, authority spoofing, hidden text, encoded payloads, multimodal instructions, and tool-result injection.',
        'Blocking phrases such as ignore previous instructions stops prompt injection.',
      ],
      [
        'agentpy-tool-output-validation',
        'Treat tool names, content, links, files, citations, metadata, error text, and nested model output as untrusted typed data.',
        'Output from an allowlisted tool is automatically trustworthy.',
      ],
      [
        'agentpy-exfiltration-control',
        'Constrain destination, data class, field flow, tool combinations, external communication, and covert channels with policy and audit evidence.',
        'Least-privilege tools alone prevent sensitive data exfiltration.',
        'strategic',
        'evaluate',
      ],
      [
        'agentpy-safe-output-rendering',
        'Encode or sanitize model and tool output by HTML, Markdown, URL, spreadsheet, shell, log, and document context and preserve accessible alternatives.',
        'Escaping angle brackets makes model output safe in every destination.',
        'professional',
        'create',
      ],
    ]
  ),
  agentModule(
    'agentpy-secrets-privacy-governance',
    'Secrets, Provider Data Terms, Privacy, Retention, and Sensitive Uses',
    'An API key appears in source, prompts contain personal records, free and paid data terms are confused, logs persist indefinitely, and a high-impact use launches without review.',
    'governed secret and agent-data lifecycle',
    [
      [
        'agentpy-secret-custody',
        'Inject secrets through approved runtime stores, scope and rotate them, prevent prompt or tool exposure, redact derivatives, and destroy test credentials.',
        'Environment variables are always safe from model, logs, child processes, and crash reports.',
      ],
      [
        'agentpy-data-minimization',
        'Map purpose, legal or organizational authority, fields, sensitivity, users, provider transfer, storage, access, retention, deletion, and aggregation risk.',
        'A useful model should receive every available field for context.',
        'professional',
        'create',
      ],
      [
        'agentpy-provider-data-terms',
        'Record current paid, unpaid, logging, sharing, abuse-monitoring, region, age, and sensitive-use terms and re-review them before release.',
        'One Gemini data policy applies to every service tier, region, and feature.',
        'professional',
        'evaluate',
      ],
      [
        'agentpy-retention-deletion',
        'Implement purpose-limited retention, user and administrator deletion, cache and provider-state expiry, backup handling, legal holds, and proof of deletion limits.',
        'Deleting the local session deletes every provider log, cache, memory, and backup.',
      ],
      [
        'agentpy-sensitive-use-review',
        'Route medical, legal, employment, education, finance, identity, safety, minors, surveillance, and other high-impact cases to qualified policy review.',
        'A disclaimer turns a high-impact agent into a low-risk application.',
        'professional',
        'evaluate',
      ],
    ]
  ),
  agentModule(
    'agentpy-eval-dataset-oracles',
    'Representative Eval Sets, Deterministic Oracles, Baselines, and Versions',
    'The team tests five hand-picked happy prompts, changes them after failures, has no task distribution or deterministic checks, and compares only final prose.',
    'versioned representative agent evaluation corpus',
    [
      [
        'agentpy-eval-task-distribution',
        'Sample normal, boundary, ambiguous, multilingual, accessibility, refusal, tool, failure, adversarial, and recovery cases from the intended task distribution.',
        'A few creative prompts represent real agent usage adequately.',
        'strategic',
        'create',
      ],
      [
        'agentpy-deterministic-oracles',
        'Define exact schema, state, tool, argument, authorization, effect, citation, budget, stop, and recovery assertions wherever outcomes are deterministic.',
        'Agent evaluation must use only model judges because responses are probabilistic.',
      ],
      [
        'agentpy-changed-adversarial-cases',
        'Create changed-input, changed-policy, tool-fault, injection, memory-poisoning, approval, cancellation, and resource-exhaustion cases without leaking answers.',
        'One jailbreak list permanently covers agent security regressions.',
      ],
      [
        'agentpy-eval-baseline',
        'Record deterministic workflow, prior prompt, prior model, no-tool, human, and current production baselines with confidence and cost.',
        'A new model should be compared only with its own previous run.',
      ],
      [
        'agentpy-eval-version-provenance',
        'Version dataset, split, rubric, oracle, tool fixtures, model, SDK, policy, seed where supported, runner, and result artifacts.',
        'An eval score is reproducible without versioning its cases and environment.',
        'metacognitive',
        'create',
      ],
    ]
  ),
  agentModule(
    'agentpy-trajectory-tool-evals',
    'Trajectory, Tool Selection, Arguments, Effects, and Stop Evaluation',
    'A final answer looks right even though the agent called an unauthorized tool, used wrong arguments, retried a write, skipped an approval, and never reached a valid terminal state.',
    'trajectory-aware agent evaluation harness',
    [
      [
        'agentpy-trajectory-capture',
        'Capture observable state, interaction steps, tool calls and results, approvals, effects, retries, budgets, errors, and terminal reason without hidden-reasoning claims.',
        'Final text contains enough evidence to reconstruct how an agent acted.',
      ],
      [
        'agentpy-order-aware-matching',
        'Choose exact, in-order, any-order, partial-order, forbidden-step, or state-invariant matching based on task semantics.',
        'Every valid agent trajectory must exactly match one reference sequence.',
        'strategic',
        'evaluate',
      ],
      [
        'agentpy-tool-selection-metrics',
        'Measure required-tool recall, tool precision, unnecessary calls, forbidden calls, schema validity, argument correctness, and result use.',
        'Tool-call count is a sufficient measure of agent efficiency.',
      ],
      [
        'agentpy-effect-outcome-evidence',
        'Verify actual state changes, idempotency, approvals, receipts, cleanup, compensation, and affected-user outcomes rather than call syntax alone.',
        'A correct tool name and arguments prove the external effect succeeded.',
      ],
      [
        'agentpy-terminal-recovery-eval',
        'Assess complete, refuse, escalate, exhausted, cancelled, failed, partial, rollback, and recovery outcomes under injected faults.',
        'Only successful completion cases belong in an agent evaluation set.',
        'metacognitive',
        'analyze',
      ],
    ]
  ),
  agentModule(
    'agentpy-rubrics-judge-calibration',
    'Rubrics, Model Judges, Pairwise Comparison, Human Calibration, and Uncertainty',
    'A judge model sees model names, produces unexplained one-to-five scores, agrees with itself, replaces human review, and silently overrides deterministic safety failures.',
    'calibrated mixed-method evaluation board',
    [
      [
        'agentpy-task-rubric',
        'Define observable task-specific criteria, anchors, critical failures, accessibility, safety, evidence, and scoring aggregation before viewing candidate outputs.',
        'A generic helpfulness rubric transfers unchanged to every agent task.',
        'strategic',
        'create',
      ],
      [
        'agentpy-blinded-comparison',
        'Blind model, prompt, provider, and treatment identity; randomize order; use pairwise comparison when it improves judgment reliability.',
        'Judge models are immune to model-name, order, verbosity, and style bias.',
      ],
      [
        'agentpy-judge-variance',
        'Measure repeatability, position effects, rubric sensitivity, reference leakage, adversarial manipulation, and judge-version drift.',
        'A deterministic temperature makes a model judge objectively correct.',
      ],
      [
        'agentpy-human-calibration',
        'Use trained reviewers, independent labels, adjudication, disagreement records, affected-domain expertise, and sampled production calibration.',
        'Human review needs no rubric or reliability measurement.',
        'professional',
        'evaluate',
      ],
      [
        'agentpy-eval-precedence-uncertainty',
        'Give deterministic safety and policy failures precedence, retain metric disagreement, report uncertainty, and escalate high-impact ambiguous cases.',
        'A high average judge score can compensate for a failed authorization invariant.',
        'metacognitive',
        'evaluate',
      ],
    ]
  ),
  agentModule(
    'agentpy-observability-token-cost',
    'Agent Traces, GenAI Semantics, Token Usage, Cost, Privacy, and Diagnosis',
    'Logs contain full prompts and secrets but omit tool arguments, approvals, retries, model version, token usage, cost, and causal links needed to diagnose a failure.',
    'privacy-safe reconstructable agent telemetry',
    [
      [
        'agentpy-trace-hierarchy',
        'Correlate service request, session, invocation, interaction, model call, tool call, approval, retry, effect, and recovery spans and events.',
        'One span around the final response is sufficient agent observability.',
      ],
      [
        'agentpy-genai-semantic-conventions',
        'Apply versioned OpenTelemetry GenAI operation, provider, model, usage, tool, workflow, error, and output attributes with stability awareness.',
        'Experimental GenAI semantic conventions can be treated as stable forever.',
        'professional',
        'apply',
      ],
      [
        'agentpy-content-logging-policy',
        'Default to metadata and hashes; sample, minimize, redact, encrypt, access-control, retain, and delete prompt, result, and tool content only when approved.',
        'Full prompt and response logging is required to debug agents.',
      ],
      [
        'agentpy-token-cost-accounting',
        'Reconcile input, cached, output, reasoning where exposed, tool, retry, and total token usage to model and pricing version without hard-coded permanence.',
        'Character counts accurately represent provider token billing.',
      ],
      [
        'agentpy-causal-agent-diagnosis',
        'Reconstruct first failing policy, context, model, tool, approval, effect, retry, or resource boundary and distinguish cause from downstream symptoms.',
        'The final exception is usually the root cause of an agent incident.',
        'metacognitive',
        'analyze',
      ],
    ]
  ),
  agentModule(
    'agentpy-performance-concurrency-cache',
    'Latency, Concurrency, Rate and Spend Limits, Context Cache, and Load',
    'The agent parallelizes every request, queues without limit, retries 429s immediately, caches sensitive context indefinitely, and estimates capacity from one local happy path.',
    'budgeted agent capacity and overload controller',
    [
      [
        'agentpy-latency-decomposition',
        'Measure queue, provider time to first event, generation, tool, approval, retry, serialization, and end-to-end latency by outcome and percentile.',
        'Average model response latency predicts user-visible agent latency.',
      ],
      [
        'agentpy-concurrency-admission',
        'Bound sessions, provider calls, tool calls, per-tenant work, queues, task groups, connection pools, and downstream effects with fair admission.',
        'More concurrent model calls always reduce task completion time.',
      ],
      [
        'agentpy-rate-spend-budget',
        'Enforce project and tenant requests, tokens, daily and rolling spend, retry, model, and tool budgets before work starts and while it runs.',
        'Provider rate limits alone prevent denial-of-wallet incidents.',
      ],
      [
        'agentpy-context-cache-policy',
        'Use implicit or explicit context caching only with correct prefix identity, tenant isolation, expiry, invalidation, retention, privacy, and measured reuse value.',
        'Cached context is free, current, and outside retention concerns.',
      ],
      [
        'agentpy-representative-load-transfer',
        'Run authorized fixed-distribution load, saturation, cancellation, quota, spend, dependency, and recovery experiments and state environment limits.',
        'A mocked provider benchmark proves production capacity.',
        'strategic',
        'evaluate',
      ],
    ]
  ),
  agentModule(
    'agentpy-adk-framework-translation',
    'Google ADK Translation, Runner, Sessions, Tools, Callbacks, and Confirmation',
    'The team adopts a framework before understanding its state and effects, duplicates policy in callbacks, trusts defaults, and cannot map framework events back to verified core contracts.',
    'auditable Google ADK adapter and conformance suite',
    [
      [
        'agentpy-core-to-adk-map',
        'Map product policy, provider port, loop, tool registry, session, memory, approval, events, evals, and telemetry to ADK concepts and identify gaps.',
        'Using ADK automatically preserves every custom core invariant.',
        'strategic',
        'analyze',
      ],
      [
        'agentpy-adk-agent-runner',
        'Configure Agent, model, instruction, tools, Runner, invocation, events, and async lifecycle with explicit versions and bounded behavior.',
        'Creating an ADK Agent object is equivalent to a production agent service.',
      ],
      [
        'agentpy-adk-session-memory',
        'Select and test ADK session and memory services for identity, persistence, isolation, migration, retention, and replay boundaries.',
        'An ADK memory service makes every stored item safe and relevant.',
      ],
      [
        'agentpy-adk-callback-plugin-policy',
        'Use callbacks and plugins for observable bounded cross-cutting policy without hidden mutation, ordering assumptions, or conflicting decisions.',
        'More callbacks always improve agent control and observability.',
      ],
      [
        'agentpy-adk-confirmation-conformance',
        'Verify tool confirmation, policy, evaluation, event, error, cancellation, and deployment behavior against framework-independent conformance cases.',
        'A framework confirmation dialog is sufficient proof of informed approval.',
        'professional',
        'evaluate',
      ],
    ]
  ),
  agentModule(
    'agentpy-multi-agent-delegation',
    'Multi-Agent Delegation, Context Minimization, Merge, and Failure Containment',
    'A coordinator sends full user context and credentials to many agents, gives them shared write tools, accepts unvalidated summaries, and amplifies one poisoned result across the system.',
    'typed contained delegation graph',
    [
      [
        'agentpy-delegation-fit',
        'Use delegation only when specialized context, independent work, isolation, or ownership beats a simpler function, workflow, tool, or single agent.',
        'More agents improve difficult tasks through extra reasoning automatically.',
        'strategic',
        'evaluate',
      ],
      [
        'agentpy-delegate-contract',
        'Define delegated goal, inputs, outputs, non-goals, authority, tools, budget, deadline, evidence, stop, and escalation in a typed contract.',
        'A natural-language role name adequately constrains a subagent.',
      ],
      [
        'agentpy-delegation-context-minimization',
        'Send only task-required, tenant-authorized, provenance-labeled context and never inherit parent secrets or tools implicitly.',
        'Subagents need the full parent transcript to avoid mistakes.',
      ],
      [
        'agentpy-delegation-result-merge',
        'Validate independent results, preserve provenance and disagreement, detect conflicts, rerun changed cases, and assign merge authority.',
        'The coordinator can safely summarize conflicting agent outputs without verification.',
      ],
      [
        'agentpy-delegation-failure-containment',
        'Bound fan-out, depth, shared memory, tool authority, retries, spend, cascading cancellation, poisoned results, and partial recovery.',
        'Independent agent processes prevent logical cascading failures.',
        'professional',
        'create',
      ],
    ]
  ),
  agentModule(
    'agentpy-code-computer-use-sandbox',
    'Code Execution, Computer Use, Sandboxes, Prompt Injection, and Artifacts',
    'The agent executes generated Python on the host, inherits network and credentials, clicks through injected instructions, trusts screenshots, and uploads unreviewed artifacts.',
    'deny-by-default disposable action sandbox',
    [
      [
        'agentpy-code-execution-risk',
        'Classify generated code as untrusted and define supported language, runtime, packages, inputs, outputs, time, memory, process, file, network, and secret boundaries.',
        'Python syntax validation makes generated code safe to execute.',
        'conceptual',
        'analyze',
      ],
      [
        'agentpy-disposable-sandbox',
        'Run code in a disposable isolated environment with deny-by-default capabilities, immutable base, bounded resources, no host mounts, and complete destruction.',
        'A virtual environment isolates generated code from host files and network.',
      ],
      [
        'agentpy-sandbox-network-files',
        'Mediate files, environment, network destinations, DNS, uploads, downloads, subprocesses, and credentials through typed policy and explicit approvals.',
        'Blocking shell commands prevents generated code from accessing external systems.',
      ],
      [
        'agentpy-computer-use-security',
        'Treat screen, page, document, email, and accessibility-tree content as untrusted; constrain targets and actions; preview sensitive effects; resist dialog forging.',
        'A visual browser surface is safer than API tools because users can see it.',
        'professional',
        'evaluate',
      ],
      [
        'agentpy-artifact-inspection',
        'Validate type, size, structure, malware risk, secrets, active content, accessibility, provenance, and destination before retaining or publishing artifacts.',
        'An artifact created successfully inside a sandbox is safe to distribute.',
        'professional',
        'create',
      ],
    ]
  ),
  agentModule(
    'agentpy-package-api-deployment',
    'Package, CLI, API, Configuration, Async Lifecycle, and Deployment',
    'The agent is one script with import-time clients, embedded keys, no health distinction, inconsistent CLI and API behavior, mutable model defaults, and no graceful shutdown.',
    'installable operable Python agent service',
    [
      [
        'agentpy-package-boundaries',
        'Separate domain policy, provider adapter, orchestration, tools, persistence, interfaces, and composition root in an import-safe typed package.',
        'Putting the loop in one main.py file reduces production complexity.',
        'strategic',
        'create',
      ],
      [
        'agentpy-cli-api-contract',
        'Expose consistent request, event, terminal, error, cancellation, idempotency, and version behavior through accessible CLI and authenticated API surfaces.',
        'A CLI print loop and HTTP endpoint can use unrelated outcome semantics.',
      ],
      [
        'agentpy-typed-config-secrets',
        'Validate environment-specific non-secret configuration, inject secret references separately, reject unsafe defaults, and publish a redacted effective config.',
        'Environment variables need no schema or startup validation.',
      ],
      [
        'agentpy-async-lifecycle-health',
        'Create and close provider, tool, persistence, telemetry, and task resources in explicit lifespan; distinguish liveness, readiness, and dependency degradation.',
        'A process listening on a port is ready for safe agent work.',
      ],
      [
        'agentpy-deployment-identity',
        'Bind revision, package, dependency lock, policy, model config, eval set, artifact digest, environment, migration, and rollback identity.',
        'A deployment timestamp is sufficient agent release identity.',
        'professional',
        'create',
      ],
    ]
  ),
  agentModule(
    'agentpy-release-recovery-defense',
    'Release Gates, Migration, Canary, Kill Switch, Recovery, and Defense',
    'A model alias updates globally, SDK behavior changes, offline averages remain green, production incidents lack a kill switch, rollback cannot restore state, and residual risk has no owner.',
    'production agent release and residual-risk defense',
    [
      [
        'agentpy-agent-release-gates',
        'Require schema, unit, trajectory, safety, privacy, accessibility, compatibility, load, cost, deployment, migration, rollback, recovery, and review evidence before release.',
        'A passing end-to-end demo is a sufficient agent release gate.',
        'professional',
        'create',
      ],
      [
        'agentpy-model-sdk-migration',
        'Diff model, API, SDK, ADK, schema, safety, tool, token, state, and deprecation behavior against versioned fixtures and representative evals.',
        'Changing only a model identifier is a low-risk configuration update.',
        'strategic',
        'evaluate',
      ],
      [
        'agentpy-canary-abort-rollback',
        'Canary immutable candidates against task, safety, tool, refusal, latency, cost, and user signals with predeclared abort and state-aware rollback.',
        'A canary is safe whenever its average response score improves.',
      ],
      [
        'agentpy-kill-switch-incident-recovery',
        'Stop new work, cancel safely, revoke tools and credentials, preserve evidence, reconcile effects, restore state, notify owners, and rehearse recovery.',
        'Disabling model calls is enough to contain every agent incident.',
        'professional',
        'create',
      ],
      [
        'agentpy-production-defense',
        'Defend stakeholder value, affected-user protection, evidence quality, limitations, support, monitoring, re-review, ownership, and accepted residual risk.',
        'Passing technical checks transfers responsibility from the release team to the model provider.',
        'metacognitive',
        'create',
      ],
    ]
  ),
];

function source(title, url, version, scope, authority = 'official-docs') {
  return { title, authority, url, version, reviewedAt: REVIEWED_AT, scope };
}

const sources = [
  source(
    'Python 3.14.6 Documentation',
    'https://docs.python.org/3.14/',
    'Python 3.14.6, June 2026',
    'Language, typing, dataclasses, protocols, exceptions, JSON, hashing, secrets, logging, testing, profiling, packaging, and runtime behavior.'
  ),
  source(
    'Python 3.14 asyncio and TaskGroup Documentation',
    'https://docs.python.org/3.14/library/asyncio.html',
    'Python 3.14.6',
    'Structured concurrency, tasks, TaskGroup, cancellation, timeouts, queues, synchronization, async lifecycle, and current event-loop guidance.'
  ),
  source(
    'Google Gen AI Python SDK Documentation',
    'https://googleapis.github.io/python-genai/',
    'google-genai 2.11.0',
    'Current client, interactions, models, content, tools, configuration, sync and async lifecycle, API version selection, and typed SDK surfaces.'
  ),
  source(
    'Google Gen AI Python SDK 2.11.0 Release',
    'https://github.com/googleapis/python-genai/releases/tag/v2.11.0',
    '2.11.0, 2026-07-09',
    'Current stable SDK identity, Python 3.14 fixes, Interactions and agent creation changes, compatibility, and migration evidence.'
  ),
  source(
    'Gemini Interactions API Overview',
    'https://ai.google.dev/gemini-api/docs/interactions-overview',
    'Generally Available, recommended for new projects since June 2026',
    'Interaction resources, steps, agents, state, previous interaction IDs, background work, streaming, data storage, and migration from generateContent.'
  ),
  source(
    'Gemini API Function Calling',
    'https://ai.google.dev/gemini-api/docs/function-calling',
    'Current 2026-07-14 Gemini 3.5 and Interactions guidance',
    'Function declarations, calls, IDs, results, multi-tool use, parallel calls, provider context circulation, and structured output combinations.'
  ),
  source(
    'Gemini API Tools',
    'https://ai.google.dev/gemini-api/docs/tools',
    'Current 2026-07-14',
    'Built-in versus client-side tools, tool selection, custom functions, combinations, security, and execution responsibility.'
  ),
  source(
    'Gemini API Structured Outputs',
    'https://ai.google.dev/gemini-api/docs/structured-output',
    'Current 2026-07-14',
    'Supported JSON Schema subset, typed final output, schema constraints, model behavior, application validation, and limitations.'
  ),
  source(
    'Gemini API Models and Capabilities',
    'https://ai.google.dev/gemini-api/docs/models',
    'Current Gemini 3.5 model catalog, reviewed 2026-07-14',
    'Model lifecycle, capabilities, context and output limits, stability stages, supported actions, and model selection.'
  ),
  source(
    'Gemini API Safety and Factuality Guidance',
    'https://ai.google.dev/gemini-api/docs/safety-guidance',
    'Current 2026-07-14',
    'Task risk reduction, safety settings, factuality, bias, prompt injection, misuse controls, testing, and human oversight.'
  ),
  source(
    'Gemini API Data Logging and Sharing',
    'https://ai.google.dev/gemini-api/docs/logs-policy',
    'Updated 2026-07-09',
    'Developer-owned logs, optional sharing, retention settings, datasets, feedback, sensitive-data restrictions, and deletion boundaries.'
  ),
  source(
    'Gemini API Additional Terms of Service',
    'https://ai.google.dev/gemini-api/terms',
    'Effective 2026-03-23',
    'Age, region, paid and unpaid services, data use, prohibited uses, generated content, safety settings, and sensitive-use restrictions.'
  ),
  source(
    'Gemini API Rate Limits',
    'https://ai.google.dev/gemini-api/docs/rate-limits',
    'Current 2026-07-14',
    'Project requests, tokens, daily and spend rate limits, tiers, 429 handling, model differences, and quota operations.'
  ),
  source(
    'Gemini API Context Caching',
    'https://ai.google.dev/gemini-api/docs/caching',
    'Current 2026-07-14',
    'Implicit and explicit caching, token accounting, TTL, costs, prefix identity, limits, and retention implications.'
  ),
  source(
    'Google Agent Development Kit Documentation',
    'https://google.github.io/adk-docs/',
    'google-adk 2.4.0',
    'Agents, models, runners, events, tools, callbacks, plugins, sessions, memory, artifacts, evaluation, deployment, and human confirmation.'
  ),
  source(
    'Google Agent Development Kit 2.4.0 Release',
    'https://github.com/google/adk-python/releases/tag/v2.4.0',
    '2.4.0, 2026-07-07',
    'Current stable Python ADK identity, features, fixes, sessions, tools, model adapters, compatibility, and migration evidence.'
  ),
  source(
    'Google ADK Evaluation Documentation',
    'https://google.github.io/adk-docs/evaluate/',
    'ADK 2.4.0 documentation current 2026-07-14',
    'Evaluation sets, response and trajectory evidence, tool behavior, metrics, user simulation, results, and regression workflow.'
  ),
  source(
    'Vertex AI Agent Engine Overview',
    'https://cloud.google.com/vertex-ai/generative-ai/docs/reasoning-engine/overview',
    'Current 2026-07-14',
    'Managed runtime, sessions, memory, evaluation, observability, framework support, identity, regions, deployment, and operational limits.'
  ),
  source(
    'Pydantic 2.13.4 Documentation and Release',
    'https://docs.pydantic.dev/2.13/',
    'Pydantic 2.13.4, 2026-05-06',
    'Strict validation, models, discriminated unions, JSON Schema, serialization, errors, settings boundaries, and current Python compatibility.'
  ),
  source(
    'JSON Schema Draft 2020-12',
    'https://json-schema.org/draft/2020-12',
    'Draft 2020-12, 2022-06-16',
    'Core and validation vocabularies, arrays, references, annotations, unevaluated properties, output, and implementation boundaries.',
    'standard'
  ),
  source(
    'OWASP AI Agent Security Cheat Sheet',
    'https://cheatsheetseries.owasp.org/cheatsheets/AI_Agent_Security_Cheat_Sheet.html',
    'OWASP guidance current 2026-07-14',
    'Prompt injection, tool abuse, excessive agency, exfiltration, memory poisoning, denial of wallet, identity, monitoring, and layered controls.'
  ),
  source(
    'OWASP Top 10 for Agentic Applications 2026',
    'https://genai.owasp.org/2025/12/09/owasp-top-10-for-agentic-applications-the-benchmark-for-agentic-security-in-the-age-of-autonomous-ai/',
    'First edition released 2025-12-09 for 2026 use',
    'Agent goal hijack, tool misuse, identity and privilege abuse, supply chain, code execution, memory poisoning, multi-agent risk, cascading failure, trust exploitation, and rogue agents.'
  ),
  source(
    'NIST AI RMF Generative AI Profile',
    'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf',
    'NIST AI 600-1, July 2024; reviewed 2026-07-14',
    'Govern, map, measure, and manage practices for generative AI risk, testing, evaluation, transparency, incident disclosure, privacy, and human oversight.',
    'curriculum-framework'
  ),
  source(
    'OpenTelemetry Python SDK 1.42.1 and GenAI Semantic Conventions',
    'https://github.com/open-telemetry/opentelemetry-python/releases/tag/v1.42.1',
    'SDK 1.42.1, latest version accepted by google-adk 2.4.0; verified 2026-07-15',
    'Python 3.14-compatible tracing plus GenAI provider, operation, model, workflow, agent, tool, usage, output, error, privacy, and stability attributes; 1.43.0 is intentionally excluded because google-adk 2.4.0 caps the SDK at 1.42.1.',
    'standard'
  ),
  source(
    'WCAG 2.2 Recommendation',
    'https://www.w3.org/TR/WCAG22/',
    'W3C Recommendation 2024-12-12',
    'Keyboard, focus, status, target size, reflow, motion, names, roles, contrast, error, timing, and accessible authentication requirements.',
    'standard'
  ),
  source(
    'Python Packaging User Guide',
    'https://packaging.python.org/en/latest/',
    'PyPA guide current 2026-07-14',
    'Project layout, pyproject metadata, dependencies, entry points, builds, clean installs, publishing, and environment reproduction.'
  ),
  source(
    'pytest 9.1.1 Documentation',
    'https://docs.pytest.org/en/stable/',
    'pytest 9.1.1',
    'Fixtures, parametrization, monkeypatch, logging, temporary resources, async integration boundaries, failure diagnostics, and test architecture.'
  ),
  source(
    'Git 2.55 Documentation',
    'https://git-scm.com/docs',
    'Git 2.55 current 2026-07-14',
    'Repository state, revisions, diffs, tags, artifact identity, rollback, recovery, and release evidence.'
  ),
  source(
    'ACM IEEE AAAI CS2023 Curriculum',
    'https://csed.acm.org/',
    'CS2023 reviewed 2026-07-14',
    'Artificial intelligence, software development, security, systems, networking, data, human-computer interaction, ethics, testing, and professional outcomes.',
    'curriculum-framework'
  ),
  source(
    'ACM Code of Ethics and Professional Conduct',
    'https://www.acm.org/code-of-ethics',
    'ACM Code reviewed 2026-07-14',
    'Avoiding harm, honesty, fairness, privacy, authorized access, security, system quality, review, and professional responsibility.',
    'curriculum-framework'
  ),
];

export const buildAiAgentPythonConfig = finalizeCourse(
  {
    id: 'build-ai-agent-python',
    competencyIdPrefix: 'agentpy-',
    title: 'Build and Ship a Safe Evaluated AI Agent with Python 3.14 and Gemini 3.5',
    version: '2026.07',
    audience: {
      description:
        'Python, HTTP, prompt, and agent-loop learners who need to design, implement, evaluate, secure, operate, and defend a tool-using Gemini agent instead of copy a brittle while-loop demo or hide core contracts behind a framework.',
      entryKnowledge: [
        'Write and test typed Python functions, protocols, dataclasses, async code, iterators, result models, packages, command-line tools, and functional-core boundaries.',
        'Apply HTTP client lifecycle, authentication, timeout, retry, rate, idempotency, fake-transport, observability, SSRF, and cleanup evidence from HTTP Clients in Python.',
        'Design prompt task contracts, structured outputs, tool descriptions, adversarial cases, approval boundaries, and empirical prompt evaluations from 2026 Prompt Engineering with Claude and Codex.',
        'Design bounded observable agent loops with explicit goals, plans, state, budgets, termination, checkpoints, memory, human control, recovery, and trajectory evaluations from Agent Loops, Persistent Goals, and Durable Work.',
        'Use Git revisions, diffs, branches, tags, clean worktrees, recovery anchors, and review evidence from Git Foundations.',
      ],
      deviceConstraints: [
        'Modern browser; instant Python practice uses deterministic pure interaction, tool, policy, state-machine, memory, evaluation, telemetry, and recovery models with original fixed fixtures in an isolated Pyodide 3.14 worker. Real provider APIs, Gemini models, google-genai, google-adk, Pydantic native validation, HTTP, files, credentials, code execution, browsers, databases, telemetry backends, load, privacy review, and production effects remain explicit controlled transfer gates.',
      ],
      accessibilityAssumptions: [
        'Goals, model and tool steps, approvals, arguments, effects, streams, memory, evaluation tables, traces, failures, budgets, and reports have structured text, explicit labels, keyboard operation, announced status, large targets, reduced motion, reflow, and no color-only meaning.',
      ],
    },
    scope: {
      includes: [
        'Python 3.14.6; product and risk contracts; reproducible repositories; Gemini Interactions API; Gemini 3.5 capability and stability selection; google-genai 2.11.0; deterministic provider ports and fakes; typed interaction parts and state; Pydantic 2.13.4 and JSON Schema 2020-12 structured output; typed tool schemas, allowlisted dispatch, least agency, and complete function-call circulation; explicit bounded loops; asyncio TaskGroup concurrency; human approval and durable resume; session events, checkpoints, replay, context compaction, and poisoning-resistant memory; retry and idempotency; accessible event streaming; OWASP-informed injection, exfiltration, memory, tool, identity, code-execution, multi-agent, and denial-of-wallet defense; provider data terms, privacy, retention, and sensitive-use review; deterministic, trajectory, rubric, model-judge, and human-calibrated evaluation; OpenTelemetry GenAI observability; token, cost, rate, caching, latency, capacity, and overload control; google-adk 2.4.0 translation and conformance; contained delegation; sandboxed code and computer-use boundaries; packaging, API, deployment, migration, canary, rollback, kill switch, recovery, and production defense',
        'Runnable deterministic pure-Python evidence using original fixed fixtures plus explicit provider, model, SDK, HTTP, identity, secret, storage, sandbox, browser, database, telemetry, accessibility, privacy, security, load, cost, and production transfer gates',
        'Five cumulative authentic agent deliveries and a performance-based unfamiliar-agent defense examination',
      ],
      excludes: [
        'Copied agent tutorials, provider-hidden chain-of-thought extraction, undocumented capability guarantees, unbounded autonomy, model-controlled authorization, generic shell or host tools, unsandboxed generated-code execution, deceptive approval dialogs, production credentials in routine grading, live provider calls in routine tests, sensitive high-impact deployment without qualified review, or release based only on fluent final answers.',
      ],
      nextCourses: ['agent-skills-mcp', 'rag-retrieval-augmented-generation', 'personal-project-1'],
    },
    sources,
    sharedRequirements: [
      'Every activity retrieves stakeholder task, risk tier, authority, revision, Python, SDK, API and model identity, interaction and call IDs, state and budget, tool policy, approval, validation, accessibility, privacy and security boundary, changed-case test, failure, recovery, and explicit browser-versus-controlled-system limits before adding one agent capability.',
      'Browser Python uses original fixed in-memory fixtures and deterministic pure functions. It does not contact provider APIs, invoke Gemini models, import or claim native google-genai, google-adk, or Pydantic behavior, open sockets, read or write host files, use credentials, execute generated code, launch browsers, reach databases or telemetry backends, or claim live privacy, load, safety, cost, or production behavior; those require controlled evidence.',
      'Passing work requires stable scenario and artifact identity, prediction, intermediate interaction, call, result, state, approval, evaluation, trace, or recovery evidence, exact observable output, a changed and rejected case, a test that detects a deliberate defect, accessible stakeholder evidence, and a named owner for remaining risk.',
    ],
    modules,
    projects: [
      project(
        'agentpy-structured-intake-assistant',
        'Structured Public-Service Intake Assistant',
        'agentpy-single-tool-turn',
        'A multilingual public-benefits intake and accessibility team',
        'They need a bounded Gemini interaction that validates structured intake, selects one narrow eligibility-information tool, preserves call-result provenance, refuses unsupported decisions, and produces an accessible next-step record.',
        [
          'agentpy-stakeholder-task',
          'agentpy-pydantic-strict-validation',
          'agentpy-tool-parameter-schema',
          'agentpy-function-result-circulation',
          'agentpy-final-output-provenance',
        ]
      ),
      project(
        'agentpy-approved-operations-assistant',
        'Approval-Bound Service Operations Assistant',
        'agentpy-session-checkpoint-replay',
        'An internal service desk and accountable change manager',
        'They need read-only diagnosis, a least-privilege reversible change tool, immutable action preview, explicit approval, crash-safe pause and resume, idempotent effects, cancellation, replay, and complete audit evidence.',
        [
          'agentpy-effect-classification',
          'agentpy-step-resource-budgets',
          'agentpy-approval-request-binding',
          'agentpy-idempotent-resume',
          'agentpy-fork-replay-simulation',
        ]
      ),
      project(
        'agentpy-accessible-casework-agent',
        'Accessible Streaming Casework Assistant',
        'agentpy-streaming-events-accessibility',
        'A disability-services casework team and the people it supports',
        'They need tenant-isolated context and memory, visible provenance, bounded retries, typed streaming progress, keyboard pause and cancel, restrained announcements, reconnect safety, and human escalation for uncertain or sensitive cases.',
        [
          'agentpy-context-source-contract',
          'agentpy-memory-tenant-isolation',
          'agentpy-idempotency-effect-reconcile',
          'agentpy-accessible-live-status',
          'agentpy-stream-reconnect-dedup',
        ]
      ),
      project(
        'agentpy-secure-evaluated-research-agent',
        'Secure Evaluated Research Intake Agent',
        'agentpy-observability-token-cost',
        'A public-interest research governance and security board',
        'They need untrusted-document isolation, no-secret exfiltration, minimized provider data, representative deterministic and trajectory evals, calibrated rubrics, privacy-safe traces, token and cost evidence, and explicit residual uncertainty.',
        [
          'agentpy-direct-indirect-injection',
          'agentpy-provider-data-terms',
          'agentpy-eval-task-distribution',
          'agentpy-tool-selection-metrics',
          'agentpy-causal-agent-diagnosis',
        ]
      ),
      project(
        'agentpy-production-defense',
        'Production AI Agent Release, Recovery, and Residual-Risk Defense',
        'agentpy-release-recovery-defense',
        'A joint user, product, accessibility, security, privacy, legal, data, operations, finance, support, and incident board',
        'The board needs reconciled product, implementation, framework, provider, evaluation, security, privacy, accessibility, capacity, cost, canary, migration, kill-switch, rollback, recovery, support, and residual-risk evidence before release.',
        [
          'agentpy-representative-load-transfer',
          'agentpy-adk-confirmation-conformance',
          'agentpy-artifact-inspection',
          'agentpy-agent-release-gates',
          'agentpy-production-defense',
        ]
      ),
    ],
    examContext:
      'Unfamiliar agent cases spanning stakeholder value, workflow fit, risk, repository and dependency evidence, Python 3.14, Gemini model and Interactions API capability selection, provider ports and fakes, typed parts and state, structured output, Pydantic and JSON Schema, tool schemas and dispatch, least agency, complete function-call circulation, bounded loops, parallel calls, approvals, checkpoints and replay, context and memory, retries and idempotency, accessible event streaming, injection and exfiltration defense, provider data governance, deterministic and trajectory evals, rubrics and human calibration, OpenTelemetry, tokens, cost, latency, rate and cache control, ADK conformance, contained delegation, code and computer-use sandboxes, packaging, deployment, migration, canary, kill switch, rollback, recovery, support, and residual-risk defense with explicit browser and controlled production boundaries.',
    minimumQuestionBankSize: 950,
  },
  {
    researchedAt: RESEARCHED_AT,
    prerequisiteCourseIds: [
      'python-basics',
      'python-functional',
      'http-clients-python',
      'prompt-engineering-claude-codex',
      'agent-loops-goals',
      'git-basics',
    ],
  }
);
