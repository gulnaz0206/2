export class FormValidator {

    constructor(config, form) {
        this._form = form;
        this._config = config;
        this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
        this._button = this._form.querySelector(this._config.submitButtonSelector);
    }

_showInputError = (input, errorMessage) => {
    const formError = this._form.querySelector(`#${input.id}-error`);

    input.classList.add(this._config.inputErrorClass);
    formError.textContent = errorMessage;
    formError.classList.add(this._config.errorClass);
}

_hideInvalidInput = () => {
    return this._inputList.some((input) => {
        return !input.validity.valid;
    })
};

resetValidation = () => {
    this._toggleButtonState()
    this._inputList.forEach((input) => {
        this._coverInputError(input);
    });
}

_coverInputError = (input) => {
    const formError = this._form.querySelector(`#${input.id}-error`);
    input.classList.remove(this._config.inputErrorClass);
    console.log(formError, 'formError');
    formError.classList.remove(this._config.errorClass);
    formError.textContent = '';
};

_checkInvalidInput = (input) => {
    if (!input.validity.valid) {
        this._showInputError(input, input.validationMessage);
    }
    else {
        this._coverInputError(input);
    }
};

_toggleButtonState = () => {
    if (this._hideInvalidInput()) {
        this._button.classList.add(this._config.inactiveButtonClass);
        this._button.disabled = true;
    }
    else {
        this._button.classList.remove(this._config.inactiveButtonClass);
        this._button.disabled = false;
    }
}

_setEventListeners = () => {
    this._inputList.forEach((input) => {
        input.addEventListener('input', () => {
            this._checkInvalidInput(input);
            this._toggleButtonState();
        });
    });
}


enableValidation() {
    this._toggleButtonState()
    this._setEventListeners()
}
}