import { test } from "@playwright/test";
import { allInputsShouldBeEmpty, buttonShouldBeDisabled, promotionsBoxShouldBeChecked, shouldSeeTitle, termsBoxShouldBeUnchecked } from "../asserts";
import { REGISTRATION_PAGE } from "../consts";

test("on startup the form should be ready", async ({ page }) => {
  await page.goto(REGISTRATION_PAGE);
  await shouldSeeTitle(page);
  await allInputsShouldBeEmpty(page);
  
  await promotionsBoxShouldBeChecked(page);
  await termsBoxShouldBeUnchecked(page);
  
  await buttonShouldBeDisabled(page)
});


