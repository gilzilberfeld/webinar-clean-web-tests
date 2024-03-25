import { Locator, Page } from "@playwright/test";
import { ANY_FIRST_NAME, THANK_YOU_PAGE } from "./consts";

const THANK_YOU_ERROR = "Who Are You?";
const THANK_YOU = "Thank you, ";

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

  async message(name: string): Promise<Locator> {
    const thankYouMessage = THANK_YOU + name +'!';
    return await this.page.getByText(thankYouMessage);
  }
  
}
