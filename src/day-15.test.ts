import { readLines } from "./utils";
import { dijkstraShortestPath, parseRisks } from "../day-15/part-one";

const testInput =
  "1163751742\n1381373672\n2136511328\n3694931569\n7463417111\n1319128137\n1359912421\n3125421639\n1293138521\n2311944581".split(
    /\n/gim
  );

describe("Day 15: Chiton", () => {
  test("Part 1", async () => {
    // Test cases
    expect(dijkstraShortestPath(parseRisks(testInput), 0)).toBe(40);

    const input = await readLines("./day-15/input.txt");

    // Solution (685)
    expect(dijkstraShortestPath(parseRisks(input), 0)).toBe(685);
  });
});
