import {Popup} from './Popup.js';


export class PopupConfirm extends Popup {
    constructor(popupSelector, renderLoading) {
        super(popupSelector);
        this._renderLoading = renderLoading;
        this._popupButton = this._popupSelector.querySelector('.popup__button')
    }

    open(cardId, element, api) {
        this._cardId = cardId;
        this._popupButton.addEventListener('click', (evt) => {
            evt.preventDefault()
            this._renderLoading(this._popupButton, true, 'Удаление...')
            api.delete(`cards/${cardId}`)
            .then(() => {
                element.remove()
            })
            .finally(() => {
                this.close()
                this._renderLoading(this._popupButton, false, 'Удалить')
            })
        })
        super.open()
    }

    close() {
        super.close();
    }
}