import '../pages/index.css';
import { initialCards, enableValidation } from '../utils/data.js';
import { Card }  from './Card.js';
import { FormValidator } from './FormValidator.js';
import Section from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';

//Попап редактирования профиля
const popupOpenButtonElement = document.querySelector('.profile__edit');//кнопка открытия попапа ручка
const popupProfileForm = document.querySelector('.popup-edit-form');//форма попапа редактирования профиля
const profileName = popupProfileForm.querySelector('.popup__input_type_name'); 
const profileJob = popupProfileForm.querySelector('.popup__input_type_job'); 

//Попап добавления новой карточки
const popupOpenAddCardElement = document.querySelector('.profile__button');//кнопка открытия попапа плюс
const popupAddCardForm = document.querySelector('.popup-add-form');//форма попапа добавления карточки

/* Popup большого изображения */
const popupWithImage = new PopupWithImage('#popup-big-picture');
popupWithImage.setEventListeners();

const createCard = (CardData) => {
    return new Card(CardData, popupWithImage.open).createCard();
}

function submitProfileInfo(data) {
    userInfo.setUseInfo(data['popup__name'], data['popup__job']);
    popupProfile.close();
}

function submitFormCard(data) {
    section.addItem(createCard({name: data['popup__input_type_place'], link: data['popup__link']}));
    popupAddCard.close();
}

/* Popup редактирования профиля */
const popupProfile = new PopupWithForm('.popup_type_profile', submitProfileInfo);
popupProfile.setEventListeners();

/* Popup добавления новой карточки */
const popupAddCard = new PopupWithForm('.popup_type_add-card', submitFormCard);
popupAddCard.setEventListeners();

/* Отрисовка карточек на странице */
const section = new Section({items: initialCards, renderer: createCard}, '.elements');
section.renderItems(popupWithImage.open);

/* Profile - замена textContent */
const userInfo = new UserInfo({userNameSelector: '.profile__name', userInfoSelector: '.profile__job'});

/* Кнопка открытия попапа редактирования профиля */
popupOpenButtonElement.addEventListener('click', function () {
    const data = userInfo.getUserInfo();
    profileName.value = data.name;
    profileJob.value = data.info;
    popupProfile.open();
});

/* Кнопка открытия попапа добавления карточки */
popupOpenAddCardElement.addEventListener('click', function () {
    addCardFormValidor.resetValidation();
    popupAddCard.open();
})

/* form validation init */
const validatorConfig = {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible',
    }

const addCardFormValidor = new FormValidator(validatorConfig, popupAddCardForm);
addCardFormValidor.enableValidation();

const editProfileFormValidor = new FormValidator(validatorConfig, popupProfileForm);
editProfileFormValidor.enableValidation();

const formValidators = {};

