import Api from "./components/Api.js";
import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import PopupWithConfirmation from "./components/PopupWithConfirmation.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import Section from "./components/Section.js";
import UserInfo from "./components/UserInfo.js";
import { apiConfig, defaultFormConfig } from "./utils/constants.js";
// Elementos del DOM
const profileEditButton = document.querySelector(".profile__edit-button");
const avatarEditButton = document.querySelector(".profile__avatar-button");
const addCardButton = document.querySelector(".profile__add-button");
const profileForm = document.querySelector("#edit-profile-form");
const avatarForm = document.querySelector("#edit-avatar-form");
const cardForm = document.querySelector("#new-card-form");
if (!profileEditButton ||
    !avatarEditButton ||
    !addCardButton ||
    !profileForm ||
    !avatarForm ||
    !cardForm) {
    throw new Error("Faltan elementos en el HTML");
}
// API
const api = new Api(apiConfig);
// Validación de formularios
const profileValidator = new FormValidator(defaultFormConfig, profileForm);
const avatarValidator = new FormValidator(defaultFormConfig, avatarForm);
const cardValidator = new FormValidator(defaultFormConfig, cardForm);
profileValidator.enableValidation();
avatarValidator.enableValidation();
cardValidator.enableValidation();
// Información del usuario
const userInfo = new UserInfo({
    nameSelector: ".profile__title",
    aboutSelector: ".profile__description",
    avatarSelector: ".profile__image",
});
// Popups de imagen y de confirmación
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();
const deletePopup = new PopupWithConfirmation("#delete-popup");
deletePopup.setEventListeners();
// Muestra "Guardando..." mientras espera al servidor y cierra el popup
// solo si la solicitud tuvo éxito
async function submitWithLoading(popup, request) {
    popup.renderLoading(true);
    try {
        await request();
        popup.close();
    }
    catch (err) {
        console.error(err);
    }
    finally {
        popup.renderLoading(false);
    }
}
// Tarjetas
async function handleLikeClick(card) {
    try {
        const updatedCard = await api.changeLikeStatus(card.getId(), !card.isLiked());
        card.setLikeStatus(updatedCard.isLiked);
    }
    catch (err) {
        console.error(err);
    }
}
function handleDeleteClick(card) {
    deletePopup.setSubmitAction(() => submitWithLoading(deletePopup, async () => {
        await api.deleteCard(card.getId());
        card.removeCard();
    }));
    deletePopup.open();
}
function createCard(data) {
    const card = new Card(data, "#card-templates", userInfo.getUserId(), {
        handleCardClick: (cardData) => imagePopup.open(cardData),
        handleLikeClick,
        handleDeleteClick,
    });
    return card.generateCard();
}
function renderCard(data) {
    cardSection.addItem(createCard(data));
}
const cardSection = new Section({ items: [], renderer: renderCard }, ".cards__list");
// Popup de editar perfil
const profilePopup = new PopupWithForm("#edit-popup", (values) => submitWithLoading(profilePopup, async () => {
    const userData = await api.setUserInfo({
        name: values.name,
        about: values.about,
    });
    userInfo.setUserInfo(userData);
}));
profilePopup.setEventListeners();
profileEditButton.addEventListener("click", () => {
    profilePopup.setInputValues({ ...userInfo.getUserInfo() });
    profileValidator.resetValidation();
    profilePopup.open();
});
// Popup de cambiar avatar
const avatarPopup = new PopupWithForm("#avatar-popup", (values) => submitWithLoading(avatarPopup, async () => {
    const userData = await api.setUserAvatar({ avatar: values.avatar });
    userInfo.setAvatar(userData.avatar);
}));
avatarPopup.setEventListeners();
avatarEditButton.addEventListener("click", () => {
    avatarValidator.resetValidation();
    avatarPopup.open();
});
// Popup de nueva tarjeta
const cardPopup = new PopupWithForm("#new-card-popup", (values) => submitWithLoading(cardPopup, async () => {
    const newCard = await api.addCard({
        name: values.name,
        link: values.link,
    });
    renderCard(newCard);
}));
cardPopup.setEventListeners();
addCardButton.addEventListener("click", () => {
    cardValidator.resetValidation();
    cardPopup.open();
});
// Carga inicial: primero se necesita el id del usuario para saber
// qué tarjetas son suyas, por eso las tarjetas se renderizan después
async function loadInitialData() {
    try {
        const [userData, initialCards] = await Promise.all([
            api.getUserInfo(),
            api.getInitialCards(),
        ]);
        userInfo.setUserInfo(userData);
        cardSection.renderItems(initialCards);
    }
    catch (err) {
        console.error("Fallo al cargar datos iniciales:", err);
    }
}
loadInitialData();
//# sourceMappingURL=index.js.map