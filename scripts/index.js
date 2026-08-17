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
initialCards.forEach(function (card) {
  console.log(card.name);
});

// Selección de elementos principales

const buttonProfileEdit = document.querySelector(".profile__edit-button");
const modalPopup = document.querySelector("#edit-popup");
const buttonModalClose = modalPopup.querySelector(".popup__close");

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}
function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

buttonModalClose.addEventListener("click", () => closeModal(modalPopup));

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nombreInput = document.querySelector(".popup__input_type_name");
const descripcionInput = document.querySelector(
  ".popup__input_type_description",
);

function fillProfileForm() {
  nombreInput.value = profileTitle.textContent;
  descripcionInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(modalPopup);
}
buttonProfileEdit.addEventListener("click", handleOpenEditModal);

const formElement = document.querySelector("#edit-profile-form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nombreInput.value;
  profileDescription.textContent = descripcionInput.value;
  closeModal(modalPopup);
}
formElement.addEventListener("submit", handleProfileFormSubmit);
