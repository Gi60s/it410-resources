module.exports = {
  cardValidator,
  extractNumbers,
  processSingles,
  processDoubles
}

function extractNumbers (creditCardNumber) {
  
}

function processSingles (numbersArray) {
  
}

function processDoubles (numbersArray) {
  
}

function cardValidator (creditCardNumber) {
  const numbersArray = extractNumbers(creditCardNumber)
  const singlesSum = processSingles(numbersArray)
  const doubleSum = processDoubles(numbersArray)
  return (singlesSum + doubleSum) % 10 === 0
}