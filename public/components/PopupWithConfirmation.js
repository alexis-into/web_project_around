import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
    formElement;
    submitButton;
    submitButtonText;
    handleConfirm = null;
    constructor(popupSelector) {
        super(popupSelector);
        const formElement = this.popupElement.querySelector(".popup__form");
        const submitButton = formElement?.querySelector(".popup__button");
        if (!formElement || !submitButton) {
            throw new Error(`Faltan elementos en ${popupSelector}`);
        }
        this.formElement = formElement;
        this.submitButton = submitButton;
        this.submitButtonText = submitButton.textContent ?? "";
    }
    // Se llama antes de abrir el popup para indicar qué hacer al confirmar
    // (por ejemplo, borrar la tarjeta con un id concreto)
    setSubmitAction(handler) {
        this.handleConfirm = handler;
    }
    renderLoading(isLoading, loadingText = "Eliminando...") {
        this.submitButton.textContent = isLoading
            ? loadingText
            : this.submitButtonText;
    }
    setEventListeners() {
        super.setEventListeners();
        this.formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this.handleConfirm?.();
        });
    }
}
//# sourceMappingURL=PopupWithConfirmation.js.map