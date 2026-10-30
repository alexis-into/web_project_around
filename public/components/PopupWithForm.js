import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
    formElement;
    inputList;
    submitButton;
    submitButtonText;
    handleFormSubmit;
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this.handleFormSubmit = handleFormSubmit;
        const formElement = this.popupElement.querySelector(".popup__form");
        const submitButton = formElement?.querySelector(".popup__button");
        if (!formElement || !submitButton) {
            throw new Error(`Faltan elementos del formulario en ${popupSelector}`);
        }
        this.formElement = formElement;
        this.submitButton = submitButton;
        this.submitButtonText = submitButton.textContent ?? "";
        this.inputList = Array.from(formElement.querySelectorAll(".popup__input"));
    }
    getInputValues() {
        const values = {};
        this.inputList.forEach((input) => {
            values[input.name] = input.value;
        });
        return values;
    }
    setInputValues(values) {
        this.inputList.forEach((input) => {
            input.value = values[input.name] ?? "";
        });
    }
    renderLoading(isLoading, loadingText = "Guardando...") {
        this.submitButton.textContent = isLoading
            ? loadingText
            : this.submitButtonText;
    }
    setEventListeners() {
        super.setEventListeners();
        this.formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this.handleFormSubmit(this.getInputValues());
        });
    }
    close() {
        super.close();
        this.formElement.reset();
    }
}
//# sourceMappingURL=PopupWithForm.js.map