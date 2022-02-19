class Api {
  constructor({ baseUrl, headers }) {
      this._baseUrl = baseUrl;
      this._headers = headers;
  }
  _checkResponse(res) {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}
  getInitialCards() {
      return fetch(`${this._baseUrl}cards`, {
          headers: this._headers
      })
          .then(this._checkResponse)
  }

  getUserInfo() {
      return fetch(`${this._baseUrl}users/me`, {
          headers: this._headers
      })
          .then(this._checkResponse)
  }

  changeUserInfo(data) {
      return fetch(`${this._baseUrl}users/me`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({ name: data.name, about: data.about })
      })
          .then(this._checkResponse)
  }

  changeUserAvatar(data) {
      return fetch(`${this._baseUrl}users/me/avatar`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({ avatar: data.avatar })
      })
          .then(this._checkResponse)
  }

  addCard(data) {
      return fetch(`${this._baseUrl}cards`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify({ name: data.name, link: data.link })
      })
          .then(this._checkResponse)
  }

  deleteCard(data) {
      return fetch(`${this._baseUrl}cards/${data}`, {
          method: 'DELETE',
          headers: this._headers
      })
          .then(this._checkResponse)
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}cards/likes/${cardId}`, {
      method: (isLiked ? "PUT" : "DELETE"),
      headers: this._headers,
    })
    .then(this._checkResponse)
  }
  } 

const api = new Api ({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-32/',
  headers: {
      'Content-Type': 'application/json',
      authorization: 'c8ac5435-19ae-40ca-be01-a8b8eb11b753'}
})

export default api