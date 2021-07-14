import { getRoomCapacity, getNoGuestLimit, getRoomPrice } from './form-object-setting.js';
import { postData } from './fetch-data.js';
import { showSuccessPostPopup, showErrorPostPopup } from './popup.js';
import { resetMapFilter } from './map-filter.js';
import { resetMainMarker } from './map/map.js';

const advertisementForm = document.querySelector('.ad-form');
const advertisementFormElement = advertisementForm.querySelectorAll('.ad-form-header, .ad-form__element');

const advertisementFormTitle = advertisementForm.querySelector('#title');
const advertisementFormTitleMinLength = advertisementFormTitle.getAttribute('minlength');
const advertisementFormTitleMaxLength = advertisementFormTitle.getAttribute('maxlength');

const priceInput = advertisementForm.querySelector('#price');
const advertisementFormPlaceType = advertisementForm.querySelector('#type');

const advertisementFormPrice = advertisementForm.querySelector('#price');
const advertisementFormMinPrice = advertisementFormPrice.getAttribute('min');
const advertisementFormMaxPrice = advertisementFormPrice.getAttribute('max');

const advertisementFormAddress = advertisementForm.querySelector('#address');

const advertisementFormRoom = advertisementForm.querySelector('#room_number');
const advertisementFormCapacity = advertisementForm.querySelector('#capacity');

const advertisementFormCheckin = advertisementForm.querySelector('#timein');
const advertisementFormCheckout = advertisementForm.querySelector('#timeout');

const setAddressValue = function (addressValueObject) {
  advertisementFormAddress.value = `${addressValueObject.lat.toFixed(5)}, ${addressValueObject.lng.toFixed(5)}`;
};

const checkTimeSync = function () {
  if (advertisementFormCheckin.value !== advertisementFormCheckout.value) {
    advertisementFormCheckin.setCustomValidity('Время заезда и время выезда не синхронизированы');
    advertisementFormCheckout.setCustomValidity('Время заезда и время выезда не синхронизированы');
    advertisementFormCheckin.classList.add('ad-form__select--error');
    advertisementFormCheckout.classList.add('ad-form__select--error');
  } else {
    advertisementFormCheckin.setCustomValidity('');
    advertisementFormCheckin.classList.remove('ad-form__select--error');
    advertisementFormCheckout.setCustomValidity('');
    advertisementFormCheckout.classList.remove('ad-form__select--error');
    return true;
  }
  return false;
};

advertisementForm.querySelector('#timein').addEventListener('change', () => {
  advertisementFormCheckout.value = advertisementFormCheckin.value;
  checkTimeSync();
});

advertisementForm.querySelector('#timeout').addEventListener('change', () => {
  advertisementFormCheckin.value = advertisementFormCheckout.value;
  checkTimeSync();
});

//установка минимальной стоимости price
const setPlacePrice = function (priceRules) {
  const currentPlaceType = advertisementFormPlaceType.value;
  priceInput.setAttribute('min', priceRules[currentPlaceType].MIN_PRICE);
  priceInput.setAttribute('max', priceRules[currentPlaceType].MAX_PRICE);
  priceInput.setAttribute('placeholder', priceRules[currentPlaceType].MIN_PRICE);
};

const disableAdvertisementForm = function () {
  advertisementForm.classList.add('ad-form--disabled');
  advertisementFormElement.forEach((element) => { element.setAttribute('disabled', ''); });
};

const enableAdvertisementForm = function () {
  setPlacePrice(getRoomPrice());
  advertisementForm.classList.remove('ad-form--disabled');
  advertisementFormElement.forEach((element) => { element.removeAttribute('disabled'); });
};

//проверка заголовка при вводе
const checkTitle = function (minLength, maxLength) {
  const valueLength = advertisementFormTitle.value.length;
  if (valueLength < minLength) {
    advertisementFormTitle.setCustomValidity(`Минимальная длина должна быть не менее ${advertisementFormTitleMinLength} знаков. \n Сейчас используется знаков: ${advertisementFormTitle.value.length} `);
    advertisementFormTitle.classList.add('ad-form__input--error');
  } else if (valueLength > maxLength) {
    advertisementFormTitle.setCustomValidity(`Заголовок не должен быть длинее ${advertisementFormTitleMaxLength} знаков`);
    advertisementFormTitle.classList.add('ad-form__input--error');
  } else {
    advertisementFormTitle.setCustomValidity('');
    advertisementFormTitle.classList.remove('ad-form__input--error');
    return true;
  }
  return false;
};

const checkPrice = function (minPrice, maxPrice) {
  const valuePrice = advertisementFormPrice.value;
  if (valuePrice < Number(minPrice)) {
    advertisementFormPrice.setCustomValidity(`Цена не должна быть меньше ${minPrice}`);
    advertisementFormPrice.classList.add('ad-form__input--error');
  } else if (valuePrice > Number(maxPrice)) {
    advertisementFormPrice.setCustomValidity(`Цена не должна быть больше ${maxPrice}`);
    advertisementFormPrice.classList.add('ad-form__input--error');
  } else {
    advertisementFormPrice.setCustomValidity('');
    advertisementFormPrice.classList.remove('ad-form__input--error');
    return true;
  }
  advertisementFormPrice.reportValidity();
  return false;
};

const checkAddress = function () {
  const valueLength = advertisementFormAddress.value.length;
  if (valueLength === 0) {
    advertisementFormAddress.setCustomValidity('Произошло что-то непонятное. Значение адреса не заполнено');
    advertisementFormAddress.classList.add('ad-form__input--error');
  } else {
    advertisementFormAddress.setCustomValidity('');
    return true;
  }
  advertisementFormAddress.reportValidity();
  return false;
};

