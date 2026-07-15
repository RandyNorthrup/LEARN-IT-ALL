import { finalizeCourse, module, project, skill } from './course-config-helpers.mjs';

const REVIEWED_AT = '2026-07-14';
const RESEARCHED_AT = '2026-07-14T17:45:00.000Z';

function outcome(id, statement, misconception, knowledgeType = 'procedural', level = 'apply') {
  return skill(id, statement, misconception, knowledgeType, level);
}

function cicdModule(id, title, context, artifact, skills) {
  return {
    ...module(id, title, context, artifact, skills),
    contexts: {
      theory: context,
      workshop: `A delivery pairing session predicts each automation transition before producing the first working ${artifact} for ${title.toLowerCase()}.`,
      debug: `A release responder inherits a plausible but defective ${artifact}; preserve run evidence, isolate the first causal fault in ${title.toLowerCase()}, and retain a regression check.`,
      lab: `An independent delivery team receives an unfamiliar repository, event, runner, and trust constraint and must transfer ${title.toLowerCase()} into a new ${artifact}.`,
      review: `An operations handoff reconstructs ${title.toLowerCase()} from delayed run evidence, challenges one retained misconception, and revises the ${artifact} under changed load.`,
      quiz: `A release board compares near-miss decisions for ${title.toLowerCase()} and requires the learner to defend the smallest safe ${artifact}.`,
    },
  };
}

