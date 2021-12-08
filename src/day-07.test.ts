import { readInputFile } from "./utils";

import { getMaxPosition } from "../day-07/part-one";
import resolver1 from "../day-07/part-one";

const testInput = "16,1,2,0,4,2,7,1,2,14"
  .split(/\,/gim)
  .map((v) => parseInt(v));

describe("Day 7: The Treachery of Whales", () => {
  test("Part 1", async () => {
    // Test cases
    expect(getMaxPosition(testInput)).toBe(16);

    expect(resolver1(testInput)).toBe(37);

    const input = (await readInputFile("./day-07/input.txt"))
      .split(/\,/gim)
      .map((v) => parseInt(v));

    // Solution (347509)
    expect(resolver1(input)).toBe(347509);
  });
});
