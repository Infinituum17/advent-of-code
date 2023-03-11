import { DumboOctopus, Point } from "./interfaces";

export function simulateSteps(inputValues: string[], steps: number): number {
  const map = new OctopusMap(inputValues);

  for (let i = 0; i < steps; i++) {
    map.performStep();
  }

  return map.flashCount;
}

export class OctopusMap {
  private map: DumboOctopus[][];
  private flashes: number;

  constructor(values: string[]) {
    this.map = this.mapFromString(values);
    this.flashes = 0;
  }

  get flashCount() {
    return this.flashes;
  }

  get energyMap() {
    return this.map.map((line) => line.map((v) => v.energy));
  }

  protected mapFromString(values: string[]): DumboOctopus[][] {
    const map: DumboOctopus[][] = [];

    for (let i = 0; i < values.length; i++) {
      map.push([
        ...values[i].split("").map((stringNum) => ({
          energy: parseInt(stringNum),
          hasBlinked: false,
        })),
      ]);
    }

    return map;
  }

  protected incrementArea(point: Point) {
    const maxX = this.map.length;
    const maxY = this.map[0].length;
    const { x, y } = point;

    this.flashes += 1;

    // North elements
    if (x - 1 >= 0) {
      if (!this.map[x - 1][y].hasBlinked) {
        this.map[x - 1][y].energy += 1;
      }

      if (y - 1 >= 0) {
        if (!this.map[x - 1][y - 1].hasBlinked) {
          this.map[x - 1][y - 1].energy += 1;
        }
      }

      if (y + 1 < maxY) {
        if (!this.map[x - 1][y + 1].hasBlinked) {
          this.map[x - 1][y + 1].energy += 1;
        }
      }
    }

    // East and West elements
    if (y - 1 >= 0) {
      if (!this.map[x][y - 1].hasBlinked) {
        this.map[x][y - 1].energy += 1;
      }
    }

    if (y + 1 < maxY) {
      if (!this.map[x][y + 1].hasBlinked) {
        this.map[x][y + 1].energy += 1;
      }
    }

    // South elements
    if (x + 1 < maxX) {
      if (!this.map[x + 1][y].hasBlinked) {
        this.map[x + 1][y].energy += 1;
      }

      if (y - 1 >= 0) {
        if (!this.map[x + 1][y - 1].hasBlinked) {
          this.map[x + 1][y - 1].energy += 1;
        }
      }

      if (y + 1 < maxY) {
        if (!this.map[x + 1][y + 1].hasBlinked) {
          this.map[x + 1][y + 1].energy += 1;
        }
      }
    }

    this.setKnownZeros(point);
  }

  protected setKnownZeros(point: Point) {
    const { x, y } = point;

    this.map[x][y].energy = 0;
    this.map[x][y].hasBlinked = true;
  }

  public performStep() {
    // Incrementing...
    for (let i = 0; i < this.map.length; i++) {
      for (let j = 0; j < this.map[i].length; j++) {
        this.map[i][j].energy += 1;
      }
    }

    // Flashing...
    do {
      for (let i = 0; i < this.map.length; i++) {
        for (let j = 0; j < this.map[i].length; j++) {
          const currentEnergy = this.map[i][j].energy;

          if (currentEnergy <= 9) continue;

          this.incrementArea({ x: i, y: j });
        }
      }
    } while (this.map.flat().some((v) => v.energy > 9));

    this.map.map((line) =>
      line.map((v) => {
        v.hasBlinked = false;
        return v;
      })
    );
  }

  public toString() {
    return this.energyMap.toString();
  }
}
