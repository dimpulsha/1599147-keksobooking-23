import { getRandomInt } from './utils-function.js';
import { getRandomPositiveFloat } from './utils-function.js';
import { getRandomListValue } from './utils-function.js';
import { createRandomNoUnicList } from './utils-function.js';
import { createRandomUnicList } from './utils-function.js';

import { getPlaceTypeList } from './test-data-settings.js';
import { getPlaceFeatureList } from './test-data-settings.js';
import { getCheckInTime } from './test-data-settings.js';
import { getCheckOutTime } from './test-data-settings.js';
import { getPhotoTestList } from './test-data-settings.js';
import { getOfferTitleList } from './test-data-settings.js';
import { getOfferDescriptionList } from './test-data-settings.js';
import { getGeoPont } from './test-data-settings.js';

function createTestPlace(index) {

  const testLocation = {
    lat: getRandomPositiveFloat(getGeoPont().LAT.MIN, getGeoPont().LAT.MAX, 5),
    lng: getRandomPositiveFloat(getGeoPont().LNG.MIN, getGeoPont().LNG.MAX, 5),
  };

  const placeType = getRandomListValue(getPlaceTypeList());

  return {
    author: {
      avatar: `img/avatars/user0${(index + 1)}.png`,
    },
    offer: {
      title: getRandomListValue(getOfferTitleList()),
      address: `${testLocation.lat}, ${testLocation.lng}`,
      price: getRandomInt(placeType.MIN_PRICE, placeType.MAX_PRICE),
      type: placeType.NAME,
      rooms: getRandomInt(placeType.MIN_ROOMS, placeType.MAX_ROOMS),
      guests: getRandomInt(placeType.MIN_GUESTS, placeType.MAX_GUESTS),
      checkin: getRandomListValue(getCheckInTime()),
      checkout: getRandomListValue(getCheckOutTime()),
      features: createRandomUnicList(getPlaceFeatureList()),
      description: getRandomListValue(getOfferDescriptionList()),
      photos: createRandomNoUnicList(getPhotoTestList(), getRandomInt(0, 5)),
    },
    location: {
      lat: testLocation.lat,
      lng: testLocation.lng,
    },
  };
}

const getTestData = (objectNum) => new Array(objectNum).fill(null).map((value, index) => createTestPlace(index));

export { getTestData };
