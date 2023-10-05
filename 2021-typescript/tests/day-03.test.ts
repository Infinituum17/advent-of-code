import { readLines } from "../src/utils";

import { countBits, getEpsilonRate, getGammaRate } from "../src/day-03/part-one";
import resolver1 from "../src/day-03/part-one";
import {
  getBitOccurrenceByIndex,
  getCO2ScrubberRating,
  getOxygenRating,
  recursiveBitSearch,
} from "../src/day-03/part-two";
import resolver2 from "../src/day-03/part-two";

const testInput =
  "00100\n11110\n10110\n10111\n10101\n01111\n00111\n11100\n10000\n11001\n00010\n01010".split(
    /\n/gim
  );

describe("Day 3: Binary Diagnostic", () => {
  test("Part 1", async () => {
    // Test cases
    const countedBits = countBits(testInput);
    expect(countedBits).toHaveLength(testInput[0].length);

    const gammaRate = getGammaRate(countedBits, testInput.length);
    expect(gammaRate).toBe(22);

    const epsilonRate = getEpsilonRate(countedBits, testInput.length);
    expect(epsilonRate).toBe(9);

    expect(resolver1(testInput)).toBe(198);

    const input = await readLines("./data/day-03-input.txt");

    // Solution (1092896)
    expect(resolver1(input)).toBe(1092896);
  });

  test("Part 2", async () => {
    //Test cases
    const bitOccurrency = getBitOccurrenceByIndex(testInput, 0);

    expect(bitOccurrency).toHaveLength(2);
    expect(bitOccurrency[0]).toHaveLength(5);
    expect(bitOccurrency[1]).toHaveLength(7);

    const bitSearchResult = recursiveBitSearch(testInput, 0, true);

    expect(bitSearchResult).toBe("10111");

    const oxygenRating = getOxygenRating(testInput);

    expect(oxygenRating).toBe(23);

    const CO2ScrubberRating = getCO2ScrubberRating(testInput);

    expect(CO2ScrubberRating).toBe(10);

    expect(resolver2(testInput)).toBe(230);

    const input = await readLines("./data/day-03-input.txt");

    // Solution (4672151)
    expect(resolver2(input)).toBe(4672151);
  });
});
