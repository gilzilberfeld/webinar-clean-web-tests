import { test, expect } from "@playwright/test";
import { getThankYouErrorMessage } from "../locators";

test("direct thank you page shows error", async ({ page }) => {
  await page.goto("/thankyou");
  await expect(getThankYouErrorMessage(page)).toBeVisible();
});
