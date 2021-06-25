import { getFornInputErrorStyle } from './form-error-setting.js';
import { getRoomCapacity, getNoGuestLimit, getRoomPrice } from './form-object-setting.js';

const mapFilter = document.querySelector('.map__filters');
const mapFilterElement = mapFilter.querySelectorAll('.map__filter, .map__features');

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

const checkinTimeList = advertisementFormCheckin.querySelectorAll('option');
const checkoutTimeList = advertisementFormCheckout.querySelectorAll('option');

//смена разметки в списке
const setTimeList = function (timeList, timeValue) {
  timeList.forEach((element) => {
    if (element.value === timeValue) {
      element.setAttribute('selected', '');
    } else {
      element.removeAttribute('selected');
    }
  });
};

//контроль синхронизации времени
const checkTimeSync = function () {
  if (advertisementFormCheckin.value !== advertisementFormCheckout.value) {
    advertisementFormCheckin.setCustomValidity('Время заезда и время выезда не синхронизированы');
    advertisementFormCheckout.setCustomValidity('Время заезда и время выезда не синхронизированы');
    advertisementFormCheckin.setAttribute('style', getFornInputErrorStyle());
    advertisementFormCheckout.setAttribute('style', getFornInputErrorStyle());
  } else {
    advertisementFormCheckin.setCustomValidity('');
    advertisementFormCheckin.removeAttribute('style');
    advertisementFormCheckout.setCustomValidity('');
    advertisementFormCheckout.removeAttribute('style');
    return true;
  }
  return false;
};

advertisementForm.querySelector('#timein').addEventListener('change', () => {
  setTimeList(checkoutTimeList, advertisementFormCheckin.value);
  setTimeList(checkinTimeList, advertisementFormCheckin.value);
  advertisementFormCheckout.value = advertisementFormCheckin.value;
  checkTimeSync();
});

