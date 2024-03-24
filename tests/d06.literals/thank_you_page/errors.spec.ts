import { test } from "@playwright/test";
import { shouldDisplayThankYouError } from "../asserts";
import { THANK_YOU_PAGE } from "../consts";

test("direct thank you page shows error", async ({ page }) => {
  await page.goto(THANK_YOU_PAGE);
  await shouldDisplayThankYouError(page);
});


