import { test } from "@playwright/test";
import { PageFactory } from "../page_objects/pagefactory";

test("on startup the form should be ready", async ({ page }) => {
  const registerPage = await PageFactory.createRegistrationPage(page);

  await registerPage.verifyTitleIsVisible()
  await registerPage.verifyAllInputsAreEmpty()

  await registerPage.verifyPromotionBoxIsChecked();
  await registerPage.verifyTermBoxIsUnchecked();

  await registerPage.verifyButtonIsDisabled()
});
