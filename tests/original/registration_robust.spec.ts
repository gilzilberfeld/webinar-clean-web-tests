import { test, expect, request } from "@playwright/test";
import { getButton, getEmail, getFirstName, getLastName, getTermsCheckbox } from "../original/common";

test("register process with valid data stores data correctly", async ({ page }) => {
    await page.goto("/");
    await getTermsCheckbox(page).check()
    await getFirstName(page).fill('gil')
    await getLastName(page).fill('zilberfeld')
    await getEmail(page).fill('gil@testingil.com')
    await getButton(page).click()
    await expect(page.getByText("Thank you, gil!")).toBeVisible();

    const apiRequestContext = await request.newContext();
    const response  = await apiRequestContext.get('/api/all' )
    const json = await response.json();

    const expectedEntry = { info: { firstName: 'gil', lastName: 'zilberfeld', email: 'gil@testingil.com' }, promotions: true };
    expect(getLastEntry(json)).toStrictEqual(expectedEntry)
});
function getLastEntry(json: any): any {
    return json.registrants[json.registrants.length - 1];
}

