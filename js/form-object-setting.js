const ROOM_CAPACITY = {
  '1': {
    MIN: 1,
    MAX: 1,
  },
  '2': {
    MIN: 1,
    MAX: 2,
  },
  '3': {
    MIN: 1,
    MAX: 3,
  },
  'noGuest': {
    MIN: 0,
    MAX: 0,
  },
};

const NO_GUEST_ROOM = 100;

const ROOM_PRICE = {
  'bungalow': {
    MIN_PRICE: 0,
    MAX_PRICE: 1000000,
  },
  'flat': {
    MIN_PRICE: 1000,
    MAX_PRICE: 1000000,
  },
  'house': {
    MIN_PRICE: 5000,
    MAX_PRICE: 1000000,
  },
  'hotel': {
    MIN_PRICE: 3000,
    MAX_PRICE: 1000000,
  },
  'palace': {
    MIN_PRICE: 10000,
    MAX_PRICE: 1000000,
  },
};

const getRoomCapacity = () => ROOM_CAPACITY;
const getNoGuestLimit = () => NO_GUEST_ROOM;
const getRoomPrice = () => ROOM_PRICE;

export { getRoomCapacity, getNoGuestLimit, getRoomPrice };
