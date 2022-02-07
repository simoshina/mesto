const initialCards = [
  {
    caption: 'Алтай',
    link: 'images/алтай.jpg'
  },
  {
    caption: 'Маяк Анива',
    link: 'images/анива.jpg'
  },
  {
    caption: 'Камчатка',
    link: 'images/камчатка.jpg'
  },
  {
    caption: 'Карелия',
    link: 'images/карелия.jpg'
  },
  {
    caption: 'Куршская коса',
    link: 'images/коса.jpg'
  },
  {
    caption: 'Ямал',
    link: 'images/ямал.jpg'
  }
]; 

const elements = document.querySelector('.elements');
const template = document.querySelector('#card').content;
const addForm = document.getElementById('addCard');
const captionInput = addForm.querySelector('input[name="caption"]');
const linkInput = addForm.querySelector('input[name="link"]');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const infoPopup = document.getElementById('infoPopup');
const cardPopup = document.getElementById('cardPopup');
const editFormCloseButton = document.getElementById('editFormClose');
const addFormCloseButton = document.getElementById('addFormClose');

const photoView = document.getElementById('photoView');
const photoViewCloseButton = document.getElementById('photoViewClose');

const editInfo = document.getElementById('editInfo');
const nameInput = editInfo.querySelector('input[name="name"]');
const aboutInput = editInfo.querySelector('input[name="about"]');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');


function render () {
  initialCards.forEach(renderElement);
};

function renderElement({caption, link}) {
  const element = template.cloneNode(true);
  element.querySelector('.element__photo').alt = caption;
  element.querySelector('.element__title').textContent = caption;
  element.querySelector('.element__photo').src = link;
  addListeners (element);
  elements.prepend(element);
};

function submitCard (evt) {
  evt.preventDefault();
  let caption = captionInput.value;
  let link = linkInput.value;
  renderElement({caption, link});
  captionInput.value = '';
  linkInput.value = '';
  closeAddForm (evt);
};

function addListeners (el) {
  el.querySelector('.element__delete-button').addEventListener('click', deleteCard);
  el.querySelector('.element__like-button').addEventListener('click', clickLikeButton);
  el.querySelector('.element__photo').addEventListener('click', openPhotoView);
};

function clickLikeButton (evt) {
  evt.target.classList.toggle('element__like-button_active');
};

function deleteCard (evt) {
  evt.target.parentElement.remove();
};

function openEditForm (evt) {
  evt.preventDefault();
  infoPopup.classList.add('popup_opened');
  nameInput.value = profileTitle.textContent;
  aboutInput.value = profileSubtitle.textContent;
};

function openAddForm (evt) {
  evt.preventDefault();
  cardPopup.classList.add('popup_opened');
};

function openPhotoView (evt) {
  evt.preventDefault();
  photoView.classList.add('popup_opened');
  photoView.querySelector('.popup__image').src = evt.target.src;
  photoView.querySelector('.popup__image').alt = evt.target.alt;
  photoView.querySelector('.popup__caption').textContent = evt.target.alt;
}

function closeEditForm (evt) {
  evt.preventDefault();
  infoPopup.classList.remove('popup_opened');
};

function closeAddForm (evt) {
  evt.preventDefault();
  cardPopup.classList.remove('popup_opened');
};

function closePhotoView (evt) {
  evt.preventDefault();
  photoView.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
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

editInfo.addEventListener('submit', formSubmitHandler);
addForm.addEventListener('submit', submitCard);

render ();