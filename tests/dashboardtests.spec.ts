import { test, expect } from '../fixture';
import type { buttonName } from '../pages/dashboardPage';
const testDataControllButton = [
    { controllButtonName: 'Light' },
    { controllButtonName: 'Roller Shades' },
    { controllButtonName: 'Wireless Audio' },
    { controllButtonName: 'Coffee Maker' },
    /* { navigateDestiny: 'Popover' },
     { navigateDestiny: 'Tooltip' },*/
] satisfies { controllButtonName: buttonName }[];




test.describe('Dashboard control Button tests', () => {
    for (const data of testDataControllButton) {
        test(`Dashboard Toggle controll Button Off for ${data.controllButtonName} %`, async ({ pom }) => {
            // const pm = new PageManager(page);
            const off = "OFF";
            //await pom.dashboardPage.clickToggleButton(data.controllButtonName);

            const wasDisabled = await pom.dashboardPage.clickControllButtonOff(data.controllButtonName);
            if (wasDisabled) {

                await test.step(`Controll Button ${data.controllButtonName}% successfully switched OFF`, async () => { });

            } else {

                await test.step(`⚠️ WARNING: Control Button ${data.controllButtonName}% was already OFF`, async () => { });

                await test.info().attach(`Warning - Controll Button ${data.controllButtonName}% `, {
                    body: 'The controll button power button was already OFF. No click was performed.',
                    contentType: 'text/plain'
                });
            }
            await expect(pom.dashboardPage.getButtonStatus(data.controllButtonName)).toHaveText(off);
        });
    }
})




test('Move Temperature Slider to Max (30)', async ({ pom }) => {
    //await pom.getDashboardPage().testFunction();
    await pom.dashboardPage.moveTemperatureSlider();
    await expect(pom.dashboardPage.temperatureContent.locator('.value.temperature.h1')).toContainText('30');
})

test('Disable Temp Slider', async ({ pom }) => {
    //await pom.getDashboardPage().testFunction();
    /*const wasDisabled = await pom.dashboardPage.disableTempSlider();
        if (!wasDisabled) {
        test.info().annotations.push({
            type: 'Info',
            description: 'Temperature Power was not clicked because it was already OFF.'
        });
    }
*/
    const wasDisabled = await pom.dashboardPage.disableTempSlider();
    if (wasDisabled) {

        await test.step('Temperature Power successfully switched OFF', async () => { });

    } else {

        await test.step('⚠️ WARNING: Temperature Power was already OFF', async () => { });

        await test.info().attach('Warning - Temperature Power', {
            body: 'The temperature power button was already OFF. No click was performed.',
            contentType: 'text/plain'
        });
    }



    await expect(pom.dashboardPage.temperatureContent.locator('.value.temperature.h1')).toContainText('--', {
        timeout: 10_000
    });
})

test('Disable Humidity Slider', async ({ pom }) => {
    //await pom.getDashboardPage().testFunction();

    const wasDisabled = await pom.dashboardPage.disableHumiditySlider();
    if (wasDisabled) {

        await test.step('Temperature Power successfully switched OFF', async () => { });

    } else {

        await test.step('⚠️ WARNING: Temperature Power was already OFF', async () => { });

        await test.info().attach('Warning - Temperature Power', {
            body: 'The temperature power button was already OFF. No click was performed.',
            contentType: 'text/plain'
        });
    }

    await expect(pom.dashboardPage.humidityContent.locator('.value.humidity.h1')).toContainText('--', {
        timeout: 10_000
    });
})




test('Move Humidity Slider to Max (100)', async ({ pom }) => {
    //await pom.getDashboardPage().testFunction();
    await pom.dashboardPage.moveHumiditySlider();
    await expect(pom.dashboardPage.humidityContent.locator('.value.humidity.h1')).toContainText('100');
})



