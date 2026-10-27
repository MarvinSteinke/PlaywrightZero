import { test, expect } from '@playwright/test';


//https://www.automationexercise.com/
// https://conduit.bondaracademy.com/ api und auth test site, neue projekt 
// Await muss genutzt werden da es sich um ein Promise handelt, type des tests muss ansync sein
// Locator brauchen kein await
test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('opens the writing tests documentation', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  await page.getByRole('link', { name: 'Docs' }).click();
  await expect(page).toHaveURL('https://playwright.dev/docs/intro');

  await page.getByRole('link', { name: 'Writing tests', exact: true }).click();
  await expect(page).toHaveURL('https://playwright.dev/docs/writdding-tests');
});
