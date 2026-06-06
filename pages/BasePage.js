export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto(url) {
    await this.page.goto(url);
  }

  async click(selector) {
    await this.page.locator(selector).click();
  }

  async fill(selector, text) {
    await this.page.locator(selector).fill(text);
  }

  async getText(selector) {
    return await this.page.locator(selector).textContent();
  }

  async isVisible(selector) {
    return await this.page.locator(selector).isVisible();
  }

  async waitForNavigation() {
    await this.page.waitForNavigation();
  }
}
