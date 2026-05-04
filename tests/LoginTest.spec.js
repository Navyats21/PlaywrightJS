import { LoginPage } from "../Pages/LoginPage";
import {HomePage} from "../Pages/HomePage";
import {test,expect} from '@playwright/test';
import {AccountOpening} from '../Pages/AccountOpening';
import Data  from '../Config/DataConfig.json';
import fs from 'fs';
import path from 'path';

test('Login To App', async({browser})=>{
    
    const context = await browser.newContext();
    const page = await context.newPage();
    const Login = await new LoginPage(page);
    await Login.launchUrl(Data.Url); 
    await Login.login(Data.Username,Data.Password);

    const home = new HomePage(page);
    const new_acct = new AccountOpening(page);
    await home.verifyAccountsOverview();
    await home.verifyLeftMenuSection();

    await new_acct.SelectOpenNewAccount();
    await new_acct.VerifyNewAccountPage();
    await new_acct.ChooseAccountType();
    const no = await new_acct.ClickNewAccountButton();
    console.log(no);

});

test('@Regression Reuse-Cookies' , async ({browser})=>{

const cookies = JSON.parse(fs.readFileSync(path.join(__dirname, '../cookies.json'), 'utf8'));
// Create a new context (this is the equivalent of a new browser session)
  const context = await browser.newContext();
  // Set cookies in the new context (this simulates a logged-in session)
  await context.addCookies(cookies);
  // Open a new page in the context
  const newPage = await context.newPage();
  await newPage.goto('https://parabank.parasoft.com/');
  await newPage.waitForLoadState('networkidle');


});