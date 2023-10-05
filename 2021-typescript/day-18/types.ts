export type RawSnailfishNumber = [number | RawSnailfishNumber, number | RawSnailfishNumber];

export interface TreeNode {
  left?: TreeNode | number,
  right?: TreeNode | number,
  parent?: TreeNode | null
}