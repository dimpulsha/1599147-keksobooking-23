function getRandomInt(min, max) {
  if (min < 0 || max < 0 || max < min || Math.ceil(max) < Math.floor(min)) {
    return NaN;
  }
  return Math.floor(min + Math.random() * (max + 1 - min));
}

function getRandomPositiveFloat(min, max, decimalPlaces = 0) {
  if (min < 0 || max < 0 || max < min || decimalPlaces < 0) {
    return NaN;
  }
  const multiplieRate = Math.pow(10, decimalPlaces);
  min = Math.ceil(min *= multiplieRate);
  max = Math.floor(max *= multiplieRate);
  if (min > max) {
    return NaN;
  }
  return (Math.floor(min + Math.random() * (max + 1 - min))) / multiplieRate;
}

//getRandomInt(1, 142);
//getRandomPositiveFloat(123, 133, 2);

//счетчик объектов
const TEST_OBJECT_NUM = 10;

// типы помещений
//в будущем может стать объектом - добавить минимальную цену
const PLACE_TYPE_LIST = [
  'bungalow',
  'flat',
  'house',
  'hotel',
  'palace',
];

// перечень удобств
const PLACE_FEATURE_LIST = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

//время заселения
const CHECK_IN_TIME = [
  '12:00',
  '13:00',
  '14:00',
];

//время выселения
// в нашем проекте наверное можно использовать один массив, но по уму они могут быть разные
const CHECK_OUT_TIME = [
  '12:00',
  '13:00',
  '14:00',
];

//перечень тестовых фотографий
const PHOTO_TEST_LIST = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

//перечень заголовков
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

// перечень описаний
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


// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// получаем одно случайное значение из массива
function getRandomArrayValue(array) {
  return array[getRandomInt(0, array.length - 1)];
}

// создание массива длины n из другого массива - элементы нового массива неуникальные, идут в случайном порядке
//могут повторяться
function createRandomNoUnicArray(srcArray, newLength) {
  // const newArray = [];
  // for (let i = 0; i < newLength; i++) {
  //   newArray[i] = srcArray[getRandomInt(0, srcArray.length - 1)];
  // }

  const newArray = new Array(newLength).fill(null).map(() => srcArray[getRandomInt(0, srcArray.length - 1)]);
  return newArray;
}

//создание уникального массива на основе существующего
// берем случайный элемент исходного массива, если элемент не пустой, то переносим в новый, в старом его вычеркиваем (обнуляем)
function createRandomUnicArray(srcArray) {
  const newArray = new Array(getRandomInt(1, srcArray.length));
  const copyOfSrcArray = srcArray.slice();
  for (let i = 0; i < newArray.length; i++) {
    let j = getRandomInt(0, copyOfSrcArray.length - 1);
    while (copyOfSrcArray[j] === null) {
      j = getRandomInt(0, copyOfSrcArray.length - 1);
    }
    newArray[i] = copyOfSrcArray[j];
    copyOfSrcArray[j] = null;
  }
  return newArray;
}


//СОЗДАНИЕ ОБЪЕКТА

function createTestPlace(index) {
  //вспомогательный объект для местоположения
  //у меня не получилось без вспомогательного объекта  добиться  того, чтобы в offer.address были доступны location.lng и location.lat
  // этого же объекта (сразу при вызове createTestPlace)
  // const testLocation = {
  //   lat: getRandomPositiveFloat(35.65000, 35.70000, 6),
  //   lng: getRandomPositiveFloat(139.70000, 139.80000, 6),
  //   address: function () {
  //     return `${this.lat}, ${this.lng}`;
  //   },
  // };

  const offerTestItem = {
    author: {
      avatar: '',
    },
    offer: {
      title: getRandomArrayValue(OFFER_TITLE_LIST),
      address: '',
      // address: location.lat + ' ' location.lng - так или похожим образом не работает
      price: getRandomInt(0, 1000000),
      type: getRandomArrayValue(PLACE_TYPE_LIST),
      rooms: getRandomInt(1, 15),
      guests: getRandomInt(1, 30),
      checkin: getRandomArrayValue(CHECK_IN_TIME),
      checkout: getRandomArrayValue(CHECK_OUT_TIME),
      features: createRandomUnicArray(PLACE_FEATURE_LIST),
      description: getRandomArrayValue(OFFER_DESCRIPTION_LIST),
      photos: createRandomNoUnicArray(PHOTO_TEST_LIST, getRandomInt(0, 5)),
    },
    location: {
      //   lat: testLocation.lat,
      //   lng: testLocation.lng,
      // },
      // {
      lat: getRandomPositiveFloat(35.65000, 35.70000, 5),
      lng: getRandomPositiveFloat(139.70000, 139.80000, 5),
    },
  };
  // наверное, пока так проще, чем через промежуточный объект
  offerTestItem.offer.address = `${offerTestItem.location.lng}, ${offerTestItem.location.lat}`;
  if (index < 8) {
    offerTestItem.author.avatar = `img/avatars/user0${index + 1}.png`;
  }
  //console.log(offerTestItem);
  return offerTestItem;
}

const testObjectList = new Array(TEST_OBJECT_NUM).fill(null).map((value, index) => createTestPlace(index));

//???  почему не работают такая запись (в 2 строки)
//let testObjectList = new Array(TEST_OBJECT_NUM).fill(null);
//testObjectList.forEach((value, index) => createTestPlace(index));

//что-нибудь, чтобы линтер не ругался
testObjectList.toString();

//console.log(testObjectList);
//console.log(createTestPlace(5));
