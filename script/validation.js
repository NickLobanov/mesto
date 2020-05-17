const inputNameEdit = popupEdit.querySelector('.popup__input_type_title');
const inputJobEdit = popupEdit.querySelector('.popup__input_type_description');
inputNameEdit.setAttribute('minlength', '2');
inputNameEdit.setAttribute('pattern', '[A-Za-zа-яА-Я -]{1,40}')
inputJobEdit.setAttribute('minlength', '2');
inputJobEdit.setAttribute('maxlength', '200');

const inputTitleAdd = popupAdd.querySelector('.popup__input_type_title');
inputTitleAdd.setAttribute('maxlength', '30');
inputTitleAdd.setAttribute('minlength', '2');

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, objectForm) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(objectForm.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(objectForm.errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, objectForm) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(objectForm.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(objectForm.errorClass)
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement, objectForm) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage, objectForm);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement, objectForm);
  }
};
 
// Добавление обработчиков всем полям формы
const setEventListeners = (formElement, objectForm) => {
  const inputList = Array.from(formElement.querySelectorAll(objectForm.inputSelector));
  const buttonElement = formElement.querySelector(objectForm.submitButtonSelector);
  buttonState (inputList, buttonElement, objectForm);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, objectForm);
      buttonState(inputList, buttonElement, objectForm);
    });
  });
}

// Добавление обработчиков всем формам
const enableValidation = (objectForm) => {
  const formList = Array.from(document.querySelectorAll(objectForm.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    setEventListeners(formElement, objectForm);
  })
}
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_type_active'
});

// функция проверки невалидных полей
function hasInputValidity (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

//функция состояния кнопки

function buttonState (inputList, buttonElement, objectForm) {
  if (hasInputValidity(inputList)) {
    buttonElement.setAttribute('disabled', 'true');
    buttonElement.classList.add(objectForm.inactiveButtonClass);

  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(objectForm.inactiveButtonClass);
  }
}

