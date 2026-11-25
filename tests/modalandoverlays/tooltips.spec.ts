import { test, expect } from '../../fixture';


/*
test('Fixture Test', async({testFix}) => {
    console.log("Test Fixture Test");
})*/
const testDataTooltipPlacement = [
    { tooltipButton: 'Top', expectedTestData: 'This is a tooltip' },
    { tooltipButton: 'Right', expectedTestData: 'This is a tooltip' },
    { tooltipButton: 'Bottom', expectedTestData: 'This is a tooltip' },
    { tooltipButton: 'Left', expectedTestData: 'This is a tooltip' },
    /* { navigateDestiny: 'Popover' },
     { navigateDestiny: 'Tooltip' },*/
];




test.describe('Tooltip Placement Test tests', () => {
    for (const data of testDataTooltipPlacement) {
        test(`Tooltip Placement test for Button ${data.tooltipButton} `, async ({ pom }) => {
            await pom.navigationPage.navigateToDestiny("Tooltip");
            await pom.tooltips.checkingTooltipTooltipPlacement(data.tooltipButton);
            await expect(pom.tooltips.tooltip).toHaveText(data.expectedTestData)
            const expectedDirection = await pom.tooltips.checkingDirectionOfTooltip(data.tooltipButton);
            await expect(expectedDirection).toBe(data.tooltipButton);
        });
    }
})