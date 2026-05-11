import {expect} from '@playwright/test'

export class HomePage {
   constructor(page){
    this.page = page;
    this.accountServiceText = this.page.getByText('Account Services');
    this.allLeftMenus = this.page.locator('#leftPanel ul');
    this.homePageButtons = this.page.locator('ul.button li');
    this.accountsOverviewSection = this.page.locator('#overviewAccountsApp');
    this.welcomeMsg = this.page.locator('.smallText');

    }

    async VerifyWelcomeMessage(){
        await expect(this.welcomeMsg).toBeVisible();
    }
    async VerifyLeftMenuSection(){
        const menuList = ["Open New Account","Accounts Overview","Transfer Funds","Bill Pay"];
        const items = await this.allLeftMenus.getByRole('listitem');
        await expect(items).toContainText(menuList);
    }

    async VerifyHomePageButtons(){
        const Buttons = ["home","about","contact"];
        const items = await this.homePageButtons.allTextContents();
        console.log(items);
        await expect (items).toEqual(Buttons);
    }

}