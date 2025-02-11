const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

function cardValue(element) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = element.link;
  cardElement.querySelector(".card__image").alt = element.name;
  cardElement.querySelector(".card__title").textContent = element.name;

  placesList.append(cardElement);
}

function addCard(card, deleteCard) {
  card.forEach(cardValue);

  const deleteButton = document.querySelectorAll(".card__delete-button");

  deleteButton.forEach((button) => {
    button.addEventListener("click", deleteCard);
  });
}

function removeCard() {
  const item = this.parentElement;

  item.parentNode.removeChild(item);
}

addCard(initialCards, removeCard);
