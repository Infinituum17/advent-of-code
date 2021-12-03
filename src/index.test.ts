import { readLines } from "./utils";

describe("Day One", () => {
  test("Sonar Sweep: Part One", async () => {
    const module = await import("../day-1-sonar-sweep/part-one");
    const resolver = module.default;

    // Test cases
    const testInput = "199\n200\n208\n210\n200\n207\n240\n269\n260\n263"
      .split(/\n/gim)
      .map((num) => parseInt(num));

    expect(resolver(testInput)).toBe(7);

    // Solution (1342)
    const input = (await readLines("./day-1-sonar-sweep/input.txt")).map(
      (num) => parseInt(num)
    );

    expect(resolver(input)).toBe(1342);
  });

  test("Sonar Sweep: Part Two", async () => {
    const module = await import("../day-1-sonar-sweep/part-two");
    const resolver = module.default;

    // Test cases
    const testInput = "199\n200\n208\n210\n200\n207\n240\n269\n260\n263"
      .split(/\n/gim)
      .map((num) => parseInt(num));

    expect(resolver(testInput)).toBe(5);

    // Solution (...)
    const input = (await readLines("./day-1-sonar-sweep/input.txt")).map(
      (num) => parseInt(num)
    );

    expect(resolver(input)).toBe(1378);
  });
});

describe("Day Two", () => {
  test("Dive!: Part One", async () => {
    const module = await import("../day-2-dive!/part-one");
    const { depthCalculator, horizontalCalculator } = module;
    const resolver = module.default;

    // Test cases
    const testInput =
      "forward 5\ndown 5\nforward 8\nup 3\ndown 8\nforward 2".split(/\n/gim);

    expect(horizontalCalculator(testInput)).toBe(15);

    expect(depthCalculator(testInput)).toBe(10);

    expect(resolver(testInput)).toBe(150);

    // Solution (...)
    const input = await readLines("./day-2-dive!/input.txt");

    expect(resolver(input)).toBe(1604850);
  });

  test("Dive!: Part Two", async () => {
    const module = await import("../day-2-dive!/part-two");
    const resolver = module.default;

    // Test cases
    const testInput =
      "forward 5\ndown 5\nforward 8\nup 3\ndown 8\nforward 2".split(/\n/gim);

    expect(resolver(testInput)).toBe(900);

    // Solution (...)
    const input = await readLines("./day-2-dive!/input.txt");

    expect(resolver(input)).toBe(1685186100);
  });
});
