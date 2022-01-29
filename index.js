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

function popupFormOpen (evt) {
  evt.preventDefault();
  popup.classList.add('popup_opened');
  nameInput.value = profileTitle.textContent;
  aboutInput.value = profileSubtitle.textContent;
};

function popupFormClose (evt) {
  evt.preventDefault();
  popup.classList.remove('popup_opened');
};

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = aboutInput.value;
  popupFormClose (evt);
};

popupOpenButton.addEventListener('click', popupFormOpen);
popupCloseButton.addEventListener('click', popupFormClose);
formElement.addEventListener('submit', formSubmitHandler); 