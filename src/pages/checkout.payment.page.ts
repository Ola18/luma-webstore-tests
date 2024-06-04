import { BasePage } from './base.page';
import { CheckoutSuccessPage } from './checkout.success.page';
import { Page } from '@playwright/test';

export class CheckoutPaymentPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  url = '/checkout/#payment';
  itemName = this.page.locator('.product-item-name');
  itemPrice = this.page.locator('.subtotal');
  itemSize = this.page.locator('.values').first();
  itemColor = this.page.locator('.values').last();

  billingAddress = this.page.locator('.billing-address-details');
  shippingAddress = this.page.locator('.ship-to .shipping-information-content');
  sameAddressCheckbox = this.page.getByLabel('My billing and shipping');

  placeOrderButton = this.page.getByRole('button', { name: 'Place Order' });

  async clickNextButton(): Promise<void> {
    await this.placeOrderButton.click();
  }

  async getBillingAddressText(): Promise<string> {
    const addressText = (await this.billingAddress.innerText()).split('\n');
    addressText.pop();
    return addressText.join(',');
  }

  async getShippingAddressText(): Promise<string> {
    const address = (await this.shippingAddress.innerText()).split('\n');
    address.pop();
    return address.join(',');
  }

  async clickPlaceOrderButton(): Promise<CheckoutSuccessPage> {
    await this.placeOrderButton.click();
    return new CheckoutSuccessPage(this.page);
  }
}
