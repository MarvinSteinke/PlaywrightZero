import {test, expect} from '../fixture';
import { PageManager } from '../pages/pageManager';



test('Page Object Model Tests', async({pom}) => {
   // const pm = new PageManager(page);
    let on = "ON";
    let off = "OFF";
    await pom.getDashboardPage().clickToggleButton("Light");
    await pom.getDashboardPage().clickToggleButton("Roller Shades");
    await pom.getDashboardPage().clickToggleButton("Wireless Audio");
    await pom.getDashboardPage().clickToggleButton("Coffee Maker");
    await expect(pom.getDashboardPage().getButtonStatus("Light")).toHaveText(off);
    await expect(pom.getDashboardPage().getButtonStatus("Roller Shades")).toHaveText(off);
    await expect(pom.getDashboardPage().getButtonStatus("Wireless Audio")).toHaveText(off);
    await expect(pom.getDashboardPage().getButtonStatus("Coffee Maker")).toHaveText(off);
    await pom.getDashboardPage().clickToggleButton("Light");
    await pom.getDashboardPage().clickToggleButton("Roller Shades");
    await pom.getDashboardPage().clickToggleButton("Wireless Audio");
    await pom.getDashboardPage().clickToggleButton("Coffee Maker");
    await expect(pom.getDashboardPage().getButtonStatus("Light")).toHaveText(on);
    await expect(pom.getDashboardPage().getButtonStatus("Roller Shades")).toHaveText(on);
    await expect(pom.getDashboardPage().getButtonStatus("Wireless Audio")).toHaveText(on);
    await expect(pom.getDashboardPage().getButtonStatus("Coffee Maker")).toHaveText(on);
})
