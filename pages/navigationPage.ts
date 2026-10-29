import { Page, Locator} from '@playwright/test';
import { BasePage } from "./basePage";


 type groupHeaderNames = "Forms" | "Modal & Overlays" | "Extra Components" | "Charts"| "Tables & Data" | "Auth";
 
   
export class NavigationPage extends BasePage {
        readonly navigationHeader = this.page.locator('nb-sidebar.menu-sidebar');;
    private readonly destinyOptions = {
    Datepicker: "Datepicker",
    FormLayouts: "Form Layouts",
    Dialog: "Dialog",
    Window: "Window",
    Popover: "Popover",
    Toastr: "Toastr",
    Tooltip: "Tooltip"
} as const;
    
    constructor(page: Page) {
        super(page);
    }

    async isLoaded(): Promise<boolean> {

        //this.page.locator('a[title="IoT Dashboard"]');

        return await this.navigationHeader.isVisible()
        && await this.navigationHeader.evaluate(el => el.classList.contains('expanded'));
        // The el is a element variable based on DashboardHeader for the Evaluate function to find the Attribute i want inside DashboardHeader
    }

    private async checkIfNavigationHeaderIsExpanded()
    {
        await this.waitUntilLoaded();

         const isExpanded = await this.navigationHeader.getAttribute('aria-expanded');

    if (isExpanded !== 'true') {
        await this.page.locator('.sidebar-toggle').click();
    }
        /*const checkIfExpanded = await this.navigationHeader.evaluate(el => el.getAttribute('aria-expanded') === 'true');
        if (!checkIfExpanded)
        {
            this.page.locator('.sidebar-toggle').click();
        }
*/
        
    }

    private async selectGroupHeader(groupHeaderTitle: string)
    {   
        this.checkIfNavigationHeaderIsExpanded();
        const groupHeader = this.page.getByRole('link', { name: groupHeaderTitle });
        await groupHeader.scrollIntoViewIfNeeded();
        const checkIfExpanded = await groupHeader.evaluate(el => el.getAttribute('aria-expanded') === 'true');
        if(!checkIfExpanded)
        {
            await groupHeader.click();
        }
    }
    async navigateToDestiny(destiny: string)
    {
        const groupHeader = await this.selectDestiny(destiny);
        await this.selectGroupHeader(groupHeader);
        const formsLink = this.page.getByRole('link', {name: destiny})
        formsLink.scrollIntoViewIfNeeded();
        await formsLink.click();
    }
        async navigateToDatepicker()
    {
        await this.selectGroupHeader("Forms");
        const formsLink = this.page.getByRole('link', {name: "Datepicker"})
    }
    private async selectDestiny(destiny: string): Promise<groupHeaderNames>
    {   
        let pickedDestiny:string;
        switch(destiny)
        {
            case this.destinyOptions.Datepicker: pickedDestiny = "Forms"; break;
            case this.destinyOptions.FormLayouts: pickedDestiny = "Forms"; break;
            case this.destinyOptions.Dialog: pickedDestiny = "Modal & Overlays"; break;
            case this.destinyOptions.Window: pickedDestiny = "Modal & Overlays"; break;
            case this.destinyOptions.Popover: pickedDestiny = "Modal & Overlays"; break;
            case this.destinyOptions.Toastr: pickedDestiny = "Modal & Overlays"; break;
            case this.destinyOptions.Tooltip: pickedDestiny = "Modal & Overlays"; break;
            default: throw new Error(`Destiny ${destiny} is not defined in the selectDestiny function`);
        }
        return pickedDestiny as groupHeaderNames;

    }

    async validateNavigatedPageIsReached(pageName:string)
    {
        let expectedPageNameLocator:Locator;
        switch(pageName)
        {
            case this.destinyOptions.FormLayouts: expectedPageNameLocator = this.page.getByText('Using the Grid', { exact: true }); break;
            case this.destinyOptions.Datepicker: expectedPageNameLocator = this.page.getByText('Common Datepicker', { exact: true }); break;
            case this.destinyOptions.Dialog: expectedPageNameLocator = this.page.getByText('Open Dialog', { exact: true }); break;
            case this.destinyOptions.Window: expectedPageNameLocator = this.page.getByText('Window Form', { exact: true }); break;
            case this.destinyOptions.Popover: expectedPageNameLocator = this.page.getByText('Popover Position', { exact: true }); break;
            case this.destinyOptions.Toastr: expectedPageNameLocator = this.page.getByText('Toaster configuration', { exact: true }); break;
            case this.destinyOptions.Tooltip: expectedPageNameLocator = this.page.getByText('Tooltip With Icon', { exact: true }); break;
            default: throw new Error(`PageName ${pageName} is not defined in the PageName Array function`);
        }
        return expectedPageNameLocator!;
    }


}