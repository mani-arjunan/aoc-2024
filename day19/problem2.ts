import fs from "fs/promises";

const loadInput = async (filePath: string) => {
  return await fs.readFile(filePath, "utf-8");
};

const inputToArr = (input: string) => {
  const availableTowels: string[] = [];
  const inputs: string[] = [];
  let temp = "";

  for (let i = 0; i < input.length; i++) {
    let tempI = i;
    if (availableTowels.length === 0) {
      while (input[tempI] !== "\n") {
        if (input[tempI] === ",") {
          availableTowels.push(temp);
          temp = "";
        } else {
          if (input[tempI] !== " ") {
            temp += input[tempI];
          }
        }
        tempI++;
      }
      availableTowels.push(temp);
      temp = "";
      i = tempI;
    } else {
      while (input[tempI] !== "\n") {
        temp += input[tempI];
        tempI++;
      }
      if (temp.length > 0) {
        inputs.push(temp);
        temp = "";
      }
      i = tempI;
    }
  }

  return [availableTowels, inputs];
};

const cache: Record<string, number> = {};

const possiblePatterns = (towels: Array<string>, pattern: string): number => {
  let sum = 0;
  if (cache[pattern] !== undefined) {
    return cache[pattern];
  }

  if (pattern.length === 0) {
    return 1;
  }

  for (let i = 0; i < towels.length; i++) {
    let temp = true;

    for (let j = 0; j < towels[i].length; j++) {
      if (towels[i][j] !== pattern[j]) {
        temp = false;
      }
    }

    if (temp) {
      const newPattern = pattern.substr(towels[i].length);

      sum += possiblePatterns(towels, newPattern);
    }
  }

  cache[pattern] = sum;
  return sum;
};

const process = (towels: Array<string>, pattern: Array<string>) => {
  let sum = BigInt(0);
  for (let i = 0; i < pattern.length; i++) {
    const t = possiblePatterns(towels, pattern[i]);

    sum += BigInt(t);
  }
  console.log(sum, cache);
};

loadInput("./sample.txt").then((input) => {
  const [towels, patterns] = inputToArr(input.toString());
  process(towels, patterns);
});
