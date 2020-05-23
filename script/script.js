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
const popupImage = document.querySelector('.popup__image');


//Находим поля формы edit
const popupEdit = document.querySelector('.popup__edit');
const popupEditName = popupEdit.querySelector('.popup__input_type_title');
const popupEditDescription = popupEdit.querySelector('.popup__input_type_description');

//Находим поля формы add
const popupAdd = document.querySelector('.popup__add');
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

//закрытие popup клавишей Esc
function closePopupEsc (evt) {
    if (evt.key === 'Escape') {
        document.querySelector('.popup_opened').classList.remove('popup_opened')
        document.removeEventListener('keyup', closePopupEsc)
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
    document.querySelector('.open-popup__text').textContent = imageAlt;
}

//Обработчик лайков и удалений
sectionElements.addEventListener('click', evt => {
    if (evt.target.classList.contains('article__like')) {
        evt.target.classList.toggle('article__like_active');
    }
    if (evt.target.classList.contains('article__basket')) {
       evt.target.parentElement.remove()
    }
    if (evt.target.classList.contains('article__foto')) {
        colectionPopupImage(evt);
        openPopup(popupImage);
        
    }
})

//Добавление слушателей для кнопок редактирования и добавления
function eventEditButton () {
    openPopup(popupEdit);
    popupEditName.value = profileName.textContent;
    popupEditDescription.value = profileDesctiption.textContent;
}
document.querySelector('.profile__edit').addEventListener('click', eventEditButton);

function eventAddButton () {
    openPopup(popupAdd);
    popupAdditionTitle.value = '';
    popupAdditionUrl.value = '';
}
document.querySelector('.profile__button').addEventListener('click', eventAddButton);

//Обработчик формы edit 
function popupEditHandler (evt) {
    evt.preventDefault();
    profileName.textContent = popupEditName.value;
    profileDesctiption.textContent = popupEditDescription.value;
}

//Обработчик формы add
function popupAdditionHendler (evt) {
    evt.preventDefault();
    sectionElements.prepend(collectCard(popupAdditionTitle.value, popupAdditionUrl.value))
}

//обнуление ошибок формы 
function clearError () {
    document.querySelectorAll('.popup__input-error').forEach(item => {
        item.classList.remove('popup__input-error_type_active');
        item.textContent = ' ';
    })
    document.querySelectorAll('.popup__input').forEach(item => {
        item.classList.remove('popup__input_type_error');
        item.textContent = ' ';
    })
    document.querySelectorAll('.popup__button').forEach(item => {
        item.setAttribute('disabled', 'true');
        item.classList.add('popup__button_disabled');
    })
    
}

//Закрытие popup 
function closePopup (popupElement) {
    popupElement.classList.remove('popup_opened');
    document.removeEventListener('keyup', closePopupEsc);
    clearError();
}

function definingPopup (evt) {
    if (evt.target.classList.contains('popup__close-icon') || (evt.target.classList.contains('popup'))) {
        closePopup(evt.currentTarget);
    }
    if (evt.target.classList.contains('popup__button') && evt.target.closest('.popup__edit')) {
        popupEditHandler(evt);
        closePopup(evt.currentTarget);
    }
    if (evt.target.classList.contains('popup__button') && evt.target.closest('.popup__add')) {
        popupAdditionHendler(evt);
        closePopup(evt.currentTarget);
    }
}

document.querySelectorAll('.popup').forEach(item => {
    item.addEventListener('click', definingPopup);
})

