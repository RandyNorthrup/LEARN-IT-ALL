import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const component = readFileSync(
  path.join(process.cwd(), 'src/components/games/AccessibleLander.tsx'),
  'utf8'
);
const styles = readFileSync(
  path.join(process.cwd(), 'src/components/games/AccessibleLander.module.css'),
  'utf8'
);

describe('accessible lander presentation', () => {
  it('provides text telemetry, live status, semantic controls, and a trace table', () => {
    expect(component).toContain('aria-live="polite"');
    expect(component).toContain('<fieldset');
    expect(component).toContain('<caption>Deterministic telemetry trace</caption>');
    expect(component).toContain('Source is parsed as data and never executed.');
    expect(component).not.toContain('<canvas');
  });

  it('is responsive, touch sized, and disables decorative motion when requested', () => {
    expect(styles).toMatch(/\.manualControls button\s*\{[^}]*min-height:\s*74px;/);
    expect(styles).toMatch(/\.run\s*\{[^}]*min-height:\s*48px;/);
    expect(styles).toContain('@media (max-width: 900px)');
    expect(styles).toContain('@media (max-width: 600px)');
    expect(styles).toMatch(/@media \(prefers-reduced-motion: reduce\)[\s\S]*transition:\s*none;/);
  });
});
