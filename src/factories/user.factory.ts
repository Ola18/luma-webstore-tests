import { User } from '../model/user.model';
import { faker } from '@faker-js/faker';

export function createUserData(): User {
  const userData: User = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: '',
    password: faker.internet.password(),
  };

  userData.email = faker.internet.email({
    firstName: userData.firstName,
    lastName: userData.lastName,
  });

  return userData;
}
