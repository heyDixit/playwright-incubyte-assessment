import { expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";
import { faker } from "@faker-js/faker";
import { HomePage } from "../pages/HomePage.js";
import { RegistrationPage } from "../pages/RegistrationPage.js";
import { AccountPage } from "../pages/AccountPage.js";
import { CustomerInfo } from "../data/customerinfo.data.js";

const { Given, When, Then } = createBdd();
const customerInfo = new CustomerInfo();
const testUsername = customerInfo.username;
const testPassword = customerInfo.password;

let homePage;
let registrationPage;
let accountPage;

Given("I am on the Parabank home page", async ({ page }) => {
  homePage = new HomePage(page);
  await homePage.navigate();
  const isLoaded = await homePage.isHomePageLoaded();
  await expect(isLoaded).toBe(true);
});

When("I click on the Register link", async ({ page }) => {
  await homePage.clickRegisterLink();
  registrationPage = new RegistrationPage(page);
});

When("I fill in the registration form with valid data", async ({ page }) => {
  await registrationPage.fillRegistrationForm(
    customerInfo.firstName,
    customerInfo.lastName,
    customerInfo.address,
    customerInfo.city,
    customerInfo.state,
    customerInfo.zipCode,
    customerInfo.phoneNumber,
    customerInfo.ssn,
    testUsername,
    testPassword,
    testPassword,
  );
});

When("I submit the registration form", async ({ page }) => {
  await registrationPage.submitRegistrationForm();
});

Then("I should see a success message", async ({ page }) => {
  const isSuccessful = await registrationPage.isSuccessMessageVisible();
  await expect(isSuccessful).toBe(true);
  await registrationPage.logout();
});

When("I log in with my new credentials", async ({ page }) => {
  await homePage.loginUser(testUsername, testPassword);
  accountPage = new AccountPage(page);
});

Then("I should be on the account overview page", async ({ page }) => {
  const isLoaded = await accountPage.isAccountOverviewPageLoaded();
  await expect(isLoaded).toBe(true);
});

Then("I print the account balance", async ({ page }) => {
  await accountPage.printAccountBalance();
});

When("I leave all registration fields empty", async ({ page }) => {
  // lEFT EMPTY AS THE FILLING OF THE FORM IS NOT REQUIRED
});

Then(
  "I should see validation errors for all required fields",
  async ({ page }) => {
    const hasErrors = await registrationPage.hasValidationErrors();
    expect(hasErrors).toBe(true);
  },
);

When(
  "I fill in the registration form with an existing username",
  async ({ page }) => {
    await registrationPage.fillRegistrationForm(
      customerInfo.firstName,
      customerInfo.lastName,
      customerInfo.address,
      customerInfo.city,
      customerInfo.state,
      customerInfo.zipCode,
      customerInfo.phoneNumber,
      customerInfo.ssn,
      customerInfo.existingUsername,
      customerInfo.password,
      customerInfo.confirmPassword,
    );
  },
);

Then(
  "I should see an error message indicating username already exists",
  async ({ page }) => {
    const hasError = await registrationPage.checkUsernameAlreadyExistsError();
    expect(hasError).toBe(true);
  },
);

When(
  "I fill in the registration form with mismatched passwords",
  async ({ page }) => {
    await registrationPage.fillRegistrationForm(
      customerInfo.firstName,
      customerInfo.lastName,
      customerInfo.address,
      customerInfo.city,
      customerInfo.state,
      customerInfo.zipCode,
      customerInfo.phoneNumber,
      customerInfo.ssn,
      customerInfo.username,
      customerInfo.password,
      customerInfo.wrongPassword,
    );
  },
);

Then(
  "I should see an error message indicating passwords do not match",
  async ({ page }) => {
    const hasError = await registrationPage.checkPasswordMismatchError();
    expect(hasError).toBe(true);
  },
);
