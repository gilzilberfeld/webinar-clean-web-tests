import { test } from "@playwright/test";
import { checkTermsBox, clickRegister, typeAnythingInEmail, typeAnythingInFirstName, typeAnythingInLastName, uncheckTermsBox } from "../actions";
import { buttonShouldBeDisabled, buttonShouldBeEnabled, errorShouldBeVisible, shouldClearError } from "../asserts";

test.beforeEach(async ({page}) => {
  await page.goto("/");
  await checkTermsBox(page);
})

test("enabling the disabled button after checking the Terms box", async ({ page }) => {
  await buttonShouldBeEnabled(page);
});

test("disabling the enabled button", async ({ page }) => {
  await uncheckTermsBox(page);
  await buttonShouldBeDisabled(page);
});

test("validation error when all the fields are empty ", async ({ page }) => {
  await clickRegister(page);
  await errorShouldBeVisible(page);
  await typeAnythingInFirstName(page);
  await shouldClearError(page);
});

test("validation error when the first name is not empty ", async ({ page }) => {
  await typeAnythingInFirstName(page)
  await clickRegister(page)
  await errorShouldBeVisible(page)
  await typeAnythingInLastName(page);
  await shouldClearError(page);
});

test("validation error when the last name is not empty ", async ({ page }) => {
  await typeAnythingInLastName(page)
  await clickRegister(page)
  await errorShouldBeVisible(page)
  await typeAnythingInFirstName(page)
  await shouldClearError(page);
});

test("validation error when the email is not empty ", async ({ page }) => {
  await typeAnythingInEmail(page);
  await clickRegister(page)
  await errorShouldBeVisible(page)
  await typeAnythingInLastName(page)
  await shouldClearError(page)
});


test("validation error when wrong email pattern", async ({ page }) => {
  await typeAnythingInFirstName(page)
  await typeAnythingInLastName(page)
  await typeAnythingInEmail(page)
  await clickRegister(page)
  await errorShouldBeVisible(page)
});


