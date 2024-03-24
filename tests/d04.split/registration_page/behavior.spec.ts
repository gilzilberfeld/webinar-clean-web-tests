import { test, expect } from "@playwright/test";
import { getEmailTextBox, getErrorMessage, getFirstNameTextBox, getLastNameTextBox, getRegisterButton, getTermsCheckBox } from "../locators";

test.beforeEach(async ({page}) => {
  await page.goto("/");
  await getTermsCheckBox(page).check();
})

test("enabling the disabled button", async ({ page }) => {
  await expect(getRegisterButton(page)).toBeEnabled();
});

test("disabling the enabled button", async ({ page }) => {
  await getTermsCheckBox(page).uncheck();
  await expect(getRegisterButton(page)).toBeDisabled();
});

test("validation error when all the fields are empty ", async ({ page }) => {
  await getRegisterButton(page).click();
  await expect(getErrorMessage(page)).toBeVisible();
  await getFirstNameTextBox(page).fill("a");
  await expect(getErrorMessage(page)).not.toBeVisible();
});

test("validation error when the first name is not empty ", async ({ page }) => {
  await getFirstNameTextBox(page).fill("a");
  await getRegisterButton(page).click();
  await expect(getErrorMessage(page)).toBeVisible();
  await getLastNameTextBox(page).fill("a");
  await expect(getErrorMessage(page)).not.toBeVisible();
});

test("validation error when the last name is not empty ", async ({ page }) => {
  await getLastNameTextBox(page).fill("a");
  await getRegisterButton(page).click();
  await expect(getErrorMessage(page)).toBeVisible();
  await getFirstNameTextBox(page).fill("a");
  await expect(getErrorMessage(page)).not.toBeVisible();
});

test("validation error when the email is not empty ", async ({ page }) => {
  await getEmailTextBox(page).fill("a");
  await getRegisterButton(page).click();
  await expect(getErrorMessage(page)).toBeVisible();
  await getFirstNameTextBox(page).fill("a");
  await expect(getErrorMessage(page)).not.toBeVisible();
});


test("validation error when wrong email pattern", async ({ page }) => {
  await getFirstNameTextBox(page).fill("a");
  await getLastNameTextBox(page).fill("a");
  await getEmailTextBox(page).fill("a");
  await getRegisterButton(page).click();
  await expect(getErrorMessage(page)).toBeVisible();
});

