import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto(
    "https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC",
  );
  await page.locator('input[name="username"]').fill(process.env.USER!);
  await page.locator('input[name="password"]').fill(process.env.PASSWORD!);
  await page.getByRole("button", { name: "Log In" }).click();
  await expect(page.getByText("Welcome John Doe")).toBeVisible();
});
