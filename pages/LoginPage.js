// pages/LoginPage.js
// PURPOSE: Page Object for the Login screen
//
// A Page Object holds:
//   1. LOCATORS — how to find elements on this page
//   2. ACTIONS  — things you can DO on this page
//   3. ASSERTIONS — things you can CHECK on this page
//
// WHY Page Objects?
//   Without POM: locator written in every test
//     await page.getByLabel('Username').fill('tomsmith')  ← in test 1
//     await page.getByLabel('Username').fill('wronguser') ← in test 2
//     await page.getByLabel('Username').fill('admin')     ← in test 3
//   If label changes → update 3 tests
//
//   With POM: locator written ONCE here
//     await loginPage.login('tomsmith', 'pass')  ← clean in every test
//   If label changes → update ONE file only

const { expect } = require('@playwright/test')

class LoginPage {

  // CONSTRUCTOR — runs when you do: new LoginPage(page)
  // saves page and all locators so every method can use them
  constructor(page) {
    this.page = page
    // ↑ save page to this object
    // without this. it would die after constructor finishes

    // LOCATORS — find elements on the login screen
    this.usernameField = page.getByLabel('Username')
    this.passwordField = page.getByLabel('Password')
    this.loginButton   = page.getByRole('button', { name: 'Login' })
    this.flashMessage  = page.locator('.flash')
    this.logoutButton  = page.getByRole('link', { name: 'Logout' })

    // WHY define locators in constructor?
    //   They are defined ONCE when object is created
    //   All methods below can use them immediately
    //   If locator changes → update here once → all methods fixed
  }

  // ACTION — navigate to login page
  async goto() {
    await this.page.goto('/login')
    // this.page was saved in constructor — available here
  }

  // ACTION — fill username field
  async fillUsername(username) {
    await this.usernameField.fill(username)
    // this.usernameField was saved in constructor
  }

  // ACTION — fill password field
  async fillPassword(password) {
    await this.passwordField.fill(password)
  }

  // ACTION — click login button
  async clickLogin() {
    await this.loginButton.click()
  }

  // ACTION — do complete login in one step
  // combines fillUsername + fillPassword + clickLogin
  async login(username, password) {
    await this.fillUsername(username)
    await this.fillPassword(password)
    await this.clickLogin()
  }

  // ASSERTION — check success message
  async assertSuccessMessage() {
    await expect(this.flashMessage)
      .toContainText('You logged into a secure area!')
  }

  // ASSERTION — check error message with specific text
  async assertErrorMessage(message) {
    await expect(this.flashMessage).toContainText(message)
  }

  // ASSERTION — check logout button visible (means we are logged in)
  async assertLoggedIn() {
    await expect(this.logoutButton).toBeVisible()
  }

  // ASSERTION — check we are still on login page (means login failed)
  async assertStillOnLoginPage() {
    await expect(this.page).toHaveURL(/login/)
  }

  // DATA RETRIEVAL — get flash message text and return it
  // return is used here because the CALLER needs the text value
  async getFlashMessageText() {
    return await this.flashMessage.textContent()
  }
}

// export so other files can import and use this class
module.exports = { LoginPage }
