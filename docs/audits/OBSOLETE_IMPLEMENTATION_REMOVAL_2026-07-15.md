# Obsolete Implementation Removal Audit

Date: 2026-07-15
State: verified removal milestone; broader rebuild remains active

## Decision

LEARN-IT-ALL keeps one current learner hierarchy: `/courses` for discovery and `/learn` for course journeys and activities. Compatibility aliases, retired endpoint tombstones, guessed equivalence, disconnected practice hubs, arbitrary learner points, and code that can regenerate unapproved instruction are prohibited.

An artifact may remain only when it is one of the following:

1. a current production runtime dependency;
2. current learner evidence that must be preserved exactly;
3. explicit audit/research input still needed to build and verify its replacement;
4. reproducible research or mechanical runtime-index tooling.

No artifact remains merely because it existed before.

## Removed executable surface

- Deleted the proportional bookmark mapper. It guessed an activity from an ordinal ratio and therefore could not prove equivalent learning intent.
- Deleted all nested `/courses/:courseId/...` page aliases and all retired `/api/courses/...` endpoint tombstones.
- Deleted the unused `/api/courses` catalog endpoints. Current pages load canonical course data directly.
- Deleted the dead `/dashboard` redirect.
- Deleted the standalone challenge-room page containing the rejected “Practice rooms with actual checks” and repository-decision copy.
- Deleted the separate arcade, seven game routes, session-point/streak components, and their game engines. Practice remains inside prerequisite-ordered course activities with persisted evidence.
- Removed XP and streak presentation from home, course, activity, progress, locked-state, and settings copy. Learner-facing metrics now describe completed interactions, remaining work, attempts, reviews, and preserved evidence.

## Removed generation surface

The removal deletes 117 files under `scripts/`, including:

- every Responsive Web Design blueprint and learner-content generator;
- all shared 53-course blueprint/content generators;
- all generator-only course configuration catalogs;
- all generator-only evidence-profile helpers;
- all package commands under `curriculum:blueprint:*` and `curriculum:content:*`.

The only remaining `generate-*` programs are:

- current RWD research coverage, HTML concepts, CSS concepts, concept alignment, and candidate architecture;
- mechanical course outlines;
- the mechanical compressed runtime index.

This prevents a command from silently overwriting future researched work with the current audit-required templates.

## Learner evidence preservation

The local database contained one completed earlier lesson and no rows in the other five earlier course tables. The completed record was copied byte-for-byte as JSON plus typed provenance into `historical_learning_records`. Its course, item, outcome, and timestamp were verified. All six earlier runtime tables were then dropped. The temporary migration code was removed after the transaction, so the final runtime schema has neither the earlier tables nor a permanent compatibility path.

Historical evidence does not unlock current mastery. It remains visible and user-deletable as earlier learning history.

## Explicitly retained inputs

`blueprints/*.json` and `content/v2/courses/**` remain because current research coverage, the catalog, and learner routes still read them. They are all `audit-required`, not approved target content. Deleting them now would replace flawed courses with broken routes rather than better courses.

Their removal rule is exact: research the course, accept its prerequisite and competency architecture, author and review a vertical slice, verify data/runtime/accessibility/assessment/learner flow, scale only after the slice passes, cut over, and then delete the superseded files. No compatibility route or content generator is allowed during that process.

## Regression protection

`src/lib/currentPlatformSurface.test.ts` now fails when:

- a retired/parallel route hierarchy returns;
- a blueprint or learner-content generator command returns;
- any earlier database table name returns to the runtime schema;
- primary navigation links to challenges, games, or dashboard;
- XP or streak presentation returns to the primary learner surfaces.

Focused verification first passed 7 test files and 47 tests. The final gate then passed 90 test files and 608 tests, type-check, normal lint, strict lint across 185 active source/script files, and the Next.js 16.2.10 production build. Its route inventory contains only home, health, progress, settings, tracks, current V2 activity/runtime APIs, `/courses`, `/learn`, `/progress`, `/settings`, and `/tracks`.

Production browser verification passed the public home at 390×844, catalog/course/studio at 768×1024, and progress/settings at 1440×900 with one H1, zero horizontal overflow, zero undersized visible controls, reduced-motion enabled, no error overlay, and no page or console errors. A real tablet activity attempt returned HTTP 200 and announced specific corrective feedback. All removed page and API samples returned 404. Browser review exposed and repaired hidden phone navigation, a 19-pixel catalog-brand target, and 40-pixel reorder controls. The clean review server remains available at `http://localhost:3000`; its real grading request also returned HTTP 200. Lighthouse remains paused.
