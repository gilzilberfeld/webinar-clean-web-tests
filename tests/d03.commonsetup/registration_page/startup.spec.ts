import { test, expect } from "@playwright/test";
import { getEmailTextBox, getFirstNameTextBox, getLastNameTextBox, getPromotionsCheckBox, getRegisterButton, getTermsCheckBox, getTitle } from "../locators";

test("on startup the form should be ready", async ({ page }) => {
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
