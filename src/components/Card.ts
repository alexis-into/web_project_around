import type { CardData } from "../utils/types.js";

export interface CardHandlers {
  handleCardClick: (data: CardData) => void;
  handleLikeClick: (card: Card) => void;
  handleDeleteClick: (card: Card) => void;
}

export default class Card {
  private data: CardData;
  private currentUserId: string;
  private handlers: CardHandlers;
  private cardElement: HTMLElement;
  private cardImage: HTMLImageElement;
  private cardTitle: HTMLHeadingElement;
  private likeButton: HTMLButtonElement;
  private deleteButton: HTMLButtonElement;

  constructor(
    data: CardData,
    templateSelector: string,
    currentUserId: string,
    handlers: CardHandlers,
  ) {
    this.data = data;
    this.currentUserId = currentUserId;
    this.handlers = handlers;
    this.cardElement = this.getTemplate(templateSelector);

    const cardImage =
      this.cardElement.querySelector<HTMLImageElement>(".card__image");
    const cardTitle =
      this.cardElement.querySelector<HTMLHeadingElement>(".card__title");
    const likeButton =
      this.cardElement.querySelector<HTMLButtonElement>(".card__like-button");
    const deleteButton = this.cardElement.querySelector<HTMLButtonElement>(
      ".card__delete-button",
    );

    if (!cardImage || !cardTitle || !likeButton || !deleteButton) {
      throw new Error("Faltan elementos en la plantilla de la tarjeta");
    }

    this.cardImage = cardImage;
    this.cardTitle = cardTitle;
    this.likeButton = likeButton;
    this.deleteButton = deleteButton;
  }

  private getTemplate(templateSelector: string): HTMLElement {
    const template =
      document.querySelector<HTMLTemplateElement>(templateSelector);
    const cardElement = template?.content.querySelector<HTMLElement>(".card");

    if (!cardElement) {
      throw new Error("No se encontró la plantilla de la tarjeta");
    }

    return cardElement.cloneNode(true) as HTMLElement;
  }

  private isOwner(): boolean {
    return this.data.owner === this.currentUserId;
  }

  private setEventListeners(): void {
    this.likeButton.addEventListener("click", () =>
      this.handlers.handleLikeClick(this),
    );
    this.deleteButton.addEventListener("click", () =>
      this.handlers.handleDeleteClick(this),
    );
    this.cardImage.addEventListener("click", () =>
      this.handlers.handleCardClick(this.data),
    );
  }

  public getId(): string {
    return this.data._id;
  }

  public isLiked(): boolean {
    return this.data.isLiked;
  }

  public setLikeStatus(isLiked: boolean): void {
    this.data.isLiked = isLiked;
    this.likeButton.classList.toggle("card__like-button_is-active", isLiked);
  }

  public removeCard(): void {
    this.cardElement.remove();
  }

  public generateCard(): HTMLElement {
    this.cardImage.src = this.data.link;
    this.cardImage.alt = this.data.name;
    this.cardTitle.textContent = this.data.name;
    this.setLikeStatus(this.data.isLiked);

    // Solo el autor de la tarjeta puede borrarla
    if (!this.isOwner()) {
      this.deleteButton.remove();
    }

    this.setEventListeners();

    return this.cardElement;
  }
}
