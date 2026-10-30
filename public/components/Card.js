export default class Card {
    data;
    currentUserId;
    handlers;
    cardElement;
    cardImage;
    cardTitle;
    likeButton;
    deleteButton;
    constructor(data, templateSelector, currentUserId, handlers) {
        this.data = data;
        this.currentUserId = currentUserId;
        this.handlers = handlers;
        this.cardElement = this.getTemplate(templateSelector);
        const cardImage = this.cardElement.querySelector(".card__image");
        const cardTitle = this.cardElement.querySelector(".card__title");
        const likeButton = this.cardElement.querySelector(".card__like-button");
        const deleteButton = this.cardElement.querySelector(".card__delete-button");
        if (!cardImage || !cardTitle || !likeButton || !deleteButton) {
            throw new Error("Faltan elementos en la plantilla de la tarjeta");
        }
        this.cardImage = cardImage;
        this.cardTitle = cardTitle;
        this.likeButton = likeButton;
        this.deleteButton = deleteButton;
    }
    getTemplate(templateSelector) {
        const template = document.querySelector(templateSelector);
        const cardElement = template?.content.querySelector(".card");
        if (!cardElement) {
            throw new Error("No se encontró la plantilla de la tarjeta");
        }
        return cardElement.cloneNode(true);
    }
    isOwner() {
        return this.data.owner === this.currentUserId;
    }
    setEventListeners() {
        this.likeButton.addEventListener("click", () => this.handlers.handleLikeClick(this));
        this.deleteButton.addEventListener("click", () => this.handlers.handleDeleteClick(this));
        this.cardImage.addEventListener("click", () => this.handlers.handleCardClick(this.data));
    }
    getId() {
        return this.data._id;
    }
    isLiked() {
        return this.data.isLiked;
    }
    setLikeStatus(isLiked) {
        this.data.isLiked = isLiked;
        this.likeButton.classList.toggle("card__like-button_is-active", isLiked);
    }
    removeCard() {
        this.cardElement.remove();
    }
    generateCard() {
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
//# sourceMappingURL=Card.js.map