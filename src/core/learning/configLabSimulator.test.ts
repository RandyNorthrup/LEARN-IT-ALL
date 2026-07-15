import { describe, expect, it } from 'vitest';
import { detectConfigWorkspace, formatConfigLabReport } from './configLabSimulator';

describe('configuration lab simulator', () => {
  it('reviews an agent skill contract', () => {
    const source = `
workspace: skill
name: source-review
description: Review current primary sources when research is requested.
triggers: [explicit, implicit]
instructions: Load only relevant references.
constraints: Do not broaden authority.
verification: Run positive, negative, and changed cases.
`;
    expect(detectConfigWorkspace(source)).toBe('skill');
    expect(formatConfigLabReport(source)).toContain('AGENT SKILL REVIEW: 6/6');
  });

  it('reviews an MCP contract separately from repository gates', () => {
    const source = `
workspace: mcp
transport: streamable-http
tools: [lookup]
input-schema: strict
output-schema: structured
authorization: least-privilege
approval: writes-only
errors: typed
`;
    expect(detectConfigWorkspace(source)).toBe('mcp');
    expect(formatConfigLabReport(source)).toContain('MCP CONTRACT REVIEW: 7/7');
  });

  it('reviews Docker delivery evidence without executing learner commands', () => {
    const source = `
workspace: docker
transfer-boundary: authorized-disposable-environment
artifact: Dockerfile
change: |
  FROM example.test/status@sha256:verified
  RUN --mount=type=secret,id=token build-command
  USER 10001:10001
runtime: entrypoint with graceful-shutdown and healthcheck
state: named-volume on internal-network
security: read_only, cap_drop, no-new-privileges, runtime-secret, redact-values
supply-chain: sbom, provenance, signature, vulnerability-policy
verify: docker buildx build --check .
failure: Reject a floating image, daemon authority, leaked secret, and unbounded writable state.
repair: Pin the digest, remove authority, rotate the secret, test restore, and verify cleanup.
`;
    expect(detectConfigWorkspace(source)).toBe('docker');
    expect(formatConfigLabReport(source)).toContain('DOCKER CONTRACT REVIEW: 11/11');
    expect(formatConfigLabReport(source)).toContain('never executes learner commands');
  });

  it('reviews Kubernetes platform evidence without contacting a cluster', () => {
    const source = `
workspace: kubernetes
transfer-boundary: authorized-disposable-cluster
artifact: release.yaml
change: |
  apiVersion: apps/v1
  kind: Deployment
  image: example.test/status@sha256:verified
  desired-state: replicas-3
  observed-status: available-3
  readinessProbe: http-get
  service-discovery: Service and EndpointSlice
  storage: PersistentVolumeClaim with restore-test
  placement: topologySpreadConstraints with PodDisruptionBudget
  identity: ServiceAccount with least-privilege RoleBinding
  security: Pod-Security securityContext seccomp Secret
  observability: status conditions events previous-logs metrics traces causal-timeline
  rollout-status: complete with rollback-evidence
verify: kubectl diff --server-side -f release.yaml
failure: Reject stale status, mutable images, broad RBAC, and an untested restore.
repair: Pin the digest, restore least privilege, rehearse rollback, and verify recovery.
`;
    expect(detectConfigWorkspace(source)).toBe('kubernetes');
    expect(formatConfigLabReport(source)).toContain('KUBERNETES CONTRACT REVIEW: 12/12');
    expect(formatConfigLabReport(source)).toContain('never executes learner commands');
  });

  it('reviews CI/CD delivery evidence without contacting GitHub, runners, Docker, or cloud services', () => {
    const source = `
workspace: cicd
transfer-boundary: authorized-disposable-delivery-environment
workflow-ref: owner/repo/.github/workflows/release.yml@refs/heads/main
source-revision: reviewed-sha
run-id: 8842
event-policy: fork-policy with least permissions and untrusted-input treated as data
runner: ephemeral-runner with node-24 typescript-native: 7.0.2 typescript-api-compatibility: 6.0.2 npm-ci frozen-lock
gates: lint type-check required-check changed-case tests
state: immutable-artifact with artifact-digest; cache-key allows trusted cache-writer only
execution: concurrency with stale-run check, timeout, retry-policy, and cleanup-evidence
supply-chain: full-sha pinned actions, sbom, provenance, attestation, SLSA verification
image: buildx multiplatform image-digest, build-once and promote same-artifact
identity: OIDC id-token with environment-approval, audience, subject-claim, service-account
deployment: cloud-run no-traffic revision-identity then canary traffic-split with abort-signal and rollback
verify: inspect the event, graph, artifact digest, claims, revision, and recovery evidence
failure: Reject fork execution with write authority and mutable release identity.
repair: Reduce authority, pin identity, verify changed cases, rehearse rollback, and rotate exposure.
`;
    expect(detectConfigWorkspace(source)).toBe('cicd');
    expect(formatConfigLabReport(source)).toContain('CI/CD CONTRACT REVIEW: 12/12');
    expect(formatConfigLabReport(source)).toContain('never executes learner commands');
  });

  it('reviews independent product evidence without contacting participants or executing delivery work', () => {
    const source = `
workspace: portfolio
stakeholder: affected users and an accountable service owner
decision: continue only if the changed task meets outcomes and guardrails
problem-evidence: observation, existing alternative, contradiction, and uncertainty
accessibility: keyboard, structure, reflow, status, alternatives, and human review
security: threat, authorization, abuse, response, and residual risk
privacy: purpose, minimization, retention, access, correction, and deletion
test-strategy: behavior, changed case, fault, accessibility, security, and recovery
release-evidence: revision, artifact, inventory, provenance, validation, and rollback
recovery: backup, clean restore, reconciliation, communication, and ownership
portfolio-proof: contribution, assistance, limits, counterexample, and unseen defense
verify: reproduce the changed task and compare predeclared outcome plus guardrail evidence
failure: Reject plausible output without human, causal, ownership, or recovery evidence.
repair: Isolate the first unsupported transition and add a changed-case regression.
transfer-boundary: authorized controlled research, toolchain, deployment, and review environments
`;
    expect(detectConfigWorkspace(source)).toBe('portfolio');
    expect(formatConfigLabReport(source)).toContain('PRODUCT EVIDENCE REVIEW: 12/12');
    expect(formatConfigLabReport(source)).toContain('never executes learner commands');
  });
});
