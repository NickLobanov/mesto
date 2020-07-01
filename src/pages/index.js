import './index.css'
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import {Api} from '../components/Api.js'

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
const api = new Api(`https://mesto.nomoreparties.co/v1/${indentifier}/cards`)

//данные пользователя 
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__foto')

//Находим поля формы edit
const popupEdit = document.querySelector('.popup__edit');
const formEdit = popupEdit.querySelector('.popup__form');
const popupEditName = popupEdit.querySelector('.popup__input_type_title');
const popupEditDescription = popupEdit.querySelector('.popup__input_type_description');

//Находим поля формы add
const popupAdd = document.querySelector('.popup__add');
const formAdd = popupAdd.querySelector('.popup__form');

//Создания классов валидации
const formEditValidation = new FormValidator(formConfig, formEdit);
const formAddValidation = new FormValidator(formConfig, formAdd);

const userInfo = new UserInfo({
    name: profileName,
    description: profileDescription
}, profileAvatar)

//Добавление всех карточек
api.get().then(data => {
    const cardList = new Section ({
        data: data,
        renderer: (item) => {
            const card = new Card({
                name: item.name,
                link: item.link,
                cardSelector: '#article__template',
                handleCardClick: (name, link) => {
                    popupWithImage.open(name, link);
                }});
            const cardElement = card.cardGenerate();
            cardList.setItem(cardElement);
        }
    },     
    '.elements');
    cardList.renderItems();
})


//Создание классов Popup
const popupWithImage = new PopupWithImage('.popup__image');

const popupWithFormEdit = new PopupWithForm({
    popupSelector: '.popup__edit',
    submitForm: (values) => {
        userInfo.setUserInfo(values);
    }
})

const popupWithFormAdd = new PopupWithForm({
    popupSelector: '.popup__add',
    submitForm: (values) => {
       const card = new Card({
           name: values.title,
           link: values.url,
           cardSelector: '#article__template',
           handleCardClick: (name, link) => {
               popupWithImage.open(name, link);
           }
       })
       const cardElement = card.cardGenerate();
       cardList.setItem(cardElement);
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

userInfo.getUserProfile();



