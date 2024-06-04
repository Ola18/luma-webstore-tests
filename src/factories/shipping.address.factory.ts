import { ShippingAddress } from '../model/shipping.address.model';
import { faker } from '@faker-js/faker/locale/en_US';

export function generateShippingAddress(): ShippingAddress {
  const shippingAddress: ShippingAddress = {
    email: '',
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    streetAddress: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    postalCode: faker.location.zipCode(),
    country: 'United States',
    phoneNumber: faker.phone.number(),
  };
  shippingAddress.email = faker.internet
    .email({
      firstName: shippingAddress.firstName,
      lastName: shippingAddress.lastName,
    })
    .toLocaleLowerCase();
  return shippingAddress;
}
