export class FormValidator {
    constructor(objectConfig, formElement) {
        this._inputSelector = objectConfig.inputSelector;
        this._submitButtonSelector = objectConfig.submitButtonSelector;
        this._inactiveButtonClass = objectConfig.inactiveButtonClass;
        this._inputErrorClass = objectConfig.inputErrorClass;
        this._errorClass = objectConfig.errorClass;
        this._formElement = formElement;
    }


    //Метод добавления класса с ошибкой
    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    //Метод удаления класса с ошибкой
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(this._errorClass)
    }

    //Метод проверки валидности поля
    _isValid(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage)
        } else {
            this._hideInputError(inputElement)
        }
    }

    //Метод проверки невалидных полей
    _hasInputValidity(inputList) {
        return inputList.some(inputElement => {
            return !inputElement.validity.valid;
        })
    }

    //Метод состояния кнопки
    _buttonState(inputList, buttonElement) {
        if (this._hasInputValidity(inputList)) {
            buttonElement.setAttribute('disabled', 'true');
            buttonElement.classList.add(this._inactiveButtonClass);
          } else {
            buttonElement.removeAttribute('disabled');
            buttonElement.classList.remove(this._inactiveButtonClass);
          }
    }

    //Добавление обработчиков всем полям формы
    enableValidation() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        this._buttonState(inputList, buttonElement);
        inputList.forEach(inputElement => {
            this._hideInputError(inputElement)
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this._buttonState(inputList, buttonElement)
            })
        })
    } 
}


