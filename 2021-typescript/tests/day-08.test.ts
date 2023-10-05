import { readLines } from "../src/utils";

import resolver1 from "../src/day-08/part-one";
import resolver2 from "../src/day-08/part-two";

const testInput =
  "be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe\nedbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc\nfgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg\nfbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb\naecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea\nfgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb\ndbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe\nbdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef\negadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb\ngcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce".split(
    /\n/gim
  );

const testInputReduced =
  "acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf".split(
    /\n/gim
  );

describe("Day 8: Seven Segment Search", () => {
  test("Part 1", async () => {
    // Test cases
    expect(resolver1(testInput)).toBe(26);

    const input = await readLines("./data/day-08-input.txt");

    // Solution (318)
    expect(resolver1(input)).toBe(318);
  });

  test("Part 2", async () => {
    // Test cases
    expect(resolver2(testInputReduced)).toBe(5353);
    expect(resolver2(testInput)).toBe(61229);

    const input = await readLines("./data/day-08-input.txt");

    // Solution (996280)
    expect(resolver2(input)).toBe(996280);
  });
});
