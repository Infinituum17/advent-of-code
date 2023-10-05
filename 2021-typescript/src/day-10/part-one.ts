export function getFirstIllegalChar(line: string): ")" | "]" | "}" | ">" | "" {
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
          else return ")";
          break;
        case "]":
          if (uncompletedChunks[uncompletedChunks.length - 1] === line[i])
            uncompletedChunks.pop();
          else return "]";
          break;
        case "}":
          if (uncompletedChunks[uncompletedChunks.length - 1] === line[i])
            uncompletedChunks.pop();
          else return "}";
          break;
        case ">":
          if (uncompletedChunks[uncompletedChunks.length - 1] === line[i])
            uncompletedChunks.pop();
          else return ">";
          break;
      }
    }

    if (closingChar !== "") uncompletedChunks.push(closingChar);
  }

  return "";
}

export function getCorruptedScore(lines: string[]) {
  const lookupTable = { ")": 3, "]": 57, "}": 1197, ">": 25137 };
  let totalScore = 0;

  for (let i = 0; i < lines.length; i++) {
    const illegalChar = getFirstIllegalChar(lines[i]);

    if (illegalChar !== "") totalScore += lookupTable[illegalChar];
  }

  return totalScore;
}
