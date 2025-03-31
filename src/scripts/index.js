import "../pages/index.css";

import { createCard, deleteCard, likeCard } from "./export/card.js";
import {
  openModal,
  closeModal,
  setClickOnOverlayToCloseModal,
} from "./export/modal.js";
import {
  selfProfile,
  editSelfProfile,
  updateImageProfile,
  postOwnCard,
  getInitialCards,
} from "./export/api.js";
import { enableValidation, clearValidation } from "./export/validation.js";

const placesContainer = document.querySelector(".places__list");
const editProfileButton = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector(".popup_type_edit");
const nameProfile = document.querySelector(".profile__title");
const jobProfile = document.querySelector(".profile__description");
const addCardButton = document.querySelector(".profile__add-button");
const editProfileForm = document.forms["edit-profile"];
const nameInput = editProfileForm.elements.name;
const jobInput = editProfileForm.elements.description;
const editProfilePopupButton = editProfileForm.querySelector(".popup__button");
const newCardPopup = document.querySelector(".popup_type_new-card");
const addCardForm = document.forms["new-place"];
const addCardPopupButton = addCardForm.querySelector(".popup__button");
const addCardNameInput = addCardForm.elements["place-name"];
const addCardLinkInput = addCardForm.elements.link;
const allPopups = document.querySelectorAll(".popup");
const imgPopup = document.querySelector(".popup_type_image");
const image = imgPopup.querySelector(".popup__image");
const imageCaption = imgPopup.querySelector(".popup__caption");
const imageProfilePopup = document.querySelector(".popup_type_profile-image");
const imageProfileContainer = document.querySelector(".profile__image");
const imageProfile = document.querySelector(".profile__update_image");
const editProfileImageForm = document.forms["edit-image"];
const imageProfilePopupButton =
  editProfileImageForm.querySelector(".popup__button");

const defaultValueForSubmitButtons = "Сохранить";
const valueForLoadingSubmitButtons = "Сохранение...";

//Настройки валидации форм
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

//Вызов валидации
enableValidation(validationConfig);

//Запросы на сервер
const profileConfig = selfProfile();
const cardsConfig = getInitialCards();

//Переменная для глобального хранения ID профиля
let myId;

//Промисы запросов
Promise.all([profileConfig, cardsConfig])
  .then(([userData, cardsData]) => {
    myId = userData._id;

    nameProfile.textContent = userData.name;
    jobProfile.textContent = userData.about;
    imageProfile.src = userData.avatar;

    const newInitialCards = cardsData;

    newInitialCards.forEach((cardData) => {
      const newCards = createCard(
        cardData,
        imagePopup,
        likeCard,
        myId,
        deleteCard
      );
      placesContainer.append(newCards);
    });
  })
  .catch((err) => {
    console.log(err);
  });

//Навешываем слушатель на крестик каждого попапа,
//добавляем плавное открытие и закрытие окна,
//добавляем закрытие по клику за пределами попапа
allPopups.forEach((item) => {
  item.classList.add("popup_is-animated");
  item.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("popup__close")) {
      closeModal(item);
    }
  });
  item.addEventListener("mousedown", setClickOnOverlayToCloseModal);
});

//Слушатель кнопки для редактирование профиля
editProfileButton.addEventListener("click", () => {
  const nameProfileContent = nameProfile.textContent;
  const jobProfileContent = jobProfile.textContent;

  nameInput.placeholder = nameProfileContent;
  jobInput.placeholder = jobProfileContent;

  openModal(profilePopup);
  clearValidation(editProfileForm, validationConfig);
  editProfileForm.reset();
});

//Слушатель кнопки для добавление карточки
addCardButton.addEventListener("click", () => {
  openModal(newCardPopup);
  clearValidation(addCardForm, validationConfig);
});

//Слушатель для обновления аватара пользователя
imageProfileContainer.addEventListener("click", () => {
  openModal(imageProfilePopup);
  clearValidation(editProfileImageForm, validationConfig);
});

//Функция отправки формы для обновления аватара пользователя
function handleProfileImageFormSubmit(evt) {
  const imageLinkInput = editProfileImageForm.elements["link"].value;
  const avatarProfile = imageLinkInput;

  evt.preventDefault();

  contentLoading(true, imageProfilePopupButton, valueForLoadingSubmitButtons);

  updateImageProfile(avatarProfile)
    .then((res) => {
      res.avatar = avatarProfile;
      imageProfile.src = res.avatar;
      closeModal(imageProfilePopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      contentLoading(false, imageProfilePopupButton);
    });

  editProfileImageForm.reset();
}

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

  contentLoading(true, editProfilePopupButton, valueForLoadingSubmitButtons);

  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;

  editSelfProfile(nameProfile.textContent, jobProfile.textContent)
    .then((res) => {
      res.name = nameProfile.textContent;
      res.about = jobProfile.textContent;
      closeModal(profilePopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      contentLoading(false, editProfilePopupButton);
    });
}

//Функция отправки формы добавления карточки
function handleCardFormSubmit(evt) {
  const nameCardInput = addCardNameInput.value;
  const linkCardInput = addCardLinkInput.value;

  const newCard = {
    name: nameCardInput,
    link: linkCardInput,
  };

  evt.preventDefault();

  contentLoading(true, addCardPopupButton, valueForLoadingSubmitButtons);

  postOwnCard(newCard)
    .then((res) => {
      placesContainer.prepend(
        createCard(res, imagePopup, likeCard, myId, deleteCard)
      );
      closeModal(newCardPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      contentLoading(false, addCardPopupButton);
    });
  addCardForm.reset();
}

//Функция изменения значения кнопки при загрузке контента
function contentLoading(isLoading, button, buttonText) {
  if (isLoading) {
    button.textContent = buttonText;
  } else {
    button.textContent = defaultValueForSubmitButtons;
  }
}

//Навешивание слушателя на форму редактирования профиля
editProfileForm.addEventListener("submit", handleProfileFormSumbit);

//Навешивание слушателя на форму добавления карточки
addCardForm.addEventListener("submit", handleCardFormSubmit);

//Навешивания слушателя на форму обновления аватара профиля
editProfileImageForm.addEventListener("submit", handleProfileImageFormSubmit);
