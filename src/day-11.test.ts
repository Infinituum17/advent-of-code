import { readLines } from "./utils";
import { OctopusMap, simulateSteps } from "../day-11/part-one";

const testInput =
  "5483143223\n2745854711\n5264556173\n6141336146\n6357385478\n4167524645\n2176841721\n6882881134\n4846848554\n5283751526".split(
    /\n/gim
  );

describe("Day 11: Dumbo Octopus", () => {
  test("Part 1", async () => {
    // Test cases
    let map = new OctopusMap(testInput);

    map.performStep();

    expect(map.toString()).toBe(
      "6,5,9,4,2,5,4,3,3,4,3,8,5,6,9,6,5,8,2,2,6,3,7,5,6,6,7,2,8,4,7,2,5,2,4,4,7,2,5,7,7,4,6,8,4,9,6,5,8,9,5,2,7,8,6,3,5,7,5,6,3,2,8,7,9,5,2,8,3,2,7,9,9,3,9,9,2,2,4,5,5,9,5,7,9,5,9,6,6,5,6,3,9,4,8,6,2,6,3,7"
    );

    map.performStep();

    expect(map.toString()).toBe(
      "8,8,0,7,4,7,6,5,5,5,5,0,8,9,0,8,7,0,5,4,8,5,9,7,8,8,9,6,0,8,8,4,8,5,7,6,9,6,0,0,8,7,0,0,9,0,8,8,0,0,6,6,0,0,0,8,8,9,8,9,6,8,0,0,0,0,5,9,4,3,0,0,0,0,0,0,7,4,5,6,9,0,0,0,0,0,0,8,7,6,8,7,0,0,0,0,6,8,4,8"
    );

    expect(simulateSteps(testInput, 1)).toBe(0);
    expect(simulateSteps(testInput, 10)).toBe(204);
    expect(simulateSteps(testInput, 100)).toBe(1656);

    const input = await readLines("./day-11/input.txt");

    // Solution (1717)
    expect(simulateSteps(input, 100)).toBe(1717);
  });
});