const checkNumRoom = function (capacityRules) {
  let currentNumRoom = advertisementFormRoom.value;
  const currentCapacity = advertisementFormCapacity.value;

  if (currentNumRoom >= getNoGuestLimit()) { currentNumRoom = 'noGuest'; }

  if (currentNumRoom === 'noGuest' && (currentCapacity < capacityRules[currentNumRoom].MIN || currentCapacity > capacityRules[currentNumRoom].MAX)) {
    advertisementFormRoom.setCustomValidity('Для выбранного количества комнат должно быть выбрано значение \n "Не для гостей" \n Измените количество комнат или количество гостей');

    advertisementFormCapacity.setCustomValidity('Для выбранного количества комнат должно быть выбрано значение \n "Не для гостей" \n Измените количество комнат или количество гостей');

    advertisementFormRoom.classList.add('ad-form__select--error');
    advertisementFormCapacity.classList.add('ad-form__select--error');
  }
  else if (currentNumRoom !== 'noGuest' && (currentCapacity < capacityRules[currentNumRoom].MIN || currentCapacity > capacityRules[currentNumRoom].MAX)) {
    advertisementFormRoom.setCustomValidity(`Для количества комнат ${currentNumRoom} указано неверное количество гостей \n Допустимое число гостей от "${capacityRules[currentNumRoom].MIN}" до "${capacityRules[currentNumRoom].MAX}" \n Измените количество комнат или количество гостей`);

    advertisementFormCapacity.setCustomValidity(`Для количества комнат ${currentNumRoom} указано неверное количество гостей \n Допустимое число гостей от "${capacityRules[currentNumRoom].MIN}" до "${capacityRules[currentNumRoom].MAX}" \n Измените количество комнат или количество гостей`);

    advertisementFormRoom.classList.add('ad-form__select--error');
    advertisementFormCapacity.classList.add('ad-form__select--error');
  }
  else {
    advertisementFormRoom.setCustomValidity('');
    advertisementFormCapacity.setCustomValidity('');
    advertisementFormRoom.classList.remove('ad-form__select--error');
    advertisementFormCapacity.classList.remove('ad-form__select--error');
    return true;
  }
  return false;
};

advertisementFormTitle.addEventListener('input', () => {
  checkTitle(advertisementFormTitleMinLength, advertisementFormTitleMaxLength);
  advertisementFormTitle.reportValidity();
});

advertisementFormPrice.addEventListener('input', () => {
  checkPrice(advertisementFormMinPrice, advertisementFormMaxPrice);
  advertisementFormPrice.reportValidity();
});

advertisementFormRoom.addEventListener('change', () => {
  checkNumRoom(getRoomCapacity());
  advertisementFormRoom.reportValidity();
});

advertisementFormCapacity.addEventListener('change', () => {
  checkNumRoom(getRoomCapacity());
  advertisementFormCapacity.reportValidity();
});

const inputEvent = new Event('input');
advertisementFormPlaceType.addEventListener('change', () => {
  setPlacePrice(getRoomPrice());
  advertisementFormPrice.dispatchEvent(inputEvent);
});

advertisementFormAddress.addEventListener('invalid', () => {
  advertisementFormAddress.classList.add('ad-form__input--error');
});

advertisementFormTitle.addEventListener('invalid', () => {
  if (advertisementFormTitle.validity.valueMissing) { advertisementFormTitle.setCustomValidity('Поле должно быть заполнено'); }
  if (advertisementFormTitle.validity.rangeUnderflow) { advertisementFormTitle.setCustomValidity('Поле меньше минимального допустимого значения'); }
  advertisementFormTitle.classList.add('ad-form__input--error');
});

advertisementFormPrice.addEventListener('invalid', () => {
  if (advertisementFormPrice.validity.valueMissing) { advertisementFormPrice.setCustomValidity('Поле должно быть заполнено'); }
  if (advertisementFormPrice.validity.typeMismatch) { advertisementFormPrice.setCustomValidity('Поле должно содержать число'); }
  advertisementFormPrice.classList.add('ad-form__input--error');
});

const resetForm = function () {
  advertisementForm.reset();
  setPlacePrice(getRoomPrice());
};

const resetPageForm = function () {
  resetForm();
  resetMapFilter();
  resetMainMarker();
};

const resetAlertStyle = function () {
  advertisementForm.querySelectorAll('.ad-form__input--error, .ad-form__select--error')
    .forEach((element) => {
      element.classList.remove('ad-form__input--error');
      element.classList.remove('ad-form__select--error');
    });
};

const successPostData = function () {
  showSuccessPostPopup();
  resetPageForm();
};

advertisementForm.querySelector('.ad-form__submit').addEventListener('click', () => {
  checkTitle(advertisementFormTitleMinLength, advertisementFormTitleMaxLength);
  checkAddress();
  checkPrice(advertisementFormMinPrice, advertisementFormMaxPrice);
  checkNumRoom(getRoomCapacity());
  checkTimeSync();
});

advertisementForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  postData(successPostData, showErrorPostPopup, formData);
});

advertisementForm.querySelector('.ad-form__reset').addEventListener('click', (evt) => {
  evt.preventDefault();
  resetPageForm();
  resetAlertStyle();
});

disableAdvertisementForm();

export { disableAdvertisementForm, enableAdvertisementForm, setAddressValue };
