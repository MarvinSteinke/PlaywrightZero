import { test as base } from '@playwright/test';
import { PageManager } from './pages/pageManager';

type myFixtures = {
    pom: PageManager
}


export const test =base.extend<myFixtures>({
    pom: async ({page}, use) => {
        await page.goto('/');
        const pm = new PageManager(page);
        await use(pm)
    }
})

export { expect } from '@playwright/test';