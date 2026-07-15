const SPECS = {
  'bookbot-outcomes-repo-evidence': {
    parameters:
      'user: str = "archive-reader", authorized: bool = True, acceptance_cases: int = 6, repository_clean: bool = True, changed_case_kept: bool = True',
    body: `    if not user.strip() or acceptance_cases < 1:
        return False, acceptance_cases, "undefined-outcome"
    if not authorized:
        return False, acceptance_cases, "corpus-authority"
    if not repository_clean:
        return False, acceptance_cases, "repository-baseline"
    if not changed_case_kept:
        return False, acceptance_cases, "evidence-gap"
    assert acceptance_cases >= 1
    return True, acceptance_cases, "bounded-charter"`,
    anchors: [
      'not user\\.strip',
      'not authorized',
      'not repository_clean',
      'not changed_case_kept',
    ],
    task: 'gate the Bookbot outcome on user need, corpus authority, repository state, and changed-case evidence',
  },
  'bookbot-cli-lifecycle-contract': {
    parameters:
      'import_safe: bool = True, pure_stages: int = 7, side_effect_boundaries: int = 2, hidden_globals: int = 0, exit_status: int = 0',
    body: `    if not import_safe or pure_stages < 1:
        return False, pure_stages, "lifecycle"
    if side_effect_boundaries < 1 or side_effect_boundaries > 3:
        return False, side_effect_boundaries, "effect-shell"
    if hidden_globals > 0:
        return False, hidden_globals, "hidden-state"
    if exit_status != 0:
        return False, exit_status, "command-failure"
    assert pure_stages > side_effect_boundaries
    return True, pure_stages, "testable-command"`,
    anchors: [
      'not import_safe',
      'side_effect_boundaries > 3',
      'hidden_globals > 0',
      'exit_status != 0',
    ],
    task: 'separate import-safe definitions, a pure analysis core, explicit effects, and command status',
  },
  'bookbot-paths-file-admission': {
    parameters:
      'path: str = "fixtures/story.txt", regular_file: bool = True, within_root: bool = True, bytes_read: int = 4096, byte_limit: int = 65536',
    body: `    if not path.strip() or byte_limit <= 0:
        return False, bytes_read, "path-policy"
    if not regular_file:
        return False, bytes_read, "file-type"
    if not within_root:
        return False, bytes_read, "root-escape"
    if bytes_read < 0 or bytes_read > byte_limit:
        return False, bytes_read, "size-budget"
    assert 0 <= bytes_read <= byte_limit
    return True, bytes_read, "admitted-file"`,
    anchors: ['not path\\.strip', 'not regular_file', 'not within_root', 'bytes_read > byte_limit'],
    task: 'admit a regular file inside an allowed root under an explicit byte budget',
  },
  'bookbot-text-io-encoding': {
    parameters:
      'byte_count: int = 120, decoded_characters: int = 112, encoding: str = "utf-8", decode_errors: int = 0, handle_closed: bool = True',
    body: `    if byte_count < 0 or decoded_characters < 0:
        return False, byte_count, "io-count"
    if encoding.casefold() != "utf-8":
        return False, decoded_characters, "encoding-policy"
    if decode_errors > 0:
        return False, decode_errors, "decode-rejected"
    if not handle_closed:
        return False, byte_count, "cleanup"
    assert byte_count >= decoded_characters
    return True, decoded_characters, "decoded-text"`,
    anchors: ['byte_count < 0', 'encoding\\.casefold', 'decode_errors > 0', 'not handle_closed'],
    task: 'decode bytes under an explicit UTF-8 and cleanup contract without hiding malformed input',
  },
  'bookbot-unicode-normalization': {
    parameters:
      'original_units: int = 9, normalized_units: int = 8, form: str = "NFC", original_kept: bool = True, unicode_version_kept: bool = True',
    body: `    if original_units < 0 or normalized_units < 0:
        return False, normalized_units, "unicode-count"
    if form not in {"NFC", "NFD", "NFKC", "NFKD", "NONE"}:
        return False, normalized_units, "normalization-form"
    if not original_kept:
        return False, normalized_units, "lost-evidence"
    if not unicode_version_kept:
        return False, normalized_units, "unversioned-policy"
    assert original_units >= 0
    return True, normalized_units, "reversible-unicode"`,
    anchors: ['original_units < 0', 'form not in', 'not original_kept', 'not unicode_version_kept'],
    task: 'version normalization and case policy while preserving inspectable original text',
  },
  'bookbot-tokenization-word-policy': {
    parameters:
      'text_length: int = 42, token_count: int = 7, empty_tokens: int = 0, offsets_valid: bool = True, word_policy_named: bool = True',
    body: `    if text_length < 0 or token_count < 0:
        return False, token_count, "token-count"
    if empty_tokens > 0:
        return False, empty_tokens, "empty-token"
    if not offsets_valid:
        return False, token_count, "offset-contract"
    if not word_policy_named:
        return False, token_count, "undefined-word"
    assert token_count <= text_length
    return True, token_count, "bounded-tokens"`,
    anchors: ['text_length < 0', 'empty_tokens > 0', 'not offsets_valid', 'not word_policy_named'],
    task: 'tokenize under a named word policy with nonempty tokens and valid source offsets',
  },
  'bookbot-frequency-counter': {
    parameters:
      'token_count: int = 12, frequency_total: int = 12, vocabulary: int = 5, negative_counts: int = 0, owned_result: bool = True',
    body: `    if token_count < 0 or vocabulary < 0:
        return False, token_count, "count-shape"
    if negative_counts > 0:
        return False, negative_counts, "negative-frequency"
    if frequency_total != token_count:
        return False, frequency_total, "reconciliation"
    if not owned_result:
        return False, vocabulary, "aliased-result"
    assert vocabulary <= token_count
    return True, vocabulary, "reconciled-counter"`,
    anchors: [
      'token_count < 0',
      'negative_counts > 0',
      'frequency_total != token_count',
      'not owned_result',
    ],
    task: 'produce an owned frequency map whose nonnegative counts reconcile to accepted tokens',
  },
  'bookbot-ranking-determinism': {
    parameters:
      'eligible_words: int = 9, ranked_words: int = 9, top_k: int = 5, ties_resolved: bool = True, repeated_output_equal: bool = True',
    body: `    if eligible_words < 0 or ranked_words < 0:
        return False, ranked_words, "rank-shape"
    if ranked_words != eligible_words:
        return False, ranked_words, "rank-coverage"
    if top_k < 1 or top_k > ranked_words:
        return False, top_k, "top-k"
    if not ties_resolved or not repeated_output_equal:
        return False, top_k, "unstable-ranking"
    assert top_k <= ranked_words
    return True, top_k, "deterministic-top-k"`,
    anchors: [
      'ranked_words != eligible_words',
      'top_k < 1',
      'not ties_resolved',
      'not repeated_output_equal',
    ],
    task: 'rank all eligible words with explicit ties and reproducible top-k output',
  },
  'bookbot-character-grapheme-metrics': {
    parameters:
      'code_points: int = 14, graphemes: int = 11, letters: int = 9, labels_explicit: bool = True, segmentation_transfer_named: bool = True',
    body: `    if min(code_points, graphemes, letters) < 0:
        return False, code_points, "metric-count"
    if graphemes > code_points or letters > code_points:
        return False, graphemes, "unit-reconciliation"
    if not labels_explicit:
        return False, letters, "ambiguous-unit"
    if not segmentation_transfer_named:
        return False, graphemes, "grapheme-overclaim"
    assert letters <= code_points
    return True, graphemes, "honest-text-metrics"`,
    anchors: [
      'min\\(code_points',
      'graphemes > code_points',
      'not labels_explicit',
      'not segmentation_transfer_named',
    ],
    task: 'label and reconcile code-point, grapheme, and letter metrics without overstating browser segmentation',
  },
  'bookbot-streaming-bounded-memory': {
    parameters:
      'chunks: int = 8, batch_tokens: int = 120, stream_tokens: int = 120, peak_bytes: int = 8192, memory_budget: int = 16384, fragments_closed: bool = True',
    body: `    if chunks < 1 or batch_tokens < 0 or stream_tokens < 0:
        return False, stream_tokens, "stream-shape"
    if stream_tokens != batch_tokens:
        return False, stream_tokens, "batch-stream-drift"
    if peak_bytes < 0 or peak_bytes > memory_budget:
        return False, peak_bytes, "memory-budget"
    if not fragments_closed:
        return False, chunks, "partial-token"
    assert peak_bytes <= memory_budget
    return True, stream_tokens, "bounded-stream"`,
    anchors: [
      'chunks < 1',
      'stream_tokens != batch_tokens',
      'peak_bytes > memory_budget',
      'not fragments_closed',
    ],
    task: 'prove streaming and batch equivalence under token-fragment and peak-memory bounds',
  },
  'bookbot-domain-model-pipeline': {
    parameters:
      'stages: int = 7, immutable_records: bool = True, typed_boundaries: bool = True, schema_version: int = 1, stage_failures: int = 0',
    body: `    if stages < 5 or schema_version < 1:
        return False, stages, "pipeline-shape"
    if not immutable_records:
        return False, stages, "mutable-evidence"
    if not typed_boundaries:
        return False, stages, "untyped-stage"
    if stage_failures > 0:
        return False, stage_failures, "stage-failure"
    assert stages >= 5
    return True, schema_version, "versioned-pipeline"`,
    anchors: ['stages < 5', 'not immutable_records', 'not typed_boundaries', 'stage_failures > 0'],
    task: 'compose typed stages and immutable evidence under a versioned serialization schema',
  },
  'bookbot-report-format-accessibility': {
    parameters:
      'report_rows: int = 8, width: int = 72, diagnostics_on_stderr: bool = True, color_only_signals: int = 0, structured_alternative: bool = True',
    body: `    if report_rows < 1 or width < 40:
        return False, report_rows, "report-shape"
    if not diagnostics_on_stderr:
        return False, report_rows, "stream-contract"
    if color_only_signals > 0:
        return False, color_only_signals, "color-only"
    if not structured_alternative:
        return False, report_rows, "missing-alternative"
    assert width >= 40
    return True, report_rows, "accessible-report"`,
    anchors: [
      'report_rows < 1',
      'not diagnostics_on_stderr',
      'color_only_signals > 0',
      'not structured_alternative',
    ],
    task: 'format a reflowable report with separated diagnostics, no color-only meaning, and structured alternatives',
  },
  'bookbot-errors-exit-status': {
    parameters:
      'expected_failures: int = 2, mapped_failures: int = 2, exit_status: int = 2, partial_output: bool = False, recovery_named: bool = True',
    body: `    if expected_failures < 0 or mapped_failures < 0:
        return False, mapped_failures, "failure-count"
    if mapped_failures != expected_failures:
        return False, mapped_failures, "unmapped-error"
    if exit_status == 0:
        return False, exit_status, "false-success"
    if partial_output or not recovery_named:
        return False, exit_status, "unsafe-recovery"
    assert exit_status > 0
    return True, exit_status, "causal-failure"`,
    anchors: [
      'mapped_failures != expected_failures',
      'exit_status == 0',
      'partial_output',
      'not recovery_named',
    ],
    task: 'map expected failures to causal diagnostics, stable nonzero status, atomic output, and recovery guidance',
  },
  'bookbot-argparse-interface': {
    parameters:
      'arguments: int = 6, invalid_arguments: int = 3, invalid_rejected: int = 3, help_has_units: bool = True, abbreviations_disabled: bool = True, color_controlled: bool = True',
    body: `    if arguments < 1 or invalid_arguments < 0:
        return False, arguments, "argument-shape"
    if invalid_rejected != invalid_arguments:
        return False, invalid_rejected, "argument-validation"
    if not help_has_units:
        return False, arguments, "help-contract"
    if not abbreviations_disabled or not color_controlled:
        return False, arguments, "parser-reproducibility"
    assert invalid_rejected == invalid_arguments
    return True, arguments, "testable-cli"`,
    anchors: [
      'invalid_rejected != invalid_arguments',
      'not help_has_units',
      'not abbreviations_disabled',
      'not color_controlled',
    ],
    task: 'define and validate a reproducible task-oriented argparse interface with useful help',
  },
  'bookbot-testing-fixtures': {
    parameters:
      'unit_cases: int = 18, integration_cases: int = 7, cli_cases: int = 8, changed_defect_detected: bool = True, installed_smoke: bool = True',
    body: `    if min(unit_cases, integration_cases, cli_cases) < 1:
        return False, 0, "test-layers"
    if integration_cases < 2:
        return False, integration_cases, "filesystem-evidence"
    if cli_cases < 2:
        return False, cli_cases, "cli-evidence"
    if not changed_defect_detected or not installed_smoke:
        return False, unit_cases, "weak-suite"
    total = unit_cases + integration_cases + cli_cases
    assert total >= 7
    return True, total, "risk-layered-tests"`,
    anchors: [
      'min\\(unit_cases',
      'integration_cases < 2',
      'cli_cases < 2',
      'not changed_defect_detected',
    ],
    task: 'layer unit, real-file integration, CLI, changed-defect, and installed smoke evidence',
  },
  'bookbot-performance-profiling': {
    parameters:
      'tokens: int = 10000, elapsed_ms: float = 42.0, peak_kib: int = 640, time_budget_ms: float = 100.0, memory_budget_kib: int = 1024, output_equal: bool = True',
    body: `    if tokens < 1 or elapsed_ms < 0.0 or peak_kib < 0:
        return False, elapsed_ms, "measurement-shape"
    if elapsed_ms > time_budget_ms:
        return False, elapsed_ms, "time-budget"
    if peak_kib > memory_budget_kib:
        return False, peak_kib, "memory-budget"
    if not output_equal:
        return False, elapsed_ms, "semantic-regression"
    assert elapsed_ms <= time_budget_ms
    return True, round(elapsed_ms, 3), "profiled-capacity"`,
    anchors: [
      'tokens < 1',
      'elapsed_ms > time_budget_ms',
      'peak_kib > memory_budget_kib',
      'not output_equal',
    ],
    task: 'measure representative time and memory while preserving byte-for-byte correctness',
  },
  'bookbot-packaging-release': {
    parameters:
      'metadata_fields: int = 9, artifact_count: int = 2, clean_revision: bool = True, contents_inspected: bool = True, fresh_install_passed: bool = True',
    body: `    if metadata_fields < 6 or artifact_count < 2:
        return False, artifact_count, "package-shape"
    if not clean_revision:
        return False, artifact_count, "dirty-build"
    if not contents_inspected:
        return False, artifact_count, "unknown-contents"
    if not fresh_install_passed:
        return False, artifact_count, "install-failure"
    assert artifact_count >= 2
    return True, metadata_fields, "installable-artifacts"`,
    anchors: [
      'metadata_fields < 6',
      'not clean_revision',
      'not contents_inspected',
      'not fresh_install_passed',
    ],
    task: 'build inspected wheel and source artifacts from an identified revision and test a fresh installation',
  },
  'bookbot-security-recovery-defense': {
    parameters:
      'correctness: bool = True, accessibility: bool = True, security: bool = True, performance: bool = True, reproducible_artifact: bool = True, rollback: bool = True, recovery: bool = True, residual_risk_owned: bool = True',
    body: `    gates = (correctness, accessibility, security, performance, reproducible_artifact, rollback, recovery)
    passed = sum(1 for gate in gates if gate)
    if not correctness or not accessibility:
        return False, passed, "quality-gates"
    if not security or not performance:
        return False, passed, "risk-gates"
    if not reproducible_artifact or not rollback or not recovery:
        return False, passed, "release-gates"
    if not residual_risk_owned:
        return False, passed, "unowned-risk"
    assert passed == len(gates)
    return True, passed, "production-defense"`,
    anchors: [
      'not correctness',
      'not security',
      'not reproducible_artifact',
      'not residual_risk_owned',
    ],
    task: 'defend an immutable Bookbot release across quality, accessibility, security, capacity, rollback, recovery, and residual risk',
  },
};

