const { test: setup, expect } = require('@playwright/test');
import { LoginPage } from "../Pages/LoginPage";
import Data  from '../Config/DataConfig.json';


setup('login once', async ({ browser }) => {
   const context = await browser.newContext();
    const page = await context.newPage();
    const Login =  new LoginPage(page);
    await Login.launchUrl(Data.Url); 
    await Login.login(Data.Username,Data.Password);
});