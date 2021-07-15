import { changeFilter } from './map-filter.js';
import { enableMap, showAlertInitOffer } from './map/map.js';
import { loadData } from './fetch-data.js';
import './load-image.js';

const mainLoadData = () => {
  loadData((offersData) => {
    enableMap(offersData);
    changeFilter(offersData);
  },
  showAlertInitOffer);
};

mainLoadData();

export { mainLoadData };
