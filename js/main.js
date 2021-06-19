import { getTestData } from './utils/create-test-data.js';
import { createOfferCard } from './map-offer-card.js';
import { createOfferCardList } from './map-offer-card.js';
import { disableMapFilter } from './form.js';
import { disableAdvertisementForm } from './form.js';
import { enableMapFilter } from './form.js';
import { enableAdvertisementForm } from './form.js';
// import './map/map.js'; // работа с картой

const TEST_OBJECT_NUM = 3;
const offerList = getTestData(TEST_OBJECT_NUM);
const mapField = document.querySelector('#map-canvas');

disableMapFilter();
disableAdvertisementForm();

//вставка одной карточки на поле с картой
mapField.appendChild(createOfferCard(offerList[1]));

//вставка списка карточек на поле с картой
mapField.appendChild(createOfferCardList(offerList));

enableMapFilter();
enableAdvertisementForm();

