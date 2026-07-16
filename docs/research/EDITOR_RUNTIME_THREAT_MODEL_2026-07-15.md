# Editor, Runtime, and Learner-Code Threat Model

Reviewed: 2026-07-15

## Decision

Every build-capable activity needs an accessible inline artifact workspace. Learner source is untrusted. It never becomes a host command, never supplies canonical answers, and never receives ambient credentials or unrestricted network access.

Browser workers and sandboxed iframes are bounded execution components, not complete trust boundaries. Each domain needs a declared capability policy, resource controller, message schema, persistence boundary, fallback path, and authentic transfer gate.

## Protected assets

- application host, filesystem, processes, environment, credentials, databases, network identity, and deployment authority;
- canonical grading checks, solutions, rubrics, hidden cases, and assessment integrity;
- learner identity, drafts, attempts, notes, evidence, accessibility preferences, and consent records;
- browser availability, memory, CPU, storage, focus, navigation, clipboard, audio, downloads, and user attention;
- other learners, instructors, external services, and third parties;
- trustworthy progress, mastery, retention, transfer, and credential claims.

## Trust boundaries

```text
learner text/input
  -> schema and size admission
  -> editor model and persisted draft
  -> disposable runtime or structured simulator
  -> bounded observable output
  -> server-side canonical grader
  -> persisted evidence and learner-facing feedback
```

The editor, preview, runtime, output, grader, and persistence layers are separate boundaries. A success in one layer does not authorize another.

## Adversaries and failures

- curious or malicious learner content attempting escape, exfiltration, denial of service, answer discovery, or external action;
- accidental infinite loops, explosive allocation, recursion, output floods, malformed messages, parser bombs, and corrupted saved state;
- compromised or vulnerable direct and transitive dependencies;
- unsafe course author content, fixtures, imports, package allowlists, simulators, or hidden checks;
- cross-learner data mix-ups, stale identifiers, retry races, and cache leaks;
- inaccessible failure states that trap focus, hide diagnostics, erase work, or require a pointer device;
- deceptive grading that accepts keywords, rejects valid variants, leaks answers, or overstates evidence;
- unsupported browsers, offline transitions, worker crashes, storage denial, and version mismatch.

## Required controls

### Input and message admission

- enforce per-file, per-project, message, output, attempt, and persisted-state size limits before parsing or execution;
- validate every worker, iframe, runtime, grader, autosave, and restore message against a narrow discriminated schema;
- reject unknown fields and unsafe encodings where ambiguity changes behavior;
- identify learner, course, activity, attempt, artifact, file, runtime version, and check version independently of learner content;
- use structured values rather than interpolating learner text into commands, SQL, shell, HTML attributes, paths, logs, or prompts.

### Browser preview

- use an opaque-origin iframe with the smallest sandbox token set required by the activity;
- do not combine same-origin authority with learner-controlled script where the learner can remove or bypass restrictions;
- deny top navigation, popups, downloads, external forms, permissions, credentials, storage, and unnecessary network capability;
- rewrite or block external URLs according to the activity contract and make denied behavior visible;
- cap console messages, DOM/output size, navigation attempts, render time, and preview refresh rate;
- destroy and recreate the preview when policy, attempt, or source identity changes.

