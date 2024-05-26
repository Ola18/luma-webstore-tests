import { BasePage } from './base.page';
import { HomePage } from './home.page';
import { Page } from '@playwright/test';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  email = this.page.getByLabel('Email', { exact: true });
  password = this.page.getByLabel('Password', { exact: true });
  signInButton = this.page.locator('#send2').first();

  signInErrorMessage = this.page.getByText('The account sign-in was incorrect');

  async signIn(email: string, password: string): Promise<HomePage> {
    await this.signInButton.click();
    await this.email.fill(email);
    await this.password.fill(password);
    await this.signInButton.click();
    return new HomePage(this.page);
  }
}
