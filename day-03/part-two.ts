export default function resolver(input: string[]) {
  const oxygenRating = getOxygenRating(input);
  const CO2ScrubberRating = getCO2ScrubberRating(input);

  return oxygenRating * CO2ScrubberRating;
}

export function getOxygenRating(input: string[]): number {
  return parseInt(recursiveBitSearch(input, 0, true), 2);
}

export function getCO2ScrubberRating(input: string[]): number {
  return parseInt(recursiveBitSearch(input, 0, false), 2);
}

export function getBitOccurrenceByIndex(bitArray: string[], index: number) {
  const bitAsZero = [];
  const bitAsOne = [];

  for (let i = 0; i < bitArray.length; i++) {
    const currentBit = bitArray[i][index];

    if (currentBit === "0") {
      bitAsZero.push(bitArray[i]);
    } else if (currentBit === "1") {
      bitAsOne.push(bitArray[i]);
    }
  }

  return [bitAsZero, bitAsOne];
}

export function recursiveBitSearch(
  bitArray: string[],
  index: number,
  isOxygen: boolean
): string {
  if (bitArray.length === 1) return bitArray[0];

  const [bitAsZero, bitAsOne] = getBitOccurrenceByIndex(bitArray, index);

  let listToSearch = [];

  if (bitAsZero.length > bitAsOne.length) {
    listToSearch = isOxygen ? bitAsZero : bitAsOne;
  } else {
    listToSearch = isOxygen ? bitAsOne : bitAsZero;
  }

  return recursiveBitSearch(listToSearch, index + 1, isOxygen);
}
