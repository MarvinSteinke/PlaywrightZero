import { expect, test, type Page } from '@playwright/test';
import { BasePage } from "../basePage";

type BoundingBox = {
    x: number;
    y: number;
    width: number;
    height: number;
};

type TooltipDirection = 'Right' | 'Left' | 'Bottom' | 'Top' | 'overlapping';


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
        await expect(buttonToHover).toBeVisible();
        await buttonToHover.hover();
        

        });


    }

    async checkingDirectionOfTooltip(buttonName: string): Promise<TooltipDirection> {
      return await test.step(`Checking Direction of Tooltip from Button ${buttonName} under Tooltip Placement`, async () => {
        const buttonToHover = this.page.getByRole('button', {name: buttonName});
        await buttonToHover.hover();
        await expect(this.tooltip).toBeVisible();

        const buttonBox = await buttonToHover.boundingBox();
        const tooltipBox = await this.tooltip.boundingBox();
        if (!buttonBox || !tooltipBox) {
            throw new Error(`Could not measure the "${buttonName}" button and its tooltip.`);
        }

        return this.getTooltipDirection(buttonBox, tooltipBox);
        });
  
    }

    getTooltipDirection(buttonBox: BoundingBox, tooltipBox: BoundingBox): TooltipDirection {
  if (tooltipBox.x >= buttonBox.x + buttonBox.width) return 'Right';
  if (tooltipBox.x + tooltipBox.width <= buttonBox.x) return 'Left';
  if (tooltipBox.y >= buttonBox.y + buttonBox.height) return 'Bottom';
  if (tooltipBox.y + tooltipBox.height <= buttonBox.y) return 'Top';

  return 'overlapping';
}
}