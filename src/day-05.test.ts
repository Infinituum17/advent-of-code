import { readLines } from "./utils";

const testInput =
  "0,9 -> 5,9\n8,0 -> 0,8\n9,4 -> 3,4\n2,2 -> 2,1\n7,0 -> 7,4\n6,4 -> 2,0\n0,9 -> 2,9\n3,4 -> 1,4\n0,0 -> 8,8\n5,5 -> 8,2".split(
    /\n/gim
  );

describe("Day 5: Hydrothermal Venture", () => {
  test("Part 1", async () => {
    const module = await import("../day-05/part-one");
    const resolver = module.default;

    // Test cases
    expect(resolver(testInput)).toBe(5);

    const input = await readLines("./day-05/input.txt");

    // Solution (5690)
    expect(resolver(input)).toBe(5690);
  });
});
