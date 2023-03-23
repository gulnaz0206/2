export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector)
    }

    open() {
        this._popup.classList.add('popup_opened')
        document.addEventListener('keydown', this._handleEcsClose)
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEcsClose)
    }

    _handleEcsClose = (event) => {
        if (event.key === 'Escape') {
            this.close()
        }
    }

    setEventListeners() {
        this._popup.addEventListener('click', (event) => {
            if (
                event.target.classList.contains('popup') ||
                event.target.classList.contains('popup__close-button')
            ) {
                this.close()
            }
        })
    }
}