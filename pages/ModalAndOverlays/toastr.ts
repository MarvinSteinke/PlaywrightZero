import { Page, expect, test } from '@playwright/test';
import { BasePage } from "../basePage";




export class Toastr extends BasePage {

    readonly toastrHeader = this.page.getByText("Toaster configuration")
    constructor(page: Page) {
        super(page);
    }
    readonly toastTypeDropdown = this.page.getByRole('combobox');
    readonly positionDropdownLabel = this.page.getByText("Position");
    readonly parentPositionDropdown = this.positionDropdownLabel.locator("..");
    readonly postitionDropdownButton = this.parentPositionDropdown.getByRole('button');


    async isLoaded(): Promise<boolean> { return await this.toastrHeader.isVisible() }


    // This Dropdown is different, the Option inside the dropdown ar ein another Container which makes the selection different
    async selectingOptionFromToasterPositionDropdown(selectOption: string) {
        await this.waitUntilLoaded();
        await test.step(`Select Dropdown Toaster configuration - Position - Select Option ${selectOption}`, async () => {


        });


    }
    // This is a standard Dropdown
    async selectingOptionFromToasterTypeDropdown(selectOption: string) {
        await this.waitUntilLoaded();
        await test.step(`Select Dropdown Toaster configuration - Toast Type - Select Option ${selectOption}`, async () => {
            await this.toastTypeDropdown.selectOption(selectOption);

        });


    }


    // This is a custom Dropdown with Option 1 to click
    async selectingOptionFromPositionDropdown(selectOption: string) {
        await this.waitUntilLoaded();
        await test.step(`Select Dropdown Toaster configuration - Position - Select Option ${selectOption}`, async () => {

            await this.postitionDropdownButton.click();

            //option 1, use list because it uses "<ul>" in the Tag HTML, cant use list item tho because the items are custom items and not <li>
            await this.page.getByRole('list').getByText(selectOption).click();

        });


    }

        // This is a custom Dropdown with Option 2 to click
    async selectingOptionFromPositionDropdownOption2(selectOption: string) {
        await this.waitUntilLoaded();
        await test.step(`Select Dropdown Toaster configuration - Position - Select Option ${selectOption}`, async () => {
            // because the "dropdown list" is seperate from the buttom in the Page it can be directly targeted 
            await this.postitionDropdownButton.click();
            await this.page.locator('nb-option', {hasText: selectOption}).click();


        });


    }


        async loopingOptionFromPositionDropdown() {
        await this.waitUntilLoaded();
        await test.step(`Select Dropdown Toaster configuration - Position - looping through all Items`, async () => {
            // because the "dropdown list" is seperate from the buttom in the Page it can be directly targeted 
            await this.postitionDropdownButton.click();
            const allListValues = await this.page.locator('nb-option').allTextContents();
            for (const listValue of allListValues){
                 await test.step(`Loop Dropdown Item ${listValue}`, async () => {
                 await this.page.locator('nb-option', {hasText: listValue}).click();
                 await expect(this.postitionDropdownButton).toHaveText(listValue);
                 await this.postitionDropdownButton.click();
                  });
            }
        });


    }


}