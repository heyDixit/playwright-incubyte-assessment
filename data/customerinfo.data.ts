import { CustomerInfo } from "./customerinfo.type";
import { faker } from "@faker-js/faker";
export function getCustomerInfo(): CustomerInfo {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    address: faker.location.street(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    phoneNumber: faker.number
      .int({ min: 1000000000, max: 9999999999 })
      .toString(),
    ssn: faker.number.int({ min: 1000000000, max: 9999999999 }).toString(),
    username: faker.internet.username(),
    password: faker.internet.password(),
  };
}
