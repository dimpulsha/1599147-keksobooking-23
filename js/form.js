const mapFilter = document.querySelector('.map__filters');
const mapFilterElement = mapFilter.querySelectorAll('.map__filter, .map__features');

const advertisementForm = document.querySelector('.ad-form');
const advertisementFormElement = advertisementForm.querySelectorAll('.ad-form-header, .ad-form__element');

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
  advertisementForm.classList.remove('ad-form--disabled');
  advertisementFormElement.forEach((element) => { element.removeAttribute('disabled'); });
};

const ERROR_BG_COLOR = 'rgb(248, 232, 140)';
const ERROR_STYLE = `background-color: ${ERROR_BG_COLOR};`;

const ROOM_CAPACITY = {
  '1': {
    MIN: 1,
    MAX: 1,
  },
  '2': {
    MIN: 1,
    MAX: 2,
  },
  '3': {
    MIN: 1,
    MAX: 3,
  },
  'noGuest': {
    MIN: 0,
    MAX: 0,
  },
};

const NO_GUEST_ROOM = 100;

const advertisementFormTitle = advertisementForm.querySelector('#title');
const advertisementFormTitleMinLength = advertisementFormTitle.getAttribute('minlength');
const advertisementFormTitleMaxLength = advertisementFormTitle.getAttribute('maxlength');

//проверка заголовка при вводе
const checkTitle = function (minLength, maxLength) {
  const valueLength = advertisementFormTitle.value.length;
  if (valueLength < minLength) {
    advertisementFormTitle.setCustomValidity(`Минимальная длина должна быть не менее ${advertisementFormTitleMinLength} знаков. \n Сейчас используется знаков: ${advertisementFormTitle.value.length} `);
    advertisementFormTitle.setAttribute('style', ERROR_STYLE);
  } else if (valueLength > maxLength) {
    advertisementFormTitle.setCustomValidity(`Заголовок не должен быть длинее ${advertisementFormTitleMaxLength} знаков`);
    advertisementFormTitle.setAttribute('style', ERROR_STYLE);
  } else {
    advertisementFormTitle.setCustomValidity('');
    advertisementFormTitle.removeAttribute('style');
    return true;
  }
  return false;
};

const advertisementFormPrice = advertisementForm.querySelector('#price');
const advertisementFormMinPrice = advertisementFormPrice.getAttribute('min');
const advertisementFormMaxPrice = advertisementFormPrice.getAttribute('max');

//проверка цены при вводе
const checkPrice = function (minPrice, maxPrice) {
  const valuePrice = advertisementFormPrice.value;
  if (valuePrice < Number(minPrice)) {
    advertisementFormPrice.setCustomValidity(`Цена не должна быть меньше ${minPrice}`);
    advertisementFormPrice.setAttribute('style', ERROR_STYLE);
  } else if (valuePrice > Number(maxPrice)) {
    advertisementFormPrice.setCustomValidity(`Цена не должна быть больше ${maxPrice}`);
    advertisementFormPrice.setAttribute('style', ERROR_STYLE);
  } else {
    advertisementFormPrice.setCustomValidity('');
    advertisementFormPrice.removeAttribute('style');
    return true;
  }
  advertisementFormPrice.reportValidity();
  return false;
};

// проверка адреса
const advertisementFormAddress = advertisementForm.querySelector('#address');
const checkAddress = function () {
  const valueLength = advertisementFormAddress.value.length;
  if (valueLength === 0) {
    advertisementFormAddress.setCustomValidity('Произошло что-то непонятное. Значение адреса не заполнено');
    advertisementFormAddress.setAttribute('style', ERROR_STYLE);
  } else {
    advertisementFormAddress.setCustomValidity('');
  }
  //почему браузер не выдает сообщение об ошибке?
  advertisementFormAddress.reportValidity();
  return false;
};

//проверка комнат
const advertisementFormRoom = advertisementForm.querySelector('#room_number');
const advertisementFormCapacity = advertisementForm.querySelector('#capacity');

