import { test } from "@playwright/test";
import { buttonShouldBeDisabled, buttonShouldBeEnabled, errorShouldBeVisible, shouldClearError } from "../asserts";
import { PageFactory } from "../page_objects/pagefactory";
import { RegisterPage } from "../page_objects/register_page_object";

let registerPage: RegisterPage;

test.beforeEach(async ({ page }) => {
  registerPage = await PageFactory.createRegistrationPage(page);
  await registerPage.checkTermsBox();
});

test("enabling the disabled button after checking the Terms box", async ({ page }) => {
  await buttonShouldBeEnabled(registerPage);
});

test("disabling the enabled button", async ({ page }) => {
  await registerPage.uncheckTermsBox();
  await buttonShouldBeDisabled(registerPage);
});

test("validation error when all the fields are empty ", async ({ page }) => {
  await registerPage.clickButton();
  await errorShouldBeVisible(registerPage);
  await registerPage.typeAnythingInFirstName();
  await shouldClearError(registerPage);
});

test("validation error when the first name is not empty ", async ({ page }) => {
  await registerPage.typeAnythingInFirstName();
  await registerPage.clickButton();
  await errorShouldBeVisible(registerPage);
  await registerPage.typeAnythingInLastName();
  await shouldClearError(registerPage);
});

test("validation error when the last name is not empty ", async ({ page }) => {
  await registerPage.typeAnythingInLastName();
  await registerPage.clickButton();
  await errorShouldBeVisible(registerPage);
  await registerPage.typeAnythingInFirstName();
  await shouldClearError(registerPage);
});

test("validation error when the email is not empty ", async ({ page }) => {
  await registerPage.typeAnythingInEmail();
  await registerPage.clickButton();
  await errorShouldBeVisible(registerPage);
  await registerPage.typeAnythingInLastName();
  await shouldClearError(registerPage);
});

test("validation error when wrong email pattern", async ({ page }) => {
  await registerPage.typeAnythingInFirstName();
  await registerPage.typeAnythingInLastName();
  await registerPage.typeAnythingInEmail();
  await registerPage.clickButton();
  await errorShouldBeVisible(registerPage);
});
