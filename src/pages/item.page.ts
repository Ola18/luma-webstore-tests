import { Item } from '../model/item.model';
import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class ItemPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  itemName = this.page.locator('.page-title');
  availableSizes = this.page.locator('.swatch-option.text');
  availableColors = this.page.locator('.swatch-option.color');
  checkedSize = this.page.locator('.swatch-option.text.selected');
  checkedColor = this.page.locator('.swatch-option.color.selected');
  itemPrice = this.page.locator(
    '.product-info-price span[id^="product-price-"] span',
  );
  addToCartButton = this.page.getByRole('button', { name: 'Add to Cart' });
  addedItemSuccessMessage = this.page.locator(
    '.message-success.success.message',
  );
  cartIcon = this.page.locator('.action.showcart');
  cartQuantity = this.page.locator('.counter-number');
  proceedToCheckoutButton = this.page.locator('#top-cart-btn-checkout');

  async waitForSizeLocator(): Promise<void> {
    await this.availableSizes.first().waitFor({ state: 'visible' });
  }

  async clickRandomSize(): Promise<string> {
    const sizesCount = await this.availableSizes.count();
    const randomIndex = Math.floor(Math.random() * sizesCount);
    const randomSize = this.availableSizes.nth(randomIndex);
    await randomSize.click();
    return randomSize.innerText();
  }

  async clickRandomColor(): Promise<string> {
    const colorsCount = await this.availableColors.count();
    const randomIndex = Math.floor(Math.random() * colorsCount);
    const randomColor = this.availableColors.nth(randomIndex);
    await randomColor.click();
    return randomColor.innerText();
  }

  async clickAddToCartButton(): Promise<Item> {
    await this.addToCartButton.click();
    const item: Item = {
      name: await this.itemName.innerText(),
      price: await this.itemPrice.innerText(),
      size: await this.checkedSize.innerText(),
      color: await this.checkedColor.getAttribute('option-label'),
    };
    return item;
  }

  async goToCheckoutPage(): Promise<void> {
    await this.cartIcon.click();
    await this.proceedToCheckoutButton.click();
  }
}
