const { test, expect } = require('@playwright/test')

  test('Google homepage loads', async ({ page }) => {
    await page.goto('https://www.google.com/')
    await expect(page).toHaveTitle('Google')
  })

  test('Google search box is visible', async ({ page }) => {
    await page.goto('https://www.google.com/')
    const searchBox = page.getByRole('combobox')
    await expect(searchBox).toBeVisible()
  })

  test('FORCE FAIL - wrong title', async ({ page }) => {
    await page.goto('https://www.google.com/')
    throw new Error('This test is supposed to fail!')
  })
