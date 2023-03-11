export default function resolver(input: string[]) {
  const [_, outputValues] = parseMessage(input);

  return getUniqueDigits(outputValues).length;
}

export function parseMessage(input: string[]) {
  const signalPatterns = [];
  const outputValues = [];

  for (let i = 0; i < input.length; i++) {
    const [signalPatternsRaw, outputValueRaw] = input[i].split("|");
    signalPatterns.push(signalPatternsRaw.split(/\s/gim));
    outputValues.push(outputValueRaw.split(/\s/gim));
  }

  return [signalPatterns, outputValues];
}

export function getUniqueDigits(outputValues: string[][]) {
  const uniqueDigits: digitAssociation[] = [];

  outputValues.forEach((line) => {
    line.forEach((outputValue) => {
      switch (outputValue.length) {
        case 2:
          uniqueDigits.push({ value: outputValue, digit: 1 });
          break;
        case 3:
          uniqueDigits.push({ value: outputValue, digit: 7 });
          break;
        case 4:
          uniqueDigits.push({ value: outputValue, digit: 4 });
          break;
        case 7:
          uniqueDigits.push({ value: outputValue, digit: 8 });
      }
    });
  });

  return uniqueDigits;
}

type digitAssociation = { value: string; digit: number };
