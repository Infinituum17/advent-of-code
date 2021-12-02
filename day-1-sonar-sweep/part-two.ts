export default function resolver(depths: number[]): number {
  const values: number[] = [];
  const output: string[] = [];

  let increaseCount = 0;

  for (let i = 1; i + 1 < depths.length; i++) {
    const previousValue = depths[i - 1];
    const currentValue = depths[i];
    const nextValue = depths[i + 1];

    const sum = previousValue + currentValue + nextValue;

    if (i === 1) {
      values.push(sum);

      continue;
    } else if (values[values.length - 1] < sum) {
      increaseCount++;
    }

    values.push(sum);
  }

  return increaseCount;
}
