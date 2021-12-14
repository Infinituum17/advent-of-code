import { readLines } from "./utils";
import { Graph } from "../day-13/part-one";

const testInput =
  "6,10\n0,14\n9,10\n0,3\n10,4\n4,11\n6,0\n6,12\n4,1\n0,13\n10,12\n3,4\n3,0\n8,4\n1,10\n2,14\n8,10\n9,0\nfold along y=7\nfold along x=5".split(
    /\n/gim
  );

const testInputRepresentation =
  "...#..#..#.\n....#......\n...........\n#..........\n...#....#.#\n...........\n...........\n...........\n...........\n...........\n.#....#.##.\n....#......\n......#...#\n#..........\n#.#........";

describe("Day 13: Transparent Origami", () => {
  test("Part 1", async () => {
    const testGraph = new Graph(testInput);

    // Test cases
    expect(testGraph.toString()).toBe(testInputRepresentation);
    testGraph.foldGraph();
    expect(testGraph.getPoints()).toBe(17);

    const input = await readLines("./day-13/input.txt");

    const graph = new Graph(input);

    graph.foldGraph();

    // Solution (661)
    expect(graph.getPoints()).toBe(661);
  });
});
