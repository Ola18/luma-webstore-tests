import { ShippingAddress } from '../model/shipping.address.model';
import { BasePage } from './base.page';
import { CheckoutPaymentPage } from './checkout.payment.page';
import { Page } from '@playwright/test';

export class CheckoutShippingPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  url = '/checkout/#shipping';
  itemName = this.page.locator('.product-item-name');
  itemPrice = this.page.locator('.subtotal');
  itemSize = this.page.locator('.values').first();
  itemColor = this.page.locator('.values').last();

  emailInput = this.page.getByRole('textbox', {
    name: 'Email Address * Email Address*',
  });
  firstNameInput = this.page.getByLabel('First Name');
  lastNameInput = this.page.getByLabel('Last Name');
  streetInput = this.page.getByLabel('Street Address: Line 1');
  cityInput = this.page.getByLabel('City');
  stateSelect = this.page.locator('select[name="region_id"]');
  postalCodeInput = this.page.getByLabel('Zip/Postal Code');
  countrySelect = this.page.getByLabel('Country');
  phoneNumberInput = this.page.getByLabel('Phone Number');
  shippingMethod = this.page.getByLabel('Table Rate');

  nextButton = this.page.getByRole('button', { name: 'Next' });

  async fillShippingAddressForm(
    shippingAddress: ShippingAddress,
  ): Promise<void> {
    await this.emailInput.fill(shippingAddress.email);
    await this.firstNameInput.fill(shippingAddress.firstName);
    await this.lastNameInput.fill(shippingAddress.lastName);
    await this.countrySelect.selectOption(shippingAddress.country);
    await this.streetInput.fill(shippingAddress.streetAddress);
    await this.cityInput.fill(shippingAddress.city);
    await this.stateSelect.selectOption(shippingAddress.state);
    await this.postalCodeInput.fill(shippingAddress.postalCode);
    await this.phoneNumberInput.fill(shippingAddress.phoneNumber);
    await this.shippingMethod.click();
  }

  async clickNextButton(): Promise<CheckoutPaymentPage> {
    await this.nextButton.click();
    return new CheckoutPaymentPage(this.page);
  }
}
