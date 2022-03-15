const elements = document.querySelector('.elements');
const template = document.querySelector('#card').content;
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const cardPopup = document.querySelector('#cardPopup');
const addForm = document.querySelector('#addCard');
const captionInput = addForm.querySelector('input[name="caption"]');
const linkInput = addForm.querySelector('input[name="link"]');
const addFormCloseButton = addForm.querySelector('#addFormClose');

const photoView = document.querySelector('#photoView');
const image = photoView.querySelector('.popup__image');
const photoViewCloseButton = document.querySelector('#photoViewClose');

const infoPopup = document.querySelector('#infoPopup');
const editInfo = document.querySelector('#editInfo');
const nameInput = editInfo.querySelector('input[name="name"]');
const aboutInput = editInfo.querySelector('input[name="about"]');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const editFormCloseButton = document.querySelector('#editFormClose');

import { FormValidator, validateList } from './FormValidator.js';

const editInfoValidator = new FormValidator(validateList, editInfo);
const addFormValidator = new FormValidator(validateList, addForm);

editInfoValidator.enableValidation();
addFormValidator.enableValidation();

import { initialCards, Card} from './Card.js';

function render () {
  initialCards.forEach((card) => {
    const newCard = createNewCard(card); 
    renderElement(newCard, elements);
  });
};

function renderElement (card, container) {
  container.prepend(card);
};

function createNewCard (item) {
  const card = new Card (item, template, openPhotoView);
  const cardElement = card.createCard();
  return cardElement;
}

function submitCard (evt) {
  evt.preventDefault();
  const newCard = {
    caption: captionInput.value,
    link: linkInput.value
  };
  renderElement(createNewCard(newCard), elements);
  closeAddForm (evt);
  const button = cardPopup.querySelector('.popup__save-button');
  button.setAttribute('disabled', true);
  button.classList.add('popup__save-button_disabled');
};

function openPopup (popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('mousedown', closeByOverlayClick);
  document.addEventListener('keydown', closePopupByEsc);
};

function closePopup (popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('mousedown', closeByOverlayClick);
  document.removeEventListener('keydown', closePopupByEsc);
};

const closePopupByEsc = (evt) => {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup (popup);
  }
}

function closeByOverlayClick (evt) {
  if (evt.target === evt.currentTarget) {
    closePopup (evt.target);
  } 
}

function openEditForm () {
  openPopup (infoPopup);
  nameInput.value = profileTitle.textContent;
  aboutInput.value = profileSubtitle.textContent;
};

function openAddForm () {
  addForm.reset();
  openPopup (cardPopup);
}; 

function openPhotoView (evt) {
  openPopup (photoView);
  image.src = evt.target.src;
  image.alt = evt.target.alt;
  photoView.querySelector('.popup__caption').textContent = evt.target.alt;
};

function closeEditForm () {
  closePopup (infoPopup);
};

function closeAddForm () {
  closePopup (cardPopup);
};

function closePhotoView () {
  closePopup (photoView);
}

function submitProfileChanges (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = aboutInput.value;
  closeEditForm (evt);
};

editButton.addEventListener('click', openEditForm);
addButton.addEventListener('click', openAddForm);

editFormCloseButton.addEventListener('click', closeEditForm);
addFormCloseButton.addEventListener('click', closeAddForm);
photoViewCloseButton.addEventListener('click', closePhotoView);

editInfo.addEventListener('submit', submitProfileChanges);
addForm.addEventListener('submit', submitCard);

render ();