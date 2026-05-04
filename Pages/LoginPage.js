import {test,Locator,Page,expect} from '@playwright/test';
const fs = require('fs');  // Import fs to interact with the file system
const path = require('path'); 

export class LoginPage {

    constructor(page) {
        this.page = page;
        this.logo = this.page.locator('.logo');
        this.usernameField = this.page.locator('[name="username"]');
        this.passwordField = this.page.locator('[name="password"]');
        this.LoginBtn = this.page.locator('[value="Log In"]');
    }

    async launchUrl(url){
        await this.page.goto(url);
    }

    async login(username,password){
        await expect(this.logo).toBeVisible();
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await Promise.all ([
        this.waitForLoginApiResponse(),
        this.LoginBtn.click()
        ])
        await this.StoreCookies();
    }

    async StoreCookies(){
        const cookies = await this.page.context().cookies();
        console.log('Captured Cookies:', cookies);     
       if (cookies.length === 0) {
        console.error('No cookies found. Ensure the login was successful.');
        return;}
            
        const filePath = path.join(__dirname, '../cookies.json');  // Absolute path to the current directory
        try {
            // Write cookies to a JSON file
            fs.writeFileSync(filePath, JSON.stringify(cookies, null, 2));  // Indent JSON for readability
            console.log('Cookies successfully stored at ${filePath}');
        } catch (err) {
            console.error('Error writing cookies to file:', err);
        }
    }

    //waiting for login API to complete
    async waitForLoginApiResponse() {
   return this.page.waitForResponse(response =>
    response.url().includes('/customers') &&
    response.ok());
}



} 