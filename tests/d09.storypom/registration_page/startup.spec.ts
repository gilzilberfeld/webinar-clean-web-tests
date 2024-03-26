import { test } from "@playwright/test";
import { PageFactory } from "../page_objects/pagefactory";

test("on startup the form should be ready", async ({ page }) => {
  const registerPage = await PageFactory.createRegistrationPage(page);

  await registerPage.displaysTitle()
  await registerPage.inputsAreEmpty()

  await registerPage.promotionsRequested();
  await registerPage.termsNotAgreedTo();

  await registerPage.cannotSubmit()
});
