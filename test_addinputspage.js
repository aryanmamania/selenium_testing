const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const fs = require('fs');

(async function testUpdateTransaction() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Navigate to the login page
        await driver.get('http://localhost:3000/login');
        await driver.wait(until.elementLocated(By.id('username')), 20000);
        console.log("Login page loaded");

        // Enter username and password
        await driver.findElement(By.id('username')).sendKeys('ricky');
        await driver.findElement(By.id('password')).sendKeys('ricky');
        console.log("Entered username and password");

        // Click the login button
        await driver.findElement(By.css('button[type="submit"]')).click();

        // Wait for the homepage to load
        await driver.wait(until.elementLocated(By.css('.md\\:text-4xl.text-2xl')), 30000);
        console.log("Home page loaded");

        // Check if the transaction form is present
        await driver.wait(until.elementLocated(By.id('description')), 20000);
        console.log("Transaction form loaded");

        // Fill in the transaction details
        await driver.findElement(By.id('description')).sendKeys('salary');
        await driver.findElement(By.id('amount')).sendKeys('10000');
        await driver.findElement(By.id('location')).sendKeys('delhi');

        // Select a payment type from the dropdown
        let paymentTypeDropdown = await driver.findElement(By.id('paymentType'));
        await paymentTypeDropdown.click();
        await paymentTypeDropdown.findElement(By.css('option[value="card"]')).click();

        // Select a category from the dropdown
        let categoryDropdown = await driver.findElement(By.id('category'));
        await categoryDropdown.click();
        await categoryDropdown.findElement(By.css('option[value="saving"]')).click();

        // Select a date
        await driver.findElement(By.id('date')).sendKeys('2024-07-25'); // YYYY-MM-DD format

        // Click the "Add Transaction" button
        await driver.findElement(By.css('button[type="submit"]')).click();

   
        // Wait for the new transaction card to appear
        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div[3]/div[3]/div/div[1]')), 60000);
   
        console.log("New transaction card found");


     
        console.log("Testing successful");
    } catch (error) {
        console.error('An error occurred:', error);
        await driver.takeScreenshot().then(function (image, err) {
            fs.writeFileSync('error-screenshot.png', image, 'base64');
        });
    } finally {
        await driver.quit();
    }
})();
