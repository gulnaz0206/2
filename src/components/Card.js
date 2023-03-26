export class Card {
    constructor(CardData, templateSelector, handleCardClick, handleAddLikeClick, handleRemoveLikeClick, openConfirmPopup, user) { 
    this._templateSelector = templateSelector;
    this._id = CardData._id;
    this._name = CardData.name;
    this._link = CardData.link;
    this._likes = CardData.likes;
    this._owner = CardData.owner;
    this._user = user;
    this._handleCardClick = handleCardClick
    this._articleElement = this._getArticleHTMLElement();
    this._handleAddLikeClick = handleAddLikeClick;
    this._handleRemoveLikeClick = handleRemoveLikeClick;
    this._openConfirmPopup = openConfirmPopup;

    this._deleteButtonElement = this._articleElement.querySelector('.element__delete-button')
    this._likeButtonElement = this._articleElement.querySelector('.element__like')
    this._cardTitle = this._articleElement.querySelector('.element__caption')
    this._cardPicture = this._articleElement.querySelector('.element__image')
    this._cardLikeCounter = this._articleElement.querySelector('.element__like-counter')
    }

    _handleDeleteCard = () => {
        this._articleElement.remove();
    }

    _handleLikeCard = () => {
        if (this._likeButtonElement.classList.contains('element__like_active')) {
            this._handleRemoveLikeClick(this._id, this._toggleLikeColorAndCounter )
        } else {
            this._handleAddLikeClick(this._id, this._toggleLikeColorAndCounter )
        }
    }

    _toggleLikeColorAndCounter = (card) => {
        this._likeButtonElement.classList.toggle('element__like_active');
        this._cardLikeCounter.textContent = card.likes.length;
    }

    _getArticleHTMLElement() {
        const fragment =  document.querySelector(this._templateSelector).content.cloneNode(true);
        return fragment.querySelector('.element');
    }
  
    _addEventListeners = () => {
        this._deleteButtonElement.addEventListener('click', () => {this._openConfirmPopup(this._handleDeleteCard, this._id)});
        this._likeButtonElement.addEventListener('click', this._handleLikeCard);
        this._cardPicture.addEventListener('click', () =>
            this._handleCardClick(this._link, this._name)
        )
    }

    createCard() {
        this._cardPicture.src = this._link;
        this._cardPicture.alt = this._name;
        this._cardTitle.textContent = this._name;
        this._cardLikeCounter.textContent = this._likes.length;
        if (this._owner._id !== this._user._id) this._deleteButtonElement.style.display = 'none';
        if (this._likes.some((item) => item._id === this._user._id)) this._likeButtonElement.classList.add('element__like_active');

        this._addEventListeners()
        
        return this._articleElement;
    }
}