const checkNumRoom = function (capacityRules) {
  let currentNumRoom = advertisementFormRoom.value;
  const currentCapacity = advertisementFormCapacity.value;
  if (currentNumRoom >= NO_GUEST_ROOM) { currentNumRoom = 'noGuest'; }

  if (currentNumRoom === 'noGuest' && (currentCapacity < capacityRules[currentNumRoom].MIN || currentCapacity > capacityRules[currentNumRoom].MAX)) {
    advertisementFormRoom.setCustomValidity('Для выбранного количества комнат должно быть выбрано значение \n "Не для гостей" \n Измените количество комнат или количество гостей');

    advertisementFormCapacity.setCustomValidity('Для выбранного количества комнат должно быть выбрано значение \n "Не для гостей" \n Измените количество комнат или количество гостей');

    advertisementFormRoom.setAttribute('style', ERROR_STYLE);
    advertisementFormCapacity.setAttribute('style', ERROR_STYLE);
  }

  else if (currentNumRoom !== 'noGuest' && (currentCapacity < capacityRules[currentNumRoom].MIN || currentCapacity > capacityRules[currentNumRoom].MAX)) {
    advertisementFormRoom.setCustomValidity(`Для количества комнат ${currentNumRoom} указано неверное количество гостей \n Допустимое число гостей от "${capacityRules[currentNumRoom].MIN}" до "${capacityRules[currentNumRoom].MAX}" \n Измените количество комнат или количество гостей`);

    advertisementFormCapacity.setCustomValidity(`Для количества комнат ${currentNumRoom} указано неверное количество гостей \n Допустимое число гостей от "${capacityRules[currentNumRoom].MIN}" до "${capacityRules[currentNumRoom].MAX}" \n Измените количество комнат или количество гостей`);

    advertisementFormRoom.setAttribute('style', ERROR_STYLE);
    advertisementFormCapacity.setAttribute('style', ERROR_STYLE);
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

//запуск проверок на этапк ввода

advertisementFormTitle.addEventListener('input', () => {
  checkTitle(advertisementFormTitleMinLength, advertisementFormTitleMaxLength);
  advertisementFormTitle.reportValidity();
});

advertisementFormPrice.addEventListener('input', () => {
  checkPrice(advertisementFormMinPrice, advertisementFormMaxPrice);
  advertisementFormPrice.reportValidity();
});

advertisementFormRoom.addEventListener('change', () => {
  checkNumRoom(ROOM_CAPACITY);
  advertisementFormRoom.reportValidity();
});

advertisementFormCapacity.addEventListener('change', () => {
  checkNumRoom(ROOM_CAPACITY);
  advertisementFormCapacity.reportValidity();
});

// адрес установлен required readonly. я бы хотел, чтобы  хоть что-то происходило по событию invalid
// но оно почему-то не выдается
// возможно неверное событие, но я не могу понять какое событие нужно
advertisementFormAddress.addEventListener('invalid', () => {
  advertisementFormAddress.setAttribute('style', ERROR_STYLE);
});

// эта проверка тоже не работает если в HTML есть значение по умолчанию
advertisementFormTitle.addEventListener('invalid', () => {
  if (advertisementFormTitle.validity.valueMissing) { advertisementFormTitle.setCustomValidity('Поле должно быть заполнено'); }
  advertisementFormTitle.setAttribute('style', ERROR_STYLE);
});

advertisementFormPrice.addEventListener('invalid', () => {

  if (advertisementFormPrice.validity.valueMissing) { advertisementFormPrice.setCustomValidity('Поле должно быть заполнено'); }
  if (advertisementFormPrice.validity.typeMismatch) { advertisementFormPrice.setCustomValidity('Поле должно содержать число'); }

  advertisementFormPrice.setAttribute('style', ERROR_STYLE);
});

advertisementForm.addEventListener('submit', (evt) => {

  // и не получается, чтобы ошибки по событию invalid и пользовательские проверки отображались все сразу
  // первыми всегда срабатывает событие invalid
  if (!checkTitle(advertisementFormTitleMinLength, advertisementFormTitleMaxLength) ||
    !checkAddress() || !checkPrice(advertisementFormMinPrice, advertisementFormMaxPrice) ||
    !checkNumRoom(ROOM_CAPACITY)) {
    advertisementForm.reportValidity();
    evt.preventDefault();
  }
});

export { disableMapFilter, disableAdvertisementForm, enableMapFilter, enableAdvertisementForm };
