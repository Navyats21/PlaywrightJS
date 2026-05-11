import {expect} from '@playwright/test'

export class AccountsOverview {

   constructor(page) {
        this.page = page;
        this.accountsOverviewTitle = this.page.locator('#showOverview .title');
        this.accountsTableSection = this.page.locator('table#accountTable');
        this.tableRow = this.page.locator('tbody tr');
        this.tableTotal = this.page.locator('tbody tr td b');
    }

    async NavigateToOverviewPage(){      
        await this.page.getByRole('link',{name:'Accounts Overview'}).click();
        await expect(this.page).toHaveURL(/overview\.htm/);       
    }
    async GetTotalBalance(){
        await expect(this.tableRow.last()).toContainText('Total');
        const totalBalance = await this.tableRow.last().locator('td b').filter({hasText:'$'}).innerText();
        return totalBalance
    }

}