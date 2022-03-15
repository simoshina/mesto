export const initialCards = [
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

export class Card {
  constructor(data, template, openPhotoView) {
    this._data = data;
    this._template = template;
    this._openPhotoView = openPhotoView;
  }

  _clickLikeButton (evt) {
    evt.target.classList.toggle('element__like-button_active');
  };
  
  _deleteCard (evt) {
    evt.target.closest('.element').remove();
  };

  _addListeners () {
    this._element.querySelector('.element__delete-button').addEventListener('click', this._deleteCard);
    this._element.querySelector('.element__like-button').addEventListener('click', this._clickLikeButton);
    this._photo.addEventListener('click', this._openPhotoView);
  };

  createCard() {
    this._element = this._template.cloneNode(true);
    this._photo = this._element.querySelector('.element__photo');
    this._photo.alt = this._data.caption;
    this._photo.src = this._data.link;
    this._element.querySelector('.element__title').textContent = this._data.caption;
    this._addListeners();
    return this._element;
  };
}
