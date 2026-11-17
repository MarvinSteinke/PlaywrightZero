import { test, expect } from '../../fixture';

const testDataNavigate = [
    { navigateDestiny: 'Form Layouts', expectedTestData: 'Using the Grid' },
    { navigateDestiny: 'Datepicker', expectedTestData: 'Common Datepicker' },
    { navigateDestiny: 'Dialog', expectedTestData: 'Open Dialog' },
    { navigateDestiny: 'Window', expectedTestData: 'Window Form' },
    /* { navigateDestiny: 'Popover' },
     { navigateDestiny: 'Tooltip' },*/
];

test.describe('Navigationbar tests', () => {
    for (const data of testDataNavigate) {
        test(`should navigate to ${data.navigateDestiny} %`, async ({ pom }) => {

            await pom.navigationPage.navigateToDestiny(data.navigateDestiny);
            const expectedNameLocator = await pom.navigationPage.getPageTitleLocator(data.navigateDestiny);
            await expect(expectedNameLocator).toBeVisible();
            await expect(expectedNameLocator).toContainText(data.expectedTestData);
        });
    }
})