import "../pages/index.css";

import { initialCards } from "./export/cards.js";
import { createCard, deleteCard, likeCard } from "./export/card.js";
import { openModal, closeModal, setClickOnOverlayToCloseModal } from "./export/modal.js";

const placesContainer = document.querySelector(".places__list");
const editProfileButton = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector(".popup_type_edit");
const nameProfile = document.querySelector(".profile__title");
const jobProfile = document.querySelector(".profile__description");
const addCardButton = document.querySelector(".profile__add-button");
const editProfileForm = document.forms["edit-profile"];
const nameInput = editProfileForm.elements.name;
const jobInput = editProfileForm.elements.description;
const newCardPopup = document.querySelector(".popup_type_new-card");
const addCardForm = document.forms["new-place"];
const allPopups = document.querySelectorAll(".popup");
const imgPopup = document.querySelector(".popup_type_image");
const image = imgPopup.querySelector(".popup__image");
const imageCaption = imgPopup.querySelector(".popup__caption");

//Навешываем слушатель на крестик каждого попапа,
//добавляем плавное открытие и закрытие окна,
//добавляем закрытие по клику за пределами попапа
allPopups.forEach((item) => {
  item.classList.add('popup_is-animated');
  item.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("popup__close")) {
      closeModal(item);   
    } 
  });
  item.addEventListener("mousedown", setClickOnOverlayToCloseModal);
});

//Добавление карточек при загрузке страницы
initialCards.forEach((cardData) => {
  const newCards = createCard(cardData, deleteCard, imagePopup, likeCard);
  placesContainer.append(newCards);
});

//Редактирование профиля по кнопке
editProfileButton.addEventListener("click", () => {
  const nameProfileContent = nameProfile.textContent;
  const jobProfileContent = jobProfile.textContent;

  nameInput.placeholder = nameProfileContent;
  jobInput.placeholder = jobProfileContent;

  openModal(profilePopup);
  editProfileForm.reset();
});

//Добавление карточки по кнопке
addCardButton.addEventListener("click", () => {
  openModal(newCardPopup);
});

//Функция для реализации попапа картинки
function imagePopup(item) {
  image.src = item.src;
  image.alt = item.alt;
  imageCaption.textContent = item.alt;

  openModal(imgPopup);
}

//Функция отправки формы редактирования профиля
function handleProfileFormSumbit(evt) {
  evt.preventDefault();

  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;

  nameInput.value = "";
  jobInput.value = "";

  closeModal(profilePopup);
}

//Функция отправки формы добавления карточки
function handleCardFormSubmit (evt) {
  const nameCardInput = addCardForm.elements["place-name"].value;
  const linkCardInput = addCardForm.elements["link"].value;
  const newCard = {
    name: nameCardInput,
    link: linkCardInput,
  };

  evt.preventDefault();

  placesContainer.prepend(
    createCard(newCard, deleteCard, imagePopup, likeCard)
  );

  closeModal(newCardPopup);
  addCardForm.reset();
}

//Навешивание слушателя на форму редактирования профиля
editProfileForm.addEventListener("submit", handleProfileFormSumbit);

//Навешивание слушателя на форму добавления карточки
addCardForm.addEventListener("submit", handleCardFormSubmit);