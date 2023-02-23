import { Page } from "@playwright/test";

export class BasePage {
  BASE_URL = "https://alunacare.com/";

  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goToUrl(url: string) {
    await this.page.goto(url);
  }

}