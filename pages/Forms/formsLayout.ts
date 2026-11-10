import { Page, Locator, test } from '@playwright/test';
import { BasePage } from "../basePage";




export class FormsLayout extends BasePage {
    readonly formsLayoutHeader = this.page.getByText('Using the Grid', { exact: true });
    readonly formsLayoutBasicFormHeader = this.page.getByText('Basic form', { exact: true })
    readonly formsLayoutFormWithoutLabelsHeader = this.page.getByText('Form without labels', { exact: true })
    readonly formsLayoutBlockFormHeader = this.page.getByText('Block form', { exact: true })
    readonly parentOfFormsWithoutLabelForm = this.formsLayoutFormWithoutLabelsHeader.locator('..')
    readonly parentOfBlockForm = this.formsLayoutBlockFormHeader.locator('..')
    constructor(page: Page) {
        super(page);
    }
    async isLoaded(): Promise<boolean> { return await this.formsLayoutHeader.isVisible(); }

    // Info, validation not really possible because the buttons on this site (like sign in) dont do anything. This site is mainly to test locators and input fields
    async usingTheGridFormEnterData(userName: string, password: string) {
        await test.step(`Fill textfield under Using the Grid`, async () => {

            await this.waitUntilLoaded();
            const parentOfGridForm = this.formsLayoutHeader.locator('..')
            await parentOfGridForm.getByLabel("Email").fill(userName);
            await parentOfGridForm.getByLabel("Password").fill(password);
            //Force: True muss gemacht werden weil der Radiobutton visually Hidden ist. Macht aber die Test more Flaky
            await parentOfGridForm.getByRole('radio', { name: "Option 1" }).check({ force: true });
            // Alternative wird der label angeklickt dadurch werden Playwrights actionability check nicht skipped wie beim force true
            //await parentOfGridForm.locator('nb-radio').filter({ hasText: 'Option 1' }).locator('label').click();
        });


    }

  async usingBlockFormEnterData(firstName: string, LastName: string, email: string, website:string) {
        await test.step(`Fill textfield under Block Form`, async () => {

            await this.waitUntilLoaded();

            await this.parentOfBlockForm.getByLabel("First Name").fill(firstName);
            await this.parentOfBlockForm.getByLabel("Last Name").fill(LastName);
            await this.parentOfBlockForm.getByLabel("Email").fill(email);
            await this.parentOfBlockForm.getByLabel("Website").fill(website);

        });


    }



    async usingFormsWithoutLabels(recipient: string, subject: string, message: string) {

        await test.step(`Fill textfield under Forms without Labels`, async () => {
            await this.waitUntilLoaded();
            await this.parentOfFormsWithoutLabelForm.getByPlaceholder("Recipients").fill(recipient);
            await this.parentOfFormsWithoutLabelForm.getByPlaceholder("Subject").fill(subject);
            await this.parentOfFormsWithoutLabelForm.getByPlaceholder("Message").fill(message);
            await this.parentOfFormsWithoutLabelForm.getByRole('button', { name: 'Send' }).click()
        });

    }

    // Exchange the Locator for a variable otherwise it will be written at two diff spaces.


    get blockFormFirstNameLabel(): Locator {
        return this.parentOfBlockForm.getByLabel("First Name");
    }
        get blockFormLastNameLabel(): Locator {
        return this.parentOfBlockForm.getByLabel("Last Name");
    }
        get blockFormEmailLabel(): Locator {
        return this.parentOfBlockForm.getByLabel("Email");
    }
        get blockFormWebsiteLabel(): Locator {
        return this.parentOfBlockForm.getByLabel("Website");
    }




    get formsWithoutLabelRecipient(): Locator {
        return this.parentOfFormsWithoutLabelForm.getByPlaceholder("Recipients");
    }
    get formsWithoutLabelSubject(): Locator {
        return this.parentOfFormsWithoutLabelForm.getByPlaceholder("Subject");
    }
    get formsWithoutLabelMessage(): Locator {
        return this.parentOfFormsWithoutLabelForm.getByPlaceholder("Message");
    }
    get formsWithoutLabelSendBtn(): Locator {
        return this.parentOfFormsWithoutLabelForm.getByRole('button', { name: 'Send' });
    }
    get formsWithoutLabelAssert(): Locator {
        return this.parentOfFormsWithoutLabelForm.locator('form');
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
