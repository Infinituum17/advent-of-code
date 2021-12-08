import { getMaxPosition } from "./part-one";

export default function resolver(input: number[]) {
  const max = getMaxPosition(input);
  let bestFuelConsumption = Infinity;

  for (let i = 0; i < max; i++) {
    const fuelConsumption = input.reduce((acc, v) => {
      if (v > i) return (acc += getSumUntilPosition(v - i));
      else if (v < i) return (acc += getSumUntilPosition(i - v));
      else return acc;
    }, 0);

    if (fuelConsumption < bestFuelConsumption) {
      bestFuelConsumption = fuelConsumption;
    }
  }

  return bestFuelConsumption;
}

export function getSumUntilPosition(position: number) {
  let sum = 0;

  for (let i = 1; i <= position; i++) {
    sum += i;
  }

  return sum;
}
