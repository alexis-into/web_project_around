export interface CardData {
  name: string;
  link: string;
}

export type HandleCardClick = (data: CardData) => void;

export default class Card {
  private data: CardData;
  private templateSelector: string;
  private handleCardClick: HandleCardClick;

  constructor(
    data: CardData,
    templateSelector: string,
    handleCardClick: HandleCardClick,
  ) {
    this.data = data;
    this.templateSelector = templateSelector;
    this.handleCardClick = handleCardClick;
  }

  private getTemplate(): HTMLElement {
    const template = document.querySelector<HTMLTemplateElement>(
      this.templateSelector,
    );
    const cardElement = template?.content.querySelector<HTMLElement>(".card");

    if (!cardElement) {
      throw new Error("No se encontró la plantilla de la tarjeta");
    }

    return cardElement.cloneNode(true) as HTMLElement;
  }

  private handleLikeClick(likeButton: HTMLButtonElement): void {
    likeButton.classList.toggle("card__like-button_is-active");
  }

  private handleDeleteClick(cardElement: HTMLElement): void {
    cardElement.remove();
  }

  private setEventListeners(
    cardElement: HTMLElement,
    cardImage: HTMLImageElement,
  ): void {
    const likeButton =
      cardElement.querySelector<HTMLButtonElement>(".card__like-button");
    const deleteButton = cardElement.querySelector<HTMLButtonElement>(
      ".card__delete-button",
    );

    if (!likeButton || !deleteButton) {
      throw new Error("Faltan botones en la plantilla de la tarjeta");
    }

    likeButton.addEventListener("click", () =>
      this.handleLikeClick(likeButton),
    );
    deleteButton.addEventListener("click", () =>
      this.handleDeleteClick(cardElement),
    );
    cardImage.addEventListener("click", () => this.handleCardClick(this.data));
  }

  public generateCard(): HTMLElement {
    const cardElement = this.getTemplate();
    const cardImage =
      cardElement.querySelector<HTMLImageElement>(".card__image");
    const cardTitle =
      cardElement.querySelector<HTMLHeadingElement>(".card__title");

    if (!cardImage || !cardTitle) {
      throw new Error("Faltan elementos en la plantilla de la tarjeta");
    }

    cardImage.src = this.data.link;
    cardImage.alt = this.data.name;
    cardTitle.textContent = this.data.name;

    this.setEventListeners(cardElement, cardImage);

    return cardElement;
  }
}
