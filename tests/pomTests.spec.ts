import { test, expect } from '../fixture';


/*
test('Fixture Test', async({testFix}) => {
    console.log("Test Fixture Test");
})*/



test('Using the Grid Forms', async ({ pom }) => {
    await test.step(`Test if written in line`, async () => {
        await pom.navigationPage.navigateToFormsLayout();
    });

    //await pom.getDashboardPage().testFunction();
    await pom.navigationPage.navigateToFormsLayout();
    const expectedNameLocator = await pom.navigationPage.getPageTitleLocator("Form Layouts");
    await expect(expectedNameLocator).toBeVisible();
    await expect(expectedNameLocator).toContainText("Using the Grid");
    await pom.formsLayout.usingTheGridFormEnterData("testUser", "testPW");
    const expectedUserLocator = pom.formsLayout.gridUserData;
    const expectedRadioLocator = pom.formsLayout.gridRadioData;
    // For label check use toHaveValue not toHaveText
    await expect(expectedUserLocator).toHaveValue("testUser");
    await expect(expectedRadioLocator).toBeChecked();
})

test('Forms Layout Without Label Test', async ({pom}) => {
    await pom.navigationPage.navigateToFormsLayout();
    await pom.formsLayout.usingFormsWithoutLabels("test1","test2","test3");
    // No real feedback on Button click but this class changes so we expect this.
    await expect(pom.formsLayout.formsWithoutLabelAssert).toHaveClass(/ng-submitted/);
})


test('Block Form Test', async ({pom}) => {
    await pom.navigationPage.navigateToFormsLayout();
    await pom.formsLayout.usingBlockFormEnterData("test1","test2","test3","test4");

    await expect(pom.formsLayout.blockFormFirstNameLabel).toHaveValue("test1");
     await expect(pom.formsLayout.blockFormLastNameLabel).toHaveValue("test2");
      await expect(pom.formsLayout.blockFormEmailLabel).toHaveValue("test3");
       await expect(pom.formsLayout.blockFormWebsiteLabel).toHaveValue("test4");
    // No real feedback on Button click but this class changes so we expect this.
    //await expect(pom.formsLayout.formsWithoutLabelAssert).toHaveClass(/ng-submitted/);
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
/*const testData = [
    { navigateDestiny: 'Form Layouts', expectedTestData: 'Using the Grid' },
    { navigateDestiny: 'Datepicker', expectedTestData: 'Common Datepicker' },
    { navigateDestiny: 'Dialog', expectedTestData: 'Window Form' },
    { navigateDestiny: 'Window', expectedTestData: 'Popover Position' },
    { navigateDestiny: 'Popover', expectedTestData: 'Toaster configuration' },
    { navigateDestiny: 'Tooltip', expectedTestData: 'Tooltip With Icons' },
];*/
/*
test('Page Object Model Tests', async ({ pom }) => {
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
*/