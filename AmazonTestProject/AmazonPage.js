class AmazonPage {
    constructor(page) {
       
        this.page = page;
        
        this.searchDropdownBox = '#searchDropdownBox'; 
        this.searchTextbox = '#twotabsearchtextbox';   
        this.searchButton = '#nav-search-submit-button';
        this.captchaImage = 'img[src*="captcha"]';     
    }

    async navigate(url) {
        await this.page.goto(url); 
    }

    async isCaptchaPresent() {
        
        return await this.page.$(this.captchaImage) !== null;
    }


    async waitForCaptchaSolve(timeout = 60000) {
        console.log('CAPTCHA detected. Please solve it manually.');
        
        await this.page.waitForTimeout(timeout);
    }

    async selectCategory(category) {
        
        await this.page.waitForSelector(this.searchDropdownBox);

       
        const dropdown = await this.page.locator(this.searchDropdownBox);
        await dropdown.selectOption({ label: category });
    }

    async searchItem(item) {
        
        await this.page.waitForSelector(this.searchTextbox);

        const searchBox = await this.page.locator(this.searchTextbox);
        await searchBox.fill(item);

        await this.page.locator(this.searchButton).click();

        await this.page.waitForSelector('.s-main-slot');
    }
}

module.exports = AmazonPage;