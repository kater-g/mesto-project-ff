//Функция открытия попапа
export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", setEscToCloseModal);
}

//Функция закрытия попапа
export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", setEscToCloseModal);
}

//Функция закрытия попапа при нажатии на ESC
function setEscToCloseModal(evt) {
  if (evt.key === "Escape") {
   const popup = document.querySelector(".popup_is-opened");
   if (popup) {
      closeModal(popup);
    }
  }
} 

//Функция закрытия попапа при клике по области
export function setClickOnOverlayToCloseModal(evt) {
  if (evt.target.classList.contains("popup_is-opened")) {
    closeModal(evt.target);
  }
} 
