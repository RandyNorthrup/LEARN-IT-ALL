---
id: lesson-013-024
title: Step 28
chapterId: chapter-13
order: 24
duration: 5
objectives:
  - Step 28
---

# Step 28

A selection sort relies on tracking the index of the smallest value in the array. Declare a variable `minIndex` and set it to `i` - this ensures that if your current value is the smallest, it will be swapped with itself and not be moved. You will need to be able to reassign the value of `minIndex` as you iterate through the array.

Then, write another `for` loop, using `j` as the iterator. This loop needs to start at the index after `i` and iterate through the rest of the array.

## Starter Code

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="./styles.css" />
    <title>Number Sorter</title>
  </head>
  <body>
    <main>
      <h1>Number Sorter</h1>
      <form id="form" class="form">
        <h2>Input:</h2>
        <fieldset>
          <span class="bracket">[</span>
          <div>
            <select
              name="values"
              class="values-dropdown"
              aria-label="first number"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8" selected>8</option>
              <option value="9">9</option>
            </select>
            <span class="comma">,</span>
          </div>
          <div>
            <select
              name="values"
              class="values-dropdown"
              aria-label="second number"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2" selected>2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
            <span class="comma">,</span>
          </div>
          <div>
            <select
              name="values"
              class="values-dropdown"
              aria-label="third number"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4" selected>4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
            <span class="comma">,</span>
          </div>
          <div>
            <select
              name="values"
              class="values-dropdown"
              aria-label="fourth number"
            >
              <option value="0">0</option>
              <option value="1" selected>1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
            <span class="comma">,</span>
          </div>
          <div>
            <select
              name="values"
              class="values-dropdown"
              aria-label="fifth number"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3" selected>3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
          </div>
          <span class="bracket">]</span>
        </fieldset>
        <button id="sort">Sort</button>
      </form>
      <div class="output-container">
        <h2>Output:</h2>
        <div class="output-array">
          <span class="bracket">[</span>
          <div>
            <span class="output-value" id="output-value-0">0</span>
            <span class="comma">,</span>
          </div>
          <div>
            <span class="output-value" id="output-value-1">0</span>
            <span class="comma">,</span>
          </div>
          <div>
            <span class="output-value" id="output-value-2">0</span>
            <span class="comma">,</span>
          </div>
          <div>
            <span class="output-value" id="output-value-3">0</span>
            <span class="comma">,</span>
          </div>
          <div>
            <span class="output-value" id="output-value-4">0</span>
          </div>
            <span class="bracket">]</span>
        </div>
      </div>
    </main>
    <script src="./script.js"></script>
  </body>
</html>
```

## Hints

1. You should use `let` to declare `minIndex`.
2. You should set `minIndex` to `i`.
3. You should have a nested `for` loop.
4. Your `for` loop should initialize `j` to `i + 1`.
5. Your `for` loop should iterate through the rest of the array.
6. Your `for` loop should increment `j`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6410fb3b68429716a810ea4b*
