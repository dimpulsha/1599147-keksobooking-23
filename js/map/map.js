import {  enableAdvertisementForm, setAddressValue } from '../form.js';
import { enableMapFilter, disableMapFilter } from '../map-filter.js';
import { getMapId, getMapInitCenter, getMapInitScale, getMapLayer, getMapAttribution, getMapMainIcon, getMapIcon } from './map-settings.js';
// import { getTestData } from '../utils/create-test-data.js';
import { createOfferCard } from '../map-offer-card.js';
import { showAlertGetDataError } from '../popup.js';

const map = L.map(getMapId(), { tap: false })
  .on('load', () => {
    enableAdvertisementForm();
  })
  .setView(getMapInitCenter(), getMapInitScale());

L.tileLayer(getMapLayer(),
  {
    attribution: getMapAttribution(),
  },
).addTo(map);

const mainMarkerIcon = L.icon(getMapMainIcon());
const markerIcon = L.icon(getMapIcon());

const mainMapMarker = L.marker(getMapInitCenter(),
  {
    draggable: true,
    icon: mainMarkerIcon,
  },
);

const initMainMarker = function () {
  mainMapMarker.addTo(map);
  setAddressValue(getMapInitCenter());
};

const resetMainMarker = function () {
  mainMapMarker.setLatLng(getMapInitCenter());
  setAddressValue(getMapInitCenter());
};

initMainMarker();

mainMapMarker.on('moveend', (evt) => {
  setAddressValue(evt.target.getLatLng());
});

const mapLayer = L.layerGroup().addTo(map);

const createOfferMarker = function (element) {
  L.marker(element.location, { icon: markerIcon }).addTo(mapLayer).bindPopup(createOfferCard(element));
};

const MAX_OFFER = 10;
const createMarkerList = function (dataSet) {
  dataSet
    .slice(0, MAX_OFFER)
    .forEach((dataItem) => createOfferMarker(dataItem));
};

const enableMapAction = function (dataSet) {
  enableMapFilter();
  createMarkerList(dataSet);
};

const showAlertInitOffer = function () {
  showAlertGetDataError();
  disableMapFilter();
};

export {showAlertInitOffer, enableMapAction, resetMainMarker};
