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
  const inputArr = inputToArr(input);
  let count = 0;

  for (let i = 0; i < inputArr.length; i++) {
    for (let j = 0; j < inputArr[i].length; j++) {
      const char = inputArr[i][j]

      if (char === 'X') {
        // Horizonatal
        if (inputArr[i][j + 1] === 'M' && inputArr[i][j + 2] === 'A' && inputArr[i][j + 3] === 'S') {
          count++;
        }
        if (inputArr[i][j - 1] === 'M' && inputArr[i][j - 2] === 'A' && inputArr[i][j - 3] === 'S') {
          count++;
        }

        // Vertical
        if(inputArr.length - 1 - i - 3 >= 0) {
          if(inputArr[i + 1][j] === 'M' && inputArr[i + 2][j] === 'A' && inputArr[i + 3][j] === 'S') {
            count++;
          }
          if(inputArr[i + 1][j - 1] === 'M' && inputArr[i + 2][j - 2] === 'A' && inputArr[i + 3][j - 3] === 'S') {
            count++;
          }
          if(inputArr[i + 1][j + 1] === 'M' && inputArr[i + 2][j + 2] === 'A' && inputArr[i + 3][j + 3] === 'S') {
            count++;
          }
        }
        // Vertical backward
        if(i - 3 >= 0) {
          if(inputArr[i - 1][j] === 'M' && inputArr[i - 2][j] === 'A' && inputArr[i - 3][j] === 'S') {
            count++;
          }
          if(inputArr[i - 1][j - 1] === 'M' && inputArr[i - 2][j - 2] === 'A' && inputArr[i - 3][j - 3] === 'S') {
            count++;
          }
          if(inputArr[i - 1][j + 1] === 'M' && inputArr[i - 2][j + 2] === 'A' && inputArr[i - 3][j + 3] === 'S') {
            count++;
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
