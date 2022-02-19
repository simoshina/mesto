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
  initialCards.forEach(function(el){
    const newCard = createCard(el.caption, el.link);
    renderElement(newCard, elements);
  });
};

function renderElement (card, container) {
  container.prepend(card);
};

function createCard(caption, link) {
  const element = template.cloneNode(true);
  const photo = element.querySelector('.element__photo');
  photo.alt = caption;
  photo.src = link;
  element.querySelector('.element__title').textContent = caption;
  addListeners (element);
  return element;
};

function submitCard (evt) {
  evt.preventDefault();
  const caption = captionInput.value;
  const link = linkInput.value;
  renderElement(createCard(caption, link), elements);
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
  evt.target.closest('.element').remove();
};

function openPopup (popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('mousedown', closeByOverlayClick);
  document.addEventListener('keydown', closePopupByEsc);
};

function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
};

const closePopupByEsc = (evt) => {
  const popup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup (popup);
  }
}

function closeByOverlayClick (evt) {
  if (evt.target === evt.currentTarget) {
    closePopup (evt.target);
  } 
}

function openEditForm (evt) {
  openPopup (infoPopup);
  nameInput.value = profileTitle.textContent;
  aboutInput.value = profileSubtitle.textContent;
};

function openAddForm (evt) {
  addForm.reset();
  enableValidation(validateList);
  openPopup (cardPopup);
}; 

function openPhotoView (evt) {
  openPopup (photoView);
  const image = photoView.querySelector('.popup__image');
  image.src = evt.target.src;
  image.alt = evt.target.alt;
  photoView.querySelector('.popup__caption').textContent = evt.target.alt;
};

function closeEditForm (evt) {
  closePopup (infoPopup);
};

function closeAddForm (evt) {
  closePopup (cardPopup);
};

function closePhotoView (evt) {
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