import { Page, expect } from '@playwright/test';
import { DashboardPage } from "./dashboardPage";
import { NavigationPage } from "./navigationPage";
import { FormsLayout } from "./Forms/formsLayout";
export class PageManager {

    // Step 1 Add Variable Name
    readonly page: Page;
    readonly dashboardPage: DashboardPage;
    readonly navigationPage: NavigationPage;
    readonly formsLayout: FormsLayout;

    // Step 2 add ne Page to Constructor
    constructor(page: Page) {
        this.page = page;
        this.dashboardPage = new DashboardPage(this.page);
        this.navigationPage = new NavigationPage(this.page,this);
        this.formsLayout = new FormsLayout(this.page);
    }   
    //Step 3 Add Getter for the Page not needed cause removed private Tag from variablen
   /* getDashboardPage(): DashboardPage {
        return this.dashboardPage;
    }
    
    getNavigationPage(): NavigationPage {
        return this.navigationPage;
    }
    getFormsLayout(): FormsLayout {
        return this.formsLayout;
    } */
}