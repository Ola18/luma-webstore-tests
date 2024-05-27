import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class Account extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  uel = '/customer/account/';
  succesRegistrationMsg = this.page.locator('.message-success.success.message');
  userData = this.page.locator('.box.box-information .box-content');

  
}
