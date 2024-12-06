const fs = require('fs/promises')

const loadInput = async (filePath: string) => {
  return await fs.readFile(filePath)
}

export const formInputFromStr = (input: string): Array<Record<string, Record<string, unknown>> | Array<Array<string>>> => {
  const map = {}
  const arr: Array<Array<string>> = []
  let str = ''
  let pageOrderComplete = false

  for (let i = 0; i < input.length; i++) {
    if (input[i] === '\n') {
      pageOrderComplete = true
      if (str.trim().length > 0) {
        arr.push(str.split(','))
      }
      str = ''
    } else if (input[i] === '|') {
      let tempI = i + 1
      let tempStr = ''

      while (input[tempI] !== '\n' && !isNaN(input[tempI] as unknown as number)) {
        tempStr += input[tempI]
        tempI++
      }
      if (map[str]) {
        map[str][tempStr] = true
      } else {
        map[str] = {
          [tempStr]: true
        }
      }
      str = ''
      i = tempI++
    } else {
      if (!pageOrderComplete) {
        str += input[i]
      } else {
        str += input[i]
      }
    }
  }

  return [map, arr]
}

const findMiddle = (input: string) => {
  const out = formInputFromStr(input)
  const pages = out[1] as Array<Array<string>>
  const pageMap = out[0]
  let sum = 0;

  for (let i = 0; i < pages.length; i++) {
    let invalid = false
    for (let j = 0; j < pages[i].length; j++) {
      const currentPageOrder = pages[i][j]
      for (let k = j + 1; k < pages[i].length; k++) {
        if (pageMap[currentPageOrder]?.[pages[i][k]]) {
          continue;
        } else if (pageMap[pages[i][k]][currentPageOrder]) {
          invalid = true
          break;
        } else {
          invalid = true;
          break;
        }
      }
    }
    if (invalid) {
      const middle = Math.floor(pages[i].length / 2)
      sum += +pages[i][middle]
    }
  }

  console.log(pages, pageMap, sum)
  return sum
}


loadInput('./sample.txt').then(d => {
  findMiddle(d.toString())
})
