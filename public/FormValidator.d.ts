import type { FormConfig } from "./utils/constants.js";
export default class FormValidator {
    private config;
    private formElement;
    private inputList;
    private buttonElement;
    constructor(config: FormConfig, formElement: HTMLFormElement);
    private getErrorElement;
    private showInputError;
    private hideInputError;
    private checkInputValidity;
    private hasInvalidInput;
    private toggleButtonState;
    private setEventListeners;
    enableValidation(): void;
    resetValidation(): void;
}
//# sourceMappingURL=FormValidator.d.ts.map