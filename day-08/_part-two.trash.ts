import { parseMessage } from "./part-one";

export default function resolver(input: string[]) {
  let [signalPatterns, outputValues] = parseMessage(input);


  signalPatterns = sortValues(signalPatterns);
  outputValues = sortValues(outputValues);

  const uniqueDigits = getUniqueLineDigits(signalPatterns, outputValues);

  getDisplayArrangement(signalPatterns, outputValues, uniqueDigits);
}

export function getDisplayArrangement(
  signalPatterns: string[][],
  outputValues: string[][],
  uniqueDigits: digitAssociation[][]
) {
  const arrangement: arrangement = {
    a: "",
    b: "",
    c: "",
    d: "",
    e: "",
    f: "",
    g: "",
  };

  // for(
  let i = 0;
  //i < arrangement.length; i++)

  const currentUniqueDigits = uniqueDigits[i];
  console.table(currentUniqueDigits);

  for(let i = 0; i < ; i++) {

  }
  guessSegments(Object.keys(arrangement));

  showDisplayArrangement(arrangement);
}

export function guessSegments(
  arrangementLength: number,
  lineOutputValues: digitAssociation[],
  lineUniqueDigits: digitAssociation[]
) {}

function showDisplayArrangement({ a, b, c, d, e, f, g }: arrangement) {
  if (a === "") a = ".";
  if (b === "") b = ".";
  if (c === "") c = ".";
  if (d === "") d = ".";
  if (e === "") e = ".";
  if (f === "") f = ".";
  if (g === "") g = ".";

  console.log(
    ` ${a.repeat(4)} \n${b}    ${c}\n${b}    ${c}\n ${d.repeat(
      4
    )} \n${e}    ${f}\n${e}    ${f}\n ${g.repeat(4)}`
  );
}

export function sortValues(input: string[][]) {
  input = input.map((line) => line.filter((value) => value !== ""));
  const newArray: string[][] = [];

  for (let i = 0; i < input.length; i++) {
    newArray.push([]);
    for (let j = 0; j < input[i].length; j++) {
      newArray[i][j] = input[i][j].split("").sort().join("");
    }
  }

  return newArray;
}

export function getUniqueLineDigits(
  signalPatterns: string[][],
  outputValues: string[][]
) {
  const uniqueDigitsRaw: digitAssociation[][] = [];

  for (let i = 0; i < outputValues.length; i++) {
    uniqueDigitsRaw.push([]);

    for (let j = 0; j < outputValues[i].length; j++) {
      switch (outputValues[i][j].length) {
        case 2:
          uniqueDigitsRaw[i].push({ value: outputValues[i][j], digit: 1 });
          break;
        case 3:
          uniqueDigitsRaw[i].push({ value: outputValues[i][j], digit: 7 });
          break;
        case 4:
          uniqueDigitsRaw[i].push({ value: outputValues[i][j], digit: 4 });
          break;
        case 7:
          uniqueDigitsRaw[i].push({ value: outputValues[i][j], digit: 8 });
      }
    }

    for (let j = 0; j < signalPatterns[i].length; j++) {
      switch (signalPatterns[i][j].length) {
        case 2:
          uniqueDigitsRaw[i].push({ value: signalPatterns[i][j], digit: 1 });
          break;
        case 3:
          uniqueDigitsRaw[i].push({ value: signalPatterns[i][j], digit: 7 });
          break;
        case 4:
          uniqueDigitsRaw[i].push({ value: signalPatterns[i][j], digit: 4 });
          break;
        case 7:
          uniqueDigitsRaw[i].push({ value: signalPatterns[i][j], digit: 8 });
      }
    }
  }

  const uniqueDigits: digitAssociation[][] = [];
  for (let i = 0; i < uniqueDigitsRaw.length; i++) {
    uniqueDigits.push([]);
    for (let j = 0; j < uniqueDigitsRaw[i].length; j++) {
      let present = false;

      for (let x = 0; x < uniqueDigits[i].length; x++) {
        if (uniqueDigits[i][x].digit === uniqueDigitsRaw[i][j].digit) {
          present = true;
        }
      }

      if (!present) uniqueDigits[i].push(uniqueDigitsRaw[i][j]);
    }
  }

  return uniqueDigits.map((line) => line.sort((a, b) => a.digit - b.digit));
}

type digitAssociation = { value: string; digit: number };
type arrangement = {
  a: string;
  b: string;
  c: string;
  d: string;
  e: string;
  f: string;
  g: string;
};

/*  const oneSegments = currentUniqueDigits.filter((v) => v.digit === 1)[0].value;
  const sevenSegments = currentUniqueDigits.filter((v) => v.digit === 7)[0]
    .value;

  for (let i = 0; i < sevenSegments.length; i++) {
    let present = false;

    for (let j = 0; j < oneSegments.length; j++) {
      if (sevenSegments[i] === oneSegments[j]) present = true;
    }

    if (!present) {
      arrangement.a = sevenSegments[i];
    }
  } */
