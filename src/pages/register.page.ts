import { Page } from '@playwright/test';

export class RegisterPage {
  constructor(private page: Page) {}

  url = '/customer/account/create/';

  async goto(): Promise<void> {
    await this.page.goto(this.url);
  }

  async title(): Promise<string> {
    return await this.page.title();
  }
}
