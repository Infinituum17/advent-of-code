import { readLines } from "../src/utils";

import { getCorruptedScore, getFirstIllegalChar } from "../src/day-10/part-one";
import { getLastCompletion, getUncompleteScore } from "../src/day-10/part-two";

const testInput =
  "[({(<(())[]>[[{[]{<()<>>\n[(()[<>])]({[<{<<[]>>(\n{([(<{}[<>[]}>{[]{[(<()>\n(((({<>}<{<{<>}{[]{[]{}\n[[<[([]))<([[{}[[()]]]\n[{[{({}]{}}([{[{{{}}([]\n{<[[]]>}<{[{[{[]{()[[[]\n[<(<(<(<{}))><([]([]()\n<{([([[(<>()){}]>(<<{{\n<{([{{}}[<[[[<>{}]]]>[]]".split(
    /\n/gim
  );

describe("Day 10: Syntax Scoring", () => {
  test("Part 1", async () => {
    // Test cases
    expect(getFirstIllegalChar(testInput[0])).toBe("");
    expect(getFirstIllegalChar(testInput[2])).toBe("}");
    expect(getCorruptedScore(testInput)).toBe(26397);

    const input = await readLines("./data/day-10-input.txt");

    // Solution (318099)
    expect(getCorruptedScore(input)).toBe(318099);
  });

  test("Part 2", async () => {
    // Test cases
    expect(getLastCompletion(testInput[9]).join("")).toBe("])}>");
    expect(getUncompleteScore(testInput)).toBe(288957);

    const input = await readLines("./data/day-10-input.txt");

    // Solution (2389738699)
    expect(getUncompleteScore(input)).toBe(2389738699);
  });
});
