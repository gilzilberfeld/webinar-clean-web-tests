import { test } from "@playwright/test";
import { lastSavedEntryShouldInclude, shouldDisplayThankYouWithName } from "../asserts";
import { ANY_FIRST_NAME, ANY_LAST_NAME, ANY_VALID_EMAIL as VALID_EMAIL } from "../consts";
import { PageFactory } from "../page_objects/pagefactory";

test("register process with valid data stores data correctly", async ({ page }) => {
  const registerPage = await PageFactory.createRegistrationPage(page);
  await registerPage.checkTermsBox();

  await registerPage.typeInFirstName(ANY_FIRST_NAME)
  await registerPage.typeInLastName(ANY_LAST_NAME)
  await registerPage.typeEmail(VALID_EMAIL)

  const thankYou = await registerPage.submit()
  await shouldDisplayThankYouWithName(thankYou);

  await lastSavedEntryShouldInclude({ firstName: ANY_FIRST_NAME, lastName: ANY_LAST_NAME, email: VALID_EMAIL }, true);
});
