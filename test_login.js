const { Builder, By, until } = require('selenium-webdriver');
require('chromedriver');
const assert = require('assert'); // Import the assert module for assertions

(async function loginTest() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        console.log('Navigating to login page...');
        await driver.get('http://localhost:3000/login'); // Replace with your actual login page URL

        console.log('Waiting for login page to load...');
        await driver.wait(until.elementLocated(By.name('username')), 10000); // Ensure the username field is present

        console.log('Entering username...');
        await driver.findElement(By.name('username')).sendKeys('ricky'); // Replace 'testuser' with a test username

        console.log('Entering password...');
        await driver.findElement(By.name('password')).sendKeys('ricky'); // Replace 'password123' with a test password

        console.log('Clicking submit button...');
        await driver.findElement(By.css('button[type="submit"]')).click();

        // Optionally add a short wait to ensure that network requests complete
        console.log('Waiting for possible page updates...');
        await driver.sleep(3000); // Adjust as necessary

        // Check for successful login indication
        console.log('Checking for successful login indication...');
        let profilePicture = await driver.wait(
            until.elementLocated(By.css('img.w-11')), 
            10000
        );

        // Use assert to check if the profile picture is present
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
