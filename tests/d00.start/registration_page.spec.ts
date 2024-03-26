import { test, expect, request, Page, Locator } from "@playwright/test";

test("startup", async ({ page }) => {
  await page.goto("/");
  // Title is there
  await expect(page.getByText("Register to the magnificent Newsletter!")).toBeVisible();
  // Boxes are empty
  await expect(page.getByRole("textbox", { name: "First Name" })).toBeEmpty();
  await expect(page.getByRole("textbox", { name: "Last Name" })).toBeEmpty();
  await expect(page.getByRole("textbox", { name: "Email" })).toBeEmpty();
  // Checkboxes checked correctly
  await expect(page.getByRole("checkbox", { name: "I want to get promotions too!" })).toBeChecked();
  await expect(page.getByRole("checkbox", { name: "I have read the whole term sheet and agree" })).not.toBeChecked();
  // button is disabled
  await expect(page.getByRole("button", { name: "Register" })).toBeDisabled();
});


test("validation", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("checkbox", { name: "I have read the whole term sheet and agree" }).check();
  await expect(page.getByRole("button", { name: "Register" })).toBeEnabled();
  await page.getByRole("button", { name: "Register" }).click();
  await expect(page.getByText("Please make sure all fields are filled correctly.")).toBeVisible();
  
  // just first name
  await page.getByRole("textbox", { name: "First Name" }).fill("a");
  await expect(page.getByText("Please make sure all fields are filled correctly.")).not.toBeVisible();
  await page.getByRole("textbox", { name: "Last Name" }).clear();
  await page.getByRole("textbox", { name: "Email" }).clear();
  await page.getByRole("button", { name: "Register" }).click();
  await expect(page.getByText("Please make sure all fields are filled correctly.")).toBeVisible();
  
  //just last name
  await page.getByRole("textbox", { name: "First Name" }).clear()
  await page.getByRole("textbox", { name: "Last Name" }).fill("a")
  await expect(page.getByText("Please make sure all fields are filled correctly.")).not.toBeVisible();
  await page.getByRole("textbox", { name: "Email" }).clear();
  await page.getByRole("button", { name: "Register" }).click();
  await expect(page.getByText("Please make sure all fields are filled correctly.")).toBeVisible();
  
  // just email
  await page.getByRole("textbox", { name: "First Name" }).clear()
  await page.getByRole("textbox", { name: "Last Name" }).clear()
  await page.getByRole("textbox", { name: "Email" }).fill("a");
  await expect(page.getByText("Please make sure all fields are filled correctly.")).not.toBeVisible();
  await page.getByRole("button", { name: "Register" }).click();
  await expect(page.getByText("Please make sure all fields are filled correctly.")).toBeVisible();
  
  // wrong email
  await page.getByRole("textbox", { name: "First Name" }).fill("a")
  await expect(page.getByText("Please make sure all fields are filled correctly.")).not.toBeVisible();
  await page.getByRole("textbox", { name: "Last Name" }).fill("a")
  await page.getByRole("textbox", { name: "Email" }).fill("a");
  await page.getByRole("button", { name: "Register" }).click();
  await expect(page.getByText("Please make sure all fields are filled correctly.")).toBeVisible();
  
});

test("enabling and disabling the button", async ({ page }) => {
    await page.goto("/");
    // loads disabled
    await expect(page.getByRole("button", { name: "Register" })).toBeDisabled();
    // click once enables
    await page.getByRole("checkbox", { name: "I have read the whole term sheet and agree" }).check();
    await expect(page.getByRole("button", { name: "Register" })).toBeEnabled();
    // click twice disables
    await page.getByRole("checkbox", { name: "I have read the whole term sheet and agree" }).uncheck();
    await expect(page.getByRole("button", { name: "Register" })).toBeDisabled();
});

test("register process with valid data stores data correctly", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("checkbox", { name: "I have read the whole term sheet and agree" }).check();
  await page.getByRole("textbox", { name: "First Name" }).fill("gil");
  await page.getByRole("textbox", { name: "Last Name" }).fill("zilberfeld");
  await page.getByRole("textbox", { name: "Email" }).fill("gil@testingil.com");
  await page.getByRole("button", { name: "Register" }).click();
  await expect(page.getByText("Thank you, gil!")).toBeVisible();

  const apiRequestContext = await request.newContext();
  const response = await apiRequestContext.get("/api/all");
  const json = await response.json();

  const expectedEntry = { info: { firstName: "gil", lastName: "zilberfeld", email: "gil@testingil.com" }, promotions: true };
  expect(json.registrants[json.registrants.length - 1]).toStrictEqual(expectedEntry);
});

test("direct thank you page shows error", async ({ page }) => {
    await page.goto("/thankyou");
    await expect(page.getByText('Who Are You?')).toBeVisible();
  });
  