Technical authority: [WHATWG iframe sandbox requirements](https://html.spec.whatwg.org/multipage/iframe-embed-object.html#attr-iframe-sandbox).

### Browser workers

- create a fresh worker for an execution or bounded attempt; do not share mutable interpreter state across learners;
- enforce wall-clock timeout from outside the worker and terminate rather than trusting cooperative cancellation;
- cap input, package set, output, persisted virtual files, and messages; test memory pressure and repeated termination;
- deny or intercept network-capable APIs and document unavoidable browser capabilities;
- validate runtime output as untrusted data before rendering, grading, storing, or announcing it;
- recover to the last valid checkpoint after crash, timeout, or corrupt state.

Technical authorities: [Pyodide worker guidance](https://pyodide.org/en/stable/usage/webworker.html), [Pyodide runtime limits](https://pyodide.org/en/stable/usage/faq.html), and [Worker termination](https://developer.mozilla.org/en-US/docs/Web/API/Worker/terminate).

### Server-side grading

- keep canonical checks, hidden cases, rubric anchors, and solutions server-side;
- treat learner output and browser check results only as evidence submitted for independent verification;
- require behavior, changed cases, invariants, causal diagnosis, or defensible artifacts instead of source-token presence;
- version the artifact, runtime, fixture, check, rubric, and feedback used for every evidence claim;
- test valid alternatives, malformed near-misses, adversarial submissions, state races, retry effects, and false-positive or false-negative boundaries;
- prevent feedback and error detail from reconstructing hidden answers.

### Persistence and privacy

- store only data required to resume learning and support named evidence claims;
- distinguish draft, attempt, completion, mastery, retention, transfer, project, and credential records;
- validate restore data field by field so one corrupt field does not erase other valid work;
- provide inspect, export, reset, and deletion behavior appropriate to the deployment model;
- never invent analytics or infer learner ability from time, clicks, streaks, or editor telemetry;
- record pilot consent separately from ordinary progress and remove research identifiers as soon as the protocol allows.

### Accessibility and recovery

- expose editor name, language, file, cursor, diagnostics, run status, output, and feedback semantically;
- provide a reliable keyboard route into and out of every editor and panel;
- keep a focusable diagnostic list in addition to visual markers;
- never move focus to preview or output after running unless the learner requests it;
- announce concise status politely and leave full output available for review;
- retain drafts across editor load failure, worker crash, timeout, route change, refresh, browser restart, and supported tablet-to-desktop handoff;
- verify screen reader, keyboard-only, zoom/reflow, high contrast, reduced motion, touch, and error recovery with people and supported assistive technology.

Accessibility authorities: [WCAG 2.2](https://www.w3.org/TR/WCAG22/) and [Monaco accessibility guidance](https://github.com/microsoft/monaco-editor/wiki/Accessibility-Guide-for-Integrators).

## Domain policy matrix

| Domain                  | Allowed local capability                                                | Explicitly denied                                                                   | Required transfer evidence                                                                         |
| ----------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| HTML/CSS/JavaScript     | Opaque preview, bounded DOM and behavior inspection, fixed local assets | Same-origin authority, credentials, unrestricted network, top navigation, downloads | Real-browser accessibility, responsive, performance, and compatibility review on an owned artifact |
| TypeScript              | Bounded compiler and allowlisted deterministic runtime                  | Host files/processes, arbitrary packages, open network                              | Native Node/package build, test, packaging, and supported-environment evidence                     |
| Python                  | Fresh Pyodide worker and allowlisted packages                           | Host access, subprocesses, arbitrary network/package install                        | Native Python environment, dependency, test, packaging, and platform evidence                      |
| Go                      | Browser-safe interpreter subset and deterministic imports               | Sockets, host processes/files, arbitrary modules                                    | Current Go toolchain, race/fuzz/sanitizer-equivalent and production dependency evidence            |
| C                       | Browser interpreter and memory-model visualizations                     | Native execution, host memory, processes, arbitrary libraries                       | Current compiler warnings, sanitizers, debugger, architecture, and toolchain evidence              |
| SQL                     | Fresh deterministic in-memory database                                  | Host or shared database, extensions, files, network                                 | Authorized PostgreSQL or named dialect behavior, plan, transaction, and migration evidence         |
| Shell/Git/network       | Deterministic state simulator                                           | Host shell, credentials, devices, production repositories, network targets          | Authorized disposable environment with rollback, capture, and cleanup evidence                     |
| Docker/Kubernetes/cloud | Configuration parser and deterministic state/failure simulator          | Daemon, kubeconfig, cloud credentials, registries, external mutation                | Authorized disposable infrastructure, policy, cost, recovery, and cleanup evidence                 |
| AI/agents/MCP           | Fixed fixtures, bounded evaluators, trace and state simulator           | Undeclared provider calls, credentials, external actions, unbounded spend           | Authorized budgeted provider/tool run with privacy, safety, evaluation, and rollback evidence      |
| Applied mathematics     | Deterministic expression/data/visualization engine                      | Silent precision claims, inaccessible chart-only results, arbitrary code execution  | Independent derivation, changed data, units, interpretation, and real-tool verification            |

## Release-blocking adversarial suite

1. infinite loop and non-cooperative execution terminates within the declared limit;
2. allocation, recursion, output, DOM, message, file, and persisted-state floods fail accessibly without harming the app;
3. worker or iframe attempts network, parent access, navigation, popup, download, storage, clipboard, audio, and permission use;
4. malformed, replayed, stale, cross-attempt, cross-course, and cross-learner messages are rejected;
5. hidden checks and solutions cannot be fetched, inferred from identifiers, or reconstructed from feedback;
6. valid alternative solutions pass while near-miss, misplaced, malformed, hard-coded, and token-only submissions fail;
7. timeout, crash, offline change, storage denial, unsupported browser, editor failure, and version mismatch preserve recoverable work;
8. keyboard, screen reader, zoom, high contrast, reduced motion, touch, and native fallback complete the same learner outcome;
9. no learner input reaches a host command, production service, account, device, repository, credential, or external message;
10. logs and analytics contain no source, secret, personal content, or unneeded learner identifiers.

## Known residual risk and open research

- Worker and iframe isolation depends on browser correctness and application policy; it is not equivalent to a separate operating-system sandbox.
- Memory enforcement is weaker in browser workers than in controlled disposable server sandboxes; large-runtime courses may require a different architecture.
- Monaco does not support mobile browsers, and tablet behavior needs device-specific observation rather than viewport emulation alone.
- Safe third-party package execution needs domain allowlists, provenance, update review, and a replacement path.
- Assistive-technology behavior varies by browser, editor, operating system, and user settings.
- Real network, device, compiler, cloud, concurrency, performance, and production claims remain controlled transfer gates.
- The full data-flow threat model must be revised after the next persistence, grading, editor, or runtime architecture change.
