import { readInputFile } from "../src/utils";

import { getMaxPosition } from "../src/day-07/part-one";
import resolver1 from "../src/day-07/part-one";
import { getSumUntilPosition } from "../src/day-07/part-two";
import resolver2 from "../src/day-07/part-two";

const testInput = "16,1,2,0,4,2,7,1,2,14"
  .split(/\,/gim)
  .map((v) => parseInt(v));

describe("Day 7: The Treachery of Whales", () => {
  test("Part 1", async () => {
    // Test cases
    expect(getMaxPosition(testInput)).toBe(16);

    expect(resolver1(testInput)).toBe(37);

    const input = (await readInputFile("./data/day-07-input.txt"))
      .split(/\,/gim)
      .map((v) => parseInt(v));

    // Solution (347509)
    expect(resolver1(input)).toBe(347509);
  });

  test("Part 2", async () => {
    // Test cases
    expect(getSumUntilPosition(4)).toBe(1 + 2 + 3 + 4);
    expect(resolver2(testInput)).toBe(168);

    const input = (await readInputFile("./data/day-07-input.txt"))
      .split(/\,/gim)
      .map((v) => parseInt(v));

    // Solution (98257206)
    expect(resolver2(input)).toBe(98257206);
  });
});
