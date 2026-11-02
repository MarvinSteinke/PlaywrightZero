import { Page, Locator } from '@playwright/test';
import { BasePage } from "../basePage";




export class FormsLayout extends BasePage {
    readonly formsLayoutHeader = this.page.getByText('Using the Grid', { exact: true });
    constructor(page: Page) {
        super(page);
    }
    async isLoaded(): Promise<boolean> { return await this.formsLayoutHeader.isVisible(); }

    // Info, validation not really possible because the buttons on this site (like sign in) dont do anything. This site is mainly to test locators and input fields
    async usingTheGridFormEnterData(userName: string, password: string) {
        const parentOfGridForm = this.formsLayoutHeader.locator('..')
        await parentOfGridForm.getByLabel("Email").fill(userName);
        await parentOfGridForm.getByLabel("Password").fill(password);
        //Force: True muss gemacht werden weil der Radiobutton visually Hidden ist. Macht aber die Test more Flaky
        await parentOfGridForm.getByRole('radio', { name: "Option 1" }).check({ force: true });
        // Alternative wird der label angeklickt dadurch werden Playwrights actionability check nicht skipped wie beim force true
        //await parentOfGridForm.locator('nb-radio').filter({ hasText: 'Option 1' }).locator('label').click();
    }

    get gridUserData(): Locator {
        const parentOfGridForm = this.formsLayoutHeader.locator('..');

        return parentOfGridForm.getByLabel('Email');
    }
    get gridRadioData(): Locator {
        const parentOfGridForm = this.formsLayoutHeader.locator('..');

        return parentOfGridForm.getByRole('radio', {
            name: 'Option 1'
        });
    }
}
