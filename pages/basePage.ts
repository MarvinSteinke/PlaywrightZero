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
        await expect.poll(() => this.isLoaded()).toBe(true);
    }
}