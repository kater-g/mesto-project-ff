//Функция открытия попапа
export function openModal(popup) {
  popup.classList.add("popup_is-opened", "popup_is-animated");
  document.addEventListener("keydown", setEscToCloseModal);
  document.addEventListener("mousedown", (e) => {
    setClickOnOverlayToCloseModal(e, popup);
  });
}

//Функция закрытия попапа
export function closeModal(popup) {
  popup.classList.remove("popup_is-opened", "popup_is-animated");
  document.removeEventListener("keydown", setEscToCloseModal);
  document.removeEventListener("mousedown", (e) => {
    setClickOnOverlayToCloseModal(e, popup);
  });
}

//Функция закрытия попапа при нажатии на ESC
export function setEscToCloseModal(e) {
  if (e.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    if (popup) {
      closeModal(popup);
    }
  }
}

//Функция закрытия попапа при клике по области
export function setClickOnOverlayToCloseModal(e, modal) {
  if (e.target.classList.contains("popup_is-opened")) {
    closeModal(modal);
  }
}
