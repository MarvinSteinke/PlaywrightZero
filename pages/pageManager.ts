import { Page, expect } from '@playwright/test';
import { DashboardPage } from "./dashboardPage";
import { NavigationPage } from "./navigationPage";
export class PageManager {

    // Step 1 Add Variable Name
    private readonly page: Page;
    private readonly dashboardPage: DashboardPage;
    private readonly navigationPage: NavigationPage;

    // Step 2 add ne Page to Constructor
    constructor(page: Page) {
        this.page = page;
        this.dashboardPage = new DashboardPage(this.page);
        this.navigationPage = new NavigationPage(this.page);
    }   
    //Step 3 Add Getter for the Page
    getDashboardPage(): DashboardPage {
        return this.dashboardPage;
    }
    
    getNavigationPage(): NavigationPage {
        return this.navigationPage;
    }
}