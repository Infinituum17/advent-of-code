export function parseHeightMap(text: string): number[][] {
  const lines = text.split(/\n/gim);
  const heightMap: number[][] = [];

  for (let i = 0; i < lines.length; i++) {
    heightMap.push([]);
    for (let j = 0; j < lines[i].length; j++) {
      heightMap[i].push(parseInt(lines[i][j]));
    }
  }

  return heightMap;
}

export function checkNearbyPointsForLower(
  heightMap: number[][],
  i: number,
  j: number
): boolean {
  const minI = 0;
  const minJ = 0;
  const maxI = heightMap.length - 1;
  const maxJ = heightMap[0].length - 1;

  const previousI = i - 1 >= minI ? heightMap[i - 1][j] : null;
  const nextI = i + 1 <= maxI ? heightMap[i + 1][j] : null;
  const previousJ = j - 1 >= minJ ? heightMap[i][j - 1] : null;
  const nextJ = j + 1 <= maxJ ? heightMap[i][j + 1] : null;

  /* console.log(
    `previousI: ${previousI}\nnextI: ${nextI}\npreviousJ: ${previousJ}\nnextJ: ${nextJ}`
  ); */

  let lowest = true;

  if (
    (previousI !== null && previousI <= heightMap[i][j]) ||
    (nextI !== null && nextI <= heightMap[i][j]) ||
    (previousJ !== null && previousJ <= heightMap[i][j]) ||
    (nextJ !== null && nextJ <= heightMap[i][j])
  )
    lowest = false;

  /*   console.log(
    `previousI: ${previousI !== null && previousI < heightMap[i][j]}\nnextI: ${
      nextI !== null && nextI < heightMap[i][j]
    }\npreviousJ: ${
      previousJ !== null && previousJ < heightMap[i][j]
    }\nnextJ: ${nextJ !== null && nextJ < heightMap[i][j]}`
  ); */

  return lowest;
}

type pointObjectType = { depth: number; x: number; y: number };

export function getLowPoints(heightMap: number[][]): pointObjectType[] {
  const lowPoints: pointObjectType[] = [];

  for (let i = 0; i < heightMap.length; i++) {
    for (let j = 0; j < heightMap[i].length; j++) {
      if (
        checkNearbyPointsForLower(heightMap, i, j) &&
        !lowPoints.some((lowPoint) => lowPoint.x === i && lowPoint.y === j)
      ) {
        lowPoints.push({ depth: heightMap[i][j], x: i, y: j });
      }
    }
  }

  return lowPoints;
}

export function getSumRiskLevels(lowPoints: pointObjectType[]): number {
  let sum = 0;

  for (const lowPoint of lowPoints) {
    sum += lowPoint.depth + 1;
  }

  return sum;
}
