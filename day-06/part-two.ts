export default function resolver(fishes: number[], daysToSimulate: number) {
  const fishGroups: fishGroup[] = [];

  for (let i = 0; i <= 8; i++) {
    fishGroups.push({ days: i, count: 0 });
  }

  for (let i = 0; i < fishes.length; i++) {
    fishGroups[fishes[i]].count++;
  }

  for (let i = 0; i < daysToSimulate; i++) {
    let countZero = 0;

    for (let j = 0; j < fishGroups.length; j++) {
      if (j === 0) countZero = fishGroups[j].count;

      if (j !== 8) fishGroups[j].count = fishGroups[j + 1].count;

      if (j === 7) fishGroups[8].count = 0;
    }

    if (countZero > 0) {
      fishGroups[8].count += countZero;
      fishGroups[6].count += countZero;
    }
  }

  return fishGroups.map((v) => v.count).reduce((acc, v) => acc + v);
}

type fishGroup = { days: number; count: number };
