import { HomePage } from '../../src/pages/home.page';
import { testUser1 } from '../../src/test-data/user-data';
import test, { expect } from '@playwright/test';

test.describe('Sign in tests', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    homePage.goto();
  });

  test('User can sign in with valid credentails', async () => {
    //Arrange
    const firstName = testUser1.firstName;
    const lastName = testUser1.lastName;
    const email = testUser1.email;
    const password = testUser1.password;
    const welcomeLabel = `Welcome, ${firstName} ${lastName}!`;

    //Act
    const loginPage = await homePage.clickSignInButton();
    homePage = await loginPage.signIn(email, password);

    //Assert
    await expect(homePage.topmenu.welcomeLabel).toHaveText(welcomeLabel);
  });

  test('User cannot sign in with invalid password', async () => {
    //Arrange
    const email = testUser1.email;
    const password = 'invalidPassword';

    //Act
    const loginPage = await homePage.clickSignInButton();
    await loginPage.signIn(email, password);

    //Assert
    await expect(loginPage.signInErrorMessage).toContainText(
      'The account sign-in was incorrect',
    );
  });
});
