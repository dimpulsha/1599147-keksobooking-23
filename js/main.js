// import { getTestData } from './utils/create-test-data.js';
// import { createOfferCard, createOfferCardList } from './map-offer-card.js';
// import { disableMapFilter, disableAdvertisementForm } from './form.js';
// import { enableMapFilter, enableAdvertisementForm } from './form.js';
import { disableMapFilter } from './map-filter.js';
import { } from './map-offer-card.js';
import { enableMapAction, showAlertInitOffer } from './map/map.js';
import { loadData } from './fetch-data.js';

disableMapFilter();

loadData(enableMapAction, showAlertInitOffer);
