export function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  const button = config.submitButtonSelector;
  const inputClass = config.inputSelector;
  const inputErrorClassVisible = config.inputErrorClass;
  const errorClassVisible = config.errorClass;

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(
      formElement,
      button,
      inputClass,
      inputErrorClassVisible,
      errorClassVisible
    );
  });
}

function setEventListeners(
  formElement,
  button,
  inputClass,
  inputErrorClassVisible,
  errorClassVisible
) {
  const inputList = Array.from(formElement.querySelectorAll(`${inputClass}`));
  const buttonElement = formElement.querySelector(button);
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(
        formElement,
        inputElement,
        inputErrorClassVisible,
        errorClassVisible
      );
      toggleButtonState(inputList, buttonElement);
    });
  });
}

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
};

function checkInputValidity(
  formElement,
  inputElement,
  inputErrorClassVisible,
  errorClassVisible
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  const errorMessage = inputElement.dataset.errorMessage;

  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(
      inputElement,
      inputErrorClassVisible,
      errorElement,
      errorClassVisible
    );
  } else {
    hideInputError(
      inputElement,
      inputErrorClassVisible,
      errorElement,
      errorClassVisible
    );
  }
}

function showInputError(
  inputElement,
  inputErrorClassVisible,
  errorElement,
  errorClassVisible
) {
  inputElement.classList.add(`${inputErrorClassVisible}`);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(`${errorClassVisible}`);
}

function hideInputError(
  inputElement,
  inputErrorClassVisible,
  errorElement,
  errorClassVisible
) {
  inputElement.classList.remove(`${inputErrorClassVisible}`);
  errorElement.textContent = "";
  errorElement.classList.add(`${errorClassVisible}`);
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

export function clearValidation(form, config) {
  const formInputs = form.querySelectorAll(`${config.inputSelector}`);
  const errorClass = config.errorClass;
  const inputErrorClass = config.inputErrorClass;
  const errorElements = form.querySelectorAll(".popup__input-error");
  const submitButton = form.querySelector(`${config.submitButtonSelector}`);

  formInputs.forEach((formInputElement) => {
    formInputElement.classList.remove(inputErrorClass);
    if (
      formInputElement.length >= 1 &&
      formInputElement.classList.contains(`${inputErrorClass}`)
    ) {
      formInputElement.value = "";
      formInputElement.classList.remove(inputErrorClass);
    } else {
      formInputElement.classList.remove(inputErrorClass);
    }
  });

  errorElements.forEach((errorElement) => {
    errorElement.classList.remove(errorClass);
    errorElement.textContent = "";
  });

  submitButton.disabled = true;
}
