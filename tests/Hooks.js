const { test, expect } = require('@playwright/test');

test.beforeEach('Ensure Application Login ' , async({page})=>{
  await page.goto('/parabank/index.htm');
});
module.exports = { test, expect };