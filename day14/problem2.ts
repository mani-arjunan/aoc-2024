import fs from "fs/promises";
import { loadInput, print2dArr, transformInputToArr } from "./problem1";
import { matrixToPNG } from "./sam";

const findEasterEgg = async (
  rows: number,
  cols: number,
  points: Array<Array<number>>,
  velocities: Array<Array<number>>,
) => {
  let arr: Array<Array<string>> = [];
  let cloneArr: Array<Array<string>> = [];

  for (let i = 0; i < rows; i++) {
    const temp: Array<string> = [];
    for (let j = 0; j < cols; j++) {
      temp.push(".");
    }

    arr.push(temp);
  }
  cloneArr = structuredClone(arr);
  const mapy: Record<string, number> = {};


  for (let i = 7750; i < 7755; i++) {
    const map: Record<string, number> = {};
    for (let j = 0; j < points.length; j++) {
      const [x, y] = points[j];
      const [veloX, veloY] = velocities[j];

      let newX = (x + veloX * i) % rows;
      if (newX < 0) {
        newX += rows;
      }
      let newY = (y + veloY * i) % cols;
      if (newY < 0) {
        newY += cols;
      }

      arr[newX][newY] = "#";
      map[`${newX},${newY}`] = (map[`${newX},${newY}`] || 0) + 1;
    }

    await matrixToPNG(arr, `output${i.toString()}`);
    console.log(Object.keys(map).length, '124')
    arr = structuredClone(cloneArr);
  }
};

loadInput("./input.txt").then((input) => {
  const [points, velocities] = transformInputToArr(103, 101, input.toString());
  console.log(points, velocities);
  findEasterEgg(103, 101, points, velocities);
});
