import { test } from 'playwright/test';



// https://playground.bondaracademy.com/pages/iot-dashboard

// Vor jedem Test ausführen
test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
}) 
//Test Suite
test.describe('My First Test Suite', () => {

// Vor jedem Test ausführen, wenn in der Suite dann kann jede Suite ihr eigenen haben
test.beforeEach(async ({ page }) => {
    await page.getByText('Forms').click();
})      
    // Await muss genutzt werden da es sich um ein Promise handelt, type des tests muss ansync sein
    // Locator brauchen kein await
    test('first test', async ({ page }) => {

        await page.getByText('Form Layouts').click();
    });
    test('Datepicker', async ({ page }) => {

        await page.getByText('Datepicker').click();
    });
});

//Test Suite 2
test.describe('sd', () => {

    test('first test', async ({ page }) => {
        await page.goto('https://playground.bondaracademy.com/pages/iot-dashboard');
        const now = new Date();
        const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}`;
        await page.screenshot({ path: `Screenshots/dashboard/screenshot-${timestamp}.png` });
    });
});
