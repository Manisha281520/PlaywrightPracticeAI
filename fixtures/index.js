// fixtures/index.js
// PURPOSE: Create CUSTOM fixtures that tests can use
//
// What is a fixture?
//   A fixture is something a test NEEDS to run.
//   Playwright gives you built-in fixtures: page, request, browser
//   You can CREATE your own fixtures too.
//
// WHY custom fixtures?
//   Instead of writing setup code in every test:
//     const loginPage = new LoginPage(page)
//     await loginPage.goto()
//   You declare it once here and every test gets it automatically.
//
// HOW it works:
//   test('my test', async ({ page, loginPage }) => {
//     // loginPage is ready — created by the fixture
//   })

const { test: base, expect } = require('@playwright/test')
const { LoginPage } = require('../pages/LoginPage')

// extend the base test with custom fixtures
const test = base.extend({

  // FIXTURE: loginPage
  // Automatically creates a LoginPage object for any test that needs it
  loginPage: async ({ page }, use) => {
    //             ↑         ↑
    //         page comes    use = hand the fixture to the test
    //         from Playwright

    // CREATE the page object
    const loginPage = new LoginPage(page)

    // HAND IT to the test — test runs with this loginPage
    await use(loginPage)

    // AFTER the test finishes — cleanup happens here if needed
    // (nothing to clean up for a page object)
  },

  // FIXTURE: loggedInPage
  // Provides a page that is already navigated to secure area
  // Use this for tests that need to START already logged in
  loggedInPage: async ({ page }, use) => {

    // navigate to secure area — auth.json already logged us in
    await page.goto('/secure')

    // hand to test
    await use(page)
  }

})

// export test and expect so tests import from here
// not from @playwright/test directly
module.exports = { test, expect }
