import { isEscEvent } from './utils/utils-function.js';
const ALERT_GET_DATA_MESSAGE = 'Ошибка загрузки объявлений';
const ALERT_GET_DATA_BUTTON_TEXT = 'Повторить загрузку';

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

  return alertDiv;

};

const showAlertGetDataError = function () {
  // выделил, чтобы потом попробовать добавить обработчик на  button
  const mapFilter = document.querySelector('.map__filters-container');
  const map = document.querySelector('.map');

  map.insertBefore(createAlertGetDataError(), mapFilter);
};

const removePopup = function (popupElement) {
  popupElement.remove();
  //document.removeEventListener('click');
  document.removeEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      removePopup(popupElement);
    }
  });
  document.removeEventListener('click', (evt) => {
    evt.preventDefault();
    removePopup(popupElement);
  });
};

const addPopupCloseKeydown = function (popupElement) {
  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      removePopup(popupElement);
    }
  });
};

const addPopupCloseClick = function (popupElement) {
  document.addEventListener('click', (evt) => {
    evt.preventDefault();
    removePopup(popupElement);
  });
};

const showPostPopup = function (popupElement) {
  document.body.appendChild(popupElement);
  addPopupCloseKeydown(popupElement);
  addPopupCloseClick(popupElement);
};

const showSuccessPostPopup = function () {
  const succesTemplate = document.querySelector('#success').content;
  const newSuccessPopup = succesTemplate.querySelector('.success');
  showPostPopup(newSuccessPopup);
};

const showErrorPostPopup = function () {
  const errorTemplate = document.querySelector('#error').content;
  const newErrorPopup = errorTemplate.querySelector('.error').cloneNode(true);
  showPostPopup(newErrorPopup);
};

export { showAlertGetDataError, showPostPopup, showSuccessPostPopup, showErrorPostPopup };
