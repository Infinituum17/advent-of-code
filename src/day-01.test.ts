import { readLines } from "./utils";

const testInput = "199\n200\n208\n210\n200\n207\n240\n269\n260\n263"
  .split(/\n/gim)
  .map((num) => parseInt(num));

describe("Day 1: Sonar Sweep", () => {
  test("Part 1", async () => {
    const module = await import("../day-01/part-one");
    const resolver = module.default;

    // Test cases
    expect(resolver(testInput)).toBe(7);

    // Solution (1342)
    const input = (await readLines("./day-01/input.txt")).map((num) =>
      parseInt(num)
    );

    expect(resolver(input)).toBe(1342);
  });

  test("Part 2", async () => {
    const module = await import("../day-01/part-two");
    const resolver = module.default;

    // Test cases
    expect(resolver(testInput)).toBe(5);

    // Solution (1378)
    const input = (await readLines("./day-01/input.txt")).map((num) =>
      parseInt(num)
    );

    expect(resolver(input)).toBe(1378);
  });
});
