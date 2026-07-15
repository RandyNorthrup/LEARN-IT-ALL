function escaped(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function profile(parameters, task, checks, metric, assertion, label) {
  return {
    parameters,
    task,
    anchors: checks.map(([condition]) => escaped(condition)),
    body: `${checks
      .map(
        ([condition, failedMetric, failure]) =>
          `    if ${condition}:\n        return False, ${failedMetric}, "${failure}"`
      )
      .join('\n')}
    assert ${assertion}
    return True, ${metric}, "${label}"`,
  };
}

const SPECS = {
  'static-site-outcomes-repo-architecture': profile(
    'reader_task: str = "find-current-guidance", acceptance_cases: int = 8, repository_clean: bool = True, accessibility_plan: bool = True, content_authorized: bool = True',
    'gate the publication charter on reader value, repository state, accessibility, and content authority',
    [
      ['not reader_task.strip() or acceptance_cases < 4', 'acceptance_cases', 'undefined-outcome'],
      ['not repository_clean', 'acceptance_cases', 'repository-baseline'],
      ['not accessibility_plan', 'acceptance_cases', 'accessibility-gap'],
      ['not content_authorized', 'acceptance_cases', 'content-authority'],
    ],
    'acceptance_cases',
    'acceptance_cases >= 4',
    'bounded-site-charter'
  ),
  'static-site-http-url-model': profile(
    'requests: int = 7, mapped_routes: int = 7, base_path: str = "/handbook/", broken_fragments: int = 0, media_types_valid: bool = True',
    'reconcile static requests, base-path URL resolution, routes, fragments, and representation metadata',
    [
      ['requests < 1 or mapped_routes < 1', 'mapped_routes', 'request-shape'],
      ['mapped_routes != requests', 'mapped_routes', 'route-mapping'],
      [
        'not base_path.startswith("/") or not base_path.endswith("/")',
        'mapped_routes',
        'base-path',
      ],
      ['broken_fragments > 0 or not media_types_valid', 'broken_fragments', 'delivery-contract'],
    ],
    'mapped_routes',
    'mapped_routes == requests',
    'resolved-static-delivery'
  ),
  'static-site-cli-pipeline': profile(
    'stages: int = 10, completed: int = 10, import_safe: bool = True, staged_output: bool = True, prior_artifact_kept: bool = True',
    'own an import-safe staged build pipeline that preserves the prior artifact on failure',
    [
      ['stages < 8 or completed < 0', 'completed', 'pipeline-shape'],
      ['completed != stages', 'completed', 'partial-pipeline'],
      ['not import_safe or not staged_output', 'completed', 'effect-boundary'],
      ['not prior_artifact_kept', 'completed', 'destructive-output'],
    ],
    'completed',
    'completed == stages',
    'atomic-pipeline'
  ),
  'static-site-paths-content-discovery': profile(
    'discovered: int = 12, admitted: int = 10, rejected: int = 2, root_escapes: int = 0, route_collisions: int = 0',
    'build a bounded content manifest with explicit rejection, root, and collision evidence',
    [
      ['min(discovered, admitted, rejected) < 0', 'discovered', 'discovery-count'],
      ['admitted + rejected != discovered', 'admitted', 'discovery-reconciliation'],
      ['root_escapes > 0', 'root_escapes', 'root-escape'],
      ['route_collisions > 0', 'route_collisions', 'route-collision'],
    ],
    'admitted',
    'admitted + rejected == discovered',
    'admitted-content-manifest'
  ),
  'static-site-text-encoding-metadata': profile(
    'byte_count: int = 240, decoded_units: int = 228, metadata_fields: int = 6, decode_errors: int = 0, schema_errors: int = 0',
    'decode UTF-8 content and validate bounded front matter without hiding data loss',
    [
      ['byte_count < 0 or decoded_units < 0', 'decoded_units', 'text-count'],
      ['decoded_units > byte_count', 'decoded_units', 'encoding-units'],
      ['metadata_fields < 3', 'metadata_fields', 'metadata-shape'],
      [
        'decode_errors > 0 or schema_errors > 0',
        'decode_errors + schema_errors',
        'invalid-document',
      ],
    ],
    'metadata_fields',
    'byte_count >= decoded_units',
    'validated-document'
  ),
  'static-site-document-ast': profile(
    'tokens: int = 18, nodes: int = 15, source_spans: int = 15, invalid_edges: int = 0, max_depth: int = 5',
    'construct a source-mapped acyclic document tree under a depth budget',
    [
      ['tokens < 1 or nodes < 1', 'nodes', 'tree-shape'],
      ['source_spans != nodes', 'source_spans', 'span-coverage'],
      ['invalid_edges > 0', 'invalid_edges', 'tree-invariant'],
      ['max_depth < 1 or max_depth > 64', 'max_depth', 'depth-budget'],
    ],
    'nodes',
    'source_spans == nodes',
    'source-mapped-tree'
  ),
  'static-site-inline-tokenization': profile(
    'input_units: int = 64, consumed_units: int = 64, delimiter_pairs: int = 4, literal_units: int = 21, work_units: int = 112',
    'consume inline input exactly once while bounding delimiter work and preserving literals',
    [
      ['input_units < 0 or consumed_units < 0', 'consumed_units', 'inline-count'],
      ['consumed_units != input_units', 'consumed_units', 'unconsumed-input'],
      ['delimiter_pairs < 0 or literal_units < 0', 'delimiter_pairs', 'inline-shape'],
      [
        'work_units < input_units or work_units > input_units * 4',
        'work_units',
        'complexity-budget',
      ],
    ],
    'delimiter_pairs',
    'consumed_units == input_units',
    'bounded-inline-tokens'
  ),
  'static-site-inline-links-media': profile(
    'links: int = 9, resolved: int = 8, rejected: int = 1, unsafe_urls: int = 0, missing_alt_decisions: int = 0',
    'resolve references and media through URL safety, integrity, and alternative-text decisions',
    [
      ['min(links, resolved, rejected) < 0', 'links', 'link-count'],
      ['resolved + rejected != links', 'resolved', 'link-reconciliation'],
      ['unsafe_urls > 0', 'unsafe_urls', 'unsafe-url'],
      ['missing_alt_decisions > 0', 'missing_alt_decisions', 'media-alternative'],
    ],
    'resolved',
    'resolved + rejected == links',
    'admitted-links-media'
  ),
  'static-site-block-parsing': profile(
    'lines: int = 28, consumed_lines: int = 28, blocks: int = 9, invalid_containers: int = 0, unclosed_fences: int = 0',
    'parse headings, paragraphs, containers, and fenced code with explicit line consumption',
    [
      ['lines < 1 or consumed_lines < 0', 'consumed_lines', 'line-count'],
      ['consumed_lines != lines', 'consumed_lines', 'line-consumption'],
      ['blocks < 1 or blocks > lines', 'blocks', 'block-shape'],
      [
        'invalid_containers > 0 or unclosed_fences > 0',
        'invalid_containers + unclosed_fences',
        'block-boundary',
      ],
    ],
    'blocks',
    'consumed_lines == lines',
    'bounded-block-tree'
  ),
  'static-site-nesting-recursion': profile(
    'containers_opened: int = 7, containers_closed: int = 7, max_depth: int = 6, recovery_points: int = 2, stalled_positions: int = 0',
    'bound recursive containers, guarantee source advancement, and retain recovery evidence',
    [
      ['containers_opened < 0 or containers_closed < 0', 'containers_closed', 'container-count'],
      ['containers_closed != containers_opened', 'containers_closed', 'container-balance'],
      ['max_depth < 0 or max_depth > 64', 'max_depth', 'depth-budget'],
      ['recovery_points < 1 or stalled_positions > 0', 'stalled_positions', 'recovery-progress'],
    ],
    'max_depth',
    'containers_closed == containers_opened',
    'recoverable-nesting'
  ),
  'static-site-html-rendering-escaping': profile(
    'nodes: int = 14, rendered_nodes: int = 14, escaped_values: int = 6, unsafe_contexts: int = 0, duplicate_ids: int = 0',
    'render every node as deterministic semantic HTML through context-safe boundaries',
    [
      ['nodes < 1 or rendered_nodes < 0', 'rendered_nodes', 'render-count'],
      ['rendered_nodes != nodes', 'rendered_nodes', 'render-coverage'],
      ['escaped_values < 1', 'escaped_values', 'escaping-evidence'],
      [
        'unsafe_contexts > 0 or duplicate_ids > 0',
        'unsafe_contexts + duplicate_ids',
        'unsafe-html',
      ],
    ],
    'rendered_nodes',
    'rendered_nodes == nodes',
    'semantic-safe-html'
  ),
  'static-site-templates-jinja': profile(
    'templates: int = 6, rendered: int = 6, autoescaped: bool = True, strict_undefined: bool = True, unsafe_safe_filters: int = 0',
    'configure strict autoescaped templates with explicit view-model and safe-markup boundaries',
    [
      ['templates < 1 or rendered < 0', 'rendered', 'template-count'],
      ['rendered != templates', 'rendered', 'template-coverage'],
      ['not autoescaped or not strict_undefined', 'rendered', 'environment-policy'],
      ['unsafe_safe_filters > 0', 'unsafe_safe_filters', 'safe-boundary'],
    ],
    'rendered',
    'rendered == templates',
    'strict-layout-system'
  ),
  'static-site-slugs-permalinks': profile(
    'documents: int = 11, routes: int = 11, redirects: int = 3, collisions: int = 0, redirect_loops: int = 0',
    'produce stable collision-free routes, canonicals, and an acyclic redirect graph',
    [
      ['documents < 1 or routes < 0', 'routes', 'route-count'],
      ['routes != documents', 'routes', 'route-coverage'],
      ['redirects < 0 or collisions > 0', 'collisions', 'route-collision'],
      ['redirect_loops > 0', 'redirect_loops', 'redirect-loop'],
    ],
    'routes',
    'routes == documents',
    'stable-route-manifest'
  ),
  'static-site-navigation-taxonomy': profile(
    'published: int = 13, navigable: int = 13, taxonomy_terms: int = 5, feed_entries: int = 13, sitemap_urls: int = 13',
    'reconcile navigation, taxonomy, feeds, and sitemaps to one published route manifest',
    [
      ['published < 1 or navigable < 0', 'navigable', 'publication-count'],
      ['navigable != published', 'navigable', 'orphan-route'],
      ['taxonomy_terms < 1', 'taxonomy_terms', 'taxonomy-shape'],
      [
        'feed_entries != published or sitemap_urls != published',
        'feed_entries',
        'derived-publication-drift',
      ],
    ],
    'navigable',
    'feed_entries == sitemap_urls == published',
    'reconciled-site-graph'
  ),
  'static-site-assets-fingerprints': profile(
    'assets: int = 16, admitted: int = 14, rejected: int = 2, missing_rewrites: int = 0, digest_collisions: int = 0',
    'admit, fingerprint, rewrite, and reconcile bounded licensed assets',
    [
      ['min(assets, admitted, rejected) < 0', 'assets', 'asset-count'],
      ['admitted + rejected != assets', 'admitted', 'asset-reconciliation'],
      ['missing_rewrites > 0', 'missing_rewrites', 'asset-reference'],
      ['digest_collisions > 0', 'digest_collisions', 'asset-collision'],
    ],
    'admitted',
    'admitted + rejected == assets',
    'fingerprinted-assets'
  ),
  'static-site-incremental-dependencies': profile(
    'outputs: int = 20, dependency_nodes: int = 37, invalidated: int = 6, stale_outputs: int = 0, clean_digest_equal: bool = True',
    'prove dependency-aware incremental output is equivalent to a clean build',
    [
      ['outputs < 1 or dependency_nodes < outputs', 'dependency_nodes', 'dependency-shape'],
      ['invalidated < 1 or invalidated > outputs', 'invalidated', 'invalidation-scope'],
      ['stale_outputs > 0', 'stale_outputs', 'stale-output'],
      ['not clean_digest_equal', 'invalidated', 'clean-drift'],
    ],
    'invalidated',
    'dependency_nodes >= outputs',
    'clean-equivalent-incremental'
  ),
  'static-site-accessibility-semantics': profile(
    'pages: int = 8, checked_pages: int = 8, structural_findings: int = 0, media_decisions_missing: int = 0, human_tasks_passed: int = 4',
    'gate generated page structure and content on WCAG evidence and human reader tasks',
    [
      ['pages < 1 or checked_pages < 0', 'checked_pages', 'page-count'],
      ['checked_pages != pages', 'checked_pages', 'accessibility-coverage'],
      [
        'structural_findings > 0 or media_decisions_missing > 0',
        'structural_findings + media_decisions_missing',
        'accessibility-finding',
      ],
      ['human_tasks_passed < 3', 'human_tasks_passed', 'human-evidence'],
    ],
    'human_tasks_passed',
    'checked_pages == pages',
    'accessible-content-model'
  ),
  'static-site-responsive-performance': profile(
    'viewports: int = 3, reflow_passes: int = 3, page_kib: int = 180, page_budget_kib: int = 220, layout_shifts: int = 0',
    'gate representative pages on reflow, progressive enhancement, and resource budgets',
    [
      ['viewports < 3 or reflow_passes < 0', 'reflow_passes', 'viewport-matrix'],
      ['reflow_passes != viewports', 'reflow_passes', 'reflow-failure'],
      ['page_kib < 0 or page_kib > page_budget_kib', 'page_kib', 'resource-budget'],
      ['layout_shifts > 0', 'layout_shifts', 'layout-instability'],
    ],
    'page_kib',
    'reflow_passes == viewports',
    'responsive-budget'
  ),
  'static-site-security-trust': profile(
    'untrusted_cases: int = 12, rejected_or_encoded: int = 12, path_escapes: int = 0, secret_findings: int = 0, unsafe_urls: int = 0',
    'enforce content, path, template, URL, secret, and defense-in-depth trust boundaries',
    [
      ['untrusted_cases < 1 or rejected_or_encoded < 0', 'rejected_or_encoded', 'threat-cases'],
      ['rejected_or_encoded != untrusted_cases', 'rejected_or_encoded', 'injection-coverage'],
      [
        'path_escapes > 0 or secret_findings > 0',
        'path_escapes + secret_findings',
        'publication-leak',
      ],
      ['unsafe_urls > 0', 'unsafe_urls', 'unsafe-url'],
    ],
    'rejected_or_encoded',
    'rejected_or_encoded == untrusted_cases',
    'bounded-trust-policy'
  ),
  'static-site-testing-validation': profile(
    'fixture_cases: int = 48, detected_mutants: int = 46, required_mutants: int = 45, validator_errors: int = 0, browser_tasks_failed: int = 0',
    'combine mutation-sensitive parser, property, validation, and browser evidence',
    [
      ['fixture_cases < 10 or detected_mutants < 0', 'detected_mutants', 'test-shape'],
      ['detected_mutants < required_mutants', 'detected_mutants', 'mutation-gap'],
      ['validator_errors > 0', 'validator_errors', 'invalid-output'],
      ['browser_tasks_failed > 0', 'browser_tasks_failed', 'reader-flow-failure'],
    ],
    'detected_mutants',
    'detected_mutants >= required_mutants',
    'layered-verification'
  ),
  'static-site-diagnostics-observability': profile(
    'diagnostics: int = 7, located: int = 7, build_stages: int = 10, measured_stages: int = 10, unredacted_secrets: int = 0',
    'produce deterministic located diagnostics and bounded redacted build metrics',
    [
      ['diagnostics < 0 or located < 0', 'located', 'diagnostic-count'],
      ['located != diagnostics', 'located', 'location-coverage'],
      ['build_stages < 1 or measured_stages != build_stages', 'measured_stages', 'metric-coverage'],
      ['unredacted_secrets > 0', 'unredacted_secrets', 'diagnostic-leak'],
    ],
    'measured_stages',
    'located == diagnostics',
    'actionable-build-report'
  ),
  'static-site-packaging-cli': profile(
    'artifacts: int = 2, inspected: int = 2, clean_installs: int = 3, command_smokes: int = 3, unsafe_plugins: int = 0',
    'verify inspected package artifacts, clean command installs, resources, and plugin limits',
    [
      ['artifacts != 2 or inspected < 0', 'inspected', 'artifact-shape'],
      ['inspected != artifacts', 'inspected', 'artifact-inspection'],
      ['clean_installs < 2 or command_smokes != clean_installs', 'command_smokes', 'clean-install'],
      ['unsafe_plugins > 0', 'unsafe_plugins', 'plugin-boundary'],
    ],
    'command_smokes',
    'inspected == artifacts',
    'installed-generator'
  ),
  'static-site-ci-deployment': profile(
    'clean_builds: int = 2, equal_digests: bool = True, artifact_promotions: int = 1, rebuilds_after_approval: int = 0, smoke_failures: int = 0',
    'promote one reproducible least-authority artifact through deployment and post-release smoke checks',
    [
      ['clean_builds < 2', 'clean_builds', 'reproducibility-sample'],
      ['not equal_digests', 'clean_builds', 'digest-drift'],
      [
        'artifact_promotions != 1 or rebuilds_after_approval > 0',
        'artifact_promotions',
        'promotion-boundary',
      ],
      ['smoke_failures > 0', 'smoke_failures', 'postdeploy-failure'],
    ],
    'clean_builds',
    'artifact_promotions == 1',
    'immutable-deployment'
  ),
  'static-site-release-recovery-defense': profile(
    'routes_before: int = 40, routes_after: int = 42, accounted_routes: int = 42, rollback_seconds: int = 90, recovery_owner: bool = True',
    'defend migration, immutable release, cache-aware rollback, recovery ownership, and residual risk',
    [
      ['routes_before < 1 or routes_after < 1', 'routes_after', 'migration-shape'],
      ['accounted_routes != routes_after', 'accounted_routes', 'route-diff-gap'],
      ['rollback_seconds < 0 or rollback_seconds > 300', 'rollback_seconds', 'rollback-budget'],
      ['not recovery_owner', 'routes_after', 'unowned-recovery'],
    ],
    'routes_after',
    'accounted_routes == routes_after',
    'production-publication-defense'
  ),
};

const ENVIRONMENTS = [
  'a multilingual public-service handbook migration',
  'an accessibility-led community newsroom release',
  'an offline-first field documentation build',
  'a project-subpath GitHub Pages deployment',
  'a large technical reference incremental rebuild',
  'a compromised-content recovery rehearsal',
];

const CHANGES = [
  'rename a titled source while preserving its public identity and redirect evidence',
  'insert malformed nested delimiters and retain later valid content with a located diagnostic',
  'publish below a project subpath and verify every internal URL, fragment, asset, feed, and canonical',
  'replace a trusted author fixture with untrusted raw HTML, unsafe URLs, and an active SVG',
  'delete a source and change a shared layout, then compare incremental and clean artifact digests',
  'zoom a translated long-form page to 400 percent at mobile width with images and code blocks',
];

const CONSTRAINTS = [
  'retain reader, content owner, revision, configuration, source, parser, route, artifact, deployment, and result identity',
  'keep browser work pure, deterministic, bounded, and free of native filesystem, template engine, validator, network, GitHub, DNS, TLS, CDN, and host effects',
  'preserve source spans, Unicode policy, trust classification, route base, contextual encoding, diagnostics, and accessibility decisions',
  'test empty, malformed, deeply nested, Unicode, collision, unsafe URL, missing asset, stale cache, rejected, and recovery cases',
  'reconcile content, routes, navigation, links, assets, feeds, sitemaps, output files, and artifact digests before approval',
  'record the first failed invariant, repair, regression evidence, reader task, rollback, recovery, and residual-risk owner',
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

export function staticSitePythonScenario(moduleId, seed, activityKind = 'practice', competency) {
  const spec = SPECS[moduleId];
  if (!spec) throw new Error(`Missing static-site scenario profile for ${moduleId}`);
  const chosen = details(seed.toString(36));
  const probe = competency ? ` Competency probe: ${competency.statement}` : '';
  return `A ${activityKind} publishing team handles case ${chosen.caseNumber} during ${chosen.environment}. Build deterministic Python evidence to ${spec.task}; ${chosen.constraint}; then ${chosen.change}. Browser code uses pure bounded models and original fixed fixtures only. Real filesystems, full CommonMark, markdown-it-py, Jinja, validators, browsers, GitHub Actions, Pages, DNS, TLS, CDN caches, and production behavior require explicit controlled transfer gates.${probe}`;
}

export function staticSitePythonEvidenceContract({
  competencyId,
  moduleId,
  functionName,
  marker,
  suffix,
}) {
  const spec = SPECS[moduleId];
  if (!spec) throw new Error(`Missing static-site evidence profile for ${moduleId}`);
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
        "reader${suffix}",
        "source${chosen.caseNumber}",
        "parse${[...suffix].reverse().join('')}",
        "route${suffix}${chosen.caseNumber}",
        "artifact${chosen.caseNumber}${suffix}",
        "recovery${[...suffix].reverse().join('')}${chosen.caseNumber}",
    )
    assert len(set(evidence_axes_${suffix})) == 6
${spec.body}
`,
    requirement: `Append a runnable pure-Python function headed "${marker}" that uses case ${chosen.caseNumber} to ${spec.task}. Keep its defaults runnable, assert an invariant, and return observable changed-case evidence. Browser code must not claim native filesystem, full CommonMark, markdown-it-py, Jinja, validator, browser, GitHub, Pages, DNS, TLS, CDN, cache, or production behavior; verify those boundaries later with Python 3.14.6, CommonMark 0.31.2 fixtures, markdown-it-py 4.2.0, Jinja 3.1.6 strict autoescape, pytest 9.1.1, standards validators, real browsers, clean package installs, reproducible artifacts, staged deployment, rollback, recovery, and release gates.`,
  };
}

export function staticSitePythonWorkedExample(moduleId, seed) {
  return staticSitePythonEvidenceContract({
    competencyId: `ssg-worked-${moduleId}-${seed}`,
    moduleId,
    functionName: `worked_${moduleId.replaceAll('-', '_')}_${seed}`,
    marker: `# Evidence: ssg-worked-${moduleId}-${seed}`,
    suffix: `worked${seed}`,
  }).example;
}

export const staticSitePythonEvidenceModuleIds = Object.freeze(Object.keys(SPECS));
