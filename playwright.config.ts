import { defineConfig, devices } from '@playwright/test'

/**
 * End-to-end coverage for the Hugo site.
 *
 * The suite runs against a real build rather than `hugo server`, because the two
 * things most worth guarding — the Pagefind index and the fingerprinted assets —
 * only exist after `hugo --minify` and `pagefind --site public` have both run.
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/e2e-results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
  ],

  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:8080',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
    { name: 'Mobile Safari', use: { ...devices['iPhone 12'] } },
  ],

  webServer: {
    // In CI the artifact is already in public/; locally this builds it first.
    command: process.env.CI ? 'npx http-server public -p 8080' : 'npm run preview',
    url: 'http://localhost:8080',
    reuseExistingServer: !process.env.CI,
    timeout: 180 * 1000,
  },
})
