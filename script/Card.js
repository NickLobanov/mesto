export class Card {
    constructor(name, link, cardSelector) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const templateElem = document.querySelector(this._cardSelector)
        .content
        .cloneNode(true)
        return templateElem;
    }

    cardGenerate() {
        this._element = this._getTemplate();
        this._element.querySelector('.article__foto').src = this._link;
        this._element.querySelector('.article__foto').alt = this._name;
        this._element.querySelector('.article__name').textContent = this._name;
        
        return this._element;
    }   
}