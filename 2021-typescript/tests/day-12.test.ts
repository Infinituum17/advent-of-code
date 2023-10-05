import { readLines } from "../src/utils";
import { getCavePaths } from "../src/day-12/part-one";
import { getDoubleSmallCavePaths } from "../src/day-12/part-two";

const testInput1 = "start-A\nstart-b\nA-c\nA-b\nb-d\nA-end\nb-end".split(
  /\n/gim
);

describe("Day 12: Passage Pathing", () => {
  test("Part 1", async () => {
    // Test cases
    expect(getCavePaths(testInput1)).toBe(10);

    const input = await readLines("./data/day-12-input.txt");

    // Solution (3761)
    expect(getCavePaths(input)).toBe(3761);
  });

  test("Part 2", async () => {
    // Test cases
    expect(getDoubleSmallCavePaths(testInput1)).toBe(36);

    const input = await readLines("./data/day-12-input.txt");

    // Solution (99138)
    expect(getDoubleSmallCavePaths(input)).toBe(99138);
  });
});
