import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submit) {
    super(popupSelector);
    this._submit = submit;
    this._submitButton = this._form.querySelector('.popup__save-button');
    this._submitButtonText = this._submitButton.textContent;
    this._inputs = [...this._form.querySelectorAll('.popup__input')]
  }

  _getInputValues() {
    const values = {};
    this._inputs.forEach((input) => {
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