const ENVIRONMENTS = [
  'a multilingual community archive intake',
  'an offline public-library reading report',
  'a digital-humanities corpus revision',
  'an assistive-technology terminal review',
  'a large-file migration rehearsal',
  'a clean-environment package release',
];

const CHANGES = [
  'replace an ASCII word with a canonically equivalent combining sequence and compare the declared counts',
  'split one word and one UTF-8 sequence across stream chunks and compare batch output byte-for-byte',
  'introduce an equal-frequency tie and prove the secondary ranking key is stable',
  'change LF to CRLF, remove the final newline, and preserve the declared word and line policy',
  'move the input through a symlink outside the allowed root and reject it without reading content',
  'install the built wheel in a fresh environment and rerun success, invalid-argument, and decode-failure cases',
];

const CONSTRAINTS = [
  'retain source permission, digest purpose, revision, Python, Unicode, policy, command, and output identity',
  'keep browser work pure, deterministic, bounded, and free of host file, process, Git, package-install, credential, and release effects',
  'preserve original text and offsets beside every normalized comparison key and report exclusion',
  'keep stdout machine-safe, diagnostics on stderr, status explicit, and every signal understandable without color',
  'test empty, malformed, Unicode, tied, large, changed-policy, and rejected cases before accepting output',
  'record the first failed boundary, causal evidence, repair, regression test, rollback, recovery, and residual-risk owner',
];

