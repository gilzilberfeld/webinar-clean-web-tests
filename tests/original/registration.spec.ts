import { test, expect } from "@playwright/test";
import { getTitle, getPromotionsCheckbox, getButton, getTermsCheckbox, getErrorMessage, getFirstName, getLastName, getEmail } from "./common";


test("registration page opens correctly", async ({ page }) => {
    await page.goto("/");
    await expect(getTitle(page)).toBeVisible()
    await expect(getPromotionsCheckbox(page)).toBeChecked()
    await expect(getButton(page)).toBeDisabled()
});

test("show error if one of the fields is empty", async ({ page }) => {
    await page.goto("/");
    await getTermsCheckbox(page).check()
    await getButton(page).click()
    await expect(getErrorMessage(page)).toBeVisible()
    
});

test("register process with valid data completes on welcome page", async ({ page }) => {
    await page.goto("/");
    await getTermsCheckbox(page).check()
    await getFirstName(page).fill('gil')
    await getLastName(page).fill('zilberfeld')
    await getEmail(page).fill('gil@testingil.com')
    await getButton(page).click()
    await expect(page.getByText("Thank you, gil!")).toBeVisible();
});



