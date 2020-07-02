import {Popup} from './Popup.js';

export class PopupConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._popupButton = this._popupSelector.querySelector('.popup__button')
        this._handleSubmit = (evt) => {
            evt.preventDefault();
            this._submitForm(this._getInputValues());
            this.close()
        }
    }

    open() {
        this._popupButton.addEventListener('click', this._handleSubmit)
        super.open()
    }

    close() {
        super.close();
        this._popupButton.removeEventListener('click', this._handleSubmit)
    }
}