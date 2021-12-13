import { readLines } from "./utils";
import { getCavePaths } from "../day-12/part-one";

const testInput1 = "start-A\nstart-b\nA-c\nA-b\nb-d\nA-end\nb-end".split(
  /\n/gim
);

describe("Day 12: Passage Pathing", () => {
  test("Part 1", async () => {
    // Test cases
    expect(getCavePaths(testInput1)).toBe(10);

    const input = await readLines("./day-12/input.txt");

    // Solution (3761)
    expect(getCavePaths(input)).toBe(3761);
  });
});
