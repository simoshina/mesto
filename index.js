const likeButton = document.querySelectorAll('.element__like-button');

likeButton.forEach(function(likeButton) {
  likeButton.addEventListener('click', function() {
    likeButton.style.backgroundImage = 'url(../../../images/likeOn.svg)';
  });
});

const popupOpenButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__exit-button')

popupOpenButton.addEventListener('click', function(event) {
  popup.classList.add('popup_opened');
  event.preventDefault();
});

popupCloseButton.addEventListener('click', function(event) {
  popup.classList.remove('popup_opened');
  event.preventDefault();
});

let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('input[name="name"]');
let aboutInput = formElement.querySelector('input[name="about"]');

function formSubmitHandler (evt) {
  evt.preventDefault();
  document.querySelector('.profile__title').textContent = nameInput.value;
  document.querySelector('.profile__subtitle').textContent = aboutInput.value;
  popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler); 