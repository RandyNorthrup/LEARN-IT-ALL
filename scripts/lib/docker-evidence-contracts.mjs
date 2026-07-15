const MODULE_EVIDENCE = {
  'docker-architecture-isolation-evidence': {
    artifact: 'architecture-evidence.yaml',
    change:
      'operation: pull\n      path: client -> engine-api -> daemon -> containerd -> registry\n      kernel-boundary: shared-host-kernel',
    verify: 'docker context inspect training && docker info --format json',
    failure:
      'Reject any conclusion based only on the client version or a claim that the container boots a guest kernel.',
    repair:
      'Capture client and server versions, active context, platform, runtime, storage driver, and security options separately.',
    feature: '(?:client\\s*->\\s*engine-api|kernel-boundary|docker\\s+(?:context\\s+inspect|info))',
  },
  'docker-containers-lifecycle-cli': {
    artifact: 'container-lifecycle.yaml',
    change:
      'create: immutable-configured-container\n      start: same-container-identity\n      inspect: state-before-mutation\n      cleanup: label-scoped-and-previewed',
    verify: 'docker container inspect training-web --format json',
    failure:
      'Reject name-only cleanup, unbounded prune, or a claim that stop and remove preserve writable-layer state.',
    repair:
      'Use explicit IDs or labels, inspect before mutation, capture exit state, and remove only the scoped disposable resource.',
    feature: '(?:same-container-identity|label-scoped|docker\\s+container\\s+inspect)',
  },
  'docker-images-layers-registries': {
    artifact: 'image-identity.yaml',
    change:
      'reference: registry.example.test/status@sha256:verified-digest\n      manifest: linux-amd64\n      config: content-addressed\n      layers: ordered-and-shared',
    verify: 'docker buildx imagetools inspect registry.example.test/status@sha256:verified-digest',
    failure:
      'Reject a mutable tag as release identity or a history listing as proof that secrets never entered a layer.',
    repair:
      'Resolve the digest, inspect manifest and config metadata, trace layer ownership, and retain provenance for the selected platform.',
    feature: '(?:sha256:verified-digest|content-addressed|buildx\\s+imagetools\\s+inspect)',
  },
  'dockerfile-build-context-instructions': {
    artifact: 'Dockerfile',
    change:
      'FROM docker.io/library/alpine:3.22@sha256:verified AS runtime\n      WORKDIR /app\n      COPY --link public/ ./public/\n      USER 10001:10001\n      ENTRYPOINT ["/app/status"]',
    verify: 'docker buildx build --check --progress=plain .',
    failure:
      'Reject a floating base, secret-bearing context, shell-form signal wrapper, root runtime, or copied repository wildcard.',
    repair:
      'Pin the reviewed base digest, shrink .dockerignore context, use explicit COPY, set numeric non-root identity, and test argv behavior.',
    feature: '(?:FROM\\s+docker\\.io/.+@sha256:verified|COPY\\s+--link|USER\\s+10001:10001)',
  },
  'docker-buildkit-cache-multistage': {
    artifact: 'Dockerfile.buildkit',
    change:
      'FROM toolchain AS test\n      RUN --mount=type=cache,target=/root/.cache/tool test-command\n      FROM scratch AS release\n      COPY --from=test /out/status /status',
    verify: 'docker buildx build --target test --no-cache-filter test --check .',
    failure:
      'Reject cache hits as freshness proof, credentials in ARG or ENV, or copying the entire builder into the runtime stage.',
    repair:
      'Separate dependency and source layers, scope cache and secret mounts, name stages, and verify the final filesystem independently.',
    feature: '(?:--mount=type=cache|COPY\\s+--from=test|--no-cache-filter)',
  },
  'docker-process-signals-health-resources': {
    artifact: 'runtime-policy.yaml',
    change:
      'init: true\n      stop_grace_period: 30s\n      healthcheck: bounded-readiness-probe\n      restart: on-failure:3\n      memory: 256m\n      pids_limit: 128',
    verify: 'docker inspect training-worker --format json && docker events --since 10m',
    failure:
      'Reject an unbounded probe, restart loop as recovery, shell wrapper that swallows signals, or deployment without memory and PID limits.',
    repair:
      'Make PID 1 ownership explicit, bound shutdown and health timing, preserve durable work, and test termination plus resource pressure.',
    feature: '(?:stop_grace_period|pids_limit|docker\\s+events)',
  },
  'docker-storage-mounts-backup': {
    artifact: 'storage-contract.yaml',
    change:
      'mount-type: named-volume\n      target: /var/lib/intake\n      ownership: 10001:10001\n      backup: application-consistent\n      restore-test: fresh-volume',
    verify: 'docker volume inspect intake-data && sha256sum restore-manifest.txt',
    failure:
      'Reject an anonymous volume as a named backup plan, bind-mount portability assumptions, or archive creation without a restore rehearsal.',
    repair:
      'Name ownership and lifecycle, quiesce or coordinate the application, checksum the artifact, and restore into a clean isolated volume.',
    feature:
      '(?:mount-type:\\s*named-volume|restore-test:\\s*fresh-volume|docker\\s+volume\\s+inspect)',
  },
  'docker-networking-dns-publishing': {
    artifact: 'network-contract.yaml',
    change:
      'frontend-network: published-edge\n      backend-network: internal\n      service-discovery: service-name\n      host-binding: 127.0.0.1:8080\n      database-published: false',
    verify: 'docker network inspect intake-backend --format json',
    failure:
      'Reject container IP pinning, localhost-as-peer assumptions, accidental all-interface publishing, or an exposed database port.',
    repair:
      'Use project-scoped DNS names, separate networks by trust, bind only the required host interface, and test egress and ingress independently.',
    feature: '(?:backend-network:\\s*internal|127\\.0\\.0\\.1:8080|database-published:\\s*false)',
  },
  'docker-compose-model-lifecycle': {
    artifact: 'compose.yaml',
    change:
      'services:\n        api:\n          image: registry.example.test/intake@sha256:verified\n          depends_on:\n            db:\n              condition: service_healthy\n      volumes:\n        intake-data:',
    verify: 'docker compose config --quiet && docker compose --dry-run up --build',
    failure:
      'Reject start order as readiness proof, implicit project identity, floating images, or teardown that silently deletes required volumes.',
    repair:
      'Render the merged model, pin identities, encode health dependencies, inspect the dry run, and document down versus down --volumes.',
    feature:
      '(?:services:|condition:\\s*service_healthy|docker\\s+compose\\s+(?:config|--dry-run))',
  },
  'docker-compose-development-testing': {
    artifact: 'compose.dev.yaml',
    change:
      'services:\n        api:\n          develop:\n            watch:\n              - action: sync\n                path: ./src\n          profiles: [dev]\n        test:\n          profiles: [test]',
    verify: 'docker compose -f compose.yaml -f compose.dev.yaml config --profiles',
    failure:
      'Reject production bind mounts, hidden override precedence, watch-triggered dependency churn, or a profile that changes the core dependency contract.',
    repair:
      'Render every file combination, scope development-only state, select sync versus rebuild deliberately, and prove test teardown is isolated.',
    feature: '(?:develop:|action:\\s*sync|profiles:\\s*\\[(?:dev|test)\\])',
  },
  'docker-security-least-privilege': {
    artifact: 'security-policy.yaml',
    change:
      'user: 10001:10001\n      read_only: true\n      cap_drop: [ALL]\n      security_opt: [no-new-privileges:true]\n      tmpfs: [/tmp]\n      network_mode: none',
    verify: 'docker inspect document-worker --format json',
    failure:
      'Reject privileged mode, daemon-socket mounting, broad devices, root-by-default, or a claim that containers form a hostile-code sandbox.',
    repair:
      'Remove daemon authority, choose rootless or user namespaces where applicable, drop capabilities, bound writable paths, and state residual kernel risk.',
    feature: '(?:cap_drop:\\s*\\[ALL\\]|no-new-privileges:true|network_mode:\\s*none)',
  },
  'docker-config-secrets-environment': {
    artifact: 'configuration-boundary.yaml',
    change:
      'public-config: immutable-environment-map\n      runtime-secret: mounted-file\n      build-secret: buildkit-secret-mount\n      logs: redact-values\n      rotation: restart-with-versioned-reference',
    verify: 'docker compose config --environment && docker image history --no-trunc candidate',
    failure:
      'Reject secrets in Dockerfile ENV, ARG, Compose interpolation output, image history, repository files, or diagnostic logs.',
    repair:
      'Separate public config from secrets, inject each at the narrowest lifetime, scan metadata, rotate the credential, and verify redaction.',
    feature:
      '(?:runtime-secret:\\s*mounted-file|buildkit-secret-mount|image\\s+history\\s+--no-trunc)',
  },
  'docker-observability-debugging': {
    artifact: 'incident-evidence.yaml',
    change:
      'baseline: ps-inspect-events-logs-stats\n      correlation: release-digest-and-container-id\n      mutation-policy: reproduce-before-exec\n      diagnostic-image: separately-reviewed\n      conclusion: first-causal-layer',
    verify: 'docker inspect failed-api --format json && docker logs --timestamps failed-api',
    failure:
      'Reject interactive mutation as diagnosis, unbounded log collection, high-cardinality labels, or a restart presented as root-cause evidence.',
    repair:
      'Preserve state and timestamps, compare desired with observed configuration, isolate one layer, reproduce cleanly, and retain the causal regression.',
    feature:
      '(?:ps-inspect-events-logs-stats|release-digest-and-container-id|docker\\s+logs\\s+--timestamps)',
  },
  'docker-testing-validation-quality': {
    artifact: 'container-test-plan.yaml',
    change:
      'static: dockerfile-and-compose-validation\n      image-contract: user-files-entrypoint-health\n      integration: dependency-and-fault-injection\n      transfer: clean-host-pull-and-run\n      negative: readonly-slow-stop-missing-secret',
    verify: 'docker buildx build --check . && docker compose config --quiet',
    failure:
      'Reject a successful build as runtime proof, a single happy-path curl, mutable local cache, or tests that depend on undeclared host state.',
    repair:
      'Layer structural, image, runtime, integration, fault, clean-host, and supply-chain checks with reproducible fixtures and teardown.',
    feature: '(?:image-contract|fault-injection|clean-host-pull-and-run)',
  },
  'docker-performance-reproducibility': {
    artifact: 'build-performance-budget.yaml',
    change:
      'context-bytes: measured\n      cache-hit-rate: observed-not-assumed\n      cold-build: recorded\n      image-bytes: per-platform\n      runtime-budget: cpu-memory-io\n      reproducibility: digest-compared',
    verify: 'docker buildx du && docker image inspect candidate --format json',
    failure:
      'Reject image size as the sole performance metric, warm-cache timing as a cold build, or equal source commits as proof of equal image digests.',
    repair:
      'Measure context, transfer, layers, cache, startup, CPU, memory, and I/O separately; change one variable and compare digests under controlled inputs.',
    feature: '(?:context-bytes:\\s*measured|cold-build:\\s*recorded|docker\\s+buildx\\s+du)',
  },
  'docker-multiplatform-buildx-bake': {
    artifact: 'docker-bake.hcl',
    change:
      'target "release" {\n        platforms = ["linux/amd64", "linux/arm64"]\n        attest = ["type=provenance", "type=sbom"]\n        output = ["type=registry"]\n      }',
    verify: 'docker buildx bake --print release && docker buildx imagetools inspect candidate',
    failure:
      'Reject architecture emulation as native test evidence, local image load for a multi-platform index, or platform-dependent inputs without declarations.',
    repair:
      'Inspect builder capabilities, make target platform explicit, test each artifact, publish the index, and verify per-platform digest selection.',
    feature: '(?:linux/amd64.+linux/arm64|type=provenance|buildx\\s+bake\\s+--print)',
  },
  'docker-supply-chain-registry-release': {
    artifact: 'release-policy.yaml',
    change:
      'source: reviewed-commit\n      base: approved-digest\n      output: immutable-registry-digest\n      sbom: spdx-attestation\n      provenance: max\n      vulnerability-policy: severity-and-exploitability\n      signature: identity-bound',
    verify:
      'docker buildx imagetools inspect candidate@sha256:release && docker scout cves candidate@sha256:release',
    failure:
      'Reject tag-only promotion, SBOM-as-vulnerability-scan, unsigned attestations, ignored base drift, or severity alone without reachability and exception ownership.',
    repair:
      'Bind source, builder, inputs, output digest, SBOM, provenance, signature, scan policy, exception expiry, and promotion evidence.',
    feature: '(?:spdx-attestation|provenance:\\s*max|docker\\s+scout\\s+cves)',
  },
  'docker-production-operations-defense': {
    artifact: 'production-defense.yaml',
    change:
      'release: digest-pinned\n      rollout: health-and-observation-gated\n      rollback: rehearsed-previous-digest\n      backup-restore: timed-and-proven\n      upgrade: compatibility-canary\n      capacity: measured-limits\n      handoff: accessible-runbook',
    verify:
      'docker compose config --quiet && docker buildx imagetools inspect candidate@sha256:release',
    failure:
      'Reject latest-tag rollout, untested rollback, backup without restore, blind daemon upgrade, or a container boundary claimed as orchestrator durability.',
    repair:
      'Defend the operating model with immutable identity, canary signals, failure drills, recovery objectives, capacity evidence, ownership, and residual risks.',
    feature:
      '(?:rollback:\\s*rehearsed-previous-digest|backup-restore:\\s*timed-and-proven|accessible-runbook)',
  },
};

