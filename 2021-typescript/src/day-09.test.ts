import { readInputFile } from "./utils";

import {
  parseHeightMap,
  getLowPoints,
  getSumRiskLevels,
  checkNearbyPointsForLower,
} from "../day-09/part-one";
import { getBasins, getThreeLargestBasinsMultiplied } from "../day-09/part-two";

const testInput = "2199943210\n3987894921\n9856789892\n8767896789\n9899965678";

describe("Day 9: Smoke Basin", () => {
  test("Part 1", async () => {
    // Test cases
    const heightMap = parseHeightMap(testInput);
    expect(heightMap).toHaveLength(5);
    heightMap.forEach((v) => expect(v).toHaveLength(10));

    expect(checkNearbyPointsForLower(heightMap, 0, 0)).toBe(false);
    expect(checkNearbyPointsForLower(heightMap, 0, 8)).toBe(false);
    expect(checkNearbyPointsForLower(heightMap, 0, 1)).toBe(true);
    expect(checkNearbyPointsForLower(heightMap, 0, 9)).toBe(true);
    expect(checkNearbyPointsForLower(heightMap, 2, 2)).toBe(true);
    expect(checkNearbyPointsForLower(heightMap, 4, 6)).toBe(true);

    expect(
      checkNearbyPointsForLower(parseHeightMap("999\n999\n999"), 1, 1)
    ).toBe(false);

    const lowPoints = getLowPoints(heightMap);
    expect(lowPoints).toHaveLength(4);

    const sumRiskLevels = getSumRiskLevels(lowPoints);
    expect(sumRiskLevels).toBe(15);

    const input = await readInputFile("./day-09/input.txt");

    // Solution (607)
    const inputHeightMap = parseHeightMap(input);
    const inputLowPoints = getLowPoints(inputHeightMap);
    const inputSumRiskLevels = getSumRiskLevels(inputLowPoints);
    expect(inputSumRiskLevels).toBe(607);
  });

  test("Part 2", async () => {
    // Test cases
    const heightMap = parseHeightMap(testInput);
    const lowPoints = getLowPoints(heightMap);

    const basinSizes = getBasins(heightMap, lowPoints);
    expect(basinSizes).toHaveLength(4);

    const threeLargestBasinsMultiplied =
      getThreeLargestBasinsMultiplied(basinSizes);
    expect(threeLargestBasinsMultiplied).toBe(1134);

    const input = await readInputFile("./day-09/input.txt");

    // Solution (900864)
    const inputHeightMap = parseHeightMap(input);
    const inputLowPoints = getLowPoints(inputHeightMap);
    const inputBasinSizes = getBasins(inputHeightMap, inputLowPoints);
    const inputThreeLargestBasinsMultiplied =
      getThreeLargestBasinsMultiplied(inputBasinSizes);
    expect(inputThreeLargestBasinsMultiplied).toBe(900864);
  });
});
