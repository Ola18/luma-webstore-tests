import { createUserData } from '../../src/factories/user.factory';
import { HomePage } from '../../src/pages/home.page';
import test, { expect } from '@playwright/test';

test.describe('Verify register', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('User can register with correct data', async () => {
    //Arrange
    const userData = createUserData();

    //Act
    const registerPage = await homePage.clickRegisterButton();
    const account = await registerPage.registerUser(userData);
    account.waitForPageToLoadUrl();

    //Assert
    await expect
      .soft(account.succesRegistrationMsg)
      .toContainText('Thank you for registering with Main Website Store.');

    await expect(account.userData).toContainText(
      `${userData.firstName} ${userData.lastName}`,
    );
    await expect(account.userData).toContainText(`${userData.email}`);
  });

  test('User cannot register with incorrect email', async () => {
    //Arrange
    const userData = createUserData();
    userData.email = 'invalid_email.com';
    const expectedErrorMsg =
      'Please enter a valid email address (Ex: johndoe@domain.com).';

    //Act
    const registerPage = await homePage.clickRegisterButton();
    await registerPage.registerUser(userData);

    //Assert
    await expect(registerPage.incorrectEmailMsg).toHaveText(expectedErrorMsg);
  });
});
