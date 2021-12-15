import { getPairInsertionRules, getPolymerTemplate } from "./part-one";

export function getDifference(counter: { [key: string]: number }) {
  return (
    Math.max(...Object.values(counter)) - Math.min(...Object.values(counter))
  );
}

export function countLetters(
  tracker: { [key: string]: number },
  lastLetter: string
) {
  const counter: { [key: string]: number } = {};

  for (const key in tracker) {
    const count = tracker[key];

    if (!counter[key[0]]) {
      counter[key[0]] = 0;
    }

    counter[key[0]] += count;
  }

  if (!counter[lastLetter]) counter[lastLetter] = 0;

  counter[lastLetter] += 1;

  return counter;
}

export function polymerize(
  pairInsertionRules: Map<string, string>,
  pairTracker: { [key: string]: number }
) {
  const newTracker: { [key: string]: number } = {};

  for (const key in pairTracker) {
    const count = pairTracker[key];

    if (count != 0) {
      const result = pairInsertionRules.get(key)!;
      const firstPair = key[0] + result;
      const secondPair = result + key[1];

      if (!newTracker[firstPair]) newTracker[firstPair] = 0;
      if (!newTracker[secondPair]) newTracker[secondPair] = 0;

      newTracker[firstPair] += count;
      newTracker[secondPair] += count;
    }
  }

  return newTracker;
}

export function polymerizeAll(input: string[], times: number) {
  const pairInsertionRules = getPairInsertionRules(input);
  const polymerTemplate = getPolymerTemplate(input);
  let tracker: { [key: string]: number } = {};
  let lastLetter = "";

  for (let i = 0; i + 1 < polymerTemplate.length; i++) {
    const currentSet = polymerTemplate[i] + polymerTemplate[i + 1];

    if (!tracker[currentSet]) tracker[currentSet] = 0;

    tracker[currentSet] += 1;

    if (i + 2 === polymerTemplate.length) {
      lastLetter = polymerTemplate[i + 1];
    }
  }

  for (let i = 0; i < times; i++) {
    tracker = polymerize(pairInsertionRules, tracker);
  }

  return countLetters(tracker, lastLetter);
}
