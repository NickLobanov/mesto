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
        this.setEventListener()
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keyup', this._handleEscClose);
    }

    close() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keyup', this._handleEscClose);
    }

    setEventListener() {
        this._popupSelector.addEventListener('click', (evt) => {
            this._handleClick(evt);
        })
    }

    _handleClick(evt) {
        if (evt.target.classList.contains('popup__close-icon') || (evt.target.classList.contains('popup'))) {
            this.close();
        }
    }

}

