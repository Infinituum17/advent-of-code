export default function resolver(input: number[], daysToSimulate: number) {
  for (let i = 0; i < input.length; i++) {
    LanternFish.fishGenerator(input[i]);
  }

  for (let i = 0; i < daysToSimulate; i++) {
    LanternFish.cycleOneDay();
  }

  const count = LanternFish.getLanternFishesCount();

  LanternFish.clearLanternFishesList();

  return count;
}

export class LanternFish {
  private static schoolOfFishes: LanternFish[] = [];
  private days: number;

  constructor(days: number) {
    this.days = days;
  }

  public static fishGenerator(days: number) {
    LanternFish.schoolOfFishes.push(new LanternFish(days));
  }

  public localDayCycle() {
    if (this.days - 1 >= 0) {
      this.days -= 1;
    } else {
      this.days = 6;
      LanternFish.schoolOfFishes.push(new LanternFish(8));
    }
  }

  public static cycleOneDay() {
    LanternFish.schoolOfFishes.forEach((fish) => {
      fish.localDayCycle();
    });
  }

  public static getLanternFishesCount() {
    return LanternFish.schoolOfFishes.length;
  }

  public static clearLanternFishesList() {
    LanternFish.schoolOfFishes = [];
  }
}
