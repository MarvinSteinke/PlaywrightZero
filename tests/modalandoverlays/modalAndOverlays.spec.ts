import { test, expect } from '../../fixture';


/*
test('Fixture Test', async({testFix}) => {
    console.log("Test Fixture Test");
})*/



test('Modal and Overlays Toastr - Toaster type dropdown test', async ({ pom }) => {
    await pom.navigationPage.navigateToToastr();
    await pom.toastr.selectingOptionFromToasterTypeDropdown("info");
    await expect(pom.toastr.toastTypeDropdown).toHaveValue("info");
});

test('Modal and Overlays Toastr - Position Option 1 dropdown test', async ({ pom }) => {
    await pom.navigationPage.navigateToToastr();
    await pom.toastr.selectingOptionFromPositionDropdown("bottom-end");
    await expect(pom.toastr.postitionDropdownButton).toHaveText("bottom-end");
});

test('Modal and Overlays Toastr - Position Option 2 dropdown test', async ({ pom }) => {
    await pom.navigationPage.navigateToToastr();
    await pom.toastr.selectingOptionFromPositionDropdownOption2("bottom-end");
    await expect(pom.toastr.postitionDropdownButton).toHaveText("bottom-end");
});

test('Modal and Overlays Toastr - Position Looping through all Items', async ({ pom }) => {
    await pom.navigationPage.navigateToToastr();
    await pom.toastr.loopingOptionFromPositionDropdown();
});