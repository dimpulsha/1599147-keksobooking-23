const mapFilter = document.querySelector('.map__filters');
const mapFilterDropDownList = mapFilter.querySelectorAll('.map__filter');
const mapFilterFeatureList = mapFilter.querySelectorAll('.map__checkbox');

const disableMapFilter = function () {
  mapFilter.classList.add('map__filters--disabled');
  mapFilterDropDownList.forEach((element) => { element.setAttribute('disabled', ''); });
  mapFilterFeatureList.forEach((element) => { element.setAttribute('disabled', ''); });
};

const enableMapFilter = function () {
  mapFilter.classList.remove('map__filters--disabled');
  mapFilterDropDownList.forEach((element) => { element.removeAttribute('disabled'); });
  mapFilterFeatureList.forEach((element) => { element.removeAttribute('disabled'); });
};

const resetMapFilter = function () {
  mapFilter.reset();
  // mapFilterDropDownList.forEach((element) => { element.value = 'any'; });
  // mapFilterFeatureList.forEach((element) => { element.checked = false; });
};

export { disableMapFilter, enableMapFilter, resetMapFilter };

