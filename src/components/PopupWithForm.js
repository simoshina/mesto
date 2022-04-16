import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submit) {
    super(popupSelector);
    this._submit = submit;
    this._form = this._popup.querySelector('.popup__form');
    this._submitButton = this._form.querySelector('.popup__save-button');
    this._submitButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    const inputs = [...this._form.querySelectorAll('.popup__input')]
    const values = {};
    inputs.forEach((input) => {
      values[input.name] = input.value
    });
    return values
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', () => {
      this._submit(this._getInputValues())
    });
  }

  loading(isLoading) {
    
    isLoading
      ? this._submitButton.textContent = 'Сохранение...'
      : this._submitButton.textContent = this._submitButtonText
  }

  close() {
    super.close();
    this._form.reset()
  }
}