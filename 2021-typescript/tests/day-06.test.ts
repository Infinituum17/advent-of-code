import { readInputFile } from "../src/utils";

import resolver1 from "../src/day-06/part-one";
import resolver2 from "../src/day-06/part-two";

const testInput = "3,4,3,1,2".split(/\,/gim).map((v) => parseInt(v));

describe("Day 6: Lanternfish", () => {
  test("Part 1", async () => {
    // Test cases
    expect(resolver1(testInput, 18)).toBe(26);
    expect(resolver1(testInput, 80)).toBe(5934);

    const input = (await readInputFile("day-06-input"))
      .split(/\,/gim)
      .map((v) => parseInt(v));

    // Solution (343441)
    expect(resolver1(input, 80)).toBe(343441);
  });

  test("Part 2", async () => {
    // Test cases
    expect(resolver2(testInput, 256)).toBe(26984457539);

    const input = (await readInputFile("day-06-input"))
      .split(/\,/gim)
      .map((v) => parseInt(v));

    // Solution (1569108373832)
    expect(resolver2(input, 256)).toBe(1569108373832);
  });
});
