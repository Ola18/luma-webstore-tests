import { TopMenu } from '../components/top.menu';
import { BasePage } from './base.page';
import { LoginPage } from './login.page';
import { RegisterPage } from './register.page';
import { Page } from '@playwright/test';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  url = '/';
  topmenu = new TopMenu(this.page);

  async clickSignInButton(): Promise<LoginPage> {
    await this.topmenu.signInButton.click();
    return new LoginPage(this.page);
  }

  async clickRegisterButton(): Promise<RegisterPage> {
    await this.topmenu.registerButton.click();
    return new RegisterPage(this.page);
  }
}
