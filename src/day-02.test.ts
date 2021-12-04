import { readLines } from "./utils";

const testInput = "forward 5\ndown 5\nforward 8\nup 3\ndown 8\nforward 2".split(
  /\n/gim
);

describe("Day 2: Dive!", () => {
  test("Part 1", async () => {
    const module = await import("../day-02/part-one");
    const { depthCalculator, horizontalCalculator } = module;
    const resolver = module.default;

    // Test cases
    expect(horizontalCalculator(testInput)).toBe(15);

    expect(depthCalculator(testInput)).toBe(10);

    expect(resolver(testInput)).toBe(150);

    // Solution (1604850)
    const input = await readLines("./day-02/input.txt");

    expect(resolver(input)).toBe(1604850);
  });

  test("Part 2", async () => {
    const module = await import("../day-02/part-two");
    const resolver = module.default;

    // Test cases
    expect(resolver(testInput)).toBe(900);

    // Solution (1685186100)
    const input = await readLines("./day-02/input.txt");

    expect(resolver(input)).toBe(1685186100);
  });
});
