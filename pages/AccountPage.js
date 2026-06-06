import { BasePage } from "./BasePage.js";

export class AccountPage extends BasePage {
  constructor(page) {
    super(page);
    this.welcomeMessage = "text=Welcome";
    this.accountBalanceLocator = "td b";
  }

  async isAccountOverviewPageLoaded() {
    return await this.page.getByText("Welcome").isVisible();
  }

  async getAccountBalance() {
    return await this.page
      .locator(this.accountBalanceLocator)
      .nth(1)
      .textContent();
  }

  async printAccountBalance() {
    const balance = await this.getAccountBalance();
    console.log("Account Balance:", balance);
    return balance;
  }
}
