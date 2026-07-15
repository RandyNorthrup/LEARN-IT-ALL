export function sampledFinalExamCompetencies(modules, target = 24) {
  const all = modules.flatMap((module) => module.skills.map((skill) => skill[0]));
  if (all.length <= target) return all;
  const selected = new Set([all[0], all.at(-1)]);
  for (const module of modules) {
    selected.add(module.skills[0][0]);
    selected.add(module.skills.at(-1)[0]);
  }
  const stride = Math.max(1, Math.floor(all.length / target));
  for (let index = 0; index < all.length && selected.size < target; index += stride) {
    selected.add(all[index]);
  }
  return [...selected].slice(0, target);
}

export function standardAudience(description, entryKnowledge) {
  return {
    description,
    entryKnowledge,
    deviceConstraints: [
      'Desktop or tablet with a modern browser; command-line labs require a local development environment.',
    ],
    accessibilityAssumptions: [
      'Learners may use keyboard navigation, zoom, screen readers, voice input, captions, high contrast, or reduced motion.',
    ],
  };
}

export function datedSource(title, authority, url, version, scope) {
  return { title, authority, url, version, reviewedAt: '2026-07-13', scope };
}
