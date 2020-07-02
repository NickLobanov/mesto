export class Api {
    constructor(baseUrl) {
        this._baseUrl = baseUrl;
        this._token = '226a3b48-5e66-4b0b-a28d-c1cfea729696'
    }

    get() {
        return fetch(this._baseUrl, {
            method: 'GET',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                return data;
            })
            
    }

    patch(values) {
        return fetch(this._baseUrl, {
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
                return res.json()
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
                return res.json()
            })
    }

    post(values) {
        return fetch(this._baseUrl, {
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
                return res.json()
            })
    }

}