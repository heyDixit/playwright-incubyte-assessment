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
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.city = city;
    this.state = state;
    this.zipCode = zipCode;
    this.phoneNumber = phoneNumber;
    this.ssn = ssn;
    this.username = username;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.existingUsername = existingUsername;
  }
}
