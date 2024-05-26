import { BasePage } from './base.page';
import { LoginPage } from './login.page';
import { Page } from '@playwright/test';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  url = '/';
  signInButton = this.page.getByRole('link', { name: 'Sign in' });
  welcomeLabel = this.page.locator('.logged-in').first();

  async clickSignInButton(): Promise<LoginPage> {
    await this.signInButton.click();
    return new LoginPage(this.page);
  }
}
