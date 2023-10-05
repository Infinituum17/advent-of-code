import { OctopusMap } from "./part-one";

export function getAllOctopusesFlashStep(inputValues: string[]) {
  const map = new OctopusMap(inputValues);

  let counter = 0;

  do {
    map.performStep();

    counter++;
  } while (!map.energyMap.every((line) => line.every((v) => v === 0)));

  return counter;
}
