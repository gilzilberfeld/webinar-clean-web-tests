import { ANY_INPUT } from "./consts";
import { RegisterPage } from "./register_page_object";

export function typeAnythingInEmail(page: RegisterPage) {
  return page.emailBox.fill(ANY_INPUT);
}
export function typeAnythingInLastName(page: RegisterPage) {
  return page.lastNameBox.fill(ANY_INPUT);
}
  export function checkTermsBox(page: RegisterPage) {
  return page.termsCheckBox.check();
}
export function fillFirstName(page: RegisterPage, text: string) {
  return page.firstNameBox.fill(text);
}
export function fillLastName(page: RegisterPage, text: string) {
  return page.lastNameBox.fill(text);
}
export function fillEmail(page: RegisterPage, text: string) {
  return page.emailBox.fill(text);
}
