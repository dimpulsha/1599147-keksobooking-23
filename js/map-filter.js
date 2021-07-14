import { removeMarkerPopUp, renderOfferMarkerList } from './map/map.js';
import { getPriceFilterLimit, getDefaultFilterValue } from './filter-object-settings.js';
import { debounce } from './utils/debounce.js';

const mapFilter = document.querySelector('.map__filters');
const mapFilterDropDownList = mapFilter.querySelectorAll('.map__filter');
const mapFilterFeatureList = mapFilter.querySelectorAll('.map__checkbox');

const mapFilterPlaceType = mapFilter.querySelector('#housing-type');
const mapFilterPrice = mapFilter.querySelector('#housing-price');
const mapFilterRoom = mapFilter.querySelector('#housing-rooms');
const mapFilterGuest = mapFilter.querySelector('#housing-guests');

const disableMapFilter = function () {
  mapFilter.classList.add('map__filters--disabled');
  mapFilterDropDownList.forEach((element) => { element.setAttribute('disabled', ''); });
  mapFilterFeatureList.forEach((element) => { element.setAttribute('disabled', ''); });
};

disableMapFilter();

const enableMapFilter = function () {
  mapFilter.classList.remove('map__filters--disabled');
  mapFilterDropDownList.forEach((element) => { element.removeAttribute('disabled'); });
  mapFilterFeatureList.forEach((element) => { element.removeAttribute('disabled'); });
};

const resetMapFilter = function () {
  mapFilter.reset();
};

const checkPriceFilter = function (elementValue, filterValue) {
  switch (filterValue) {
    case 'any': return true;
    case 'low': return elementValue < getPriceFilterLimit().LOW.MAX;
    case 'middle': return (elementValue >= getPriceFilterLimit().MEDIUM.MIN && elementValue < getPriceFilterLimit().MEDIUM.MAX);
    case 'high': return elementValue >= getPriceFilterLimit().HIGH.MIN;
    default: return false;
  }
};

const checkFilterItem = function (elementValue, filterValue) {
  return (filterValue === getDefaultFilterValue() || String(filterValue) === String(elementValue));
};

const checkFiltredElement = function (element) {
  return (
    checkFilterItem(element.offer.type, mapFilterPlaceType.value) &&
    checkPriceFilter(element.offer.price, mapFilterPrice.value) &&
    checkFilterItem(element.offer.rooms, mapFilterRoom.value) &&
    checkFilterItem(element.offer.guests, mapFilterGuest.value)
  );
};

const filterPlaceType = function (dataSet) {
  return dataSet.filter(checkFiltredElement);
};

const getFeaturesRank = function (element) {
  const selectedFeatures = mapFilter.querySelectorAll('.map__checkbox:checked');
  let placeFeatureRank = 0;

  selectedFeatures.forEach((feature) => {
    if (element.offer.features) {
      if (element.offer.features.includes(feature.value)) {
        placeFeatureRank += 1;
      }
    }
  });
  return placeFeatureRank;
};

const compareOfferRank = function (offerA, offerB) {
  const offerRankA = getFeaturesRank(offerA);
  const offerRankB = getFeaturesRank(offerB);
  return offerRankB - offerRankA;
};

const debounceRenderMarker = debounce((dataSet) => { renderOfferMarkerList(filterPlaceType(dataSet).sort(compareOfferRank)); });

const changeFilter = function (dataSet) {
  mapFilter.addEventListener('change', () => {
    removeMarkerPopUp();
    debounceRenderMarker(dataSet);
  });
};

export { disableMapFilter, enableMapFilter, resetMapFilter, changeFilter };

