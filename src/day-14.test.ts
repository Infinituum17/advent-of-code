import { readLines } from "./utils";
import {
  getDifference,
  getPairInsertionRules,
  getPolymerTemplate,
  polymerize,
  polymerizeAll,
} from "../day-14/part-one";

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

    expect(polymerize(testPairInsertionRules, testPolymerTemplate)).toBe(
      "NCNBCHB"
    );
    expect(polymerize(testPairInsertionRules, "NCNBCHB")).toBe("NBCCNBBBCBHCB");
    expect(polymerize(testPairInsertionRules, "NBCCNBBBCBHCB")).toBe(
      "NBBBCNCCNBBNBNBBCHBHHBCHB"
    );
    expect(polymerizeAll(testInput, 2)).toBe("NBCCNBBBCBHCB");

    expect(getDifference(polymerizeAll(testInput, 10))).toBe(1588);

    const input = await readLines("./day-14/input.txt");

    // Solution (2509)
    expect(getDifference(polymerizeAll(input, 10))).toBe(2509);
  });
});
