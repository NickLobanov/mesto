export class Popup {
    constructor(popupSelector) {
        this._popupSelector = document.querySelector(popupSelector);
        this._handleEscClose = (evt) => {
            if (evt.key === 'Escape') {
                this.close();
            }
        }
    }

    open() {
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keyup', this._handleEscClose);
    }

    close() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keyup', this._handleEscClose);
    }

    setEventListener() {
        this._popupSelector.querySelector('.popup__close-icon').addEventListener('click', () => {
            this.close()
        })
    }


}

