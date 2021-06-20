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


export { disableMapFilter, disableAdvertisementForm, enableMapFilter, enableAdvertisementForm };
