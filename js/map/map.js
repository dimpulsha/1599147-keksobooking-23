import { enableMapFilter, enableAdvertisementForm, setAddressValue } from '../form.js';
import { getMapId, getMapInitCenter, getMapInitScale, getMapLayer, getMapAttribution, getMapMainIcon, getMapIcon } from './map-init-data.js';
import { getTestData } from '../utils/create-test-data.js';
import { createOfferCard } from '../map-offer-card.js';

//console.log(getMapId());

const map = L.map(getMapId(), { tap: false })
  .on('load', () => {
    enableMapFilter();
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
//mainMapMarker.addTo(map);
initMainMarker();

mainMapMarker.on('moveend', (evt) => {
  setAddressValue(evt.target.getLatLng());
});

const mapLayer = L.layerGroup().addTo(map);
const dataSet = getTestData(10);
//console.log(dataSet);
const createOfferMarker = function (element) {
  L.marker(element.location, { icon: markerIcon }).addTo(mapLayer).bindPopup(createOfferCard(element), {
    keepInView: true,
  });
};


dataSet.forEach((dataItem) => createOfferMarker(dataItem));


//console.log('map-module loading');
