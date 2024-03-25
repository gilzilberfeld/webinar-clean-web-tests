import { Locator, Page } from "@playwright/test";
import { ANY_INPUT, REGISTRATION_PAGE } from "./consts";

const TITLE = "Register to the magnificent Newsletter!";
const FIRST_NAME_ID = "First Name";
const LAST_NAME_ID = "Last Name";
const EMAIL_ID = "Email";
const PROMOTIONS_ID = "I want to get promotions too!";
const TERMS_ID = "I have read the whole term sheet and agree";
const BUTTON_ID = "Register";
const VALIDATION_MESSAGE = "Please make sure all fields are filled correctly.";

export class RegisterPage {
  page: Page;
  title: Locator;
  firstNameBox: Locator;
  lastNameBox: Locator;
  emailBox: Locator;
  promotionCheckBox: Locator;
  termsCheckBox: Locator;
  registerButton: Locator;
  
  constructor(page: Page) {
    this.page = page;
  }

  async initialize() {
    await this.page.goto(REGISTRATION_PAGE);
    this.title = this.page.getByText(TITLE);
    this.firstNameBox = this.page.getByRole("textbox", { name: FIRST_NAME_ID });
    this.lastNameBox = this.page.getByRole("textbox", { name: LAST_NAME_ID });
    this.emailBox = this.page.getByRole("textbox", { name: EMAIL_ID });
    this.promotionCheckBox = this.page.getByRole("checkbox", { name: PROMOTIONS_ID });
    this.termsCheckBox = this.page.getByRole("checkbox", { name: TERMS_ID });
    this.registerButton = this.page.getByRole("button", { name: BUTTON_ID });
  }

  typeAnythingInEmail() {
    this.emailBox.fill(ANY_INPUT);
  }
  typeAnythingInLastName() {
    this.lastNameBox.fill(ANY_INPUT);
  }
  typeAnythingInFirstName() {
      this.firstNameBox.fill(ANY_INPUT);
  }
  clickButton() {
      this.registerButton.click();
  }
  uncheckTermsBox() {
    this.termsCheckBox.uncheck();
  }

  async errorMsg(): Promise<Locator> {
    return await this.page.getByText(VALIDATION_MESSAGE);
  }
}
