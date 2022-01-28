const likeButton = document.querySelectorAll('.element__like-button');

likeButton.forEach(function(likeButton) {
  likeButton.addEventListener('click', function() {
    likeButton.classList.add('element__like-button_active');
  });
});

const popupOpenButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__exit-button');

let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('input[name="name"]');
let aboutInput = formElement.querySelector('input[name="about"]');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

function popupForm (evt) {
  evt.preventDefault();
  popup.classList.toggle('popup_opened');
  nameInput.value = profileTitle.textContent;
  aboutInput.value = profileSubtitle.textContent;
};

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = aboutInput.value;
  popupForm (evt);
};

popupOpenButton.addEventListener('click', popupForm);
popupCloseButton.addEventListener('click', popupForm);
formElement.addEventListener('submit', formSubmitHandler); 