advertisementForm.querySelector('#timeout').addEventListener('change', () => {
  setTimeList(checkinTimeList, advertisementFormCheckout.value);
  setTimeList(checkoutTimeList, advertisementFormCheckout.value);
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

const disableMapFilter = function () {
  mapFilter.classList.add('map__filters--disabled');
  mapFilterElement.forEach((element) => { element.setAttribute('disabled', ''); });
};

const disableAdvertisementForm = function () {
  advertisementForm.classList.add('ad-form--disabled');
  advertisementFormElement.forEach((element) => { element.setAttribute('disabled', ''); });
};

const enableMapFilter = function () {
  mapFilter.classList.remove('map__filters--disabled');
  mapFilterElement.forEach((element) => { element.removeAttribute('disabled'); });
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
    advertisementFormTitle.setAttribute('style', getFornInputErrorStyle());
  } else if (valueLength > maxLength) {
    advertisementFormTitle.setCustomValidity(`Заголовок не должен быть длинее ${advertisementFormTitleMaxLength} знаков`);
    advertisementFormTitle.setAttribute('style', getFornInputErrorStyle());
  } else {
    advertisementFormTitle.setCustomValidity('');
    advertisementFormTitle.removeAttribute('style');
    return true;
  }
  return false;
};

//проверка цены при вводе
const checkPrice = function (minPrice, maxPrice) {
  const valuePrice = advertisementFormPrice.value;
  if (valuePrice < Number(minPrice)) {
    advertisementFormPrice.setCustomValidity(`Цена не должна быть меньше ${minPrice}`);
    advertisementFormPrice.setAttribute('style', getFornInputErrorStyle());
  } else if (valuePrice > Number(maxPrice)) {
    advertisementFormPrice.setCustomValidity(`Цена не должна быть больше ${maxPrice}`);
    advertisementFormPrice.setAttribute('style', getFornInputErrorStyle());
  } else {
    advertisementFormPrice.setCustomValidity('');
    advertisementFormPrice.removeAttribute('style');
    return true;
  }
  advertisementFormPrice.reportValidity();
  return false;
};

// проверка адреса
const checkAddress = function () {
  const valueLength = advertisementFormAddress.value.length;
  if (valueLength === 0) {
    advertisementFormAddress.setCustomValidity('Произошло что-то непонятное. Значение адреса не заполнено');
    advertisementFormAddress.setAttribute('style', getFornInputErrorStyle());
  } else {
    advertisementFormAddress.setCustomValidity('');
    return true;
  }
  //почему браузер не выдает сообщение об ошибке?
  advertisementFormAddress.reportValidity();
  return false;
};

//проверка комнат
const checkNumRoom = function (capacityRules) {
  let currentNumRoom = advertisementFormRoom.value;
  const currentCapacity = advertisementFormCapacity.value;

  if (currentNumRoom >= getNoGuestLimit()) { currentNumRoom = 'noGuest'; }

  if (currentNumRoom === 'noGuest' && (currentCapacity < capacityRules[currentNumRoom].MIN || currentCapacity > capacityRules[currentNumRoom].MAX)) {
    advertisementFormRoom.setCustomValidity('Для выбранного количества комнат должно быть выбрано значение \n "Не для гостей" \n Измените количество комнат или количество гостей');

    advertisementFormCapacity.setCustomValidity('Для выбранного количества комнат должно быть выбрано значение \n "Не для гостей" \n Измените количество комнат или количество гостей');

    advertisementFormRoom.setAttribute('style', getFornInputErrorStyle());
    advertisementFormCapacity.setAttribute('style', getFornInputErrorStyle());
  }
  else if (currentNumRoom !== 'noGuest' && (currentCapacity < capacityRules[currentNumRoom].MIN || currentCapacity > capacityRules[currentNumRoom].MAX)) {
    advertisementFormRoom.setCustomValidity(`Для количества комнат ${currentNumRoom} указано неверное количество гостей \n Допустимое число гостей от "${capacityRules[currentNumRoom].MIN}" до "${capacityRules[currentNumRoom].MAX}" \n Измените количество комнат или количество гостей`);

    advertisementFormCapacity.setCustomValidity(`Для количества комнат ${currentNumRoom} указано неверное количество гостей \n Допустимое число гостей от "${capacityRules[currentNumRoom].MIN}" до "${capacityRules[currentNumRoom].MAX}" \n Измените количество комнат или количество гостей`);

    advertisementFormRoom.setAttribute('style', getFornInputErrorStyle());
    advertisementFormCapacity.setAttribute('style', getFornInputErrorStyle());
  }
  else {
    advertisementFormRoom.setCustomValidity('');
    advertisementFormCapacity.setCustomValidity('');
    advertisementFormRoom.removeAttribute('style');
    advertisementFormCapacity.removeAttribute('style');
    return true;
  }
  return false;
};

//запуск проверок на этапе ввода
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

// адрес установлен required readonly. я бы хотел, чтобы  хоть что-то происходило по событию invalid
// но оно почему-то не выдается
// возможно неверное событие, но я не могу понять какое событие нужно
advertisementFormAddress.addEventListener('invalid', () => {
  advertisementFormAddress.setAttribute('style', getFornInputErrorStyle());
});

// при наличии дефолтного значения не срабатывает проверка по минимальному значению. почему?
advertisementFormTitle.addEventListener('invalid', () => {
  if (advertisementFormTitle.validity.valueMissing) { advertisementFormTitle.setCustomValidity('Поле должно быть заполнено'); }
  if (advertisementFormTitle.validity.rangeUnderflow) { advertisementFormTitle.setCustomValidity('Поле меньше минимального допустимого значения'); }
  advertisementFormTitle.setAttribute('style', getFornInputErrorStyle());
});

advertisementFormPrice.addEventListener('invalid', () => {
  if (advertisementFormPrice.validity.valueMissing) { advertisementFormPrice.setCustomValidity('Поле должно быть заполнено'); }
  if (advertisementFormPrice.validity.typeMismatch) { advertisementFormPrice.setCustomValidity('Поле должно содержать число'); }
  advertisementFormPrice.setAttribute('style', getFornInputErrorStyle());
});

advertisementForm.addEventListener('submit', (evt) => {
  const checkTitleResult = checkTitle(advertisementFormTitleMinLength, advertisementFormTitleMaxLength);
  const checkAddressResult = checkAddress();
  const checkPriceResult = checkPrice(advertisementFormMinPrice, advertisementFormMaxPrice);
  const checkNumRoomResult = checkNumRoom(getRoomCapacity());
  const checkTimeRoomResult= checkTimeSync();

  if (!checkTitleResult || !checkAddressResult || !checkPriceResult || !checkNumRoomResult || !checkTimeRoomResult) {
    advertisementForm.reportValidity();
    evt.preventDefault();
  }
  // и не получается, чтобы ошибки по событию invalid и пользовательские проверки отображались все сразу
  // первыми всегда срабатывает событие invalid
});

export { disableMapFilter, disableAdvertisementForm, enableMapFilter, enableAdvertisementForm };
