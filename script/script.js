import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {Section} from './Section.js';

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

//Добавление карточек из массива
const cardList = new Section ({
    data: initialCards,
    renderer: (item) => {
        const card = new Card(item.name, item.link, '#article__template');
        const cardElement = card.cardGenerate();
        cardList.setItem(cardElement);
    }
},     
'.elements');
    
cardList.renderItems();

//Закрытие popup 
function closePopup (popupElement) {
    popupElement.classList.remove('popup_opened');
    document.removeEventListener('keyup', closePopupEsc);
}

//закрытие popup клавишей Esc
function closePopupEsc (evt) {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'))
    }
}

//функция открытия popupов
function openPopup(popup) {
   popup.classList.add('popup_opened')
   document.addEventListener('keyup', closePopupEsc)
}

//Функция открытия popup image
function collectionPopupImage (evt) {
    const imageSrc = evt.target.getAttribute('src');
    const imageAlt = evt.target.getAttribute('alt');
    elementImage.setAttribute('src', imageSrc);
    elementImage.setAttribute('alt', imageAlt);
    imageText.textContent = imageAlt;
}

//Обработчик открытия popup image
sectionElements.addEventListener('click', evt => {
    if (evt.target.classList.contains('article__foto')) {
        collectionPopupImage(evt);
        openPopup(popupImage);
    }
})

//Добавление слушателей для кнопок редактирования и добавления
function editButtonHandler () {
    popupEditName.value = profileName.textContent;
    popupEditDescription.value = profileDescription.textContent;
    formEditValidation.enableValidation()
    openPopup(popupEdit);
}
document.querySelector('.profile__edit').addEventListener('click', editButtonHandler);

function addButtonHandler () {
    popupAdditionTitle.value = '';
    popupAdditionUrl.value = '';
    formAddValidation.enableValidation()
    openPopup(popupAdd);
}
document.querySelector('.profile__button').addEventListener('click', addButtonHandler);

//Обработчик формы edit 
function popupEditHandler () {
    profileName.textContent = popupEditName.value;
    profileDescription.textContent = popupEditDescription.value;
}

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

formEdit.addEventListener('submit', evt => {
    evt.preventDefault();
    popupEditHandler();
    closePopup(popupEdit)
});

formAdd.addEventListener('submit', evt => {
    evt.preventDefault();
    popupAdditionHandler();
    closePopup(popupAdd)
});

createArticle()

