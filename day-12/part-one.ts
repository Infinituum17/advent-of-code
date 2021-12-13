export function getCavePaths(input: string[]) {
  const graph = createGraph(input);
  const count = countPaths(graph);

  return count;
}

export function createGraph(lines: string[]) {
  const graph = new Map<string, string[]>();

  for (const line of lines) {
    const [from, to] = line.split(/\-/gim);

    const fromNode = graph.get(from) ?? [];
    if (!fromNode.includes(to)) {
      fromNode.push(to);
      graph.set(from, fromNode);
    }

    const toNode = graph.get(to) ?? [];
    if (!toNode.includes(from)) {
      toNode.push(from);
      graph.set(to, toNode);
    }
  }

  return graph;
}

export function countPaths(graph: Map<string, string[]>) {
  let count = 0;

  const createPath = (visited: string[]) => {
    const current = visited.at(-1)!;

    if (current === "end") {
      count++;
      return;
    }

    graph
      .get(current)!
      .filter((node) => node.toUpperCase() === node || !visited.includes(node))
      .forEach((node) => createPath([...visited, node]));
  };

  createPath(["start"]);

  return count;
}
