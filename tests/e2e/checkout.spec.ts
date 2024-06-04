import { MainMenu } from '../../src/components/main.menu';
import { generateShippingAddress } from '../../src/factories/shipping.address.factory';
import { CategoryItems } from '../../src/pages/category.items.page';
import { CheckoutShippingPage } from '../../src/pages/checkout.shipping.page';
import { HomePage } from '../../src/pages/home.page';
import { ItemPage } from '../../src/pages/item.page';
import { expect, test } from '@playwright/test';

test.describe('Verify main menu buttons', () => {
  let homePage: HomePage;
  let mainMenu: MainMenu;
  let categoryItems: CategoryItems;
  let itemPage: ItemPage;
  let checkoutPage: CheckoutShippingPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
    mainMenu = new MainMenu(page);
    categoryItems = new CategoryItems(page);
    itemPage = new ItemPage(page);
    checkoutPage = new CheckoutShippingPage(page);
  });

  test('positive proceed checkout with random women product', async () => {
    const womenPage = await test.step('go to women category', async () => {
      //Act
      const womenPage = await mainMenu.clickWomenButton();

      //Assert
      const title = await womenPage.title();
      expect(title).toContain('Women');
      return womenPage;
    });

    await test.step('go to random women category', async () => {
      //Act
      const categoryName = await womenPage.goToRandomCategory();

      //Assert
      await expect(categoryItems.categoryName).toHaveText(categoryName);
    });

    const itemName = await test.step('go to random item', async () => {
      //Act
      const itemName = await categoryItems.clickRandomItem();

      //Assert
      await expect(itemPage.itemName).toHaveText(itemName);

      return itemName;
    });

    const item = await test.step('add item to cart', async () => {
      //Arrange
      const addItemSuccessMessage = `You added ${itemName} to your shopping cart.`;

      await itemPage.waitForSizeLocator();
      const size = await itemPage.clickRandomSize();
      const color = await itemPage.clickRandomColor();

      //Assert
      await expect.soft(itemPage.checkedSize).toHaveText(size);
      await expect.soft(itemPage.checkedColor).toHaveText(color);

      const item = await itemPage.clickAddToCartButton();

      await expect
        .soft(itemPage.addedItemSuccessMessage)
        .toHaveText(addItemSuccessMessage);
      await expect(itemPage.cartQuantity).toHaveText('1');

      // await itemPage.refreshPage();
      await itemPage.goToCheckoutPage();
      return item;
    });

    const shippingAddressData =
      await test.step('positive checkout-shipping for non logged user', async () => {
        await checkoutPage.waitForPageToLoadUrl();
        const shippingAddressData = generateShippingAddress();

        await checkoutPage.fillShippingAddressForm(shippingAddressData);

        await expect(checkoutPage.itemName).toHaveText(item.name);
        await expect(checkoutPage.itemPrice).toHaveText(item.price);
        await expect(checkoutPage.itemSize).toHaveText(item.size);
        await expect(checkoutPage.itemColor).toHaveText(item.color);
        return shippingAddressData;
      });

    await test.step('positive checkout-payments for non logged user', async () => {
      const checkoutPaymnetPage = await checkoutPage.clickNextButton();
      checkoutPaymnetPage.waitForPageToLoadUrl();

      await checkoutPaymnetPage.shippingAddress.waitFor({ state: 'visible' });

      const shippingAddressText =
        await checkoutPaymnetPage.getShippingAddressText();
      const billingAddressText =
        await checkoutPaymnetPage.getBillingAddressText();
      const addressLines = `${shippingAddressData.firstName} ${shippingAddressData.lastName},${shippingAddressData.streetAddress},${shippingAddressData.city}, ${shippingAddressData.state} ${shippingAddressData.postalCode},${shippingAddressData.country},${shippingAddressData.phoneNumber}`;
      const successMessage = 'Thank you for your purchase!';

      //Assert order details
      await expect(checkoutPaymnetPage.itemName).toHaveText(item.name);
      await expect(checkoutPage.itemPrice).toHaveText(item.price);
      await expect(checkoutPage.itemSize).toHaveText(item.size);
      await expect(checkoutPage.itemColor).toHaveText(item.color);

      //Assert addresses
      await expect.soft(checkoutPaymnetPage.sameAddressCheckbox).toBeChecked();
      expect(shippingAddressText).toContain(addressLines);
      expect(billingAddressText).toContain(addressLines);

      const checkoutSucessPage =
        await checkoutPaymnetPage.clickPlaceOrderButton();

      await expect(checkoutSucessPage.thankYouMessage).toHaveText(
        successMessage,
      );
      await expect(checkoutSucessPage.orderNumber).toHaveText(/\d{9}/);
    });
  });
});
