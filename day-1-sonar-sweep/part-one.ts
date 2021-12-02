export default function resolver(depths: number[]): number {
  const output: string[] = [];

  let increaseCount = 0;

  for (let i = 0; i < depths.length; i++) {
    if (i === 0) {
      continue;
    }

    const previousValue = depths[i - 1];
    const currentValue = depths[i];

    if (previousValue < currentValue) {
      increaseCount++;
    }
  }

  return increaseCount;
}
