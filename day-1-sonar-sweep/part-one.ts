export default function resolver(input: string, debug = false): number {
  const depths = input.split(/\n/gim).map((num) => parseInt(num));
  const output: string[] = [];

  let increaseCount = 0;

  for (let i = 0; i < depths.length; i++) {
    if (i === 0) {
      if (debug) output.push(`${depths[i]} (N/A - no previous measurement)`);

      continue;
    }

    const previousValue = depths[i - 1];
    const currentValue = depths[i];

    if (previousValue < currentValue) {
      if (debug) output.push(`${depths[i]} (increased)`);

      increaseCount++;
    } else if (previousValue > currentValue) {
      if (debug) output.push(`${depths[i]} (decreased)`);
    } else {
      if (debug) output.push(`${depths[i]} (equal)`);
    }
  }

  if (debug) {
    console.log(output.join("\n"));
  }

  return increaseCount;
}
