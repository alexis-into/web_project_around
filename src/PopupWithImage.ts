import Popup from "./Popup.js";
import type { CardData } from "./Card.js";

export default class PopupWithImage extends Popup {
  private imageElement: HTMLImageElement;
  private captionElement: HTMLElement;

  constructor(popupSelector: string) {
    super(popupSelector);

    const imageElement =
      this.popupElement.querySelector<HTMLImageElement>(".popup__image");
    const captionElement =
      this.popupElement.querySelector<HTMLElement>(".popup__caption");

    if (!imageElement || !captionElement) {
      throw new Error("Faltan elementos en el popup de imagen");
    }

    this.imageElement = imageElement;
    this.captionElement = captionElement;
  }

  // `data` es opcional porque el open() del padre no recibe parámetros
  public override open(data?: CardData): void {
    if (data) {
      this.imageElement.src = data.link;
      this.imageElement.alt = data.name;
      this.captionElement.textContent = data.name;
    }
    super.open();
  }
}
