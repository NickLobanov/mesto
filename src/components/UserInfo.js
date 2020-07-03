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
        this._api.patchAvatar(url, values).then(data => {
            this._avatar.setAttribute('src', data.avatar)
        })
    }

    setUserInfo(values) {
        this._api.patch(values).then(data => {
            this._inputName.textContent = data.name;
            this._inputDescription.textContent = data.about;
        });
        
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