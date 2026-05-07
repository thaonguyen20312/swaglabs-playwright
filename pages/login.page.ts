import { Page, Locator } from '@playwright/test';
import { ProductPage } from './products.page';
import { SWAGLABS_URL } from '../utils/constants/constants';

export class LoginPage {
    private readonly page: Page;
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByTestId('username');
        this.passwordInput = page.getByTestId('password');
        this.loginButton = page.getByTestId('login-button');
        this.errorMessage = page.getByTestId('error');
    }

    async goToSwagLabs() {
        await this.page.goto(SWAGLABS_URL);
    }

    async login(username: string, password: string): Promise<ProductPage> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        return new ProductPage(this.page);
    }

}