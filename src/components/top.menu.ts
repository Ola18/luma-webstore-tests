import { Page } from '@playwright/test';

export class TopMenu {
  constructor(private page: Page) {}

  signInButton = this.page.getByRole('link', { name: 'Sign in' });
  registerButton = this.page.getByRole('link', { name: 'Create an Account' });
  welcomeLabel = this.page.locator('.logged-in').first();
}
