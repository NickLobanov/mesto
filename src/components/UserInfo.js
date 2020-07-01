import {Api} from './Api.js'

export class UserInfo {
    constructor({name, description}, avatar) {
        this._inputName = name;
        this._inputDescription = description;
        this._avatar = avatar;
        this._api = new Api('https://mesto.nomoreparties.co/v1/cohort-12/users/me');
    }
    getUserInfo() {
        return {
            name: this._inputName.textContent,
            description: this._inputDescription.textContent
        }
    }

    setUserInfo(values) {
        this._inputName.textContent = values.name;
        this._inputDescription.textContent =  values.description;
    }

    getUserProfile() {
        this._api.get().then(data => {
            this._inputName.textContent = data.name;
            this._inputDescription.textContent =  data.about;
            this._avatar.setAttribute('src', data.avatar)
        })
    }
}