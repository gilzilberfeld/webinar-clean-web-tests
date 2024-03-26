import { test } from "@playwright/test";
import { PageFactory } from "../page_objects/pagefactory";
import { RegisterPage } from "../page_objects/register_page_object";

let registerPage: RegisterPage;

test.beforeEach(async ({ page }) => {
  registerPage = await PageFactory.createRegistrationPage(page);
  await registerPage.agreeToTerms();
});

test("enabling the disabled button after checking the Terms box", async () => {
  await registerPage.canSubmit();
});

test("disabling the enabled button", async () => {
  await registerPage.doNotAgreeToTerms();
  await registerPage.cannotSubmit();
});

test("validation error when all the fields are empty ", async () => {
  await registerPage.registerWithInvalidData();
  await registerPage.displaysError();

  await registerPage.typeAnythingInFirstName();
  await registerPage.hidesError();
});

test("validation error when the first name is not empty ", async () => {
  await registerPage.typeAnythingInFirstName();
  
  await registerPage.registerWithInvalidData();
  await registerPage.displaysError();

  await registerPage.typeAnythingInLastName();
  await registerPage.hidesError();
});

test("validation error when the last name is not empty ", async () => {
  await registerPage.typeAnythingInLastName();
  await registerPage.registerWithInvalidData();
  await registerPage.displaysError();

  await registerPage.typeAnythingInFirstName();
  await registerPage.hidesError();
});

test("validation error when the email is not empty ", async () => {
  await registerPage.typeAnythingInEmail();
  await registerPage.registerWithInvalidData();
  await registerPage.displaysError();

  await registerPage.typeAnythingInLastName();
  await registerPage.hidesError();
});

test("validation error when wrong email pattern", async () => {
  await registerPage.typeAnythingInFirstName();
  await registerPage.typeAnythingInLastName();
  await registerPage.typeAnythingInEmail();
  await registerPage.registerWithInvalidData();
  await registerPage.displaysError();
});
