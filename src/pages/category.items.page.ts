import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class CategoryItems extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  categoryName = this.page.locator('#page-title-heading');
  items = this.page.locator('.item.product.product-item');

  async clickRandomItem(): Promise<string> {
    const itemsCount = await this.items.count();
    const randomIndex = Math.floor(Math.random() * itemsCount);
    const randomItem = this.items.nth(randomIndex);
    const itemName = randomItem.locator('.product-item-name').innerText();
    await randomItem.click();
    return itemName;
  }
}
