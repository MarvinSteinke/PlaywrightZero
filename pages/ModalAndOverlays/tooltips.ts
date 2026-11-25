import { Page, expect, test, BoundingBox  } from '@playwright/test';
import { BasePage } from "../basePage";


// to be able to see tooltips in inspect you need to freeze the DOM, in win its F8 in mac command backslash

export class Tooltips extends BasePage {
        readonly tooltipHeader = this.page.getByText("Tooltip With Icon")
    constructor(page: Page) {
        super(page);
    }
    readonly tooltip = this.page.getByRole('tooltip');

    async isLoaded(): Promise<boolean> { return await this.tooltipHeader.isVisible() }

        async checkingTooltipTooltipPlacement(buttonName: string) {
        await this.waitUntilLoaded();
        await test.step(`Checking Tooltip from Button ${buttonName} under Tooltip Placement`, async () => {
        const buttonToHover = this.page.getByRole('button', {name: buttonName});
        await buttonToHover.isVisible();
        await buttonToHover.hover();
        

        });


    }

    async checkingDirectionOfTooltip(buttonName: string){
      await test.step(`Checking Direction of Tooltip from Button ${buttonName} under Tooltip Placement`, async () => {
        const buttonToHover = this.page.getByRole('button', {name: buttonName});
        const buttonHovered = await buttonToHover.boundingBox();
        const tooltipHovered = await this.tooltip.boundingBox();
        return this.getTooltipDirection(buttonHovered,tooltipHovered);
        

        });
  
    }

    async getTooltipDirection(buttonBox:BoundingBox , tooltipBox:BoundingBox) {
  if (tooltipBox.x >= buttonBox.x + buttonBox.width) return 'Right';
  if (tooltipBox.x + tooltipBox.width <= buttonBox.x) return 'Left';
  if (tooltipBox.y >= buttonBox.y + buttonBox.height) return 'Bottom';
  if (tooltipBox.y + tooltipBox.height <= buttonBox.y) return 'Top';

  return 'overlapping';
}
}