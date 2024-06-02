import { User } from '../model/user.model';
import { faker } from '@faker-js/faker/locale/en_GB';

export function createUserData(): User {
  const userData: User = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: '',
    password: faker.internet.password({
      length: 8,
      pattern: /[A-Za-z0-9]/,
    }),
  };

  userData.email = faker.internet.email({
    firstName: userData.firstName,
    lastName: userData.lastName,
  });

  return userData;
}
