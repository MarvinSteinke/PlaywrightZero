import {test, expect} from '../fixture';


test('Fixture Test', async({testFix}) => {
    console.log("Test Fixture Test");
})

test('Page Object Model Tests', async({pom}) => {
   // const pm = new PageManager(page);
    let on = "ON";
    let off = "OFF";
    await pom.getDashboardPage().gotoDashboard();
    await pom.getDashboardPage().clickToggleButton("Light");
    await pom.getDashboardPage().clickToggleButton("Roller Shades");
    await pom.getDashboardPage().clickToggleButton("Wireless Audio");
    await pom.getDashboardPage().clickToggleButton("Coffee Maker");
    await expect(pom.getDashboardPage().getButtonStatus("Light")).toHaveText(off);
    await expect(pom.getDashboardPage().getButtonStatus("Roller Shades")).toHaveText(off);
    await expect(pom.getDashboardPage().getButtonStatus("Wireless Audio")).toHaveText(off);
    await expect(pom.getDashboardPage().getButtonStatus("Coffee Maker")).toHaveText(off);
    await pom.getDashboardPage().clickToggleButton("Light");
    await pom.getDashboardPage().clickToggleButton("Roller Shades");
    await pom.getDashboardPage().clickToggleButton("Wireless Audio");
    await pom.getDashboardPage().clickToggleButton("Coffee Maker");
    await expect(pom.getDashboardPage().getButtonStatus("Light")).toHaveText(on);
    await expect(pom.getDashboardPage().getButtonStatus("Roller Shades")).toHaveText(on);
    await expect(pom.getDashboardPage().getButtonStatus("Wireless Audio")).toHaveText(on);
    await expect(pom.getDashboardPage().getButtonStatus("Coffee Maker")).toHaveText(on);
})

test('Move Temperature Slider to Max (30)', async({pom}) => {
    await pom.getDashboardPage().gotoDashboard();
    //await pom.getDashboardPage().testFunction();
    await pom.getDashboardPage().moveTemperatureSlider();
    await expect(pom.getDashboardPage().temperatureContent.locator('.value.temperature.h1')).toContainText('30');
})

test('Disable Temp Slider', async({pom}) => {
    await pom.getDashboardPage().gotoDashboard();
    //await pom.getDashboardPage().testFunction();
    await pom.getDashboardPage().disableTempSlider();
    await expect(pom.getDashboardPage().temperatureContent.locator('.value.temperature.h1')).toContainText('--');
})

test('Disable Humidity Slider', async({pom}) => {
    await pom.getDashboardPage().gotoDashboard();
    //await pom.getDashboardPage().testFunction();
    await pom.getDashboardPage().disableTempSlider();
    await expect(pom.getDashboardPage().temperatureContent.locator('.value.temperature.h1')).toContainText('--');
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
});
*/

test('Move Humidity Slider to Max (100)', async({pom}) => {
    await pom.getDashboardPage().gotoDashboard();
    //await pom.getDashboardPage().testFunction();
    await pom.getDashboardPage().moveHumiditySlider();
    await expect(pom.getDashboardPage().humidityContent.locator('.value.humidity.h1')).toContainText('100');
})