function indent(value) {
  return value
    .split('\n')
    .map((line) => `      ${line.trimStart()}`)
    .join('\n');
}

const ENVIRONMENTS = [
  'rootless remote builder on an arm64 staging host',
  'native amd64 engine with a cold content store',
  'Docker Desktop VM with synchronized source files',
  'IPv6-enabled Compose project on a shared CI runner',
  'air-gapped release worker with an internal registry mirror',
  'ephemeral development host with constrained disk and memory',
  'multi-tenant build farm using an isolated BuildKit driver',
  'recovery host starting from an empty project namespace',
  'production-like canary with read-only application state',
  'remote context crossing a separately authorized daemon boundary',
];

const FAULTS = [
  'cancel during export after one platform finishes',
  'rotate a required secret between build and runtime',
  'remove dependency readiness while preserving start order',
  'fill the writable layer before graceful termination',
  'move a tag while the immutable digest remains available',
  'restore a volume under a different numeric user identity',
  'deny outbound DNS after initial service discovery',
  'invalidate one cache input without changing application source',
  'send termination during an in-flight durable operation',
  'rebuild after the approved base digest is withdrawn',
];

const PROOFS = [
  'per-platform manifest digest and selected image configuration',
  'timestamped lifecycle transition and bounded cleanup result',
  'rendered Compose model and dependency health transition',
  'cold-build trace and content-store usage comparison',
  'restored checksum and application-level consistency query',
  'effective user capability filesystem and network inspection',
  'redacted configuration render and secret-rotation confirmation',
  'shutdown duration exit state and durable-work reconciliation',
  'attached SBOM provenance signature and policy decision',
  'accessible recovery runbook with rollback rehearsal timing',
];

