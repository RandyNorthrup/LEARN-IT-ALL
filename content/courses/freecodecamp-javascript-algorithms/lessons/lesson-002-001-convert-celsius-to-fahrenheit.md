---
id: lesson-002-001
title: Convert Celsius to Fahrenheit
chapterId: chapter-02
order: 1
duration: 5
objectives:
  - Convert Celsius to Fahrenheit
---

# Convert Celsius to Fahrenheit

The formula to convert from Celsius to Fahrenheit is the temperature in Celsius times `9/5`, plus `32`.

You are given a variable `celsius` representing a temperature in Celsius. Use the variable `fahrenheit` already defined and assign it the Fahrenheit temperature equivalent to the given Celsius temperature. Use the formula mentioned above to help convert the Celsius temperature to Fahrenheit.

## Starter Code

```html
function convertCtoF(celsius) {
  let fahrenheit;
  return fahrenheit;
}

convertCtoF(30);
```

## Hints

1. `convertCtoF(0)` should return a number
2. `convertCtoF(-30)` should return a value of `-22`
3. `convertCtoF(-10)` should return a value of `14`
4. `convertCtoF(0)` should return a value of `32`
5. `convertCtoF(20)` should return a value of `68`
6. `convertCtoF(30)` should return a value of `86`

## Solution

```html
```js
function convertCtoF(celsius) {
  let fahrenheit = celsius * (9 / 5) + 32;
  return fahrenheit;
}

convertCtoF(30);
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 56533eb9ac21ba0edf2244b3*
