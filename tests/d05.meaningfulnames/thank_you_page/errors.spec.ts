import { test } from "@playwright/test";
import { shouldDisplayThankYouError } from "../asserts";

test("direct thank you page shows error", async ({ page }) => {
  await page.goto("/thankyou");
  await shouldDisplayThankYouError(page);
});


