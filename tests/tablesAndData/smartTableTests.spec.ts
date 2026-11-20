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

test('Smart Table - Edit Users First Name by ID', async ({ pom }) => {

    await pom.navigationPage.navigateToSmartTable();

    const userID = 10;
    const newName = "Greta";

    await pom.smartTable.editUserFirstNameById(userID.toString(), newName)
    await pom.smartTable.editEmailById(userID.toString(), newName)
    await pom.smartTable.editUserLastNameById(userID.toString(), newName)
    await pom.smartTable.editUserNameById(userID.toString(), newName)
    await pom.smartTable.editAgeById(userID.toString(), newName)

    await expect(await pom.smartTable.getFirstNameById(userID.toString())).toHaveText(newName);

});
test('Smart Table - Edit Users Last Name by ID', async ({ pom }) => {

    await pom.navigationPage.navigateToSmartTable();

    const userID = 10;
    const newName = "Müller";

    await pom.smartTable.editUserLastNameById(userID.toString(), newName)


    await expect(await pom.smartTable.getLastNameById(userID.toString())).toHaveText(newName);

});
test('Smart Table - Edit Users Email by ID', async ({ pom }) => {

    await pom.navigationPage.navigateToSmartTable();

    const userID = 10;
    const newEmail = "Greta@gmx.de";

    await pom.smartTable.editEmailById(userID.toString(), newEmail)

    await expect(await pom.smartTable.getEmailById(userID.toString())).toHaveText(newEmail);

});
test('Smart Table - Edit Users Username by ID', async ({ pom }) => {

    await pom.navigationPage.navigateToSmartTable();

    const userID = 10;
    const newName = "Greta";

    await pom.smartTable.editUserNameById(userID.toString(), newName)
    await expect(await pom.smartTable.getUserNameById(userID.toString())).toHaveText(newName);

});
test('Smart Table - Edit User Age by ID', async ({ pom }) => {

    await pom.navigationPage.navigateToSmartTable();

    const userID = 10;
    const newAge = "55";
    await pom.smartTable.editAgeById(userID.toString(), newAge)

    await expect(await pom.smartTable.getAgeById(userID.toString())).toHaveText(newAge);

});
test('Smart Table - Edit User Name by ID', async ({ pom }) => {

    await pom.navigationPage.navigateToSmartTable();

    const userID = 10;
    const newName = "Greta";

    await pom.smartTable.editUserFirstNameById(userID.toString(), newName)
    await pom.smartTable.editEmailById(userID.toString(), newName)
    await pom.smartTable.editUserLastNameById(userID.toString(), newName)
    await pom.smartTable.editUserNameById(userID.toString(), newName)
    await pom.smartTable.editAgeById(userID.toString(), newName)

    await expect(await pom.smartTable.getFirstNameById(userID.toString())).toHaveText(newName);

});
