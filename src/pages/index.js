import '../pages/index.css';

import { buttonEditProfilePic, buttonEditInfo, buttonAddCard, formAddCard, formEditInfo, formProfilePic, nameInput, aboutInput, validateList } from '../components/constants.js';
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation';
import { api } from '../components/Api';

let userId

api.getProfile()
  .then(data => {
    userInfo.setUserInfo(data);
    userPic.setUserPic(data);
    userId = data._id
  });

api.getInitialCards()
  .then(cardList => {
    cardList.forEach(data => {
      const newCard = createNewCard(data);
      section.addItem(newCard);
    })
  })

const profileValidator = new FormValidator(validateList, formEditInfo);
const cardValidator = new FormValidator(validateList, formAddCard);
const profilePicValidator = new FormValidator(validateList, formProfilePic);

const section = new Section({ renderer: render }, '.elements');

const imagePopup = new PopupWithImage('#photoView');
const cardPopup = new PopupWithForm('#cardPopup', submitCard);
const profilePopup = new PopupWithForm('#infoPopup', submitProfileChanges); 
const profilePicPopup = new PopupWithForm('#profilePicPopup', submitProfilePic);
const approvePopup = new PopupWithConfirmation('#approvePopup')

const userInfo = new UserInfo({
  usernameSelector: '.profile__title', 
  aboutSelector: '.profile__subtitle'
})

const userPic = new UserInfo({
  proflePicSelector: '.profile__avatar'
})

imagePopup.setEventListeners();
cardPopup.setEventListeners();
profilePopup.setEventListeners();
profilePicPopup.setEventListeners(); 
approvePopup.setEventListeners();

profileValidator.enableValidation();
cardValidator.enableValidation();
profilePicValidator.enableValidation();

/* открытие форм */
function openEditForm () {
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  aboutInput.value = data.about;
  profileValidator.checkButtonValidity();
  profilePopup.open()
};

function openAddForm () {
  cardValidator.checkButtonValidity();
  cardPopup.open()
}; 

function openProfilePicForm () {
  profilePicValidator.checkButtonValidity();
  profilePicPopup.open()
}

buttonEditInfo.addEventListener('click', openEditForm);
buttonAddCard.addEventListener('click', openAddForm); 
buttonEditProfilePic.addEventListener('click', openProfilePicForm);

/* сабмиты */

function submitProfileChanges (data) {
  profilePopup.loading(true)
  api.editProfile(data.name, data.about)
    .then(res => {
      userInfo.setUserInfo(res)
    })
    .finally(() => {
      profilePopup.loading(false)
    })
  profilePopup.close()
};

function submitCard (data) {
  cardPopup.loading(true)
  api.addCard(data.name, data.link)
    .then(res => {
      const newCard = createNewCard(res);
      section.addItem(newCard);
    })
    .finally(() => {
      cardPopup.loading(false)
    })
  cardPopup.close()
};

function submitProfilePic (data) {
  profilePicPopup.loading(true)
  api.editUserPic(data.avatar)
    .then(res => {
      console.log(res)
      userPic.setUserPic(res)
    })
    .finally(() => {
      profilePicPopup.loading(false)
    })
  profilePicPopup.close()
} 

/* рендер карточки */

function createNewCard (data) {
  const card = new Card (data, userId, '#template', () => {
    imagePopup.open(data.name, data.link)
  },
  (id) => {
    approvePopup.open();
    approvePopup.setSubmitHandler(() => {
      api.deleteCard(id)
      .then(() => {
        console.log(id)
        card.deleteCard()
        approvePopup.close()
      })
    })    
  },
  (id) => {
    if(card.isLiked()) {
      api.deleteLike(id)
      .then(data => {
        card.setLikes(data.likes)
      })
    } else {
      api.putLike(id)
      .then(data => {
        card.setLikes(data.likes)
        console.log(data.likes)
      })
    } 
  });
  const cardElement = card.createCard();
  return cardElement;
}

function render (card) {
  const newCard = createNewCard(card); 
  section.addItem(newCard);
};

section.renderItems([]) 

