const fs = require('fs/promises')

const loadInput = async (filePath: string) => {
  return await fs.readFile(filePath)
}


const transformInputToArr = (input: string) => {
  const arr: Array<Array<number | Array<number>>> = []
  let temp = ''

  for (let i = 0; i < input.length; i++) {
    if (input[i] === ':') {
      arr.push([+temp])
      temp = ''
    } else if (input[i] === '\n') {
      arr[arr.length - 1].push(temp.split(" ").filter(d => d).map(d => +d))
      temp = ''
    } else {
      temp += input[i]
    }
  }

  return arr
}

const multiplyAll = (arr: Array<number>) => {
  let prod = 1
  for (let i = 0; i < arr.length; i++) {
    prod *= arr[i]
  }

  return prod
}

const addAll = (arr: Array<number>) => {
  let sum = 0
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i]
  }

  return sum
}

const giveBinary = (num: number, baseLength: number) => {
  let bin = ''

  while (num !== 0) {
    bin = (num % 2) + bin
    num = Math.floor(num / 2)
  }

  if (bin.length < baseLength) {
    return "0".repeat(baseLength - bin.length) + bin
  }

  return bin
}

const getCombinations = (totalNumOfOperators: number) => {
  const operators = ['+', '*', '||']
  const combinations: Array<Array<string>> = []
  const totalCombinations = Math.pow(3, totalNumOfOperators)

  for (let i = 0; i < totalCombinations; i++) {
    const bin = giveBinary(i, totalNumOfOperators)
    combinations.push(bin.split('').map(d => operators[d]))
  }

  return combinations
}

const totalCalibrationResults = (input: Array<Array<number | Array<number>>>) => {
  let totalCalibration: bigint = BigInt(0);

  for (let i = 0; i < input.length; i++) {
    const [total, equations] = input[i];
    const operatorCombinations = getCombinations((equations as Array<number>).length - 1)
    const mulAll = multiplyAll(equations as Array<number>)
    const sumAll = addAll(equations as Array<number>)
    const concatAll = (equations as Array<number>).reduce((acc: string, curr) => acc + curr, "" as string);

    if (mulAll === total) {
      totalCalibration += BigInt(total);
      continue;
    }
    if (sumAll === total) {
      totalCalibration += BigInt(total);
      continue;
    }
    if (+concatAll === total) {
      totalCalibration += BigInt(total);
      continue;
    }

    if ((equations as Array<number>).length === 2) {
      if (+(equations[0] + equations[1]) === total) {
        totalCalibration += BigInt(total);
        continue;
      }
      continue;
    }
    for (let i = 0; i < operatorCombinations.length; i++) {
      let sum: bigint = BigInt(0);
      switch (operatorCombinations[i][0]) {
        case '+':
          sum = BigInt(+equations[0] + +equations[1]);
          break;
        case '*':
          sum = BigInt(+equations[0] * +equations[1]);
          break;
        case '||':
          sum = BigInt(equations[0] + equations[1]);
          break;
      }
      let equationIndex: number = 2;

      for (let j = 1; j < operatorCombinations[i].length; j++) {
        const operator: string = operatorCombinations[i][j];

        if (operator === '||') {
          const temp: string = sum.toString() + equations[equationIndex];

          sum = BigInt(temp);
        } else if (operator === '+') {
          sum += BigInt(+equations[equationIndex]);
        } else {
          sum *= BigInt(+equations[equationIndex]);
        }

        equationIndex++;
      }

      if (sum === BigInt(total as number)) {
        totalCalibration += BigInt(total as number);
        break;
      }
    }
  }

  return Number(totalCalibration);
}

loadInput('./input.txt').then(d => {
  const arr = transformInputToArr(d.toString());
  console.log(totalCalibrationResults(arr));
});
