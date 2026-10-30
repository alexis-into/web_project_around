export default class Popup {
  protected popupElement: HTMLElement;

  constructor(popupSelector: string) {
    const popupElement = document.querySelector<HTMLElement>(popupSelector);
    if (!popupElement) {
      throw new Error(`No se encontró el popup ${popupSelector}`);
    }
    this.popupElement = popupElement;
  }

  // Arrow function para que `this` siempre sea el popup y
  // para poder quitar el mismo listener en close()
  private handleEscClose = (evt: KeyboardEvent): void => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  public open(): void {
    this.popupElement.classList.add("popup_is-opened");
    document.addEventListener("keydown", this.handleEscClose);
  }

  public close(): void {
    this.popupElement.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", this.handleEscClose);
  }

  public setEventListeners(): void {
    const closeButton =
      this.popupElement.querySelector<HTMLButtonElement>(".popup__close");
    closeButton?.addEventListener("click", () => this.close());

    this.popupElement.addEventListener("click", (evt: MouseEvent) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
  }
}
