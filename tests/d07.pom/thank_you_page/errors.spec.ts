import { test } from "@playwright/test";
import { shouldDisplayThankYouError } from "../asserts";
import { PageFactory } from "../pagefactory";

test("direct thank you page shows error", async ({ page }) => {
  const tyPage = await PageFactory.createThankYouPage(page);
  await shouldDisplayThankYouError(tyPage);
});