const modules = [
  cicdModule(
    'ci-delivery-outcomes-flow-evidence',
    'Continuous Delivery Outcomes, Flow, Feedback, and Evidence',
    'A civic TypeScript service ships manually, batches risky changes, measures only deployment count, and cannot connect a production incident to source, tests, artifact, approval, or rollback.',
    'delivery outcome and evidence map',
    [
      outcome(
        'ci-ci-cd-release-boundaries',
        'Distinguish continuous integration, delivery, deployment, release, and feature exposure by their automation, decision, and stakeholder boundaries.',
        'Continuous delivery means every successful commit must immediately receive production traffic.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'ci-feedback-batch-risk',
        'Relate batch size, queue time, feedback latency, failure isolation, recovery cost, and learning speed without treating deployment frequency as the objective.',
        'More pipeline stages always reduce delivery risk.',
        'strategic',
        'evaluate'
      ),
      outcome(
        'ci-value-stream-evidence-chain',
        'Trace requirement, source revision, review, checks, build inputs, immutable artifact, deployment, observation, and recovery evidence as one delivery chain.',
        'A green workflow run proves the deployed artifact came from the reviewed source.'
      ),
      outcome(
        'ci-dora-outcome-interpretation',
        'Interpret deployment frequency, lead time, change failure rate, recovery time, reliability, and contextual tradeoffs without gaming one metric.',
        'High deployment frequency alone proves delivery excellence.',
        'strategic',
        'evaluate'
      ),
      outcome(
        'ci-release-hypothesis-done',
        'Define an observable release hypothesis, risk budget, evidence owner, success and abort signals, and done condition before automating.',
        'Pipeline completion is the same as user-value completion.',
        'professional',
        'create'
      ),
    ]
  ),
  cicdModule(
    'gha-execution-model-contexts',
    'GitHub Actions Execution Model, Contexts, and State Boundaries',
    'A team confuses workflow, run, job, step, action, runner, shell, workspace, environment file, output, artifact, and cache state while debugging a missing build result.',
    'workflow execution and state trace',
    [
      outcome(
        'ci-workflow-run-job-step-model',
        'Trace event, workflow run, job graph, runner allocation, step process, action execution, and post-step cleanup for one commit.',
        'Every job in a workflow shares one runner filesystem and process environment.',
        'conceptual',
        'analyze'
      ),
      outcome(
        'ci-context-expression-env-timing',
        'Distinguish server-side contexts and expression evaluation from runner-side environment expansion, shell parsing, and process state.',
        'GitHub expressions and shell variables are interchangeable and evaluate at the same time.'
      ),
      outcome(
        'ci-workspace-output-artifact-cache-state',
        'Classify workspace files, step outputs, job outputs, environment files, artifacts, caches, summaries, logs, and external releases by scope and lifetime.',
        'A cache is a durable release artifact and can safely pass trusted executables between workflows.'
      ),
      outcome(
        'ci-action-types-runtime-boundary',
        'Compare JavaScript, Docker container, composite, and reusable workflow components by runtime, inputs, isolation, portability, and trust.',
        'A composite action runs on a separate runner and creates a security boundary.'
      ),
      outcome(
        'ci-run-identity-attempt-evidence',
        'Use repository, workflow ref, workflow SHA, run ID, run attempt, actor, triggering actor, event, ref, and SHA to identify exact execution evidence.',
        'A workflow name and commit branch uniquely identify one execution.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  cicdModule(
    'gha-workflow-syntax-expressions',
    'Workflow Syntax, Expressions, YAML, and Data Contracts',
    'A workflow parses but triggers unexpectedly, treats false as text, expands a multiline output incorrectly, inherits a permissive default, and hides a misspelled key.',
    'validated workflow data contract',
    [
      outcome(
        'ci-workflow-schema-top-level',
        'Author name, on, permissions, concurrency, env, defaults, jobs, and job-level contracts with explicit supported syntax.',
        'Valid YAML is necessarily a valid and intended GitHub Actions workflow.'
      ),
      outcome(
        'ci-yaml-scalars-multiline-keys',
        'Control YAML scalars, booleans, quoting, multiline blocks, reserved-looking keys, indentation, and serialization boundaries.',
        'Every YAML parser interprets the on key and boolean-like scalars identically.'
      ),
      outcome(
        'ci-expression-types-coercion-functions',
        'Reason about expression literals, loose equality, coercion, truthiness, functions, object filters, fromJSON, and toJSON without leaking data.',
        'Expression equality uses JavaScript strict equality and never coerces values.'
      ),
      outcome(
        'ci-context-availability-allowlist',
        'Select contexts only where the workflow syntax permits them and separate configuration-time from runner-time values.',
        'Every context is available in every workflow key.'
      ),
      outcome(
        'ci-workflow-static-validation',
        'Combine schema validation, action input review, expression linting, local deterministic inspection, changed-event fixtures, and GitHub-run evidence.',
        'A local workflow emulator proves hosted-runner, token, event, and service behavior.',
        'metacognitive',
        'evaluate'
      ),
    ]
  ),
  cicdModule(
    'gha-events-refs-trust-boundaries',
    'Events, Refs, SHAs, Forks, and Workflow Trust Boundaries',
    'A maintainer uses pull_request_target to check out and execute fork code with secrets, then trusts a workflow_run artifact because its producer finished successfully.',
    'event and revision trust policy',
    [
      outcome(
        'ci-event-payload-ref-sha',
        'Derive workflow source, checked-out revision, GITHUB_REF, GITHUB_SHA, actor, permissions, and payload from each trigger.',
        'push, pull_request, pull_request_target, and workflow_run use the same workflow file and SHA.'
      ),
      outcome(
        'ci-pr-merge-head-base-evidence',
        'Choose pull request merge, head, or base revision intentionally and state what integration or source claim each can prove.',
        'Testing only the pull request head proves it integrates with the current base branch.'
      ),
      outcome(
        'ci-fork-secret-token-approval-boundary',
        'Model fork approvals, withheld secrets, read-only tokens, compute abuse, contributor changes, and re-run authority.',
        'A maintainer re-run makes untrusted pull request code trusted.'
      ),
      outcome(
        'ci-pull-request-target-pwn-defense',
        'Keep pull_request_target work on trusted base code or inspect untrusted content strictly as data without executing its scripts, dependencies, actions, or artifacts.',
        'Checkout is harmless even when the next command executes files from the checked-out revision.',
        'strategic',
        'evaluate'
      ),
      outcome(
        'ci-workflow-run-artifact-trust',
        'Treat workflow_run, issue_comment, repository_dispatch, and downloaded artifacts according to producer identity, revision, permissions, and content trust.',
        'An artifact from a successful low-privilege workflow is safe to execute in a privileged workflow.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  cicdModule(
    'gha-runners-isolation-capacity',
    'Hosted and Self-Hosted Runners, Isolation, Capacity, and Compatibility',
    'A privileged self-hosted runner is reused for public pull requests, carries cloud credentials and Docker authority, drifts from its image contract, and queues releases behind unbounded jobs.',
    'runner isolation and capacity policy',
    [
      outcome(
        'ci-hosted-runner-image-contract',
        'Pin or record runner OS, architecture, installed software, action runtime, image release, and migration assumptions instead of trusting latest as immutable.',
        'ubuntu-latest identifies one permanent machine image.'
      ),
      outcome(
        'ci-self-hosted-runner-threat-model',
        'Threat-model persistence, workspace residue, credentials, network reachability, daemon sockets, labels, groups, and repository eligibility for self-hosted runners.',
        'A fresh workspace directory makes a reused self-hosted runner ephemeral.'
      ),
      outcome(
        'ci-ephemeral-runner-cleanup',
        'Design single-job ephemeral runner registration, identity, network segmentation, secret delivery, teardown, log retention, and orphan cleanup.',
        'Deleting a runner registration guarantees its host and credentials were destroyed.'
      ),
      outcome(
        'ci-runner-capacity-queue-cost',
        'Model concurrency, queue time, job duration, parallelism, rate limits, storage, egress, larger runners, and cost against feedback goals.',
        'Maximum matrix parallelism always minimizes lead time and cost.'
      ),
      outcome(
        'ci-runner-compatibility-action-node24',
        'Verify runner version compatibility for Node 24-based actions and plan staged upgrades, rollback, and GHES differences.',
        'Updating an action major version cannot require a newer runner service.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  cicdModule(
    'ci-node-typescript-reproducibility',
    'Node 24, TypeScript 7.0.2, TypeScript 6 API Compatibility, npm, and Reproducible Installs',
    'A TypeScript build uses floating Node and npm versions, npm install mutates the lockfile, lifecycle scripts gain network authority, and local generated files hide a clean-run failure.',
    'reproducible TypeScript build contract',
    [
      outcome(
        'ci-node-npm-typescript-version-contract',
        'Align Node 24, npm 11 or later, the TypeScript 7.0.2 native CLI, the TypeScript 6.0.2 compatibility API required by current tooling, package metadata, engines, action runtime, and local developer versions.',
        'The Node version bundled inside an action is the Node version used by project scripts.'
      ),
      outcome(
        'ci-npm-ci-lockfile-contract',
        'Use npm ci with a committed matching lockfile and committed install flags while detecting lock drift and registry changes.',
        'npm ci repairs a stale lockfile to match package.json.'
      ),
      outcome(
        'ci-install-script-network-risk',
        'Bound dependency lifecycle scripts, registry authentication, private package access, network egress, install auditing, and secret exposure.',
        'A lockfile prevents dependencies from executing install scripts or contacting the network.'
      ),
      outcome(
        'ci-clean-build-source-artifact-boundary',
        'Build from a clean checkout, exclude local residue, declare generated inputs, and compare packaged output with source and ignore rules.',
        'A successful local build proves a clean runner will produce the same artifact.'
      ),
      outcome(
        'ci-reproducibility-changed-environment',
        'Repeat installs and builds across cold cache, supported Node versions, locale, timezone, architecture, and changed dependency conditions.',
        'Matching application tests prove byte-identical or behaviorally equivalent builds.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  cicdModule(
    'ci-quality-gate-orchestration',
    'Quality Gate Orchestration, Failure Semantics, and Required Checks',
    'A pipeline runs formatter, lint, type, tests, and build under one continue-on-error step, reports green after skipped work, and protects the branch with a mutable job name.',
    'quality gate dependency graph',
    [
      outcome(
        'ci-gate-command-exit-contract',
        'Define each formatter, lint, type, test, build, security, and policy command with deterministic inputs, exit semantics, output, and owner.',
        'Printing an error is sufficient to fail a workflow step.'
      ),
      outcome(
        'ci-gate-order-parallelism',
        'Order cheap deterministic gates before costly work while parallelizing independent evidence and preserving causal diagnosis.',
        'Every gate must run sequentially to be trustworthy.'
      ),
      outcome(
        'ci-skipped-cancelled-neutral-failure',
        'Distinguish success, failure, cancelled, skipped, neutral, timed out, and continued failures in job and required-check policy.',
        'A workflow conclusion of success means every intended gate ran and passed.'
      ),
      outcome(
        'ci-required-check-stable-identity',
        'Design stable job names, required status checks, merge queues, branch rules, bypass authority, and migration without accidental deadlock.',
        'Renaming a required job automatically updates every repository rule.'
      ),
      outcome(
        'ci-gate-evidence-summary-ownership',
        'Publish concise annotations and summaries with exact command, revision, environment, failure owner, retained artifact, and rerun limits.',
        'Dumping complete logs is the clearest and safest failure handoff.',
        'professional',
        'create'
      ),
    ]
  ),
  cicdModule(
    'ci-testing-services-coverage',
    'Test Layers, Service Containers, Coverage, and Changed-Case Evidence',
    'A green unit suite mocks every boundary, integration tests share mutable state, service containers have no readiness check, and coverage increases while production behavior regresses.',
    'layered test and service evidence plan',
    [
      outcome(
        'ci-test-layer-risk-selection',
        'Allocate unit, component, integration, contract, end-to-end, accessibility, security, and smoke tests from failure risk and feedback cost.',
        'More end-to-end tests always produce more confidence than lower-level tests.'
      ),
      outcome(
        'ci-service-container-health-isolation',
        'Configure service image identity, ports, health, credentials, network scope, per-job state, migrations, fixtures, and deterministic teardown.',
        'Starting a service container means it is ready for tests.'
      ),
      outcome(
        'ci-test-sharding-order-independence',
        'Shard tests without duplicate or missing cases and detect order, time, locale, seed, port, and shared-state dependence.',
        'A test that passes alone and in one shard is deterministic.'
      ),
      outcome(
        'ci-coverage-mutation-changed-lines',
        'Interpret statement, branch, function, changed-line, mutation, and risk coverage as evidence with explicit exclusions and blind spots.',
        'A higher coverage percentage proves stronger assertions.'
      ),
      outcome(
        'ci-test-report-quarantine-policy',
        'Retain machine-readable reports, failed-case diagnostics, traces, screenshots, retries, quarantine owner, expiry, and re-entry criteria.',
        'Retrying until green is an acceptable repair for a flaky required test.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  cicdModule(
    'gha-matrices-needs-outputs-artifacts',
    'Matrices, Job Dependencies, Outputs, and Immutable Artifacts',
    'A matrix silently excludes a supported platform, multiple jobs overwrite one artifact name, downstream work trusts a string output, and executable permissions disappear after archive transfer.',
    'matrix and artifact handoff contract',
    [
      outcome(
        'ci-matrix-axis-coverage',
        'Design include and exclude rules, experimental axes, fail-fast, max-parallel, names, and support-policy coverage without combinatorial waste.',
        'Every matrix combination provides independent useful coverage.'
      ),
      outcome(
        'ci-needs-if-result-propagation',
        'Trace needs dependencies, job results, always and failure conditions, skipped ancestors, and cleanup behavior through a directed graph.',
        'A job with if always runs even when a required predecessor is skipped.'
      ),
      outcome(
        'ci-step-job-output-contract',
        'Write multiline-safe step outputs, promote validated job outputs, handle size and secret redaction limits, and parse downstream types explicitly.',
        'Job outputs preserve native boolean, number, array, and object types.'
      ),
      outcome(
        'ci-artifact-identity-digest-retention',
        'Upload unique immutable artifacts with digest, producer, revision, content scope, retention, hidden-file policy, and no-secret review.',
        'An artifact name is an immutable identity and its contents can be appended across jobs.'
      ),
      outcome(
        'ci-artifact-download-permission-integrity',
        'Download by expected run and artifact identity, verify digest and file layout, preserve permissions deliberately, and treat cross-run contents as untrusted.',
        'A successful download proves the artifact is safe to execute.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  cicdModule(
    'gha-cache-performance-integrity',
    'Cache Performance, Scope, Integrity, and Poisoning Defense',
    'A privileged release restores an executable cache written from a fork, accepts broad restore keys, hides cold-install failures, and attributes network time to compilation.',
    'cache threat and measurement policy',
    [
      outcome(
        'ci-cache-artifact-distinction',
        'Separate disposable performance caches from immutable artifacts, job outputs, external registries, and release records by trust and lifetime.',
        'A cache hit proves the restored content belongs to the current revision.'
      ),
      outcome(
        'ci-cache-key-version-scope',
        'Construct keys from OS, architecture, tool, dependency lock, relevant configuration, and cache version with bounded restore fallback.',
        'A branch name alone is a safe dependency cache key.'
      ),
      outcome(
        'ci-cache-poisoning-trust-boundary',
        'Restrict who can save or restore executable caches across fork, branch, event, workflow, and privilege boundaries.',
        'Read-only repository access implies cache writes cannot affect trusted workflows.'
      ),
      outcome(
        'ci-setup-node-package-cache',
        'Use setup-node dependency caching without caching node_modules and disable automatic caching in privileged workflows when risk outweighs speed.',
        'setup-node caches the installed node_modules directory.'
      ),
      outcome(
        'ci-cold-warm-performance-evidence',
        'Measure cold and warm dependency, build, test, upload, queue, and critical-path time while preserving a regular cold-path regression run.',
        'A warm-cache improvement proves the complete pipeline is faster.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  cicdModule(
    'gha-concurrency-timeouts-flake-control',
    'Concurrency, Cancellation, Timeouts, Retries, and Flake Control',
    'Two deployments race for one environment, an older run completes last, cancelled jobs skip cleanup, a hung process consumes the runner limit, and retries erase the first failure.',
    'bounded execution and concurrency policy',
    [
      outcome(
        'ci-concurrency-group-cancel-policy',
        'Build concurrency keys from workflow, branch, pull request, service, or environment identity and choose cancellation from business semantics.',
        'cancel-in-progress is always safe for tests and deployments.'
      ),
      outcome(
        'ci-stale-run-deployment-race',
        'Prevent stale runs and out-of-order artifacts from overwriting newer deployments through revision, environment, and compare-before-mutate checks.',
        'Workflow runs finish in commit order.'
      ),
      outcome(
        'ci-job-step-timeout-process-cleanup',
        'Set bounded job, step, command, network, and shutdown timeouts while terminating child processes and retaining partial evidence.',
        'A job timeout guarantees every spawned process and external mutation was cleaned up.'
      ),
      outcome(
        'ci-retry-idempotency-first-failure',
        'Retry only classified transient operations with idempotency, attempt limits, backoff, first-failure preservation, and duplicate-side-effect defense.',
        'Any failed command is safer when automatically retried.'
      ),
      outcome(
        'ci-flake-detection-quarantine-repair',
        'Detect nondeterminism through repeated changed schedules, classify cause, quarantine with owner and expiry, and require repaired regression evidence.',
        'A flaky check should be removed from required status until someone has time to investigate.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  cicdModule(
    'gha-secrets-tokens-injection',
    'Secrets, GITHUB_TOKEN, Variables, Permissions, and Injection Defense',
    'A workflow interpolates an issue title into shell, grants write-all globally, exposes a secret to an untrusted build, prints a derived credential, and mistakes masking for access control.',
    'workflow authority and data-flow policy',
    [
      outcome(
        'ci-secret-variable-config-classification',
        'Classify public configuration, non-secret variables, sensitive values, credentials, OIDC identity, and derived secrets by authority and lifetime.',
        'Repository variables are encrypted secrets because they are configured in the same interface.'
      ),
      outcome(
        'ci-github-token-least-permission',
        'Set default no or read authority and grant job-scoped GITHUB_TOKEN permissions only for exact API mutations.',
        'Not referencing github.token prevents actions and scripts from using it.'
      ),
      outcome(
        'ci-untrusted-context-shell-injection',
        'Pass untrusted context through environment or structured input, quote at the receiving language, validate shape, and avoid generated shell or code.',
        'Quoting a GitHub expression inside a shell string prevents command injection.'
      ),
      outcome(
        'ci-secret-redaction-derived-leak',
        'Avoid command-line, environment, cache, artifact, summary, process, debug, and structured-output leaks and explicitly mask derived sensitive values.',
        'GitHub automatically masks every encoded or transformed form of a secret.'
      ),
      outcome(
        'ci-secret-scope-rotation-incident',
        'Limit secrets by repository, environment, job, event, and actor; rotate on exposure; revoke sessions; preserve redacted evidence; and test absence.',
        'Deleting a workflow log completes secret incident response.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  cicdModule(
    'gha-actions-dependencies-supply-chain',
    'Third-Party Actions, Pinning, Dependency Trust, and Workflow CodeQL',
    'A workflow uses mutable tags from unknown publishers, executes a transitive action update without review, allows untrusted workflow edits, and has no inventory or emergency revocation path.',
    'action dependency and update policy',
    [
      outcome(
        'ci-action-source-runtime-authority-review',
        'Review action publisher, source, bundled code, runtime, inputs, outputs, token access, network behavior, post steps, advisories, and maintenance.',
        'Marketplace listing or verified creator status makes an action safe for every permission level.'
      ),
      outcome(
        'ci-action-full-sha-pin-update',
        'Pin third-party actions to reviewed full commit SHAs, retain readable version comments, and automate reviewed update proposals.',
        'A major version tag is immutable because maintainers intend compatibility.'
      ),
      outcome(
        'ci-transitive-action-dependency-inventory',
        'Inventory direct, reusable, composite, Docker, and nested action dependencies plus their effective privilege and provenance.',
        'Only uses lines in the top-level workflow contribute supply-chain risk.'
      ),
      outcome(
        'ci-workflow-change-ownership-protection',
        'Protect workflow and action code with CODEOWNERS, required review, branch rules, environment separation, and constrained bypass.',
        'General code review rules always apply equally to workflow-file changes.'
      ),
      outcome(
        'ci-actions-codeql-policy-enforcement',
        'Use workflow schema checks, policy engines, dependency review, secret scanning, and CodeQL for Actions to detect unsafe patterns and exceptions.',
        'Static analysis proves a workflow is safe under every event payload and runner condition.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  cicdModule(
    'gha-reuse-composite-workflow-contracts',
    'Reusable Workflows, Composite Actions, Interfaces, and Permission Flow',
    'Teams copy release YAML across repositories; a shared workflow changes an input silently, accepts all secrets, escalates permissions, and hides which workflow revision produced an artifact.',
    'versioned reusable automation contract',
    [
      outcome(
        'ci-reuse-component-selection',
        'Choose reusable workflow, composite action, JavaScript action, Docker action, script, or package based on job boundary, portability, testing, and authority.',
        'Reusable workflows and composite actions are interchangeable wrappers.'
      ),
      outcome(
        'ci-workflow-call-typed-interface',
        'Define workflow_call inputs, secrets, outputs, validation, defaults, required values, and failure semantics as a versioned interface.',
        'Reusable workflow inputs accept arbitrary nested objects with runtime type safety.'
      ),
      outcome(
        'ci-permission-secret-inheritance-flow',
        'Trace caller and called-workflow permissions, secrets inheritance, environment secret boundaries, nested depth, and non-escalation.',
        'A called workflow can increase GITHUB_TOKEN permissions beyond the caller.'
      ),
      outcome(
        'ci-reusable-workflow-pin-provenance',
        'Pin external reusable workflows, record workflow ref and SHA, verify producer identity, and update through compatibility tests.',
        'Referencing a workflow on the default branch preserves reproducible delivery.'
      ),
      outcome(
        'ci-shared-automation-evolution',
        'Evolve shared automation through semantic interface changes, canaries, deprecation, consumer inventory, rollback, telemetry, and migration ownership.',
        'Centralizing a workflow automatically eliminates configuration drift.',
        'professional',
        'create'
      ),
    ]
  ),
  cicdModule(
    'ci-docker-build-test-cache',
    'Docker Buildx CI, Tests, Context, Cache, and Multi-Platform Output',
    'A CI build sends the wrong Git context, ignores a generated file, leaks a credential through build args, trusts a warm cache, skips container behavior tests, and pushes before validation.',
    'container build and test workflow',
    [
      outcome(
        'ci-buildx-action-context-contract',
        'Configure official Docker setup and build actions with explicit Git or path context, Dockerfile, target, platforms, inputs, and output mode.',
        'A file changed by an earlier step is always included when build-push-action uses its default Git context.'
      ),
      outcome(
        'ci-docker-build-secret-cache-boundary',
        'Use secret mounts, scoped cache backends, deterministic keys, trusted writers, and no credential-bearing ARG, layer, log, or attestation.',
        'Build arguments are an acceptable way to pass secrets because final ENV can be unset.'
      ),
      outcome(
        'ci-container-test-before-push',
        'Test image configuration, non-root and read-only behavior, health, signals, resources, network, changed config, and failure before registry mutation.',
        'A successful Docker build proves the container starts and behaves correctly.'
      ),
      outcome(
        'ci-multiplatform-builder-test-evidence',
        'Build declared platforms with Buildx, distinguish native and emulated execution, test each output, and verify the manifest index and platform digests.',
        'One amd64 test proves an arm64 image built under emulation works.'
      ),
      outcome(
        'ci-build-record-summary-debug',
        'Retain build record, summary, stages, timings, cache use, inputs, warnings, digest, and controlled reproduction instructions without secrets.',
        'A smaller final image proves the build pipeline became faster.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  cicdModule(
    'ci-image-release-attestations',
    'Registry Identity, SBOM, Provenance, Attestations, and Promotion',
    'A release promotes a mutable tag, rebuilds for production, stores an SBOM separately from the image, generates provenance with leaked build args, and never verifies attestations downstream.',
    'attested image release record',
    [
      outcome(
        'ci-image-tag-digest-promotion',
        'Generate human-readable tags while binding promotion, deployment, rollback, and evidence to one registry digest.',
        'A protected semantic version tag is equivalent to an immutable digest.'
      ),
      outcome(
        'ci-sbom-provenance-attestation-contract',
        'Generate image SBOM and max-appropriate provenance, identify builder, source, inputs, subject digest, limits, and registry attachment.',
        'An SBOM proves dependencies are safe and provenance proves source code is benign.'
      ),
      outcome(
        'ci-github-artifact-attest-action',
        'Use actions/attest with least permissions and exact subject path or digest while recognizing plan, repository visibility, and registry constraints.',
        'Creating an attestation automatically enforces it for consumers.'
      ),
      outcome(
        'ci-attestation-verification-policy',
        'Verify signature, issuer, subject, source repository, workflow identity, builder, digest, predicate, and policy before promotion or deployment.',
        'A valid signature is sufficient even when its identity and subject are unexpected.'
      ),
      outcome(
        'ci-slsa-level-claim-boundary',
        'Map actual build and source controls to SLSA 1.2 tracks and levels without claiming transitive dependency or code-quality guarantees.',
        'SLSA Build Level 3 means all dependencies are secure and the software is vulnerability-free.',
        'strategic',
        'evaluate'
      ),
    ]
  ),
  cicdModule(
    'cd-environments-oidc-cloud-auth',
    'Deployment Environments, OIDC, Workload Identity, and Cloud Authority',
    'A deployment uses a long-lived service-account key in repository secrets, trusts any branch subject, grants project-wide admin, bypasses environment review, and leaves credentials reusable after the job.',
    'environment and federated identity policy',
    [
      outcome(
        'ci-environment-protection-secret-scope',
        'Use named environments for approvals, branch and tag policies, scoped secrets, wait rules, URL evidence, and deployment history.',
        'An environment name alone creates an approval gate and isolates every secret.'
      ),
      outcome(
        'ci-github-oidc-claims-permission',
        'Request id-token write only in the deployment job and validate issuer, audience, subject, workflow ref, repository identity, event, and environment claims.',
        'id-token write grants direct write access to cloud resources.'
      ),
      outcome(
        'ci-gcp-workload-identity-federation',
        'Exchange GitHub OIDC identity through a constrained Google Workload Identity Provider and service account without storing a key.',
        'Workload Identity Federation is safe with an unrestricted repository-name subject condition.'
      ),
      outcome(
        'ci-cloud-least-privilege-service-account',
        'Separate build, registry, deploy, runtime, traffic, and rollback identities and grant resource-scoped roles for exact operations.',
        'Cloud Run Admin alone is the complete and least-privilege deployment permission set.'
      ),
      outcome(
        'ci-auth-lifetime-audit-revocation',
        'Bound token lifetime, exported credentials, audience, session, audit correlation, cleanup, trust-policy changes, and incident revocation.',
        'Short-lived credentials do not require monitoring or an incident response plan.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  cicdModule(
    'cd-cloud-run-progressive-delivery',
    'Cloud Run Revisions, Validation, Traffic, Rollback, and Recovery',
    'A pipeline deploys latest, routes all traffic before readiness and smoke checks, changes IAM with application release, cannot identify the prior digest, and calls redeployment a rollback.',
    'progressive Cloud Run delivery runbook',
    [
      outcome(
        'ci-cloud-run-revision-image-contract',
        'Deploy one verified image digest with explicit service, region, configuration, runtime identity, revision suffix, labels, and no-traffic option.',
        'Deploying the same image tag guarantees the same Cloud Run revision contents.'
      ),
      outcome(
        'ci-pretraffic-smoke-readiness',
        'Validate revision readiness, configuration, identity, logs, authenticated smoke behavior, changed inputs, and dependency failure before traffic.',
        'Cloud Run accepting a deployment proves the application is ready for production traffic.'
      ),
      outcome(
        'ci-traffic-split-canary-signals',
        'Move bounded traffic by revision or tag, define observation window, compare user and system signals, and stop on explicit abort conditions.',
        'A one-percent canary receives a representative one percent of every user and workload type.'
      ),
      outcome(
        'ci-cloud-run-rollback-rollforward',
        'Restore traffic to a known healthy revision without rebuilding, verify recovery, preserve failed evidence, and coordinate incompatible data changes.',
        'Redeploying old source is the fastest and most faithful rollback.'
      ),
      outcome(
        'ci-deployment-iam-separation',
        'Keep application deployment separate from public access and IAM mutation, with explicit ownership, review, audit, and recovery for each.',
        'The deployment workflow should automatically make a service public for convenience.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  cicdModule(
    'cd-releases-packages-change-control',
    'Release Automation, npm Trusted Publishing, and Change Control',
    'A release is triggered from an unreviewed tag, rebuilds after approval, publishes npm with a long-lived token, mixes changelog generation with mutation, and cannot prove package or image provenance.',
    'multi-artifact release and publication policy',
    [
      outcome(
        'ci-release-version-source-authority',
        'Derive version, tag, changelog, release notes, source commit, and authorization from a protected reviewed release process.',
        'A signed tag proves the tagged source passed current required checks.'
      ),
      outcome(
        'ci-build-once-promote-many',
        'Build once from reviewed source, retain immutable artifacts and attestations, approve promotion, and avoid environment-specific rebuilds.',
        'Rebuilding for each environment improves reproducibility because configuration differs.'
      ),
      outcome(
        'ci-npm-trusted-publishing-oidc',
        'Publish with npm trusted publishing on supported hosted runners using exact repository, workflow, environment, id-token permission, and npm 11.5.1 or later.',
        'OIDC trusted publishing also authenticates private dependency installation.'
      ),
      outcome(
        'ci-package-provenance-verification',
        'Verify package contents, pack list, version, repository identity, source commit, workflow, transparency entry, signatures, and provenance before adoption.',
        'npm provenance guarantees a published package contains no malicious behavior.'
      ),
      outcome(
        'ci-release-approval-separation-duty',
        'Separate author, reviewer, builder, approver, publisher, rollback authority, emergency bypass, and audit evidence according to risk.',
        'More manual approval steps always improve release safety.',
        'professional',
        'evaluate'
      ),
    ]
  ),
  cicdModule(
    'ci-observability-incidents-governance',
    'Pipeline Observability, Incident Response, Governance, and Improvement',
    'Delivery slows while storage cost grows, teams rerun failures without diagnosis, logs expose identifiers, exceptions never expire, and no one can reconstruct which change reached which users.',
    'delivery operations and governance defense',
    [
      outcome(
        'ci-pipeline-telemetry-cardinality-privacy',
        'Instrument queue, duration, critical path, cache, failure class, artifact, deployment, and recovery with bounded cardinality and privacy.',
        'Recording every branch, commit, actor, test, and error as metric labels gives the best observability.'
      ),
      outcome(
        'ci-run-log-artifact-retention-cost',
        'Set log, artifact, cache, attestation, test-report, and deployment-evidence retention from recovery, audit, privacy, quota, and cost needs.',
        'Longer retention is always safer because more evidence is available.'
      ),
      outcome(
        'ci-first-causal-failure-debugging',
        'Reconstruct event, workflow version, runner, inputs, dependency graph, first causal failure, retries, side effects, and downstream state before rerunning.',
        'The last red step in the UI is necessarily the root cause.'
      ),
      outcome(
        'ci-delivery-incident-response',
        'Contain credentials and mutations, stop unsafe workflows, preserve redacted evidence, restore a known artifact, notify owners, and retain regression controls.',
        'Cancelling the active workflow fully contains a delivery incident.'
      ),
      outcome(
        'ci-policy-exception-continuous-improvement',
        'Govern required workflows, allowed actions, runner groups, permissions, attestations, exceptions, expiry, drills, metrics, and risk-based improvement.',
        'A centrally mandated pipeline template can replace local ownership and learning.',
        'professional',
        'create'
      ),
    ]
  ),
];

export const cicdGithubActionsConfig = finalizeCourse(
  {
    id: 'cicd-github-actions',
    title: 'Secure CI/CD with GitHub Actions, TypeScript, Docker, and Cloud Run',
    version: '2026.07',
    audience: {
      description:
        'Developers and delivery engineers who can build TypeScript and Docker projects and need to design, secure, debug, measure, and defend production CI/CD systems.',
      entryKnowledge: [
        'Demonstrate Git Foundations, Repository Quality Gates, Modern TypeScript, and Modern Docker outcomes or equivalent evidence.',
        'Read YAML, TypeScript, package manifests, Dockerfiles, HTTP results, and cloud identity policies.',
      ],
      deviceConstraints: [
        'Browser labs analyze workflows, event payloads, dependency graphs, manifests, policies, run evidence, and release records deterministically; learner input never reaches GitHub Actions, a runner, Docker daemon, cloud API, secret store, registry, or host command execution.',
        'Full transfer work requires an authorized disposable repository, isolated runner or hosted test context, non-production registry, and sandbox Cloud Run project with budget and cleanup controls.',
      ],
      accessibilityAssumptions: [
        'Every workflow graph, job state, log, matrix, artifact record, security decision, deployment timeline, and metric requires structured text, keyboard operation, announced status, and non-color-only meaning.',
      ],
    },
    scope: {
      includes: [
        'Continuous delivery outcomes, GitHub Actions execution, workflow syntax, expressions, events, refs, forks, runners, state, concurrency, caching, artifacts, and reusable automation',
        'Node 24, the TypeScript 7.0.2 native CLI, TypeScript 6.0.2 API compatibility tooling, npm reproducibility, layered tests, quality gates, matrices, failure semantics, diagnostics, observability, and delivery improvement',
        'Workflow permissions, secrets, injection defense, action dependencies, full-SHA pinning, CodeQL for Actions, OIDC, SLSA 1.2, SBOM, provenance, attestations, and verified promotion',
        'Docker Buildx CI, npm trusted publishing, Google Workload Identity Federation, Cloud Run revisions, progressive traffic, rollback, incident response, and governed production transfer',
      ],
      excludes: [
        'Treating deterministic browser review as proof of hosted runners, GitHub tokens, Docker builds, registries, OIDC exchange, Google IAM, Cloud Run, network behavior, production capacity, or billing',
        'Replacing the prerequisite courses that teach Git, TypeScript language design, individual repository gates, Docker internals, Kubernetes, Terraform, or provider-wide cloud administration',
      ],
      nextCourses: ['terraform-basics', 'ansible-basics', 'build-pubsub-typescript'],
    },
    sources: [
      {
        title: 'ACM/IEEE-CS/AAAI Computer Science Curricula 2023',
        authority: 'curriculum-framework',
        url: 'https://csed.acm.org/final-report/',
        version: 'CS2023 final report, 2024 publication files',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls institutional software engineering, distributed systems, security, testing, professional practice, and systems-operation breadth.',
      },
      {
        title: 'GitHub Actions Concepts, Workflow Syntax, Contexts, Events, and Runners',
        authority: 'official-docs',
        url: 'https://docs.github.com/en/actions/reference',
        version: 'GitHub Actions documentation, current 2026-07-14',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls workflow execution, YAML, expressions, contexts, events, jobs, matrices, outputs, artifacts, caches, concurrency, reuse, runners, environments, and limits.',
      },
      {
        title: 'GitHub Actions Secure Use, OIDC, Tokens, and Artifact Attestations',
        authority: 'official-docs',
        url: 'https://docs.github.com/en/actions/concepts/security',
        version: 'GitHub Actions security documentation, current 2026-07-14',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls event trust, pull_request_target, untrusted input, permissions, secrets, runner risk, OIDC claims, attestations, and incident boundaries.',
      },
      {
        title: 'Official GitHub Actions Releases and Runtime Contracts',
        authority: 'official-docs',
        url: 'https://github.com/actions/checkout/releases',
        version:
          'checkout 7.0.0, setup-node 7.0.0, upload-artifact 7.0.1, download-artifact 8.0.1, attest 4.1.1',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls current major versions, immutable action releases, Node 24 runner compatibility, artifact immutability and digests, and attestation behavior.',
      },
      {
        title: 'Node.js and npm Automated Build Documentation',
        authority: 'official-docs',
        url: 'https://nodejs.org/en/about/previous-releases',
        version: 'Node 24 LTS and npm 11 or later, current 2026-07-14',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls supported runtime, lockfiles, npm ci, package scripts, trusted publishing, signatures, and provenance boundaries.',
      },
      {
        title: 'TypeScript 7.0 Native Compiler Release and TypeScript 6 Compatibility Contract',
        authority: 'official-docs',
        url: 'https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/',
        version:
          'TypeScript 7.0.2 native compiler and @typescript/typescript6 6.0.2 compatibility package',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls the native compiler, missing TypeScript 7 programmatic API, side-by-side tsc6 and TypeScript 6 API tooling, compiler defaults, migration, performance, and compatibility evidence.',
      },
      {
        title: 'Docker Build GitHub Actions and Attestations',
        authority: 'official-docs',
        url: 'https://docs.docker.com/build/ci/github-actions/',
        version: 'build-push 7, setup-buildx 4, metadata 6, login 4, current 2026-07-14',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls Buildx setup, contexts, caching, outputs, summaries, registry identity, SBOM, provenance, and secret handling.',
      },
      {
        title: 'SLSA Supply-Chain Levels and Provenance Specification',
        authority: 'standard',
        url: 'https://slsa.dev/spec/v1.2/',
        version: 'SLSA 1.2 approved specification',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls build and source tracks, levels, provenance, verification, threat claims, and explicit non-transitive boundaries.',
      },
      {
        title: 'npm Trusted Publishing and Package Provenance',
        authority: 'official-docs',
        url: 'https://docs.npmjs.com/trusted-publishers/',
        version: 'npm trusted publishing with npm 11.5.1 or later, current 2026-07-14',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls OIDC publication, supported runners, workflow identity, token removal, staged publishing, package provenance, and limitations.',
      },
      {
        title: 'Google GitHub Actions Authentication and Cloud Run Deployment',
        authority: 'official-docs',
        url: 'https://github.com/google-github-actions/deploy-cloudrun',
        version: 'google-github-actions auth 3 and deploy-cloudrun 3, current 2026-07-14',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls Workload Identity Federation, service-account authority, action inputs, deployment output, IAM separation, and Node 24 action runtime.',
      },
      {
        title: 'Google Cloud Run Deployment, Revisions, Traffic, and Rollback',
        authority: 'official-docs',
        url: 'https://docs.cloud.google.com/run/docs/rollouts-rollbacks-traffic-migration',
        version: 'Cloud Run documentation, current 2026-07-14',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls revision identity, no-traffic deployment, readiness, tags, gradual traffic, rollback, IAM, service identity, and recovery.',
      },
      {
        title: 'NIST Secure Software Development Framework',
        authority: 'standard',
        url: 'https://csrc.nist.gov/pubs/sp/800/218/final',
        version: 'NIST SP 800-218 SSDF 1.1',
        reviewedAt: REVIEWED_AT,
        scope:
          'Controls risk-based preparation, software protection, secure production, vulnerability response, evidence, and continuous improvement.',
      },
    ],
    sharedRequirements: [
      'Every activity retrieves earlier Git, quality-gate, TypeScript, Docker, accessibility, security, testing, and evidence habits before adding a delivery-system boundary.',
      'Browser work is deterministic inspection only. Live GitHub, runner, Docker, registry, OIDC, cloud, deployment, traffic, and failure behavior is always a named authorized transfer gate.',
      'Passing work requires exact event, revision, workflow, runner, permissions, immutable artifact, changed-case, failure, repair, rollback, and residual-limit evidence appropriate to the competency.',
    ],
    modules,
    projects: [
      project(
        'ci-trust-runner-map',
        'Fork-Safe CI Trust and Runner Map',
        'gha-runners-isolation-capacity',
        'An open-source public-service team',
        'The team needs a fork-safe workflow, exact event and revision evidence, least authority, isolated runners, bounded capacity, failure diagnosis, and an accessible execution map.',
        [
          'ci-value-stream-evidence-chain',
          'ci-pull-request-target-pwn-defense',
          'ci-self-hosted-runner-threat-model',
          'ci-runner-capacity-queue-cost',
        ]
      ),
      project(
        'ci-typescript-quality-pipeline',
        'Reproducible TypeScript Quality Pipeline',
        'gha-concurrency-timeouts-flake-control',
        'A community scheduling API team',
        'The team needs clean Node and TypeScript builds, layered gates and tests, matrices, immutable reports, safe caching, cancellation, timeout, and flake evidence under changed environments.',
        [
          'ci-npm-ci-lockfile-contract',
          'ci-required-check-stable-identity',
          'ci-artifact-identity-digest-retention',
          'ci-flake-detection-quarantine-repair',
        ]
      ),
      project(
        'ci-attested-container-release',
        'Attested Multi-Platform Container Release',
        'ci-image-release-attestations',
        'A health-information ingestion team',
        'The team needs a fork-safe, digest-bound Buildx release with platform tests, scoped cache, SBOM, provenance, attestation verification, and a defended SLSA claim.',
        [
          'ci-action-full-sha-pin-update',
          'ci-docker-build-secret-cache-boundary',
          'ci-multiplatform-builder-test-evidence',
          'ci-attestation-verification-policy',
        ]
      ),
      project(
        'ci-cloud-run-progressive-release',
        'Federated Cloud Run Progressive Release',
        'cd-cloud-run-progressive-delivery',
        'A regional emergency-status service',
        'The service needs environment approval, GitHub OIDC, constrained Google identity, digest deployment with no traffic, smoke checks, a canary, abort signals, rollback, and IAM separation.',
        [
          'ci-github-oidc-claims-permission',
          'ci-gcp-workload-identity-federation',
          'ci-traffic-split-canary-signals',
          'ci-cloud-run-rollback-rollforward',
        ]
      ),
      project(
        'ci-production-delivery-defense',
        'Production Delivery System and Incident Defense',
        'ci-observability-incidents-governance',
        'An engineering, security, accessibility, and operations review board',
        'The board needs a defended source-to-user chain, reusable automation, trusted npm and image publication, governed approvals, observable delivery, credential containment, artifact rollback, and expiring exceptions.',
        [
          'ci-build-once-promote-many',
          'ci-npm-trusted-publishing-oidc',
          'ci-delivery-incident-response',
          'ci-policy-exception-continuous-improvement',
        ]
      ),
    ],
    examContext:
      'Unfamiliar CI/CD outcome, GitHub Actions execution, syntax, event trust, runner, TypeScript, testing, artifact, cache, concurrency, permission, action supply-chain, reuse, Docker, attestation, OIDC, Cloud Run, release, incident, and governance cases requiring deterministic evidence plus explicit live-system transfer limits.',
    minimumQuestionBankSize: 600,
  },
  {
    researchedAt: RESEARCHED_AT,
    prerequisiteCourseIds: [
      'git-basics',
      'repository-quality-gates',
      'typescript-basics',
      'docker-basics',
    ],
  }
);
