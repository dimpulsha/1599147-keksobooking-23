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

getRandomInt(1, 142);
getRandomPositiveFloat(123, 133, 2);
