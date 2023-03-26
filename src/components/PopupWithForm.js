import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector)

        this._handleFormSubmit = handleFormSubmit;
        this._formElement = this._popup.querySelector('.popup__form');
        this._inputList = this._formElement.querySelectorAll('.popup__input');
        this._popupSubmitBtn = this._popup.querySelector('.popup__button');
        this._submitButtonInitialText = this._popupSubmitBtn.textContent;
    }

    _getInputValues = () => {
        this._formValues = {};
        this._inputList.forEach((input) => {
            this._formValues[input.getAttribute('name')] = input.value;
        })
        return this._formValues
    }

    setEventListeners = () => {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleFormSubmit(this._getInputValues(), this._setInitialText);
        })
    }

    _setInitialText = () => {
        this._popupSubmitBtn.textContent = this._submitButtonInitialText;
    }

    setButtonText = (text) => {
        this._popupSubmitBtn.textContent = text;
    }

    close = () => {
        super.close()
        this._formElement.reset()
    }
}