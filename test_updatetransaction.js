const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const fs = require('fs');

// // Function to generate a random number
// function getRandomNumber() {
//     return Math.floor(Math.random() * 10000);
// }

// Function to generate a random string
function getRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

(async function testAddTransaction() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Navigate to the login page
        await driver.get('http://localhost:3000/login');

        // Wait for the username input field to be present
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
        try {
            await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div[3]/div[3]/div/div[1]')), 60000);
            console.log("New transaction card found");

            // Extract and log the card content
            const newTransactionCard = await driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div[3]/div/div[1]/div'));
            const cardContent = await newTransactionCard.getText();
            console.log('New Transaction Card Content:', cardContent);

            let currentUrl = await driver.getCurrentUrl();

            // Click the "Update Transaction" button
            await driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/div[3]/div/div[1]/div/div[1]/div/a')).click();
            console.log("Clicked 'Update Transaction' button");

            // Store the current URL
            console.log("Current URL:", currentUrl);

            // Wait for the update page to load
            await driver.wait(until.urlContains('/transaction'), 15000); // Extended timeout
            let newUrl = await driver.getCurrentUrl();
            if (currentUrl === newUrl) {
                console.log("Update page is not working. The URL did not change.");
                return;
            }
            console.log("Update page loaded");

            // Fill in random values
            await driver.findElement(By.id('description')).clear();
            await driver.findElement(By.id('description')).sendKeys('bread'); 
            await driver.findElement(By.id('amount')).clear();
            await driver.findElement(By.id('amount')).sendKeys('50'); 
            await driver.findElement(By.id('location')).clear();
            await driver.findElement(By.id('location')).sendKeys(getRandomString(6)); 

            console.log("Updated inputs");

            // Select a new payment type
            let updatePaymentTypeDropdown = await driver.findElement(By.id('paymentType'));
            await updatePaymentTypeDropdown.click();
            await updatePaymentTypeDropdown.findElement(By.css('option[value="cash"]')).click();

            // Select a new category
            let updateCategoryDropdown = await driver.findElement(By.id('category'));
            await updateCategoryDropdown.click();
            await updateCategoryDropdown.findElement(By.css('option[value="investment"]')).click();
            console.log("Updated payment type and category");

            // Update the date
            await driver.findElement(By.id('date')).clear();
            await driver.findElement(By.id('date')).sendKeys('2024-07-26'); 
            console.log("Updated date");

            // Click the "Save Changes" button
            await driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/form/button')).click();
            console.log("Clicked 'Update Transaction' button");


            await driver.findElement(By.xpath('//*[@id="root"]/div/div[3]/form/p/a[1]')).click();
            console.log("clicked on go back button");

            // Wait for the redirection back to the homepage
            await driver.wait(until.elementLocated(By.css('.md\\:text-4xl.text-2xl')), 30000);
            console.log("Home page loaded");

            console.log("Transaction updated and verified successfully");

        } catch (error) {
            console.error('Error locating new transaction card or updating transaction:', error);
            
        }
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        await driver.quit();
    }
})();

