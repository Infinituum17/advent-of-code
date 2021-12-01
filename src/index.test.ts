import { readInputFile } from "./utils";

const debug = false;

test("Day 1 - Sonar Sweep: Part One", async () => {
  const module = await import("../day-1-sonar-sweep/part-one");
  const resolver = module.default;

  // Test cases
  const testInput = "199\n200\n208\n210\n200\n207\n240\n269\n260\n263";

  expect(resolver(testInput, debug)).toBe(7);

  // Solution (1342)
  const input = await readInputFile("./day-1-sonar-sweep/input.txt");

  expect(resolver(input)).toBe(1342);
});

test("Day 1 - Sonar Sweep: Part Two", async () => {
  const module = await import("../day-1-sonar-sweep/part-two");
  const resolver = module.default;

  // Test cases
  const testInput = "199\n200\n208\n210\n200\n207\n240\n269\n260\n263";

  expect(resolver(testInput, true)).toBe(5);

  // Solution (...)
  const input = await readInputFile("./day-1-sonar-sweep/input.txt");

  expect(resolver(input)).toBe(1378);
});
