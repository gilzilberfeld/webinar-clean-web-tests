import { test } from "@playwright/test";
import { PageFactory } from "../page_objects/pagefactory";

test("direct thank you page shows error", async ({ page }) => {
  const thankYouPage = await PageFactory.createThankYouPage(page);
  await thankYouPage.verifyErrorIsVisible()
});


