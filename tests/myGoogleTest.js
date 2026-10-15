const{test,expect}= require('@playwright/test');

test('Google homepage loads', async({page}) => {
    await page.goto('https://www.google.com/');
    await expect(page).toHaveTitle('Google');
}
)

test('Google search box is visible', async({page})=>{
    await page.goto('https://www.google.com/');
    const searchBox=await page.getByRole('combobox');
    await expect(searchBox).toBeVisible();
})

test('This test will FAIL on purpose', async ({ page }) => {
    await page.goto('https://www.google.com/');
    await expect(page).toHaveTitle('Wrong Title')  // wrong title
  })


