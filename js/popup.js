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

const showAlertGetDataError = function() {

  const mapFilter = document.querySelector('.map__filters-container');
  const map = document.querySelector('.map');

  map.insertBefore(createAlertGetDataError(), mapFilter);
};

export { showAlertGetDataError };
