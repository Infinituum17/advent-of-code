export default function resolver(input: string[]) {
  let sum = 0;

  for (const line of input) {
    let [signals, outputs] = line.split("|").map((v) =>
      v
        .split(/\s/gim)
        .filter((x) => x !== "")
        .map((vx) => vx.split("").sort())
    );

    const oneSegments = signals.find((signal) => signal.length === 2)?.flat()!; // 1
    const fourSegments = signals.find((signal) => signal.length === 4)?.flat()!; // 4
    const sevenSegments = signals
      .find((signal) => signal.length === 3)
      ?.flat()!; // 7
    const eightSegments = signals
      .find((signal) => signal.length === 7)
      ?.flat()!; // 8

    const middleTopLeftSegment = fourSegments?.filter(
      (segment) => !oneSegments?.includes(segment)
    );

    signals = signals
      .filter((v) => v.length !== 2)
      .filter((v) => v.length !== 4)
      .filter((v) => v.length !== 3)
      .filter((v) => v.length !== 7);

    const nineSegments = [
      ...new Set(
        signals
          .filter((signal) =>
            fourSegments?.every(
              (v) => signal.includes(v) && signal.length === 6
            )
          )
          .flat()
      ),
    ];

    signals = signals.filter(
      (signal) =>
        !fourSegments?.every((v) => signal.includes(v) && signal.length === 6)
    );

    const zeroThreeSegments = signals.filter((signal) =>
      oneSegments?.every((v) => signal.includes(v))
    );

    const threeSegments = [
      ...new Set(
        zeroThreeSegments.filter((signal) => signal.length === 5).flat()
      ),
    ];

    const topLeftSegment = middleTopLeftSegment?.find(
      (segment) => !threeSegments.includes(segment)
    )!;

    const zeroSegments = [
      ...new Set(
        zeroThreeSegments.filter((signal) => signal.length === 6).flat()
      ),
    ];

    signals = signals.filter(
      (signal) => !oneSegments?.every((v) => signal.includes(v))
    );

    let twoFiveSixSegments = signals.filter(
      (signal) => !oneSegments?.every((v) => signal.includes(v))
    );

    const sixSegments = [
      ...new Set(
        twoFiveSixSegments.filter((signal) => signal.length === 6).flat()
      ),
    ];

    const twoFiveSegments = twoFiveSixSegments.filter(
      (signal) => signal.length !== 6
    );

    const twoSegments = [
      ...new Set(
        twoFiveSegments.find((signal) => !signal.includes(topLeftSegment))
      ),
    ];

    const fiveSegments = [
      ...new Set(
        twoFiveSegments.find((signal) => signal.includes(topLeftSegment))
      ),
    ];

    const associations = new Map([
      [zeroSegments.join(""), "0"],
      [oneSegments.join(""), "1"],
      [twoSegments.join(""), "2"],
      [threeSegments.join(""), "3"],
      [fourSegments.join(""), "4"],
      [fiveSegments.join(""), "5"],
      [sixSegments.join(""), "6"],
      [sevenSegments.join(""), "7"],
      [eightSegments.join(""), "8"],
      [nineSegments.join(""), "9"],
    ]);

    sum += +outputs
      .map((output) => associations.get(output.sort().join("")))
      .join("");
  }

  return sum;
}
