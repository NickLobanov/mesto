export class UserInfo {
    constructor({name, description}) {
        this._inputName = name;
        this._inputDescription = description;
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
}