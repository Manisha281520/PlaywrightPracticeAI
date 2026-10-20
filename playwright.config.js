// playwright.config.js
// This file controls HOW the entire framework runs
// Think of it as the master settings file

require('dotenv').config()
// reads .env file and loads all values into process.env

const { defineConfig, devices } = require('@playwright/test')

module.exports = defineConfig({

  // WHERE are the test files?
  testDir: './tests',

  // HOW LONG before a test times out?
  timeout: 30000,       // 30 seconds per test

  // HOW LONG before an assertion times out?
  expect: {
    timeout: 5000       // 5 seconds for expect() to pass
  },

  // RETRY failed tests in CI
  retries: process.env.CI ? 2 : 0,
  // process.env.CI is set automatically in GitHub Actions / Azure
  // locally: 0 retries (see failure immediately)
  // in CI: 2 retries (handle flakiness)

  // HOW MANY tests run at the same time?
  workers: process.env.CI ? 2 : 1,
  // locally: 1 worker (easier to debug)
  // in CI: 2 workers (faster)

  // WHAT REPORTS to generate?
  reporter: [
    ['html'],                          // visual HTML report
    ['list']                           // live output in terminal
  ],

  // SHARED SETTINGS for all tests
  use: {
    baseURL: process.env.BASE_URL,
    // now tests can use just '/login' instead of full URL

    headless: true,
    // true = no visible browser (faster)
    // change to false when debugging

    screenshot: 'only-on-failure',
    // takes screenshot automatically when test fails

    video: 'retain-on-failure',
    // saves video of test run when it fails

    trace: 'on-first-retry',
    // saves trace file on first retry — open with npx playwright show-trace
  },

  // PROJECTS — run tests in different browsers or configurations
  projects: [

    // PROJECT 1 — Authentication setup
    // This runs FIRST and saves the login session to auth.json
    {
      name: 'setup',
      testMatch: /auth\.setup\.js/,
      // only runs the auth.setup.js file
    },

    // PROJECT 2 — UI Tests in Chrome
    // Depends on setup — runs AFTER setup completes
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'auth.json',
        // loads saved login session — tests start already logged in
      },
      dependencies: ['setup'],
      // WAIT for setup to finish before running these
      testIgnore: /auth\.setup\.js/,
      // don't run auth.setup.js again here
    },

    // PROJECT 3 — API Tests (no browser needed)
    {
      name: 'api',
      testMatch: /api\.spec\.js/,
      use: {
        baseURL: process.env.API_BASE_URL,
      }
    }
  ]
})
