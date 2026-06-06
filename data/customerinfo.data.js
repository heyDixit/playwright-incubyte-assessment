import { faker } from "@faker-js/faker";
export class CustomerInfo {
  constructor(
    firstName,
    lastName,
    address,
    city,
    state,
    zipCode,
    phoneNumber,
    ssn,
    username,
    password,
    confirmPassword,
    existingUsername,
    wrondPassword,
  ) {
    this.firstName = faker.person.firstName();
    this.lastName = faker.person.lastName();
    this.address = faker.location.streetAddress();
    this.city = faker.location.city();
    this.state = faker.location.state();
    this.zipCode = faker.location.zipCode();
    this.phoneNumber = faker.phone.number("##########");
    this.ssn =
      faker.string.numeric(3) +
      "-" +
      faker.string.numeric(2) +
      "-" +
      faker.string.numeric(4);
    this.username = faker.internet.username();
    this.password = faker.internet.password();
    this.confirmPassword = this.password;
    this.existingUsername = process.env.USER || "test.test";
    this.wrongPassword = faker.internet.password();
  }
}
