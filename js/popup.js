import { isEscEvent } from './utils/utils-function.js';
import { mainLoadData } from './main.js';

const ALERT_GET_DATA_MESSAGE = 'Ошибка загрузки объявлений';
const ALERT_GET_DATA_BUTTON_TEXT = 'Повторить загрузку';

const reloadData = function () {
  const alertGetDataError = document.querySelector('.map__error-alert');
  const alertButton = alertGetDataError.querySelector('button');
  alertGetDataError.remove();
  alertButton.removeEventListener('click', reloadData);
  mainLoadData();
};

const createAlertGetDataError = function () {

  const alertDiv = document.createElement('div');
  alertDiv.classList.add('map__error-alert');

  const alertMessage = document.createElement('span');
  alertMessage.classList.add('map__error--text');
  alertMessage.textContent = ALERT_GET_DATA_MESSAGE;

  const alertButton = document.createElement('button');
  alertButton.setAttribute('type', 'button');
  alertButton.textContent = ALERT_GET_DATA_BUTTON_TEXT;

  alertDiv.appendChild(alertMessage);
  alertDiv.appendChild(alertButton);

  alertButton.addEventListener('click', reloadData);

  return alertDiv;
};

const showAlertGetDataError = function () {
  const mapFilter = document.querySelector('.map__filters-container');
  const map = document.querySelector('.map');
  map.insertBefore(createAlertGetDataError(), mapFilter);
};

const removePopup = function (popupElement) {
  popupElement.remove();
  document.removeEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      removePopup(popupElement);
    }
  });
  document.removeEventListener('click', () => {
    removePopup(popupElement);
  });
  if (popupElement.querySelector('.error__button')) {
    popupElement.querySelector('.error__button').removeEventListener('keydown', () => {
      removePopup(popupElement);
    });
  }
};

const addPopupEscClose = function (popupElement) {
  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      removePopup(popupElement);
    }
  });
};

const addPopupClickClose = function (popupElement) {
  document.addEventListener('click', () => {
    removePopup(popupElement);
  });
};

const addPopupErrorButtonClose = function (popupElement) {
  const button = popupElement.querySelector('.error__button');
  button.focus();
  button.addEventListener('keydown', () => {
    removePopup(popupElement);
  });
};

const showPostPopup = function (popupElement, type = true) {
  document.body.appendChild(popupElement);
  addPopupEscClose(popupElement);
  addPopupClickClose(popupElement);
  if (!type) {
    addPopupErrorButtonClose(popupElement);
  }
};

const showSuccessPostPopup = function () {
  const succesTemplate = document.querySelector('#success').content;
  const newSuccessPopup = succesTemplate.querySelector('.success');
  showPostPopup(newSuccessPopup, true);
};

const showErrorPostPopup = function () {
  const errorTemplate = document.querySelector('#error').content;
  const newErrorPopup = errorTemplate.querySelector('.error').cloneNode(true);
  showPostPopup(newErrorPopup, false);
};

export { showAlertGetDataError, showPostPopup, showSuccessPostPopup, showErrorPostPopup };
