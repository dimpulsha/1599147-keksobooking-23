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

function getRandomListValue(srcList) {
  return srcList[getRandomInt(0, srcList.length - 1)];
}

function createRandomNoUnicList(srcList, newListLength) {
  return new Array(newListLength).fill(null).map(() => srcList[getRandomInt(0, srcList.length - 1)]);
}

function createRandomUnicList(srcList) {
  const newList = new Array(getRandomInt(1, srcList.length));
  const copyOfSrcList = srcList.slice();
  for (let i = 0; i < newList.length; i++) {
    let j = getRandomInt(0, copyOfSrcList.length - 1);
    while (copyOfSrcList[j] === null) {
      j = getRandomInt(0, copyOfSrcList.length - 1);
    }
    newList[i] = copyOfSrcList[j];
    copyOfSrcList[j] = null;
  }
  return newList;
}

export { getRandomInt };
export { getRandomPositiveFloat };
export { getRandomListValue };
export { createRandomNoUnicList };
export { createRandomUnicList };
