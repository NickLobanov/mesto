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

}