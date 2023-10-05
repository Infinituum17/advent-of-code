import { Bound, getFinalXPosition, isCoordInRange, isInRange, shoot } from "../src/day-17/part-one";
import { getReachedTargetCount } from "../src/day-17/part-two";
import { readLines } from "../src/utils";

describe("Day 17: Trick Shot", () => {
  test("Part 1: Functions", () => {
    expect(getFinalXPosition(6)).toBe(21);
    expect(getFinalXPosition(88)).toBe(3916);

    expect(isInRange(6, [0, 2])).toBe(false)
    expect(isInRange(6, [0, 7])).toBe(true)
    expect(isInRange(6, [0, 6])).toBe(true)
    expect(isInRange(6, [6, 7])).toBe(true)

    expect(isCoordInRange([0, 1], [0, 10], [-2, 10])).toBe(true);
    expect(isCoordInRange([10, 10], [0, 100], [-100, -20])).toBe(false);
  });

  test("Part 1: Example 1", () => {
    const [xBounds, yBounds]: [Bound, Bound] = [[20, 30], [-10, -5]];

    expect(shoot(xBounds, yBounds)).toBe(45)
  });

  test("Part 1", async () => {
    const [xBounds, yBounds] = (await readLines("day-17-input"))[0].split(/ /).map(v => v.split(",").map(i => parseInt(i)));

    expect(shoot(xBounds as Bound, yBounds as Bound)).toBe(3655);
  });

  test("Part 2: Example 1", () => {
    const [xBounds, yBounds]: [Bound, Bound] = [[20, 30], [-10, -5]];

    expect(getReachedTargetCount(xBounds, yBounds)).toBe(112)
  });

  test("Part 2", async () => {
    const [xBounds, yBounds] = (await readLines("day-17-input"))[0].split(/ /).map(v => v.split(",").map(i => parseInt(i)));

    expect(getReachedTargetCount(xBounds as Bound, yBounds as Bound)).toBe(1447)
  });
});