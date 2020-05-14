//Валидация формы popup edit
const formPopupEdit = popupEdit.querySelector('.popup__form');
const inputTitleError = formPopupEdit.querySelector(`#${popupEditName.id}-error`);
popupEditName.setAttribute('minlength', '2')

// Функция, которая добавляет класс с ошибкой
const showInputError = (element, errorMessage) => {
  element.classList.add('popup__input_type_error');
  inputTitleError.textContent = errorMessage;
  inputTitleError.classList.add('popup__input-error_type_active');
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (element) => {
  element.classList.remove('popup__input_type_error');
  inputTitleError.textContent = '';
  inputTitleError.classList.remove('popup__input-error_type_active')
};

// Функция, которая проверяет валидность поля
const isValid = () => {
  if (!popupEditName.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(popupEditName, popupEditName.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(popupEditName);
  }
};
 
// Вызовем функцию isValid на каждый ввод символа
popupEditName.addEventListener('input', isValid);
