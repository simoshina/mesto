import { FormValidator } from './FormValidator.js';
import { initialCards, Card} from './Card.js';

const cardsContainer = document.querySelector('.elements');
const buttonEditInfo = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');

const cardPopup = document.querySelector('#cardPopup');
const formAddCard = document.querySelector('#addCard');
const captionInput = formAddCard.querySelector('input[name="caption"]');
const linkInput = formAddCard.querySelector('input[name="link"]');
const buttonCloseAddForm = formAddCard.querySelector('#addFormClose');

const photoView = document.querySelector('#photoView');
const image = photoView.querySelector('.popup__image');
const buttonClosePhotoView = document.querySelector('#photoViewClose');

const infoPopup = document.querySelector('#infoPopup');
const formEditInfo = document.querySelector('#editInfo');
const nameInput = formEditInfo.querySelector('input[name="name"]');
const aboutInput = formEditInfo.querySelector('input[name="about"]');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const buttonCloseEditForm = document.querySelector('#editFormClose');

const validateList = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const editInfoValidator = new FormValidator(validateList, formEditInfo);
const addFormValidator = new FormValidator(validateList, formAddCard);

editInfoValidator.enableValidation();
addFormValidator.enableValidation();

function render () {
  initialCards.forEach((card) => {
    const newCard = createNewCard(card); 
    renderElement(newCard, cardsContainer);
  });
};

function renderElement (card, container) {
  container.prepend(card);
};

function createNewCard (item) {
  const card = new Card (item, '#template', openPhotoView);
  const cardElement = card.createCard();
  return cardElement;
}

function submitCard (evt) {
  evt.preventDefault();
  const newCard = {
    caption: captionInput.value,
    link: linkInput.value
  };
  renderElement(createNewCard(newCard), cardsContainer);
  closeAddForm (evt);
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
  editInfoValidator.checkButtonValidity();
  nameInput.value = profileTitle.textContent;
  aboutInput.value = profileSubtitle.textContent;
};

function openAddForm () {
  formAddCard.reset();
  openPopup (cardPopup);
  addFormValidator.checkButtonValidity();
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

buttonEditInfo.addEventListener('click', openEditForm);
buttonAddCard.addEventListener('click', openAddForm);

buttonCloseEditForm.addEventListener('click', closeEditForm);
buttonCloseAddForm.addEventListener('click', closeAddForm);
buttonClosePhotoView.addEventListener('click', closePhotoView);

formEditInfo.addEventListener('submit', submitProfileChanges);
formAddCard.addEventListener('submit', submitCard);

render ();