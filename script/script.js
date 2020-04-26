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



// Находим форму в DOM
const formElement = document.querySelector('.popup');
const profileEdit = document.querySelector('.profile__edit');
const popupCloseIcon = formElement.querySelector('.popup__close-icon');
const popupSave = formElement.querySelector('.popup__button');

 // Находим поля формы в DOM
 let formContainer = formElement.querySelector('.popup__container');
 let nameInput = formContainer.querySelector('.popup__input_type_name');
 let jobInput = formContainer.querySelector('.popup__input_type_job')

 // Выбираем элементы, куда должны быть вставлены значения полей
 let profileName = document.querySelector('.profile__name');
 let profileJob = document.querySelector('.profile__description')

 // функция закрытия popup
function popupClose() {
    formElement.classList.remove('popup_opened');
}

//Обработчик «отправки» формы
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    // Получите значение полей из свойства value
    nameInput.value
    jobInput.value
    
    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    
    popupClose();
}

profileEdit.addEventListener('click', function() {
    formElement.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
})

popupCloseIcon.addEventListener('click', popupClose);
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupSave.addEventListener('click', formSubmitHandler);


