import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { ProductPage } from '../../pages/products.page';
import { USERS } from '../../utils/constants/users';
import logger from '../../utils/helpers/logger';

test('Login successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    let productPage: ProductPage;

    await test.step('1. Go to Swaglabs.', async () => {
        await loginPage.goToSwagLabs();
    });

    await test.step('2. Login with valid username and password', async () => {

        productPage = await loginPage.login(USERS.STANDARD_USER.username, USERS.STANDARD_USER.password);
    });

    await test.step('3. Verify that user login successfully', async () => {
        const title = await productPage.getProductTitle();
        expect(title).toBe('Products');
    });

    // logger.info('1. Go to Swaglabs.');
    // const loginPage = new LoginPage(page);
    // loginPage.goToSwagLabs();

    // logger.info('2. Enter valid username');
    // logger.info('3. Enter valid password');
    // logger.info('4. Click Login button');
    // const productPage = await loginPage.login(USERS.STANDARD_USER.username, USERS.STANDARD_USER.password);

    // logger.verify('5. Verify that user login successfully')
    // const title = await productPage.getProductTitle();
    // expect(title).toBe('Products');
})