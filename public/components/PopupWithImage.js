import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
    imageElement;
    captionElement;
    constructor(popupSelector) {
        super(popupSelector);
        const imageElement = this.popupElement.querySelector(".popup__image");
        const captionElement = this.popupElement.querySelector(".popup__caption");
        if (!imageElement || !captionElement) {
            throw new Error("Faltan elementos en el popup de imagen");
        }
        this.imageElement = imageElement;
        this.captionElement = captionElement;
    }
    // `data` es opcional porque el open() del padre no recibe parámetros
    open(data) {
        if (data) {
            this.imageElement.src = data.link;
            this.imageElement.alt = data.name;
            this.captionElement.textContent = data.name;
        }
        super.open();
    }
}
//# sourceMappingURL=PopupWithImage.js.map