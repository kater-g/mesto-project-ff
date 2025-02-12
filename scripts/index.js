const placesContainer = document.querySelector(".places__list");

function createCard(cards, deleteCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardName = cardElement.querySelector(".card__title");

  cardImage.src = cards.link;
  cardImage.alt = cards.name;
  cardName.textContent = cards.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", () => {
    deleteCard(deleteButton);
  });

  return cardElement;
}

function removeCard(element) {
  const cardToDelete = element.closest(".card");

  cardToDelete.remove();
}

initialCards.forEach((cardData) => {
  const newCards = createCard(cardData, removeCard);
  placesContainer.append(newCards);
});
