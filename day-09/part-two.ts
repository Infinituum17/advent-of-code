import { checkNearbyPointsForLower, pointObjectType } from "./part-one";

export function getBasins(
  heightMap: number[][],
  lowPoints: pointObjectType[]
): number[] {
  const basins: number[] = [];

  lowPoints.forEach((lowPoint) => {
    basins.push(
      getNearbyPoints(heightMap, { x: lowPoint.x, y: lowPoint.y }, []).length
    );
  });

  return basins;
}

type pointType = { x: number; y: number };

export function getNearbyPoints(
  heightMap: number[][],
  point: pointType,
  verifiedPoints: pointType[]
): pointType[] {
  const minI = 0;
  const minJ = 0;
  const maxI = heightMap.length - 1;
  const maxJ = heightMap[0].length - 1;

  const x = point.x;
  const y = point.y;

  let newPosition = 0;

  newPosition = x - 1;
  if (
    newPosition >= minI &&
    heightMap[newPosition][y] !== 9 &&
    !verifiedPoints.some((vPoint) => vPoint.x === newPosition && vPoint.y === y)
  ) {
    const newValidPoint = { x: newPosition, y };
    verifiedPoints.push(newValidPoint);
    getNearbyPoints(heightMap, newValidPoint, verifiedPoints);
  }

  newPosition = x + 1;
  if (
    newPosition <= maxI &&
    heightMap[newPosition][y] !== 9 &&
    !verifiedPoints.some((vPoint) => vPoint.x === newPosition && vPoint.y === y)
  ) {
    const newValidPoint = { x: newPosition, y };
    verifiedPoints.push(newValidPoint);
    getNearbyPoints(heightMap, newValidPoint, verifiedPoints);
  }

  newPosition = y - 1;
  if (
    newPosition >= minJ &&
    heightMap[x][newPosition] !== 9 &&
    !verifiedPoints.some((vPoint) => vPoint.y === newPosition && vPoint.x === x)
  ) {
    const newValidPoint = { x, y: newPosition };
    verifiedPoints.push(newValidPoint);
    getNearbyPoints(heightMap, newValidPoint, verifiedPoints);
  }

  newPosition = y + 1;
  if (
    newPosition <= maxJ &&
    heightMap[x][newPosition] !== 9 &&
    !verifiedPoints.some((vPoint) => vPoint.y === newPosition && vPoint.x === x)
  ) {
    const newValidPoint = { x, y: newPosition };
    verifiedPoints.push(newValidPoint);
    getNearbyPoints(heightMap, newValidPoint, verifiedPoints);
  }

  return verifiedPoints;
}

export function getThreeLargestBasinsMultiplied(basins: number[]): number {
  return basins
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, v) => acc * v, 1);
}
