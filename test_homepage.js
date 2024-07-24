const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

(async function example() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Navigate to the login page
        await driver.get('http://localhost:3000/login'); // Update the URL as needed

        // Wait until the login form is loaded
        await driver.wait(until.elementLocated(By.id('username')), 20000);

        // Input the username and password
        await driver.findElement(By.id('username')).sendKeys('ricky');
        await driver.findElement(By.id('password')).sendKeys('ricky');

        // Submit the login form
        await driver.findElement(By.css('button[type="submit"]')).click();

        // Add debug logging to print the current URL after the login attempt
        await driver.sleep(5000); // Wait for 5 seconds before checking the URL
        const currentUrl = await driver.getCurrentUrl();
        console.log('Current URL after login attempt:', currentUrl);

        // Wait for the homepage to load by checking the presence of the greeting text
        await driver.wait(until.elementLocated(By.css('.md\\:text-4xl.text-2xl')), 30000); // Increase timeout to 30 seconds

        // Check if the greeting text is present
        let greetingText = await driver.findElement(By.css('.md\\:text-4xl.text-2xl')).getText();
        console.log('Greeting Text:', greetingText);
        assert.strictEqual(greetingText, 'Spend wisely, track wisely');

        // Check if the Doughnut chart is present
     //   const doughnutChart = await driver.findElement(By.css('.h-\\[330px\\].w-\\[330px\\]'));
       // assert.strictEqual(await doughnutChart.isDisplayed(), true);
        //console.log('Doughnut chart is displayed');

        // Check if the logout button is present and clickable
        let logoutButton = await driver.findElement(By.css('.w-5.h-5.cursor-pointer'));
        assert.strictEqual(await logoutButton.isDisplayed(), true);
        console.log('Logout button is displayed');

        // Perform the logout action
        await logoutButton.click();

        // Wait for the logout action to complete and redirect to the login page
        await driver.wait(until.elementLocated(By.id('username')), 30000); // Increase timeout to 30 seconds

        // Verify the user is redirected to the login page
        const finalUrl = await driver.getCurrentUrl();
        console.log('Current URL after logout:', finalUrl);
        assert.strictEqual(finalUrl, 'http://localhost:3000/login'); 
        console.log("Test passed")

    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        // Quit the driver
        await driver.quit();
    }
})();
