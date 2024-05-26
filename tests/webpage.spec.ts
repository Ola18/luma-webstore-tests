import { HomePage } from '../src/pages/home.page';
import { RegisterPage } from '../src/pages/register.page';
import { expect, test } from '@playwright/test';

test('has title', async ({ page }) => {
  //Arrange
  const homePage = new HomePage(page);

  //Act
  await homePage.goto();

  // Assert
  const title = await homePage.title();
  expect(title).toContain('Home Page');
});

test('register user title', async ({ page }) => {
  //Arrange
  const registerPage = new RegisterPage(page);

  //Act
  await registerPage.goto();

  //Assert
  const title = await registerPage.title();
  expect(title).toContain('Create New Customer Account');
});
