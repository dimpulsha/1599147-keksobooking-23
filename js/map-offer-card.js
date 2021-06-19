
const PLACE_LIST = {
  bungalow: 'Бунгало',
  flat: 'Квартира',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const PRICE_SUFFIX = '<span>₽/ночь</span>';
const popupCardTemplate = document.querySelector('#card').content;
const popupCard = popupCardTemplate.querySelector('.popup');

const createRoomNumDescription = function (numRoom) {

  let roomText = 'комнаты';

  if (numRoom === 1) { roomText = ' комната'; }
  if (numRoom === 0) { return 'Число комнат не указано'; }

  return `${numRoom} ${roomText}`;
};

const createGuestsDescription = function (numGuests) {

  let guestsText = 'гостей';

  if (numGuests === 1) { guestsText = 'гостя'; }
  if (numGuests === 0 || numGuests > 20) { return ' не для гостей'; }

  return ` для ${numGuests} ${guestsText}`;
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

const createOfferCardList = function (testDataList) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < testDataList.length; i++) {
    fragment.appendChild(createOfferCard(testDataList[i]));
  }
  return fragment;
};

export { createOfferCard, createOfferCardList};
