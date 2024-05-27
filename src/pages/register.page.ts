import { User } from '../model/user.model';
import { Account } from './account.page';
import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class RegisterPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  url = '/customer/account/create/';
  userFirstNameInput = this.page.getByLabel('First Name');
  userLastNameInput = this.page.getByLabel('Last Name');
  userEmailInput = this.page.getByLabel('Email', { exact: true });
  userPasswordInput = this.page.getByRole('textbox', {
    name: 'Password*',
    exact: true,
  });
  userConfirmPasswordInput = this.page.getByLabel('Confirm Password');
  registerButton = this.page.getByRole('button', { name: 'Create an Account' });

  async registerUser(user: User): Promise<Account> {
    await this.userFirstNameInput.fill(user.firstName);
    await this.userLastNameInput.fill(user.lastName);
    await this.userEmailInput.fill(user.email);
    await this.userPasswordInput.fill(user.password);
    await this.userConfirmPasswordInput.fill(user.password);
    await this.registerButton.click();
    return new Account(this.page);
  }
}
