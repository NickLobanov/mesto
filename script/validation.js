const formEdit = document.querySelector('.popup__edit');
const inputName = formEdit.querySelector('.popup__input_type_title');
const inputJob = formEdit.querySelector('.popup__input_type_description');
inputName.setAttribute('minlength', '2');
inputName.setAttribute('maxlength', '40');
inputJob.setAttribute('minlength', '2');
inputJob.setAttribute('maxlength', '200');

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_type_active');
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.textContent = '';
  errorElement.classList.remove('popup__input-error_type_active')
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement);
  }
};
 
// Добавление обработчиков всем полям формы
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');
  buttonState (inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      buttonState(inputList, buttonElement);
    });
  });
}

// Добавление обработчиков всем формам
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    setEventListeners(formElement);
  })
}
enableValidation();

// функция проверки невалидных полей
function hasInputValidity (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

//функция состояния кнопки

function buttonState (inputList, buttonElement) {
  if (hasInputValidity(inputList)) {
    buttonElement.setAttribute('disabled', 'true');
    buttonElement.classList.add('popup__button_inactive');

  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove('popup__button_inactive');
  }
}