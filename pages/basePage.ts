import { Page, expect } from '@playwright/test';


export interface IPage{
    isLoaded(): Promise<boolean>;
}


export abstract class BasePage implements IPage {
    readonly page: Page;
    constructor(  page: Page) { 
        this.page = page;
    }
    abstract isLoaded(): Promise<boolean>;
    
        async waitUntilLoaded(): Promise<void> {
            // Wiederholt den Check ob die Seite geladen ist bis zum Timeout or True
        await expect.poll(() => this.isLoaded()).toBe(true);
    }
}