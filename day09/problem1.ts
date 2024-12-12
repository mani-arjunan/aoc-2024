const fs = require("fs/promises");

const loadFile = async (filePath: string) => {
  return await fs.readFile(filePath, "utf-8");
};

const getResults = (input: string) => {
  const memories: number[] = [];
  let firstElem = 0;

  for (let i = 0; i < input.length; i++) {
    if (i % 2 === 0) {
      const lastElement =
        memories[memories.length - 1] === undefined
          ? -1
          : memories[memories.length - 1];

      for (let j = 0; j < +input[i]; j++) {
        memories.push(lastElement + 1);
      }
    }
  }
  const length = memories.length;
  const temp: number[] = [];
  let sum = 0;

  for (let i = 0; i < input.length && temp.length < length; i++) {
    const len =
      length - temp.length < +input[i] ? length - temp.length : +input[i];
    if (i % 2 === 0) {
      for (let j = 0; j < len; j++) {
        temp.push(firstElem);
      }
      firstElem++;
    } else {
      for (let j = 0; j < len; j++) {
        const elem = memories.pop();
        temp.push(elem as number);
      }
    }
  }

  for (let i = 0; i < temp.length; i++) {
    sum += temp[i] * i;
  }

  return sum;
};

loadFile("./input.txt").then((d) => {
  const res = getResults(d.toString());
  console.log(res);
});
