import {test, expect} from '../fixture';

/*
test('Fixture Test', async({testFix}) => {
    console.log("Test Fixture Test");
})*/

test('Using the Grid Forms', async({pom}) => {
   await test.step(`Test if written in line`, async () => {
     await pom.navigationPage.navigateToFormsLayout();
    });

    //await pom.getDashboardPage().testFunction();
    await pom.navigationPage.navigateToFormsLayout();
    const expectedNameLocator = await pom.navigationPage.getPageTitleLocator("Form Layouts");
    await expect(expectedNameLocator).toBeVisible();
    await expect(expectedNameLocator).toContainText("Using the Grid");
    await pom.formsLayout.usingTheGridFormEnterData("testUser","testPW");
    const expectedUserLocator =  pom.formsLayout.gridUserData;
    const expectedRadioLocator =  pom.formsLayout.gridRadioData;
    // For label check use toHaveValue not toHaveText
    await expect(expectedUserLocator).toHaveValue("testUser");
    await expect(expectedRadioLocator).toBeChecked();
})

test('Page Object Model Tests', async({pom}) => {
   // const pm = new PageManager(page);
    const on = "ON";
    const off = "OFF";
    await pom.dashboardPage.clickToggleButton("Light");
    await pom.dashboardPage.clickToggleButton("Roller Shades");
    await pom.dashboardPage.clickToggleButton("Wireless Audio");
    await pom.dashboardPage.clickToggleButton("Coffee Maker");
    await expect(pom.dashboardPage.getButtonStatus("Light")).toHaveText(off);
    await expect(pom.dashboardPage.getButtonStatus("Roller Shades")).toHaveText(off);
    await expect(pom.dashboardPage.getButtonStatus("Wireless Audio")).toHaveText(off);
    await expect(pom.dashboardPage.getButtonStatus("Coffee Maker")).toHaveText(off);
    await pom.dashboardPage.clickToggleButton("Light");
    await pom.dashboardPage.clickToggleButton("Roller Shades");
    await pom.dashboardPage.clickToggleButton("Wireless Audio");
    await pom.dashboardPage.clickToggleButton("Coffee Maker");
    await expect(pom.dashboardPage.getButtonStatus("Light")).toHaveText(on);
    await expect(pom.dashboardPage.getButtonStatus("Roller Shades")).toHaveText(on);
    await expect(pom.dashboardPage.getButtonStatus("Wireless Audio")).toHaveText(on);
    await expect(pom.dashboardPage.getButtonStatus("Coffee Maker")).toHaveText(on);
})

test('Move Temperature Slider to Max (30)', async({pom}) => {
    //await pom.getDashboardPage().testFunction();
    await pom.dashboardPage.moveTemperatureSlider();
    await expect(pom.dashboardPage.temperatureContent.locator('.value.temperature.h1')).toContainText('30');
})

test('Disable Temp Slider', async({pom}) => {
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

        await test.step('Temperature Power successfully switched OFF', async () => {});

    } else {

        await test.step('⚠️ WARNING: Temperature Power was already OFF', async () => {});

        await test.info().attach('Warning - Temperature Power', {
            body: 'The temperature power button was already OFF. No click was performed.',
            contentType: 'text/plain'
        });
    }



    await expect(pom.dashboardPage.temperatureContent.locator('.value.temperature.h1')).toContainText('--',{
        timeout: 10_000
    });
})

test('Disable Humidity Slider', async({pom}) => {
    //await pom.getDashboardPage().testFunction();

const wasDisabled = await pom.dashboardPage.disableHumiditySlider();
 if (wasDisabled) {

        await test.step('Temperature Power successfully switched OFF', async () => {});

    } else {

        await test.step('⚠️ WARNING: Temperature Power was already OFF', async () => {});

        await test.info().attach('Warning - Temperature Power', {
            body: 'The temperature power button was already OFF. No click was performed.',
            contentType: 'text/plain'
        });
    }

    await expect(pom.dashboardPage.humidityContent.locator('.value.humidity.h1')).toContainText('--',{
        timeout: 10_000
    });
})


/*
// Just for testing, only 100 passes the other 2 fail, will be used for Background changes
const testData = [
    { expectedTemperature: '100' },
    { expectedTemperature: '25' },
    { expectedTemperature: '30' },
];
test.describe('Temperature tests',() => {
    for (const data of testData) {
        test(`should display Humidity ${data.expectedTemperature} %`,  async({pom}) => {

    await pom.getDashboardPage().gotoDashboard();
    //await pom.getDashboardPage().testFunction();
    await pom.getDashboardPage().moveHumiditySlider();
    await expect(pom.getDashboardPage().humidityContent.locator('.value.humidity.h1')).toContainText(data.expectedTemperature);
        });
    }
});*/


test('Move Humidity Slider to Max (100)', async({pom}) => {
    //await pom.getDashboardPage().testFunction();
    await pom.dashboardPage.moveHumiditySlider();
    await expect(pom.dashboardPage.humidityContent.locator('.value.humidity.h1')).toContainText('100');
})

const testData = [
    { navigateDestiny: 'Form Layouts' , expectedTestData: 'Using the Grid' },
    { navigateDestiny: 'Datepicker', expectedTestData: 'Common Datepicker' },
    { navigateDestiny: 'Dialog' , expectedTestData: 'Open Dialog'},
    { navigateDestiny: 'Window', expectedTestData: 'Window Form' },
   /* { navigateDestiny: 'Popover' },
    { navigateDestiny: 'Tooltip' },*/
];

/*const testData = [
    { navigateDestiny: 'Form Layouts', expectedTestData: 'Using the Grid' },
    { navigateDestiny: 'Datepicker', expectedTestData: 'Common Datepicker' },
    { navigateDestiny: 'Dialog', expectedTestData: 'Window Form' },
    { navigateDestiny: 'Window', expectedTestData: 'Popover Position' },
    { navigateDestiny: 'Popover', expectedTestData: 'Toaster configuration' },
    { navigateDestiny: 'Tooltip', expectedTestData: 'Tooltip With Icons' },
];*/ 
test.describe('Navigationbar tests',() => {
    for (const data of testData) {
        test(`should navigate to ${data.navigateDestiny} %`,  async({pom}) => {

    await pom.navigationPage.navigateToDestiny(data.navigateDestiny);
    const expectedNameLocator = await pom.navigationPage.getPageTitleLocator(data.navigateDestiny);
    await expect(expectedNameLocator).toBeVisible();
    await expect(expectedNameLocator).toContainText(data.expectedTestData);
     });
   }
})

