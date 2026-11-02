import { Page, Locator} from '@playwright/test';
import { BasePage } from "../basePage";



   
export class FormsLayout extends BasePage {
    readonly formsLayoutHeader = this.page.getByText('Using the Grid', { exact: true });
    constructor(page: Page) {
        super(page);
    }
        async isLoaded(): Promise<boolean> {

        //this.page.locator('a[title="IoT Dashboard"]');

        return await this.formsLayoutHeader.isVisible()
        && await this.formsLayoutHeader.evaluate(el => el.classList.contains('expanded'));
        // The el is a element variable based on DashboardHeader for the Evaluate function to find the Attribute i want inside DashboardHeader
    }
}
