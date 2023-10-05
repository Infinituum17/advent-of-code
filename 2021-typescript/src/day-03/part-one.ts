export default function resolver(input: string[]) {
  const bitCount = countBits(input);
  const gammaRate = getGammaRate(bitCount, input.length);
  const epsilonRate = getEpsilonRate(bitCount, input.length);

  return gammaRate * epsilonRate;
}

export function countBits(input: string[]) {
  const bitCount: number[] = [];

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (!bitCount[j]) bitCount[j] = 0;

      if (input[i][j] === "1") {
        bitCount[j] += 1;
      }
    }
  }

  return bitCount;
}

export function getGammaRate(bitCount: number[], lineCount: number) {
  let gammaRate: string = "";

  for (let i = 0; i < bitCount.length; i++) {
    if (lineCount / 2 < bitCount[i]) {
      gammaRate += "1";
    } else {
      gammaRate += "0";
    }
  }

  return parseInt(gammaRate, 2);
}

export function getEpsilonRate(bitCount: number[], lineCount: number) {
  let epsilonRate: string = "";

  for (let i = 0; i < bitCount.length; i++) {
    if (lineCount / 2 < bitCount[i]) {
      epsilonRate += "0";
    } else {
      epsilonRate += "1";
    }
  }

  return parseInt(epsilonRate, 2);
}
