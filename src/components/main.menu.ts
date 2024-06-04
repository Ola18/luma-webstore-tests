import { HomePage } from '../pages/home.page';
import { MenPage } from '../pages/men.page';
import { WomenPage } from '../pages/women.page';
import { Page } from '@playwright/test';

export class MainMenu {
  constructor(private page: Page) {}

  homePage = this.page.getByLabel('store logo');

  //women menu
  womenButton = this.page.locator('#ui-id-4');

  womenTopsItems = this.page.locator('#ui-id-9');
  womenJackets = this.page.locator('#ui-id-11');
  womenHoodiesSweatshirts = this.page.locator('#ui-id-12');
  womenTees = this.page.locator('#ui-id-13');
  womenBrassTanks = this.page.locator('#ui-id-14');

  womenBottomsItems = this.page.locator('#ui-id-10');
  womenPants = this.page.locator('#ui-id-15');
  womenShorts = this.page.locator('#ui-id-16');

  //men menu
  menButton = this.page.locator('#ui-id-5');

  menTopsItems = this.page.locator('#ui-id-17');
  menJackets = this.page.locator('#ui-id-19');
  menHoodiesSweatshirts = this.page.locator('#ui-id-20');
  menTees = this.page.locator('#ui-id-21');
  menTanks = this.page.locator('#ui-id-22');

  menBottomsItems = this.page.locator('#ui-id-18');
  menPants = this.page.locator('ui-id-23');
  menShorts = this.page.locator('ui-id-24');

  async clickWomenButton(): Promise<WomenPage> {
    await this.womenButton.click();
    return new WomenPage(this.page);
  }

  async clickMenButton(): Promise<MenPage> {
    await this.menButton.click();
    return new MenPage(this.page);
  }

  async clickHomePage(): Promise<HomePage> {
    await this.homePage.click();
    return new HomePage(this.page);
  }
}
