const PRICE_FILTER_LIMIT = {
  LOW: {
    MAX: 10000,
  },
  MEDIUM: {
    MIN: 10000,
    MAX: 50000,
  },
  HIGH: {
    MIN: 50000,
  },
};

const DEFAULT_FILTER_VALUE = 'any';

const getPriceFilterLimit = () => PRICE_FILTER_LIMIT;
const getDefaultFilterValue = () => DEFAULT_FILTER_VALUE;

export { getPriceFilterLimit, getDefaultFilterValue };
