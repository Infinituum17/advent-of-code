import { readLines } from "./utils";

const testInput =
  "00100\n11110\n10110\n10111\n10101\n01111\n00111\n11100\n10000\n11001\n00010\n01010".split(
    /\n/gim
  );

describe("Day 3: Binary Diagnostic", () => {
  test("Part 1", async () => {
    const module = await import("../day-03/part-one");
    const countBits = module.countBits;
    const getGammaRate = module.getGammaRate;
    const getEpsilonRate = module.getEpsilonRate;
    const resolver = module.default;

    // Test cases
    const countedBits = countBits(testInput);
    expect(countedBits).toHaveLength(testInput[0].length);

    const gammaRate = getGammaRate(countedBits, testInput.length);
    expect(gammaRate).toBe(22);

    const epsilonRate = getEpsilonRate(countedBits, testInput.length);
    expect(epsilonRate).toBe(9);

    expect(resolver(testInput)).toBe(198);

    const input = await readLines("./day-03/input.txt");

    // Solution (1092896)
    expect(resolver(input)).toBe(1092896);
  });

  test("Part 2", async () => {
    const module = await import("../day-03/part-two");
    const getOxygenRating = module.getOxygenRating;
    const getCO2ScrubberRating = module.getCO2ScrubberRating;
    const getBitOccurrencyByIndex = module.getBitOccurrenceByIndex;
    const recursiveBitSearch = module.recursiveBitSearch;
    const resolver = module.default;

    //Test cases
    const bitOccurrency = getBitOccurrencyByIndex(testInput, 0);

    expect(bitOccurrency).toHaveLength(2);
    expect(bitOccurrency[0]).toHaveLength(5);
    expect(bitOccurrency[1]).toHaveLength(7);

    const bitSearchResult = recursiveBitSearch(testInput, 0, true);

    expect(bitSearchResult).toBe("10111");

    const oxygenRating = getOxygenRating(testInput);

    expect(oxygenRating).toBe(23);

    const CO2ScrubberRating = getCO2ScrubberRating(testInput);

    expect(CO2ScrubberRating).toBe(10);

    expect(resolver(testInput)).toBe(230);

    const input = await readLines("./day-03/input.txt");

    // Solution (4672151)
    expect(resolver(input)).toBe(4672151);
  });
});
