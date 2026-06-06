import { expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";
import { faker } from "@faker-js/faker";
import { HomePage } from "../pages/HomePage.js";
import { RegistrationPage } from "../pages/RegistrationPage.js";
import { AccountPage } from "../pages/AccountPage.js";

const { Given, When, Then } = createBdd();
const testUsername = faker.internet.username();

let homePage;
let registrationPage;
let accountPage;

Given("I am on the Parabank home page", async ({ page }) => {
  homePage = new HomePage(page);
  await homePage.navigate();
  const isLoaded = await homePage.isHomePageLoaded();
  expect(isLoaded).toBe(true);
});

When("I click on the Register link", async ({ page }) => {
  await homePage.clickRegisterLink();
  registrationPage = new RegistrationPage(page);
});

When("I fill in the registration form with valid data", async ({ page }) => {
  await registrationPage.fillRegistrationForm(
    "John",
    "Doe",
    "abc",
    "def",
    "ghi",
    "111111",
    "9999999999",
    "123-45-6789",
    testUsername,
    "Password13133123!",
  );
});

When("I submit the registration form", async ({ page }) => {
  await registrationPage.submitRegistrationForm();
});

Then("I should see a success message", async ({ page }) => {
  const isSuccessful = await registrationPage.isSuccessMessageVisible();
  expect(isSuccessful).toBe(true);
  await registrationPage.logout();
});

When("I log in with my new credentials", async ({ page }) => {
  await homePage.loginUser(testUsername, "Password13133123!");
  accountPage = new AccountPage(page);
});

Then("I should be on the account overview page", async ({ page }) => {
  const isLoaded = await accountPage.isAccountOverviewPageLoaded();
  expect(isLoaded).toBe(true);
});

Then("I print the account balance", async ({ page }) => {
  await accountPage.printAccountBalance();
});

When("I leave all registration fields empty", async ({ page }) => {
  // Just proceed without filling any fields
});

Then(
  "I should see validation errors for all required fields",
  async ({ page }) => {
    const errorMessages = page.locator(
      '.error, .validation-error, [role="alert"]',
    );
    const count = await errorMessages.count();
    expect(count).toBeGreaterThan(0);
  },
);

When(
  "I fill in the registration form with an existing username",
  async ({ page }) => {
    await page.locator('[id="customer.firstName"]').fill("John");
    await page.locator('[id="customer.lastName"]').fill("Doe");
    await page.locator('[id="customer.address.street"]').fill("abc");
    await page.locator('[id="customer.address.city"]').fill("def");
    await page.locator('[id="customer.address.state"]').fill("ghi");
    await page.locator('[id="customer.address.zipCode"]').fill("111111");
    await page.locator('[id="customer.phoneNumber"]').fill("9999999999");
    await page.locator('[id="customer.ssn"]').fill("123-45-6789");
    await page.locator('[id="customer.username"]').fill("test.test");
    await page.locator('[id="customer.password"]').fill("Password13133123!");
    await page.locator("#repeatedPassword").fill("Password13133123!");
  },
);

Then(
  "I should see an error message indicating username already exists",
  async ({ page }) => {
    await expect(page.locator('[id="customer.username.errors"]')).toContainText(
      "This username already exists.",
    );
  },
);

When(
  "I fill in the registration form with mismatched passwords",
  async ({ page }) => {
    await page.locator('[id="customer.firstName"]').fill("John");
    await page.locator('[id="customer.lastName"]').fill("Doe");
    await page.locator('[id="customer.address.street"]').fill("abc");
    await page.locator('[id="customer.address.city"]').fill("def");
    await page.locator('[id="customer.address.state"]').fill("ghi");
    await page.locator('[id="customer.address.zipCode"]').fill("111111");
    await page.locator('[id="customer.phoneNumber"]').fill("9999999999");
    await page.locator('[id="customer.ssn"]').fill("123-45-6789");
    await page.locator('[id="customer.username"]').fill("newuser123");
    await page.locator('[id="customer.password"]').fill("Password13133123!");
    await page.locator("#repeatedPassword").fill("DifferentPassword!");
  },
);

Then(
  "I should see an error message indicating passwords do not match",
  async ({ page }) => {
    await expect(page.locator('[id="repeatedPassword.errors"]')).toContainText(
      "Passwords did not match.",
    );
  },
);
