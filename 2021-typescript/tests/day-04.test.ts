import { readInputFile } from "../src/utils";

import BingoGame from "../src/day-04/part-one";
import LastWinBingoGame from "../src/day-04/part-two";

const testInput =
  "7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1\n\n22 13 17 11  0\n 8  2 23  4 24\n21  9 14 16  7\n 6 10  3 18  5\n 1 12 20 15 19\n\n 3 15  0  2 22\n 9 18 13 17  5\n19  8  7 25 23\n20 11 10 24  4\n14 21 16 12  6\n\n14 21 17 24  4\n10 16 15  9 19\n18  8 23 26 20\n22 11 13  6  5\n 2  0 12  3  7".split(
    /\n\n/gim
  );

describe("Day 4: Giant Squid", () => {
  test("Part 1", async () => {
    const [testNumberList, ...testTableList] = testInput;

    const testGame = new BingoGame(testNumberList, testTableList);

    // Test cases
    expect(testGame.getWinnerScore()).toBe(4512);

    const input = (await readInputFile("day-04-input")).split(/\n\n/gim);

    const [numberList, ...tableList] = input;

    const game = new BingoGame(numberList, tableList);

    // Solution (25023)
    expect(game.getWinnerScore()).toBe(25023);
  });

  test("Part 2", async () => {
    const [testNumberList, ...testTableList] = testInput;

    const testGame = new LastWinBingoGame(testNumberList, testTableList);

    // Test cases
    expect(testGame.getWinnerScore()).toBe(1924);

    const input = (await readInputFile("day-04-input")).split(/\n\n/gim);

    const [numberList, ...tableList] = input;

    const game = new LastWinBingoGame(numberList, tableList);

    // Solution (2634)
    expect(game.getWinnerScore()).toBe(2634);
  });
});
