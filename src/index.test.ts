import { readInputFile } from "./utils";

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
    const input = (await readInputFile("./day-1-sonar-sweep/input.txt"))
      .split(/\n/gim)
      .map((num) => parseInt(num));

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
    const input = (await readInputFile("./day-1-sonar-sweep/input.txt"))
      .split(/\n/gim)
      .map((num) => parseInt(num));

    expect(resolver(input)).toBe(1378);
  });
});
