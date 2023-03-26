import { Popup } from "./Popup.js";

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector, handleSubmitBtnClick) {
        super(popupSelector);
        this._handleSubmitBtnClick = handleSubmitBtnClick;
        this._popupConfirmBtn = this._popup.querySelector('.popup__button');
        this._submitButtonInitialText = this._popupConfirmBtn.textContent;
        this._currentDeleteCardCallback = null;
        this._currentCardId = null;
    }

    open = (currentCallback, currentCardId) => {
        super.open()
        this._currentDeleteCardCallback = currentCallback;
        this._currentCardId = currentCardId;
    }

    _setInitialText = () => {
        this._popupConfirmBtn.textContent = this._submitButtonInitialText;
    }
    
    setButtonText = (text) => {
        this._popupConfirmBtn.textContent = text;
    }

    setEventListeners = () => {
        super.setEventListeners();
        this._popupConfirmBtn.addEventListener('click', () => {
            this._popupConfirmBtn.textContent = 'Удаление...';
            this._handleSubmitBtnClick(this._currentCardId, this._setInitialText, this._currentDeleteCardCallback);
        })
    }
}