export class UserInfo {
    constructor({name, description}) {
        this._inputName = name;
        this._inputDescription = description;
        this._name = document.querySelector('.profile__name');
        this._description = document.querySelector('.profile__description')
    }
    getUserInfo() {
        this._inputName.value = this._name.textContent;
        this._inputDescription.value = this._description.textContent;
    }

    setUserInfo(values) {
        this._name.textContent = values.name;
        this._description.textContent =  values.description;
    }
}