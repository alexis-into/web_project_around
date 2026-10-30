export interface FormConfig {
  inputSelector: string;
  submitButtonSelector: string;
  inactiveButtonClass: string;
  inputErrorClass: string;
  errorClass: string;
}

export const defaultFormConfig: FormConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const apiConfig = {
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "a9eea214-3fe8-4332-92c1-1bad7aee3453",
    "Content-Type": "application/json",
  },
};
