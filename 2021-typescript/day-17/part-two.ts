export type Bound = [number, number];
type Coord = [number, number];
type Velocity = [number, number];

export function getReachedTargetCount(xBounds: Bound, yBounds: Bound): number {
  let vx = 0;
  let velocities: Velocity[] = [];

  while (vx <= xBounds[1]) {
    let vy = -yBounds[0];

    while (vy >= yBounds[0]) {
      const initialVelocity: Velocity = [vx, vy];
      let coord: Coord = [0, 0];
      let velocity: Velocity = [vx, vy];
      let currentBestY = -Infinity;

      while (!isGonePast(coord, velocity, xBounds, yBounds)) {
        [coord, velocity] = nextStep(coord, velocity);

        currentBestY = Math.max(coord[1], currentBestY);

        if (isCoordInRange(coord, xBounds, yBounds)) {
          velocities.push(initialVelocity);
        }
      }

      vy--;
    }

    vx++;
  }

  return new Set(velocities).size
}

function isGonePast(coord: Coord, velocity: Velocity, xBounds: Bound, yBounds: Bound) {
  if (coord[0] < xBounds[0] && velocity[0] <= 0) return true;
  if (coord[0] > xBounds[1] && velocity[0] >= 0) return true;
  if (coord[1] < yBounds[0] && velocity[1] <= 0) return true;

  return false;
}

function nextStep(coord: Coord, velocity: Velocity): [Coord, Velocity] {
  coord[0] += velocity[0];
  coord[1] += velocity[1];

  if (velocity[0] > 0) {
    velocity[0] -= 1;
  }

  velocity[1] -= 1;

  return [coord, velocity]
}

export function getFinalXPosition(vx: number): number {
  return (vx * (vx + 1)) / 2; // Triangular numbers
}

export function isCoordInRange(coord: Coord, xBounds: Bound, yBounds: Bound): boolean {
  return isInRange(coord[0], xBounds) && isInRange(coord[1], yBounds);
}

export function isInRange(c: number, bounds: Bound): boolean {
  return bounds[0] <= c && c <= bounds[1];
}