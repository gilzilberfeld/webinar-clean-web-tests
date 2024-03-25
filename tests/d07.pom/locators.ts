import { Page, Locator } from "@playwright/test";
import { ANY_FIRST_NAME } from "./consts";

const VALIDATION_MESSAGE = "Please make sure all fields are filled correctly.";
const THANK_YOU = "Thank you, ";
const THANK_YOU_ERROR = "Who Are You?";

export function getErrorMessage(page: Page): Locator {
  return page.getByText(VALIDATION_MESSAGE);
}
export function getThankYouMessage(page: Page): Locator {
  const thankYouMessage = THANK_YOU + ANY_FIRST_NAME +'!';
  return page.getByText(thankYouMessage);
}
export function getThankYouErrorMessage(page: Page): Locator {
  return page.getByText(THANK_YOU_ERROR);
}
