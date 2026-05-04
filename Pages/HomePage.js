import {Locator,expect} from '@playwright/test'
export class HomePage {

    constructor(page){
    this.page = page;
    this.accountsOverviewSection = this.page.locator('#overviewAccountsApp');
    this.accountServiceText = this.page.getByText('Account Services');
    this.allLeftMenus = this.page.locator('#leftPanel ul');
    }

    async verifyAccountsOverview(){
        await expect(this.accountsOverviewSection).toBeVisible();
    }

    async verifyLeftMenuSection(){
        const menuList = ["Open New Account","Accounts Overview","Transfer Funds","Bill Pay"];
        const items = await this.allLeftMenus.getByRole('listitem');
        await expect(items).toContainText(menuList);
    }

}