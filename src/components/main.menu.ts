import { HomePage } from '../pages/home.page';
import { MenPage } from '../pages/men.page';
import { WomenPage } from '../pages/women.page';
import { Page } from '@playwright/test';

export class MainMenu {
  constructor(private page: Page) {}

  womenButton = this.page.locator('#ui-id-4');
  menButton = this.page.locator('#ui-id-5');
  homePage = this.page.getByLabel('store logo');

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
