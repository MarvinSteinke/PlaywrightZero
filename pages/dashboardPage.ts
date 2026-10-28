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
        readonly temperatureContent = this.page.locator('nb-tab[tabtitle="Temperature"]');
        readonly humidityContent = this.page.locator('nb-tab[tabtitle="Humidity"]');
        readonly tempOrHumHeader = this.page.locator('ngx-temperature');
        readonly tempHeader = this.tempOrHumHeader.getByText('Temperature');
        readonly humHeader = this.tempOrHumHeader.getByText('Humidity');

    async isLoaded(): Promise<boolean> {
        const dashboardHeader = this.page.locator('a[title="IoT Dashboard"]');

        return await dashboardHeader.isVisible()
        && await dashboardHeader.evaluate(el => el.classList.contains('active'));
        // The el is a element variable based on DashboardHeader for the Evaluate function to find the Attribute i want inside DashboardHeader
    }
        async gotoDashboard(): Promise<void> {
        await this.page.goto('/pages/iot-dashboard');
        //await this.page.goto('/pages/forms/layouts'); -> check if it can fail

        await this.waitUntilLoaded();
    }


//Test to check Circle Slider locator

    async testFunction(){
        const tempHeader = this.tempOrHumHeader.getByText('Temperature');
       // const humHeader = tempOrHumHeader.getByText('Humidity');
       // await humHeader.scrollIntoViewIfNeeded();
       // await humHeader.click();
        await tempHeader.scrollIntoViewIfNeeded();
        await tempHeader.click();
        const test = this.temperatureContent.locator('circle')
        const temperaturePower = this.temperatureContent.locator('g[data-name="power"]')
        await temperaturePower.scrollIntoViewIfNeeded();
        await temperaturePower.click();
    }

    async moveTemperatureSlider()
    {
        await this.tempHeader.scrollIntoViewIfNeeded();
        await this.tempHeader.click();
        const tempArea = this.temperatureContent.locator('ngx-temperature-dragger');
        await tempArea.scrollIntoViewIfNeeded();
        this.moveMouseToBottomRight(tempArea);
        // Bounding Box erstellt X und Y Koordinaten wobei 0 0 oben Links is und X L-> R und y O -> U und größe ist abhängig von dem Element, hier 300x300
        /*const tempBox = await tempArea.boundingBox();
        // Get Center of the Box, ? heißt das controlliert wird das die tempbox not Null oder undefined ist sonst schmeißt es ein undefined statt Error
        const x = tempBox?.x + tempBox?.width/2;
        const y = tempBox?.y + tempBox?.height/2;
        await this.page.mouse.move(x,y);
        await this.page.mouse.down();
        await this.page.mouse.move(x+100,y);
        await this.page.mouse.move(x+100,y+100);
        await this.page.mouse.up();*/

    }
        async moveHumiditySlider()
    {
        await this.humHeader.scrollIntoViewIfNeeded();
        await this.humHeader.click();
        const humArea = this.humidityContent.locator('ngx-temperature-dragger');
        await humArea.scrollIntoViewIfNeeded();
        this.moveMouseToBottomRight(humArea);
        // Bounding Box erstellt X und Y Koordinaten wobei 0 0 oben Links is und X L-> R und y O -> U und größe ist abhängig von dem Element, hier 300x300
        /*const tempBox = await tempArea.boundingBox();
        // Get Center of the Box, ? heißt das controlliert wird das die tempbox not Null oder undefined ist sonst schmeißt es ein undefined statt Error
        const x = tempBox?.x + tempBox?.width/2;
        const y = tempBox?.y + tempBox?.height/2;
        await this.page.mouse.move(x,y);
        await this.page.mouse.down();
        await this.page.mouse.move(x+100,y);
        await this.page.mouse.move(x+100,y+100);
        await this.page.mouse.up();*/

    }

    async moveMouseToBottomRight(area:Locator)
    {
        const box = await area.boundingBox();
        const x = box?.x + box?.width/2;
        const y = box?.y + box?.height/2;
        await this.page.mouse.move(x,y);
        await this.page.mouse.down();
        await this.page.mouse.move(x+100,y);
        await this.page.mouse.move(x+100,y+150);
        await this.page.mouse.up();

    }


    // Gets the Parent Card of the nearly Identical Elements so the right one is chosen
   private getButtonNameLocator(name: buttonName): Locator {
        return this.page.locator('nb-card').filter( { has: this.page.getByText(name, { exact: true }) });
   }
   // Status to check On Off for the Toggle Buttons
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