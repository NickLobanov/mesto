import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
    constructor({popupSelector, submitForm}) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._handleSubmit = (evt) => {
            evt.preventDefault();
            this._submitForm(this._getInputValues());
            this.close()
        }
    }

    _getInputValues() {
        this._inputList = this._popupSelector.querySelectorAll('.popup__input');
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
    }

    setEventListeners() {
        this._popupSelector.querySelector('.popup__form').addEventListener('submit', this._handleSubmit)
    }

    close() {
        super.close();
        this._formElement = this._popupSelector.querySelector('.popup__form');
        this._formElement.removeEventListener('submit', this._handleSubmit)
        this._formElement.reset();
    }
}