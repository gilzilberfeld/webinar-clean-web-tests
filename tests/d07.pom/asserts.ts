import { Page, expect, request } from "@playwright/test";
import {
  getErrorMessage,
  getRegisterButton,
  getThankYouErrorMessage,
  getThankYouMessage,
  // getTitle,
} from "./locators";
import { API_GET_ALL } from "./consts";
import { RegisterPage } from "./register_page_object";

export function shouldClearError(page: Page) {
  return expect(getErrorMessage(page)).not.toBeVisible();
}
export function errorShouldBeVisible(page: Page) {
  return expect(getErrorMessage(page)).toBeVisible();
}
export function buttonShouldBeDisabled(page: RegisterPage) {
  return expect(page.registerButton).toBeDisabled();
}
export function buttonShouldBeEnabled(page: Page) {
  return expect(getRegisterButton(page)).toBeEnabled();
}
export function promotionsBoxShouldBeChecked(page: RegisterPage) {
  return expect(page.promotionCheckBox).toBeChecked();
}
export async function allInputsShouldBeEmpty(page: RegisterPage) {
  await expect(page.firstNameBox).toBeEmpty();
  await expect(page.lastNameBox).toBeEmpty();
  await expect(page.emailBox).toBeEmpty();
}
export function shouldSeeTitle(page: RegisterPage) {
  return expect(page.title).toBeVisible();
}
export function termsBoxShouldBeUnchecked(page: RegisterPage) {
  return expect(page.termsCheckBox).not.toBeChecked();
}
export function shouldDisplayThankYouError(page: Page) {
  return expect(getThankYouErrorMessage(page)).toBeVisible();
}
export async function lastSavedEntryShouldInclude(info: any, promotions: boolean) {
  const apiRequestContext = await request.newContext();
  const response = await apiRequestContext.get(API_GET_ALL);
  const json = await response.json();

  const expectedEntry = { info, promotions };
  expect(json.registrants[json.registrants.length - 1]).toStrictEqual(expectedEntry);
}
export function shouldDisplayThankYouWithName(page: Page) {
  return expect(getThankYouMessage(page)).toBeVisible();
}
