import { readLines } from "./utils";

import resolver1 from "../day-01/part-one";
import resolver2 from "../day-01/part-two";

const testInput = "199\n200\n208\n210\n200\n207\n240\n269\n260\n263"
  .split(/\n/gim)
  .map((num) => parseInt(num));

describe("Day 1: Sonar Sweep", () => {
  test("Part 1", async () => {
    // Test cases
    expect(resolver1(testInput)).toBe(7);

    const input = (await readLines("./day-01/input.txt")).map((num) =>
      parseInt(num)
    );

    // Solution (1342)
    expect(resolver1(input)).toBe(1342);
  });

  test("Part 2", async () => {
    // Test cases
    expect(resolver2(testInput)).toBe(5);

    const input = (await readLines("./day-01/input.txt")).map((num) =>
      parseInt(num)
    );

    // Solution (1378)
    expect(resolver2(input)).toBe(1378);
  });
});
