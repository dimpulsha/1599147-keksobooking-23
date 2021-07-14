import { changeFilter } from './map-filter.js';
import { enableMap, showAlertInitOffer } from './map/map.js';
import { loadData } from './fetch-data.js';

loadData((offersData) => {
  enableMap(offersData);
  changeFilter(offersData);
},
showAlertInitOffer);

