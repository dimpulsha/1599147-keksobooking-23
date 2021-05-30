function getRandomPositiveInt(min, max) {
  if (min < 0 || max < 0 || max < min || (max - min > 0 && max - min < 1) || (min === max && !Number.isInteger(max))) {
    return NaN;
    // считаем, что функция не взаимодействует с обычным пользователем и является служебной
    // тогда логично при некорректных параметрах просто вернуть null, NaN, undefined, или что-то подобное,
    // и задокументировать это поведение.
    // Чтобы другой разработчик задумался - что же он делает не так
    // Если начало и конец диапазона целочисленные и совпадают - ничего страшного. вернем это же число
  }
  return Math.floor(min + Math.random() * (max + 1 - min));
}

function getRandomPositiveFloat(min, max, decimalPlaces) {
  if (min < 0 || max < 0 || max < min) {
    return NaN;
  }
  const multiplieRate = Math.pow(10, decimalPlaces);
  min = Math.ceil(min *= multiplieRate);
  max = Math.floor(max *= multiplieRate);
  return +((Math.floor(min + Math.random() * (max + 1 - min))) / multiplieRate).toFixed(decimalPlaces);
}

getRandomPositiveInt(1, 142);
getRandomPositiveFloat(1.0356078560918, 3.1356078560918, 7);

//при совпадении чисел и если числа длинее количества знаков для округления, то мы вылетаем за диапазон. как ни крути.
//console.log(getRandomPositiveFloat(1.0356078560918, 1.0356078560918, 7));
