import { readInputFile } from "./utils";

const testInput = "3,4,3,1,2".split(/\,/gim).map((v) => parseInt(v));

describe("Day 6: Lanternfish", () => {
  test("Part 1", async () => {
    const module = await import("../day-06/part-one");
    const resolver = module.default;

    // Test cases
    expect(resolver(testInput, 18)).toBe(26);
    expect(resolver(testInput, 80)).toBe(5934);

    const input = (await readInputFile("./day-06/input.txt"))
      .split(/\,/gim)
      .map((v) => parseInt(v));

    // Solution (343441)
    expect(resolver(input, 80)).toBe(343441);
  });

  test("Part 2", async () => {
    const module = await import("../day-06/part-two");
    const resolver = module.default;

    // Test cases
    expect(resolver(testInput, 256)).toBe(26984457539);

    const input = (await readInputFile("./day-06/input.txt"))
      .split(/\,/gim)
      .map((v) => parseInt(v));

    // Solution (1569108373832)
    expect(resolver(input, 256)).toBe(1569108373832);
  });
});
