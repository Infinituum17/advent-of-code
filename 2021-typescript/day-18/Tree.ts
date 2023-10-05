import { RawSnailfishNumber, TreeNode } from "./types";

export class Tree {
  public root: TreeNode;

  constructor(number: RawSnailfishNumber) {
    this.root = this.parseTree(number);
  }

  private parseTree(number: RawSnailfishNumber, parent: TreeNode | null = null): TreeNode {
    const node: TreeNode = { parent };
    const [left, right] = number;

    node.left = (typeof left === "number") ? left : this.parseTree(left, node);
    node.right = (typeof right === "number") ? right : this.parseTree(right, node);

    return node;
  }

  public mergeReduce(numbers: RawSnailfishNumber[]) {
    for (let i = 0; i < numbers.length; i++) {
      this.merge(numbers[i]);
      this.reduce();
    }
  }

  public reduce() {
    let [exploded, splitted] = [false, false];

    do {
      splitted = false;
      exploded = false;

      if (this.explode()) {
        exploded = true;
        continue;
      }

      if (this.split()) {
        splitted = true;
      }

    } while (exploded || splitted);
  }

  public split() {
    return Tree.splitTree(this.root);
  }

  private static splitTree(current: TreeNode): boolean {
    if (typeof current.left === "number") {
      if (current.left >= 10) {
        current.left = {
          left: Math.floor(current.left / 2),
          right: Math.ceil(current.left / 2),
          parent: current
        }

        return true;
      }
    } else if (Tree.splitTree(current.left!)) {
      return true;
    }


    if (typeof current.right === "number") {
      if (current.right >= 10) {
        current.right = {
          left: Math.floor(current.right / 2),
          right: Math.ceil(current.right / 2),
          parent: current
        }

        return true;
      }
    } else if (Tree.splitTree(current.right!)) {
      return true;
    }

    return false;
  }

  public explode() {
    const buffer = Tree.explode(this.root, 0);
    return buffer[0] !== -1 || buffer[1] !== -1;
  }

  private static explode(current: TreeNode, depth: number): [number, number] {
    const { left, right } = current;

    if (typeof left === "number" && typeof right === "number" && depth >= 4) {
      if (current.parent!.left === current) {
        current.parent!.left = 0;
      } else {
        current.parent!.right = 0;
      }

      return [left, right];
    }

    if (typeof left !== "number") {
      const buffer = Tree.explode(left!, depth + 1);

      if (buffer[0] !== -1 || buffer[1] !== -1) {
        if (typeof current.right === "number") {
          current.right += buffer[1];
          buffer[1] = 0;
        } else {
          if (Tree.sumLeftMost(current.right!, buffer[1])) {
            buffer[1] = 0;
          }
        }

        return buffer;
      }
    }

    if (typeof right !== "number") {
      const buffer = Tree.explode(right!, depth + 1);

      if (buffer[0] !== -1 || buffer[1] !== -1) {
        if (typeof current.left === "number") {
          current.left += buffer[0];
          buffer[0] = 0;
        } else {
          if (Tree.sumRightMost(current.left!, buffer[0])) {
            buffer[0] = 0;
          }
        }

        return buffer;
      }
    }

    return [-1, -1];
  }

  public static sumLeftMost(node: TreeNode, num: number): boolean {
    if (typeof node.left === "number") {
      node.left += num;
      return true;
    }

    if (Tree.sumLeftMost(node.left!, num)) {
      return true;
    }

    return false;
  }

  public static sumRightMost(node: TreeNode, num: number): boolean {
    if (typeof node.right === "number") {
      node.right += num;
      return true;
    }

    if (Tree.sumRightMost(node.right!, num)) {
      return true;
    }

    return false;
  }

  public merge(number: RawSnailfishNumber): void {
    this.mergeTree(new Tree(number));
  }

  private mergeTree(tree: Tree): void {
    const newRoot: TreeNode = { parent: null };

    this.root.parent = newRoot;
    tree.root.parent = newRoot;

    newRoot.left = this.root;
    newRoot.right = tree.root;

    this.root = newRoot;
  }

  public magnitude() {
    return Tree.calculateMagnitude(this.root);
  }

  private static calculateMagnitude(current: TreeNode): number {
    const left = (typeof current.left === "number") ? current.left : this.calculateMagnitude(current.left!);
    const right = (typeof current.right === "number") ? current.right : this.calculateMagnitude(current.right!);

    return 3 * left + 2 * right;
  }

  public toString() {
    return Tree.stringify(this.root);
  }

  private static stringify(current: TreeNode): string {
    const { left, right } = current;
    return `[${typeof left === "number" ? left : this.stringify(left!)}, ${typeof right === "number" ? right : this.stringify(right!)}]`;
  }
}