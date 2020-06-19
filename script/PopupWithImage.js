import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }
    open(evt) {
        const imageSrc = evt.target.getAttribute('src');
        const imageAlt = evt.target.getAttribute('alt');
        this._popupSelector.querySelector('.open-popup__image').setAttribute('src', imageSrc);
        this._popupSelector.querySelector('.open-popup__image').setAttribute('alt', imageAlt);
        this._popupSelector.querySelector('.open-popup__text').textContent = imageAlt;
    
        super.open();
    }
}