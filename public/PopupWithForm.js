import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
    formElement;
    inputList;
    handleFormSubmit;
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this.handleFormSubmit = handleFormSubmit;
        const formElement = this.popupElement.querySelector(".popup__form");
        if (!formElement) {
            throw new Error(`No se encontró el formulario en ${popupSelector}`);
        }
        this.formElement = formElement;
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