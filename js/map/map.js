import { enableMapFilter, enableAdvertisementForm, setAddressValue } from '../form.js';
import { getMapId, getMapInitCenter, getMapInitScale, getMapLayer, getMapAttribution, getMapMainIcon, getMapIcon } from './map-init-data.js';
import { getTestData } from '../utils/create-test-data.js';

//console.log(getMapId());

const map = L.map(getMapId())
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

const dataSet = getTestData(10);
//console.log(dataSet);
dataSet.forEach(({location}) => { L.marker(location, { icon: markerIcon }).addTo(map); });


console.log('map-module loading');
