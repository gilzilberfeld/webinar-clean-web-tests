import { Locator, Page } from "@playwright/test";
import { THANK_YOU_PAGE } from "./consts";

const THANK_YOU_ERROR = "Who Are You?";

export class ThankYouPage {
  page: Page;
  errorMessage: Locator;
  constructor(page: Page) {
    this.page = page;
  }

  async initialize() {
    await this.page.goto(THANK_YOU_PAGE);
    this.errorMessage = this.page.getByText(THANK_YOU_ERROR);
  }
}
