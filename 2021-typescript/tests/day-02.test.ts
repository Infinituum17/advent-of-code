import { readLines } from "../src/utils";

import { depthCalculator, horizontalCalculator } from "../src/day-02/part-one";
import resolver1 from "../src/day-02/part-one";
import resolver2 from "../src/day-02/part-two";

const testInput = "forward 5\ndown 5\nforward 8\nup 3\ndown 8\nforward 2".split(
  /\n/gim
);

describe("Day 2: Dive!", () => {
  test("Part 1", async () => {
    // Test cases
    expect(horizontalCalculator(testInput)).toBe(15);

    expect(depthCalculator(testInput)).toBe(10);

    expect(resolver1(testInput)).toBe(150);

    const input = await readLines("day-02-input");

    // Solution (1604850)
    expect(resolver1(input)).toBe(1604850);
  });

  test("Part 2", async () => {
    // Test cases
    expect(resolver2(testInput)).toBe(900);

    const input = await readLines("day-02-input");

    // Solution (1685186100)
    expect(resolver2(input)).toBe(1685186100);
  });
});
