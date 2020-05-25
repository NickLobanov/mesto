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

const articletemplate = document.querySelector('#article__template').content;
const sectionElements = document.querySelector('.elements')
const profileName = document.querySelector('.profile__name');
const profileDesctiption = document.querySelector('.profile__description');
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


function collectCard (name, link) {
    const newArticle = articletemplate.cloneNode(true);
    const articleFoto = newArticle.querySelector('.article__foto');
    articleFoto.src = link;
    articleFoto.alt = name;
    newArticle.querySelector('.article__name').textContent = name;
    return newArticle;
}

function addCard (name, link) {
    sectionElements.append(collectCard(name, link))
}

//Функция создания карточек
function createArticle() {
    initialCards.forEach((item) => {
        addCard(item.name, item.link)
    }); 
}
createArticle()

//обнуление ошибок формы 
function clearError (formElement) {
    const allInput = Array.from(formElement.querySelectorAll(objectElements.inputSelector));
    const buttonElement = formElement.querySelector(objectElements.submitButtonSelector)
    allInput.forEach(inputItem => {
        hideInputError(formElement, inputItem, objectElements)
    })
    buttonState(allInput, buttonElement, objectElements)
}

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
function colectionPopupImage (evt) {
    const imageSrc = evt.target.getAttribute('src');
    const imageAlt = evt.target.getAttribute('alt');
    elementImage.setAttribute('src', imageSrc);
    elementImage.setAttribute('alt', imageAlt);
    imageText.textContent = imageAlt;
}

//Обработчик лайков и удалений
sectionElements.addEventListener('click', evt => {
    if (evt.target.classList.contains('article__like')) {
        evt.target.classList.toggle('article__like_active');
    }
    if (evt.target.classList.contains('article__basket')) {
       evt.target.closest('.article').remove()
    }
    if (evt.target.classList.contains('article__foto')) {
        colectionPopupImage(evt);
        openPopup(popupImage);
        
    }
})

//Добавление слушателей для кнопок редактирования и добавления
function eventEditButton () {
    popupEditName.value = profileName.textContent;
    popupEditDescription.value = profileDesctiption.textContent;
    clearError(formEdit)
    openPopup(popupEdit);
}
document.querySelector('.profile__edit').addEventListener('click', eventEditButton);

function eventAddButton () {
    popupAdditionTitle.value = '';
    popupAdditionUrl.value = '';
    clearError(formAdd)
    openPopup(popupAdd);
}
document.querySelector('.profile__button').addEventListener('click', eventAddButton);

//Обработчик формы edit 
function popupEditHandler (evt) {
    profileName.textContent = popupEditName.value;
    profileDesctiption.textContent = popupEditDescription.value;
}

//Обработчик формы add
function popupAdditionHendler (evt) {
    sectionElements.prepend(collectCard(popupAdditionTitle.value, popupAdditionUrl.value))
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
    popupEditHandler(evt);
    closePopup(popupEdit)
});

formAdd.addEventListener('submit', evt => {
    popupAdditionHendler(evt);
    closePopup(popupAdd)
});

