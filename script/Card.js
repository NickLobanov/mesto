export class Card {
    constructor({name, link, cardSelector, handleCardClick}) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
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
        this._elementFoto = this._element.querySelector('.article__foto')
        this._elementFoto.src = this._link;
        this._elementFoto.alt = this._name;
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
        this._element.querySelector('.article__foto').addEventListener('click', (evt) => {
            this._handleCardClick(evt);
        })
    }

    _handleLikeClick() {
        this._element.querySelector('.article__like').classList.toggle('article__like_active')
    }

    _handleBasketClick() {
        this._element.querySelector('.article__basket').closest('.article').remove();
    }

}