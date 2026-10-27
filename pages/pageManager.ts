import { Page, expect } from '@playwright/test';
import { DashboardPage } from "./dashboardPage";

export class PageManager {
    private readonly page: Page;
    private readonly dashboardPage: DashboardPage;
    constructor(page: Page) {
        this.page = page;
        this.dashboardPage = new DashboardPage(this.page);
    }   

    getDashboardPage(): DashboardPage {
        return this.dashboardPage;
    }
}