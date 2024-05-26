import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class WomenPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  url = '/women.html';
}
