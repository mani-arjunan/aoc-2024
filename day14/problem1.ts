const fs = require("fs/promises");

export const loadInput = async (filePath: string) => {
  return await fs.readFile(filePath, "utf-8");
};

export const print2dArr = (arr: Array<Array<string | number>>) => {
  let str = "";
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      str += arr[i][j];
    }
    str += "\n";
  }

  return str;
};

export const transformInputToArr = (
  rows: number,
  cols: number,
  input: string,
): Array<Array<Array<number>>> => {
  const arr: Array<Array<number>> = [];
  const globalPoints: Array<Array<number>> = [];
  const velocities: Array<Array<number>> = [];

  for (let i = 0; i < rows; i++) {
    const temp: Array<number> = [];
    for (let j = 0; j < cols; j++) {
      temp.push(0);
    }
    arr.push(temp);
  }

  for (let i = 0; i < input.length; i++) {
    let tempI = i;
    while (input[tempI] !== undefined && input[tempI] !== "\n") {
      let str = "";
      const points: Array<number> = [];
      while (input[tempI] !== " " && input[tempI] !== "\n") {
        if (!isNaN(input[tempI] as unknown as number) || input[tempI] === "-") {
          str += input[tempI];
        } else if (input[tempI] === ",") {
          points.unshift(+str);
          str = "";
        }
        tempI++;
      }
      points.unshift(+str);
      if (input[tempI] === "\n") {
        velocities.push(points);
      } else {
        globalPoints.push(points);
      }
      tempI++;
    }
    i = tempI;
  }

  return [globalPoints, velocities];
};

const playGame = (
  rowLength: number,
  colLength: number,
  points: Array<Array<number>>,
  velocities: Array<Array<number>>,
) => {
  const result: Array<Array<number>> = [];
  let i = 0;

  while (i < points.length) {
    const [x, y] = points[i];
    const [veloX, veloY] = velocities[i];

    let newX = (x + veloX * 100) % rowLength;
    if (newX < 0) {
      newX += rowLength;
    }
    let newY = (y + veloY * 100) % colLength;
    if (newY < 0) {
      newY += colLength;
    }

    result.push([newX, newY]);
    i++;
  }
  // console.log(result)

  const rowMid = (rowLength - 1) / 2;
  const colMid = (colLength - 1) / 2;
  const tlQuad: Array<number> = [];
  const trQuad: Array<number> = [];
  const blQuad: Array<number> = [];
  const brQuad: Array<number> = [];

  for (let i = 0; i < result.length; i++) {
    const [x, y] = result[i];

    if (x < rowMid && y < colMid) {
      tlQuad.push(1);
    } else if (x < rowMid && y > colMid) {
      trQuad.push(1);
    } else if (x > rowMid && y < colMid) {
      blQuad.push(1);
    } else if (x > rowMid && y > colMid) {
      brQuad.push(1);
    }
  }

  return tlQuad.length * trQuad.length * blQuad.length * brQuad.length;
};

loadInput("input.txt").then((input) => {
  // const [points, velocities] = transformInputToArr(103, 101, input.toString());
  // const res = playGame(103, 101, points, velocities);
  // console.log(points, velocities, res);
});
