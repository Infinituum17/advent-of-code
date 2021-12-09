export default function resolver(input: string[]) {
  const parsedValues = parseMessage(input);

  for (let i = 0; i < /* parsedValues.lineAll.length */ 1; i++) {
    const display = new SevenSegmentDisplay(
      parsedValues.lineSignalPatterns[i],
      parsedValues.lineOutputValues[i],
      parsedValues.lineAll[i]
    );

    let guessedDigits = display.guessDigits();
    let uniqueDigits = display.getUniqueDigits(guessedDigits);

    const one = uniqueDigits.filter((v) => v.digit === 1)[0].value;
    const four = uniqueDigits.filter((v) => v.digit === 4)[0].value;
    const seven = uniqueDigits.filter((v) => v.digit === 7)[0].value;

    console.table(guessedDigits);

    for (let j = 0; j < guessedDigits.length; j++) {
      const { guesses, value } = guessedDigits[j];
      if (guesses.length > 1) {
        if (one && guesses.includes(0) && !containsChars(one, value)) {
          guessedDigits[j].guesses = guessedDigits[j].guesses.filter(
            (v) => v !== 0
          );
        }

        if (one && guesses.includes(3) && !containsChars(one, value)) {
          guessedDigits[j].guesses = guessedDigits[j].guesses.filter(
            (v) => v !== 3
          );
        }

        if (one && guesses.includes(9) && !containsChars(one, value)) {
          guessedDigits[j].guesses = guessedDigits[j].guesses.filter(
            (v) => v !== 9
          );
        }

        if (four && guesses.includes(9) && !containsChars(four, value)) {
          guessedDigits[j].guesses = guessedDigits[j].guesses.filter(
            (v) => v !== 9
          );
        }

        if (seven && guesses.includes(9) && !containsChars(seven, value)) {
          guessedDigits[j].guesses = guessedDigits[j].guesses.filter(
            (v) => v !== 9
          );
        }
      }
    }

    console.table(guessedDigits);
  }
}

export function containsChars(str1: string, str2: string) {
  for (let i = 0; i < str1.length; i++) {
    let present = false;
    for (let j = 0; j < str2.length; j++) {
      if (str1[i] === str2[j]) {
        present = true;
      }
    }

    if (!present) return false;
  }

  return true;
}

export function parseMessage(input: string[]) {
  const output = {
    lineSignalPatterns: [],
    lineOutputValues: [],
    lineAll: [],
  } as parsedObject;

  for (let i = 0; i < input.length; i++) {
    const [signalPatternsRaw, outputValuesRaw] = input[i].split("|");
    const signalPatterns = sortValues(
      signalPatternsRaw.split(/\s/gim).filter((v) => v !== "")
    );
    const outputValues = sortValues(
      outputValuesRaw.split(/\s/gim).filter((v) => v !== "")
    );

    output.lineSignalPatterns.push(signalPatterns);
    output.lineOutputValues.push(outputValues);
    output.lineAll.push(signalPatterns.concat(outputValues));
  }

  return output;
}

export function sortValues(input: string[]) {
  const newArray: string[] = [];

  for (let i = 0; i < input.length; i++) {
    newArray[i] = input[i].split("").sort().join("");
  }

  return newArray;
}

export class SevenSegmentDisplay {
  private arrangement: arrangement;

  constructor(
    private signalPatterns: string[],
    private outputValues: string[],
    private allValues: string[]
  ) {
    this.arrangement = {
      a: "",
      b: "",
      c: "",
      d: "",
      e: "",
      f: "",
      g: "",
    };
  }

  public getUniqueDigits(guessedDigits: guessObject[]) {
    const uniqueDigits: uniqueDigit[] = [];

    guessedDigits.forEach((guess) => {
      let present = false;

      uniqueDigits.forEach((digit) => {
        if (guess.guesses.length === 1 && digit.value === guess.value) {
          present = true;
        }
      });

      if (!present && guess.guesses.length === 1) {
        uniqueDigits.push({ digit: guess.guesses[0], value: guess.value });
      }
    });

    return uniqueDigits.sort((a, b) => a.digit - b.digit);
  }

  public guessDigits() {
    const guessedDigits: guessObject[] = [];

    this.allValues.forEach((value) => {
      let currentObject: guessObject = { value, guesses: [] };

      switch (value.length) {
        case 2:
          currentObject.guesses = [1];
          break;
        case 3:
          currentObject.guesses = [7];
          break;
        case 4:
          currentObject.guesses = [4];
          break;
        case 5:
          currentObject.guesses = [2, 3, 5];
          break;
        case 6:
          currentObject.guesses = [0, 6, 9];
          break;
        case 7:
          currentObject.guesses = [8];
          break;
      }

      guessedDigits.push(currentObject);
    });

    return guessedDigits;
  }

  public showCurrentArrangement() {
    let { a, b, c, d, e, f, g } = this.arrangement;

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
}

type arrangement = {
  a: string;
  b: string;
  c: string;
  d: string;
  e: string;
  f: string;
  g: string;
};

type parsedObject = {
  lineSignalPatterns: string[][];
  lineOutputValues: string[][];
  lineAll: string[][];
};

type guessObject = {
  value: string;
  guesses: number[];
};

type uniqueDigit = {
  value: string;
  digit: number;
};
