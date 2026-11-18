import { Page, Locator, test } from '@playwright/test';
import { BasePage } from "../basePage";




export class Datepicker extends BasePage {
    readonly commonDatePickerHeader = this.page.getByText('Common Datepicker');
    readonly commonDatepickerInput = this.page.getByPlaceholder("Form Picker");
    constructor(page: Page) {
        super(page);
    }
    async isLoaded(): Promise<boolean> { return await this.commonDatePickerHeader.isVisible(); }

    async usingCommonDatePicker(inputDay: string) {
        await this.waitUntilLoaded();

        await this.commonDatepickerInput.click();

        await this.page.locator('.day-cell:not(.bounding-month)').getByText(inputDay, { exact: true }).click();
        // bounding-month
    }

    async usingCommonDatePickerWithNextMonth(inputDay: number) {
        await this.waitUntilLoaded();

        await this.commonDatepickerInput.click();

        let datepickerCurrentMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent();
        const expectedMonth = await this.getExpectedMonthAndYearLongForm(inputDay);
        console.log(datepickerCurrentMonthAndYear);
        while (!datepickerCurrentMonthAndYear?.includes(expectedMonth)) {
            await this.page.locator('button.next-month').click();
            datepickerCurrentMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent();
        }

        await this.page.locator('.day-cell:not(.bounding-month)').getByText(inputDay.toString(), { exact: true }).click();

        return
        // bounding-month
    }


    async getCurrentDate(): Promise<string> {
        const date = new Date();
        const expectedDay = date.getDate().toString();
        const expectedMonth = date.toLocaleString('En-US', { month: 'short' });
        const expectedYear = date.getFullYear();
        const expectedDate = `${expectedMonth} ${expectedDay}, ${expectedYear}`
        return expectedDate;
    }

    async getChosenDayOfCurrentMonth(day: number): Promise<string> {
        const date = new Date();
        date.setDate(day)
        const expectedDay = date.getDate().toString();
        const expectedMonth = date.toLocaleString('En-US', { month: 'short' });
        const expectedYear = date.getFullYear();
        const expectedDate = `${expectedMonth} ${expectedDay}, ${expectedYear}`
        return expectedDate;
    }

    async getChosenDayOfNextMonth(day: number): Promise<string> {
        //todo
        const date = new Date();
        const currentMonth = date.getMonth();
        if (currentMonth === 11) {
            const year = date.getFullYear();
            date.setFullYear(year + 1)
            date.setMonth(0)
        } else {
            date.setMonth(currentMonth + 1)
        }
        date.setDate(day);
        const expectedDay = date.getDate().toString();
        const expectedMonth = date.toLocaleString('En-US', { month: 'short' });
        const expectedYear = date.getFullYear();
        const expectedDate = `${expectedMonth} ${expectedDay}, ${expectedYear}`
        return expectedDate;
    }

    async getExpectedMonthAndYearLongForm(day: number): Promise<string> {

        const today = new Date();

        const date = new Date(
            today.getFullYear(),
            today.getMonth() + 1,
            1
        );

        date.setDate(day);
                const expectedMonth = date.toLocaleString('En-US', { month: 'long' });

        const expectedYear = date.getFullYear();
        const expectedDate = `${expectedMonth} ${expectedYear}`
        console.log(expectedDate)
        return expectedDate;
    }


    readonly table = this.page.locator('ng2-smart-table table');
    readonly tableRows = this.table.locator('tbody tr');


async filterByAge(age: string): Promise<void> {

    const ageFilter = this.page.getByPlaceholder('Age');

    await ageFilter.fill(age);
}

    async getNumberOfRows(): Promise<number> {
        return await this.tableRows.count();
    }
    async getRowByEmail(email: string): Promise<Locator> {
    return this.tableRows.filter({
        hasText: email
    });
}



}