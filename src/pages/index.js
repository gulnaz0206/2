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
import PopupWithConfirm from '../components/PopupWithConfirm.js';

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

/* api - получение информации о пользователе && отрисовка карточек*/
let user, section;

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then((result) => {
        user = result[0];
        userInfo.setUseInfo(result[0].name, result[0].about, result[0].avatar);

        section = new Section({items: result[1], renderer: createCard}, '.elements');
        section.renderItems(popupWithImage.open);
    })
    .catch((err) => {
        console.log(err); // выведем ошибку в консоль       
    })

/* api - поставить лайк карточке */
const handleAddLikeClick = (id, toggleLikeColorAndCounter) => {
    api.addLike(id)
      .then((result) => {
        toggleLikeColorAndCounter(result);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
    });
}

/* api - удалить лайк карточки */
const handleRemoveLikeClick = (id, toggleLikeColorAndCounter) => {
    api.deleteLike(id)
      .then((result) => {
        toggleLikeColorAndCounter(result);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
    });
}

/* Popup подтверждения удаления карточки */
const handleDeleteButtonClick = (id, setInitialText, deleteCard) => {
    api.deleteCard(id)
    .then((result) => {
      deleteCard();
      popupWithConfirm.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
  })
  .finally(() => setInitialText());
}
const popupWithConfirm = new PopupWithConfirm('.popup_type_delete-picture', handleDeleteButtonClick);
popupWithConfirm.setEventListeners();

/* Popup большого изображения */
const popupWithImage = new PopupWithImage('#popup-big-picture');
popupWithImage.setEventListeners();

const createCard = (cardData) => {
    return new Card(cardData, 
                    '.card__template', 
                    popupWithImage.open, 
                    handleAddLikeClick, 
                    handleRemoveLikeClick,
                    popupWithConfirm.open,
                    user)
                    .createCard();
}

const submitProfileInfo = (data, setInitialText) => {
    /* api - получение информации о пользователе */
    popupProfile.setButtonText('Сохранение...');
    api.editUserInfo(data['popup__name'], data['popup__job'])
        .then((result) => {
            userInfo.setUseInfo(result.name, result.about, result.avatar);
            popupProfile.close();
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        })
        .finally(() => setInitialText())
}

const submitFormCard = (data, setInitialText) => {
    /* api - создание карточки */
    popupAddCard.setButtonText('Сохранение...');
    api.addNewCard(data['popup__input_type_place'], data['popup__link'])
        .then((result) => {
            section.addItem(createCard(result));
            popupAddCard.close();
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        })
        .finally(() => setInitialText());
}

/* Popup редактирования профиля */
const popupProfile = new PopupWithForm('.popup_type_profile', submitProfileInfo);
popupProfile.setEventListeners();

/* Popup добавления новой карточки */
const popupAddCard = new PopupWithForm('.popup_type_add-card', submitFormCard);
popupAddCard.setEventListeners();

/* Profile - замена textContent */
const userInfo = new UserInfo({userNameSelector: '.profile__name', userInfoSelector: '.profile__job', userAvatarSelector: '.profile__avatar'});

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

const popupAvatarForm = document.querySelector('.popup-change-avatar-form');
const avatarEditFormValidator = new FormValidator(validatorConfig, popupAvatarForm);
avatarEditFormValidator.enableValidation();

const formValidators = {};


const handleEditAvatar = (data, setInitialText) => {
    editAvatarPopup.setButtonText('Сохранение...')
    api.editUserAvatar(data['popup__avatar-link'])
        .then((res) => {
            userInfo.setUserAvatar(res.avatar)
            editAvatarPopup.close()
        })
        .catch((error) => {
            console.log(error)
        })
        .finally(() => setInitialText());
};

const editAvatarPopup = new PopupWithForm(
   '.popup_type_change-avatar',
   handleEditAvatar,
);
editAvatarPopup.setEventListeners();

const editAvatarButton = document.querySelector('.profile__edit-avatar-button');
editAvatarButton.addEventListener('click', () => {
  avatarEditFormValidator.resetValidation()
  editAvatarPopup.open()
})
