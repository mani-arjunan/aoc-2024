const fs = require('fs/promises')

const loadInput = async (filePath: string) => {
  return await fs.readFile(filePath)
}

const inputToArr = (input: string) => {
  const arr: Array<string> = []
  let str = ''

  for (let i = 0; i < input.length; i++) {
    if (input[i] === '\n') {
      arr.push(str);
      str = ''
    } else {
      str += input[i]
    }
  }

  return arr
}

const findAllXmas = (input: string) => {
  const inputArr = inputToArr(input)
  let count = 0;
  const rowsColsOfA: Array<Array<number>> = []

  for (let i = 1; i < inputArr.length - 1; i++) {
    for (let j = 1; j < inputArr[i].length - 1; j++) {
      if (inputArr[i][j] === 'A') {
        rowsColsOfA.push([i, j])
      }
    }
  }
  for (let i = 0; i < rowsColsOfA.length; i++) {
    const [row, col] = rowsColsOfA[i]

    if (inputArr[row - 1][col - 1] === 'M' || inputArr[row - 1][col - 1] === 'S') {
      if (inputArr[row + 1][col + 1] === 'M' || inputArr[row + 1][col + 1] === 'S') {
        if (inputArr[row + 1][col + 1] !== inputArr[row - 1][col - 1]) {
          if (inputArr[row - 1][col + 1] === 'M' || inputArr[row - 1][col + 1] === 'S') {
            if (inputArr[row + 1][col - 1] === 'M' || inputArr[row + 1][col - 1] === 'S') {
              if (inputArr[row + 1][col - 1] !== inputArr[row - 1][col + 1]) {
                count++
              }
            }
          }
        }
      }
    }
  }
  console.log(count)
}

loadInput('./input.txt').then(d => {
  findAllXmas(d.toString())
})
