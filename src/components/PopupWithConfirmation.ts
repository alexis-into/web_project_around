import Popup from "./Popup.js";

export type ConfirmationHandler = () => void | Promise<void>;

export default class PopupWithConfirmation extends Popup {
  private formElement: HTMLFormElement;
  private submitButton: HTMLButtonElement;
  private submitButtonText: string;
  private handleConfirm: ConfirmationHandler | null = null;

  constructor(popupSelector: string) {
    super(popupSelector);

    const formElement =
      this.popupElement.querySelector<HTMLFormElement>(".popup__form");
    const submitButton =
      formElement?.querySelector<HTMLButtonElement>(".popup__button");

    if (!formElement || !submitButton) {
      throw new Error(`Faltan elementos en ${popupSelector}`);
    }

    this.formElement = formElement;
    this.submitButton = submitButton;
    this.submitButtonText = submitButton.textContent ?? "";
  }

  // Se llama antes de abrir el popup para indicar qué hacer al confirmar
  // (por ejemplo, borrar la tarjeta con un id concreto)
  public setSubmitAction(handler: ConfirmationHandler): void {
    this.handleConfirm = handler;
  }

  public renderLoading(
    isLoading: boolean,
    loadingText = "Eliminando...",
  ): void {
    this.submitButton.textContent = isLoading
      ? loadingText
      : this.submitButtonText;
  }

  public override setEventListeners(): void {
    super.setEventListeners();

    this.formElement.addEventListener("submit", (evt: SubmitEvent) => {
      evt.preventDefault();
      this.handleConfirm?.();
    });
  }
}
