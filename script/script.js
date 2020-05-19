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
const wrapper = document.querySelector('.wrapper')
const profileName = document.querySelector('.profile__name');
const profileDesctiption = document.querySelector('.profile__description');

function addCard (item) {
    const newArticle = articletemplate.cloneNode(true);
    newArticle.querySelector('.article__foto').src = item.link;
    newArticle.querySelector('.article__foto').alt = item.name;
    newArticle.querySelector('.article__name').textContent = item.name;
    sectionElements.append(newArticle);
}

//Функция создания карточек
function createArticle() {
    initialCards.forEach(addCard);
}
createArticle()

//Функция открытия popup image
const popupImage = document.querySelector('.open-popup__image');
function openPopupImage (evt) {
    const imageSrc = evt.target.getAttribute('src');
    const imageAlt = evt.target.getAttribute('alt');
    popupImage.setAttribute('src', imageSrc);
    popupImage.setAttribute('alt', imageAlt);
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
        openPopupImage(evt);
        document.querySelector('.popup__image').classList.add('popup_opened');
    }
})

//Находим поля формы edit
const popupEdit = document.querySelector('.popup__edit');
const popupEditName = popupEdit.querySelector('.popup__input_type_title');
const popupEditDescription = popupEdit.querySelector('.popup__input_type_description');

//Находим поля формы add
const popupAdd = document.querySelector('.popup__add');
const popupAdditionTitle = popupAdd.querySelector('.popup__input_type_title');
const popupAdditionUrl = popupAdd.querySelector('.popup__input_type_description');

//Добавление слушателей для кнопок редактирования и добавления
document.querySelector('.profile__edit').addEventListener('click', () => {
    popupEdit.classList.add('popup_opened');
    popupEditName.value = profileName.textContent;
    popupEditDescription.value = profileDesctiption.textContent;
});

document.querySelector('.profile__button').addEventListener('click', () => {
    popupAdd.classList.add('popup_opened');
    popupAdditionTitle.value = '';
    popupAdditionUrl.value = '';
});

//Обработчик формы edit 
function popupEditHandler (evt) {
    evt.preventDefault();
    profileName.textContent = popupEditName.value;
    profileDesctiption.textContent = popupEditDescription.value;
}

//Обработчик формы add
function popupAdditionHendler (evt) {
    evt.preventDefault();
    const newArticle = articletemplate.cloneNode(true);
    newArticle.querySelector('.article__foto').src = popupAdditionUrl.value;
    newArticle.querySelector('.article__foto').alt = popupAdditionTitle.value;
    newArticle.querySelector('.article__name').textContent = popupAdditionTitle.value;
    return newArticle;
}

//Закрытие popup 
function closePopup (evt) {
    if (evt.target.classList.contains('popup__close-icon') || (evt.target.classList.contains('popup'))) {
        evt.target.closest('.popup').classList.remove('popup_opened')
    }
    if (evt.target.classList.contains('popup__button') && evt.target.closest('.popup__edit')) {
        popupEditHandler(evt);
        evt.target.closest('.popup').classList.remove('popup_opened');
    }
    if (evt.target.classList.contains('popup__button') && evt.target.closest('.popup__add')) {
        sectionElements.prepend(popupAdditionHendler(evt));
        evt.target.closest('.popup').classList.remove('popup_opened');
    }
}

document.querySelectorAll('.popup').forEach(item => {
    item.addEventListener('click', closePopup);
})

//закрытие popup клавишей Esc
function closePopupEsc (evt) {
    if (evt.key === 'Escape') {
        document.querySelector('.popup_opened').classList.remove('popup_opened')
    }
}
document.addEventListener('keyup', closePopupEsc)