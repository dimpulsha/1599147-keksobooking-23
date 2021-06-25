const map = L.map('map-canvas').setView({ lat: 35.67500, lng: 139.75000 }, 14);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

console.log('map-module loading');
