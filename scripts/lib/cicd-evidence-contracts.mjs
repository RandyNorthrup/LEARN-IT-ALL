const MODULE_EVIDENCE = {
  'ci-delivery-outcomes-flow-evidence': {
    artifact: 'delivery-evidence.yaml',
    change:
      'hypothesis: safer-status-release\nsource-revision: reviewed-sha\nchecks: required-and-observed\nartifact: immutable-digest\ndeployment: revision-identity\nuser-signal: successful-status-read\nabort-signal: error-budget-breach\nrecovery: prior-digest',
    verify:
      'review source-to-user evidence chain and calculate lead time failure and recovery boundaries',
    failure:
      'Reject deployment count as value, green checks as provenance, or pipeline completion as user outcome.',
    repair:
      'Link reviewed source, exact checks, immutable artifact, observed deployment, user signal, abort decision, and recovery evidence.',
    feature: '(?:source-revision:\\s*reviewed-sha|user-signal|abort-signal)',
  },
  'gha-execution-model-contexts': {
    artifact: 'execution-trace.yaml',
    change:
      'event: pull_request\nworkflow-ref: owner/repo/.github/workflows/ci.yml@refs/pull/42/merge\nrun-id: 8842\nrun-attempt: 2\njob-runner: fresh-ubuntu-24.04\nstep-process: isolated-shell\nstate-handoff: validated-job-output\nretained-artifact: test-report-digest',
    verify:
      'compare event payload workflow ref workflow sha run id attempt runner and artifact metadata',
    failure:
      'Reject shared-runner assumptions, branch-only identity, or cache and artifact state treated as equivalent.',
    repair:
      'Trace server and runner evaluation, name each state lifetime, and retain exact run and artifact identity.',
    feature: '(?:workflow-ref:|run-attempt:|state-handoff:)',
  },
  'gha-workflow-syntax-expressions': {
    artifact: 'workflow-contract.yaml',
    change:
      'name: verified-ci\non-events: [pull_request, push]\npermissions: contents-read\nconcurrency: revision-scoped\nexpression-input: parsed-with-fromJSON\nshell-input: validated-environment\nschema: action-inputs-reviewed\nchanged-event-fixture: fork-pull-request',
    verify:
      'validate workflow schema expressions context availability action inputs and changed event fixtures',
    failure:
      'Reject valid-YAML-only review, implicit coercion, unavailable contexts, or direct untrusted expression interpolation.',
    repair:
      'Validate workflow semantics, parse explicit types, move untrusted values through data boundaries, and test changed payloads.',
    feature: '(?:permissions:\\s*contents-read|parsed-with-fromJSON|changed-event-fixture)',
  },
  'gha-events-refs-trust-boundaries': {
    artifact: 'event-trust-policy.yaml',
    change:
      'event: pull_request\nworkflow-source: merge-commit\ncheckout-revision: pull-request-merge-sha\ntoken: read-only\nsecrets: withheld\nuntrusted-code: isolated-execution\nprivileged-followup: data-only\nproducer-proof: run-id-and-workflow-sha',
    verify:
      'compare pull_request pull_request_target workflow_run refs SHAs tokens secrets and checked-out code',
    failure:
      'Reject fork code under pull_request_target secrets, maintainer rerun as trust, or successful artifacts as executable proof.',
    repair:
      'Use low-privilege pull_request execution, separate privileged follow-up, and validate producer and content strictly as data.',
    feature: '(?:token:\\s*read-only|secrets:\\s*withheld|privileged-followup:\\s*data-only)',
  },
  'gha-runners-isolation-capacity': {
    artifact: 'runner-policy.yaml',
    change:
      'runner-image: ubuntu-24.04-reviewed\naction-runtime: node24\nminimum-runner: 2.327.1-or-later\nuntrusted-work: github-hosted-ephemeral\nself-hosted: trusted-release-only\nnetwork: segmented\ncleanup: single-job-destroy\ncapacity: queue-budget-and-max-parallel',
    verify:
      'inspect runner version image release labels groups network authority queue duration and teardown evidence',
    failure:
      'Reject latest as immutable, reused public-PR runners, workspace cleanup as host destruction, or unbounded parallelism.',
    repair:
      'Record compatibility, isolate untrusted work, destroy ephemeral capacity, segment authority, and measure queue and cost.',
    feature: '(?:node24|2\\.327\\.1-or-later|single-job-destroy)',
  },
  'ci-node-typescript-reproducibility': {
    artifact: 'typescript-build.yaml',
    change:
      'node: 24-lts\nnpm: 11-or-later\ntypescript-native: 7.0.2\ntypescript-api-compatibility: 6.0.2\ntsc: native-compiler\napi-tools: typescript6-alias\nsetup-node: 7\ninstall: npm-ci-frozen-lock\npackage-manager-cache: risk-reviewed\nworkspace: clean-checkout\nbuild-output: content-digested\nchanged-environment: cold-cache-and-locale',
    verify:
      'npm ci then run strict type test build and package checks from a clean supported Node 24 environment',
    failure:
      'Reject floating toolchains, npm install lock mutation, local residue, lifecycle-script trust, or one warm build as reproducibility.',
    repair:
      'Align tool versions, freeze installs, bound registry and scripts, build cleanly, digest output, and repeat changed environments.',
    feature:
      '(?:typescript-native:\\s*7\\.0\\.2|typescript-api-compatibility:\\s*6\\.0\\.2|npm-ci-frozen-lock|content-digested)',
  },
  'ci-quality-gate-orchestration': {
    artifact: 'quality-pipeline.yaml',
    change:
      'gates: [format-check, lint, type-check, unit, integration, build, policy]\norder: cheap-before-costly\nparallel: independent-only\ncontinue-on-error: false\nskipped-policy: explicit-failure\nrequired-check: stable-quality-name\nsummary: command-revision-owner\nrerun: classified-only',
    verify:
      'inspect job results required checks skipped paths exact commands and retained failure summaries',
    failure:
      'Reject green continued failures, silent skips, mutable required names, log dumps, or unconditional reruns.',
    repair:
      'Make exit semantics explicit, preserve dependency order, fail unintended skips, stabilize checks, and assign diagnostic ownership.',
    feature:
      '(?:continue-on-error:\\s*false|skipped-policy:\\s*explicit-failure|stable-quality-name)',
  },
  'ci-testing-services-coverage': {
    artifact: 'test-evidence.yaml',
    change:
      'layers: [unit, component, integration, contract, e2e, accessibility, security]\nservice-image: postgres@sha256:verified\nservice-health: readiness-query\nstate: per-job-fixture\nshard-proof: complete-and-disjoint\ncoverage: branch-changed-line-and-mutation\nretry: disabled-by-default\nreports: immutable-junit-trace-screenshot',
    verify:
      'run changed-case tests with fresh service state deterministic seeds report reconciliation and failure preservation',
    failure:
      'Reject coverage percentage as assertion quality, start as readiness, shared mutable fixtures, or retry-until-green.',
    repair:
      'Select layers by risk, wait for service behavior, isolate state, prove shards, preserve reports, and repair flakes causally.',
    feature:
      '(?:service-health:\\s*readiness-query|complete-and-disjoint|branch-changed-line-and-mutation)',
  },
  'gha-matrices-needs-outputs-artifacts': {
    artifact: 'handoff-contract.yaml',
    change:
      'matrix: node-22-24-by-ubuntu-macos-windows\nexperimental: continue-only-declared-axis\nmax-parallel: bounded\nneeds: explicit-dag\noutputs: validated-json\nartifact-name: build-linux-x64-run8842\nartifact-digest: sha256-verified\nretention-days: 7\nhidden-files: excluded',
    verify:
      'enumerate matrix cases trace job results parse outputs and verify artifact ID digest layout retention and producer',
    failure:
      'Reject silent coverage exclusions, output type assumptions, artifact name reuse, hidden secret upload, or download as execution trust.',
    repair:
      'Prove matrix coverage, validate outputs, use unique immutable artifacts, verify digests and permissions, and bound retention.',
    feature:
      '(?:outputs:\\s*validated-json|artifact-digest:\\s*sha256-verified|hidden-files:\\s*excluded)',
  },
  'gha-cache-performance-integrity': {
    artifact: 'cache-policy.yaml',
    change:
      'cache-content: npm-downloads-only\nkey: os-arch-node24-lockhash-config\nrestore-prefix: exact-trusted-branch\nwriter: trusted-push-only\nuntrusted-reader: bounded-read\nnode-modules: excluded\nprivileged-release-cache: disabled\ncold-run: scheduled\nmeasurement: queue-install-build-test-upload',
    verify:
      'compare cold warm and poisoned-key fixtures while checking writer event scope restored key and critical path',
    failure:
      'Reject cache as provenance, executable fork-writable caches, broad restore keys, node_modules reuse, or warm-only evidence.',
    repair:
      'Cache disposable inputs, bind keys and writers, isolate trust domains, retain cold runs, and measure the actual critical path.',
    feature: '(?:npm-downloads-only|trusted-push-only|privileged-release-cache:\\s*disabled)',
  },
  'gha-concurrency-timeouts-flake-control': {
    artifact: 'execution-control.yaml',
    change:
      'concurrency-group: deploy-production-service-a\ncancel-in-progress: tests-only\nrevision-guard: compare-before-mutate\njob-timeout-minutes: 20\ncommand-timeout-seconds: 90\ncleanup: always-idempotent\nretry: classified-transient-max-2\nfirst-failure: retained\nflake-owner-expiry: team-delivery-7-days',
    verify:
      'simulate overlapping revisions cancellation timeout transient failure duplicate side effect and cleanup interruption',
    failure:
      'Reject blanket cancellation, commit-order assumptions, timeout as cleanup, all-error retry, or ownerless quarantine.',
    repair:
      'Scope concurrency to shared state, reject stale mutation, bound every wait, preserve first failure, and expire quarantine.',
    feature: '(?:compare-before-mutate|classified-transient-max-2|first-failure:\\s*retained)',
  },
  'gha-secrets-tokens-injection': {
    artifact: 'authority-policy.yaml',
    change:
      'default-permissions: none\ncheckout-job: contents-read\nattest-job: contents-read-id-token-write-attestations-write\npublic-config: repository-variable\nsecret: environment-scoped\nuntrusted-input: validated-env-boundary\nshell: no-generated-code\nderived-secret: explicitly-masked\nrotation: rehearsed',
    verify:
      'trace every value from event and secret store through expression environment shell process log artifact cache and API mutation',
    failure:
      'Reject write-all defaults, expression-to-shell interpolation, masking as access control, transformed-secret auto-masking, or log deletion as response.',
    repair:
      'Classify data, grant per-job authority, validate untrusted input, prevent sinks, mask derived values, revoke, rotate, and test absence.',
    feature:
      '(?:default-permissions:\\s*none|validated-env-boundary|derived-secret:\\s*explicitly-masked)',
  },
  'gha-actions-dependencies-supply-chain': {
    artifact: 'action-dependency-policy.yaml',
    change:
      'allowed-actions: reviewed-publishers\nthird-party-pin: full-commit-sha\nversion-comment: retained\nnested-inventory: generated\neffective-permissions: reviewed\nworkflow-codeowners: delivery-security\nupdate: automated-pr-with-compat-tests\nanalysis: codeql-actions-and-policy\nrevocation: rehearsed',
    verify:
      'enumerate nested actions resolve immutable SHAs inspect bundled runtime inputs post steps permissions advisories and update evidence',
    failure:
      'Reject marketplace trust, mutable major tags, top-level-only inventory, general review assumptions, or static analysis as complete proof.',
    repair:
      'Review effective code and authority, pin immutable revisions, protect workflow changes, test updates, enforce policy, and rehearse removal.',
    feature: '(?:full-commit-sha|nested-inventory:\\s*generated|codeql-actions-and-policy)',
  },
  'gha-reuse-composite-workflow-contracts': {
    artifact: 'reusable-automation.yaml',
    change:
      'component: reusable-workflow\nworkflow-call: typed-inputs-secrets-outputs\npermissions: caller-bounded\nsecret-inheritance: explicit-only\nenvironment-secret: deployment-job-only\nexternal-ref: full-workflow-sha\nproducer-proof: workflow-ref-and-sha\ncompatibility: consumer-contract-suite\ndeprecation: measured-migration',
    verify:
      'validate caller and callee interfaces permissions secrets outputs pins nested depth changed consumer cases and rollback',
    failure:
      'Reject wrapper equivalence, implicit secret inheritance, permission escalation, default-branch refs, or centralization as drift elimination.',
    repair:
      'Choose the correct boundary, type the interface, preserve caller limits, pin identity, test consumers, canary change, and deprecate visibly.',
    feature: '(?:caller-bounded|full-workflow-sha|consumer-contract-suite)',
  },
  'ci-docker-build-test-cache': {
    artifact: 'container-build-workflow.yaml',
    change:
      'setup-buildx-action: 4\nbuild-push-action: 7\ncontext: explicit-path-after-generation\ndockerfile: Dockerfile\nplatforms: [linux-amd64, linux-arm64]\nsecret: buildkit-secret-mount\ncache-writer: trusted-main-only\npush: after-platform-tests\nbuild-record: retained\noutput-digest: sha256-verified',
    verify:
      'render build inputs inspect build record test each platform changed config signals health and read-only behavior then verify index digest',
    failure:
      'Reject implicit Git context, ARG secrets, fork-writable cache, build-only proof, one-platform tests, or push-before-validation.',
    repair:
      'Select context deliberately, mount secrets, scope cache, test runtime behavior per platform, retain records, and push verified output.',
    feature: '(?:build-push-action:\\s*7|buildkit-secret-mount|after-platform-tests)',
  },
  'ci-image-release-attestations': {
    artifact: 'attested-release.yaml',
    change:
      'subject: registry.example.test/status@sha256:verified\ntags: [v2.4.0, stable]\nsbom: spdx-attached\nprovenance: mode-max\nbuilder: github-hosted-reviewed-workflow\nactions-attest: 4\nattestation-subject: exact-digest\nverification: issuer-repository-workflow-builder-subject\npromotion: same-digest\nrollback: prior-verified-digest',
    verify:
      'verify image digest SBOM provenance signature issuer repository workflow builder subject predicate policy and promotion identity',
    failure:
      'Reject tags as identity, detached unbound SBOM, build-arg secrets, signature-only trust, unverified attestations, or transitive SLSA claims.',
    repair:
      'Bind metadata to digest, generate safe attestations, verify identity and expectations downstream, promote once, and state SLSA limits.',
    feature: '(?:spdx-attached|provenance:\\s*mode-max|promotion:\\s*same-digest)',
  },
  'cd-environments-oidc-cloud-auth': {
    artifact: 'federated-deployment.yaml',
    change:
      'environment: production\nreviewers: operations-and-security\nbranch-policy: protected-main\npermissions: contents-read-id-token-write\noidc-issuer: token.actions.githubusercontent.com\noidc-audience: google-wif-provider\nsubject: immutable-repository-workflow-environment\ngoogle-auth-action: 3\nservice-account: cloud-run-deployer\nroles: resource-scoped\ncredential-lifetime: job-bounded',
    verify:
      'inspect environment history OIDC claims provider condition service-account impersonation IAM audit and credential cleanup',
    failure:
      'Reject long-lived keys, repository-name-only trust, global admin, approval-free environments, or short lifetime as sufficient control.',
    repair:
      'Constrain environment and claims, federate identity, separate service accounts, scope roles, audit exchange, expire credentials, and rehearse revocation.',
    feature:
      '(?:id-token-write|immutable-repository-workflow-environment|google-auth-action:\\s*3)',
  },
  'cd-cloud-run-progressive-delivery': {
    artifact: 'cloud-run-delivery.yaml',
    change:
      'deploy-cloudrun-action: 3\nservice: status-api\nregion: us-central1\nimage: registry.example.test/status@sha256:verified\nrevision-suffix: run8842\ntraffic: none-at-deploy\nsmoke: authenticated-changed-case\ncanary-percent: 5\nobserve: latency-errors-user-success\nabort: explicit-threshold\nrollback: prior-revision-traffic\niam: separately-owned',
    verify:
      'inspect revision image identity readiness authenticated smoke traffic totals observation window abort decision rollback and IAM audit',
    failure:
      'Reject latest tags, deploy acceptance as readiness, instant full traffic, representative-canary assumptions, rebuild rollback, or deployment-owned public IAM.',
    repair:
      'Deploy verified digest without traffic, smoke exact revision, canary with signals, abort predictably, move traffic back, and separate IAM.',
    feature: '(?:traffic:\\s*none-at-deploy|canary-percent:\\s*5|prior-revision-traffic)',
  },
  'cd-releases-packages-change-control': {
    artifact: 'release-policy.yaml',
    change:
      'source: protected-reviewed-tag\nchecks: required-at-source-sha\nbuild: once\napproval: promote-existing-artifact\nimage: immutable-digest\nnpm: trusted-publishing\nnpm-minimum: 11.5.1\nnode-minimum: 22.14.0\nid-token: release-job-only\npackage-provenance: verified\nseparation: author-reviewer-builder-approver-publisher',
    verify:
      'compare tag authority source checks artifact digest package contents trusted publisher identity provenance approval and published result',
    failure:
      'Reject tag-only authorization, per-environment rebuild, long-lived publish token, OIDC for private install, provenance as benign-code proof, or approval count as safety.',
    repair:
      'Protect source authority, build once, approve promotion, publish through exact OIDC identity, verify package provenance, and separate duties by risk.',
    feature: '(?:trusted-publishing|npm-minimum:\\s*11\\.5\\.1|build:\\s*once)',
  },
  'ci-observability-incidents-governance': {
    artifact: 'delivery-operations.yaml',
    change:
      'metrics: queue-critical-path-failure-class-recovery\ncardinality: bounded\nprivacy: actor-and-input-minimized\nretention: risk-cost-policy\nincident: contain-preserve-restore-notify\nfirst-causal-failure: reconstructed\ncredential-response: revoke-and-rotate\nartifact-recovery: prior-verified-digest\nexception: owner-reason-expiry\ndrill: quarterly\nimprovement: outcome-reviewed',
    verify:
      'reconstruct one delivery incident from event workflow runner dependency artifact deployment telemetry audit containment and recovery evidence',
    failure:
      'Reject unbounded metric labels, forever retention, blind reruns, workflow cancellation as containment, or non-expiring central policy exceptions.',
    repair:
      'Measure useful flow safely, retain by need, diagnose first cause, contain authority and mutations, restore verified artifacts, expire exceptions, and drill.',
    feature: '(?:first-causal-failure:\\s*reconstructed|revoke-and-rotate|owner-reason-expiry)',
  },
};

