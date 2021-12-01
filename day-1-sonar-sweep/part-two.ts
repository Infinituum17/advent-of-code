export default function resolver(input: string, debug = false): number {
  const depths = input.split(/\n/gim).map((num) => parseInt(num));
  const values: number[] = [];
  const output: string[] = [];

  let increaseCount = 0;

  for (let i = 1; i + 1 < depths.length; i++) {
    const previousValue = depths[i - 1];
    const currentValue = depths[i];
    const nextValue = depths[i + 1];

    const sum = previousValue + currentValue + nextValue;

    if (i === 1) {
      if (debug) output.push(`${sum} (N/A - no previous sum)`);

      values.push(sum);

      continue;
    }

    if (values[values.length - 1] < sum) {
      if (debug) output.push(`${sum} (increased)`);

      increaseCount++;
    } else if (values[values.length - 1] > sum) {
      if (debug) output.push(`${sum} (decreased)`);
    } else {
      if (debug) output.push(`${sum} (equal)`);
    }

    values.push(sum);
  }

  if (debug) {
    console.log(output.join("\n"));
  }

  return increaseCount;
}
