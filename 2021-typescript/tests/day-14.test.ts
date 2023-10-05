import { readLines } from "../src/utils";
import {
  getDifference as getDifference1,
  getPairInsertionRules,
  getPolymerTemplate,
  polymerize as polymerize1,
  polymerizeAll as polymerizeAll1,
} from "../src/day-14/part-one";
import {
  getDifference as getDifference2,
  polymerizeAll as polymerizeAll2,
} from "../src/day-14/part-two";

const testInput =
  "NNCB\nCH -> B\nHH -> N\nCB -> H\nNH -> C\nHB -> C\nHC -> B\nHN -> C\nNN -> C\nBH -> H\nNC -> B\nNB -> B\nBN -> B\nBB -> N\nBC -> B\nCC -> N\nCN -> C".split(
    /\n/gim
  );

describe("Day 14: Extended Polymerization", () => {
  test("Part 1", async () => {
    // Test cases
    const testPolymerTemplate = getPolymerTemplate(testInput);
    expect(testPolymerTemplate).toBe("NNCB");

    const testPairInsertionRules = getPairInsertionRules(testInput);
    expect(testPairInsertionRules).toBeInstanceOf(Map);

    expect(polymerize1(testPairInsertionRules, testPolymerTemplate)).toBe(
      "NCNBCHB"
    );
    expect(polymerize1(testPairInsertionRules, "NCNBCHB")).toBe(
      "NBCCNBBBCBHCB"
    );
    expect(polymerize1(testPairInsertionRules, "NBCCNBBBCBHCB")).toBe(
      "NBBBCNCCNBBNBNBBCHBHHBCHB"
    );
    expect(polymerizeAll1(testInput, 2)).toBe("NBCCNBBBCBHCB");

    expect(getDifference1(polymerizeAll1(testInput, 10))).toBe(1588);

    const input = await readLines("day-14-input");

    // Solution (2509)
    expect(getDifference1(polymerizeAll1(input, 10))).toBe(2509);
  });

  test("Part 2", async () => {
    // Test cases
    const testPairInsertionRules = getPairInsertionRules(testInput);

    /* expect(polymerizeAll2(testInput, 1)).toMatchObject({
      N: 2,
      C: 2,
      B: 2,
      H: 1,
    }); */
    expect(polymerizeAll2(testInput, 2)).toMatchObject({
      N: 2,
      B: 6,
      C: 4,
      H: 1,
    });
    expect(polymerizeAll2(testInput, 3)).toMatchObject({
      B: 11,
      N: 5,
      C: 5,
      H: 4,
    });

    expect(getDifference2(polymerizeAll2(testInput, 10))).toBe(1588);

    expect(getDifference2(polymerizeAll2(testInput, 40))).toBe(2188189693529);

    const input = await readLines("day-14-input");

    // Solution (2827627697643)
    expect(getDifference2(polymerizeAll2(input, 40))).toBe(2827627697643);
  });
});
