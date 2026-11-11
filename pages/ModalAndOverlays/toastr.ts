import { Page, Locator, test } from '@playwright/test';
import { BasePage } from "../basePage";




export class Toastr extends BasePage {

    readonly toastrHeader = this.page.getByText("Toaster configuration")
    constructor(page: Page) {
        super(page);
    }
    readonly toastTypeDropdown = this.page.getByRole('combobox');


      async isLoaded(): Promise<boolean> { return await this.toastrHeader.isVisible() }


        // This Dropdown is different, the Option inside the dropdown ar ein another Container which makes the selection different
          async selectingOptionFromToasterPositionDropdown(selectOption:string) {
            await this.waitUntilLoaded();
        await test.step(`Select Dropdown Toaster configuration - Position - Select Option ${selectOption}`, async () => {
            
          
        });


    }
        // This is a standard Dropdown
              async selectingOptionFromToasterTypeDropdown(selectOption:string) {
                await this.waitUntilLoaded();
        await test.step(`Select Dropdown Toaster configuration - Toast Type - Select Option ${selectOption}`, async () => {
            await this.toastTypeDropdown.selectOption(selectOption);
          
        });


    }


}