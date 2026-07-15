import type { LearningFiles } from './draft';

function escapeClosingStyle(css: string): string {
  return css.replace(/<\/style/gi, '<\\/style');
}

function escapeClosingScript(javascript: string): string {
  return javascript.replace(/<\/script/gi, '<\\/script');
}

export function buildSandboxedWebPreview(files: LearningFiles): string {
  const style = `<style>${escapeClosingStyle(files.css)}</style>`;
  const script = files.javascript.trim()
    ? `<script>${escapeClosingScript(files.javascript)}</script>`
    : '';
  const policy = `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; img-src data: blob:; font-src data:">`;
  const source = files.html.trim();
  if (/<html(?:\s|>)/i.test(source)) {
    let document = /<\/head>/i.test(source)
      ? source.replace(/<\/head>/i, `${policy}${style}</head>`)
      : source.replace(/<html([^>]*)>/i, `<html$1><head>${policy}${style}</head>`);
    document = /<\/body>/i.test(document)
      ? document.replace(/<\/body>/i, `${script}</body>`)
      : `${document}${script}`;
    return document;
  }
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">${policy}${style}</head><body>${source}${script}</body></html>`;
}
