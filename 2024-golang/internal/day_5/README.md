# Small solution guide

## Part 1

Analyze a small list of numbers to determine if all the rules are respected.

### Solution

Build a map containing all the rules and use it to check every element of a list until you find one that breaks any rule: in that case simply discard the list.
Next you only need to sum up all the middle-values contained in the remaining lists.

## Part 2

Reorder an incorrect sequence of number so that it respects all the provided rules.

### Solution

Create a list that associates every value in the list we're trying to order to its rule-set children (Node).

Use [Topological Sorting](https://en.wikipedia.org/wiki/Topological_sorting) to find out which Nodes are not dependent on any other Node:
remove the node from the original list, and then append its value to another list that will be returned at the end of the function.