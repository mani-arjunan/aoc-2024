const fs = require('fs/promises')

// const input = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`

const loadFile = async () => {
  return await fs.readFile('./input.txt')
}

const func = (input: string) => {
  let resultStr = ''
  let canMultiply = true
  let sum = 0;

  for (let i = 0; i < input.length; i++) {
    resultStr += input[i]

    if (resultStr.substring(resultStr.length - 7) === "don't()") {
      canMultiply = false
    }
    if (resultStr.substring(resultStr.length - 4) === 'do()') {
      canMultiply = true
    }
    if (resultStr.substring(resultStr.length - 3) === 'mul') {
      let isValid = false
      let tempI = i + 1

      if (input[tempI] === '(') {
        let product1 = ''
        let product2 = ''
        tempI++;

        // as unknown as number is just a dumbass move here, i dont want to change 
        // input[tempI] to number also i need to remove the TS error.
        while (!isNaN(input[tempI] as unknown as number)) {
          product1 += input[tempI]
          tempI++;
        }

        if (product1.length > 0) {
          if (input[tempI] === ',') {
            tempI++;

            while (!isNaN(input[tempI] as unknown as number)) {
              product2 += input[tempI]
              tempI++;
            }

            if (product2.length > 0) {
              console.log(canMultiply)
              if (input[tempI] === ')' && canMultiply) {
                isValid = true;
                sum += +product1 * +product2
              }

            }
          }
        }

        if (isValid) {
          i = tempI;
        }
      }
    }

  }
}


loadFile().then(d => {
  // func(input)
  func(d.toString())
})
