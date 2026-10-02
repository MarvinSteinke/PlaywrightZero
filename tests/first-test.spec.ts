import { test } from 'playwright/test';

// Einmal vor allen Tests ausführen
test.beforeAll(async ({ page }) => {

})

// Vor jedem Test ausführen
test.beforeEach(async ({ page }) => {
    await page.goto('https://playground.bondaracademy.com/pages/iot-dashboard');
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
        await page.screenshot({ path: `screenshot.png` });
    });
});