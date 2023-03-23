import { Popup } from './Popup.js'

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._popupImageBig = this._popup.querySelector('.popup__image');//большая картинка карточки места
        this._popupHeadingBig = this._popup.querySelector('.popup-image-heading');//название большой карточки места
        this._popupBigImageCloseButton = this._popup.querySelector('.popup__close-button'); //кнопка закрытия 
    }

    open = (link, name) => {
        this._popupImageBig.src = link;
        this._popupImageBig.alt = name;
        this._popupHeadingBig.textContent = name;
        this._popup.classList.add('popup_opened')
        document.addEventListener('keydown', this._handleEcsClose)
    }
}