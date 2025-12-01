---
id: lesson-008-008
title: Sum All Primes
chapterId: chapter-08
order: 8
duration: 5
objectives:
  - Sum All Primes
---

# Sum All Primes

A <dfn>prime number</dfn> is a whole number greater than 1 with exactly two divisors: 1 and itself. For example, 2 is a prime number because it is only divisible by 1 and 2. In contrast, 4 is not prime since it is divisible by 1, 2 and 4.

Rewrite `sumPrimes` so it returns the sum of all prime numbers that are less than or equal to num.

## Starter Code

```html
function sumPrimes(num) {
  return num;
}

sumPrimes(10);
```

## Hints

1. `sumPrimes(10)` should return a number.
2. `sumPrimes(10)` should return 17.
3. `sumPrimes(977)` should return 73156.

## Solution

```html
```js
class PrimeSeive {
  constructor(num) {
    const seive = Array(Math.floor((num - 1) / 2)).fill(true);
    const upper = Math.floor((num - 1) / 2);
    const sqrtUpper = Math.floor((Math.sqrt(num) - 1) / 2);

    for (let i = 0; i <= sqrtUpper; i++) {
      if (seive[i]) {
        // Mark value in seive array
        const prime = 2 * i + 3;
        // Mark all multiples of this number as false (not prime)
        const primeSquaredIndex = 2 * i ** 2 + 6 * i + 3;
        for (let j = primeSquaredIndex; j < upper; j += prime) {
          seive[j] = false;
        }
      }
    }

    this._seive = seive;
  }

  isPrime(num) {
    return num === 2
      ? true
      : num % 2 === 0
        ? false
        : this.isOddPrime(num);
  }

  isOddPrime(num) {
    return this._seive[(num - 3) / 2];
  }
};

function sumPrimes(num) {
  const primeSeive = new PrimeSeive(num);

  let sum = 2;
  for (let i = 3; i <= num; i += 2) {
    if (primeSeive.isOddPrime(i)) sum += i;
  }
  return sum;
}

sumPrimes(10);
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: a3bfc1673c0526e06d3ac698*
