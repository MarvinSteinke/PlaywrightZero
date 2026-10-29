import { test as base } from '@playwright/test';
import { PageManager } from './pages/pageManager';
// testfix is a test to see how Fixture dependencies
type myFixtures = {
    pom: PageManager
    testFix: PageManager
}


export const test =base.extend<myFixtures>({
    pom: async ({page}, use) => {
        await page.goto('/');
        const pm = new PageManager(page);
        await use(pm)
    },
    testFix: async ({pom}, use) => {
        //await pom.getDashboardPage().gotoDashboard();
        await pom.getDashboardPage().clickToggleButton("Light");
        await use(pom)
    } 
})

export { expect } from '@playwright/test';