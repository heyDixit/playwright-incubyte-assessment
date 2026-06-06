import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto(
    "https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC",
  );
  await page.getByRole("link", { name: "Register" }).click();
  await page.locator('[id="customer.firstName"]').click();
  await page.locator('[id="customer.firstName"]').fill("John");
  await page.locator('[id="customer.lastName"]').fill("Doe");
  await page.locator('[id="customer.address.street"]').fill("abc");
  await page.locator('[id="customer.address.city"]').fill("def");
  await page.locator('[id="customer.address.state"]').fill("ghi");
  await page.locator('[id="customer.address.zipCode"]').fill("111111");
  await page.locator('[id="customer.phoneNumber"]').fill("9999999999");
  await page.locator('[id="customer.ssn"]').fill("23456");
  await page.locator('[id="customer.username"]').fill("john.dose");
  await page.locator('[id="customer.password"]').fill("Qwerty123");
  await page.locator("#repeatedPassword").fill("Qwerty123");
  await page.getByRole("button", { name: "Register" }).click();
  await expect(page.getByText("Your account was created")).toBeVisible();
});
