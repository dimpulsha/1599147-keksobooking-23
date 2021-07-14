import { enableAdvertisementForm, setAddressValue } from '../form.js';
import { enableMapFilter, disableMapFilter } from '../map-filter.js';
import { getMapId, getMapInitCenter, getMapInitScale, getMapLayer, getMapAttribution, getMapMainIcon, getMapIcon } from './map-settings.js';
// import { getTestData } from '../utils/create-test-data.js';
import { createOfferCard } from '../map-offer-card.js';
import { showAlertGetDataError } from '../popup.js';

const MAX_OFFER = 10;

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

const createMarkerLayer = function () {
  return L.layerGroup().addTo(map);
};

const markerLayer = createMarkerLayer();

const removeMarkerPopUp = function () {
  const popup = document.querySelector('.leaflet-popup');
  if (popup) {popup .remove();}
};

const createOfferMarker = function (element) {
  L.marker(element.location,
    {
      icon: markerIcon,
    })
    .addTo(markerLayer)
    .bindPopup(createOfferCard(element));
};

const renderOfferMarkerList = function (dataSet) {
  markerLayer.clearLayers();
  dataSet
    .slice(0, MAX_OFFER)
    .forEach((dataItem) => createOfferMarker(dataItem));
};

const enableMap = function (dataSet) {
  renderOfferMarkerList(dataSet);
  enableMapFilter();
};

const showAlertInitOffer = function () {
  showAlertGetDataError();
  disableMapFilter();
};

export { showAlertInitOffer, enableMap, resetMainMarker, removeMarkerPopUp, renderOfferMarkerList };
