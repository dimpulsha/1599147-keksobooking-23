import { getTestData } from './utils/create-test-data.js';
import { createOfferCard,  createOfferCardList} from './map-offer-card.js';
import { disableMapFilter,  disableAdvertisementForm} from './form.js';
import { enableMapFilter,  enableAdvertisementForm} from './form.js';

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
