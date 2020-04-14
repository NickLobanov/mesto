// Находим форму в DOM
const formElement = document.querySelector('.popup');
const profileEdit = document.querySelector('.profile__edit');
const popupCloseIcon = formElement.querySelector('.popup__close-icon');
const popupSave = formElement.querySelector('.popup__button');

function popupClose() {
    formElement.classList.remove('popup_opened');
}

let formContainer = formElement.querySelector('.popup__container');

//Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Находим поля формы в DOM
    let nameInput = formContainer.querySelector('.popup__input_type_name');
    let jobInput = formContainer.querySelector('.popup__input_type_job')

    // Получите значение полей из свойства value
    nameInput.value
    jobInput.value
    

    // Выберите элементы, куда должны быть вставлены значения полей
    let profileName = document.querySelector('.profile__name');
    let profileJob = document.querySelector('.profile__description')

    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    
    popupClose();
}

profileEdit.addEventListener('click', function() {
    formElement.classList.add('popup_opened');
    let nameInput = formContainer.querySelector('.popup__input_type_name');
    let jobInput = formContainer.querySelector('.popup__input_type_job')
    let profileName = document.querySelector('.profile__name');
    let profileJob = document.querySelector('.profile__description')
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
})

popupCloseIcon.addEventListener('click', popupClose);
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupSave.addEventListener('click', formSubmitHandler);


