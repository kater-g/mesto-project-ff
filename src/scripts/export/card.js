import { deleteOwnCard, putLike, deleteLike } from "./api.js";

//Функция создания карточки
export function createCard(
  card,
  imageFullScreen,
  likeCard,
  userId,
  removeCard
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardName = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikesCount = cardElement.querySelector(".card__likes-count");

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardName.textContent = card.name;
  cardLikesCount.textContent = card.likes.length;

  const isLikedByMe = checkLike(card, userId);

  if (isLikedByMe) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  cardLikeButton.addEventListener("click", () => {
    likeCard(cardLikeButton, card._id, cardLikesCount, userId);
  });

  if (card.owner._id == userId) {
    deleteButton.addEventListener("click", () => {
      removeCard(deleteButton, card._id);
    });
  } else {
    deleteButton.remove();
  }

  cardImage.addEventListener("click", () => {
    imageFullScreen(cardImage);
  });

  return cardElement;
}

//Проверка на наличие лайка
function checkLike(card, userId) {
  return card.likes.some((like) => like._id === userId);
}

//Функция удаления карточки
export function deleteCard(button, cardId) {
  const closestCard = button.closest(".card");

  deleteOwnCard(cardId, closestCard);
}

//Функция "лайка" карточки
export function likeCard(likeButton, cardId, likesCount) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");

  if (!isLiked) {
    putLike(cardId, likesCount, likeButton);
  } else {
    deleteLike(cardId, likesCount, likeButton);
  }
}
