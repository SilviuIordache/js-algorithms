// Write a recursive function that takes a positive integer n and returns the sum of its digits. For example:
// sumOfDigits(123) // should return 6 (1 + 2 + 3)
// sumOfDigits(987) // should return 24 (9 + 8 + 7)

function sumOfDigits(number) {
  if (number === 0) {
    return 0;
  } else {
    return (number % 10) + sumOfDigits(Math.floor(number / 10));
  }
}

const result = sumOfDigits(987);
console.log(result);
