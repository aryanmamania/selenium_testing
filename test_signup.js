const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Sign Up Test', function() {
    this.timeout(15000); // Increase timeout if needed
    let driver;

    before(async function() {
        driver = new Builder().forBrowser('chrome').build();
    });

    after(async function() {
        await driver.quit();
    });

    it('should sign up successfully and redirect to the home page', async function() {
        // Open the sign-up page
        await driver.get('http://localhost:3000/signup');

        // Wait for the form fields to be present
        await driver.wait(until.elementLocated(By.id('name')), 10000);
        await driver.wait(until.elementLocated(By.id('username')), 10000);
        await driver.wait(until.elementLocated(By.id('password')), 10000);
        await driver.wait(until.elementLocated(By.id('male')), 10000);

        // Fill in the form fields
        await driver.findElement(By.id('name')).sendKeys('John Do');
        await driver.findElement(By.id('username')).sendKeys('johndo');
        await driver.findElement(By.id('password')).sendKeys('password123');
        await driver.findElement(By.id('male')).click();

        // Submit the form
        await driver.findElement(By.css('button[type="submit"]')).click();

        // Wait for URL to change to a different page
        await driver.wait(async function() {
            return (await driver.getCurrentUrl()) !== 'http://localhost:3000/signup';
        }, 10000);

        // Assert that the URL has changed
        const currentUrl = await driver.getCurrentUrl();
        console.log('Current URL:', currentUrl);
        assert.notStrictEqual(currentUrl, 'http://localhost:3000/signup', 'URL should not be the sign-up page after submission');
        console.log("test case passed")
    });
});
