import { readLines } from "./utils";

describe("Day 1: Sonar Sweep", () => {
  const testInput = "199\n200\n208\n210\n200\n207\n240\n269\n260\n263"
    .split(/\n/gim)
    .map((num) => parseInt(num));

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

describe("Day 2: Dive!", () => {
  const testInput =
    "forward 5\ndown 5\nforward 8\nup 3\ndown 8\nforward 2".split(/\n/gim);

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

describe("Day 3: Binary Diagnostic", () => {
  const testInput =
    "00100\n11110\n10110\n10111\n10101\n01111\n00111\n11100\n10000\n11001\n00010\n01010".split(
      /\n/gim
    );

  test("Part 1", async () => {
    const module = await import("../day-03/part-one");
    const countBits = module.countBits;
    const getGammaRate = module.getGammaRate;
    const getEpsilonRate = module.getEpsilonRate;
    const resolver = module.default;

    // Test cases
    const countedBits = countBits(testInput);
    expect(countedBits).toHaveLength(testInput[0].length);

    const gammaRate = getGammaRate(countedBits, testInput.length);
    expect(gammaRate).toBe(22);

    const epsilonRate = getEpsilonRate(countedBits, testInput.length);
    expect(epsilonRate).toBe(9);

    expect(resolver(testInput)).toBe(198);

    // Solution (1092896)
    const input = await readLines("./day-03/input.txt");

    expect(resolver(input)).toBe(1092896);
  });
});
