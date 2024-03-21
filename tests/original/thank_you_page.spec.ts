import { THANK_YOU_ERROR_TEXT } from "@/app/thankyou/page";
import { test, expect } from "@playwright/test";

test("thank you page shows the name", async ({ page }) => {
  await page.goto("/thankyou?name=gil");
  await expect(page.getByText("Thank you, gil!")).toBeVisible();
});

test("thank you without name shows error", async ({ page }) => {
  await page.goto("/thankyou");
  await expect(page.getByText(THANK_YOU_ERROR_TEXT)).toBeVisible();
});
