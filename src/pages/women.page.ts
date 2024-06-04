import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class WomenPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  url = '/women.html';

  async goToRandomCategory(): Promise<string> {
    const categories = [
      'Hoodies & Sweatshirts',
      'Jackets',
      // 'Tees',
      // 'Bras & Tanks',
      // 'Pants',
      // 'Shorts',
    ];
    const randomIndex = Math.floor(Math.random() * categories.length);
    const randomCategory = categories[randomIndex];
    await this.page
      .getByRole('link', { name: randomCategory, exact: true })
      .click();
    return randomCategory;
  }
}
