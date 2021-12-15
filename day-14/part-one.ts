export function getPolymerTemplate(input: string[]) {
  return input[0];
}

export function getPairInsertionRules(input: string[]) {
  const inputPairInsertionRules = input.slice(1);
  const pairInsertionRules = new Map<string, string>();

  for (const line of inputPairInsertionRules) {
    const [inputValues, outputValue] = line.split(/\s\-\>\s/gim);

    pairInsertionRules.set(inputValues, outputValue);
  }

  return pairInsertionRules;
}

export function polymerize(
  pairInsertionRules: Map<string, string>,
  polymerTemplate: string
) {
  const parts: string[] = [];

  for (let i = 0; i + 1 < polymerTemplate.length; i++) {
    parts.push(
      pairInsertionRules.get(polymerTemplate[i] + polymerTemplate[i + 1]) ?? ""
    );
  }

  parts.reverse();

  let result = "";

  for (let i = 0; i < polymerTemplate.length; i++) {
    if (i > 0) {
      result += parts.pop();
    }

    result += polymerTemplate[i];
  }

  return result;
}

export function polymerizeAll(input: string[], times: number) {
  const pairInsertionRules = getPairInsertionRules(input);
  let polymerTemplate = getPolymerTemplate(input);

  for (let i = 0; i < times; i++) {
    polymerTemplate = polymerize(pairInsertionRules, polymerTemplate);
  }

  return polymerTemplate;
}

export function getDifference(polymer: string) {
  const counter = countAllCharacters(polymer);

  return (
    Math.max(...Object.values(counter)) - Math.min(...Object.values(counter))
  );
}

export function countAllCharacters(str: string) {
  let counter: { [key: string]: number } = {};

  [...str].forEach((letter) => {
    if (!counter[letter]) {
      counter[letter] = 1;
    } else {
      counter[letter] += 1;
    }
  });

  return counter;
}
