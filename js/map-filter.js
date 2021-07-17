import { removeMarkerPopUp, renderOfferMarkerList } from './map.js';
import { getPriceFilterLimit, getDefaultFilterValue } from './filter-object-settings.js';
import { debounce } from './utils/utils-function.js';

const mapFilter = document.querySelector('.map__filters');
const mapFilterDropDownList = mapFilter.querySelectorAll('.map__filter');
const mapFilterFeatureList = mapFilter.querySelectorAll('.map__checkbox');

const mapFilterPlaceType = mapFilter.querySelector('#housing-type');
const mapFilterPrice = mapFilter.querySelector('#housing-price');
const mapFilterRoom = mapFilter.querySelector('#housing-rooms');
const mapFilterGuest = mapFilter.querySelector('#housing-guests');

const disableMapFilter = () => {
  mapFilter.classList.add('map__filters--disabled');
  mapFilterDropDownList.forEach((element) => { element.setAttribute('disabled', ''); });
  mapFilterFeatureList.forEach((element) => { element.setAttribute('disabled', ''); });
};

disableMapFilter();

const enableMapFilter = () => {
  mapFilter.classList.remove('map__filters--disabled');
  mapFilterDropDownList.forEach((element) => { element.removeAttribute('disabled'); });
  mapFilterFeatureList.forEach((element) => { element.removeAttribute('disabled'); });
};

const changeEvent = new Event('change');
const resetMapFilter = () => {
  mapFilter.reset();
  mapFilter.dispatchEvent(changeEvent);
};

const checkPriceFilter = (elementValue, filterValue) => {
  switch (filterValue) {
    case 'any': return true;
    case 'low': return elementValue < getPriceFilterLimit().LOW.MAX;
    case 'middle': return (elementValue >= getPriceFilterLimit().MEDIUM.MIN && elementValue < getPriceFilterLimit().MEDIUM.MAX);
    case 'high': return elementValue >= getPriceFilterLimit().HIGH.MIN;
    default: return false;
  }
};

const checkFilterItem = (elementValue, filterValue) => (filterValue === getDefaultFilterValue() || String(filterValue) === String(elementValue));

const checkFiltredElement = (element) => (
  checkFilterItem(element.offer.type, mapFilterPlaceType.value) &&
  checkPriceFilter(element.offer.price, mapFilterPrice.value) &&
  checkFilterItem(element.offer.rooms, mapFilterRoom.value) &&
  checkFilterItem(element.offer.guests, mapFilterGuest.value)
);

const filterPlaceType = (dataSet) => dataSet.filter(checkFiltredElement);

const getFeaturesRank = (element) => {
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

const changeFilter = (dataSet) => {
  mapFilter.addEventListener('change', () => {
    removeMarkerPopUp();
    debounceRenderMarker(dataSet);
  });
};

export { disableMapFilter, enableMapFilter, resetMapFilter, changeFilter };

