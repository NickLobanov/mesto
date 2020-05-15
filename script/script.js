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
const popupImage = document.querySelector('#popup__image').content;
const sectionElements = document.querySelector('.elements')
const wrapper = document.querySelector('.wrapper')
let profileName = document.querySelector('.profile__name');
let profileDesctiption = document.querySelector('.profile__description');

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

//Функция создания popup image
function createPopupImage () {
    const createPopupImage = popupImage.cloneNode(true);
    createPopupImage.querySelector('.popup').classList.add('popup__image');
    wrapper.append(createPopupImage);
}
createPopupImage();

//Функция открытия popup image
function openPopupImage (evt) {
    const imageSrc = evt.target.getAttribute('src');
    const imageAlt = evt.target.getAttribute('alt');
    document.querySelector('.open-popup__image').setAttribute('src', imageSrc);
    document.querySelector('.open-popup__image').setAttribute('alt', imageAlt);
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

//Функция создания popup редактирования
const popupTemplate = document.querySelector('#popup__template').content
function createPopupEdit () {
    const popupEdit = popupTemplate.cloneNode(true);
    popupEdit.querySelector('.popup').classList.add('popup__edit');
    popupEdit.querySelector('.popup__title').textContent='Редактировать профиль';
    popupEdit.querySelector('.popup__button').textContent='Сохранить';
    wrapper.append(popupEdit);
}
createPopupEdit();

//Функция создания popup добавления
function createPopupAddition () {
    const popupEdit = popupTemplate.cloneNode(true);
    popupEdit.querySelector('.popup').classList.add('popup__add');
    popupEdit.querySelector('.popup__title').textContent='Новое место';
    popupEdit.querySelector('.popup__button').textContent='Создать';
    popupEdit.querySelector('.popup__input_type_title').setAttribute('placeholder', 'Название');
    popupEdit.querySelector('.popup__input_type_description').setAttribute('placeholder', 'Ссылка на картинку');
    popupEdit.querySelector('.popup__input_type_description').setAttribute('type', 'url')
    wrapper.append(popupEdit);
}
createPopupAddition();

//Находим поля формы edit
const popupEdit = document.querySelector('.popup__edit');
const popupEditName = popupEdit.querySelector('.popup__input_type_title');
const popupEditDescription = popupEdit.querySelector('.popup__input_type_description');

//Находим поля формы add
const popupAdd = document.querySelector('.popup__add');
let popupAdditionTitle = popupAdd.querySelector('.popup__input_type_title');
let popupAdditionUrl = popupAdd.querySelector('.popup__input_type_description');

//Добавление слушателей для кнопок редактирования и добавления
document.querySelector('.profile__edit').addEventListener('click', () => {
    popupEdit.classList.add('popup_opened');
    popupEditName.value = profileName.textContent;
    popupEditDescription.value = profileDesctiption.textContent;
});

document.querySelector('.profile__button').addEventListener('click', () => {
    popupAdd.classList.add('popup_opened');
    popupAdditionTitle.value = '';
    popupEditDescription.value = '';
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
    newArticle.querySelector('.article__foto').src = popupAdditionUrl;
    newArticle.querySelector('.article__foto').alt = popupAdditionTitle;
    newArticle.querySelector('.article__name').textContent = popupAdditionTitle;
    sectionElements.prepend(newArticle);
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
        popupAdditionHendler(evt);
        evt.target.closest('.popup').classList.remove('popup_opened');
    }
}
document.querySelectorAll('.popup').forEach(item => {
    item.addEventListener('click', closePopup)
})


