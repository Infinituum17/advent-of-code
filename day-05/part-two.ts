export default function resolver(input: string[]) {
  const tableSize = 1000;
  let table: lineObject[][] = [];

  for (let i = 0; i < tableSize; i++) {
    table[i] = [];

    for (let j = 0; j < tableSize; j++) {
      table[i][j] = { lines: 0 };
    }
  }

  for (let i = 0; i < input.length; i++) {
    const coordsPair = parseCoordsPair(input[i]);

    if (coordsPair.length > 0) {
      coordsPair.forEach((coords) => {
        table[coords.x][coords.y].lines += 1;
      });
    }
  }

  // displayTable(table);

  return countOverlaps(table);
}

export function countOverlaps(table: lineObject[][]) {
  let count = 0;

  table.forEach((array) => {
    array.forEach((v) => {
      if (v.lines > 1) count++;
    });
  });

  return count;
}

export function parseCoordsPair(input: string) {
  const parsedCoords = input
    .split(/\s\-\>/gim)
    .map((v) => v.split(","))
    .map((v) => ({
      x: parseInt(v[0]),
      y: parseInt(v[1]),
    }));

  return getFullLine(parsedCoords);
}

export function getFullLine(input: lineEndObject[]) {
  const fullLine: lineEndObject[] = [];

  const xAbs = Math.abs(input[0].x - input[1].x);
  const yAbs = Math.abs(input[0].y - input[1].y);

  if (xAbs === yAbs) {
    let { x: x1, y: y1 } = input[0];
    const { x: x2, y: y2 } = input[1];

    fullLine.push({ x: x1, y: y1 });

    do {
      if (x1 > x2) {
        x1--;
      } else if (x1 < x2) {
        x1++;
      }

      if (y1 > y2) {
        y1--;
      } else if (y1 < y2) {
        y1++;
      }

      fullLine.push({ x: x1, y: y1 });
    } while (x1 !== x2 && y1 !== y2);
  } else if (input[0].x === input[1].x) {
    if (input[0].y > input[1].y) {
      input = input.reverse();
    }
  } else if (input[0].y === input[1].y) {
    if (input[0].x > input[1].x) {
      input = input.reverse();
    }
  }

  if (input[0].x === input[1].x) {
    for (let i = input[0].y; i <= input[1].y; i++) {
      fullLine.push({ x: input[0].x, y: i });
    }
  } else if (input[0].y === input[1].y) {
    for (let i = input[0].x; i <= input[1].x; i++) {
      fullLine.push({ x: i, y: input[0].y });
    }
  }

  return fullLine;
}

function displayTable(table: lineObject[][]) {
  let stringBuffer = "";

  for (let i = 0; i < table.length; i++) {
    for (let j = 0; j < table.length; j++) {
      stringBuffer += table[j][i].lines === 0 ? "." : table[j][i].lines;
    }

    stringBuffer += "\n";
  }

  console.log(stringBuffer);
}

type lineObject = { lines: number };
type lineEndObject = { x: number; y: number };
