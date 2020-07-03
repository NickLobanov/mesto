import {Popup} from './Popup.js';
import {Api} from './Api.js'

export class PopupConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._popupButton = this._popupSelector.querySelector('.popup__button')
        this._api = new Api('https://mesto.nomoreparties.co/v1/cohort-12/cards/')
    }

    open(cardId, element) {
        this._cardId = cardId;
        console.log(this._cardId)
        console.log(element)
        this._popupButton.addEventListener('click', (evt) => {
            evt.preventDefault()
            this._api.delete(cardId)
            .then(res => {
                console.log(res.ok) 
                element.remove()
            })
            .finally(() => this.close())
        })
        super.open()
    }

    close() {
        super.close();
    }
}