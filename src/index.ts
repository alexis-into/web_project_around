import Card from "./Card.js";
import type { CardData } from "./Card.js";
import FormValidator from "./FormValidator.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
import { defaultFormConfig, initialCards } from "./utils/constants.js";

// Elementos del DOM

const profileEditButton = document.querySelector<HTMLButtonElement>(
  ".profile__edit-button",
);
const addCardButton = document.querySelector<HTMLButtonElement>(
  ".profile__add-button",
);
const profileForm =
  document.querySelector<HTMLFormElement>("#edit-profile-form");
const cardForm = document.querySelector<HTMLFormElement>("#new-card-form");

if (!profileEditButton || !addCardButton || !profileForm || !cardForm) {
  throw new Error("Faltan elementos en el HTML");
}

// Validación de formularios

const profileValidator = new FormValidator(defaultFormConfig, profileForm);
const cardValidator = new FormValidator(defaultFormConfig, cardForm);

profileValidator.enableValidation();
cardValidator.enableValidation();

// Información del usuario

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

// Popup de imagen

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

// Tarjetas

function createCard(data: CardData): HTMLElement {
  const card = new Card(data, "#card-templates", (cardData) =>
    imagePopup.open(cardData),
  );
  return card.generateCard();
}

function renderCard(data: CardData): void {
  cardSection.addItem(createCard(data));
}

const cardSection = new Section<CardData>(
  { items: initialCards, renderer: renderCard },
  ".cards__list",
);
cardSection.renderItems();

// Popup de editar perfil

const profilePopup = new PopupWithForm("#edit-popup", (values) => {
  userInfo.setUserInfo({ name: values.name, job: values.description });
  profilePopup.close();
});
profilePopup.setEventListeners();

profileEditButton.addEventListener("click", () => {
  const { name, job } = userInfo.getUserInfo();
  profilePopup.setInputValues({ name, description: job });
  profileValidator.resetValidation();
  profilePopup.open();
});

// Popup de nueva tarjeta

const cardPopup = new PopupWithForm("#new-card-popup", (values) => {
  renderCard({ name: values["place-name"], link: values.link });
  cardPopup.close();
});
cardPopup.setEventListeners();

addCardButton.addEventListener("click", () => {
  cardValidator.resetValidation();
  cardPopup.open();
});