function scenarioDetails(suffix) {
  const value = Number.parseInt(suffix, 36);
  return {
    environment: ENVIRONMENTS[value % ENVIRONMENTS.length],
    fault: FAULTS[Math.floor(value / 7) % FAULTS.length],
    proof: PROOFS[Math.floor(value / 13) % PROOFS.length],
  };
}

export function dockerEvidenceContract({ competencyId, moduleId, marker, suffix }) {
  const profile = MODULE_EVIDENCE[moduleId];
  if (!profile) throw new Error(`Missing Docker evidence profile for ${moduleId}`);
  const decision = competencyId.replace(/^docker-/, '').replaceAll('-', ' ');
  const scenario = Number.parseInt(suffix.slice(-2), 36) % 5;
  const details = scenarioDetails(suffix);
  const withinEvidenceBlock = '(?:(?!  # Evidence:)[\\s\\S])';
  return {
    marker,
    pattern: `${marker}${withinEvidenceBlock}*?competency:\\s*${competencyId}${withinEvidenceBlock}*?artifact:\\s*${profile.artifact.replaceAll('.', '\\.')}${withinEvidenceBlock}*?change:\\s*\\|${withinEvidenceBlock}*?${profile.feature}${withinEvidenceBlock}*?verify:\\s*(?!\\[|todo)[^\\n]{12,}${withinEvidenceBlock}*?failure:\\s*(?!\\[|todo)[^\\n]{20,}${withinEvidenceBlock}*?repair:\\s*(?!\\[|todo)[^\\n]{20,}`,
    example: `${marker}
  - competency: ${competencyId}
    artifact: ${profile.artifact}
    decision: ${decision}
    scenario-variant: ${scenario + 1}
    environment: ${details.environment}
    fault-injection: ${details.fault}
    retained-proof: ${details.proof}
    case-key: ${suffix}
    change: |
${indent(profile.change)}
    verify: ${profile.verify}
    failure: ${profile.failure}
    repair: ${profile.repair}`,
    requirement: `Append the Docker evidence item headed "${marker}". Tailor its ${profile.artifact} change to the current stakeholder case, retain a deterministic review command, reject one concrete failure, and record a repair. The browser analyzes text only; run Docker commands later in an authorized disposable transfer environment.`,
  };
}

export function dockerWorkedExample(moduleId, seed) {
  const suffix = `worked${seed}`;
  return dockerEvidenceContract({
    competencyId: `docker-worked-${moduleId}-${seed}`,
    moduleId,
    marker: `  # Evidence: docker-worked-${moduleId}-${seed}`,
    suffix,
  }).example;
}

export const dockerEvidenceModuleIds = Object.freeze(Object.keys(MODULE_EVIDENCE));
