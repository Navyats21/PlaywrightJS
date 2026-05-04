# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: LoginTest.spec.js >> @Regression Reuse-Cookies
- Location: tests/LoginTest.spec.js:30:5

# Error details

```
Error: page.goto: Target page, context or browser has been closed
Call log:
  - navigating to "https://parabank.parasoft.com/", waiting until "load"

```

# Test source

```ts
  1  | import { LoginPage } from "../Pages/LoginPage";
  2  | import {HomePage} from "../Pages/HomePage";
  3  | import {test,expect} from '@playwright/test';
  4  | import {AccountOpening} from '../Pages/AccountOpening';
  5  | import Data  from '../Config/DataConfig.json';
  6  | import fs from 'fs';
  7  | import path from 'path';
  8  | 
  9  | test('Login To App', async({browser})=>{
  10 |     
  11 |     const context = await browser.newContext();
  12 |     const page = await context.newPage();
  13 |     const Login = await new LoginPage(page);
  14 |     await Login.launchUrl(Data.Url); 
  15 |     await Login.login(Data.Username,Data.Password);
  16 | 
  17 |     const home = new HomePage(page);
  18 |     const new_acct = new AccountOpening(page);
  19 |     await home.verifyAccountsOverview();
  20 |     await home.verifyLeftMenuSection();
  21 | 
  22 |     await new_acct.SelectOpenNewAccount();
  23 |     await new_acct.VerifyNewAccountPage();
  24 |     await new_acct.ChooseAccountType();
  25 |     const no = await new_acct.ClickNewAccountButton();
  26 |     console.log(no);
  27 | 
  28 | });
  29 | 
  30 | test('@Regression Reuse-Cookies' , async ({browser})=>{
  31 | 
  32 | const cookies = JSON.parse(fs.readFileSync(path.join(__dirname, '../cookies.json'), 'utf8'));
  33 | // Create a new context (this is the equivalent of a new browser session)
  34 |   const context = await browser.newContext();
  35 |   // Set cookies in the new context (this simulates a logged-in session)
  36 |   await context.addCookies(cookies);
  37 |   // Open a new page in the context
  38 |   const newPage = await context.newPage();
> 39 |   await newPage.goto('https://parabank.parasoft.com/');
     |                 ^ Error: page.goto: Target page, context or browser has been closed
  40 |   await newPage.waitForLoadState('networkidle');
  41 | 
  42 | 
  43 | });
```