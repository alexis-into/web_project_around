import type { FormConfig } from "./utils/constants.js";

export default class FormValidator {
  private config: FormConfig;
  private formElement: HTMLFormElement;
  private inputList: HTMLInputElement[];
  private buttonElement: HTMLButtonElement;

  constructor(config: FormConfig, formElement: HTMLFormElement) {
    this.config = config;
    this.formElement = formElement;
    this.inputList = Array.from(
      formElement.querySelectorAll<HTMLInputElement>(config.inputSelector),
    );

    const button = formElement.querySelector<HTMLButtonElement>(
      config.submitButtonSelector,
    );

    if (!button) {
      throw new Error("No se encontró el botón de envío en el formulario");
    }

    this.buttonElement = button;
  }

  private getErrorElement(
    inputElement: HTMLInputElement,
  ): HTMLSpanElement | null {
    return this.formElement.querySelector<HTMLSpanElement>(
      `#${inputElement.id}-error`,
    );
  }

  private showInputError(
    inputElement: HTMLInputElement,
    errorMessage: string,
  ): void {
    const errorElement = this.getErrorElement(inputElement);
    if (!errorElement) return;

    inputElement.classList.add(this.config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.config.errorClass);
  }

  private hideInputError(inputElement: HTMLInputElement): void {
    const errorElement = this.getErrorElement(inputElement);
    if (!errorElement) return;

    inputElement.classList.remove(this.config.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this.config.errorClass);
  }

  private checkInputValidity(inputElement: HTMLInputElement): void {
    if (!inputElement.validity.valid) {
      this.showInputError(inputElement, inputElement.validationMessage);
    } else {
      this.hideInputError(inputElement);
    }
  }

  private hasInvalidInput(): boolean {
    return this.inputList.some((inputElement) => !inputElement.validity.valid);
  }

  private toggleButtonState(): void {
    if (this.hasInvalidInput()) {
      this.buttonElement.classList.add(this.config.inactiveButtonClass);
      this.buttonElement.disabled = true;
    } else {
      this.buttonElement.classList.remove(this.config.inactiveButtonClass);
      this.buttonElement.disabled = false;
    }
  }

  private setEventListeners(): void {
    this.toggleButtonState();

    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", (_evt: Event) => {
        this.checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }

  public enableValidation(): void {
    this.setEventListeners();
  }

  public resetValidation(): void {
    this.inputList.forEach((inputElement) => {
      this.hideInputError(inputElement);
    });

    this.toggleButtonState();
  }
}
