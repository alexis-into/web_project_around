import Popup from "./Popup.js";

export type FormValues = Record<string, string>;
export type FormSubmitHandler = (values: FormValues) => void;

export default class PopupWithForm extends Popup {
  private formElement: HTMLFormElement;
  private inputList: HTMLInputElement[];
  private handleFormSubmit: FormSubmitHandler;

  constructor(popupSelector: string, handleFormSubmit: FormSubmitHandler) {
    super(popupSelector);
    this.handleFormSubmit = handleFormSubmit;

    const formElement =
      this.popupElement.querySelector<HTMLFormElement>(".popup__form");
    if (!formElement) {
      throw new Error(`No se encontró el formulario en ${popupSelector}`);
    }

    this.formElement = formElement;
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
