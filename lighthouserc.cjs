const profileName = process.env.LIGHTHOUSE_PROFILE || 'mobile';

const profiles = {
  mobile: {
    formFactor: 'mobile',
    screenEmulation: { mobile: true, width: 412, height: 823, deviceScaleFactor: 2.625, disabled: false },
    throttling: {
      rttMs: 150,
      throughputKbps: 1638.4,
      cpuSlowdownMultiplier: 3,
      requestLatencyMs: 0,
      downloadThroughputKbps: 0,
      uploadThroughputKbps: 0,
    },
  },
  tablet: {
    formFactor: 'mobile',
    screenEmulation: { mobile: true, width: 768, height: 1024, deviceScaleFactor: 2, disabled: false },
    throttling: {
      rttMs: 150,
      throughputKbps: 1638.4,
      cpuSlowdownMultiplier: 2,
      requestLatencyMs: 0,
      downloadThroughputKbps: 0,
      uploadThroughputKbps: 0,
    },
  },
  desktop: {
    formFactor: 'desktop',
    screenEmulation: { mobile: false, width: 1440, height: 900, deviceScaleFactor: 1, disabled: false },
    throttling: {
      rttMs: 40,
      throughputKbps: 10240,
      cpuSlowdownMultiplier: 1,
      requestLatencyMs: 0,
      downloadThroughputKbps: 0,
      uploadThroughputKbps: 0,
    },
    emulatedUserAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
  },
};

const profile = profiles[profileName];
if (!profile) throw new Error(`Unknown LIGHTHOUSE_PROFILE: ${profileName}`);

module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run start',
      startServerReadyPattern: 'Ready',
      startServerReadyTimeout: 30000,
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/courses',
        'http://localhost:3000/learn/responsive-web-design',
        'http://localhost:3000/learn/responsive-web-design/computer-browser-foundations/systems-signal-room',
      ],
      numberOfRuns: 3,
      settings: {
        onlyCategories: ['performance', 'accessibility', 'best-practices'],
        ...profile,
        chromeFlags: '--headless --no-sandbox --disable-dev-shm-usage',
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.99, aggregationMethod: 'pessimistic' }],
        'categories:accessibility': ['error', { minScore: 0.99, aggregationMethod: 'pessimistic' }],
        'categories:best-practices': ['error', { minScore: 0.99, aggregationMethod: 'pessimistic' }],
      },
    },
    upload: { target: 'filesystem', outputDir: `.lighthouseci/${profileName}` },
  },
};
