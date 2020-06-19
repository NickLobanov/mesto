import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {Section} from './Section.js';
import {PopupWithImage} from './PopupWithImage.js';
import {PopupWithForm} from './PopupWithForm.js';
import {UserInfo} from './UserInfo.js';

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинск',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

//Объект с селекторами для настройки валидации
const formConfig = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_type_active'
  }

const sectionElements = document.querySelector('.elements')
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const elementImage = document.querySelector('.open-popup__image');
const imageText = document.querySelector('.open-popup__text');
const popupImage = document.querySelector('.popup__image');


//Находим поля формы edit
const popupEdit = document.querySelector('.popup__edit');
const formEdit = popupEdit.querySelector('.popup__form');
const popupEditName = popupEdit.querySelector('.popup__input_type_title');
const popupEditDescription = popupEdit.querySelector('.popup__input_type_description');

//Находим поля формы add
const popupAdd = document.querySelector('.popup__add');
const formAdd = popupAdd.querySelector('.popup__form');
const popupAdditionTitle = popupAdd.querySelector('.popup__input_type_title');
const popupAdditionUrl = popupAdd.querySelector('.popup__input_type_description');

//Создания классов валидации
const formEditValidation = new FormValidator(formConfig, formEdit);
const formAddValidation = new FormValidator(formConfig, formAdd);

//Создание классов Popup
const popupWithImage = new PopupWithImage('.popup__image');
const popupWithFormEdit = new PopupWithForm({
    popupSelector: '.popup__edit',
    submitForm: (values) => {
        const userInfo = new UserInfo({
            name: profileName,
            description: profileDescription
        });
        userInfo.setUserInfo(values);
    }
})


//Добавление карточек из массива
const cardList = new Section ({
    data: initialCards,
    renderer: (item) => {
        const card = new Card({
            name: item.name,
            link: item.link,
            cardSelector: '#article__template',
            handleCardClick: (evt) =>{
                popupWithImage.open(evt);
            }});
        const cardElement = card.cardGenerate();
        cardList.setItem(cardElement);
    }
},     
'.elements');
    
cardList.renderItems();

//Закрытие popup 
function closePopup (popupElement) {
    popupElement.classList.remove('popup_opened');

}

//функция открытия popupов
function openPopup(popup) {
   popup.classList.add('popup_opened')   
}

//Добавление слушателей для кнопок редактирования и добавления
function editButtonHandler () {
    popupWithFormEdit.open();
    popupWithFormEdit.setEventListener()
}
document.querySelector('.profile__edit').addEventListener('click', editButtonHandler);

function addButtonHandler () {
    popupAdditionTitle.value = '';
    popupAdditionUrl.value = '';
    formAddValidation.enableValidation()
    openPopup(popupAdd);
}
document.querySelector('.profile__button').addEventListener('click', addButtonHandler);


//Обработчик формы add
function popupAdditionHandler () {
    sectionElements.prepend(collectCard(popupAdditionTitle.value, popupAdditionUrl.value, '#article__template'))
}

function definingPopup (evt) {
    if (evt.target.classList.contains('popup__close-icon') || (evt.target.classList.contains('popup'))) {
        closePopup(evt.currentTarget);
    }
}

document.querySelectorAll('.popup').forEach(item => {
    item.addEventListener('click', definingPopup);
})

formAdd.addEventListener('submit', evt => {
    evt.preventDefault();
    popupAdditionHandler();
    closePopup(popupAdd)
});


