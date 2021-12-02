export default function resolver(input: string[]): number {
  return horizontalCalculator(input) * depthCalculator(input);
}

export function horizontalCalculator(input: string[]): number {
  let position = 0;

  input.forEach((line) => {
    if (line.startsWith("forward")) {
      position += parseInt(line.split(/\s/gi)[1]);
    }
  });

  return position;
}

export function depthCalculator(input: string[]): number {
  let depth = 0;

  input.forEach((line) => {
    const value = parseInt(line.split(/\s/gi)[1]);

    if (line.startsWith("down")) {
      depth += value;
    } else if (line.startsWith("up")) {
      depth -= value;
    }
  });

  return depth;
}
