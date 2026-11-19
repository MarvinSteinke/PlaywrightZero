import { test, expect } from '../../fixture';
test('Smart Table - Filter Age and check row count', async ({ pom }) => {

    await pom.navigationPage.navigateToSmartTable();

    const expectedCount = 5; // An die tatsächliche Anzahl anpassen

    await pom.smartTable.filterByAge('20');

    await expect(pom.smartTable.datatableRows)
        .toHaveCount(expectedCount);

});


test('Smart Table - Filter Age and validate Valencia record', async ({ pom }) => {

    await pom.navigationPage.navigateToSmartTable();

    // Filter by age 20
    await pom.smartTable.filterByAge('20');

    // Verify that 5 records are displayed
    await expect(pom.smartTable.datatableRows).toHaveCount(5);

    // Find Valencia by email
    const valenciaRow = await pom.smartTable.getRowByEmail(
        'valenciaolsen@comtours.com'
    );

    // Verify that Valencia exists exactly once
    await expect(valenciaRow).toHaveCount(1);

    // Verify the complete record
    await expect.soft(valenciaRow).toContainText('43');
    await expect.soft(valenciaRow).toContainText('Valencia');
    await expect.soft(valenciaRow).toContainText('Spence');
    await expect.soft(valenciaRow).toContainText('@Olsen');
    await expect.soft(valenciaRow).toContainText('valenciaolsen@comtours.com');
    await expect(valenciaRow).toContainText('20');

});
