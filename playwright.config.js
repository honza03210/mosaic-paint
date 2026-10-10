// End-to-end tests: npx playwright test. Locally they use the installed Chrome; CI uses Playwright's Chromium.
const { defineConfig, devices } = require('@playwright/test');

const PORT = 4173;
const local = !process.env.CI;

module.exports = defineConfig({
  testDir: 'tests/e2e',
  timeout: 60_000,
  fullyParallel: true,
  workers: local ? 4 : 2,
  retries: process.env.CI ? 1 : 0,
  reporter: local ? 'list' : [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: `http://localhost:${PORT}/`,
    viewport: { width: 1400, height: 860 },
    serviceWorkers: 'block',
  },
  // Chrome, Firefox and Safari's engine (WebKit) on desktop; an Android phone and an iPhone for the touch tests
  projects: [
    { name: 'desktop', testIgnore: /mobile\.spec/, use: { ...(local ? { channel: 'chrome' } : {}) } },
    { name: 'firefox', testIgnore: /mobile\.spec/, use: { browserName: 'firefox' } },
    { name: 'webkit', testIgnore: /mobile\.spec/, use: { browserName: 'webkit' } },
    { name: 'mobile', testMatch: /mobile\.spec/, use: { ...devices['Pixel 7'], ...(local ? { channel: 'chrome' } : {}) } },
    { name: 'iphone', testMatch: /mobile\.spec/, use: { ...devices['iPhone 14'] } },
  ],
  webServer: {
    command: `node tests/serve.js ${PORT}`,
    port: PORT,
    reuseExistingServer: local,
  },
});
