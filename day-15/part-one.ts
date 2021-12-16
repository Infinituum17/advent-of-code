export function parseRisks(graph: string[]): number[][] {
  const newGraph: number[][] = [];

  for (let i = 0; i < graph.length; i++) {
    newGraph.push([]);
    for (let j = 0; j < graph[i].length; j++) {
      newGraph[i][j] = parseInt(graph[i][j]);
    }
  }

  return newGraph;
}

export function getTotalRisk(graph: number[][], shortestPath: Vertex[]) {
  let sum = 0;

  for (const vertex of shortestPath) {
    sum += graph[vertex.x][vertex.y];
  }

  return sum - graph[0][0];
}

export function dijkstraShortestPath(graph: number[][], src: number) {
  const dist: number[][] = [];
  const prev: (Vertex | null)[][] = [];
  const Q: (number | null)[][] = [];

  for (let x = 0; x < graph.length; x++) {
    dist.push([]);
    prev.push([]);
    Q.push([]);
    for (let y = 0; y < graph[x].length; y++) {
      dist[x][y] = Infinity;
      prev[x][y] = null;
      Q[x][y] = graph[x][y];
    }
  }

  dist[src][src] = 0;

  while (!isAllNull(Q)) {
    let u: Vertex = getMinDistanceVertex(dist, Q);

    Q[u.x][u.y] = null;

    if (u.x === Q.length - 1 && u.y === Q.length - 1) {
      const S: Vertex[] = [];

      if (prev[u.x][u.y] || (u.x === src && u.y === src)) {
        while (u !== null) {
          S.unshift(u);
          u = prev[u.x][u.y]!;
        }

        return getTotalRisk(graph, S);
      }
    }

    const neighbours = getNeighbours(u, Q);

    for (const v of neighbours) {
      const alt = dist[u.x][u.y] + graph[v.x][v.y];
      if (alt < dist[v.x][v.y]) {
        dist[v.x][v.y] = alt;
        prev[v.x][v.y] = u;
      }
    }
  }
}

export function isAllNull(Q: (number | null)[][]) {
  for (let i = 0; i < Q.length; i++) {
    for (let j = 0; j < Q[i].length; j++) {
      if (Q[i][j] !== null) return false;
    }
  }

  return true;
}

export function getMinDistanceVertex(dist: number[][], Q: (number | null)[][]) {
  let min: { x: number; y: number; value: number } = {
    x: 0,
    y: 0,
    value: Infinity,
  };

  for (let i = 0; i < dist.length; i++) {
    for (let j = 0; j < dist[i].length; j++) {
      if (dist[i][j] < min.value && Q[i][j] !== null) {
        min.x = i;
        min.y = j;
        min.value = dist[i][j];
      }
    }
  }

  return { x: min.x, y: min.y };
}

export function getNeighbours(u: Vertex, Q: (number | null)[][]) {
  const neighbours: Vertex[] = [];

  if (u.x > 0) {
    if (Q[u.x - 1][u.y]) {
      neighbours.push({ x: u.x - 1, y: u.y });
    }
  }

  if (u.x < Q.length - 1) {
    if (Q[u.x + 1][u.y]) {
      neighbours.push({ x: u.x + 1, y: u.y });
    }
  }

  if (u.y > 0) {
    if (Q[u.x][u.y - 1]) {
      neighbours.push({ x: u.x, y: u.y - 1 });
    }
  }

  if (u.y < Q.length - 1) {
    if (Q[u.x][u.y + 1]) {
      neighbours.push({ x: u.x, y: u.y + 1 });
    }
  }

  return neighbours;
}

type Vertex = { x: number; y: number };
