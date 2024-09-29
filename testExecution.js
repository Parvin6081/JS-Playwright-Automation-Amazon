const { chromium } = require('playwright');
const AmazonPage = require('./AmazonPage');  
const { amazonURL } = require('./config');

(async () => {
    const browser = await chromium.launch({
        headless: false,  
        slowMo: 2000      
    });
    const page = await browser.newPage();

    const amazon = new AmazonPage(page);

    const amazonURL = 'https://www.amazon.com/';

    await amazon.navigate(amazonURL);

    if (await amazon.isCaptchaPresent()) {

        await amazon.waitForCaptchaSolve();
    }
    //Test case 1: Select software from the drop down
    try {
        await amazon.selectCategory('Software');
        console.log('Test Case 1: Successfully selected "Software" from the dropdown.');
    } catch (error) {
        console.log('Test Case 1: Failed -', error.message);
    }

    // Test Case 2: Search for 'games'
    try {
        await amazon.searchItem('games');
        console.log('Test Case 2: Search for "games" executed successfully.');
    } catch (error) {
        console.log('Test Case 2: Failed -', error.message);
    }

    // Test Case 3: Close the browser
    try {
        await browser.close();
        console.log('Test Case 3: Browser closed successfully.');
    } catch (error) {
        console.log('Test Case 3: Failed -', error.message);
    }
})();


