import { test } from "@playwright/test";
import { checkTermsBox, clickRegister, fillEmail, fillFirstName, fillLastName } from "../actions";
import { lastSavedEntryShouldInclude, shouldDisplayThankYouWithName } from "../asserts";
import { ANY_FIRST_NAME, ANY_LAST_NAME, ANY_VALID_EMAIL, REGISTRATION_PAGE } from "../consts";

test("register process with valid data stores data correctly", async ({ page }) => {
  await page.goto(REGISTRATION_PAGE);
  await checkTermsBox(page);

  await fillFirstName(page, ANY_FIRST_NAME);
  await fillLastName(page, ANY_LAST_NAME);
  await fillEmail(page, ANY_VALID_EMAIL);

  await clickRegister(page);
  await shouldDisplayThankYouWithName(page);

  await lastSavedEntryShouldInclude({ firstName: ANY_FIRST_NAME, lastName: ANY_LAST_NAME, email: ANY_VALID_EMAIL }, true);
});
