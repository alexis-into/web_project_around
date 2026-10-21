export default class Popup {
    popupElement;
    constructor(popupSelector) {
        const popupElement = document.querySelector(popupSelector);
        if (!popupElement) {
            throw new Error(`No se encontró el popup ${popupSelector}`);
        }
        this.popupElement = popupElement;
    }
    // Arrow function para que `this` siempre sea el popup y
    // para poder quitar el mismo listener en close()
    handleEscClose = (evt) => {
        if (evt.key === "Escape") {
            this.close();
        }
    };
    open() {
        this.popupElement.classList.add("popup_is-opened");
        document.addEventListener("keydown", this.handleEscClose);
    }
    close() {
        this.popupElement.classList.remove("popup_is-opened");
        document.removeEventListener("keydown", this.handleEscClose);
    }
    setEventListeners() {
        const closeButton = this.popupElement.querySelector(".popup__close");
        closeButton?.addEventListener("click", () => this.close());
        this.popupElement.addEventListener("click", (evt) => {
            if (evt.target === evt.currentTarget) {
                this.close();
            }
        });
    }
}
//# sourceMappingURL=Popup.js.map