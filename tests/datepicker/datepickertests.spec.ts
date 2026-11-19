import { test, expect } from '../../fixture';




test('Datepicker -Common Datepicker tests', async ({ pom }) => {
    const dayToPick = 5;

    await pom.navigationPage.navigateToDatepicker();
    await pom.datepicker.usingCommonDatePicker(dayToPick.toString());
    const expectedValue = await pom.datepicker.getChosenDayOfCurrentMonth(dayToPick);
    await expect(pom.datepicker.commonDatepickerInput).toHaveValue(expectedValue);

});


test('Datepicker -Common Datepicker Next Month tests', async ({ pom }) => {
    const dayToPick = 5;

    await pom.navigationPage.navigateToDatepicker();
    await pom.datepicker.usingCommonDatePickerWithNextMonth(dayToPick);
    const expectedValue = await pom.datepicker.getChosenDayOfNextMonth(dayToPick);
    await expect(pom.datepicker.commonDatepickerInput).toHaveValue(expectedValue);

});


