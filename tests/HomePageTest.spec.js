const { test, expect } = require('./Hooks');
import {HomePage} from '../Pages/HomePage';
import {AccountsOverview} from '../Pages/AccountsOverview';

test('@Regression Verify HomePage', async({page})=>{
    const home = new HomePage(page);  
    await home.VerifyWelcomeMessage();
    await home.VerifyLeftMenuSection();
    await home.VerifyHomePageButtons()
    
});