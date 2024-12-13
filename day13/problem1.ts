const fs = require("fs/promises");

const loadInput = async (input: string) => {
  return await fs.readFile(input, "utf-8");
};

const inputToArr = (input: string) => {
  const resultArr: Array<Array<number>> = [];
  let temp: Array<number> = [];

  for (let i = 0; i < input.length; i++) {
    if (input[i] === "\n") {
      if (temp.length === 6) {
        resultArr.push(temp);
        temp = [];
      }
    } else {
      if (input[i] === "+" || input[i] === "=") {
        let tempI = i + 1;
        let tempStr = "";
        while (!isNaN(input[tempI] as unknown as number)) {
          tempStr += input[tempI];
          tempI++;
        }
        temp.push(+tempStr as unknown as number);
        i = tempI - 2;
      }
    }
  }

  return resultArr;
};

const getResults = (inputArr: Array<Array<number>>, part2: boolean) => {
  const t = 10000000000000;
  let result = 0;
  for (let i = 0; i < inputArr.length; i++) {
    const eq1 = [
      inputArr[i][0],
      inputArr[i][2],
      (part2 ? t : 0) + inputArr[i][4],
    ];
    const eq2 = [
      inputArr[i][1],
      inputArr[i][3],
      (part2 ? t : 0) + inputArr[i][5],
    ];

    if (
      !part2 &&
      Math.floor(Math.sqrt(eq1[2])) > 100 &&
      Math.floor(Math.sqrt(eq2[2])) > 100
    ) {
      continue;
    }
    // find a
    let rhs = eq1[2] * eq2[1] - eq2[2] * eq1[1];
    let lhs = eq1[0] * eq2[1] - eq2[0] * eq1[1];
    let a = rhs / lhs;

    // find b
    rhs = eq1[2] * eq2[0] - eq2[2] * eq1[0];
    lhs = eq1[1] * eq2[0] - eq2[1] * eq1[0];
    let b = rhs / lhs;

    const temp = a * 3 + b;

    if (!temp.toString().includes(".")) {
      result += temp;
    }
  }
  return result;
};

loadInput("./input.txt").then((data) => {
  const inputArr = inputToArr(data.toString());
  const part1 = getResults(inputArr, false);
  const part2 = getResults(inputArr, true);
  console.log(part1, part2);
});
