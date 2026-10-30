import Popup from "./Popup.js";

export type FormValues = Record<string, string>;
export type FormSubmitHandler = (values: FormValues) => void | Promise<void>;

export default class PopupWithForm extends Popup {
  private formElement: HTMLFormElement;
  private inputList: HTMLInputElement[];
  private submitButton: HTMLButtonElement;
  private submitButtonText: string;
  private handleFormSubmit: FormSubmitHandler;

  constructor(popupSelector: string, handleFormSubmit: FormSubmitHandler) {
    super(popupSelector);
    this.handleFormSubmit = handleFormSubmit;

    const formElement =
      this.popupElement.querySelector<HTMLFormElement>(".popup__form");
    const submitButton =
      formElement?.querySelector<HTMLButtonElement>(".popup__button");

    if (!formElement || !submitButton) {
      throw new Error(`Faltan elementos del formulario en ${popupSelector}`);
    }

    this.formElement = formElement;
    this.submitButton = submitButton;
    this.submitButtonText = submitButton.textContent ?? "";
    this.inputList = Array.from(
      formElement.querySelectorAll<HTMLInputElement>(".popup__input"),
    );
  }

  private getInputValues(): FormValues {
    const values: FormValues = {};
    this.inputList.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  public setInputValues(values: FormValues): void {
    this.inputList.forEach((input) => {
      input.value = values[input.name] ?? "";
    });
  }

  public renderLoading(isLoading: boolean, loadingText = "Guardando..."): void {
    this.submitButton.textContent = isLoading
      ? loadingText
      : this.submitButtonText;
  }

  public override setEventListeners(): void {
    super.setEventListeners();

    this.formElement.addEventListener("submit", (evt: SubmitEvent) => {
      evt.preventDefault();
      this.handleFormSubmit(this.getInputValues());
    });
  }

  public override close(): void {
    super.close();
    this.formElement.reset();
  }
}
