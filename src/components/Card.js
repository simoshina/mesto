export class Card {
  constructor(data, userId, template, handleCardClick, handleDeleteClick, handleLikeClick) {
    this._data = data;
    this._template = document.querySelector(template).content.querySelector('.element');
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._text = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._id = data._id;
  }

  isLiked() {
    const userLike = this._likes.find(user => user._id === this._userId);
    return userLike
  }

  setLikes(newLikes) {
    this._likes = newLikes;
    this._element.querySelector('.element__like-count')
      .textContent = this._likes.length;
    if (this.isLiked()) {
      this._buttonLike.classList.add('element__like-button_active')
    } else {
      this._buttonLike.classList.remove('element__like-button_active')
    }
  }
 
  deleteCard = () => {
    this._element.remove();
    this._element = null;
  };

  _addListeners () {
    this._buttonDelete.addEventListener('click', () => this._handleDeleteClick(this._id));
    this._buttonLike.addEventListener('click', () => this._handleLikeClick(this._id));
    this._photo.addEventListener('click', this._handleCardClick);
  };

  createCard() {
    this._element = this._template.cloneNode(true);
    this._buttonLike = this._element.querySelector('.element__like-button');
    this._buttonDelete = this._element.querySelector('.element__delete-button');
    this._photo = this._element.querySelector('.element__photo');
    this._photo.alt = this._text;
    this._photo.src = this._link;
    this._element.querySelector('.element__title').textContent = this._text;

    if (this._ownerId !== this._userId) {
      this._buttonDelete.style.display = 'none'
    };

    this.setLikes(this._likes);
    this._addListeners();
    return this._element;
  };
}
