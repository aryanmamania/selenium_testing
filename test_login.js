const { Builder, By, until } = require('selenium-webdriver');
require('chromedriver');
const assert = require('assert');

(async function loginTest() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        console.log('Navigating to login page...');
        await driver.get('http://localhost:3000/login'); // Replace with your actual login page URL

        console.log('Waiting for login page to load...');
        let usernameField = await driver.wait(until.elementLocated(By.name('username')), 15000);
        console.log('Username field located');
        assert.ok(usernameField, 'Username field not found on login page');

        console.log('Entering username...');
        await driver.findElement(By.name('username')).sendKeys('ricky'); // Replace 'ricky' with a test username

        console.log('Entering password...');
        await driver.findElement(By.name('password')).sendKeys('ricky'); // Replace 'ricky' with a test password

        console.log('Clicking submit button...');
        await driver.findElement(By.css('button[type="submit"]')).click();

        // Optionally add a short wait to ensure that network requests complete
        console.log('Waiting for possible page updates...');
        await driver.sleep(5000); // Increase sleep time if necessary

        console.log('Checking for successful login indication...');
        let profilePicture = await driver.wait(until.elementLocated(By.css('img.w-11')), 15000);
        console.log('Profile picture located');
        assert.ok(profilePicture, 'Profile picture not found, login might have failed');

        console.log('Login successful');
        console.log('Test passed');

    } catch (error) {
        console.error('An error occurred:', error);
        console.log('Test failed');
        process.exit(1); // Exit with code 1 to indicate failure
    } finally {
        // Close the browser
        await driver.quit();
    }
})();

