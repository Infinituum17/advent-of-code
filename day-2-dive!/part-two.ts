export default function resolver(input: string[]): number {
  let aim = 0;
  let depth = 0;
  let position = 0;

  input.forEach((line) => {
    const value = parseInt(line.split(/\s/gi)[1]);

    if (line.startsWith("forward")) {
      position += value;
      depth += aim * value;
    } else if (line.startsWith("down")) {
      aim += value;
    } else if (line.startsWith("up")) {
      aim -= value;
    }
  });

  return position * depth;
}
