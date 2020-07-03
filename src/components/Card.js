import {Api} from './Api.js'

export class Card {
    constructor({name, link, cardSelector, handleCardClick, handleBusketClick, cardId, myId, ownerId, like}) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleBasketClick = handleBusketClick;
        this._cardId = cardId;
        this._myId = myId;
        this._ownerId = ownerId;
        this._like = like;
        this._api = new Api('https://mesto.nomoreparties.co/v1/cohort-12/');
        this._element = this.cardGenerate()
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
        this._element.querySelector('.article__like-amount').textContent = this._like.length;
        this._setEventListeners()
        if (this._ownerId === this._myId) {
            this._element.querySelector('.article__basket').classList.add('article__basket_active')
        }
        this._like.some(item => {
            if (item._id === this._myId) {
                this._element.querySelector('.article__like').classList.add('article__like_active')
            }
        })
        return this._element;
    }   

    _setEventListeners() {
        this._element.querySelector('.article__like').addEventListener('click', (evt) => {
            this._handleLikeClick(evt);
        })

        this._element.querySelector('.article__basket').addEventListener('click', () => {
            this._handleBasketClick(this._cardId, this._element);
        })
        this._element.querySelector('.article__foto').addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        })
    }

    _handleLikeClick(evt) {
        if(!evt.target.classList.contains('article__like_active')) {
            this._api.put(`cards/likes/${this._cardId}`)
                .then(data => {
                    this._element.querySelector('.article__like-amount').textContent = data.likes.length;
                })
                evt.target.classList.add('article__like_active')
        } else {
            this._api.delete(`cards/likes/${this._cardId}`).then(data => {
                this._element.querySelector('.article__like-amount').textContent = data.likes.length;
            })  
            this._element.querySelector('.article__like').classList.remove('article__like_active')
        }
        
    }

}