import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }
    open(name, link) {
        this._popupImageElement =  this._popupSelector.querySelector('.open-popup__image')
        this._popupImageElement.setAttribute('src', link);
        this._popupImageElement.setAttribute('alt', name);
        this._popupSelector.querySelector('.open-popup__text').textContent = name;

        super.open();
    }
}