function details(seed) {
  const cleaned = seed.replace(/[^a-z0-9]/giu, '').toLowerCase() || '0';
  let value = 2166136261;
  for (const character of cleaned) {
    value ^= character.charCodeAt(0);
    value = Math.imul(value, 16777619);
  }
  value >>>= 0;
  return {
    caseNumber: (value % 9000) + 1000,
    environment: ENVIRONMENTS[value % ENVIRONMENTS.length],
    change: CHANGES[(value >>> 4) % CHANGES.length],
    constraint: CONSTRAINTS[(value >>> 8) % CONSTRAINTS.length],
  };
}

function lookaheads(anchors, scope) {
  return anchors.map((anchor) => `(?=${scope}*?${anchor})`).join('');
}

export function bookbotPythonScenario(moduleId, seed, activityKind = 'practice', competency) {
  const spec = SPECS[moduleId];
  if (!spec) throw new Error(`Missing Bookbot scenario profile for ${moduleId}`);
  const chosen = details(seed.toString(36));
  const probe = competency ? ` Competency probe: ${competency.statement}` : '';
  return `A ${activityKind} Bookbot team handles case ${chosen.caseNumber} during ${chosen.environment}. Build deterministic Python evidence to ${spec.task}; ${chosen.constraint}; then ${chosen.change}. Browser code uses pure bounded functions and original fixed fixtures only. Real files, terminals, subprocesses, Git mutations, packages, installations, native profiling, operating-system races, load, publication, and production behavior require explicit controlled transfer gates.${probe}`;
}

