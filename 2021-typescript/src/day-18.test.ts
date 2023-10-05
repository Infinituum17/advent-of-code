import { Tree } from "../day-18/Tree";
import { inputSnailfishNumbers } from "../day-18/input";
import { RawSnailfishNumber, TreeNode } from "../day-18/types";


describe("Day 18: Snailfish", () => {
  test("Part 1: Tree merge", () => {
    const tree = new Tree([1, 2]);

    expect(tree.root.parent).toBe(null);
    expect(tree.root.left).toBe(1);
    expect(tree.root.right).toBe(2);

    tree.merge([3, 4]);

    expect(tree.root.parent).toBe(null);
    expect((tree.root.left as TreeNode).left).toBe(1);
    expect((tree.root.left as TreeNode).right).toBe(2);
    expect((tree.root.right as TreeNode).left).toBe(3);
    expect((tree.root.right as TreeNode).right).toBe(4);
  });

  test("Part 1: Number splitting", () => {
    let tree = new Tree([0, 0]);

    expect(tree.split()).toBeFalsy();
    expect(tree.toString()).toEqual("[0, 0]");

    tree = new Tree([10, 0]);

    expect(tree.split()).toBeTruthy();
    expect(tree.toString()).toEqual("[[5, 5], 0]");

    tree = new Tree([[13, 0], [12, 0]]);

    expect(tree.split()).toBeTruthy();
    expect(tree.toString()).toEqual("[[[6, 7], 0], [12, 0]]");

    expect(tree.split()).toBeTruthy();
    expect(tree.toString()).toEqual("[[[6, 7], 0], [[6, 6], 0]]");

    tree = new Tree([24, 0]);

    while (tree.split()) { }

    expect(tree.toString()).toEqual("[[[6, 6], [6, 6]], 0]");

    tree = new Tree([24, 25]);

    while (tree.split()) { }

    expect(tree.toString()).toEqual("[[[6, 6], [6, 6]], [[6, 6], [6, 7]]]");

    tree = new Tree([[[[0, 7], 4], [15, [0, 13]]], [1, 1]]);

    tree.split();
    expect(tree.toString()).toEqual("[[[[0, 7], 4], [[7, 8], [0, 13]]], [1, 1]]");

    tree.split();
    expect(tree.toString()).toEqual("[[[[0, 7], 4], [[7, 8], [0, [6, 7]]]], [1, 1]]");
  });

  test("Part 1: sumRightMost", () => {
    let tree = new Tree([[[10, 0], 0], 0]);

    expect(Tree.sumRightMost(tree.root, 12)).toBeTruthy();
    expect(tree.toString()).toEqual("[[[10, 0], 0], 12]")

    tree = new Tree([0, [0, [0, 10]]]);

    expect(Tree.sumRightMost(tree.root, 9)).toBeTruthy();
    expect(tree.toString()).toEqual("[0, [0, [0, 19]]]")

    tree = new Tree([[0, [0, 10]], 0]);

    expect(Tree.sumRightMost(tree.root, 15)).toBeTruthy();
    expect(tree.toString()).toEqual("[[0, [0, 10]], 15]")
  });

  test("Part 1: sumLeftMost", () => {
    let tree = new Tree([[[10, 0], 0], 0]);

    expect(Tree.sumLeftMost(tree.root, 12)).toBeTruthy();
    expect(tree.toString()).toEqual("[[[22, 0], 0], 0]")

    tree = new Tree([[0, [0, 10]], 0]);

    expect(Tree.sumRightMost(tree.root, 15)).toBeTruthy();
    expect(tree.toString()).toEqual("[[0, [0, 10]], 15]")
  });

  test("Part 1: Number explosion", () => {
    const inputs: RawSnailfishNumber[] = [
      [[[[[9, 8], 1], 2], 3], 4],
      [7, [6, [5, [4, [3, 2]]]]],
      [[6, [5, [4, [3, 2]]]], 1],
      [[3, [2, [1, [7, 3]]]], [6, [5, [4, [3, 2]]]]],
      [[3, [2, [8, 0]]], [9, [5, [4, [3, 2]]]]]
    ];

    const outputs: string[] = [
      "[[[[0, 9], 2], 3], 4]",
      "[7, [6, [5, [7, 0]]]]",
      "[[6, [5, [7, 0]]], 3]",
      "[[3, [2, [8, 0]]], [9, [5, [4, [3, 2]]]]]",
      "[[3, [2, [8, 0]]], [9, [5, [7, 0]]]]"
    ]

    for (let i = 0; i < inputs.length; i++) {
      const current = new Tree(inputs[i]);

      current.explode();
      expect(current.toString()).toEqual(outputs[i]);
    }
  });


  test("Part 1: Number magnitude", () => {
    const inputs: RawSnailfishNumber[] = [
      [[1, 2], [[3, 4], 5]],
      [[[[0, 7], 4], [[7, 8], [6, 0]]], [8, 1]],
      [[[[1, 1], [2, 2]], [3, 3]], [4, 4]],
      [[[[3, 0], [5, 3]], [4, 4]], [5, 5]],
      [[[[5, 0], [7, 4]], [5, 5]], [6, 6]],
      [[[[8, 7], [7, 7]], [[8, 6], [7, 7]]], [[[0, 7], [6, 6]], [8, 7]]],
    ]

    const outputs = [143, 1384, 445, 791, 1137, 3488];

    for (let i = 0; i < inputs.length; i++) {
      const tree = new Tree(inputs[i]);

      expect(tree.magnitude()).toEqual(outputs[i]);
    }
  });

  test("Part 1: Reduce steps", () => {
    const tree = new Tree([[[[4, 3], 4], 4], [7, [[8, 4], 9]]]);

    tree.merge([1, 1]);

    expect(tree.toString()).toEqual("[[[[[4, 3], 4], 4], [7, [[8, 4], 9]]], [1, 1]]");

    tree.explode();
    expect(tree.toString()).toEqual("[[[[0, 7], 4], [7, [[8, 4], 9]]], [1, 1]]");

    tree.explode();
    expect(tree.toString()).toEqual("[[[[0, 7], 4], [15, [0, 13]]], [1, 1]]");

    tree.split();
    expect(tree.toString()).toEqual("[[[[0, 7], 4], [[7, 8], [0, 13]]], [1, 1]]");

    tree.split();
    expect(tree.toString()).toEqual("[[[[0, 7], 4], [[7, 8], [0, [6, 7]]]], [1, 1]]");

    tree.explode();
    expect(tree.toString()).toEqual("[[[[0, 7], 4], [[7, 8], [6, 0]]], [8, 1]]");
  });

  test("Part 1: Reduce", () => {
    let tree = new Tree([[[[4, 3], 4], 4], [7, [[8, 4], 9]]]);

    tree.mergeReduce([[1, 1]]);

    expect(tree.toString()).toEqual("[[[[0, 7], 4], [[7, 8], [6, 0]]], [8, 1]]");


    tree = new Tree([1, 1]);

    tree.mergeReduce([
      [2, 2],
      [3, 3],
      [4, 4],
      [5, 5]
    ]);

    expect(tree.toString()).toEqual("[[[[3, 0], [5, 3]], [4, 4]], [5, 5]]");


    tree = new Tree([1, 1]);

    tree.mergeReduce([
      [2, 2],
      [3, 3],
      [4, 4],
      [5, 5],
      [6, 6]
    ]);

    expect(tree.toString()).toEqual("[[[[5, 0], [7, 4]], [5, 5]], [6, 6]]");

    tree = new Tree([[[0, [4, 5]], [0, 0]], [[[4, 5], [2, 6]], [9, 5]]]);

    tree.mergeReduce([[7, [[[3, 7], [4, 3]], [[6, 3], [8, 8]]]]]);

    expect(tree.toString()).toEqual("[[[[4, 0], [5, 4]], [[7, 7], [6, 0]]], [[8, [7, 7]], [[7, 9], [5, 0]]]]");
  });

  test("Part 1", () => {
    const tree = new Tree(inputSnailfishNumbers[0]);

    for (let i = 1; i < inputSnailfishNumbers.length; i++) {
      tree.reduce();
      tree.merge(inputSnailfishNumbers[i]);
    }

    tree.reduce();

    expect(tree.magnitude()).toEqual(3524);
  });

  test("Part 2", () => {
    let maxMagnitude = 0;

    for (let i = 0; i < inputSnailfishNumbers.length; i++) {
      for (let j = 0; j < inputSnailfishNumbers.length; j++) {
        if (i !== j) {
          const tree = new Tree(inputSnailfishNumbers[i]);
          tree.mergeReduce([inputSnailfishNumbers[j]]);
          const mag = tree.magnitude();

          if (mag > maxMagnitude) {
            maxMagnitude = tree.magnitude();
          }
        }
      }
    }

    expect(maxMagnitude).toEqual(4656);
  });
});