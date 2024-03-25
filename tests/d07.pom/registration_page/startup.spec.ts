import { test } from "@playwright/test";
import { allInputsShouldBeEmpty, buttonShouldBeDisabled, promotionsBoxShouldBeChecked, shouldSeeTitle, termsBoxShouldBeUnchecked } from "../asserts";
import { PageFactory } from "../page_objects/pagefactory";

test("on startup the form should be ready", async ({ page }) => {
  const registerPage = await PageFactory.createRegistrationPage(page);

  await shouldSeeTitle(registerPage);
  await allInputsShouldBeEmpty(registerPage);

  await promotionsBoxShouldBeChecked(registerPage);
  await termsBoxShouldBeUnchecked(registerPage);

  await buttonShouldBeDisabled(registerPage)
});
