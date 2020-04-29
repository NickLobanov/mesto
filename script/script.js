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

const sectionElements = document.querySelector('.elements');
const templateElement = document.querySelector('#article__template').content;

initialCards.forEach(item => {
    const newArticle = templateElement.cloneNode(true);
    newArticle.querySelector('.article__foto').src = item.link;
    newArticle.querySelector('.article__foto').alt = item.name;
    newArticle.querySelector('.article__name').textContent = item.name;
    sectionElements.append(newArticle);
});

//Находим template
const popupTemplate = document.querySelector('#popup__template').content;
const wrapper = document.querySelector('.wrapper');


//Создаем popup редактирования
function popupEdit (title, button) {
    const popupClone = popupTemplate.cloneNode(true);
    popupClone.querySelector('.popup__title').textContent = title;
    popupClone.querySelector('.popup__button').textContent = button
    wrapper.append(popupClone);
}
popupEdit('Редактировать профиль', 'Сохранить');

//Выбираем элементы, куда будут вставлены значения полей
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__description');
let inputName = document.querySelector('.popup__input_type_name');
let inputJob = document.querySelector('.popup__input_type_job');

//Находим элементы формы
const editButton = document.querySelector('.profile__edit');
const popupElement = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close-icon');
const saveButton = document.querySelector('.popup__button');

//Открытие popup
editButton.addEventListener('click', () => {
    popupElement.classList.add('popup_opened');
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
})

//Функция закрытия popup
const popupClose = () => {
    popupElement.classList.remove('popup_opened');
}
closeButton.addEventListener('click', popupClose);

//Обработчик «отправки» формы
const formSubmitHandler = (evt) => {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    // Получите значение полей из свойства value
    inputName.value
    inputJob.value
    
    // Вставьте новые значения с помощью textContent
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    
    popupClose();
}
saveButton.addEventListener('click', formSubmitHandler);

//Создание popup добавления
function popupAdd (title, button) {
    const popupAddElement = popupTemplate.cloneNode(true);
    popupAddElement.querySelector('.popup').classList.add('popup_add')
    popupAddElement.querySelector('.popup__title').textContent = title;
    popupAddElement.querySelector('.popup__button').textContent = button
    popupAddElement.querySelector('.popup__input_type_name').setAttribute('placeholder', 'Название');
    popupAddElement.querySelector('.popup__input_type_job').setAttribute('placeholder', 'Ссылка на картинку');
    wrapper.append(popupAddElement);
}
popupAdd('Новое место', 'Создать');
const addTemplate = document.querySelector('.popup_add');

const buttonAdd = document.querySelector('.profile__button');
buttonAdd.addEventListener('click', () => {
    addTemplate.classList.add('popup_opened')
    
})

//Создание слушателя "лайков"
const likeButton = document.querySelectorAll('.article__like');
likeButton.forEach(item => {
    item.addEventListener('click', (event) => {
        const eventTarget = event.target;
        eventTarget.classList.toggle('article__like_active');
    })
})