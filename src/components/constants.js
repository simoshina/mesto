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