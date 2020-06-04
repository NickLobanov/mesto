export class Card {
    constructor(name, link, cardSelector) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const templateElem = document.querySelector(this._cardSelector)
        .content
        .querySelector('.article')
        .cloneNode(true)
        return templateElem;
    }

    cardGenerate() {
        this._element = this._getTemplate();
        this._element.querySelector('.article__foto').src = this._link;
        this._element.querySelector('.article__foto').alt = this._name;
        this._element.querySelector('.article__name').textContent = this._name;
        this._setEventListeners()

        return this._element;
    }   

    _setEventListeners() {
        this._element.querySelector('.article__like').addEventListener('click', () => {
            this._handleLikeClick();
        })

        this._element.querySelector('.article__basket').addEventListener('click', () => {
            this._handleBasketClick();
        })
    }

    _handleLikeClick() {
        this._element.querySelector('.article__like').classList.toggle('article__like_active')
    }

    _handleBasketClick() {
        this._element.querySelector('.article__basket').closest('.article').remove();
    }

}