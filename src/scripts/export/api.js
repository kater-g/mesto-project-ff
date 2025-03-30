export const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-35",
  headers: {
    authorization: "7d3479a9-b3a4-4ebe-9dbb-b115b05a7b60",
    "Content-Type": "application/json",
  },
};

export const selfProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export function editSelfProfile(nameInput, jobInput, loading, button) {
  fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: nameInput,
      about: jobInput,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .finally(() => {
      loading(false, button);
    });
}

export const updateImageProfile = (avatarProfile, loading, button) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarProfile,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .finally(() => {
      loading(false, button);
    });
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export function postOwnCard(
  newCard,
  imagePopup,
  likeCard,
  myId,
  deleteCard,
  placesContainer,
  createCard,
  loading,
  button
) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(newCard),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((data) => {
      placesContainer.prepend(
        createCard(data, imagePopup, likeCard, myId, deleteCard)
      );
    })
    .finally(() => {
      loading(false, button);
    })
    .catch((err) => {
      console.log(err);
    });
}

export function deleteOwnCard(cardId, card) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      card.remove();
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export function putLike(cardId, likesCount, likeButton) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((data) => {
      likesCount.textContent = data.likes.length;
      likeButton.classList.add("card__like-button_is-active");
    })
    .catch((err) => {
      console.log(err);
    });
}

export function deleteLike(cardId, likesCount, likeButton) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((data) => {
      likeButton.classList.remove("card__like-button_is-active");
      likesCount.textContent = data.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
}
