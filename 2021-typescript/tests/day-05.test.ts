import { readLines } from "../src/utils";

import resolver1 from "../src/day-05/part-one";
import resolver2 from "../src/day-05/part-two";

const testInput =
  "0,9 -> 5,9\n8,0 -> 0,8\n9,4 -> 3,4\n2,2 -> 2,1\n7,0 -> 7,4\n6,4 -> 2,0\n0,9 -> 2,9\n3,4 -> 1,4\n0,0 -> 8,8\n5,5 -> 8,2".split(
    /\n/gim
  );

describe("Day 5: Hydrothermal Venture", () => {
  test("Part 1", async () => {
    // Test cases
    expect(resolver1(testInput)).toBe(5);

    const input = await readLines("day-05-input");

    // Solution (5690)
    expect(resolver1(input)).toBe(5690);
  });

  test("Part 2", async () => {
    // Test cases
    expect(resolver2(testInput)).toBe(12);

    const input = await readLines("day-05-input");

    // Solution (17741)
    expect(resolver2(input)).toBe(17741);
  });
});
