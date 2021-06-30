//какое-нить замыкание типа initmap

const map = L.map('map-canvas')
  .on('load', () => { console.log('onload'); })
  .setView({ lat: 35.67500, lng: 139.75000 }, 14);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// ==================

const mainMapMarkerIcon = L.icon({
  iconUrl: '../../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMapMarker = L.marker({
  lat: 35.67500,
  lng: 139.75000,
},
{
  dragable: true,
  icon: mainMapMarkerIcon,
},
);

mainMapMarker.addTo(map);

console.log('map-module loading');
