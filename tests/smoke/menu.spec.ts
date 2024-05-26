import { MainMenu } from '../../src/components/main.menu';
import { HomePage } from '../../src/pages/home.page';
import { expect, test } from '@playwright/test';

test.describe('Verify main menu buttons', () => {
  let homePage: HomePage;
  let mainMenu: MainMenu;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    homePage.goto();
    mainMenu = new MainMenu(page);
  });

  test('women button navigates to Women page @smoke', async () => {
    //Act
    const womenPage = await mainMenu.clickWomenButton();

    //Assert
    const title = await womenPage.title();
    expect(title).toContain('Women');
  });

  test('men button navigates to Men page @smoke', async () => {
    //Act
    const menPage = await mainMenu.clickMenButton();

    //Assert
    const title = await menPage.title();
    expect(title).toContain('Men');
  });

  test('home page button navigates to main page @smoke', async () => {
    //Act
    mainMenu.clickWomenButton();
    const homePage = mainMenu.clickHomePage();

    //Assert
    const title = await (await homePage).title();
    expect(title).toContain('Home Page');
  });
});
