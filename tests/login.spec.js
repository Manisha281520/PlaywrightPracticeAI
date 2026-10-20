// tests/login.spec.js
// PURPOSE: UI tests for the login page
//
// HOW THIS FILE CONNECTS TO EVERYTHING:
//
//   import test from fixtures/index.js
//     → fixtures give us loginPage automatically
//     → storageState (auth.json) loaded from playwright.config.js
//
//   import LoginPage from pages/LoginPage.js
//     → page object with locators and actions
//
//   import users from data/users.js
//     → test data — no hardcoded values here
//
// NOTICE: we import from fixtures/index.js NOT from @playwright/test
// This is because our custom fixtures extend the base test

const { test, expect } = require('../fixtures/index')
const { users } = require('../data/users')

// ─────────────────────────────────────────────────
// POSITIVE TESTS — happy path, valid data
// ─────────────────────────────────────────────────

test.describe('Login — positive tests', () => {

  test('successful login shows secure area message', async ({ loginPage }) => {
    // loginPage is provided by our custom fixture automatically
    // it is already a LoginPage object — no need to create it

    // NAVIGATE
    await loginPage.goto()

    // ACTION
    await loginPage.login(users.validUser.username, users.validUser.password)
    // uses data from data/users.js — no hardcoded values

    // ASSERT
    await loginPage.assertSuccessMessage()
    await loginPage.assertLoggedIn()
  })

  test('successful login redirects to secure page', async ({ loginPage, page }) => {
    await loginPage.goto()
    await loginPage.login(users.validUser.username, users.validUser.password)

    // assert URL changed to secure
    await expect(page).toHaveURL(/secure/)
  })

  test('logout button visible after login', async ({ loginPage }) => {
    await loginPage.goto()
    await loginPage.login(users.validUser.username, users.validUser.password)
    await loginPage.assertLoggedIn()
  })

})

// ─────────────────────────────────────────────────
// NEGATIVE TESTS — invalid data, error scenarios
// ─────────────────────────────────────────────────

test.describe('Login — negative tests', () => {

  test('wrong username shows error message', async ({ loginPage }) => {
    await loginPage.goto()
    await loginPage.login(users.invalidUser.username, users.invalidUser.password)

    // assert error shown
    await loginPage.assertErrorMessage('Your username is invalid!')

    // assert still on login page — did not navigate away
    await loginPage.assertStillOnLoginPage()
  })

  test('wrong password shows error message', async ({ loginPage }) => {
    await loginPage.goto()
    await loginPage.login(users.wrongPassword.username, users.wrongPassword.password)

    await loginPage.assertErrorMessage('Your password is invalid!')
    await loginPage.assertStillOnLoginPage()
  })

  test('empty credentials shows error message', async ({ loginPage }) => {
    await loginPage.goto()
    await loginPage.login(users.emptyCredentials.username, users.emptyCredentials.password)

    await loginPage.assertErrorMessage('Your username is invalid!')
  })

})

// ─────────────────────────────────────────────────
// SESSION TEST — uses saved auth.json session
// ─────────────────────────────────────────────────

test.describe('Login — session tests', () => {

  test('already logged in user can access secure area directly', async ({ loggedInPage }) => {
    // loggedInPage fixture navigates to /secure directly
    // auth.json has the session — no login needed
    // this proves storageState works

    await expect(loggedInPage.getByText('Secure Area')).toBeVisible()
    await expect(loggedInPage.getByRole('link', { name: 'Logout' })).toBeVisible()
  })

})
