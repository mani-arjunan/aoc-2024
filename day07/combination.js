const giveBinary = (num, baseLength, base) => {
  let bin = ''

  while (num !== 0) {
    bin = (num % base) + bin
    num = Math.floor(num / base)
  }

  if (bin.length < baseLength) {
    return "0".repeat(baseLength - bin.length) + bin
  }

  return bin
}

const getCombinations = (operators, base) => {
  const combinations = []
  const totalCombinations = Math.pow(base, operators.length)

  if (operators.length < base) {
    throw new Error("base should be equal or greater than operators length")
  }
  for (let i = 0; i < totalCombinations; i++) {
    const bin = giveBinary(i, operators.length, base)
    console.log(bin)
    combinations.push(bin.split('').map(d => operators[d]))
  }


  console.log(combinations)
  console.log(combinations.length)
  return combinations
}

getCombinations(['+', '*', '||'], 3)
