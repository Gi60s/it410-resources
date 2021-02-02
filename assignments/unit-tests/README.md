
# Credit Card Validator

## Introduction

You are to create a simple credit card number validator with accompanying unit tests. Here is how you will validate if the credit card number is valid or not:

1. Make sure it is 16 digits. There are 15 digit cards, but we'll ignore those for this exercise.
2. From the credit card number and sum together every other digit, starting with the second number.
3. From the credit card number take every other digit, starting with the first, and double it.
4. Take the doubled numbers from step 3 and if any of them are greater than 9 then seperate the digits out into two numbers. So, 16 becomes 1 and 6.
5. Sum together all of the results from step 4.
6. Sum the numbers from step 2 and 5.
7. If the result of step 6 is divisible by 10 then the number is valid.

**Calculation Example**

Validate: `5105 2348 1191 2226`:

```
Single digits:  1 5 3 8 1 1 2 6
Single summed:  28

Double digits:  5 0 2 4 1 9 2 2
Doubled:        10 0 4 8 2 18 4 4
Doubled split:  1 0 0 4 8 2 1 8 4 4
Doubled summed: 32

Double sum plus single sum: 28 + 32 = 60

Divisible by 10: 60 % 10 === 0 so this number is valid
```

## Setup

1. Be sure to install the NPM dependencies for `mocha` and `chai`.
2. Add the package.json script to run the mocha tests.

## Assignment

The file `credit-card.js` has some functions started for you. For each of these functions you'll find instructions below.

### extractNumbers

This function will take a credit card number as an input parameter and return an array of numbers.

1. Write unit tests for this function in `test/index.test.js`
2. Write the code for this function in `index.js`

The input:

- Must be a string.
- Must have exactly 16 numbers.
- Can have spaces and dashes, but you'll ignore those.

The output will be an array of the 16 numbers.

**Example**

Calling `extractNumbers('5105 2348 1191 2226')` would result in an array with these numbers: `[ 5, 1, 0, 5, 2, 3, 4, 8, 1, 1, 9, 1, 2, 2, 2, 6]`.

### processSingles

This function will take an array of 16 numbers. Sum together every other number in the array, starting with the second number, and return the result.

1. Write unit tests for this function in `test/index.test.js`
2. Write the code for this function in `index.js`

**Example**

Calling `processSingles([ 5, 1, 0, 5, 2, 3, 4, 8, 1, 1, 9, 1, 2, 2, 2, 6])` would return `28`.

### processDoubles

This function will take an array of 16 numbers, then:

1. Double every other number, starting with the first number.
2. Separate any numbers above 9 to single digits. So 16 becomes 1 and 6.
3. Sum together all of the digits and return the result.

**Example**

Calling `processDoubles([ 5, 1, 0, 5, 2, 3, 4, 8, 1, 1, 9, 1, 2, 2, 2, 6])` would return `32`.

### cardValidator

This function is already written for you. Don't worry about writing tests for it, but here are some valid credit card numbers you can try on it.

(In case you're wondering, I made these numbers up.)

```
5105 2348 1191 2226
4816-2213-4854-2323
5555-4444-3333-2424
```

## Pass Off

Demonstrate to me in class your working code and tests.