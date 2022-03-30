export const buttonEditInfo = document.querySelector('.profile__edit-button');
export const buttonAddCard = document.querySelector('.profile__add-button');
export const formAddCard = document.querySelector('#addCard');
export const formEditInfo = document.querySelector('#editInfo');
export const nameInput = formEditInfo.querySelector('input[name="name"]');
export const aboutInput = formEditInfo.querySelector('input[name="about"]');

export const validateList = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

import altai from '../images/алтай.jpg';
import aniva from '../images/анива.jpg';
import kamchatka from '../images/камчатка.jpg';
import karelia from '../images/карелия.jpg';
import kosa from '../images/коса.jpg';
import yamal from '../images/ямал.jpg';

export const initialCards = [
  {
    caption: 'Алтай',
    link: altai
  },
  {
    caption: 'Маяк Анива',
    link: aniva
  },
  {
    caption: 'Камчатка',
    link: kamchatka
  },
  {
    caption: 'Карелия',
    link: karelia
  },
  {
    caption: 'Куршская коса',
    link: kosa
  },
  {
    caption: 'Ямал',
    link: yamal
  }
]; 