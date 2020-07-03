import './index.css'
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import {Api} from '../components/Api.js'
import { PopupConfirm } from '../components/PopupConfirm';

//Объект с селекторами для настройки валидации
const formConfig = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_type_active'
  }

//создание класса Api
const indentifier = 'cohort-12'
const api = new Api(`https://mesto.nomoreparties.co/v1/${indentifier}/`)

//данные пользователя 
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__foto')

//Находим поля формы edit
const popupEdit = document.querySelector('.popup__edit');
const formEdit = popupEdit.querySelector('.popup__form');
const popupEditName = popupEdit.querySelector('.popup__input_type_title');
const popupEditDescription = popupEdit.querySelector('.popup__input_type_description');

//Поля формы avatar
const popupAvatar = document.querySelector('.popup__avatar');
const formAvatar = popupAvatar.querySelector('.popup__form');
const inputAvatarLink = formAvatar.querySelector('.popup__input_type_title');

//Находим поля формы add
const popupAdd = document.querySelector('.popup__add');
const formAdd = popupAdd.querySelector('.popup__form');

//Создания классов валидации
const formEditValidation = new FormValidator(formConfig, formEdit);
const formAddValidation = new FormValidator(formConfig, formAdd);
const formAvatarVAlidator = new FormValidator(formConfig, formAvatar);
//Создание класса Section
const cardList = new Section('.elements')

const userInfo = new UserInfo({
    name: profileName,
    description: profileDescription
}, profileAvatar)

userInfo.getUserProfile().then(id => {
    api.get('cards').then(data => {
        data.forEach(item => {
            const card = new Card({
                name: item.name,
                link: item.link,
                like: item.likes,
                cardId: item._id,
                myId: id,
                ownerId: item.owner._id,
                cardSelector: '#article__template',
                handleCardClick: (name, link) => {
                    popupWithImage.open(name, link);
                },
                handleBusketClick: (cardId, element) => {
                    popupConfirm.open(cardId, element)
                }});
            const cardElement = card.cardGenerate();
            cardList.setItem(cardElement);  
        }) 
    })
});
//Добавление всех карточек



//Создание классов Popup
const popupWithImage = new PopupWithImage('.popup__image');
const popupConfirm = new PopupConfirm('.popup__confirm')

const popupWithFormEdit = new PopupWithForm({
    popupSelector: '.popup__edit',
    submitForm: (values) => {
        userInfo.setUserInfo(values);
    }
})

const popupWithFormAdd = new PopupWithForm({
    popupSelector: '.popup__add',
    submitForm: (values) => {
        api.post('cards', values).then(data => {
            const card = new Card({
                name: data.name,
                link: data.link,
                like: data.likes.length,
                cardId: data._id,
                myId: data.owner._id,
                ownerId: data.owner._id,
                cardSelector: '#article__template',
                handleCardClick: (name, link) => {
                    popupWithImage.open(name, link);
                },
                handleBusketClick: (cardId, element) => {
                    popupConfirm.open(cardId, element)
                }
            })
            const cardElement = card.cardGenerate();
            cardList.setItem(cardElement);
            })
    }
})

const popupEditAvatar = new PopupWithForm({
    popupSelector: '.popup__avatar',
    submitForm: (values) => {
        userInfo.editUserAvatar('/avatar', values)
    }
})

//Добавление слушателей для кнопок редактирования и добавления
function editButtonHandler () {
    const userObject =  userInfo.getUserInfo();
    popupEditName.value = userObject.name;
    popupEditDescription.value = userObject.description;
    formEditValidation.enableValidation();
    popupWithFormEdit.open();
}
document.querySelector('.profile__edit').addEventListener('click', editButtonHandler);

function addButtonHandler () {
    formAddValidation.enableValidation()
    popupWithFormAdd.open();
}
document.querySelector('.profile__button').addEventListener('click', addButtonHandler);

function editUserAvatar() {
    const userAvatar = userInfo.getUserAvatar();
    inputAvatarLink.value = userAvatar.link;
    formAvatarVAlidator.enableValidation();
    popupEditAvatar.open();
}
document.querySelector('.profile__wrap').addEventListener('click', editUserAvatar)





