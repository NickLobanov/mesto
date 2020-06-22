import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }
    open(evt) {
        const imageSrc = evt.target.getAttribute('src');
        const imageAlt = evt.target.getAttribute('alt');
        this._popupImageElement =  this._popupSelector.querySelector('.open-popup__image')
        this._popupImageElement.setAttribute('src', imageSrc);
        this._popupImageElement.setAttribute('alt', imageAlt);
        this._popupSelector.querySelector('.open-popup__text').textContent = imageAlt;

        super.open();
    }
}