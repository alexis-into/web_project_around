import { setEventListeners, resetValidation } from "./validate.js";
const settings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
};
const initialCards = [
    {
        name: "Valle de Yosemite",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
    },
    {
        name: "Lago Louise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
    },
    {
        name: "Montañas Calvas",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
    },
    {
        name: "Latemar",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
    },
    {
        name: "Parque Nacional de la Vanoise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
    },
    {
        name: "Lago di Braies",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
    },
];
const cardsList = document.querySelector(".cards__list");
// Selección de elementos principales editar perfil
const buttonProfileEdit = document.querySelector(".profile__edit-button");
const modalPopup = document.querySelector("#edit-popup");
const buttonModalClose = modalPopup.querySelector(".popup__close");
const imagePopup = document.querySelector("#image-popup");
const popupImage = imagePopup.querySelector(".popup__image");
const imagePopupClose = imagePopup.querySelector(".popup__close");
const popupCaption = imagePopup.querySelector(".popup__caption");
function openModal(modal) {
    modal.classList.add("popup_is-opened");
}
function closeModal(modal) {
    modal.classList.remove("popup_is-opened");
    const formElement = modal.querySelector(settings.formSelector);
    if (formElement) {
        resetValidation(formElement, settings);
    }
}
function handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
        closeModal(evt.currentTarget);
    }
}
document.addEventListener("keydown", handleEscClose);
buttonModalClose.addEventListener("click", () => closeModal(modalPopup));
imagePopupClose.addEventListener("click", () => closeModal(imagePopup));
modalPopup.addEventListener("click", handleOverlayClick);
imagePopup.addEventListener("click", handleOverlayClick);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nombreInput = document.querySelector(".popup__input_type_name");
const descripcionInput = document.querySelector(".popup__input_type_description");
function fillProfileForm() {
    nombreInput.value = profileTitle.textContent;
    descripcionInput.value = profileDescription.textContent;
}
function handleOpenEditModal() {
    fillProfileForm();
    resetValidation(formElement, settings);
    openModal(modalPopup);
}
function handleOpenImage(evt) {
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt;
    openModal(imagePopup);
}
buttonProfileEdit.addEventListener("click", handleOpenEditModal);
const formElement = document.querySelector("#edit-profile-form");
setEventListeners(formElement, settings);
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nombreInput.value;
    profileDescription.textContent = descripcionInput.value;
    closeModal(modalPopup);
}
formElement.addEventListener("submit", handleProfileFormSubmit);
const cardTemplates = document.querySelector("#card-templates");
function handleLikeButtonClick(evt) {
    evt.target.classList.toggle("card__like-button_is-active");
}
function handleDeleteButtonClick(evt) {
    const cardElement = evt.target.closest(".card");
    cardElement.remove();
}
function getCardElement(name = "Sin título", link = "./images/placeholder.jpg") {
    const cardContent = cardTemplates.content.cloneNode(true);
    const cardElement = cardContent.querySelector(".card");
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    const cardLikeButton = cardElement.querySelector(".card__like-button");
    const cardDeleteButton = cardElement.querySelector(".card__delete-button");
    cardLikeButton.addEventListener("click", handleLikeButtonClick);
    cardDeleteButton.addEventListener("click", handleDeleteButtonClick);
    cardImage.addEventListener("click", handleOpenImage);
    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;
    return cardElement;
}
function renderCard(name, link, cardContainer) {
    const cardElement = getCardElement(name, link);
    cardContainer.prepend(cardElement);
}
initialCards.forEach(function (card) {
    renderCard(card.name, card.link, cardsList);
});
// Selección de elementos para creación de tarjeta
const buttonAddCard = document.querySelector(".profile__add-button");
const modalPopupCard = document.querySelector("#new-card-popup");
const modalCardClose = modalPopupCard.querySelector(".popup__close");
modalCardClose.addEventListener("click", () => closeModal(modalPopupCard));
buttonAddCard.addEventListener("click", () => {
    resetValidation(submitCard, settings);
    openModal(modalPopupCard);
});
modalPopupCard.addEventListener("click", handleOverlayClick);
// Agregar información a la nueva tarjeta
const cardName = document.querySelector(".popup__input_type_card-name");
const cardLink = document.querySelector(".popup__input_type_url");
const submitCard = document.querySelector("#new-card-form");
setEventListeners(submitCard, settings);
function handleCardFormSubmit(evt) {
    evt.preventDefault();
    renderCard(cardName.value, cardLink.value, cardsList);
    closeModal(modalPopupCard);
    evt.target.reset();
}
submitCard.addEventListener("submit", handleCardFormSubmit);
function handleEscClose(evt) {
    if (evt.key === "Escape") {
        const openedModal = document.querySelector(".popup_is-opened");
        closeModal(openedModal);
    }
}
//# sourceMappingURL=index.js.map