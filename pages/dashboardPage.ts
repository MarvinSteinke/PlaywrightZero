import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from "./basePage";

 type buttonName = "Light" | "Roller Shades" | "Wireless Audio" | "Coffee Maker";
   

export class DashboardPage extends BasePage {
/**console.log('Cards found:', await this.lightButton.count());

console.log(
  'Divs found:',
  await this.lightButton.locator('div').count()
);

console.log(
  'Card HTML:',
  await this.lightButton.innerHTML()
);/ */
    
    constructor(page: Page) {
        super(page);
    }
    //readonly lightButton = this.page.locator('nb-card').filter( { has: this.page.getByText("Light", { exact: true }) });
   // readonly rollerShades = this.page.locator('nb-card').filter({ has: this.page.getByText("Roller Shades", { exact: true }) });
   // readonly wirelessAudio = this.page.locator('nb-card').filter({ has: this.page.getByText("Wireless Audio", { exact: true }) });
   // readonly coffeMaker = this.page.locator('nb-card').filter({ has: this.page.getByText("Coffee Maker", { exact: true }) });

   private getButtonNameLocator(name: buttonName): Locator {
        return this.page.locator('nb-card').filter( { has: this.page.getByText(name, { exact: true }) });
   }
    getButtonStatus(name: buttonName){
      return this.getButtonNameLocator(name).locator('.status');
   }

/*
    async clickLightButton() {
        await this.getButtonNameLocator("Light").click();
        let expectedText = await this.lightButton.locator('.status');
        await expect(expectedText).toHaveText('OFF');
        await this.lightButton.click();
        expectedText = await this.lightButton.locator('.status');
        await expect(expectedText).toHaveText('ON');
    }*/

    async clickToggleButton(name: buttonName) {
        const button = this.getToggleButton(name);
        await button.click();  
    }

    private getToggleButton(name: buttonName): Locator {
        const toggles: Record<buttonName, Locator> = {
            "Light": this.getButtonNameLocator("Light"),
            "Roller Shades": this.getButtonNameLocator("Roller Shades"),
            "Wireless Audio": this.getButtonNameLocator("Wireless Audio"),
            "Coffee Maker": this.getButtonNameLocator("Coffee Maker"),
        };
        return toggles[name];
    }
}