export function bookbotPythonEvidenceContract({
  competencyId,
  moduleId,
  functionName,
  marker,
  suffix,
}) {
  const spec = SPECS[moduleId];
  if (!spec) throw new Error(`Missing Bookbot evidence profile for ${moduleId}`);
  const chosen = details(suffix);
  const scope = '(?:(?!# Evidence:)[\\s\\S])';
  return {
    marker,
    pattern: `${marker}${scope}*?def\\s+${functionName}\\s*\\(${scope}*?\\)\\s*(?:->[^:]+)?\\s*:${lookaheads(spec.anchors, scope)}(?=${scope}*?assert)(?=${scope}*?return)${scope}*?return`,
    example: `${marker}
# Competency: ${competencyId}.
# Case ${chosen.caseNumber}: ${chosen.environment}.
# Operating constraint: ${chosen.constraint}.
# Changed case: ${chosen.change}.
def ${functionName}(${spec.parameters}) -> tuple[bool, int | float, str]:
    evidence_variant_${suffix} = "${suffix}-${[...suffix].reverse().join('')}-${chosen.caseNumber}"
    assert evidence_variant_${suffix}
    evidence_axes_${suffix} = (
        "corpus${suffix}",
        "policy${[...suffix].reverse().join('')}",
        "revision${chosen.caseNumber}",
        "command${suffix}${chosen.caseNumber}",
        "report${[...suffix].reverse().join('')}${chosen.caseNumber}",
        "test${chosen.caseNumber}${suffix}",
    )
    assert len(set(evidence_axes_${suffix})) == 6
${spec.body}
`,
    requirement: `Append a runnable pure-Python function headed "${marker}" that uses case ${chosen.caseNumber} to ${spec.task}. Keep its defaults runnable, assert an invariant, and return observable changed-case evidence. Browser code must not open host files, run processes or Git, install packages, read credentials or host state, publish artifacts, or cause external effects; verify native boundaries later with Python 3.14.6, Unicode 17, disposable files and environments, real CLI and package runs, profiling, accessibility, security, load, rollback, recovery, and release gates.`,
  };
}

export function bookbotPythonWorkedExample(moduleId, seed) {
  return bookbotPythonEvidenceContract({
    competencyId: `bookbot-worked-${moduleId}-${seed}`,
    moduleId,
    functionName: `worked_${moduleId.replaceAll('-', '_')}_${seed}`,
    marker: `# Evidence: bookbot-worked-${moduleId}-${seed}`,
    suffix: `worked${seed}`,
  }).example;
}

export const bookbotPythonEvidenceModuleIds = Object.freeze(Object.keys(SPECS));
