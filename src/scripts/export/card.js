//Функция создания карточки
export function createCard(cards, removeCard, imageFullScreen, likeCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardName = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = cards.link;
  cardImage.alt = cards.name;
  cardName.textContent = cards.name;

  deleteButton.addEventListener("click", () => {
    removeCard(deleteButton);
  });

  cardImage.addEventListener("click", () => {
    imageFullScreen(cardImage);
  });

  cardLikeButton.addEventListener("click", likeCard);

  return cardElement;
}

//Функция удаления карточки
export function deleteCard(element) {
  const cardToDelete = element.closest(".card");

  cardToDelete.remove();
}

//Функция "лайка" карточки
export function likeCard(element) {
  if (element.target.classList.contains("card__like-button")) {
    element.target.classList.toggle("card__like-button_is-active");
  }
}
