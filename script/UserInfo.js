export class UserInfo {
    constructor({name, description}) {
        this._inputName = name;
        this._inputDescription = description;
    }
    getUserInfo() {
        this._inputName = profileName.textContent;
        this._inputDescription = profileDescription.textContent;
    }

    setUserInfo(values) {
        this._inputName.textContent = values.name;
        this._inputDescription.textContent =  values.description;
    }
}