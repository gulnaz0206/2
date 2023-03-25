export class Card {
    constructor(CardData, templateSelector, handleCardClick) { 

    this._templateSelector = templateSelector;
    this._name = CardData.name;
    this._link = CardData.link; 
    this._handleCardClick = handleCardClick
    this._articleElement = this._getArticleHTMLElement();

    this._deleteButtonElement = this._articleElement.querySelector('.element__delete-button')
    this._likeButtonElement = this._articleElement.querySelector('.element__like')
    this._cardTitle = this._articleElement.querySelector('.element__caption')
    this._cardPicture = this._articleElement.querySelector('.element__image')
    }

    _handleDeleteCard = () => {
        this._articleElement.remove();
    }

    _handleLikeCard = () => {
        this._likeButtonElement.classList.toggle('element__like_active');
    }

    _getArticleHTMLElement() {
        const fragment =  document.querySelector(this._templateSelector).content.cloneNode(true);
        return fragment.querySelector('.element');
    }
  
    _addEventListeners = () => {
        this._deleteButtonElement.addEventListener('click', this._handleDeleteCard);
        this._likeButtonElement.addEventListener('click', this._handleLikeCard);
        this._cardPicture.addEventListener('click', () =>
            this._handleCardClick(this._link, this._name)
        )
    }

    createCard() {
        this._cardPicture.src = this._link;
        this._cardPicture.alt = this._name;
        this._cardTitle.textContent = this._name;  

        this._addEventListeners()
        
        return this._articleElement;
    }
}