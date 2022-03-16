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
    this._template = document.querySelector(template).content.querySelector('.element');
    this._openPhotoView = openPhotoView;
  }

  _clickLikeButton = () => {
    this._buttonLike.classList.toggle('element__like-button_active');
  };
  
  _deleteCard = () => {
    this._element.remove();
    this._element = null;
  };

  _addListeners () {
    this._buttonDelete.addEventListener('click', this._deleteCard);
    this._buttonLike.addEventListener('click', this._clickLikeButton);
    this._photo.addEventListener('click', this._openPhotoView);
  };

  createCard() {
    this._element = this._template.cloneNode(true);
    this._buttonLike = this._element.querySelector('.element__like-button');
    this._buttonDelete = this._element.querySelector('.element__delete-button');
    this._photo = this._element.querySelector('.element__photo');
    this._photo.alt = this._data.caption;
    this._photo.src = this._data.link;
    this._element.querySelector('.element__title').textContent = this._data.caption;
    this._addListeners();
    return this._element;
  };
}
