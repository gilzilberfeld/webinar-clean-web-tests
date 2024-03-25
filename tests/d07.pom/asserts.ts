import { expect, request } from "@playwright/test";
import { ANY_FIRST_NAME, API_GET_ALL } from "./consts";
import { RegisterPage } from "./register_page_object";
import { ThankYouPage } from "./thank_you_page";

export async function shouldClearError(page: RegisterPage) {
  return expect(await page.errorMsg()).not.toBeVisible();
}
export async function errorShouldBeVisible(page: RegisterPage) {
  return expect(await page.errorMsg()).toBeVisible();
}
export function buttonShouldBeDisabled(page: RegisterPage) {
  return expect(page.registerButton).toBeDisabled();
}
export function buttonShouldBeEnabled(page: RegisterPage) {
  return expect(page.registerButton).toBeEnabled();
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
export function shouldDisplayThankYouError(page: ThankYouPage) {
  return expect(page.errorMessage).toBeVisible();
}
export async function lastSavedEntryShouldInclude(info: any, promotions: boolean) {
  const apiRequestContext = await request.newContext();
  const response = await apiRequestContext.get(API_GET_ALL);
  const json = await response.json();

  const expectedEntry = { info, promotions };
  expect(json.registrants[json.registrants.length - 1]).toStrictEqual(expectedEntry);
}
export async function shouldDisplayThankYouWithName(page: ThankYouPage) {
  return expect(await page.message(ANY_FIRST_NAME)).toBeVisible();
}
