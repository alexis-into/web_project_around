import Popup from "./Popup.js";
export type FormValues = Record<string, string>;
export type FormSubmitHandler = (values: FormValues) => void;
export default class PopupWithForm extends Popup {
    private formElement;
    private inputList;
    private handleFormSubmit;
    constructor(popupSelector: string, handleFormSubmit: FormSubmitHandler);
    private getInputValues;
    setInputValues(values: FormValues): void;
    setEventListeners(): void;
    close(): void;
}
//# sourceMappingURL=PopupWithForm.d.ts.map