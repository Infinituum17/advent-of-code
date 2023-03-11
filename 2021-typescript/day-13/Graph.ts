export default class Graph {
  private points: Point[];
  private foldingSteps: FoldingStep[];
  private xMax: number;
  private yMax: number;

  constructor(rawInput: string[]) {
    [this.points, this.foldingSteps] = this.parseRawInput(rawInput);

    this.xMax =
      this.points.reduce((max, point) => Math.max(max, point.x), 0) + 1;
    this.yMax =
      this.points.reduce((max, point) => Math.max(max, point.y), 0) + 1;
  }

  protected parseRawInput(rawInput: string[]): [Point[], FoldingStep[]] {
    const points: Point[] = [];
    const foldingSteps: FoldingStep[] = [];

    rawInput.forEach((line) => {
      if (line.includes(",")) {
        const [x, y] = line.split(",").map((v) => parseInt(v));
        points.push({ x, y });
      } else if (line.includes("fold along")) {
        const [axis, value] = line.split(/\s/gim)[2].split(/\=/gim);
        foldingSteps.push({ axis, value: parseInt(value) });
      }
    });

    return [points, foldingSteps.reverse()];
  }

  public toString() {
    let table = "";

    for (let y = 0; y < this.yMax; y++) {
      let newLine = "";
      for (let x = 0; x < this.xMax; x++) {
        let found = this.points.find((point) => point.x === x && point.y === y);

        newLine += `${found ? "#" : "."}`;
      }

      table += newLine;

      if (y + 1 < this.yMax) {
        table += "\n";
      }
    }

    return table;
  }

  public getPoints() {
    return this.points.length;
  }

  public foldAllGraph() {
    do {
      const { axis, value } = this.foldingSteps.pop()!;

      if (axis === "x") {
        this.verticalFold(value);
      } else {
        this.horizontalFold(value);
      }
    } while (this.foldingSteps.length > 0);
  }

  public foldGraph() {
    const { axis, value } = this.foldingSteps.pop()!;

    if (axis === "x") {
      this.verticalFold(value);
    } else {
      this.horizontalFold(value);
    }
  }

  protected verticalFold(value: number) {
    const outPoints = this.points.filter((point) => point.x > value);
    const newPointCollection = this.points.filter((point) => point.x < value);

    for (const point of outPoints) {
      const newPoint = { x: 2 * value - point.x, y: point.y };

      if (
        newPointCollection.find(
          (point) => point.x === newPoint.x && point.y === newPoint.y
        )
      ) {
        continue;
      }

      newPointCollection.push(newPoint);
    }

    this.points = newPointCollection;
    this.xMax = value;
  }

  protected horizontalFold(value: number) {
    const outPoints = this.points.filter((point) => point.y > value);
    const newPointCollection = this.points.filter((point) => point.y < value);

    for (const point of outPoints) {
      const newPoint = { x: point.x, y: 2 * value - point.y };

      if (
        newPointCollection.find(
          (point) => point.x === newPoint.x && point.y === newPoint.y
        )
      ) {
        continue;
      }

      newPointCollection.push(newPoint);
    }

    this.points = newPointCollection;
    this.yMax = value;
  }
}

type Point = { x: number; y: number };
type FoldingStep = { axis: string; value: number };
