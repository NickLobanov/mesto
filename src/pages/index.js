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
const formEditButton = popupEdit.querySelector('.popup__button')
const popupEditName = popupEdit.querySelector('.popup__input_type_title');
const popupEditDescription = popupEdit.querySelector('.popup__input_type_description');

//Поля формы avatar
const popupAvatar = document.querySelector('.popup__avatar');
const formAvatar = popupAvatar.querySelector('.popup__form');
const inputAvatarLink = formAvatar.querySelector('.popup__input_type_title');
const popupAvatarButton = popupAvatar.querySelector('.popup__button')

//Находим поля формы add
const popupAdd = document.querySelector('.popup__add');
const formAdd = popupAdd.querySelector('.popup__form');
const formAddButton = popupAdd.querySelector('.popup__button')

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
//Добавление всех карточек
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

//UX для кнопок форм
function renderLoading(button, isLoading) {
    if(isLoading) {
        button.setAttribute('disabled', true)
        button.textContent = 'Сохранение..'
    } else {
        button.removeAttribute('disabled')
        button.textContent = 'Сохранить'
    }
}

//Создание классов Popup
const popupWithImage = new PopupWithImage('.popup__image');
const popupConfirm = new PopupConfirm('.popup__confirm')

const popupWithFormEdit = new PopupWithForm({
    popupSelector: '.popup__edit',
    submitForm: (values) => {
        renderLoading(formEditButton, true)
        userInfo.setUserInfo(values)
        .then(data => {
            profileName.textContent = data.name;
            profileDescription.textContent = data.about;
        })
        .finally(() => {
            popupWithFormEdit.close()
            renderLoading(formEditButton, false)
        })
       
    }
})

const popupWithFormAdd = new PopupWithForm({
    popupSelector: '.popup__add',
    submitForm: (values) => {
        renderLoading(formAddButton, true)
        api.post('cards', values).then(data => {
            const card = new Card({
                name: data.name,
                link: data.link,
                like: data.likes,
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
        .finally(() => {
            popupWithFormAdd.close()
            renderLoading(formAddButton, false)
        })
    }
})

const popupEditAvatar = new PopupWithForm({
    popupSelector: '.popup__avatar',
    submitForm: (values) => {
        renderLoading(popupAvatarButton, true)
        userInfo.editUserAvatar('users/me/avatar', values)
            .then(data => {
                profileAvatar.setAttribute('src', data.avatar) 
            })
            .finally(() => {
                popupEditAvatar.close()
                renderLoading(popupAvatarButton, false)
            })
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





