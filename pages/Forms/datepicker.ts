import { Page, Locator, test } from '@playwright/test';
import { BasePage } from "../basePage";




export class Datepicker extends BasePage {
    readonly commonDatePickerHeader = this.page.getByText('Common Datepicker');
    readonly commonDatepickerInput = this.page.getByPlaceholder("Form Picker");
        constructor(page: Page) {
        super(page);
    }
    async isLoaded(): Promise<boolean> { return await this.commonDatePickerHeader.isVisible(); }

    async usingCommonDatePicker(inputDay:string) {
        await this.waitUntilLoaded();
        
        await this.commonDatepickerInput.click();

        await this.page.locator('.day-cell:not(.bounding-month)').getByText(inputDay, {exact: true}).click();
        // bounding-month
    } 

    async getCurrentDate(): Promise<string>{
        const date = new Date();
        const expectedDay = date.getDate().toString();
        const expectedMonth = date.toLocaleString('En-US', {month:'short'});
        const expectedYear = date.getFullYear();
        const expectedDate = `${expectedMonth} ${expectedDay}, ${expectedYear}`
        return expectedDate;
    }

        async getChosenDayOfCurrentMonth(day: number): Promise<string>{
        const date = new Date();
        date.setDate(day)
        const expectedDay = date.getDate().toString();
        const expectedMonth = date.toLocaleString('En-US', {month:'short'});
        const expectedYear = date.getFullYear();
        const expectedDate = `${expectedMonth} ${expectedDay}, ${expectedYear}`
        return expectedDate;
    }

}