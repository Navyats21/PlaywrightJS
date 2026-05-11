import {expect} from '@playwright/test'

export class AccountOpening {
    constructor(page) {
        this.page = page;
        this.accountTypeDropDown = this.page.locator('[id="type"]');
        this.openNewAcctBtn = this.page.getByRole('button', {name:'Open New Account'});
        this.openNewAccountLink = this.page.getByRole('link',{name:'Open New Account'});
        this.openNewAccountSection = this.page.locator('#openAccountForm');
        this.accountOpenResultSection = this.page.locator('#openAccountResult');
        this.accountNo = this.page.locator('#openAccountResult #newAccountId');
        this.accountDropDown = this.page.locator('#rightPanel #fromAccountId');
    }


    async SelectOpenNewAccount(){
        await this.openNewAccountLink.click();
    }

    async VerifyNewAccountPage(){
        await expect(this.openNewAccountSection.getByRole('heading', { name: 'Open New Account'})).toBeVisible();
    }

    async ChooseAccountType(accountType){
        await this.accountTypeDropDown.selectOption("SAVINGS");
    }

    async ClickNewAccountButton(){
        await this.accountDropDown.selectOption({index:0});
        await this.openNewAcctBtn.click();
        await expect(this.accountOpenResultSection.getByRole('heading',{name:'Account Opened!'})).toBeVisible();;
        await expect(this.accountOpenResultSection.getByText(/Congratulations/i)).toBeVisible();
        const AccontNo = await this.accountNo.textContent();
        return AccontNo;
        
    }
}