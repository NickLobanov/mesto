class Popup {
    constructor(popupSelector) {
        this._popupSelector = document.querySelector(popupSelector)
    }

    open() {
        this._popupSelector.classList.add('popup_opened')
    }

    close() {
        this._popupSelector.classList.remove('popup_opened')
    }
}