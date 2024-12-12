const fs = require("fs/promises");

const loadInput = async (filePath: string) => {
  return await fs.readFile(filePath, "utf-8");
};

const strToArr = (input: string) => {
  const arr: Array<number> = [];
  let temp = "";

  for (let i = 0; i < input.length; i++) {
    if (input[i] === " ") {
      arr.push(+temp);
      temp = "";
    } else {
      temp += input[i];
      if (i === input.length - 1) {
        arr.push(+temp);
      }
    }
  }

  return arr;
};

const separateHalf = (str: string) => {
  const halves: Array<string> = [];
  let i = 0;
  let temp = "";

  for (i; i < str.length / 2; i++) {
    temp += str[i];
  }

  halves.push(temp);
  temp = "";

  for (i; i < str.length; i++) {
    temp += str[i];
  }

  halves.push(temp);

  return halves;
};

const cache: Record<string, number> = {};
const tempC: Record<string, number> = {};

const blink = (stone: number, times: number) => {
  let total = 0;
  const key = stone * 121 + times;
  times--;

  if (cache[key]) {
    return cache[key];
  }

  if (times >= 0) {
    if (stone === 0) {
      total += blink(1, times);
    } else if (stone.toString().length % 2 === 0) {
      const [first, second] = separateHalf(stone.toString());
      total += blink(+first, times);
      total += blink(+second, times);
    } else {
      total += blink(stone * 2024, times);
    }
  } else {
    total = 1;
  }

  cache[key] = total;
  return total;
};

const totalStonesAfterBlink = (input: Array<number>, times: number) => {
  let total = 0;

  for (let i = 0; i < input.length; i++) {
    total += blink(input[i], times);
  }

  return total;
};

loadInput("./input.txt").then((d) => {
  const input = d.toString();
  const list = strToArr(input);
  const result = totalStonesAfterBlink(list, 75);
  console.log(result);
  // const cloneArr = totalStonesAfterBlink(strToArr(input), 25);
  // const cloneArr2 = totalStonesAfterBlink(cloneArr, 10);
  // const cloneArr3 = totalStonesAfterBlink(cloneArr2, 20);
  // console.log(cloneArr3);
});
