import '../pages/index.css';

import { buttonEditInfo, buttonAddCard, formAddCard, formEditInfo, nameInput, aboutInput, validateList, initialCards } from '../components/constants.js';
import { FormValidator } from '../components/FormValidator.js';
import { Card} from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';


const profileValidator = new FormValidator(validateList, formEditInfo);
const cardValidator = new FormValidator(validateList, formAddCard);

const section = new Section({ renderer: render }, '.elements');

const imagePopup = new PopupWithImage('#photoView');
const cardPopup = new PopupWithForm('#cardPopup', submitCard);
const profilePopup = new PopupWithForm('#infoPopup', submitProfileChanges);

const userInfo = new UserInfo({
  usernameSelector: '.profile__title', 
  aboutSelector: '.profile__subtitle'})

profileValidator.enableValidation();
cardValidator.enableValidation();

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

buttonEditInfo.addEventListener('click', openEditForm);
buttonAddCard.addEventListener('click', openAddForm);

function submitProfileChanges (data) {
  userInfo.setUserInfo(data);
  profilePopup.close()
};

function submitCard (item) {
  const newCard = createNewCard(item);
  section.addItem(newCard);
  cardPopup.close()
};

function createNewCard (item) {
  const card = new Card (item, '#template', () => {
    imagePopup.open(item.caption, item.link)
  });
  const cardElement = card.createCard();
  return cardElement;
}

function render (card) {
  const newCard = createNewCard(card); 
  section.addItem(newCard);
};

imagePopup.setEventListeners();
cardPopup.setEventListeners();
profilePopup.setEventListeners();

section.renderItems(initialCards)

