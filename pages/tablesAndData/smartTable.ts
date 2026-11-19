import { Page, Locator, test } from '@playwright/test';
import { BasePage } from "../basePage";




export class SmartTable extends BasePage {


    constructor(page: Page) {
        super(page);
    }
    readonly smartTableHeader = this.page.getByText('Smart Table');



    async isLoaded(): Promise<boolean> { return await this.smartTableHeader.isVisible() }

    readonly table = this.page.getByRole('table');
    readonly tableRowsWithHeader = this.table.getByRole('row');
    readonly datatableRows = this.table.getByRole('row').filter({ has: this.page.getByRole('cell') });

    async filterByAge(age: string): Promise<void> {

        await test.step(`Filter the Webtable by row Age with input ${age}`, async () => {
            await this.waitUntilLoaded();

            const ageFilter = this.page.getByPlaceholder('Age');

            await ageFilter.fill(age);

        });


    }

    async getNumberOfRows(): Promise<number> {
        return await this.datatableRows.count();
    }
    async getRowByEmail(email: string): Promise<Locator> {
        return this.datatableRows.filter({
            hasText: email
        });
    }

}