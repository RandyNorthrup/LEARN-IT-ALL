import { spawnSync } from 'node:child_process';

const generators = [
  'generate-rwd-foundation-content.mjs',
  'generate-rwd-html-content.mjs',
  'generate-rwd-semantic-html-content.mjs',
  'generate-rwd-forms-tables-content.mjs',
  'generate-rwd-survey-project-content.mjs',
  'generate-rwd-accessibility-content.mjs',
  'generate-rwd-html-review-content.mjs',
  'generate-rwd-basic-css-content.mjs',
  'generate-rwd-design-content.mjs',
  'generate-rwd-units-content.mjs',
  'generate-rwd-pseudo-content.mjs',
  'generate-rwd-colors-content.mjs',
  'generate-rwd-form-styling-content.mjs',
  'generate-rwd-effects-content.mjs',
  'generate-rwd-flexbox-content.mjs',
  'generate-rwd-shift-deck-project.mjs',
  'generate-rwd-typography-content.mjs',
  'generate-rwd-css-accessibility-content.mjs',
  'generate-rwd-positioning-content.mjs',
  'generate-rwd-attributes-content.mjs',
  'generate-rwd-inventory-project.mjs',
  'generate-rwd-responsive-content.mjs',
  'generate-rwd-field-manual-project.mjs',
  'generate-rwd-custom-properties-content.mjs',
  'generate-rwd-grid-content.mjs',
  'generate-rwd-ethical-launch-project.mjs',
  'generate-rwd-animation-content.mjs',
  'generate-rwd-css-review-content.mjs',
  'generate-rwd-certification-exam.mjs',
];

for (const generator of generators) {
  const result = spawnSync(process.execPath, [`scripts/${generator}`], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
  if (result.status !== 0) {
    throw new Error(`${generator} failed with exit code ${result.status}`);
  }
}

console.log(`Generated all ${generators.length} Responsive Web Design v2 modules in order.`);
