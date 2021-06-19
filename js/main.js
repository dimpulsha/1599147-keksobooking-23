import { getTestData } from './utils/create-test-data.js';
import { createOfferCard } from './map-offer-card.js';
import { createOfferCardList } from './map-offer-card.js';
// import './map/map.js'; // работа с картой
// import './compare-offer/compare-offer.js'; // операции по сравнению объявлений, фильтры там и т.п
// import './compare-offer/get-server-data.js'; // получение объявлений с сервера
// import './compare-offer/offer-card.js'; // отображение карточки объявления
// import './create-offer/fill-offer-form.js'; // заполнение новой карточки и отправка
// import './create-offer/check-form.js'; // проверка правильности заполнения формы

const TEST_OBJECT_NUM = 3;
const offerList = getTestData(TEST_OBJECT_NUM);
const mapField = document.querySelector('#map-canvas');

//вставка одной карточки на поле с картой
mapField.appendChild(createOfferCard(offerList[1]));

//вставка списка карточек на поле с картой
mapField.appendChild(createOfferCardList(offerList));

