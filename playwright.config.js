const { defineConfig, devices } = require('@playwright/test')

  module.exports = defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',

    use: {
      baseURL: 'https://www.google.com',  // change to google for practice
      trace: 'on-first-retry',
      screenshot: 'only-on-failure',      // add this — saves screenshot on failure
      video: 'retain-on-failure',         // add this — saves video on failure
    },

    projects: [
      {
        name: 'chromium',
        use: { ...devices['Desktop Chrome'] },
      },
      // comment out firefox and webkit for now — faster for practice
      // {
      //   name: 'firefox',
      //   use: { ...devices['Desktop Firefox'] },
      // },
    ],
  })

