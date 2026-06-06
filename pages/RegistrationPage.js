import { BasePage } from "./BasePage.js";

export class RegistrationPage extends BasePage {
  constructor(page) {
    super(page);
    this.firstNameField = '[id="customer.firstName"]';
    this.lastNameField = '[id="customer.lastName"]';
    this.addressField = '[id="customer.address.street"]';
    this.cityField = '[id="customer.address.city"]';
    this.stateField = '[id="customer.address.state"]';
    this.zipCodeField = '[id="customer.address.zipCode"]';
    this.phoneField = '[id="customer.phoneNumber"]';
    this.ssnField = '[id="customer.ssn"]';
    this.usernameField = '[id="customer.username"]';
    this.passwordField = '[id="customer.password"]';
    this.repeatedPasswordField = "#repeatedPassword";
    this.registerButton = 'button:has-text("Register")';
    this.successMessage = "text=Your account was created";
    this.logoutLink = 'a[href="logout.htm"]';
  }

  async fillRegistrationForm(
    firstName,
    lastName,
    address,
    city,
    state,
    zipCode,
    phone,
    ssn,
    username,
    password,
  ) {
    await this.page.locator(this.firstNameField).fill(firstName);
    await this.page.locator(this.lastNameField).fill(lastName);
    await this.page.locator(this.addressField).fill(address);
    await this.page.locator(this.cityField).fill(city);
    await this.page.locator(this.stateField).fill(state);
    await this.page.locator(this.zipCodeField).fill(zipCode);
    await this.page.locator(this.phoneField).fill(phone);
    await this.page.locator(this.ssnField).fill(ssn);
    await this.page.locator(this.usernameField).fill(username);
    await this.page.locator(this.passwordField).fill(password);
    await this.page.locator(this.repeatedPasswordField).fill(password);
  }

  async submitRegistrationForm() {
    await this.page.getByRole("button", { name: "Register" }).click();
  }

  async isSuccessMessageVisible() {
    return await this.page.getByText("Your account was created").isVisible();
  }

  async logout() {
    await this.page.locator(this.logoutLink).click();
  }
}
