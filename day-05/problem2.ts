const fs = require('fs/promises')
import { formInputFromStr } from './problem1'

const loadInput = async (filePath: string) => {
  return await fs.readFile(filePath)
}

const separate = (page: Array<string>, pageMap: Record<string, unknown>): Array<Array<string>> => {
  const arrToSort: Array<string> = []
  const arrNotToSort: Array<string> = []

  for (let i = 0; i < page.length; i++) {
    if (pageMap[page[i]]) {
      arrToSort.push(page[i])
    } else {
      arrNotToSort.push(page[i])
    }
  }

  return [arrToSort, arrNotToSort]
}

const checkIsInvalid = (page: Array<string>, pageMap: Record<string, Record<string, unknown>>) => {
  for (let j = 0; j < page.length; j++) {
    const currentPageOrder = page[j]
    for (let k = j + 1; k < page.length; k++) {
      if (pageMap[currentPageOrder]?.[page[k]]) {
        continue;
      } else if (pageMap[page[k]][currentPageOrder]) {
        return true
      }
    }
  }

  return false
}

const recurse = (page: Array<string>, pageMap: Record<string, Record<string, unknown>>) => {
  if (!checkIsInvalid(page, pageMap)) {
    return
  }

  for (let i = 0; i < page.length - 1; i++) {
    if (!pageMap[page[i]][page[i + 1]]) {
      const temp = page[i + 1]
      page[i + 1] = page[i]
      page[i] = temp

      recurse(page, pageMap)
    }
  }
}

const findMiddle = (input: string) => {
  const out = formInputFromStr(input)
  const pages = out[1] as Array<Array<string>>
  const pageMap = out[0] as Record<string, Record<string, unknown>>
  let sum = 0;

  for (let i = 0; i < pages.length; i++) {
    if (checkIsInvalid(pages[i], pageMap)) {
      const [arrToSort, arrToNotSort] = separate(pages[i], pageMap)
      recurse(arrToSort, pageMap)
      const newArr = arrToSort.concat(arrToNotSort)
      sum += +newArr[Math.floor(newArr.length / 2)]
    }
  }
  console.log(sum)

  return sum
}


loadInput('./input.txt').then(d => {
  findMiddle(d.toString())
})
