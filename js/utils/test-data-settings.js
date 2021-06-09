// const PLACE_TYPE_LIST = [
//   'bungalow',
//   'flat',
//   'house',
//   'hotel',
//   'palace',
// ];

const PLACE_TYPE_LIST = [
  {
    NAME: 'bungalow',
    MIN_PRICE: 0,
    MAX_PRICE: 1000000,
    MIN_ROOMS: 1,
    MAX_ROOMS: 100,
    MIN_GUESTS: 1,
    MAX_GUESTS: 100,
  },
  {
    NAME: 'flat',
    MIN_PRICE: 1000,
    MAX_PRICE: 1000000,
    MIN_ROOMS: 1,
    MAX_ROOMS: 100,
    MIN_GUESTS: 1,
    MAX_GUESTS: 100,
  },
  {
    NAME: 'house',
    MIN_PRICE: 5000,
    MAX_PRICE: 1000000,
    MIN_ROOMS: 1,
    MAX_ROOMS: 100,
    MIN_GUESTS: 1,
    MAX_GUESTS: 100,
  },
  {
    NAME: 'hotel',
    MIN_PRICE: 3000,
    MAX_PRICE: 1000000,
    MIN_ROOMS: 1,
    MAX_ROOMS: 100,
    MIN_GUESTS: 1,
    MAX_GUESTS: 100,
  },
  {
    NAME: 'palace',
    MIN_PRICE: 10000,
    MAX_PRICE: 1000000,
    MIN_ROOMS: 1,
    MAX_ROOMS: 100,
    MIN_GUESTS: 1,
    MAX_GUESTS: 100,
  },
];

const PLACE_FEATURE_LIST = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const CHECK_IN_TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECK_OUT_TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const PHOTO_TEST_LIST = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const OFFER_TITLE_LIST = [
  'Для работы и отдыха',
  'Помещение с прекрасным видом',
  'Дешево в двух шпагах от метро',
  'Идеально для молодых',
  'Тем, кто путешествует с детьми',
  'Дешево и уютно',
  'Апартаменты с максимумом удобств',
  'Предложение для студентов',
  'Прекрасные апартаменты недорого и в тихом районе',
  'Дешево со всеми удобствами на длительный срок',
];

const OFFER_DESCRIPTION_LIST = [
  'Для ценителей истории. Почуствуй себя героем из прошлого.',
  'У нас тут все ништяк. Ларек за углом. Шава 24 часа. Приезжайте! Интернетов нет!',
  'Уютное гнездышко для молодоженов',
  'Комната в трёхкомнатной квартире, подойдёт молодым путешественникам.',
  'Один из лучших хостелов для душевного общения. Ужинаем вместе и играем в «Мафию» по вечерам, вкусно готовим. Ежедневная уборка, бесплатный Wi-Fi, чистое постельное белье',
  'Тут красиво, светло и уютно. Есть где разместиться компании из 5 человек. Кофе и печеньки бесплатно.',
  'Великолепная лавочка прямо в центре парка. Подходит для всех кто любит спать на свежем воздухе. Возможность помтавить палатку',
  'Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС."',
  'Замечательный дворец в старинном центре города. Только для тех кто может себе позволить дворец. Лакеев и прочих жокеев просим не беспокоить.',
  'Квартира на первом этаже. Соседи тихие. Для всех, кто терпеть не может шума и суеты.',
];

const GEO_POINT = {
  LAT: {
    MIN: 35.65000,
    MAX: 35.70000,
  },
  LNG: {
    MIN: 139.70000,
    MAX: 139.80000,
  },
};

const getPlaceTypeList = () => PLACE_TYPE_LIST;
const getPlaceFeatureList = () => PLACE_FEATURE_LIST;
const getCheckInTime = () => CHECK_IN_TIME;
const getCheckOutTime = () => CHECK_OUT_TIME;
const getPhotoTestList = () => PHOTO_TEST_LIST;
const getOfferTitleList = () => OFFER_TITLE_LIST;
const getOfferDescriptionList = () => OFFER_DESCRIPTION_LIST;
const getGeoPont = () => GEO_POINT;
export { getPlaceTypeList };
export { getPlaceFeatureList };
export { getCheckInTime };
export { getCheckOutTime };
export { getPhotoTestList };
export { getOfferTitleList };
export { getOfferDescriptionList };
export { getGeoPont };
