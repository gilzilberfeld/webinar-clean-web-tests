import { Page, Locator } from "@playwright/test";
import { ANY_FIRST_NAME } from "./consts";

const THANK_YOU = "Thank you, ";

export function getThankYouMessage(page: Page): Locator {
  const thankYouMessage = THANK_YOU + ANY_FIRST_NAME +'!';
  return page.getByText(thankYouMessage);
}

