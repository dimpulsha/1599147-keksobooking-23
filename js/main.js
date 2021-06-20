import { getTestData } from './utils/create-test-data.js';
import { createOfferCard } from './map-offer-card.js';
import { createOfferCardList } from './map-offer-card.js';

const TEST_OBJECT_NUM = 3;
const offerList = getTestData(TEST_OBJECT_NUM);
const mapField = document.querySelector('#map-canvas');

//вставка одной карточки на поле с картой
mapField.appendChild(createOfferCard(offerList[1]));

//вставка списка карточек на поле с картой
mapField.appendChild(createOfferCardList(offerList));
