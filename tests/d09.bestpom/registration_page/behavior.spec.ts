import { test } from "@playwright/test";
import { PageFactory } from "../page_objects/pagefactory";
import { RegisterPage } from "../page_objects/register_page_object";

let registerPage: RegisterPage;

test.beforeEach(async ({ page }) => {
  registerPage = await PageFactory.createRegistrationPage(page);
  await registerPage.checkTermsBox();
});

test("enabling the disabled button after checking the Terms box", async () => {
  await registerPage.verifyButtonIsEnabled();
});

test("disabling the enabled button", async () => {
  await registerPage.uncheckTermsBox();
  await registerPage.verifyButtonIsDisabled();
});

test("validation error when all the fields are empty ", async () => {
  await registerPage.clickButton();
  await registerPage.verifyErrorIsVisible();

  await registerPage.typeAnythingInFirstName();
  await registerPage.verifyErrorIsHidden();
});

test("validation error when the first name is not empty ", async () => {
  await registerPage.typeAnythingInFirstName();
  await registerPage.clickButton();
  await registerPage.verifyErrorIsVisible();

  await registerPage.typeAnythingInLastName();
  await registerPage.verifyErrorIsHidden();
});

test("validation error when the last name is not empty ", async () => {
  await registerPage.typeAnythingInLastName();
  await registerPage.clickButton();
  await registerPage.verifyErrorIsVisible();

  await registerPage.typeAnythingInFirstName();
  await registerPage.verifyErrorIsHidden();
});

test("validation error when the email is not empty ", async () => {
  await registerPage.typeAnythingInEmail();
  await registerPage.clickButton();
  await registerPage.verifyErrorIsVisible();

  await registerPage.typeAnythingInLastName();
  await registerPage.verifyErrorIsHidden();
});

test("validation error when wrong email pattern", async () => {
  await registerPage.typeAnythingInFirstName();
  await registerPage.typeAnythingInLastName();
  await registerPage.typeAnythingInEmail();
  await registerPage.clickButton();
  await registerPage.verifyErrorIsVisible();
});
