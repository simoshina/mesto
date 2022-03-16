export class FormValidator {
  constructor(config, form) {
    this._form = form;
    this._config = config;
  }
  
  _hasInvalidInput () {
    return this._inputs.some(input => {
      return !input.validity.valid;
    })
  }
  
  _showError (input) {
    const error = this._form.querySelector(`.${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(this._config.inputErrorClass);
    error.classList.add(this._config.errorClass);
  }

  _hideError (input) {
    const error = this._form.querySelector(`.${input.id}-error`);
    error.textContent = "";
    input.classList.remove(this._config.inputErrorClass);
    error.classList.remove(this._config.errorClass);
  }

  _checkInputValidity (input) {
    if (!input.validity.valid) {
      this._showError(input);
    } else {
      this._hideError(input);
    }
  }
  
  checkButtonValidity () {
    const { inactiveButtonClass } = this._config;
    if (!this._hasInvalidInput()) {
      this._button.classList.remove(inactiveButtonClass);
      this._button.removeAttribute('disabled');
    } else {
      this._button.classList.add(inactiveButtonClass);
      this._button.setAttribute('disabled', true);
    }
  }
  
  _setEventListeners() {
    this._inputs = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    this._button = this._form.querySelector(this._config.submitButtonSelector);
    this.checkButtonValidity();

    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this.checkButtonValidity();
      })
    })
  }
  
  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    this._setEventListeners();
  }
}