const ENVIRONMENTS = [
  'public fork pull request with no repository write access',
  'protected main branch under a merge queue',
  'trusted release tag requiring an environment approval',
  'Node 24 TypeScript monorepo with three lockfiles',
  'GitHub-hosted ubuntu-24.04 runner on a cold cache',
  'single-job ephemeral self-hosted runner in a segmented subnet',
  'multi-platform Buildx release to a non-production registry',
  'sandbox Google Cloud project with a private Cloud Run service',
  'reusable workflow called by three repositories at different revisions',
  'incident replay using redacted run metadata and immutable artifacts',
];

const FAULTS = [
  'change the event from pull_request to pull_request_target',
  'cancel an older run while its external mutation is in progress',
  'restore a cache written from a lower-trust branch',
  'remove one supported Node and operating-system matrix cell',
  'rotate a cloud trust condition during deployment',
  'return a transient registry error after the image push begins',
  'make the service container start before it is ready',
  'change an action tag to a different commit without workflow edits',
  'route five percent traffic to a revision with a data incompatibility',
  'expire the only retained test artifact during incident reconstruction',
];

const PROOFS = [
  'event ref SHA workflow ref workflow SHA run ID and attempt',
  'job result dependency graph exact command and first causal failure',
  'runner image runtime version authority network and teardown record',
  'lock hash cold install test report package contents and output digest',
  'artifact ID SHA-256 producer retention and verified download layout',
  'image digest SBOM provenance issuer workflow builder and subject',
  'OIDC claims provider condition service account IAM and audit entry',
  'Cloud Run revision readiness smoke traffic signals abort and rollback',
  'queue duration critical path failure class recovery and cost evidence',
  'accessible redacted timeline with owner expiry and regression control',
];

