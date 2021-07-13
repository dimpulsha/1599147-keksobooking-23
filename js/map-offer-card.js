const PLACE_LIST = {
  bungalow: 'Бунгало',
  flat: 'Квартира',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const ONE_ROOM_TEXT = 'комната';
const PLURAL_ROOM_TEXT = 'комнаты';
const MORE_ROOM_TEXT = 'комнат';
const UNKNOWN_ROOM_TEXT = 'Число комнат не указано';

const ONE_GUEST_TEXT = 'гостя';
const PLURAL_GUEST_TEXT = 'гостей';
const TOO_MUCH_GUEST_TEXT = 'не для гостей';
const NUM_GUESTS_UNKNOWN = 0;
const NUM_GUESTS_MAX_LIMIT = 100;

const PRICE_SUFFIX = '<span>₽/ночь</span>';
const popupCardTemplate = document.querySelector('#card').content;
const popupCard = popupCardTemplate.querySelector('.popup');

const createRoomNumDescription = function (numRoom) {
  switch (numRoom) {
    case 0: return `${numRoom} ${UNKNOWN_ROOM_TEXT}`;
    case 11: return `${numRoom} ${MORE_ROOM_TEXT}`;
    case 12: return `${numRoom} ${MORE_ROOM_TEXT}`;
    case 13: return `${numRoom} ${MORE_ROOM_TEXT}`;
  }
  const textSwich = numRoom % 10;
  switch (textSwich) {
    case 1: return `${numRoom} ${ONE_ROOM_TEXT}`;
    case 2: return `${numRoom} ${PLURAL_ROOM_TEXT}`;
    case 3: return `${numRoom} ${PLURAL_ROOM_TEXT}`;
    case 4: return `${numRoom} ${PLURAL_ROOM_TEXT}`;
    default: return `${numRoom} ${MORE_ROOM_TEXT}`;
  }
};

const createGuestsDescription = function (numGuests) {
  if (numGuests === NUM_GUESTS_UNKNOWN || numGuests >= NUM_GUESTS_MAX_LIMIT) { return ` ${TOO_MUCH_GUEST_TEXT}`; }
  const textSwich = numGuests % 10;
  switch (textSwich) {
    case 1: return ` для ${numGuests} ${ONE_GUEST_TEXT}`;
    default: return ` для ${numGuests} ${PLURAL_GUEST_TEXT}`;
  }
};

const createFeatureList = function (featureList, elementList) {

  const featureModifier = featureList.map((feature) => `popup__feature--${feature}`);

  elementList.forEach((elementItem) => {
    let checkResult = false;

    featureModifier.forEach((modifierItem) => {
      if (elementItem.classList.contains(modifierItem)) { checkResult = true; }
    });

    if (!checkResult) { elementItem.remove(); }
  });
};

const createOfferCard = function (offerItem) {

  const newPopupCard = popupCard.cloneNode(true);
  let checkinText = '';
  let checkoutText = '';
  let newRoomNum = 0;
  let newGuestsNum = 0;

  if (offerItem.author && offerItem.author.avatar) {
    newPopupCard.querySelector('.popup__avatar').setAttribute('src', offerItem.author.avatar);
  } else {
    newPopupCard.querySelector('.popup__avatar').remove();
  }

  if (offerItem.offer && offerItem.offer.title) {
    newPopupCard.querySelector('.popup__title').textContent = offerItem.offer.title;
  } else {
    newPopupCard.querySelector('.popup__title').textContent = 'Предложение по сдаче квартиры';
    newPopupCard.querySelector('.popup__title').classList.add('visually-hidden');
  }

  if (offerItem.offer && offerItem.offer.address) {
    newPopupCard.querySelector('.popup__text--address').textContent = offerItem.offer.address;
  }
  else {
    newPopupCard.querySelector('.popup__text--address').remove();
  }

  if (offerItem.offer && offerItem.offer.price) {
    newPopupCard.querySelector('.popup__text--price').textContent = offerItem.offer.price;
    newPopupCard.querySelector('.popup__text--price').insertAdjacentHTML('beforeend', ` ${PRICE_SUFFIX}`);
  }
  else {
    newPopupCard.querySelector('.popup__text--price').remove();
  }

  if (offerItem.offer && offerItem.offer.type) {
    newPopupCard.querySelector('.popup__type').textContent = PLACE_LIST[offerItem.offer.type];
  } else {
    newPopupCard.querySelector('.popup__type').textContent = 'Тип жилья не указан';
    newPopupCard.querySelector('.popup__type').classList.add('visually-hidden');
  }

  if (offerItem.offer && offerItem.offer.rooms) { newRoomNum = offerItem.offer.rooms; }
  if (offerItem.offer && offerItem.offer.guests) { newGuestsNum = offerItem.offer.guests; }
  if (!offerItem.offer || (!offerItem.offer.rooms && !offerItem.offer.guests)) {
    newPopupCard.querySelector('.popup__text--capacity').remove();
  } else {
    newPopupCard.querySelector('.popup__text--capacity').textContent = createRoomNumDescription(newRoomNum) + createGuestsDescription(newGuestsNum);
  }

  if (offerItem.offer && offerItem.offer.checkin) { checkinText = `Заезд после ${offerItem.offer.checkin}, `; }
  if (offerItem.offer && offerItem.offer.checkout) { checkoutText = `выезд до ${offerItem.offer.checkout}`; }
  if (!offerItem.offer || (!offerItem.offer.checkin && !offerItem.offer.checkout)) {
    newPopupCard.querySelector('.popup__text--time').remove();
  } else {
    newPopupCard.querySelector('.popup__text--time').textContent = checkinText + checkoutText;
  }

  if (offerItem.offer && offerItem.offer.features) {
    const featureElementList = newPopupCard.querySelectorAll('.popup__feature');
    createFeatureList(offerItem.offer.features, featureElementList);
  } else { newPopupCard.querySelector('.popup__features').remove(); }

  if (offerItem.offer && offerItem.offer.description) {
    newPopupCard.querySelector('.popup__description').textContent = offerItem.offer.description;
  } else {
    newPopupCard.querySelector('.popup__description').remove();
  }

  const photosStorage = newPopupCard.querySelector('.popup__photos');
  const photoTemplate = newPopupCard.querySelector('.popup__photo');
  photoTemplate.remove();

  if (offerItem.offer && offerItem.offer.photos) {
    offerItem.offer.photos.forEach((photoItem) => {
      const newPhotoElement = photoTemplate.cloneNode(true);
      newPhotoElement.setAttribute('src', photoItem);
      photosStorage.appendChild(newPhotoElement);
    });
  }

  return newPopupCard;
};

export { createOfferCard };
