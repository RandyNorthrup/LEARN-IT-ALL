import { describe, expect, it } from 'vitest';
import { buildSandboxedWebPreview } from './webPreview';

describe('buildSandboxedWebPreview', () => {
  it('renders CSS and JavaScript inside a restrictive preview policy', () => {
    const preview = buildSandboxedWebPreview({
      html: '<main id="status">Waiting</main>',
      css: 'main { color: rebeccapurple; }',
      javascript: 'document.querySelector("#status").textContent = "Ready";',
      typescript: '',
      python: '',
      go: '',
      c: '',
      sql: '',
      shell: '',
      prompt: '',
      config: '',
    });

    expect(preview).toContain("default-src 'none'");
    expect(preview).toContain('main { color: rebeccapurple; }');
    expect(preview).toContain('textContent = "Ready"');
  });

  it('escapes closing tags supplied by learner code', () => {
    const preview = buildSandboxedWebPreview({
      html: '<main></main>',
      css: 'body::after { content: "</style>"; }',
      javascript: 'console.log("</script>")',
      typescript: '',
      python: '',
      go: '',
      c: '',
      sql: '',
      shell: '',
      prompt: '',
      config: '',
    });

    expect(preview).toContain('<\\/style>');
    expect(preview).toContain('<\\/script>');
  });
});
