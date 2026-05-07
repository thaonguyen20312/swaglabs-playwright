import { Page, Locator } from '@playwright/test';

export class ProductPage {
    private readonly page: Page;
    private readonly productTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productTitle = page.getByTestId('title');
    }

    async getProductTitle() {
        return await this.productTitle.innerText();
    } //k cho truy cap truc tiep vao bien productTitle 
}