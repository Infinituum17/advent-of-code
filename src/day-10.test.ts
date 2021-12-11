import { readLines } from "./utils";
import { getCorruptedScore, getFirstIllegalChar } from "../day-10/part-one";

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

    const input = await readLines("./day-10/input.txt");

    // Solution (318099)
    expect(getCorruptedScore(input)).toBe(318099);
  });

  test("Part 2", async () => {});
});
