import { Page, Locator, test } from '@playwright/test';
import { BasePage } from "../basePage";




export class SmartTable extends BasePage {


    constructor(page: Page) {
        super(page);
    }
    readonly smartTableHeader = this.page.locator('nb-card-header').getByText('Smart Table');
    //readonly smartTableHeader= this.page.getByRole('heading', { name: 'Smart Table' }); -> this didnt work cause its a custom Header which has not the property set



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

    async editUserFirstNameById(id: string, firstName: string): Promise<void> {

        await test.step(`Edit User First Name with ${id}`, async () => {
            await this.waitUntilLoaded();
            const tableRowByUserId = await this.getRowById(id);
            await tableRowByUserId.locator('.nb-edit').click();
            // Finds the First Name by nth, only alternative would be a css selector
            await tableRowByUserId.getByPlaceholder('First Name').fill(firstName)
            await tableRowByUserId.locator('.nb-checkmark').click();
        });


    }

    async editUserLastNameById(id: string, lastName: string): Promise<void> {

        await test.step(`Edit User First Name with ${id}`, async () => {
            await this.waitUntilLoaded();
            const tableRowByUserId = await this.getRowById(id);
            await tableRowByUserId.locator('.nb-edit').click();
            // Finds the First Name by nth, only alternative would be a css selector
            await tableRowByUserId.getByPlaceholder('Last Name').fill(lastName)
            await tableRowByUserId.locator('.nb-checkmark').click();
        });


    }

    async editUserNameById(id: string, userName: string): Promise<void> {

        await test.step(`Edit User First Name with ${id}`, async () => {
            await this.waitUntilLoaded();
            const tableRowByUserId = await this.getRowById(id);
            await tableRowByUserId.locator('.nb-edit').click();
            // Finds the First Name by nth, only alternative would be a css selector
            await tableRowByUserId.getByPlaceholder('Username').fill(userName)
            await tableRowByUserId.locator('.nb-checkmark').click();
        });


    }
    async editEmailById(id: string, email: string): Promise<void> {

        await test.step(`Edit User First Name with ${id}`, async () => {
            await this.waitUntilLoaded();
            const tableRowByUserId = await this.getRowById(id);
            await tableRowByUserId.locator('.nb-edit').click();
            // Finds the First Name by nth, only alternative would be a css selector
            await tableRowByUserId.getByPlaceholder('E-mail').fill(email)
            await tableRowByUserId.locator('.nb-checkmark').click();
        });


    }
    async editAgeById(id: string, age: string): Promise<void> {

        await test.step(`Edit User First Name with ${id}`, async () => {
            await this.waitUntilLoaded();
            const tableRowByUserId = await this.getRowById(id);
            await tableRowByUserId.locator('.nb-edit').click();
            // Finds the First Name by nth, only alternative would be a css selector
            await tableRowByUserId.getByPlaceholder('Age').fill(age)
            await tableRowByUserId.locator('.nb-checkmark').click();
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

    // The ID is the second row thats why nth(1)
    async getRowById(id: string): Promise<Locator> {
        return this.datatableRows.filter({ has: this.page.getByRole('cell').nth(1).and(this.page.getByRole('cell', { name: id })) })
    }

    // Currently best found way to find the Firstname because its the third row. If i found a better way will replace, smae for the others
    //---------------------------------------------------------------------------
    async getFirstNameById(id: string): Promise<Locator> {
        const idRow = await this.getRowById(id);
        return await idRow.getByRole('cell').nth(2);
    }
    async getLastNameById(id: string): Promise<Locator> {
        const idRow = await this.getRowById(id);
        return await idRow.getByRole('cell').nth(3);
    }
    async getUserNameById(id: string): Promise<Locator> {
        const idRow = await this.getRowById(id);
        return await idRow.getByRole('cell').nth(4);
    }
    async getEmailById(id: string): Promise<Locator> {
        const idRow = await this.getRowById(id);
        return await idRow.getByRole('cell').nth(5);
    }
    async getAgeById(id: string): Promise<Locator> {
        const idRow = await this.getRowById(id);
        return await idRow.getByRole('cell').nth(6);
    }
    //---------------------------------------------------------------------------

}