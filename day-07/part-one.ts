export default function resolver(input: number[]) {
  const max = getMaxPosition(input);
  let bestFuelConsumption = Infinity;

  for (let i = 0; i < max; i++) {
    const fuelConsumption = input.reduce((acc, v) => {
      if (v > i) return (acc += v - i);
      else if (v < i) return (acc += i - v);
      else return acc;
    }, 0);

    if (fuelConsumption < bestFuelConsumption) {
      bestFuelConsumption = fuelConsumption;
    }
  }

  return bestFuelConsumption;
}

export function getMaxPosition(positions: number[]) {
  return Math.max(...positions);
}
