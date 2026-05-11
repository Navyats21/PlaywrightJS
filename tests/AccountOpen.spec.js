const { test, expect } = require('./Hooks');
import {AccountOpening} from '../Pages/AccountOpening';

test('@Regression To Open Account', async({page})=>{
    const new_acct = new AccountOpening(page);
    await new_acct.SelectOpenNewAccount();
    await new_acct.VerifyNewAccountPage();
    await new_acct.ChooseAccountType();
    const no = await new_acct.ClickNewAccountButton();
    console.log(no);
});