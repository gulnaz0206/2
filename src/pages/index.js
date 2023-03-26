import '../pages/index.css';
import { initialCards, enableValidation } from '../utils/data.js';
import { Card }  from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { baseUrl, token, validatorConfig } from '../utils/constants.js';
import Api from '../components/Api.js';

//Попап редактирования профиля
const popupOpenButtonElement = document.querySelector('.profile__edit');//кнопка открытия попапа ручка
const popupProfileForm = document.querySelector('.popup-edit-form');//форма попапа редактирования профиля
const profileName = popupProfileForm.querySelector('.popup__input_type_name'); 
const profileJob = popupProfileForm.querySelector('.popup__input_type_job'); 

//Попап добавления новой карточки
const popupOpenAddCardElement = document.querySelector('.profile__button');//кнопка открытия попапа плюс
const popupAddCardForm = document.querySelector('.popup-add-form');//форма попапа добавления карточки

// API
const api = new Api({
    baseUrl: baseUrl,
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    }
});

/* api - отрисовка карточек */
let section;
api.getInitialCards()
  .then((result) => {
    section = new Section({items: result, renderer: createCard}, '.elements');
    section.renderItems(popupWithImage.open);
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
});

/* Popup большого изображения */
const popupWithImage = new PopupWithImage('#popup-big-picture');
popupWithImage.setEventListeners();

const createCard = (cardData) => {
    return new Card(cardData, '.card__template', popupWithImage.open).createCard();
}

function submitProfileInfo(data) {
    /* api - получение информации о пользователе */
    api.editUserInfo(data['popup__name'], data['popup__job'])
        .then((result) => {
            userInfo.setUseInfo(result.name, result.about);
            popupProfile.close();
        })
        .catch((err) => {
        console.log(err); // выведем ошибку в консоль
        });
}

function submitFormCard(data) {
    /* api - получение информации о пользователе */
    api.addNewCard(data['popup__input_type_place'], data['popup__link'])
    .then((result) => {
        section.addItem(createCard({name: result.name, link: result.link}));
        popupAddCard.close();
    })
    .catch((err) => {
    console.log(err); // выведем ошибку в консоль
    });
}

/* Popup редактирования профиля */
const popupProfile = new PopupWithForm('.popup_type_profile', submitProfileInfo);
popupProfile.setEventListeners();

/* Popup добавления новой карточки */
const popupAddCard = new PopupWithForm('.popup_type_add-card', submitFormCard);
popupAddCard.setEventListeners();

/* Profile - замена textContent */
const userInfo = new UserInfo({userNameSelector: '.profile__name', userInfoSelector: '.profile__job'});

/* api - получение информации о пользователе */
api.getUserInfo()
  .then((result) => {
    userInfo.setUseInfo(result.name, result.about);
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
});

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
const addCardFormValidor = new FormValidator(validatorConfig, popupAddCardForm);
addCardFormValidor.enableValidation();

const editProfileFormValidor = new FormValidator(validatorConfig, popupProfileForm);
editProfileFormValidor.enableValidation();

const formValidators = {};

