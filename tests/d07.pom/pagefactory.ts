import { Page } from "@playwright/test";
import { RegisterPage } from "./register_page_object";

export class PageFactory {
  static async createRegistrationPage(page : Page) : Promise<RegisterPage> {
    const registerPage = new RegisterPage(page);
    await registerPage.initialize()
    return registerPage
  }
}


