import {Popup} from './Popup.js';
import {Api} from './Api.js'

export class PopupConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._popupButton = this._popupSelector.querySelector('.popup__button')
        this._api = new Api('https://mesto.nomoreparties.co/v1/cohort-12/cards/')
    }

    _renderLoading(isLoading) {
        if(isLoading) {
            this._popupButton.setAttribute('disabled', true)
            this._popupButton.textContent = 'Удаление..'
        } else {
            this._popupButton.removeAttribute('disabled')
            this._popupButton.textContent = 'Да'
        }
    }
    open(cardId, element) {
        this._cardId = cardId;
        this._popupButton.addEventListener('click', (evt) => {
            evt.preventDefault()
            this._renderLoading(true)
            this._api.delete(cardId)
            .then(() => {
                element.remove()
            })
            .finally(() => {
                this.close()
                this._renderLoading(false)
            })
        })
        super.open()
    }

    close() {
        super.close();
    }
}