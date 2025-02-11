const placesContainer = document.querySelector(".places__list");

function addCard(cards, deleteCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardName = cardElement.querySelector(".card__title");

  cardImage.src = cards.link;
  cardImage.alt = cards.name;
  cardName.textContent = cards.name;

  placesContainer.append(cardElement);
  const deleteButton = document.querySelectorAll(".card__delete-button");

  deleteButton.forEach((button) => {
    button.addEventListener("click", deleteCard);
  });
}

function removeCard() {
  const item = document.querySelector(".card__delete-button");
  const itemParent = item.closest(".card");

  itemParent.remove();
}

for (let i = 0; i < initialCards.length; i++) {
  addCard(initialCards[i], removeCard);
}
