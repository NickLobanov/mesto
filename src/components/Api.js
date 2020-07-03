export class Api {
    constructor(baseUrl) {
        this._baseUrl = baseUrl;
        this._token = '226a3b48-5e66-4b0b-a28d-c1cfea729696'
    }

    get(url) {
        return fetch(this._baseUrl + url, {
            method: 'GET',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                if(res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`)
            })
            .catch((err) => {
                console.log(err)
            })
            
    }

    patch(url, values) {
        return fetch(this._baseUrl + url, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: values.name,
                about: values.description
            })
        })
            .then(res => {
                if(res.ok) {
                    return res.json()
                }
                return Promise.reject(`Ошибка: ${res.status}`)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    patchAvatar(url, values) {
        return fetch(this._baseUrl + url, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: values.link
            })
        })
            .then(res => {
                if(res.ok) {
                    return res.json()
                }
                return Promise.reject(`Ошибка: ${res.status}`)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    post(url, values) {
        return fetch(this._baseUrl + url, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: values.title,
                link: values.url
            })
        })
            .then(res => {
                if(res.ok) {
                    return res.json()
                }
                return Promise.reject(`Ошибка: ${res.status}`)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    delete(url) {
        return fetch(this._baseUrl + url, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if(res.ok) {
                    return res.json()
                }
                return Promise.reject(`Ошибка: ${res.status}`)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    put(url) {
        return fetch(this._baseUrl + url, {
            method: 'PUT',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if(res.ok) {
                    return res.json()
                }
                return Promise.reject(`Ошибка: ${res.status}`)
            })
            .catch((err) => {
                console.log(err)
            })
    }

}