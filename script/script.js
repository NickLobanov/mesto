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



//Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

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


