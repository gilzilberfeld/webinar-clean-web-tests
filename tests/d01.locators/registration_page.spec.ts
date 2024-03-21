import { test, expect, request } from "@playwright/test";
import { getTitle } from "./locators";
import { getFirstNameTextBox } from "./locators";
import { getLastNameTextBox } from "./locators";
import { getEmailTextBox } from "./locators";
import { getPromotionsCheckBox } from "./locators";
import { getTermsCheckBox } from "./locators";
import { getRegisterButton } from "./locators";
import { getErrorMessage } from "./locators";
import { getThankYouMessage } from "./locators";
import { getThankYouErrorMessage } from "./locators";

test("startup", async ({ page }) => {
  await page.goto("/");
  // Title is there
  await expect(getTitle(page)).toBeVisible();
  // Boxes are empty
  await expect(getFirstNameTextBox(page)).toBeEmpty();
  await expect(getLastNameTextBox(page)).toBeEmpty();
  await expect(getEmailTextBox(page)).toBeEmpty();
  // Checkboxes checked correctly
  await expect(getPromotionsCheckBox(page)).toBeChecked();
  await expect(getTermsCheckBox(page)).not.toBeChecked();
  // button is disabled
  await expect(getRegisterButton(page)).toBeDisabled();
});


test("validation", async ({ page }) => {
  await page.goto("/");
  await getTermsCheckBox(page).check();
  await expect(getRegisterButton(page)).toBeEnabled();
  await getRegisterButton(page).click();
  await expect(getErrorMessage(page)).toBeVisible();
  
  // just first name empty
  await getFirstNameTextBox(page).fill("a");
  await expect(getErrorMessage(page)).not.toBeVisible();
  await getLastNameTextBox(page).clear();
  await getEmailTextBox(page).clear();
  await getRegisterButton(page).click();
  await expect(getErrorMessage(page)).toBeVisible();
  
  //just last name empty
  await getFirstNameTextBox(page).clear()
  await getLastNameTextBox(page).fill("a")
  await expect(getErrorMessage(page)).not.toBeVisible();
  await getEmailTextBox(page).clear();
  await getRegisterButton(page).click();
  await expect(getErrorMessage(page)).toBeVisible();
  
  // just email empty
  await getFirstNameTextBox(page).clear()
  await getLastNameTextBox(page).clear()
  await getEmailTextBox(page).fill("a");
  await expect(getErrorMessage(page)).not.toBeVisible();
  await getRegisterButton(page).click();
  await expect(getErrorMessage(page)).toBeVisible();
  
  // wrong email
  await getFirstNameTextBox(page).fill("a")
  await expect(getErrorMessage(page)).not.toBeVisible();
  await getLastNameTextBox(page).fill("a")
  await getEmailTextBox(page).fill("a");
  await getRegisterButton(page).click();
  await expect(getErrorMessage(page)).toBeVisible();
  
});

test("enabling and disabling the button", async ({ page }) => {
    await page.goto("/");
    // loads disabled
    await expect(getRegisterButton(page)).toBeDisabled();
    // click once enables
    await getTermsCheckBox(page).check();
    await expect(getRegisterButton(page)).toBeEnabled();
    // click twice disables
    await getTermsCheckBox(page).uncheck();
    await expect(getRegisterButton(page)).toBeDisabled();
});

test("register process with valid data stores data correctly", async ({ page }) => {
  // reset database
  await page.goto("/");
  await getTermsCheckBox(page).check();
  await getFirstNameTextBox(page).fill("gil");
  await getLastNameTextBox(page).fill("zilberfeld");
  await getEmailTextBox(page).fill("gil@testingil.com");
  await getRegisterButton(page).click();
  await expect(getThankYouMessage(page)).toBeVisible();

  const apiRequestContext = await request.newContext();
  const response = await apiRequestContext.get("/api/all");
  const json = await response.json();

  const expectedEntry = { info: { firstName: "gil", lastName: "zilberfeld", email: "gil@testingil.com" }, promotions: true };
  expect(json.registrants[json.registrants.length - 1]).toStrictEqual(expectedEntry);
});

test("direct thank you page shows error", async ({ page }) => {
    await page.goto("/thankyou");
    await expect(getThankYouErrorMessage(page)).toBeVisible();
  });