function indent(value) {
  return value
    .split('\n')
    .map((line) => `      ${line.trimStart()}`)
    .join('\n');
}

function scenarioDetails(suffix) {
  const value = Number.parseInt(suffix, 36);
  return {
    environment: ENVIRONMENTS[value % ENVIRONMENTS.length],
    fault: FAULTS[Math.floor(value / 7) % FAULTS.length],
    proof: PROOFS[Math.floor(value / 13) % PROOFS.length],
  };
}

export function cicdEvidenceContract({ competencyId, moduleId, marker, suffix }) {
  const profile = MODULE_EVIDENCE[moduleId];
  if (!profile) throw new Error(`Missing CI/CD evidence profile for ${moduleId}`);
  const details = scenarioDetails(suffix);
  const decision = competencyId.replace(/^ci-/, '').replaceAll('-', ' ');
  const withinEvidenceBlock = '(?:(?!  # Evidence:)[\\s\\S])';
  return {
    marker,
    pattern: `${marker}${withinEvidenceBlock}*?competency:\\s*${competencyId}${withinEvidenceBlock}*?artifact:\\s*${profile.artifact.replaceAll('.', '\\.')}${withinEvidenceBlock}*?change:\\s*\\|${withinEvidenceBlock}*?${profile.feature}${withinEvidenceBlock}*?verify:\\s*(?!\\[|todo)[^\\n]{12,}${withinEvidenceBlock}*?failure:\\s*(?!\\[|todo)[^\\n]{20,}${withinEvidenceBlock}*?repair:\\s*(?!\\[|todo)[^\\n]{20,}`,
    example: `${marker}
  - competency: ${competencyId}
    artifact: ${profile.artifact}
    decision: ${decision}
    environment: ${details.environment}
    fault-injection: ${details.fault}
    retained-proof: ${details.proof}
    case-key: ${suffix}
    change: |
${indent(profile.change)}
    verify: ${profile.verify}
    failure: ${profile.failure}
    repair: ${profile.repair}`,
    requirement: `Append the CI/CD evidence item headed "${marker}". Tailor its ${profile.artifact} change to the current stakeholder case, retain a deterministic workflow or release review, reject one concrete failure, and record a repair. The browser analyzes text only; run GitHub Actions, runner, Docker, registry, OIDC, Google Cloud, and deployment work later in authorized disposable transfer environments.`,
  };
}

export function cicdWorkedExample(moduleId, seed) {
  const suffix = `worked${seed}`;
  return cicdEvidenceContract({
    competencyId: `ci-worked-${moduleId}-${seed}`,
    moduleId,
    marker: `  # Evidence: ci-worked-${moduleId}-${seed}`,
    suffix,
  }).example;
}

export const cicdEvidenceModuleIds = Object.freeze(Object.keys(MODULE_EVIDENCE));
