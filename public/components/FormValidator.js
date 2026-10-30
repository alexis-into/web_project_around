export default class FormValidator {
    config;
    formElement;
    inputList;
    buttonElement;
    constructor(config, formElement) {
        this.config = config;
        this.formElement = formElement;
        this.inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
        const button = formElement.querySelector(config.submitButtonSelector);
        if (!button) {
            throw new Error("No se encontró el botón de envío en el formulario");
        }
        this.buttonElement = button;
    }
    getErrorElement(inputElement) {
        return this.formElement.querySelector(`#${inputElement.id}-error`);
    }
    showInputError(inputElement, errorMessage) {
        const errorElement = this.getErrorElement(inputElement);
        if (!errorElement)
            return;
        inputElement.classList.add(this.config.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this.config.errorClass);
    }
    hideInputError(inputElement) {
        const errorElement = this.getErrorElement(inputElement);
        if (!errorElement)
            return;
        inputElement.classList.remove(this.config.inputErrorClass);
        errorElement.textContent = "";
        errorElement.classList.remove(this.config.errorClass);
    }
    checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this.showInputError(inputElement, inputElement.validationMessage);
        }
        else {
            this.hideInputError(inputElement);
        }
    }
    hasInvalidInput() {
        return this.inputList.some((inputElement) => !inputElement.validity.valid);
    }
    toggleButtonState() {
        if (this.hasInvalidInput()) {
            this.buttonElement.classList.add(this.config.inactiveButtonClass);
            this.buttonElement.disabled = true;
        }
        else {
            this.buttonElement.classList.remove(this.config.inactiveButtonClass);
            this.buttonElement.disabled = false;
        }
    }
    setEventListeners() {
        this.toggleButtonState();
        this.inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", (_evt) => {
                this.checkInputValidity(inputElement);
                this.toggleButtonState();
            });
        });
    }
    enableValidation() {
        this.setEventListeners();
    }
    resetValidation() {
        this.inputList.forEach((inputElement) => {
            this.hideInputError(inputElement);
        });
        this.toggleButtonState();
    }
}
//# sourceMappingURL=FormValidator.js.map