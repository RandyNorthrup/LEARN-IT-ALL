// Next.js supports Chrome/Edge 111+, Firefox 111+, and Safari 16.4+. Its
// unconditional App Router compatibility module also patches language features
// already present throughout that range. Keep only URL.canParse, the one newer
// API that framework code may call, so supported browsers retain the same safe
// fallback without shipping legacy JavaScript on every route.
if (!('canParse' in URL)) {
  Object.defineProperty(URL, 'canParse', {
    configurable: true,
    writable: true,
    value(url: string | URL, base?: string | URL): boolean {
      try {
        new URL(url, base);
        return true;
      } catch {
        return false;
      }
    },
  });
}

export {};
