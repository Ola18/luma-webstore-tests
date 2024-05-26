import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class MenPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  url = '/men.html';
}
