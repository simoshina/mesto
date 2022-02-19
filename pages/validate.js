const validateList = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const showError = (config, form, input) => {
  const error = form.querySelector(`.${input.id}-error`);
  error.textContent = input.validationMessage;
  input.classList.add(config.inputErrorClass);
  error.classList.add(config.errorClass);
}

const hideError = (config, form, input) => {
  const error = form.querySelector(`.${input.id}-error`);
  error.textContent = "";
  input.classList.remove(config.inputErrorClass);
  error.classList.remove(config.errorClass);
}

const checkInputValidity = (config, form, input) => {
  if (!input.validity.valid) {
    showError(config, form, input);
  } else {
    hideError(config, form, input);
  }
}

const hasInvalidInput = (inputs) => {
  return inputs.some(input => {
    return !input.validity.valid;
  })
}

const checkButtonValidity = (config, inputs, button) => {
  if (!hasInvalidInput(inputs)) {
    button.classList.remove(config.inactiveButtonClass);
    button.removeAttribute('disabled');
  } else {
    button.classList.add(config.inactiveButtonClass);
    button.setAttribute('disabled', true);
  }
}

const setEventListeners = (config, form) => {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);
  checkButtonValidity(config, inputs, button);

  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(config, form, input);
      checkButtonValidity(config, inputs, button);
    })
  })
}

const enableValidation = (config) => {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    setEventListeners(config, form);
  })
}

enableValidation(validateList);