import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class CheckoutSuccessPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  orderNumber = this.page.getByText('Your order # is:');
  thankYouMessage = this.page.getByText('Thank you for your purchase!');
}
