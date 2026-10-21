export default class Card {
    data;
    templateSelector;
    handleCardClick;
    constructor(data, templateSelector, handleCardClick) {
        this.data = data;
        this.templateSelector = templateSelector;
        this.handleCardClick = handleCardClick;
    }
    getTemplate() {
        const template = document.querySelector(this.templateSelector);
        const cardElement = template?.content.querySelector(".card");
        if (!cardElement) {
            throw new Error("No se encontró la plantilla de la tarjeta");
        }
        return cardElement.cloneNode(true);
    }
    handleLikeClick(likeButton) {
        likeButton.classList.toggle("card__like-button_is-active");
    }
    handleDeleteClick(cardElement) {
        cardElement.remove();
    }
    setEventListeners(cardElement, cardImage) {
        const likeButton = cardElement.querySelector(".card__like-button");
        const deleteButton = cardElement.querySelector(".card__delete-button");
        if (!likeButton || !deleteButton) {
            throw new Error("Faltan botones en la plantilla de la tarjeta");
        }
        likeButton.addEventListener("click", () => this.handleLikeClick(likeButton));
        deleteButton.addEventListener("click", () => this.handleDeleteClick(cardElement));
        cardImage.addEventListener("click", () => this.handleCardClick(this.data));
    }
    generateCard() {
        const cardElement = this.getTemplate();
        const cardImage = cardElement.querySelector(".card__image");
        const cardTitle = cardElement.querySelector(".card__title");
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
//# sourceMappingURL=Card.js.map