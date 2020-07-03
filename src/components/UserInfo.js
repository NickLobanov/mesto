import {Api} from './Api.js'

export class UserInfo {
    constructor({name, description}, avatar) {
        this._inputName = name;
        this._inputDescription = description;
        this._avatar = avatar;
        this._api = new Api('https://mesto.nomoreparties.co/v1/cohort-12/');
    }
    getUserInfo() {
        return {
            name: this._inputName.textContent,
            description: this._inputDescription.textContent
        }
    }

    getUserAvatar() {
        return {
            link: this._avatar.getAttribute('src')
        }
    }

    editUserAvatar(url,values) {
        return this._api.patchAvatar(url, values)
    }

    setUserInfo(values) {
        return this._api.patch('users/me', values)
    }

    getUserProfile() {
        return this._api.get('users/me').then(data => {
            this._inputName.textContent = data.name;
            this._inputDescription.textContent =  data.about;
            this._avatar.setAttribute('src', data.avatar);
            return data._id
        })
    }

}