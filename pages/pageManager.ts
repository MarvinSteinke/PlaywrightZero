import { Page, expect } from '@playwright/test';
import { DashboardPage } from "./dashboardPage";
import { NavigationPage } from "./navigationPage";
import { FormsLayout } from "./Forms/formsLayout";
import { Toastr } from "./ModalAndOverlays/toastr";
import { Datepicker } from "./Forms/datepicker";
import { SmartTable } from "./tablesAndData/smartTable";
import { Tooltips } from './ModalAndOverlays/tooltips';
export class PageManager {

    // Step 1 Add Variable Name
    readonly page: Page;
    readonly dashboardPage: DashboardPage;
    readonly navigationPage: NavigationPage;
    readonly formsLayout: FormsLayout;
    readonly toastr: Toastr;
    readonly datepicker: Datepicker;
    readonly smartTable : SmartTable;
    readonly tooltips : Tooltips;

    // Step 2 add the Page to Constructor
    constructor(page: Page) {
        this.page = page;
        this.dashboardPage = new DashboardPage(this.page);
        this.navigationPage = new NavigationPage(this.page,this);
        this.formsLayout = new FormsLayout(this.page);
        this.toastr = new Toastr(this.page);
        this.datepicker = new Datepicker(this.page);
        this.smartTable = new SmartTable(this.page);
        this.tooltips = new Tooltips(this.page);
    }   
    //Step 3 Add Getter for the Page not needed cause removed private Tag from variablen and readonly basically does that
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