export function getLastCompletion(line: string): string[] {
  let uncompletedChunks: string[] = [];

  for (let i = 0; i < line.length; i++) {
    let closingChar = "";

    if (line[i] === "(") {
      closingChar = ")";
    } else if (line[i] === "[") {
      closingChar = "]";
    } else if (line[i] === "{") {
      closingChar = "}";
    } else if (line[i] === "<") {
      closingChar = ">";
    } else {
      switch (line[i]) {
        case ")":
          if (uncompletedChunks[uncompletedChunks.length - 1] === line[i])
            uncompletedChunks.pop();
          else return [];
          break;
        case "]":
          if (uncompletedChunks[uncompletedChunks.length - 1] === line[i])
            uncompletedChunks.pop();
          else return [];
          break;
        case "}":
          if (uncompletedChunks[uncompletedChunks.length - 1] === line[i])
            uncompletedChunks.pop();
          else return [];
          break;
        case ">":
          if (uncompletedChunks[uncompletedChunks.length - 1] === line[i])
            uncompletedChunks.pop();
          else return [];
          break;
      }
    }

    if (closingChar !== "") uncompletedChunks.push(closingChar);
  }

  return uncompletedChunks.reverse();
}

export function getUncompleteScore(lines: string[]) {
  const lookupTable = { ")": 1, "]": 2, "}": 3, ">": 4 };
  let scoreList: number[] = [];

  for (let i = 0; i < lines.length; i++) {
    const lastCompletion = getLastCompletion(lines[i]);

    if (lastCompletion.length === 0) continue;

    let totalScore = 0;

    for (let j = 0; j < lastCompletion.length; j++) {
      const currentChar = lastCompletion[j];
      totalScore *= 5;

      if (
        currentChar === ")" ||
        currentChar === "]" ||
        currentChar === "}" ||
        currentChar === ">"
      )
        totalScore += lookupTable[currentChar];
    }

    scoreList.push(totalScore);
  }

  scoreList = scoreList.sort((a, b) => b - a);

  return scoreList[(scoreList.length - 1) / 2];
}
