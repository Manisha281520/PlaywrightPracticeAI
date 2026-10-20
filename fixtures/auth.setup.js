// fixtures/auth.setup.js
// PURPOSE: Log in ONCE and save the session to auth.json
// Every test that needs to be logged in loads auth.json
// instead of logging in every single time
//
// WHY this matters:
//   Without this: 10 tests = 10 logins = slow
//   With this:    1 login → save session → 10 tests reuse it = fast

const { test: setup } = require('@playwright/test')

// path where the session will be saved
const AUTH_FILE = 'auth.json'

setup('authenticate', async ({ page }) => {

  // Step 1 — navigate to login page
  await page.goto('/login')
  // baseURL from playwright.config.js is added automatically
  // so '/login' becomes 'https://the-internet.herokuapp.com/login'

  // Step 2 — fill username
  await page.getByLabel('Username').fill(process.env.TEST_USERNAME)
  // process.env.TEST_USERNAME reads from .env file → 'tomsmith'

  // Step 3 — fill password
  await page.getByLabel('Password').fill(process.env.TEST_PASSWORD)
  // process.env.TEST_PASSWORD reads from .env file → 'SuperSecretPassword!'

  // Step 4 — click login
  await page.getByRole('button', { name: 'Login' }).click()

  // Step 5 — wait for login to complete
  await page.waitForURL('**/secure')
  // waits until URL contains /secure — confirms login worked

  // Step 6 — save the session to auth.json
  await page.context().storageState({ path: AUTH_FILE })
  // storageState saves:
  //   cookies (the login cookie)
  //   localStorage (any stored tokens)
  //   sessionStorage
  // All of this gets written to auth.json file

  // Now every test that loads auth.json starts already logged in
  // No need to repeat these steps in each test
})
