export default class Api {
    constuctor({ baseUrl, headers }) {
        this._url = baseUrl;
        this._headers = headers;
    }

_addResult(res) {
    if (res.ok) {
        return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};

getInitialCards() {
    return fetch (`${this._url}/cards`, {
        method: 'GET',
        headers: this._headers,
      }).then((res) => this._addResult(res))
    };

    addNewCard(link, name) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',

            headers: this._headers,

            body: JSON.stringify({
                name: name,
                link: link,
            }),
        }).then((res) => this._addResult(res))
    };

    deleteCard(cardId) {
        return fetch (`${this.url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        }).then((res) => this._addResult(res))
    };

    addLike(id) {
        return fetch (`${this._url}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this._headers,
        }).then((res) => this._addResult(res))
    };

    deleteLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        }).then((res) => this._addResult(res))
    };

    getUserInfo(name, info) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: info,
            }),
        }).then((res) => this._addResult(res))
    };

    editUserInfo(name, info) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: info,
            }),
        }).then((res) => this.addResult(res))
       };

       editUserAvatar(url) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: url,
            }),
        }).then((res) => this._addResult(res))
       }
    };