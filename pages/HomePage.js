import { BasePage } from "./BasePage.js";

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.url = "https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC";
    this.registerLink = 'a[href="register.htm"]';
    this.loginUsernameField = 'input[name="username"]';
    this.loginPasswordField = 'input[name="password"]';
    this.loginButton = 'button:has-text("Log In")';
  }

  async navigate() {
    await this.goto(this.url);
  }

  async clickRegisterLink() {
    await this.page.getByRole("link", { name: "Register" }).click();
  }

  async loginUser(username, password) {
    await this.page.locator(this.loginUsernameField).fill(username);
    await this.page.locator(this.loginPasswordField).fill(password);
    await this.page.getByRole("button", { name: "Log In" }).click();
  }

  async isHomePageLoaded() {
    return await this.page.title().then((title) => title.includes("ParaBank"));
  }
}
