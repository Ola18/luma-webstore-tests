import { HomePage } from '../../src/pages/home.page';
import test, { expect } from '@playwright/test';

test.describe('Sign in tests', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    homePage.goto();
  });

  test('User can sign in with valid credentails', async () => {
    //Arrange
    const firstName = 'Daryl';
    const lastName = 'Parisian';
    const email = 'd.parisian@testmail.com';
    const password = 'test-daryl99';
    const welcomeLabel = `Welcome, ${firstName} ${lastName}!`;

    //Act
    const loginPage = await homePage.clickSignInButton();
    homePage = await loginPage.signIn(email, password);

    //Assert
    await expect(homePage.welcomeLabel).toHaveText(welcomeLabel);
  });
});
