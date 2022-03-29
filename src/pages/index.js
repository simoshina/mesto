import '../pages/index.css';

import { buttonEditInfo, buttonAddCard, formAddCard, formEditInfo, nameInput, aboutInput, validateList } from '../components/constants.js';
import { FormValidator } from '../components/FormValidator.js';
import { initialCards, Card} from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';


const editInfoValidator = new FormValidator(validateList, formEditInfo);
const addFormValidator = new FormValidator(validateList, formAddCard);

const section = new Section({ items: initialCards, renderer: render }, '.elements');

const imagePopup = new PopupWithImage('#photoView');
const addCardPopup = new PopupWithForm('#cardPopup', submitCard);
const editInfoPopup = new PopupWithForm('#infoPopup', submitProfileChanges);

const userInfo = new UserInfo({
  usernameSelector: '.profile__title', 
  aboutSelector: '.profile__subtitle'})

editInfoValidator.enableValidation();
addFormValidator.enableValidation();

function openEditForm () {
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  aboutInput.value = data.about;
  editInfoValidator.checkButtonValidity();
  editInfoPopup.open()
};

function openAddForm () {
  addFormValidator.checkButtonValidity();
  addCardPopup.open()
}; 

buttonEditInfo.addEventListener('click', openEditForm);
buttonAddCard.addEventListener('click', openAddForm);

function submitProfileChanges (data) {
  userInfo.setUserInfo(data);
  editInfoPopup.close()
};

function submitCard (item) {
  const newCard = createNewCard(item);
  section.addItem(newCard);
  addCardPopup.close()
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
addCardPopup.setEventListeners();
editInfoPopup.setEventListeners();

section.renderItems()

